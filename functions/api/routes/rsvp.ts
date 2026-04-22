import { json } from "../shared/http";
import { requireUser, unauthorized } from "../shared/auth";
import type { ApiDispatcher } from "../types/api";

async function handleRsvpPost(supabase: any, request: Request) {
  const body = (await request.json()) as {
    invitation_id?: string;
    guest_name?: string;
    attendance?: string;
    guest_count?: number;
    message?: string;
  };

  const { invitation_id, guest_name, attendance, guest_count, message } = body;
  if (!invitation_id || !guest_name || !attendance) {
    return json({ error: "Missing required fields" }, 400);
  }

  const { data, error } = await supabase
    .from("rsvps")
    .insert([
      {
        id: crypto.randomUUID(),
        invitation_id,
        guest_name: String(guest_name).trim(),
        attendance,
        guest_count: Math.min(10, Math.max(1, Number(guest_count) || 1)),
        message: typeof message === "string" ? message.trim() : "",
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return json(data, 201);
}

async function handleRsvpList(supabase: any, pathname: string) {
  const invitationId = decodeURIComponent(
    pathname.slice("rsvp/".length),
  ).trim();
  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .eq("invitation_id", invitationId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return json(data || []);
}

async function handleRsvpUpdate(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  if (!(await requireUser(supabase, request, env))) return unauthorized();

  const id = decodeURIComponent(pathname.slice("rsvp/".length)).trim();
  const body = await request.json();

  const updateData: any = {};
  if (body.is_hidden !== undefined) updateData.is_hidden = body.is_hidden;
  if (body.reply_text !== undefined) updateData.reply_text = body.reply_text;

  const { data, error } = await supabase
    .from("rsvps")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;

  return json(data);
}

async function handleRsvpDelete(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  if (!(await requireUser(supabase, request, env))) return unauthorized();

  const id = decodeURIComponent(pathname.slice("rsvp/".length)).trim();

  const { error } = await supabase.from("rsvps").delete().eq("id", id);
  if (error) throw error;

  return json({ message: "RSVP/Wish deleted" });
}

export const dispatchRsvpRoute: ApiDispatcher = async ({
  supabase,
  env,
  request,
  pathname,
}) => {
  if (pathname === "rsvp" && request.method === "POST")
    return await handleRsvpPost(supabase, request);
  if (pathname.startsWith("rsvp/") && request.method === "GET")
    return await handleRsvpList(supabase, pathname);
  if (pathname.startsWith("rsvp/") && request.method === "PUT")
    return await handleRsvpUpdate(supabase, request, pathname, env);
  if (pathname.startsWith("rsvp/") && request.method === "DELETE")
    return await handleRsvpDelete(supabase, request, pathname, env);

  return null;
};
