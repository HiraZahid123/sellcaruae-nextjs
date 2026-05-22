import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import otpStore from "@/lib/otpStore";
import type { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { phone, userIp } = await req.json();

    if (!phone || !/^(\+971|0)?5[024568]\d{7}$/.test(phone.replace(/\s/g, ""))) {
      return NextResponse.json({ error: "Invalid UAE mobile number" }, { status: 400 });
    }

    // Normalise to +971XXXXXXXXX
    const normalised = phone.replace(/\s/g, "").replace(/^0/, "+971").replace(/^971/, "+971");

    // Anti-spam: max 5 leads per IP per day
    if (userIp) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const [rows] = await db.execute<RowDataPacket[]>(
        "SELECT COUNT(*) as cnt FROM leads WHERE user_ip = ? AND created_at >= ?",
        [userIp, today]
      );
      if ((rows[0]?.cnt ?? 0) >= 5) {
        return NextResponse.json(
          { error: "Daily submission limit reached. Please try again tomorrow." },
          { status: 429 }
        );
      }
    }

    // Generate 6-digit OTP
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    otpStore.set(normalised, { code, expiresAt });

    // Send via SMS Global
    const apiKey = process.env.SMS_GLOBAL_API_KEY;
    const apiSecret = process.env.SMS_GLOBAL_API_SECRET;
    const from = process.env.SMS_GLOBAL_FROM || "SellCarUAE";

    if (!apiKey || !apiSecret) {
      // Dev mode — return code in response (remove in production)
      console.log(`[OTP DEV] ${normalised}: ${code}`);
      return NextResponse.json({ success: true, dev_code: code });
    }

    const smsPayload = {
      api_key: apiKey,
      api_secret: apiSecret,
      messages: [{
        content: `${code} is your verification code for SellCarUae.`,
        destination: normalised.replace("+", ""),
        source: from,
      }],
    };

    const smsRes = await fetch("https://api.smsglobal.com/http-api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(smsPayload),
    });

    if (!smsRes.ok) {
      console.error("[SMS Global error]", await smsRes.text());
      return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/otp/send]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
