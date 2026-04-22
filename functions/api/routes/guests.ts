import { requireUser, unauthorized } from "../shared/auth";
import { json, getEffectiveMethod } from "../shared/http";
import type { ApiDispatcher } from "../types/api";

async function handleGuestsList(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  if (!(await requireUser(supabase, request, env))) return unauthorized();

  const invitationId = decodeURIComponent(pathname.slice("guests/".length))
    .trim()
    .split("/")[0];

  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("invitation_id", invitationId)
    .order("created_at", { ascending: false });
  if (error) throw error;

  return json(data || []);
}

async function handleGuestsBulk(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  if (!(await requireUser(supabase, request, env))) return unauthorized();

  const invitationId = decodeURIComponent(
    pathname.slice("guests/".length).replace(/\/bulk$/, ""),
  ).trim();

  const body = await request.json();
  const guests = Array.isArray(body.guests) ? body.guests : [];
  if (!guests.length) return json({ error: "Invalid guests array" }, 400);

  const payload = guests.map((g: any) => ({
    id: crypto.randomUUID(),
    invitation_id: invitationId,
    name: String(g.name || "").trim(),
    phone_number: String(g.phone_number || "").trim(),
    is_sent: false,
  }));

  const { data, error } = await supabase
    .from("guests")
    .insert(payload)
    .select();
  if (error) throw error;

  return json(data, 201);
}

async function handleGuestUpdate(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  if (!(await requireUser(supabase, request, env))) return unauthorized();

  const parts = pathname.split("/");
  const invitationId = decodeURIComponent(parts[1] || "");
  const guestId = decodeURIComponent(parts[2] || "");

  const body = await request.json();
  const { data, error } = await supabase
    .from("guests")
    .update({ is_sent: body.is_sent })
    .eq("id", guestId)
    .eq("invitation_id", invitationId)
    .select()
    .single();
  if (error) throw error;

  return json(data);
}

async function handleGuestDelete(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  if (!(await requireUser(supabase, request, env))) return unauthorized();

  const parts = pathname.split("/");
  const invitationId = decodeURIComponent(parts[1] || "");
  const guestId = decodeURIComponent(parts[2] || "");

  const { error } = await supabase
    .from("guests")
    .delete()
    .eq("id", guestId)
    .eq("invitation_id", invitationId);
  if (error) throw error;

  return json({ message: "Guest deleted" });
}

export const dispatchGuestRoute: ApiDispatcher = async ({
  supabase,
  env,
  request,
  pathname,
}) => {
  const method = getEffectiveMethod(request);

  if (pathname.endsWith("/bulk") && method === "POST")
    return await handleGuestsBulk(supabase, request, pathname, env);

  if (
    pathname.startsWith("guests/") &&
    pathname.split("/").length === 2 &&
    method === "GET"
  ) {
    return await handleGuestsList(supabase, request, pathname, env);
  }

  if (
    pathname.startsWith("guests/") &&
    pathname.split("/").length === 3 &&
    method === "PUT"
  ) {
    return await handleGuestUpdate(supabase, request, pathname, env);
  }

  if (
    pathname.startsWith("guests/") &&
    pathname.split("/").length === 3 &&
    method === "DELETE"
  ) {
    return await handleGuestDelete(supabase, request, pathname, env);
  }

  return null;
};
