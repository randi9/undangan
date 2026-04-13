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

const BASE_DOMAIN = 'mengundanganda.com';

// Vercel primary domain (yang tidak redirect)
// Di Vercel: mengundanganda.com → 307 → www.mengundanganda.com
// Jadi kita harus fetch dari www langsung agar tidak kena redirect loop
const ORIGIN_HOST = 'www.mengundanganda.com';

// Subdomain yang TIDAK boleh di-proxy oleh Worker ini
const EXCLUDED_SUBDOMAINS = [
  'www',
  'media',    // R2 bucket uploads
  'music',    // R2 bucket music
  'accounts', // Clerk auth
  'clerk',    // Clerk API
  'clkmail',  // Clerk email
];

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const hostname = url.hostname;

    // Hanya handle subdomain dari base domain
    if (!hostname.endsWith(`.${BASE_DOMAIN}`)) {
      return fetch(request);
    }

    // Ambil subdomain (e.g., "romi-juli" dari "romi-juli.mengundanganda.com")
    const subdomain = hostname.replace(`.${BASE_DOMAIN}`, '');

    // Skip subdomain yang punya record DNS sendiri
    if (EXCLUDED_SUBDOMAINS.includes(subdomain) || subdomain.includes('.')) {
      return fetch(request);
    }

    // Proxy ke Vercel — fetch dari www (primary domain di Vercel)
    const originUrl = new URL(url);
    originUrl.hostname = ORIGIN_HOST;

    const newHeaders = new Headers(request.headers);
    newHeaders.set('Host', ORIGIN_HOST);
    newHeaders.set('X-Forwarded-Host', hostname);
    newHeaders.set('X-Original-Subdomain', subdomain);

    const originRequest = new Request(originUrl.toString(), {
      method: request.method,
      headers: newHeaders,
      body: request.body,
      redirect: 'manual',
    });

    const response = await fetch(originRequest);

    // Handle redirect — rewrite Location header agar tetap di subdomain
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('Location');
      if (location) {
        try {
          const locUrl = new URL(location, originUrl);
          // Rewrite jika redirect mengarah ke domain utama atau www
          if (locUrl.hostname === BASE_DOMAIN || locUrl.hostname === ORIGIN_HOST) {
            locUrl.hostname = hostname;
            const redirectHeaders = new Headers(response.headers);
            redirectHeaders.set('Location', locUrl.toString());
            return new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: redirectHeaders,
            });
          }
        } catch {
          // URL parsing gagal, return response as-is
        }
      }
    }

    // ===== SEO DYNAMIC META TAGS INJECTION =====
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html') && response.status === 200) {
      let isChanged = false;
      let dynTitle = 'Undangan Pernikahan';
      let dynDesc = 'Kami mengundang Anda untuk hadir di acara pernikahan kami.';
      let dynImg = 'https://media.mengundanganda.com/landing-page/og-image.webp';
      
      try {
        // Fetch data from API (using origin host so we don't loop)
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
        // Ignore API failures, it will just use default tags
      }

      if (isChanged) {
        class MetaRewriter {
          element(element) {
            const tagName = element.tagName;
            const name = element.getAttribute('name');
            const prop = element.getAttribute('property');
            
            if (tagName === 'title') {
              element.setInnerContent(dynTitle);
            } else if (name === 'description' || prop === 'og:description' || name === 'twitter:description') {
              element.setAttribute('content', dynDesc);
            } else if (prop === 'og:title' || name === 'twitter:title') {
              element.setAttribute('content', dynTitle);
            } else if (prop === 'og:image' || name === 'twitter:image') {
              element.setAttribute('content', dynImg);
            } else if (prop === 'og:url' || name === 'twitter:url') {
              element.setAttribute('content', `https://${hostname}/`);
            }
          }
        }

        const rewriter = new HTMLRewriter()
          .on('title', new MetaRewriter())
          .on('meta', new MetaRewriter());

        return rewriter.transform(response);
      }
    }

    // Return response dari Vercel
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  },
};
