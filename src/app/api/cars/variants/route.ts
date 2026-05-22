import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const makeSlug = req.nextUrl.searchParams.get("make");
  const modelSlug = req.nextUrl.searchParams.get("model");
  const year = req.nextUrl.searchParams.get("year");

  if (!makeSlug || !modelSlug || !year) {
    return NextResponse.json(
      { error: "make, model, and year params required" },
      { status: 400 }
    );
  }

  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT v.id, v.name, v.body_type, v.engine, v.transmission, v.gcc_specs, v.price_min, v.price_max
       FROM variants v
       INNER JOIN car_models cm ON cm.id = v.model_id
       INNER JOIN makes m ON m.id = cm.make_id
       WHERE m.slug = ? AND cm.slug = ? AND v.year = ? AND v.is_active = 1
       ORDER BY v.name ASC`,
      [makeSlug, modelSlug, parseInt(year)]
    );
    return NextResponse.json({ data: rows });
  } catch (err) {
    console.error("[/api/cars/variants]", err);
    return NextResponse.json({ error: "Failed to fetch variants" }, { status: 500 });
  }
}
