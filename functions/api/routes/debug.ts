import { json } from "../shared/http";
import type { ApiDispatcher } from "../types/api";

async function handleDebugProbe(supabase: any, request: Request) {
  const body = await request.json().catch(() => ({}));
  const checks: Record<string, string> = {};

  checks.body_parsed = body ? "ok" : "MISSING";
  checks.body_keys = body ? Object.keys(body).join(",") : "none";
  checks.uuid = crypto.randomUUID();

  const { error } = await supabase.from("invitations").select("id").limit(1);
  checks.supabase_query = error ? `ERROR: ${error.message}` : "ok";

  return json({ status: "ok", checks });
}

export const dispatchDebugRoute: ApiDispatcher = async ({
  supabase,
  request,
  pathname,
}) => {
  if (pathname === "debug" && request.method === "POST")
    return await handleDebugProbe(supabase, request);
  return null;
};
