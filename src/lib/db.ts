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

// Lazy getter — pool is created on first use, not at module evaluation time.
// This prevents build-time crashes when DATABASE_URL is not set.
function getPool() {
  if (!globalThis._mysqlPool) {
    globalThis._mysqlPool = createPool();
  }
  return globalThis._mysqlPool;
}

export default new Proxy({} as mysql.Pool, {
  get(_target, prop) {
    return (getPool() as never)[prop as keyof mysql.Pool];
  },
});
