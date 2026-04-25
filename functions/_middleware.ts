export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  // Blokir akses ke domain bawaan .pages.dev
  // TAPI izinkan jika request dikirim oleh Wildcard Proxy Worker kita
  // (Proxy mengirimkan header X-Forwarded-Host)
  if (
    url.hostname.endsWith(".pages.dev") &&
    !context.request.headers.has("X-Forwarded-Host")
  ) {
    return new Response(
      "Direct access to .pages.dev is disabled. Please use the official custom domain.",
      {
        status: 403,
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }

  // Jika aman, lanjutkan ke request normal (halaman/API)
  return context.next();
};
