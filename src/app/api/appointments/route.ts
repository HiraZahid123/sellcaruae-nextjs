import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import mailer, { bookingConfirmationHtml } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      lead_id,
      booking_type,   // OFFICE_VISIT | HOME_INSPECTION
      date,           // "YYYY-MM-DD"
      time,           // e.g. "10:00 AM"
      email,
      branch,
      home_address,
      // for email context
      make,
      model,
      year,
      mileage,
      specs,
      name,
      phone,
    } = body;

    if (!lead_id || !booking_type || !date || !time || !email) {
      return NextResponse.json(
        { error: "lead_id, booking_type, date, time and email are required" },
        { status: 400 }
      );
    }

    if (!["OFFICE_VISIT", "HOME_INSPECTION"].includes(booking_type)) {
      return NextResponse.json({ error: "Invalid booking_type" }, { status: 400 });
    }

    // Mark any existing appointments for this lead as not latest
    await db.execute(
      "UPDATE appointments SET is_latest = 0 WHERE lead_id = ?",
      [lead_id]
    );

    const [result] = await db.execute(
      `INSERT INTO appointments
        (lead_id, booking_type, lead_type, branch, home_address, date, time, email, is_latest, created_at, updated_at)
       VALUES (?, ?, 'MAIN', ?, ?, ?, ?, ?, 1, NOW(), NOW())`,
      [
        lead_id,
        booking_type,
        branch ?? null,
        home_address ?? null,
        new Date(date),
        time,
        email,
      ]
    );

    const insertResult = result as { insertId: number };

    // Send confirmation email (non-blocking — don't fail the request if email fails)
    if (process.env.SMTP_PASS) {
      const formattedDate = new Date(date).toLocaleDateString("en-AE", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      });

      mailer.sendMail({
        from: `"SellCarUAE" <${process.env.SMTP_FROM || "noreply@sellcaruae.com"}>`,
        to: email,
        subject: "Your Car Evaluation is Confirmed – SellCarUAE",
        html: bookingConfirmationHtml({
          name,
          phone,
          make: make?.replace(/-/g, " ") || "",
          model: model?.replace(/-/g, " ") || "",
          year: String(year),
          mileage,
          specs,
          bookingType: booking_type,
          date: formattedDate,
          time,
          branch,
          homeAddress: home_address,
        }),
      }).catch(err => console.error("[mailer]", err));
    } else {
      console.log("[mailer DEV] Would send confirmation to:", email);
    }

    return NextResponse.json({ success: true, appointment_id: insertResult.insertId }, { status: 201 });
  } catch (err) {
    console.error("[/api/appointments]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
