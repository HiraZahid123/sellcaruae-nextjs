import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export const dynamic = "force-dynamic";

const VALID_STATUSES = [
  "NEW_LEAD", "IN_NEGOTIATION", "VISITED", "PURCHASED", "FAKE_LEAD", "NUMBER_NOT_WORKING",
];

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = 20;
  const offset = (page - 1) * limit;
  const status = searchParams.get("status") || "";
  const search = searchParams.get("search") || "";

  const conditions: string[] = [];
  const params: (string | number | null)[] = [];

  if (status && VALID_STATUSES.includes(status)) {
    conditions.push("l.status = ?");
    params.push(status);
  }
  if (search) {
    conditions.push("(l.phone_number LIKE ? OR l.make LIKE ? OR l.model LIKE ?)");
    const like = `%${search}%`;
    params.push(like, like, like);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const [[countRows], [rows]] = await Promise.all([
    db.execute<RowDataPacket[]>(`SELECT COUNT(*) as total FROM leads l ${where}`, params),
    db.execute<RowDataPacket[]>(
      `SELECT l.id, l.phone_number, l.make, l.model, l.year, l.mileage,
              l.specifications, l.your_price, l.status, l.is_verified,
              l.user_ip, l.created_at,
              a.booking_type, a.date as appt_date, a.time as appt_time,
              a.branch, a.home_address, a.email as appt_email
       FROM leads l
       LEFT JOIN appointments a ON a.lead_id = l.id AND a.is_latest = 1
       ${where}
       ORDER BY l.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    ),
  ]);

  const total = countRows[0]?.total ?? 0;

  return NextResponse.json({
    data: rows,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status } = await req.json();
  if (!id || !status || !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid id or status" }, { status: 400 });
  }

  const [result] = await db.execute<ResultSetHeader>(
    "UPDATE leads SET status = ?, updated_at = NOW() WHERE id = ?",
    [status, id]
  );

  if (result.affectedRows === 0) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
