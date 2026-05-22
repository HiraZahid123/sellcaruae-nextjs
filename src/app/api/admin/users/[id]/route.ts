import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import type { ResultSetHeader } from "mysql2";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { password, is_active } = await req.json();

  const fields: string[] = [];
  const values: (string | number | boolean)[] = [];

  if (password) {
    fields.push("password = ?");
    values.push(await bcrypt.hash(password, 12));
  }
  if (is_active !== undefined) {
    fields.push("is_active = ?");
    values.push(is_active ? 1 : 0);
  }

  if (fields.length === 0) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

  fields.push("updated_at = NOW()");
  values.push(id);

  const [result] = await db.execute<ResultSetHeader>(
    `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
    values
  );
  if (result.affectedRows === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
