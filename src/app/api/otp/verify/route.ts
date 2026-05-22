import { NextRequest, NextResponse } from "next/server";
import otpStore from "@/lib/otpStore";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { phone, code } = await req.json();

    if (!phone || !code) {
      return NextResponse.json({ error: "phone and code required" }, { status: 400 });
    }

    const normalised = phone.replace(/\s/g, "").replace(/^0/, "+971").replace(/^971/, "+971");
    const stored = otpStore.get(normalised);

    if (!stored) {
      return NextResponse.json({ error: "No OTP found. Please request a new code." }, { status: 400 });
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(normalised);
      return NextResponse.json({ error: "OTP expired. Please request a new code." }, { status: 400 });
    }

    if (stored.code !== String(code).trim()) {
      return NextResponse.json({ error: "Incorrect code. Please try again." }, { status: 400 });
    }

    // Valid — clear it
    otpStore.delete(normalised);
    return NextResponse.json({ success: true, phone: normalised });
  } catch (err) {
    console.error("[/api/otp/verify]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
