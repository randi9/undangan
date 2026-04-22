import { requireAdminUser, requireUser, unauthorized } from "../shared/auth";
import { json } from "../shared/http";
import type { ApiDispatcher } from "../types/api";

async function handleMusicList(supabase: any) {
  const { data, error } = await supabase
    .from("music_library")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;

  return json(data || []);
}

async function handleMusicWrite(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const body = await request.json();

  if (pathname === "music" && request.method === "POST") {
    if (!body.title || !body.url)
      return json({ error: "Judul dan URL wajib diisi" }, 400);

    const { data, error } = await supabase
      .from("music_library")
      .insert([
        {
          title: body.title,
          artist: body.artist || "",
          url: body.url,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();
    if (error) throw error;

    return json(data, 201);
  }

  const id = decodeURIComponent(pathname.slice("music/".length)).trim();

  if (request.method === "PUT") {
    const { data, error } = await supabase
      .from("music_library")
      .update({ title: body.title, artist: body.artist, url: body.url })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;

    return json(data);
  }

  if (request.method === "DELETE") {
    const { error } = await supabase
      .from("music_library")
      .delete()
      .eq("id", id);
    if (error) throw error;

    return json({ message: "Lagu dihapus" });
  }

  return json({ error: "Method tidak didukung" }, 405);
}

export const dispatchMusicRoute: ApiDispatcher = async ({
  supabase,
  env,
  request,
  pathname,
}) => {
  if (pathname === "music" && request.method === "GET")
    return await handleMusicList(supabase);

  if (
    (pathname === "music" && request.method === "POST") ||
    pathname.startsWith("music/")
  ) {
    return await handleMusicWrite(supabase, request, pathname, env);
  }

  return null;
};
