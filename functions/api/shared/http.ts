export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,PUT,DELETE,OPTIONS",
      "access-control-allow-headers": "content-type,authorization",
    },
  });
}

export function options(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,PUT,DELETE,OPTIONS",
      "access-control-allow-headers": "content-type,authorization",
    },
  });
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
