import { requireAdminUser, requireUser, unauthorized } from "../shared/auth";
import { PAYMENT_AMOUNT } from "../shared/constants";
import { json } from "../shared/http";
import type { ApiDispatcher } from "../types/api";

function generateVoucherCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "MA-";
  for (let i = 0; i < 8; i++)
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

async function handleVouchersList(supabase: any, request: Request, env: any) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const { data, error } = await supabase
    .from("vouchers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;

  return json(data || []);
}

async function handleVoucherGenerate(
  supabase: any,
  request: Request,
  env: any,
) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) {
    return json({ error: "Hanya admin yang bisa generate voucher." }, 403);
  }

  const body = await request.json();
  const count = Math.min(Math.max(1, Number(body.count) || 1), 50);
  const note = body.note || "";

  const vouchers = Array.from({ length: count }, () => ({
    code: generateVoucherCode(),
    status: "active",
    note,
  }));

  const { data, error } = await supabase
    .from("vouchers")
    .insert(vouchers)
    .select("id, code, status, note, created_at");
  if (error) throw error;

  return json(
    { message: `${count} voucher berhasil dibuat`, vouchers: data },
    201,
  );
}

async function handleVoucherRedeem(supabase: any, request: Request, env: any) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();

  const body = await request.json();
  const code = String(body.code || "")
    .trim()
    .toUpperCase();
  const invitation_id = String(body.invitation_id || "").trim();
  if (!code || !invitation_id)
    return json({ error: "Kode voucher dan invitation_id wajib diisi." }, 400);

  const { data: voucher } = await supabase
    .from("vouchers")
    .select("*")
    .eq("code", code)
    .single();
  if (!voucher) return json({ error: "Kode voucher tidak ditemukan." }, 404);
  if (voucher.status === "redeemed")
    return json({ error: "Voucher sudah pernah digunakan." }, 400);
  if (voucher.status === "expired")
    return json({ error: "Voucher sudah kadaluarsa." }, 400);

  const { data: invitation } = await supabase
    .from("invitations")
    .select("id, owner_id, payment_status")
    .eq("id", invitation_id)
    .single();
  if (!invitation) return json({ error: "Undangan tidak ditemukan." }, 404);
  if (user.role !== "admin" && invitation.owner_id !== user.id)
    return json({ error: "Akses ditolak." }, 403);
  if (invitation.payment_status === "paid")
    return json({ error: "Undangan ini sudah berstatus PAID." }, 400);

  const now = new Date().toISOString();

  await supabase
    .from("vouchers")
    .update({
      status: "redeemed",
      redeemed_by: user.id,
      redeemed_invitation_id: invitation_id,
      redeemed_at: now,
    })
    .eq("id", voucher.id);

  await supabase.from("users").update({ paid_at: now }).eq("id", user.id);
  await supabase
    .from("invitations")
    .update({ payment_status: "paid", paid_at: now })
    .eq("owner_id", invitation.owner_id);

  await supabase
    .from("payment_logs")
    .insert([
      {
        invitation_id,
        user_id: user.id,
        amount: PAYMENT_AMOUNT,
        status: "paid",
        paid_at: now,
        mayar_invoice_id: `voucher:${code}`,
      },
    ])
    .catch(() => {});

  return json({
    message: "Voucher berhasil digunakan! Undangan Anda sekarang Premium.",
    voucher_code: code,
    invitation_id,
    payment_status: "paid",
  });
}

export const dispatchVoucherRoute: ApiDispatcher = async ({
  supabase,
  env,
  request,
  pathname,
}) => {
  if (pathname === "vouchers" && request.method === "GET")
    return await handleVouchersList(supabase, request, env);
  if (pathname === "vouchers/generate" && request.method === "POST")
    return await handleVoucherGenerate(supabase, request, env);
  if (pathname === "vouchers/redeem" && request.method === "POST")
    return await handleVoucherRedeem(supabase, request, env);

  return null;
};
