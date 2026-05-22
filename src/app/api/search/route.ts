import { NextRequest, NextResponse } from "next/server";
import { variantsIndex } from "@/lib/meilisearch";
import db from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const make = req.nextUrl.searchParams.get("make");
  const model = req.nextUrl.searchParams.get("model");
  const year = req.nextUrl.searchParams.get("year");
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get("limit") ?? "20"), 100);

  // Build Meilisearch filter
  const filters: string[] = [];
  if (make) filters.push(`make = "${make}"`);
  if (model) filters.push(`model = "${model}"`);
  if (year) filters.push(`year = ${year}`);

  try {
    const result = await variantsIndex.search(q, {
      limit,
      filter: filters.length ? filters.join(" AND ") : undefined,
      attributesToRetrieve: ["id", "year", "make", "model", "name", "body_type", "engine", "transmission", "gcc_specs"],
    });
    return NextResponse.json({ data: result.hits, total: result.estimatedTotalHits });
  } catch {
    // Meilisearch unavailable — fall back to MySQL FULLTEXT
    try {
      let sql = `
        SELECT v.id, v.year, v.name, v.body_type, v.engine, v.transmission, v.gcc_specs,
               m.name AS make, cm.name AS model
        FROM variants v
        INNER JOIN car_models cm ON cm.id = v.model_id
        INNER JOIN makes m ON m.id = cm.make_id
        WHERE v.is_active = 1
      `;
      const params: (string | number)[] = [];

      if (q) {
        sql += " AND MATCH(v.name) AGAINST(? IN BOOLEAN MODE)";
        params.push(`${q}*`);
      }
      if (make) { sql += " AND m.slug = ?"; params.push(make); }
      if (model) { sql += " AND cm.slug = ?"; params.push(model); }
      if (year) { sql += " AND v.year = ?"; params.push(parseInt(year)); }

      sql += ` LIMIT ${limit}`;

      const [rows] = await db.execute<RowDataPacket[]>(sql, params);
      return NextResponse.json({ data: rows, total: rows.length, fallback: true });
    } catch (dbErr) {
      console.error("[/api/search fallback]", dbErr);
      return NextResponse.json({ error: "Search unavailable" }, { status: 500 });
    }
  }
}
