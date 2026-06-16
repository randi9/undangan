import { getDb } from "../api/shared/db";
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
import { dispatchWoRoute } from "./routes/wo";
import type { ApiDispatcher } from "./types/api";

const dispatchers: ApiDispatcher[] = [
  dispatchHealthRoute,
  dispatchAuthRoute,
  dispatchClientRoute,
  dispatchWoRoute,
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
  db: D1Database,
  env: any,
  request: Request,
  pathname: string,
) {
  for (const dispatch of dispatchers) {
    const response = await dispatch({ db, env, request, pathname });
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

    // Check D1 binding availability
    if (!isHealthRequest && !env?.DB) {
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

    const db = getDb(env);
    const response = await dispatchApiRequest(db, env, request, pathname);

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
