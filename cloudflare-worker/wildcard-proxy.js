/**
 * Cloudflare Worker — Wildcard Subdomain Proxy
 *
 * Menangkap traffic untuk *.mengundanganda.com dan mem-proxy ke
 * Vercel deployment utama (www.mengundanganda.com).
 *
 * Cara kerja:
 *   1. User buka slug.mengundanganda.com
 *   2. Cloudflare intercept (karena * A record Proxied)
 *   3. Worker ini fetch content dari www.mengundanganda.com (Vercel)
 *   4. Browser tetap menampilkan slug.mengundanganda.com
 *   5. Vue Router detect subdomain → render undangan
 */

const BASE_DOMAIN = "mengundanganda.com";

// Vercel primary domain sudah TIDAK DIPAKAI.
// Karena sekarang menggunakan Cloudflare Pages, Worker TIDAK BOLEH melakukan fetch
// ke domain yang sama di zona Cloudflare (www.mengundanganda.com) karena akan
// menyebabkan infinite loop / 522 Connection Timed Out.
// Solusi: Fetch langsung ke URL mentah Cloudflare Pages (.pages.dev)
const ORIGIN_HOST = "undangan-8w2.pages.dev";

// Subdomain yang TIDAK boleh di-proxy oleh Worker ini
const EXCLUDED_SUBDOMAINS = new Set([
  "www",
  "media", // R2 bucket uploads
  "music", // R2 bucket music
  "accounts", // Clerk auth
  "clerk", // Clerk API
  "clkmail", // Clerk email
]);

// ===============================
// Edge security hardening
// ===============================
const RATE_LIMIT_RULES = [
  // Sensitive write endpoints (strict)
  {
    name: "auth-write",
    methods: ["POST", "PUT", "PATCH", "DELETE"],
    pathRegex: /^\/api\/auth(?:\/|$)/,
    limit: 20,
    windowSec: 60,
  },
  {
    name: "upload-write",
    methods: ["POST", "PUT", "PATCH", "DELETE"],
    pathRegex: /^\/api\/upload(?:\/|$)/,
    limit: 30,
    windowSec: 60,
  },
  {
    name: "payment-write",
    methods: ["POST", "PUT", "PATCH", "DELETE"],
    pathRegex: /^\/api\/payment(?:\/|$)/,
    limit: 20,
    windowSec: 60,
  },
  // RSVP dibuat lebih longgar untuk traffic event (mis. share ke grup WA)
  // keyMode 'ip+invitation' mengurangi false-positive saat banyak event aktif
  {
    name: "rsvp-write",
    methods: ["POST"],
    pathRegex: /^\/api\/rsvp(?:\/|$)/,
    limit: 180,
    windowSec: 60,
    keyMode: "ip+invitation",
  },

  // General API fallback
  {
    name: "api-write",
    methods: ["POST", "PUT", "PATCH", "DELETE"],
    pathRegex: /^\/api\//,
    limit: 60,
    windowSec: 60,
  },
  {
    name: "api-read",
    methods: ["GET"],
    pathRegex: /^\/api\//,
    limit: 240,
    windowSec: 60,
  },
];

const memoryRateStore = new Map();

function getClientIp(request) {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";

  return "unknown";
}

function getBotSignals(request) {
  const botManagement = request.cf?.botManagement;
  const score =
    typeof botManagement?.score === "number" ? botManagement.score : null;
  const verifiedBot = botManagement?.verifiedBot === true;
  return { score, verifiedBot };
}

function getRateRule(pathname, method) {
  for (const rule of RATE_LIMIT_RULES) {
    if (rule.methods.includes(method) && rule.pathRegex.test(pathname)) {
      return rule;
    }
  }
  return null;
}

function getWindowBucket(windowSec) {
  return Math.floor(Date.now() / 1000 / windowSec);
}

function getRetryAfter(windowSec) {
  const now = Math.floor(Date.now() / 1000);
  return windowSec - (now % windowSec);
}

async function checkRateLimitKV(env, key, limit, windowSec) {
  if (!env?.RATE_LIMIT_KV) return null;

  const bucket = getWindowBucket(windowSec);
  const storageKey = `${key}:${bucket}`;
  const currentRaw = await env.RATE_LIMIT_KV.get(storageKey);
  const current = Number.parseInt(currentRaw || "0", 10) || 0;

  if (current >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: getRetryAfter(windowSec),
    };
  }

  await env.RATE_LIMIT_KV.put(storageKey, String(current + 1), {
    expirationTtl: windowSec + 5,
  });

  return {
    allowed: true,
    remaining: Math.max(0, limit - (current + 1)),
    retryAfter: getRetryAfter(windowSec),
  };
}

function checkRateLimitMemory(key, limit, windowSec) {
  const bucket = getWindowBucket(windowSec);
  const storageKey = `${key}:${bucket}`;
  const now = Date.now();
  const expiresAt = now + windowSec * 1000 + 5000;

  const currentRecord = memoryRateStore.get(storageKey);
  const current = currentRecord?.count || 0;

  if (current >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: getRetryAfter(windowSec),
    };
  }

  memoryRateStore.set(storageKey, {
    count: current + 1,
    expiresAt,
  });

  // best-effort cleanup to prevent unbounded memory growth
  for (const [k, v] of memoryRateStore.entries()) {
    if (v.expiresAt <= now) {
      memoryRateStore.delete(k);
    }
  }

  return {
    allowed: true,
    remaining: Math.max(0, limit - (current + 1)),
    retryAfter: getRetryAfter(windowSec),
  };
}

async function enforceRateLimit(request, env, pathname) {
  if (request.method === "OPTIONS") {
    return { allowed: true, remaining: null, retryAfter: null };
  }

  const rule = getRateRule(pathname, request.method);
  if (!rule) {
    return { allowed: true, remaining: null, retryAfter: null };
  }

  const ip = getClientIp(request);
  const keySubject = await resolveRateLimitSubject(rule, request, pathname);
  const key = `rl:${rule.name}:${ip}:${keySubject}`;

  const kvResult = await checkRateLimitKV(env, key, rule.limit, rule.windowSec);
  if (kvResult) return kvResult;

  return checkRateLimitMemory(key, rule.limit, rule.windowSec);
}

async function resolveRateLimitSubject(rule, request, pathname) {
  if (
    rule.keyMode === "ip+invitation" &&
    request.method === "POST" &&
    pathname.startsWith("/api/rsvp")
  ) {
    const invitationId = await extractInvitationIdFromRsvpRequest(request);
    return `inv:${invitationId}`;
  }

  return "global";
}

async function extractInvitationIdFromRsvpRequest(request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const cloned = request.clone();

    if (contentType.includes("application/json")) {
      const body = await cloned.json();
      return String(body?.invitation_id || body?.invitationId || "unknown");
    }

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await cloned.text();
      const params = new URLSearchParams(text);
      return (
        params.get("invitation_id") || params.get("invitationId") || "unknown"
      );
    }

    if (contentType.includes("multipart/form-data")) {
      const form = await cloned.formData();
      return String(
        form.get("invitation_id") || form.get("invitationId") || "unknown",
      );
    }
  } catch {
    // ignore parse error, fallback below
  }

  return "unknown";
}

function isSuspiciousApiBot(request, pathname) {
  const { score, verifiedBot } = getBotSignals(request);

  // Never block authenticated API requests — these are legitimate browser
  // fetch() calls carrying a Clerk JWT.  Auth + rate-limiting already protect them.
  if (pathname.startsWith("/api/") && request.headers.get("authorization")) {
    return false;
  }

  // Uploads are legitimate browser-driven traffic and should not be blocked
  // by bot heuristics; rate limiting already protects them.
  if (pathname.startsWith("/api/upload/")) return false;

  // Invitation edit/save requests are also legitimate browser actions.
  // Keep them out of the bot heuristic and rely on auth + rate limiting.
  if (
    pathname.startsWith("/api/invitations/") &&
    ["PUT", "PATCH", "DELETE", "POST"].includes(request.method)
  ) {
    return false;
  }

  // Allow whitelisted/verified bots (e.g. Googlebot) completely
  if (verifiedBot) return false;

  // Use Cloudflare bot management score (0-100)
  // Scores <= 2 generally mean clearly malicious automated traffic
  // (Raised from 5 to reduce false-positives on legitimate browsers)
  if (score !== null && score <= 2) {
    return true;
  }

  // Apply deeper heuristic only for critical writes
  if (pathname.startsWith("/api/")) {
    const method = request.method;
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      const ua = (request.headers.get("user-agent") || "").toLowerCase();
      const looksLikeBot =
        /(bot|crawler|spider|curl|python|wget|httpclient|scrapy)/.test(ua);
      if (looksLikeBot) return true;
    }
  }

  return false;
}

function jsonError(status, body, extraHeaders = {}) {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    ...extraHeaders,
  });

  return new Response(JSON.stringify(body), { status, headers });
}

function shouldHandleWildcardProxy(hostname) {
  return hostname.endsWith(`.${BASE_DOMAIN}`);
}

function extractSubdomain(hostname) {
  return hostname.replace(`.${BASE_DOMAIN}`, "");
}

function shouldBypassSubdomain(subdomain) {
  return EXCLUDED_SUBDOMAINS.has(subdomain) || subdomain.includes(".");
}

function createOriginRequest(request, originUrl, hostname, subdomain) {
  const newHeaders = new Headers(request.headers);
  newHeaders.set("Host", ORIGIN_HOST);
  newHeaders.set("X-Forwarded-Host", hostname);
  newHeaders.set("X-Original-Subdomain", subdomain);

  return new Request(originUrl.toString(), {
    method: request.method,
    headers: newHeaders,
    body: request.body,
    redirect: "manual",
  });
}

function rewriteRedirectToSubdomain(response, originUrl, hostname) {
  if (response.status < 300 || response.status >= 400) {
    return null;
  }

  const location = response.headers.get("Location");
  if (!location) {
    return null;
  }

  try {
    const locUrl = new URL(location, originUrl);
    if (locUrl.hostname === BASE_DOMAIN || locUrl.hostname === ORIGIN_HOST) {
      locUrl.hostname = hostname;
      const redirectHeaders = new Headers(response.headers);
      redirectHeaders.set("Location", locUrl.toString());
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: redirectHeaders,
      });
    }
  } catch {
    // URL parsing gagal, gunakan response original
  }

  return null;
}

const seoMetaCache = new Map();

async function buildDynamicSeoMeta(subdomain) {
  let isChanged = false;
  let dynTitle = "Undangan Pernikahan";
  let dynDesc = "Kami mengundang Anda untuk hadir di acara pernikahan kami.";
  let dynImg = "https://media.mengundanganda.com/landing-page/og-image.webp";

  const now = Date.now();
  const cacheEntry = seoMetaCache.get(subdomain);
  if (cacheEntry && cacheEntry.expires > now) {
    return cacheEntry.data;
  }

  try {
    const apiUrl = `https://${ORIGIN_HOST}/api/invitations/slug/${subdomain}?preview=true`;
    const apiRes = await fetch(apiUrl);
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data.groom_name && data.bride_name) {
        dynTitle = `Undangan Pernikahan ${data.groom_name} & ${data.bride_name}`;
        isChanged = true;
      }
      if (data.quote) {
        dynDesc = data.quote.substring(0, 150);
      }
      if (data.cover_photo) {
        dynImg = data.cover_photo;
      }
    }
  } catch (err) {
    console.warn("[Worker SEO] Failed building dynamic meta:", err);
  }

  const result = { isChanged, dynTitle, dynDesc, dynImg };
  if (isChanged) {
    // Cache the resolved meta fields for 10 minutes to prevent API overload
    seoMetaCache.set(subdomain, {
      data: result,
      expires: now + 10 * 60 * 1000,
    });
  }
  return result;
}

async function applyDynamicSeo(response, hostname, subdomain) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html") || response.status !== 200) {
    return response;
  }

  const { isChanged, dynTitle, dynDesc, dynImg } =
    await buildDynamicSeoMeta(subdomain);
  if (!isChanged) {
    return response;
  }

  class MetaRewriter {
    element(element) {
      const tagName = element.tagName;
      const name = element.getAttribute("name");
      const prop = element.getAttribute("property");

      if (tagName === "title") {
        element.setInnerContent(dynTitle);
      } else if (
        name === "description" ||
        prop === "og:description" ||
        name === "twitter:description"
      ) {
        element.setAttribute("content", dynDesc);
      } else if (prop === "og:title" || name === "twitter:title") {
        element.setAttribute("content", dynTitle);
      } else if (prop === "og:image" || name === "twitter:image") {
        element.setAttribute("content", dynImg);
      } else if (prop === "og:url" || name === "twitter:url") {
        element.setAttribute("content", `https://${hostname}/`);
      }
    }
  }

  const rewriter = new HTMLRewriter()
    .on("title", new MetaRewriter())
    .on("meta", new MetaRewriter());

  return rewriter.transform(response);
}

async function applySecurityChecks(request, env, pathname) {
  if (isSuspiciousApiBot(request, pathname)) {
    return jsonError(403, {
      error: "Forbidden",
      message: "Automated traffic blocked by edge security policy.",
    });
  }

  const rateResult = await enforceRateLimit(request, env, pathname);
  if (!rateResult.allowed) {
    return jsonError(
      429,
      {
        error: "Too Many Requests",
        message: "Rate limit exceeded. Please retry later.",
      },
      {
        "Retry-After": String(rateResult.retryAfter ?? 60),
        "X-RateLimit-Remaining": String(rateResult.remaining ?? 0),
      },
    );
  }

  return null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const hostname = url.hostname;

    // Hanya handle subdomain dari base domain
    if (!shouldHandleWildcardProxy(hostname)) {
      return fetch(request);
    }

    // Ambil subdomain (e.g., "romi-juli" dari "romi-juli.mengundanganda.com")
    const subdomain = extractSubdomain(hostname);

    // Skip subdomain yang punya record DNS sendiri
    if (shouldBypassSubdomain(subdomain)) {
      return fetch(request);
    }

    // ===============================
    // Bot + rate-limit protection
    // ===============================
    const securityResponse = await applySecurityChecks(
      request,
      env,
      url.pathname,
    );
    if (securityResponse) {
      return securityResponse;
    }

    // Proxy ke Vercel — fetch dari www (primary domain di Vercel)
    const originUrl = new URL(url);
    originUrl.hostname = ORIGIN_HOST;

    const originRequest = createOriginRequest(
      request,
      originUrl,
      hostname,
      subdomain,
    );

    // Apply strict Cloudflare edge caching for static assets
    const isStaticAsset =
      /\.(js|css|webp|png|jpg|jpeg|svg|woff|woff2|ttf|ico|gif)(\?.*)?$/.test(
        url.pathname,
      );
    const fetchOptions = isStaticAsset
      ? { cf: { cacheEverything: true, cacheTtl: 86400 } } // Cache di Cloudflare 24 Jam
      : {};

    const response = await fetch(originRequest, fetchOptions);

    // Handle redirect — rewrite Location header agar tetap di subdomain
    const redirectResponse = rewriteRedirectToSubdomain(
      response,
      originUrl,
      hostname,
    );
    if (redirectResponse) {
      return redirectResponse;
    }

    // ===== SEO DYNAMIC META TAGS INJECTION =====
    const seoResponse = await applyDynamicSeo(response, hostname, subdomain);
    if (seoResponse !== response) {
      return seoResponse;
    }

    // Return response dari Vercel
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  },
};
