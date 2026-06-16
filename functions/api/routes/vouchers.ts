import { requireAdminUser, requireUser, unauthorized } from "../shared/auth";
import { PAYMENT_AMOUNT } from "../shared/constants";
import { json } from "../shared/http";
import type { ApiDispatcher } from "../types/api";

function generateVoucherCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const randomBytes = new Uint32Array(8);
  crypto.getRandomValues(randomBytes);
  let code = "MA-";
  for (let i = 0; i < 8; i++)
    code += chars.charAt(randomBytes[i] % chars.length);
  return code;
}

async function handleVouchersList(db: D1Database, request: Request, env: any) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const { results: data } = await db
    .prepare("SELECT * FROM vouchers ORDER BY created_at DESC")
    .all();

  return json(data || []);
}

async function handleVoucherGenerate(
  db: D1Database,
  request: Request,
  env: any,
) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) {
    return json({ error: "Hanya admin yang bisa generate voucher." }, 403);
  }

  const body = await request.json();
  const count = Math.min(Math.max(1, Number(body.count) || 1), 50);
  const note = body.note || "";

  const stmts = Array.from({ length: count }, () => {
    const id = crypto.randomUUID();
    const code = generateVoucherCode();
    return db.prepare(
      "INSERT INTO vouchers (id, code, status, note) VALUES (?, ?, 'active', ?)"
    ).bind(id, code, note);
  });

  await db.batch(stmts);

  // Fetch the newly created vouchers
  const { results: data } = await db
    .prepare("SELECT id, code, status, note, created_at FROM vouchers ORDER BY created_at DESC LIMIT ?")
    .bind(count)
    .all();

  return json(
    { message: `${count} voucher berhasil dibuat`, vouchers: data },
    201,
  );
}

async function handleVoucherRedeem(db: D1Database, request: Request, env: any) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();

  const body = await request.json();
  const code = String(body.code || "")
    .trim()
    .toUpperCase();
  const invitation_id = String(body.invitation_id || "").trim();
  if (!code || !invitation_id)
    return json({ error: "Kode voucher dan invitation_id wajib diisi." }, 400);

  const voucher = await db
    .prepare("SELECT * FROM vouchers WHERE code = ?")
    .bind(code)
    .first();
  if (!voucher) return json({ error: "Kode voucher tidak ditemukan." }, 404);
  if ((voucher as any).status === "redeemed")
    return json({ error: "Voucher sudah pernah digunakan." }, 400);
  if ((voucher as any).status === "expired")
    return json({ error: "Voucher sudah kadaluarsa." }, 400);

  const invitation = await db
    .prepare("SELECT id, owner_id, payment_status FROM invitations WHERE id = ?")
    .bind(invitation_id)
    .first();
  if (!invitation) return json({ error: "Undangan tidak ditemukan." }, 404);
  if ((user as any).role !== "admin" && (invitation as any).owner_id !== (user as any).id)
    return json({ error: "Akses ditolak." }, 403);
  if ((invitation as any).payment_status === "paid")
    return json({ error: "Undangan ini sudah berstatus PAID." }, 400);

  const now = new Date().toISOString();

  await db.batch([
    db.prepare(
      "UPDATE vouchers SET status = 'redeemed', redeemed_by = ?, redeemed_invitation_id = ?, redeemed_at = ? WHERE id = ?"
    ).bind((user as any).id, invitation_id, now, (voucher as any).id),
    db.prepare("UPDATE users SET paid_at = ? WHERE id = ?").bind(now, (user as any).id),
    db.prepare(
      "UPDATE invitations SET payment_status = 'paid', paid_at = ? WHERE owner_id = ?"
    ).bind(now, (invitation as any).owner_id),
  ]);

  try {
    await db.prepare(
      "INSERT INTO payment_logs (invitation_id, user_id, amount, status, paid_at, mayar_invoice_id) VALUES (?, ?, ?, 'paid', ?, ?)"
    ).bind(invitation_id, (user as any).id, PAYMENT_AMOUNT, now, `voucher:${code}`).run();
  } catch { /* ignore logging errors */ }

  return json({
    message: "Voucher berhasil digunakan! Undangan Anda sekarang Premium.",
    voucher_code: code,
    invitation_id,
    payment_status: "paid",
  });
}

export const dispatchVoucherRoute: ApiDispatcher = async ({
  db,
  env,
  request,
  pathname,
}) => {
  if (pathname === "vouchers" && request.method === "GET")
    return await handleVouchersList(db, request, env);
  if (pathname === "vouchers/generate" && request.method === "POST")
    return await handleVoucherGenerate(db, request, env);
  if (pathname === "vouchers/redeem" && request.method === "POST")
    return await handleVoucherRedeem(db, request, env);

  return null;
};
