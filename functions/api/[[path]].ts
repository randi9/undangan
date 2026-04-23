import { getSupabase } from "../_lib/supabase";
import { getPathname, json, options } from "./shared/http";
import { dispatchAuthRoute } from "./routes/auth";
import { dispatchDebugRoute } from "./routes/debug";
import { dispatchGuestRoute } from "./routes/guests";
import { dispatchHealthRoute } from "./routes/health";
import { dispatchInvitationRoute } from "./routes/invitations";
import { dispatchMusicRoute } from "./routes/music";
import { dispatchOrderRoute } from "./routes/orders";
import { dispatchPaymentRoute } from "./routes/payment";
import { dispatchRsvpRoute } from "./routes/rsvp";
import { dispatchUploadRoute } from "./routes/upload";
import { dispatchVoucherRoute } from "./routes/vouchers";
import type { ApiDispatcher } from "./types/api";

const dispatchers: ApiDispatcher[] = [
  dispatchHealthRoute,
  dispatchAuthRoute,
  dispatchInvitationRoute,
  dispatchRsvpRoute,
  dispatchGuestRoute,
  dispatchMusicRoute,
  dispatchVoucherRoute,
  dispatchOrderRoute,
  dispatchPaymentRoute,
  dispatchDebugRoute,
  dispatchUploadRoute,
];

async function dispatchApiRequest(
  supabase: any,
  env: any,
  request: Request,
  pathname: string,
) {
  for (const dispatch of dispatchers) {
    const response = await dispatch({ supabase, env, request, pathname });
    if (response) return response;
  }

  return json({ error: `Route tidak didukung: /api/${pathname}` }, 404);
}

export async function onRequest(context: any) {
  const { request, env } = context;

  if (request.method === "OPTIONS") return options();

  try {
    const pathname = getPathname(request);

    const isHealthRequest = pathname === "health" || pathname === "";
    const supabaseUrl =
      env?.SUPABASE_URL ||
      env?.VITE_SUPABASE_URL ||
      env?.SUPABASE_VITE_SUPABASE_URL ||
      "";
    const supabaseKey =
      env?.SUPABASE_SECRET_KEY ||
      env?.SUPABASE_SERVICE_ROLE_KEY ||
      env?.SUPABASE_ANON_KEY ||
      env?.VITE_SUPABASE_ANON_KEY ||
      "";

    if (!isHealthRequest && (!supabaseUrl || !supabaseKey)) {
      return json(
        {
          error:
            "Server belum dikonfigurasi. Hubungi admin (Supabase env vars missing).",
        },
        503,
      );
    }

    const supabase = getSupabase(env);
    return await dispatchApiRequest(supabase, env, request, pathname);
  } catch (err: any) {
    return json({ error: err?.message || "Server error" }, 500);
  }
}
