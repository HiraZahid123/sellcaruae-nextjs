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
    `SELECT l.*, a.booking_type, a.date as appt_date, a.time as appt_time,
            a.branch, a.home_address, a.email as appt_email, a.id as appt_id
     FROM leads l
     LEFT JOIN appointments a ON a.lead_id = l.id AND a.is_latest = 1
     WHERE l.id = ? LIMIT 1`,
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
  const { phone_number, your_price, mileage, specifications, status } = await req.json();

  const fields: string[] = [];
  const values: (string | null)[] = [];

  if (phone_number !== undefined) { fields.push("phone_number = ?"); values.push(phone_number); }
  if (your_price !== undefined) { fields.push("your_price = ?"); values.push(your_price ?? null); }
  if (mileage !== undefined) { fields.push("mileage = ?"); values.push(mileage ?? null); }
  if (specifications !== undefined) { fields.push("specifications = ?"); values.push(specifications ?? null); }
  if (status !== undefined) { fields.push("status = ?"); values.push(status); }

  if (fields.length === 0) return NextResponse.json({ error: "No fields to update" }, { status: 400 });

  fields.push("updated_at = NOW()");
  values.push(id);

  const [result] = await db.execute<ResultSetHeader>(
    `UPDATE leads SET ${fields.join(", ")} WHERE id = ?`,
    values
  );

  if (result.affectedRows === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
