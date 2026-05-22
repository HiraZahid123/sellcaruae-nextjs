import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export const dynamic = "force-dynamic";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/--+/g, "-")
    .substring(0, 180);
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = 20;
  const offset = (page - 1) * limit;

  const [[countRows], [rows]] = await Promise.all([
    db.execute<RowDataPacket[]>("SELECT COUNT(*) as total FROM blogs"),
    db.execute<RowDataPacket[]>(
      `SELECT id, title, slug, thumbnail, categories, is_published, published_at, created_at
       FROM blogs ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    ),
  ]);

  const total = countRows[0]?.total ?? 0;
  return NextResponse.json({ data: rows, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content, thumbnail, categories, is_published } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: "title and content required" }, { status: 400 });
  }

  let slug = slugify(title);

  // Ensure slug uniqueness
  const [existing] = await db.execute<RowDataPacket[]>(
    "SELECT id FROM blogs WHERE slug LIKE ? LIMIT 10",
    [`${slug}%`]
  );
  if (existing.length > 0) slug = `${slug}-${Date.now()}`;

  const publishedAt = is_published ? new Date() : null;

  const [result] = await db.execute<ResultSetHeader>(
    `INSERT INTO blogs (title, slug, content, thumbnail, categories, is_published, published_at, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [title, slug, content, thumbnail || null, categories || null, is_published ? 1 : 0, publishedAt]
  );

  return NextResponse.json({ success: true, id: result.insertId, slug }, { status: 201 });
}
