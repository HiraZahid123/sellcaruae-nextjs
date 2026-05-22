/**
 * Indexes all variants into Meilisearch for fast search.
 * Run: npx tsx scripts/index-meilisearch.ts
 * Re-run anytime car data changes.
 */

import "dotenv/config";
import { Meilisearch } from "meilisearch";
import mysql from "mysql2/promise";

const client = new Meilisearch({
  host: process.env.MEILISEARCH_HOST!,
  apiKey: process.env.MEILISEARCH_API_KEY,
});

const BATCH = 1000;

function log(msg: string) { process.stdout.write(msg); }

async function main() {
  const dbUrl = new URL(process.env.DATABASE_URL!);
  const db = await mysql.createConnection({
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port || "3307"),
    user: decodeURIComponent(dbUrl.username),
    password: decodeURIComponent(dbUrl.password),
    database: dbUrl.pathname.replace(/^\//, ""),
  });

  console.log("✓ Connected to MySQL");

  // Configure the index
  const index = client.index("variants");

  await index.updateSettings({
    searchableAttributes: ["name", "make", "model", "body_type", "engine", "transmission"],
    filterableAttributes: ["make", "model", "year", "gcc_specs", "is_active"],
    sortableAttributes: ["year", "name"],
    rankingRules: [
      "words", "typo", "proximity", "attribute", "sort", "exactness",
    ],
  });
  console.log("✓ Index settings configured");

  // Load all variants with make and model names
  const [rows] = await db.execute<mysql.RowDataPacket[]>(
    `SELECT v.id, v.year, v.name, v.body_type, v.engine, v.transmission,
            v.gcc_specs, v.is_active,
            m.name AS make, m.slug AS make_slug,
            cm.name AS model, cm.slug AS model_slug
     FROM variants v
     INNER JOIN car_models cm ON cm.id = v.model_id
     INNER JOIN makes m ON m.id = cm.make_id
     WHERE v.is_active = 1
     ORDER BY v.id`
  );

  console.log(`\n→ Indexing ${rows.length} variants into Meilisearch...`);

  let indexed = 0;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    await index.addDocuments(batch, { primaryKey: "id" });
    indexed += batch.length;
    log(`\r  ${indexed} / ${rows.length}`);
  }

  // Wait for all tasks to complete
  console.log("\n→ Waiting for indexing to finish...");
  const task = await index.addDocuments([]);
  await client.tasks.waitForTask(task.taskUid);

  const stats = await index.getStats();
  console.log(`\n✅ Done! ${stats.numberOfDocuments} documents indexed in Meilisearch.`);

  await db.end();
}

main().catch((e) => { console.error("\n❌ Error:", e.message); process.exit(1); });
