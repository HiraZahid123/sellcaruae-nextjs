import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [rows] = await db.execute<RowDataPacket[]>(
    "SELECT * FROM blogs WHERE id = ? LIMIT 1",
    [id]
  );
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: rows[0] });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { title, content, thumbnail, categories, is_published } = await req.json();

  // If publishing for first time, set published_at
  const [existing] = await db.execute<RowDataPacket[]>(
    "SELECT is_published, published_at FROM blogs WHERE id = ? LIMIT 1",
    [id]
  );
  if (!existing[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const wasPublished = existing[0].is_published;
  const publishedAt =
    is_published && !wasPublished ? new Date() : (existing[0].published_at ?? null);

  const [result] = await db.execute<ResultSetHeader>(
    `UPDATE blogs
     SET title = ?, content = ?, thumbnail = ?, categories = ?,
         is_published = ?, published_at = ?, updated_at = NOW()
     WHERE id = ?`,
    [title, content, thumbnail || null, categories || null, is_published ? 1 : 0, publishedAt, id]
  );

  if (result.affectedRows === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [result] = await db.execute<ResultSetHeader>(
    "DELETE FROM blogs WHERE id = ?",
    [id]
  );
  if (result.affectedRows === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
