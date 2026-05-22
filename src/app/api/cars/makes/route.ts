import { NextResponse } from "next/server";
import db from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT id, name, slug, logo_url FROM makes WHERE is_active = 1 ORDER BY display_order ASC, name ASC"
    );
    return NextResponse.json({ data: rows });
  } catch (err) {
    console.error("[/api/cars/makes]", err);
    return NextResponse.json({ error: "Failed to fetch makes" }, { status: 500 });
  }
}
