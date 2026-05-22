import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const upcoming = searchParams.get("upcoming") === "1";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = 20;
  const offset = (page - 1) * limit;

  const where = upcoming ? "WHERE a.date >= CURDATE() AND a.is_latest = 1" : "WHERE a.is_latest = 1";

  const [[countRows], [rows]] = await Promise.all([
    db.execute<RowDataPacket[]>(`SELECT COUNT(*) as total FROM appointments a ${where}`),
    db.execute<RowDataPacket[]>(
      `SELECT a.id, a.lead_id, a.booking_type, a.branch, a.home_address,
              a.date, a.time, a.email, a.created_at,
              l.phone_number, l.make, l.model, l.year, l.status as lead_status
       FROM appointments a
       INNER JOIN leads l ON l.id = a.lead_id
       ${where}
       ORDER BY a.date ASC, a.time ASC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    ),
  ]);

  const total = countRows[0]?.total ?? 0;
  return NextResponse.json({ data: rows, total, page, pages: Math.ceil(total / limit) });
}
