import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT u.id, u.email, u.is_active, u.created_at, r.type as role
     FROM users u INNER JOIN roles r ON r.id = u.role_id
     ORDER BY u.created_at DESC`
  );
  return NextResponse.json({ data: rows });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email, password, role } = await req.json();
  if (!email || !password || !role) {
    return NextResponse.json({ error: "email, password and role required" }, { status: 400 });
  }

  const [roleRows] = await db.execute<RowDataPacket[]>(
    "SELECT id FROM roles WHERE type = ? LIMIT 1", [role]
  );
  if (!roleRows[0]) return NextResponse.json({ error: "Invalid role" }, { status: 400 });

  const hash = await bcrypt.hash(password, 12);
  const [result] = await db.execute<ResultSetHeader>(
    "INSERT INTO users (email, password, role_id, is_active, created_at, updated_at) VALUES (?, ?, ?, 1, NOW(), NOW())",
    [email, hash, roleRows[0].id]
  );
  return NextResponse.json({ success: true, id: result.insertId }, { status: 201 });
}
