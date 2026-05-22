import mysql from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
}

function createPool() {
  const url = new URL(process.env.DATABASE_URL!);
  return mysql.createPool({
    host: url.hostname,
    port: parseInt(url.port || "3307"),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ""),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

// Reuse pool across hot-reloads in dev
const pool = globalThis._mysqlPool ?? createPool();
if (process.env.NODE_ENV !== "production") globalThis._mysqlPool = pool;

export default pool;
