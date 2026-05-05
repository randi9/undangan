import { json } from "../shared/http";
import { requireAdminUser, requireUser, unauthorized } from "../shared/auth";
import type { ApiDispatcher } from "../types/api";

/**
 * Debug endpoint — only available to authenticated admin users.
 * Returns basic connectivity checks without leaking internal details.
 */
async function handleDebugProbe(supabase: any, request: Request, env: any) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const checks: Record<string, string> = {};

  checks.uuid = crypto.randomUUID();

  const { error } = await supabase.from("invitations").select("id").limit(1);
  checks.supabase_query = error ? "error" : "ok";

  return json({ status: "ok", checks });
}

export const dispatchDebugRoute: ApiDispatcher = async ({
  supabase,
  env,
  request,
  pathname,
}) => {
  if (pathname === "debug" && request.method === "POST")
    return await handleDebugProbe(supabase, request, env);
  return null;
};
