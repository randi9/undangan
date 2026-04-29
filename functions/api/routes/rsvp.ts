import { json, getEffectiveMethod } from "../shared/http";
import { requireUser, unauthorized } from "../shared/auth";
import { rateLimit, getClientIp } from "../shared/rateLimit";
import { validateBody, rsvpCreateSchema, rsvpUpdateSchema, ValidationError } from "../shared/validation";
import type { ApiDispatcher } from "../types/api";

/**
 * Verify that the authenticated user owns the invitation linked to this RSVP (or is admin).
 * Looks up the RSVP first to get its invitation_id, then checks invitation ownership.
 */
async function requireRsvpOwner(
  supabase: any,
  request: Request,
  env: any,
  rsvpId: string,
): Promise<{ user: any } | { response: Response }> {
  const user = await requireUser(supabase, request, env);
  if (!user) return { response: unauthorized() };

  // Admin can manage any RSVP
  if (user.role === "admin") return { user };

  // Look up the RSVP to get its invitation_id
  const { data: rsvp } = await supabase
    .from("rsvps")
    .select("invitation_id")
    .eq("id", rsvpId)
    .single();

  if (!rsvp) return { response: json({ error: "RSVP tidak ditemukan." }, 404) };

  // Verify the invitation belongs to the user
  const { data: invitation } = await supabase
    .from("invitations")
    .select("owner_id")
    .eq("id", rsvp.invitation_id)
    .single();

  if (!invitation) return { response: json({ error: "Undangan tidak ditemukan." }, 404) };
  if (invitation.owner_id !== user.id) return { response: json({ error: "Akses ditolak." }, 403) };

  return { user };
}

async function handleRsvpPost(supabase: any, request: Request) {
  // Rate limit: 10 RSVP submissions per IP per 5 minutes
  const ip = getClientIp(request);
  const limited = rateLimit(`rsvp:post:${ip}`, 10, 5 * 60 * 1000);
  if (limited) return limited;

  const rawBody = await request.json();
  const body = validateBody(rsvpCreateSchema, rawBody);

  const { data, error } = await supabase
    .from("rsvps")
    .insert([
      {
        id: crypto.randomUUID(),
        invitation_id: body.invitation_id,
        guest_name: body.guest_name,
        attendance: body.attendance,
        guest_count: body.guest_count,
        message: body.message,
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
  const id = decodeURIComponent(pathname.slice("rsvp/".length)).trim();

  const authResult = await requireRsvpOwner(supabase, request, env, id);
  if ("response" in authResult) return authResult.response;

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
  const id = decodeURIComponent(pathname.slice("rsvp/".length)).trim();

  const authResult = await requireRsvpOwner(supabase, request, env, id);
  if ("response" in authResult) return authResult.response;

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
  const method = getEffectiveMethod(request);
  if (pathname === "rsvp" && method === "POST")
    return await handleRsvpPost(supabase, request);
  if (pathname.startsWith("rsvp/") && method === "GET")
    return await handleRsvpList(supabase, pathname);
  if (pathname.startsWith("rsvp/") && method === "PUT")
    return await handleRsvpUpdate(supabase, request, pathname, env);
  if (pathname.startsWith("rsvp/") && method === "DELETE")
    return await handleRsvpDelete(supabase, request, pathname, env);

  return null;
};
