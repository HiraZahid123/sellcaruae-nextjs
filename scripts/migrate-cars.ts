/**
 * One-time migration: Neon DB (READ-ONLY) → local MySQL
 * Uses mysql2 for fast bulk inserts. Only runs SELECT against Neon.
 * Run: npx tsx scripts/migrate-cars.ts
 */

import "dotenv/config";
import { Client as PgClient } from "pg";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const pg = new PgClient({ connectionString: process.env.NEON_DB_URL });

const BATCH = 500;

function log(msg: string) { process.stdout.write(msg); }

async function main() {
  await pg.connect();
  console.log("✓ Connected to Neon DB (read-only)");

  // DATABASE_URL format: mysql://root:@localhost:3306/sellcaruae
  const dbUrl = new URL(process.env.DATABASE_URL!);
  const dbConn = await mysql.createConnection({
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port || "3306"),
    user: decodeURIComponent(dbUrl.username),
    password: decodeURIComponent(dbUrl.password),
    database: dbUrl.pathname.replace(/^\//, ""),
  });
  console.log("✓ Connected to MySQL\n");

  // ── 1. MAKES ──────────────────────────────────────────────────────────────
  console.log("→ Migrating makes...");
  const { rows: makes } = await pg.query<{
    id: number; name: string; slug: string;
    logo_url: string | null; is_active: boolean; display_order: number;
  }>("SELECT id, name, slug, logo_url, is_active, display_order FROM makes ORDER BY id");

  const makeIdMap = new Map<number, number>();
  for (const m of makes) {
    const [result] = await dbConn.execute<mysql.ResultSetHeader>(
      `INSERT INTO makes (name, slug, logo_url, is_active, display_order, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())
       ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
      [m.name, m.slug, m.logo_url, m.is_active ? 1 : 0, m.display_order ?? 0]
    );
    makeIdMap.set(m.id, result.insertId);
  }
  console.log(`  ✓ ${makes.length} makes\n`);

  // ── 2. CAR MODELS ─────────────────────────────────────────────────────────
  console.log("→ Migrating car models...");
  const { rows: models } = await pg.query<{
    id: number; make_id: number; name: string; slug: string; is_active: boolean;
  }>("SELECT id, make_id, name, slug, is_active FROM car_models ORDER BY id");

  const modelIdMap = new Map<number, number>();
  for (let i = 0; i < models.length; i++) {
    const m = models[i];
    const mysqlMakeId = makeIdMap.get(m.make_id);
    if (!mysqlMakeId) continue;
    const [result] = await dbConn.execute<mysql.ResultSetHeader>(
      `INSERT INTO car_models (make_id, name, slug, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, NOW(), NOW())
       ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
      [mysqlMakeId, m.name, m.slug, m.is_active ? 1 : 0]
    );
    modelIdMap.set(m.id, result.insertId);
    if ((i + 1) % 200 === 0) log(`\r  ${i + 1} / ${models.length}`);
  }
  console.log(`\r  ✓ ${models.length} models\n`);

  // ── 3. VARIANTS ───────────────────────────────────────────────────────────
  console.log("→ Migrating variants...");
  const { rows: variants } = await pg.query<{
    id: number; model_id: number; year: number; name: string;
    body_type: string | null; engine: string | null;
    transmission: string | null; gcc_specs: boolean; is_active: boolean;
  }>(
    "SELECT id, model_id, year, name, body_type, engine, transmission, gcc_specs, is_active FROM variants ORDER BY id"
  );

  let inserted = 0;
  for (let i = 0; i < variants.length; i += BATCH) {
    const batch = variants.slice(i, i + BATCH);
    const rows = batch
      .map((v) => {
        const mysqlModelId = modelIdMap.get(v.model_id);
        if (!mysqlModelId) return null;
        return [mysqlModelId, v.year, v.name, v.body_type, v.engine, v.transmission, v.gcc_specs ? 1 : 0, v.is_active ? 1 : 0];
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    if (rows.length > 0) {
      const placeholders = rows.map(() => "(?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())").join(",");
      const flat = rows.flat();
      await dbConn.execute(
        `INSERT INTO variants (model_id, year, name, body_type, engine, transmission, gcc_specs, is_active, created_at, updated_at) VALUES ${placeholders}`,
        flat
      );
      inserted += rows.length;
    }
    log(`\r  ${Math.min(i + BATCH, variants.length)} / ${variants.length}`);
  }
  console.log(`\r  ✓ ${inserted} variants\n`);

  // ── 4. ROLES & ADMIN ──────────────────────────────────────────────────────
  console.log("→ Seeding roles and admin user...");
  await dbConn.execute(
    `INSERT IGNORE INTO roles (type, created_at) VALUES ('admin', NOW()), ('staff', NOW())`
  );
  const [[adminRole]] = await dbConn.execute<mysql.RowDataPacket[]>(
    "SELECT id FROM roles WHERE type = 'admin' LIMIT 1"
  );

  const hashed = await bcrypt.hash("Admin@123", 12);
  await dbConn.execute(
    `INSERT INTO users (email, password, role_id, is_active, created_at, updated_at)
     VALUES (?, ?, ?, 1, NOW(), NOW())
     ON DUPLICATE KEY UPDATE id=id`,
    ["admin@sellcaruae.com", hashed, adminRole.id]
  );
  console.log("  ✓ Admin: admin@sellcaruae.com / Admin@123  ← change after first login\n");

  // ── VERIFY ────────────────────────────────────────────────────────────────
  const [[mc]] = await dbConn.execute<mysql.RowDataPacket[]>("SELECT COUNT(*) as c FROM makes");
  const [[mm]] = await dbConn.execute<mysql.RowDataPacket[]>("SELECT COUNT(*) as c FROM car_models");
  const [[mv]] = await dbConn.execute<mysql.RowDataPacket[]>("SELECT COUNT(*) as c FROM variants");
  console.log("✅ Migration complete!");
  console.log(`   Makes: ${mc.c} | Models: ${mm.c} | Variants: ${mv.c}`);

  await dbConn.end();
  await pg.end();
}

main().catch((e) => { console.error("\n❌ Error:", e.message); process.exit(1); });
