import { requireUser, unauthorized } from "../shared/auth";
import { json } from "../shared/http";
import type { ApiDispatcher } from "../types/api";

function generateWoAccessCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Exclude confusing chars
  const randomBytes = new Uint32Array(8);
  crypto.getRandomValues(randomBytes);
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(randomBytes[i] % chars.length);
  }
  return code;
}

// === WO: List Access Codes ===
async function handleListCodes(supabase: any, request: Request, env: any) {
  const user = await requireUser(supabase, request, env);
  if (!user || (user.role !== "wo" && user.role !== "admin")) return unauthorized();

  const url = new URL(request.url);
  const filterWoId = url.searchParams.get("wo_id");

  let query = supabase
    .from("wo_access_codes")
    .select("*, invitation:invitations(id, slug, groom_name, bride_name, cover_photo, theme)");

  if (user.role !== "admin") {
    query = query.eq("wo_user_id", user.id);
  } else if (filterWoId) {
    query = query.eq("wo_user_id", filterWoId);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;

  return json(data || []);
}

// === WO: Generate Access Code ===
async function handleGenerateCode(supabase: any, request: Request, env: any) {
  const user = await requireUser(supabase, request, env);
  if (!user || user.role !== "wo") return unauthorized();

  // Get current active & used codes count to enforce quota
  const { count, error: countError } = await supabase
    .from("wo_access_codes")
    .select("id", { count: "exact", head: true })
    .eq("wo_user_id", user.id)
    .in("status", ["active", "used"]);

  if (countError) throw countError;

  const currentCount = count || 0;
  if (currentCount >= (user.max_invitations || 0)) {
    return json(
      { error: "Kuota pembuatan undangan telah habis. Silakan hubungi Admin untuk menambah kuota." },
      400,
    );
  }

  const code = generateWoAccessCode();
  const { data: newCode, error: insertError } = await supabase
    .from("wo_access_codes")
    .insert([
      {
        code,
        wo_user_id: user.id,
        status: "active",
      },
    ])
    .select("*")
    .single();

  if (insertError) throw insertError;
  return json(newCode, 201);
}

// === WO: Revoke Access Code ===
async function handleRevokeCode(supabase: any, request: Request, pathname: string, env: any) {
  const user = await requireUser(supabase, request, env);
  if (!user || (user.role !== "wo" && user.role !== "admin")) return unauthorized();

  const codeId = pathname.slice("wo/codes/".length).replace(/\/revoke$/, "");

  let query = supabase.from("wo_access_codes").select("*").eq("id", codeId);
  if (user.role !== "admin") {
    query = query.eq("wo_user_id", user.id);
  }
  
  const { data: woCode, error: fetchError } = await query.maybeSingle();
  if (fetchError || !woCode) return json({ error: "Kode akses tidak ditemukan." }, 404);

  if (woCode.status === "used") {
    return json({ error: "Kode akses yang sudah digunakan tidak dapat dicabut." }, 400);
  }

  const { data: updated, error: updateError } = await supabase
    .from("wo_access_codes")
    .update({ status: "revoked" })
    .eq("id", codeId)
    .select("*")
    .single();

  if (updateError) throw updateError;
  return json(updated);
}

// === WO: Delete Access Code ===
async function handleDeleteCode(supabase: any, request: Request, pathname: string, env: any) {
  const user = await requireUser(supabase, request, env);
  if (!user || (user.role !== "wo" && user.role !== "admin")) return unauthorized();

  const codeId = pathname.slice("wo/codes/".length);

  let query = supabase.from("wo_access_codes").select("*").eq("id", codeId);
  if (user.role !== "admin") {
    query = query.eq("wo_user_id", user.id);
  }
  
  const { data: woCode, error: fetchError } = await query.maybeSingle();
  if (fetchError || !woCode) return json({ error: "Kode akses tidak ditemukan." }, 404);

  if (woCode.status === "used" && woCode.invitation_id) {
    return json({ error: "Kode akses yang sedang digunakan oleh undangan aktif tidak dapat dihapus." }, 400);
  }

  const { error: deleteError } = await supabase
    .from("wo_access_codes")
    .delete()
    .eq("id", codeId);

  if (deleteError) throw deleteError;
  return json({ message: "Kode akses berhasil dihapus secara permanen." });
}

// === WO: Stats ===
async function handleWoStats(supabase: any, request: Request, env: any) {
  const user = await requireUser(supabase, request, env);
  if (!user || (user.role !== "wo" && user.role !== "admin")) return unauthorized();

  const url = new URL(request.url);
  const filterWoId = url.searchParams.get("wo_id");
  
  let targetWoId = user.id;
  if (user.role === "admin" && filterWoId) {
    targetWoId = filterWoId;
  }

  // Get quota limit
  let quotaLimit = user.max_invitations || 0;
  if (user.role === "admin" && filterWoId) {
    const { data: targetUser } = await supabase
      .from("users")
      .select("max_invitations")
      .eq("id", filterWoId)
      .single();
    quotaLimit = targetUser?.max_invitations || 0;
  }

  // Get active/used codes
  const { data: codes, error: codesError } = await supabase
    .from("wo_access_codes")
    .select("status")
    .eq("wo_user_id", targetWoId);

  if (codesError) throw codesError;

  const activeCount = codes?.filter((c: any) => c.status === "active").length || 0;
  const usedCount = codes?.filter((c: any) => c.status === "used").length || 0;
  const revokedCount = codes?.filter((c: any) => c.status === "revoked").length || 0;

  return json({
    quota_limit: quotaLimit,
    quota_used: activeCount + usedCount,
    quota_remaining: Math.max(0, quotaLimit - (activeCount + usedCount)),
    codes_active: activeCount,
    codes_used: usedCount,
    codes_revoked: revokedCount,
  });
}

// === WO: List Client Invitations ===
async function handleWoInvitations(supabase: any, request: Request, env: any) {
  const user = await requireUser(supabase, request, env);
  if (!user || (user.role !== "wo" && user.role !== "admin")) return unauthorized();

  let query = supabase.from("invitations").select("*");
  if (user.role !== "admin") {
    query = query.eq("wo_id", user.id);
  } else {
    const url = new URL(request.url);
    const filterWoId = url.searchParams.get("wo_id");
    if (filterWoId) {
      query = query.eq("wo_id", filterWoId);
    } else {
      query = query.not("wo_id", "is", null);
    }
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;

  return json(data || []);
}

export const dispatchWoRoute: ApiDispatcher = async ({
  supabase,
  env,
  request,
  pathname,
}) => {
  if (pathname === "wo/codes" && request.method === "GET")
    return await handleListCodes(supabase, request, env);
  if (pathname === "wo/codes" && request.method === "POST")
    return await handleGenerateCode(supabase, request, env);
  if (pathname.startsWith("wo/codes/") && pathname.endsWith("/revoke") && request.method === "POST")
    return await handleRevokeCode(supabase, request, pathname, env);
  if (pathname.startsWith("wo/codes/") && request.method === "DELETE")
    return await handleDeleteCode(supabase, request, pathname, env);
  if (pathname === "wo/stats" && request.method === "GET")
    return await handleWoStats(supabase, request, env);
  if (pathname === "wo/invitations" && request.method === "GET")
    return await handleWoInvitations(supabase, request, env);

  return null;
};
