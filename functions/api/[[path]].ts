import { getSupabase } from "../_lib/supabase";
import { getPathname, json, secureOptions, wrapResponse } from "./shared/http";
import { ValidationError } from "./shared/validation";
import { dispatchAuthRoute } from "./routes/auth";
import { dispatchClientRoute } from "./routes/client";
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
import { dispatchChatRoute } from "./routes/chat";
import type { ApiDispatcher } from "./types/api";

const dispatchers: ApiDispatcher[] = [
  dispatchHealthRoute,
  dispatchAuthRoute,
  dispatchClientRoute,
  dispatchInvitationRoute,
  dispatchRsvpRoute,
  dispatchGuestRoute,
  dispatchMusicRoute,
  dispatchVoucherRoute,
  dispatchOrderRoute,
  dispatchPaymentRoute,
  dispatchDebugRoute,
  dispatchUploadRoute,
  dispatchChatRoute,
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

  // CORS preflight — respond with validated origin, not wildcard
  if (request.method === "OPTIONS") return secureOptions(request);

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
      return wrapResponse(
        json(
          {
            error:
              "Server belum dikonfigurasi. Hubungi admin.",
          },
          503,
        ),
        request,
      );
    }

    const supabase = getSupabase(env);
    const response = await dispatchApiRequest(supabase, env, request, pathname);

    // Wrap every response with validated CORS origin + security headers
    return wrapResponse(response, request);
  } catch (err: any) {
    // Zod validation errors → 400
    if (err instanceof ValidationError) {
      return wrapResponse(
        json({ error: err.message, issues: err.issues }, 400),
        request,
      );
    }
    // Don't leak internal error messages to clients
    console.error("[API] Unhandled error:", err?.message, err?.stack);
    return wrapResponse(
      json({ error: "Terjadi kesalahan pada server." }, 500),
      request,
    );
  }
}
