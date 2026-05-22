import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [[totalsRows], [todayRows], [statusRows], [upcomingRows]] = await Promise.all([
    db.execute<RowDataPacket[]>("SELECT COUNT(*) as total FROM leads"),
    db.execute<RowDataPacket[]>("SELECT COUNT(*) as cnt FROM leads WHERE created_at >= ?", [today]),
    db.execute<RowDataPacket[]>(
      "SELECT status, COUNT(*) as cnt FROM leads GROUP BY status ORDER BY cnt DESC"
    ),
    db.execute<RowDataPacket[]>(
      "SELECT COUNT(*) as cnt FROM appointments WHERE date >= CURDATE() AND is_latest = 1"
    ),
  ]);

  return NextResponse.json({
    totalLeads: totalsRows[0]?.total ?? 0,
    todayLeads: todayRows[0]?.cnt ?? 0,
    upcomingAppointments: upcomingRows[0]?.cnt ?? 0,
    byStatus: statusRows,
  });
}
