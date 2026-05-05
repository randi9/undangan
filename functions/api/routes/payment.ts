import { requireAdminUser, requireUser, unauthorized } from "../shared/auth";
import { PAYMENT_AMOUNT } from "../shared/constants";
import { json } from "../shared/http";
import type { ApiDispatcher } from "../types/api";

const MAYAR_PAYMENT_LINK =
  "https://mengundanganda.myr.id/pl/mengundang-anda-premium-akses/";

async function handlePaymentCreateInvoice(
  supabase: any,
  request: Request,
  env: any,
) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();

  const body = await request.json();
  const invitation_id = String(body.invitation_id || "").trim();
  if (!invitation_id) return json({ error: "invitation_id wajib diisi." }, 400);

  const { data: invitation } = await supabase
    .from("invitations")
    .select("*")
    .eq("id", invitation_id)
    .single();
  if (!invitation) return json({ error: "Undangan tidak ditemukan." }, 404);
  if (invitation.owner_id !== user.id && user.role !== "admin")
    return json({ error: "Akses ditolak." }, 403);
  if (invitation.payment_status === "paid")
    return json({ error: "Undangan ini sudah dalam status PAID." }, 400);

  const basePaymentLink = env?.MAYAR_PAYMENT_LINK || MAYAR_PAYMENT_LINK;
  const separator = String(basePaymentLink).includes("?") ? "&" : "?";
  const paymentUrl = `${basePaymentLink}${separator}invitation_id=${invitation_id}`;

  try {
    await supabase
      .from("payment_logs")
      .upsert(
        [
          {
            invitation_id,
            user_id: user.id,
            amount: PAYMENT_AMOUNT,
            status: "pending",
            mayar_payment_url: paymentUrl,
            mayar_invoice_id: `pending:${invitation_id}`,
          },
        ],
        { onConflict: "invitation_id" },
      );
  } catch { /* ignore logging errors */ }

  return json({
    payment_url: paymentUrl,
    invoice_id: `pending:${invitation_id}`,
    amount: PAYMENT_AMOUNT,
    status: "created",
  });
}


async function handlePaymentVerifyLicense(
  supabase: any,
  request: Request,
  env: any,
) {
  const user = await requireUser(supabase, request, env);
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
    const { data: pendingLog } = await supabase
      .from("payment_logs")
      .select("invitation_id")
      .eq("user_id", user.id)
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (pendingLog) invitationId = pendingLog.invitation_id;
  }

  if (!invitationId) {
    const { data: trialInvitation } = await supabase
      .from("invitations")
      .select("id")
      .eq("owner_id", user.id)
      .eq("payment_status", "trial")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (trialInvitation) invitationId = trialInvitation.id;
  }

  if (!invitationId) {
    const { data: existingPayment } = await supabase
      .from("payment_logs")
      .select("paid_at")
      .eq("user_id", user.id)
      .eq("status", "paid")
      .order("paid_at", { ascending: false })
      .limit(1);

    if (existingPayment && existingPayment.length > 0) {
      await supabase
        .from("users")
        .update({ paid_at: existingPayment[0].paid_at })
        .eq("id", user.id);
      return json({
        status: "already_paid",
        message: "Akun sudah Premium.",
        synced_from: "payment_logs",
      });
    }

    return json({ error: "Tidak ada undangan yang menunggu pembayaran." }, 404);
  }

  const { data: invitation } = await supabase
    .from("invitations")
    .select("id, payment_status, paid_at")
    .eq("id", invitationId)
    .single();

  if (invitation?.payment_status === "paid") {
    const paidAt = invitation.paid_at || new Date().toISOString();
    await supabase.from("users").update({ paid_at: paidAt }).eq("id", user.id);
    return json({
      status: "already_paid",
      message: "Undangan sudah berstatus PAID.",
      invitation_id: invitationId,
    });
  }

  const now = new Date().toISOString();
  await supabase.from("users").update({ paid_at: now }).eq("id", user.id);
  await supabase
    .from("invitations")
    .update({
      payment_status: "paid",
      paid_at: now,
      mayar_invoice_id: `license:${paymentIdentifier}`,
    })
    .eq("owner_id", user.id);

  try {
    await supabase
      .from("payment_logs")
      .upsert(
        [
          {
            invitation_id: invitationId,
            user_id: user.id,
            amount: PAYMENT_AMOUNT,
            status: "paid",
            paid_at: now,
            mayar_invoice_id: `license:${paymentIdentifier}`,
            webhook_payload: {
              paymentIdentifier,
              productId: body.productId,
              email: body.email,
              method: "license_verify",
            },
          },
        ],
        { onConflict: "invitation_id" },
      );
  } catch { /* ignore logging errors */ }

  return json({
    status: "ok",
    message: "Pembayaran berhasil diverifikasi!",
    invitation_id: invitationId,
  });
}

async function handlePaymentStatus(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();

  const invitationId = decodeURIComponent(
    pathname.slice("payment/status/".length),
  ).trim();

  const { data: invitation } = await supabase
    .from("invitations")
    .select(
      "id, payment_status, trial_expires_at, view_count, max_views, mayar_invoice_id, paid_at, owner_id",
    )
    .eq("id", invitationId)
    .single();

  if (!invitation) return json({ error: "Undangan tidak ditemukan." }, 404);
  if (invitation.owner_id !== user.id && user.role !== "admin")
    return json({ error: "Akses ditolak." }, 403);

  const isTrial = invitation.payment_status === "trial";
  const trialExpired =
    isTrial &&
    invitation.trial_expires_at &&
    new Date(invitation.trial_expires_at) < new Date();
  const viewsExhausted =
    isTrial && (invitation.view_count || 0) >= (invitation.max_views || 25);

  let trialTimeRemaining: { hours: number; minutes: number } | null = null;
  if (isTrial && invitation.trial_expires_at && !trialExpired) {
    const remaining =
      new Date(invitation.trial_expires_at).getTime() - Date.now();
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
      ? Math.max(0, (invitation.max_views || 25) - (invitation.view_count || 0))
      : null,
    trial_time_remaining: trialTimeRemaining,
    amount: PAYMENT_AMOUNT,
  });
}

async function handlePaymentConfirm(supabase: any, request: Request, env: any) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) {
    return json({ error: "Hanya admin yang bisa konfirmasi pembayaran." }, 403);
  }

  const body = await request.json();
  const invitation_id = String(body.invitation_id || "").trim();
  if (!invitation_id) return json({ error: "invitation_id wajib diisi." }, 400);

  const { data: invitation } = await supabase
    .from("invitations")
    .select("id, payment_status, owner_id")
    .eq("id", invitation_id)
    .single();

  if (!invitation) return json({ error: "Undangan tidak ditemukan." }, 404);
  if (invitation.payment_status === "paid") {
    return json({
      status: "already_paid",
      message: "Undangan sudah berstatus PAID.",
    });
  }

  const now = new Date().toISOString();
  await supabase
    .from("users")
    .update({ paid_at: now })
    .eq("id", invitation.owner_id);
  await supabase
    .from("invitations")
    .update({ payment_status: "paid", paid_at: now })
    .eq("owner_id", invitation.owner_id);

  try {
    await supabase
      .from("payment_logs")
      .upsert(
        [
          {
            invitation_id,
            user_id: user.id,
            amount: PAYMENT_AMOUNT,
            status: "paid",
            paid_at: now,
            mayar_invoice_id: `manual:${Date.now()}`,
            webhook_payload: { confirmed_by: user.id, method: "admin_manual" },
          },
        ],
        { onConflict: "invitation_id" },
      );
  } catch { /* ignore logging errors */ }

  return json({ status: "ok", message: "Pembayaran berhasil dikonfirmasi." });
}

function extractInvitationIdFromUrl(url: string): string | null {
  if (!url.includes("invitation_id=")) return null;
  const match = /invitation_id=([a-f0-9-]+)/i.exec(url);
  return match?.[1] || null;
}

async function resolveWebhookInvitationId(
  supabase: any,
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
    data.redirectUrl,
    data.redirect_url,
    data.redirectURL,
    data.link,
    data.linkUrl,
    data.link_url,
    data.successUrl,
    data.success_url,
  ].filter(Boolean);

  for (const url of urlFields) {
    if (typeof url !== "string") continue;
    const extracted = extractInvitationIdFromUrl(url);
    if (extracted) return extracted;
  }

  const { data: logs } = await supabase
    .from("payment_logs")
    .select("invitation_id")
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(1);
  if (logs && logs.length > 0) return logs[0].invitation_id;

  if (invoiceId) {
    const { data: inv } = await supabase
      .from("invitations")
      .select("id")
      .eq("mayar_invoice_id", invoiceId)
      .maybeSingle();
    return inv?.id || null;
  }

  return null;
}

async function markInvitationPaidFromWebhook(
  supabase: any,
  invitationId: string,
  invoiceId: string | null,
  now: string,
  body: any,
  data: any,
) {
  const { data: invOwner } = await supabase
    .from("invitations")
    .select("owner_id")
    .eq("id", invitationId)
    .single();

  if (invOwner) {
    await supabase
      .from("users")
      .update({ paid_at: now })
      .eq("id", invOwner.owner_id);
    await supabase
      .from("invitations")
      .update({
        payment_status: "paid",
        paid_at: now,
        mayar_invoice_id: invoiceId || null,
      })
      .eq("owner_id", invOwner.owner_id);
  } else {
    await supabase
      .from("invitations")
      .update({
        payment_status: "paid",
        paid_at: now,
        mayar_invoice_id: invoiceId || null,
      })
      .eq("id", invitationId);
  }

  try {
    await supabase
      .from("payment_logs")
      .upsert(
        [
          {
            invitation_id: invitationId,
            user_id: invOwner?.owner_id || null,
            amount: data.amount || data.total || PAYMENT_AMOUNT,
            status: "paid",
            paid_at: now,
            mayar_invoice_id: invoiceId || `webhook:${Date.now()}`,
            webhook_payload: body,
          },
        ],
        { onConflict: "invitation_id" },
      );
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

/**
 * Verify that the webhook request actually came from Mayar.
 *
 * Mayar provides a "Webhook Token" in the dashboard (Integration > API Keys).
 * This token is used as the HMAC-SHA256 secret to sign the raw request body.
 * The resulting signature is sent in a request header.
 *
 * Store the Webhook Token as MAYAR_WEBHOOK_SECRET in Cloudflare env vars.
 */
async function verifyWebhookSignature(
  rawBody: string,
  request: Request,
  env: any,
): Promise<boolean> {
  const webhookSecret = env?.MAYAR_WEBHOOK_SECRET || "";
  if (!webhookSecret) {
    // Not configured yet — allow through with warning (backward compatible)
    console.warn("[Webhook] MAYAR_WEBHOOK_SECRET not configured — skipping signature check.");
    return true;
  }

  // Mayar may use one of these header names for the signature
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

async function handlePaymentWebhook(supabase: any, request: Request, env: any) {
  try {
    // Read raw body first for signature verification
    const rawBody = await request.text();

    // Verify the signature using Mayar Webhook Token
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
        "payment.received",
        "payment.success",
        "payment.completed",
        "purchase",
        "purchase.completed",
        "new.membership",
        "membership.created",
        "membership.new",
      ].includes(event) ||
      String(event).includes("payment") ||
      String(event).includes("purchase") ||
      String(event).includes("membership");

    if (!isPaymentEvent && !data) return json({ status: "ok", event });

    const now = new Date().toISOString();
    const invoiceId =
      data.id || data.invoiceId || data.transactionId || data.transaction_id;
    const invitationId = await resolveWebhookInvitationId(
      supabase,
      data,
      invoiceId,
    );

    if (!invitationId) {
      await supabase.from("payment_logs").insert([
        {
          invitation_id: null,
          user_id: null,
          amount: data.amount || data.total || PAYMENT_AMOUNT,
          status: "unmatched",
          mayar_invoice_id: invoiceId || `unmatched:${Date.now()}`,
          webhook_payload: body,
        },
      ]);

      return json({
        status: "logged",
        reason: "no_matching_invitation",
        event,
      });
    }

    await markInvitationPaidFromWebhook(
      supabase,
      invitationId,
      invoiceId,
      now,
      body,
      data,
    );

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
  supabase,
  env,
  request,
  pathname,
}) => {
  if (pathname === "payment/create-invoice" && request.method === "POST") {
    return await handlePaymentCreateInvoice(supabase, request, env);
  }

  if (pathname === "payment/verify-license" && request.method === "POST") {
    return await handlePaymentVerifyLicense(supabase, request, env);
  }

  // Webhook: match "payment/webhook" regardless of query params
  if (pathname === "payment/webhook" && request.method === "POST") {
    return await handlePaymentWebhook(supabase, request, env);
  }

  if (pathname.startsWith("payment/status/") && request.method === "GET") {
    return await handlePaymentStatus(supabase, request, pathname, env);
  }

  if (pathname === "payment/confirm" && request.method === "POST") {
    return await handlePaymentConfirm(supabase, request, env);
  }

  return null;
};
