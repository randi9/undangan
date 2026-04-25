export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  // Blokir akses ke domain bawaan .pages.dev
  if (url.hostname.endsWith(".pages.dev")) {
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
