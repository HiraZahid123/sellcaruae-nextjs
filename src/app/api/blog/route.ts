import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = 9;
  const offset = (page - 1) * limit;

  const [[countRows], [rows]] = await Promise.all([
    db.execute<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM blogs WHERE is_published = 1"
    ),
    db.execute<RowDataPacket[]>(
      `SELECT id, title, slug, thumbnail, categories, published_at, created_at
       FROM blogs WHERE is_published = 1
       ORDER BY published_at DESC, created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    ),
  ]);

  const total = countRows[0]?.total ?? 0;
  return NextResponse.json({ data: rows, total, page, pages: Math.ceil(total / limit) });
}
