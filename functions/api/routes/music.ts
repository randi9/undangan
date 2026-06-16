import { requireAdminUser, requireUser, unauthorized } from "../shared/auth";
import { json } from "../shared/http";
import type { ApiDispatcher } from "../types/api";

async function handleMusicList(db: D1Database) {
  const { results: data } = await db
    .prepare("SELECT * FROM music_library ORDER BY created_at DESC")
    .all();

  return json(data || []);
}

async function handleMusicWrite(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const body = await request.json();

  if (pathname === "music" && request.method === "POST") {
    if (!body.title || !body.url)
      return json({ error: "Judul dan URL wajib diisi" }, 400);

    const id = crypto.randomUUID();
    await db.prepare(
      "INSERT INTO music_library (id, title, artist, url) VALUES (?, ?, ?, ?)"
    ).bind(id, body.title, body.artist || "", body.url).run();

    const data = await db.prepare("SELECT * FROM music_library WHERE id = ?").bind(id).first();
    return json(data, 201);
  }

  const id = decodeURIComponent(pathname.slice("music/".length)).trim();

  if (request.method === "PUT") {
    await db.prepare(
      "UPDATE music_library SET title = ?, artist = ?, url = ? WHERE id = ?"
    ).bind(body.title, body.artist, body.url, id).run();

    const data = await db.prepare("SELECT * FROM music_library WHERE id = ?").bind(id).first();
    return json(data);
  }

  if (request.method === "DELETE") {
    await db.prepare("DELETE FROM music_library WHERE id = ?").bind(id).run();
    return json({ message: "Lagu dihapus" });
  }

  return json({ error: "Method tidak didukung" }, 405);
}

export const dispatchMusicRoute: ApiDispatcher = async ({
  db,
  env,
  request,
  pathname,
}) => {
  if (pathname === "music" && request.method === "GET")
    return await handleMusicList(db);

  if (
    (pathname === "music" && request.method === "POST") ||
    pathname.startsWith("music/")
  ) {
    return await handleMusicWrite(db, request, pathname, env);
  }

  return null;
};
