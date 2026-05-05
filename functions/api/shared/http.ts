export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
}

export function options(): Response {
  return new Response(null, { status: 204 });
}

export function getPathname(request: Request) {
  return new URL(request.url).pathname.replace(/^\/api\/?/, "");
}

export function getEffectiveMethod(request: Request) {
  const method = request.method.toUpperCase();
  if (method === "POST") {
    const override = request.headers.get("x-http-method-override");
    if (override) return override.toUpperCase();
    
    const url = new URL(request.url);
    const queryOverride = url.searchParams.get("_method");
    if (queryOverride) return queryOverride.toUpperCase();
  }
  return method;
}

// ========== CORS & Security Headers ==========

const PRODUCTION_ORIGIN = "https://mengundanganda.com";

/**
 * Validate the request's Origin header against allowed domains.
 * Returns the origin to echo back in CORS headers.
 */
export function getAllowedOrigin(request: Request): string {
  const origin = request.headers.get("origin") || "";
  if (!origin) return PRODUCTION_ORIGIN;

  // Production domain
  if (
    origin === PRODUCTION_ORIGIN ||
    origin === "https://www.mengundanganda.com"
  ) {
    return origin;
  }

  // Invitation subdomains: slug.mengundanganda.com
  if (
    origin.startsWith("https://") &&
    origin.endsWith(".mengundanganda.com")
  ) {
    return origin;
  }

  // Local development
  if (
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:")
  ) {
    return origin;
  }

  return PRODUCTION_ORIGIN;
}

const CORS_METHODS = "GET,POST,PUT,DELETE,PATCH,OPTIONS";
const CORS_HEADERS =
  "content-type,authorization,x-access-token,x-http-method-override";

const SECURITY_HEADERS: Record<string, string> = {
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
};

/**
 * Wrap any Response with validated CORS origin and security headers.
 * Called once at the top-level handler so every response is secured.
 */
export function wrapResponse(response: Response, request: Request): Response {
  const origin = getAllowedOrigin(request);
  const headers = new Headers(response.headers);

  headers.set("access-control-allow-origin", origin);
  headers.set("access-control-allow-methods", CORS_METHODS);
  headers.set("access-control-allow-headers", CORS_HEADERS);

  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    headers.set(k, v);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Secure CORS preflight response with validated origin.
 */
export function secureOptions(request: Request): Response {
  const origin = getAllowedOrigin(request);
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": origin,
      "access-control-allow-methods": CORS_METHODS,
      "access-control-allow-headers": CORS_HEADERS,
      "access-control-max-age": "86400",
      ...SECURITY_HEADERS,
    },
  });
}
