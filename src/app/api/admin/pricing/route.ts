import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = 30;
  const offset = (page - 1) * limit;

  const where = search
    ? "WHERE (v.name LIKE ? OR m.name LIKE ? OR cm.name LIKE ?)"
    : "";
  const params: (string | number)[] = search ? [`%${search}%`, `%${search}%`, `%${search}%`] : [];

  const [[countRows], [rows]] = await Promise.all([
    db.execute<RowDataPacket[]>(
      `SELECT COUNT(*) as total FROM variants v
       INNER JOIN car_models cm ON cm.id = v.model_id
       INNER JOIN makes m ON m.id = cm.make_id
       ${where}`,
      params
    ),
    db.execute<RowDataPacket[]>(
      `SELECT v.id, v.name, v.year, v.body_type, v.transmission,
              v.price_min, v.price_max, v.is_active,
              m.name as make_name, cm.name as model_name
       FROM variants v
       INNER JOIN car_models cm ON cm.id = v.model_id
       INNER JOIN makes m ON m.id = cm.make_id
       ${where}
       ORDER BY m.name, cm.name, v.year DESC, v.name
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    ),
  ]);

  const total = countRows[0]?.total ?? 0;
  return NextResponse.json({ data: rows, total, page, pages: Math.ceil(total / limit) });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, price_min, price_max } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const [result] = await db.execute<ResultSetHeader>(
    "UPDATE variants SET price_min = ?, price_max = ?, updated_at = NOW() WHERE id = ?",
    [price_min ?? null, price_max ?? null, id]
  );

  if (result.affectedRows === 0) return NextResponse.json({ error: "Variant not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
