import { json } from "../shared/http";
import { requireAdminUser, requireUser, unauthorized } from "../shared/auth";
import type { ApiDispatcher } from "../types/api";

/**
 * Debug endpoint — only available to authenticated admin users.
 * Returns basic connectivity checks without leaking internal details.
 */
async function handleDebugProbe(db: D1Database, request: Request, env: any) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const checks: Record<string, string> = {};

  checks.uuid = crypto.randomUUID();

  try {
    const result = await db
      .prepare("SELECT id FROM invitations LIMIT 1")
      .first();
    checks.d1_query = "ok";
  } catch {
    checks.d1_query = "error";
  }

  return json({ status: "ok", checks });
}

export const dispatchDebugRoute: ApiDispatcher = async ({
  db,
  env,
  request,
  pathname,
}) => {
  if (pathname === "debug" && request.method === "POST")
    return await handleDebugProbe(db, request, env);
  return null;
};
