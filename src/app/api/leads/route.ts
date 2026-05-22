import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      phone,
      make,
      model,
      year,
      mileage,
      specs,
      variant_id,
      your_price,
      user_ip,
    } = body;

    if (!phone || !make || !model || !year) {
      return NextResponse.json({ error: "phone, make, model and year are required" }, { status: 400 });
    }

    const [result] = await db.execute(
      `INSERT INTO leads
        (phone_number, make, model, year, mileage, specifications, variant_id,
         your_price, status, is_verified, user_ip, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'NEW_LEAD', 1, ?, NOW(), NOW())`,
      [
        phone,
        make,
        model,
        String(year),
        mileage ?? null,
        specs ?? null,
        variant_id ?? null,
        your_price ? String(your_price) : null,
        user_ip ?? null,
      ]
    );

    const insertResult = result as { insertId: number };
    return NextResponse.json({ success: true, lead_id: insertResult.insertId }, { status: 201 });
  } catch (err) {
    console.error("[/api/leads]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
