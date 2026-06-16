import { json } from "../shared/http";
import type { ApiDispatcher } from "../types/api";
import { getClerkSecret } from "../shared/auth";

export const dispatchHealthRoute: ApiDispatcher = async ({ pathname, env }) => {
  if (pathname !== "" && pathname !== "health") return null;

  const clerkSecret = getClerkSecret(env);

  // Test D1 connection with a real query
  let dbStatus = "not_tested";
  if (env?.DB) {
    try {
      const result = await env.DB
        .prepare("SELECT COUNT(*) as cnt FROM users")
        .first();
      dbStatus = result ? "ok" : "error";
    } catch {
      dbStatus = "connection_error";
    }
  }

  return json({
    status: "ok",
    timestamp: new Date().toISOString(),
    database: env?.DB ? "d1_configured" : "missing",
    database_query: dbStatus,
    clerk: clerkSecret ? "configured" : "missing",
    runtime: "cloudflare-pages-functions",
  });
};
