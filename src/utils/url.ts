export function resolveAssetUrl(
  url: string | undefined | null,
  apiBase = "",
): string {
  if (!url) return "";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//") ||
    url.startsWith("data:") ||
    url.startsWith("blob:")
  ) {
    return url;
  }

  const normalizedBase = apiBase.endsWith("/") ? apiBase.slice(0, -1) : apiBase;
  const normalizedPath = url.startsWith("/") ? url : `/${url}`;

  return normalizedBase ? `${normalizedBase}${normalizedPath}` : normalizedPath;
}
