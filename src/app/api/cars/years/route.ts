import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const makeSlug = req.nextUrl.searchParams.get("make");
  const modelSlug = req.nextUrl.searchParams.get("model");

  if (!makeSlug || !modelSlug) {
    return NextResponse.json({ error: "make and model params required" }, { status: 400 });
  }

  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT DISTINCT v.year
       FROM variants v
       INNER JOIN car_models cm ON cm.id = v.model_id
       INNER JOIN makes m ON m.id = cm.make_id
       WHERE m.slug = ? AND cm.slug = ? AND v.is_active = 1
       ORDER BY v.year DESC`,
      [makeSlug, modelSlug]
    );
    return NextResponse.json({ data: rows.map((r) => r.year) });
  } catch (err) {
    console.error("[/api/cars/years]", err);
    return NextResponse.json({ error: "Failed to fetch years" }, { status: 500 });
  }
}
