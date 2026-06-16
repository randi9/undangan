import { requireUser, unauthorized } from "../shared/auth";
import { json } from "../shared/http";
import { hydrateInvitation } from "../shared/db";
import type { ApiDispatcher } from "../types/api";

function generateWoAccessCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const randomBytes = new Uint32Array(8);
  crypto.getRandomValues(randomBytes);
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(randomBytes[i] % chars.length);
  }
  return code;
}

// === WO: List Access Codes ===
async function handleListCodes(db: D1Database, request: Request, env: any) {
  const user = await requireUser(db, request, env);
  if (!user || ((user as any).role !== "wo" && (user as any).role !== "admin")) return unauthorized();

  const url = new URL(request.url);
  const filterWoId = url.searchParams.get("wo_id");

  let codes: any[];
  if ((user as any).role !== "admin") {
    const { results } = await db
      .prepare("SELECT * FROM wo_access_codes WHERE wo_user_id = ? ORDER BY created_at DESC")
      .bind((user as any).id)
      .all();
    codes = results || [];
  } else if (filterWoId) {
    const { results } = await db
      .prepare("SELECT * FROM wo_access_codes WHERE wo_user_id = ? ORDER BY created_at DESC")
      .bind(filterWoId)
      .all();
    codes = results || [];
  } else {
    const { results } = await db
      .prepare("SELECT * FROM wo_access_codes ORDER BY created_at DESC")
      .all();
    codes = results || [];
  }

  // Enrich with invitation data
  const enriched = await Promise.all(
    codes.map(async (code: any) => {
      let invitation = null;
      if (code.invitation_id) {
        invitation = await db
          .prepare("SELECT id, slug, groom_name, bride_name, cover_photo, theme FROM invitations WHERE id = ?")
          .bind(code.invitation_id)
          .first();
      }
      return { ...code, invitation };
    })
  );

  return json(enriched);
}

// === WO: Generate Access Code ===
async function handleGenerateCode(db: D1Database, request: Request, env: any) {
  const user = await requireUser(db, request, env);
  if (!user || (user as any).role !== "wo") return unauthorized();

  const countResult = await db
    .prepare("SELECT COUNT(*) as cnt FROM wo_access_codes WHERE wo_user_id = ? AND status IN ('active', 'used')")
    .bind((user as any).id)
    .first<{ cnt: number }>();

  const currentCount = countResult?.cnt || 0;
  if (currentCount >= ((user as any).max_invitations || 0)) {
    return json(
      { error: "Kuota pembuatan undangan telah habis. Silakan hubungi Admin untuk menambah kuota." },
      400,
    );
  }

  const code = generateWoAccessCode();
  const id = crypto.randomUUID();
  await db.prepare(
    "INSERT INTO wo_access_codes (id, code, wo_user_id, status) VALUES (?, ?, ?, 'active')"
  ).bind(id, code, (user as any).id).run();

  const newCode = await db.prepare("SELECT * FROM wo_access_codes WHERE id = ?").bind(id).first();
  return json(newCode, 201);
}

// === WO: Revoke Access Code ===
async function handleRevokeCode(db: D1Database, request: Request, pathname: string, env: any) {
  const user = await requireUser(db, request, env);
  if (!user || ((user as any).role !== "wo" && (user as any).role !== "admin")) return unauthorized();

  const codeId = pathname.slice("wo/codes/".length).replace(/\/revoke$/, "");

  let woCode;
  if ((user as any).role !== "admin") {
    woCode = await db
      .prepare("SELECT * FROM wo_access_codes WHERE id = ? AND wo_user_id = ?")
      .bind(codeId, (user as any).id)
      .first();
  } else {
    woCode = await db
      .prepare("SELECT * FROM wo_access_codes WHERE id = ?")
      .bind(codeId)
      .first();
  }

  if (!woCode) return json({ error: "Kode akses tidak ditemukan." }, 404);

  if ((woCode as any).status === "used") {
    return json({ error: "Kode akses yang sudah digunakan tidak dapat dicabut." }, 400);
  }

  await db.prepare("UPDATE wo_access_codes SET status = 'revoked' WHERE id = ?").bind(codeId).run();
  const updated = await db.prepare("SELECT * FROM wo_access_codes WHERE id = ?").bind(codeId).first();
  return json(updated);
}

// === WO: Delete Access Code ===
async function handleDeleteCode(db: D1Database, request: Request, pathname: string, env: any) {
  const user = await requireUser(db, request, env);
  if (!user || ((user as any).role !== "wo" && (user as any).role !== "admin")) return unauthorized();

  const codeId = pathname.slice("wo/codes/".length);

  let woCode;
  if ((user as any).role !== "admin") {
    woCode = await db
      .prepare("SELECT * FROM wo_access_codes WHERE id = ? AND wo_user_id = ?")
      .bind(codeId, (user as any).id)
      .first();
  } else {
    woCode = await db
      .prepare("SELECT * FROM wo_access_codes WHERE id = ?")
      .bind(codeId)
      .first();
  }

  if (!woCode) return json({ error: "Kode akses tidak ditemukan." }, 404);

  if ((woCode as any).status === "used" && (woCode as any).invitation_id) {
    return json({ error: "Kode akses yang sedang digunakan oleh undangan aktif tidak dapat dihapus." }, 400);
  }

  await db.prepare("DELETE FROM wo_access_codes WHERE id = ?").bind(codeId).run();
  return json({ message: "Kode akses berhasil dihapus secara permanen." });
}

// === WO: Stats ===
async function handleWoStats(db: D1Database, request: Request, env: any) {
  const user = await requireUser(db, request, env);
  if (!user || ((user as any).role !== "wo" && (user as any).role !== "admin")) return unauthorized();

  const url = new URL(request.url);
  const filterWoId = url.searchParams.get("wo_id");
  
  let targetWoId = (user as any).id;
  if ((user as any).role === "admin" && filterWoId) {
    targetWoId = filterWoId;
  }

  let quotaLimit = (user as any).max_invitations || 0;
  if ((user as any).role === "admin" && filterWoId) {
    const targetUser = await db
      .prepare("SELECT max_invitations FROM users WHERE id = ?")
      .bind(filterWoId)
      .first<{ max_invitations: number }>();
    quotaLimit = targetUser?.max_invitations || 0;
  }

  const { results: codes } = await db
    .prepare("SELECT status FROM wo_access_codes WHERE wo_user_id = ?")
    .bind(targetWoId)
    .all();

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
async function handleWoInvitations(db: D1Database, request: Request, env: any) {
  const user = await requireUser(db, request, env);
  if (!user || ((user as any).role !== "wo" && (user as any).role !== "admin")) return unauthorized();

  let invitations: any[];
  if ((user as any).role !== "admin") {
    const { results } = await db
      .prepare("SELECT * FROM invitations WHERE wo_id = ? ORDER BY created_at DESC")
      .bind((user as any).id)
      .all();
    invitations = results || [];
  } else {
    const url = new URL(request.url);
    const filterWoId = url.searchParams.get("wo_id");
    if (filterWoId) {
      const { results } = await db
        .prepare("SELECT * FROM invitations WHERE wo_id = ? ORDER BY created_at DESC")
        .bind(filterWoId)
        .all();
      invitations = results || [];
    } else {
      const { results } = await db
        .prepare("SELECT * FROM invitations WHERE wo_id IS NOT NULL ORDER BY created_at DESC")
        .all();
      invitations = results || [];
    }
  }

  return json(invitations.map(hydrateInvitation));
}

export const dispatchWoRoute: ApiDispatcher = async ({
  db,
  env,
  request,
  pathname,
}) => {
  if (pathname === "wo/codes" && request.method === "GET")
    return await handleListCodes(db, request, env);
  if (pathname === "wo/codes" && request.method === "POST")
    return await handleGenerateCode(db, request, env);
  if (pathname.startsWith("wo/codes/") && pathname.endsWith("/revoke") && request.method === "POST")
    return await handleRevokeCode(db, request, pathname, env);
  if (pathname.startsWith("wo/codes/") && request.method === "DELETE")
    return await handleDeleteCode(db, request, pathname, env);
  if (pathname === "wo/stats" && request.method === "GET")
    return await handleWoStats(db, request, env);
  if (pathname === "wo/invitations" && request.method === "GET")
    return await handleWoInvitations(db, request, env);

  return null;
};
