import { requireAdminUser, requireUser, unauthorized } from "../shared/auth";
import { PAYMENT_AMOUNT } from "../shared/constants";
import { json } from "../shared/http";
import { stringifyJsonColumn } from "../shared/db";
import type { ApiDispatcher } from "../types/api";

const MAYAR_PAYMENT_LINK =
  "https://mengundanganda.myr.id/pl/mengundang-anda-premium-akses/";

async function handlePaymentCreateInvoice(
  db: D1Database,
  request: Request,
  env: any,
) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();

  const body = await request.json();
  const invitation_id = String(body.invitation_id || "").trim();
  if (!invitation_id) return json({ error: "invitation_id wajib diisi." }, 400);

  const invitation = await db
    .prepare("SELECT * FROM invitations WHERE id = ?")
    .bind(invitation_id)
    .first();
  if (!invitation) return json({ error: "Undangan tidak ditemukan." }, 404);
  if ((invitation as any).owner_id !== (user as any).id && (user as any).role !== "admin")
    return json({ error: "Akses ditolak." }, 403);
  if ((invitation as any).payment_status === "paid")
    return json({ error: "Undangan ini sudah dalam status PAID." }, 400);

  const basePaymentLink = env?.MAYAR_PAYMENT_LINK || MAYAR_PAYMENT_LINK;
  const separator = String(basePaymentLink).includes("?") ? "&" : "?";
  const paymentUrl = `${basePaymentLink}${separator}invitation_id=${invitation_id}`;

  try {
    // Upsert: try update first, then insert
    const existing = await db
      .prepare("SELECT id FROM payment_logs WHERE invitation_id = ?")
      .bind(invitation_id)
      .first();

    if (existing) {
      await db.prepare(
        "UPDATE payment_logs SET user_id = ?, amount = ?, status = 'pending', mayar_payment_url = ?, mayar_invoice_id = ? WHERE invitation_id = ?"
      ).bind((user as any).id, PAYMENT_AMOUNT, paymentUrl, `pending:${invitation_id}`, invitation_id).run();
    } else {
      await db.prepare(
        "INSERT INTO payment_logs (invitation_id, user_id, amount, status, mayar_payment_url, mayar_invoice_id) VALUES (?, ?, ?, 'pending', ?, ?)"
      ).bind(invitation_id, (user as any).id, PAYMENT_AMOUNT, paymentUrl, `pending:${invitation_id}`).run();
    }
  } catch { /* ignore logging errors */ }

  return json({
    payment_url: paymentUrl,
    invoice_id: `pending:${invitation_id}`,
    amount: PAYMENT_AMOUNT,
    status: "created",
  });
}

async function handlePaymentVerifyLicense(
  db: D1Database,
  request: Request,
  env: any,
) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();

  const body = await request.json();
  const paymentIdentifier =
    body.licenseCode || body.transaction_id || body.id || body.invitation_id;
  if (!paymentIdentifier)
    return json(
      { error: "Parameter identitas pembayaran tidak ditemukan." },
      400,
    );

  let invitationId = body.invitation_id || null;
  if (!invitationId) {
    const pendingLog = await db
      .prepare("SELECT invitation_id FROM payment_logs WHERE user_id = ? AND status = 'pending' ORDER BY created_at DESC LIMIT 1")
      .bind((user as any).id)
      .first<{ invitation_id: string }>();
    if (pendingLog) invitationId = pendingLog.invitation_id;
  }

  if (!invitationId) {
    const trialInvitation = await db
      .prepare("SELECT id FROM invitations WHERE owner_id = ? AND payment_status = 'trial' ORDER BY created_at DESC LIMIT 1")
      .bind((user as any).id)
      .first<{ id: string }>();
    if (trialInvitation) invitationId = trialInvitation.id;
  }

  if (!invitationId) {
    const existingPayment = await db
      .prepare("SELECT paid_at FROM payment_logs WHERE user_id = ? AND status = 'paid' ORDER BY paid_at DESC LIMIT 1")
      .bind((user as any).id)
      .first<{ paid_at: string }>();

    if (existingPayment) {
      await db
        .prepare("UPDATE users SET paid_at = ? WHERE id = ?")
        .bind(existingPayment.paid_at, (user as any).id)
        .run();
      return json({
        status: "already_paid",
        message: "Akun sudah Premium.",
        synced_from: "payment_logs",
      });
    }

    return json({ error: "Tidak ada undangan yang menunggu pembayaran." }, 404);
  }

  const invitation = await db
    .prepare("SELECT id, payment_status, paid_at FROM invitations WHERE id = ?")
    .bind(invitationId)
    .first();

  if ((invitation as any)?.payment_status === "paid") {
    const paidAt = (invitation as any).paid_at || new Date().toISOString();
    await db.prepare("UPDATE users SET paid_at = ? WHERE id = ?").bind(paidAt, (user as any).id).run();
    return json({
      status: "already_paid",
      message: "Undangan sudah berstatus PAID.",
      invitation_id: invitationId,
    });
  }

  const now = new Date().toISOString();
  await db.prepare("UPDATE users SET paid_at = ? WHERE id = ?").bind(now, (user as any).id).run();
  await db.prepare(
    "UPDATE invitations SET payment_status = 'paid', paid_at = ?, mayar_invoice_id = ? WHERE owner_id = ?"
  ).bind(now, `license:${paymentIdentifier}`, (user as any).id).run();

  try {
    const existing = await db
      .prepare("SELECT id FROM payment_logs WHERE invitation_id = ?")
      .bind(invitationId)
      .first();

    if (existing) {
      await db.prepare(
        "UPDATE payment_logs SET user_id = ?, amount = ?, status = 'paid', paid_at = ?, mayar_invoice_id = ?, webhook_payload = ? WHERE invitation_id = ?"
      ).bind(
        (user as any).id, PAYMENT_AMOUNT, now, `license:${paymentIdentifier}`,
        stringifyJsonColumn({ paymentIdentifier, productId: body.productId, email: body.email, method: "license_verify" }),
        invitationId
      ).run();
    } else {
      await db.prepare(
        "INSERT INTO payment_logs (invitation_id, user_id, amount, status, paid_at, mayar_invoice_id, webhook_payload) VALUES (?, ?, ?, 'paid', ?, ?, ?)"
      ).bind(
        invitationId, (user as any).id, PAYMENT_AMOUNT, now, `license:${paymentIdentifier}`,
        stringifyJsonColumn({ paymentIdentifier, productId: body.productId, email: body.email, method: "license_verify" }),
      ).run();
    }
  } catch { /* ignore logging errors */ }

  return json({
    status: "ok",
    message: "Pembayaran berhasil diverifikasi!",
    invitation_id: invitationId,
  });
}

async function handlePaymentStatus(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();

  const invitationId = decodeURIComponent(
    pathname.slice("payment/status/".length),
  ).trim();

  const invitation = await db
    .prepare(
      "SELECT id, payment_status, trial_expires_at, view_count, max_views, mayar_invoice_id, paid_at, owner_id FROM invitations WHERE id = ?"
    )
    .bind(invitationId)
    .first();

  if (!invitation) return json({ error: "Undangan tidak ditemukan." }, 404);
  if ((invitation as any).owner_id !== (user as any).id && (user as any).role !== "admin")
    return json({ error: "Akses ditolak." }, 403);

  const isTrial = (invitation as any).payment_status === "trial";
  const trialExpired =
    isTrial &&
    (invitation as any).trial_expires_at &&
    new Date((invitation as any).trial_expires_at) < new Date();
  const viewsExhausted =
    isTrial && ((invitation as any).view_count || 0) >= ((invitation as any).max_views || 25);

  let trialTimeRemaining: { hours: number; minutes: number } | null = null;
  if (isTrial && (invitation as any).trial_expires_at && !trialExpired) {
    const remaining =
      new Date((invitation as any).trial_expires_at).getTime() - Date.now();
    trialTimeRemaining = {
      hours: Math.floor(remaining / (1000 * 60 * 60)),
      minutes: Math.floor((remaining / (1000 * 60)) % 60),
    };
  }

  return json({
    ...invitation,
    is_trial: isTrial,
    trial_expired: !!trialExpired,
    views_exhausted: !!viewsExhausted,
    views_remaining: isTrial
      ? Math.max(0, ((invitation as any).max_views || 25) - ((invitation as any).view_count || 0))
      : null,
    trial_time_remaining: trialTimeRemaining,
    amount: PAYMENT_AMOUNT,
  });
}

async function handlePaymentConfirm(db: D1Database, request: Request, env: any) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) {
    return json({ error: "Hanya admin yang bisa konfirmasi pembayaran." }, 403);
  }

  const body = await request.json();
  const invitation_id = String(body.invitation_id || "").trim();
  if (!invitation_id) return json({ error: "invitation_id wajib diisi." }, 400);

  const invitation = await db
    .prepare("SELECT id, payment_status, owner_id FROM invitations WHERE id = ?")
    .bind(invitation_id)
    .first();

  if (!invitation) return json({ error: "Undangan tidak ditemukan." }, 404);
  if ((invitation as any).payment_status === "paid") {
    return json({
      status: "already_paid",
      message: "Undangan sudah berstatus PAID.",
    });
  }

  const now = new Date().toISOString();
  await db.prepare("UPDATE users SET paid_at = ? WHERE id = ?").bind(now, (invitation as any).owner_id).run();
  await db.prepare(
    "UPDATE invitations SET payment_status = 'paid', paid_at = ? WHERE owner_id = ?"
  ).bind(now, (invitation as any).owner_id).run();

  try {
    const existing = await db
      .prepare("SELECT id FROM payment_logs WHERE invitation_id = ?")
      .bind(invitation_id)
      .first();

    if (existing) {
      await db.prepare(
        "UPDATE payment_logs SET user_id = ?, amount = ?, status = 'paid', paid_at = ?, mayar_invoice_id = ?, webhook_payload = ? WHERE invitation_id = ?"
      ).bind(
        (user as any).id, PAYMENT_AMOUNT, now, `manual:${Date.now()}`,
        stringifyJsonColumn({ confirmed_by: (user as any).id, method: "admin_manual" }),
        invitation_id,
      ).run();
    } else {
      await db.prepare(
        "INSERT INTO payment_logs (invitation_id, user_id, amount, status, paid_at, mayar_invoice_id, webhook_payload) VALUES (?, ?, ?, 'paid', ?, ?, ?)"
      ).bind(
        invitation_id, (user as any).id, PAYMENT_AMOUNT, now, `manual:${Date.now()}`,
        stringifyJsonColumn({ confirmed_by: (user as any).id, method: "admin_manual" }),
      ).run();
    }
  } catch { /* ignore logging errors */ }

  return json({ status: "ok", message: "Pembayaran berhasil dikonfirmasi." });
}

function extractInvitationIdFromUrl(url: string): string | null {
  if (!url.includes("invitation_id=")) return null;
  const match = /invitation_id=([a-f0-9-]+)/i.exec(url);
  return match?.[1] || null;
}

async function resolveWebhookInvitationId(
  db: D1Database,
  data: any,
  invoiceId: string | null,
) {
  let invitationId: string | null = null;

  invitationId =
    data.customFields?.invitation_id ||
    data.custom_fields?.invitation_id ||
    data.metadata?.invitation_id ||
    null;
  if (invitationId) return invitationId;

  const urlFields = [
    data.redirectUrl, data.redirect_url, data.redirectURL,
    data.link, data.linkUrl, data.link_url,
    data.successUrl, data.success_url,
  ].filter(Boolean);

  for (const url of urlFields) {
    if (typeof url !== "string") continue;
    const extracted = extractInvitationIdFromUrl(url);
    if (extracted) return extracted;
  }

  const pendingLog = await db
    .prepare("SELECT invitation_id FROM payment_logs WHERE status = 'pending' ORDER BY created_at DESC LIMIT 1")
    .first<{ invitation_id: string }>();
  if (pendingLog) return pendingLog.invitation_id;

  if (invoiceId) {
    const inv = await db
      .prepare("SELECT id FROM invitations WHERE mayar_invoice_id = ?")
      .bind(invoiceId)
      .first<{ id: string }>();
    return inv?.id || null;
  }

  return null;
}

async function markInvitationPaidFromWebhook(
  db: D1Database,
  invitationId: string,
  invoiceId: string | null,
  now: string,
  body: any,
  data: any,
) {
  const invOwner = await db
    .prepare("SELECT owner_id FROM invitations WHERE id = ?")
    .bind(invitationId)
    .first<{ owner_id: string | null }>();

  if (invOwner?.owner_id) {
    await db.prepare("UPDATE users SET paid_at = ? WHERE id = ?").bind(now, invOwner.owner_id).run();
    await db.prepare(
      "UPDATE invitations SET payment_status = 'paid', paid_at = ?, mayar_invoice_id = ? WHERE owner_id = ?"
    ).bind(now, invoiceId || null, invOwner.owner_id).run();
  } else {
    await db.prepare(
      "UPDATE invitations SET payment_status = 'paid', paid_at = ?, mayar_invoice_id = ? WHERE id = ?"
    ).bind(now, invoiceId || null, invitationId).run();
  }

  try {
    const existing = await db
      .prepare("SELECT id FROM payment_logs WHERE invitation_id = ?")
      .bind(invitationId)
      .first();

    const logInvoiceId = invoiceId || `webhook:${Date.now()}`;
    const amount = data.amount || data.total || PAYMENT_AMOUNT;
    const webhookPayload = stringifyJsonColumn(body);

    if (existing) {
      await db.prepare(
        "UPDATE payment_logs SET user_id = ?, amount = ?, status = 'paid', paid_at = ?, mayar_invoice_id = ?, webhook_payload = ? WHERE invitation_id = ?"
      ).bind(invOwner?.owner_id || null, amount, now, logInvoiceId, webhookPayload, invitationId).run();
    } else {
      await db.prepare(
        "INSERT INTO payment_logs (invitation_id, user_id, amount, status, paid_at, mayar_invoice_id, webhook_payload) VALUES (?, ?, ?, 'paid', ?, ?, ?)"
      ).bind(invitationId, invOwner?.owner_id || null, amount, now, logInvoiceId, webhookPayload).run();
    }
  } catch { /* ignore logging errors */ }
}

/**
 * Compute HMAC-SHA256 hex digest for webhook signature verification.
 */
async function computeHmacSha256(secret: string, payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Timing-safe string comparison to prevent timing attacks.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function verifyWebhookSignature(
  rawBody: string,
  request: Request,
  env: any,
): Promise<boolean> {
  const webhookSecret = env?.MAYAR_WEBHOOK_SECRET || "";
  if (!webhookSecret) {
    console.warn("[Webhook] MAYAR_WEBHOOK_SECRET not configured — skipping signature check.");
    return true;
  }

  const signature =
    request.headers.get("x-mayar-signature") ||
    request.headers.get("x-callback-signature") ||
    request.headers.get("x-webhook-signature") ||
    "";

  if (!signature) {
    console.error("[Webhook] Missing signature header from Mayar");
    return false;
  }

  const expectedSig = await computeHmacSha256(webhookSecret, rawBody);
  return timingSafeEqual(signature.toLowerCase(), expectedSig.toLowerCase());
}

async function handlePaymentWebhook(db: D1Database, request: Request, env: any) {
  try {
    const rawBody = await request.text();

    const isValid = await verifyWebhookSignature(rawBody, request, env);
    if (!isValid) {
      console.error("[Webhook] Signature verification failed — rejecting request");
      return json({ error: "Unauthorized webhook request." }, 403);
    }

    const body = rawBody ? JSON.parse(rawBody) : {};
    const event = body.event || body.type || "unknown";
    const data = body.data || body;

    const isPaymentEvent =
      [
        "payment.received", "payment.success", "payment.completed",
        "purchase", "purchase.completed",
        "new.membership", "membership.created", "membership.new",
      ].includes(event) ||
      String(event).includes("payment") ||
      String(event).includes("purchase") ||
      String(event).includes("membership");

    if (!isPaymentEvent && !data) return json({ status: "ok", event });

    const now = new Date().toISOString();
    const invoiceId =
      data.id || data.invoiceId || data.transactionId || data.transaction_id;
    const invitationId = await resolveWebhookInvitationId(db, data, invoiceId);

    if (!invitationId) {
      await db.prepare(
        "INSERT INTO payment_logs (invitation_id, user_id, amount, status, mayar_invoice_id, webhook_payload) VALUES (NULL, NULL, ?, 'unmatched', ?, ?)"
      ).bind(data.amount || data.total || PAYMENT_AMOUNT, invoiceId || `unmatched:${Date.now()}`, stringifyJsonColumn(body)).run();

      return json({
        status: "logged",
        reason: "no_matching_invitation",
        event,
      });
    }

    await markInvitationPaidFromWebhook(db, invitationId, invoiceId, now, body, data);

    return json({
      status: "ok",
      updated: true,
      invitation_id: invitationId,
      event,
    });
  } catch (err: any) {
    return json({ error: "Webhook processing failed." }, 500);
  }
}

export const dispatchPaymentRoute: ApiDispatcher = async ({
  db,
  env,
  request,
  pathname,
}) => {
  if (pathname === "payment/create-invoice" && request.method === "POST") {
    return await handlePaymentCreateInvoice(db, request, env);
  }

  if (pathname === "payment/verify-license" && request.method === "POST") {
    return await handlePaymentVerifyLicense(db, request, env);
  }

  if (pathname === "payment/webhook" && request.method === "POST") {
    return await handlePaymentWebhook(db, request, env);
  }

  if (pathname.startsWith("payment/status/") && request.method === "GET") {
    return await handlePaymentStatus(db, request, pathname, env);
  }

  if (pathname === "payment/confirm" && request.method === "POST") {
    return await handlePaymentConfirm(db, request, env);
  }

  return null;
};
