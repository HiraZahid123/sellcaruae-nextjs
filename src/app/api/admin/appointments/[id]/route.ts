import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import type { ResultSetHeader } from "mysql2";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { booking_type, date, time, email, branch, home_address } = await req.json();

  const [result] = await db.execute<ResultSetHeader>(
    `UPDATE appointments
     SET booking_type = ?, date = ?, time = ?, email = ?,
         branch = ?, home_address = ?, updated_at = NOW()
     WHERE id = ?`,
    [booking_type, new Date(date), time, email, branch ?? null, home_address ?? null, id]
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
    "DELETE FROM appointments WHERE id = ?",
    [id]
  );
  if (result.affectedRows === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
