import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const makeSlug = req.nextUrl.searchParams.get("make");
  if (!makeSlug) {
    return NextResponse.json({ error: "make param required" }, { status: 400 });
  }

  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT cm.id, cm.name, cm.slug
       FROM car_models cm
       INNER JOIN makes m ON m.id = cm.make_id
       WHERE m.slug = ? AND cm.is_active = 1
       ORDER BY cm.name ASC`,
      [makeSlug]
    );
    return NextResponse.json({ data: rows });
  } catch (err) {
    console.error("[/api/cars/models]", err);
    return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 });
  }
}
