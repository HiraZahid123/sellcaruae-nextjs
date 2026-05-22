import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT b.id, b.title, b.slug, b.content, b.thumbnail,
            b.categories, b.published_at, b.created_at,
            u.email as author_email
     FROM blogs b
     LEFT JOIN users u ON u.id = b.author_id
     WHERE b.slug = ? AND b.is_published = 1
     LIMIT 1`,
    [slug]
  );

  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: rows[0] });
}
