/**
 * Simple Rate Limiter for Cloudflare Workers/Pages Functions
 *
 * Uses in-memory Map per worker instance. While not globally distributed,
 * it protects against single-source abuse within each edge location.
 *
 * For production-grade rate limiting, use Cloudflare Rate Limiting Rules
 * or Cloudflare KV/Durable Objects.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();
const CLEANUP_INTERVAL = 60_000; // Clean expired entries every 60s
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

/**
 * Check if a request should be rate-limited.
 *
 * @param key     Unique identifier (e.g. IP + endpoint)
 * @param limit   Max requests per window
 * @param windowMs Window duration in milliseconds
 * @returns `null` if allowed, or a `Response` to return if rate-limited
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Response | null {
  cleanup();

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  entry.count++;
  if (entry.count > limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return new Response(
      JSON.stringify({
        error: "Terlalu banyak permintaan. Coba lagi nanti.",
        retry_after: retryAfter,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(retryAfter),
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  return null;
}

/**
 * Get the client IP from Cloudflare headers.
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    "unknown"
  );
}
