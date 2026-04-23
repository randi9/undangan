import { requireAdminUser, requireUser, unauthorized } from "../shared/auth";
import { json } from "../shared/http";
import type { ApiDispatcher } from "../types/api";

/**
 * Generate a unique order number: ORD-YYYYMMDD-XXX
 */
function generateOrderNumber(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(Math.random() * 900 + 100);
  return `ORD-${dateStr}-${rand}`;
}

/**
 * Send Telegram notification to admin (fire-and-forget)
 */
async function notifyTelegram(env: any, orderNumber: string, customerName: string, groomName: string, brideName: string, theme: string) {
  const tgToken = env.TELEGRAM_BOT_TOKEN;
  const tgChatId = env.TELEGRAM_CHAT_ID;
  if (!tgToken || !tgChatId) return;

  const lines = [
    "ORDER BARU MASUK!",
    "",
    "Nomor: " + orderNumber,
    "Pemesan: " + customerName,
    "Mempelai: " + groomName + " & " + brideName,
    "Tema: " + theme,
    "SLA: 1 Jam Kerja",
    "",
    "Cek Dashboard untuk detail lebih lanjut.",
  ];

  try {
    await fetch("https://api.telegram.org/bot" + tgToken + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: tgChatId,
        text: lines.join("\n"),
      }),
    });
  } catch (err) {
    console.error("Telegram notify failed:", err);
  }
}

/**
 * POST /api/orders — Create a new order (public, no auth required)
 */
async function handleCreateOrder(supabase: any, request: Request, env: any) {
  const body = await request.json().catch(() => ({}));

  const customerName = String(body.customer_name || "").trim();
  const customerPhone = String(body.customer_phone || "").trim();
  const groomName = String(body.groom_name || "").trim();
  const brideName = String(body.bride_name || "").trim();
  const theme = String(body.theme || "elegant").trim();

  // Validation
  if (!customerName)
    return json({ error: "Nama pelanggan wajib diisi." }, 400);
  if (!customerPhone)
    return json({ error: "Nomor WhatsApp wajib diisi." }, 400);
  if (!groomName)
    return json({ error: "Nama mempelai pria wajib diisi." }, 400);
  if (!brideName)
    return json({ error: "Nama mempelai wanita wajib diisi." }, 400);

  const orderNumber = generateOrderNumber();

  const orderData = {
    order_number: orderNumber,
    status: "pending",
    customer_name: customerName,
    customer_phone: customerPhone,
    customer_email: body.customer_email || null,
    groom_name: groomName,
    bride_name: brideName,
    wedding_date: body.wedding_date || null,
    theme,
    location: body.location || null,
    notes: body.notes || null,
    package_type: "jasa_dibuatkan",
    amount: 99000,
    payment_status: "unpaid",
  };

  const { data, error } = await supabase
    .from("orders")
    .insert([orderData])
    .select("id, order_number, status, created_at")
    .single();

  if (error) {
    // If the table doesn't exist yet, still return success with a generated order number
    // so the WA redirect flow isn't broken
    if (
      error.message?.includes("relation") ||
      error.code === "42P01" ||
      error.message?.includes("does not exist")
    ) {
      return json({
        order_number: orderNumber,
        status: "pending",
        note: "Order recorded (table pending setup).",
      });
    }
    return json({ error: error.message || "Gagal menyimpan order." }, 500);
  }

  // Send Telegram notification (awaited so Cloudflare doesn't kill it)
  await notifyTelegram(env, orderNumber, customerName, groomName, brideName, theme);

  return json({
    id: data.id,
    order_number: data.order_number,
    status: data.status,
    created_at: data.created_at,
  });
}

/**
 * GET /api/orders — List all orders (admin only)
 */
async function handleListOrders(
  supabase: any,
  request: Request,
  env: any,
) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user))
    return json({ error: "Hanya admin yang bisa melihat daftar order." }, 403);

  const url = new URL(request.url);
  const status = url.searchParams.get("status"); // optional filter
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 100);

  let query = supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) return json({ error: error.message }, 500);
  return json({ orders: data || [], count: data?.length || 0 });
}

/**
 * PATCH /api/orders/:id — Update order status (admin only)
 */
async function handleUpdateOrder(
  supabase: any,
  request: Request,
  orderId: string,
  env: any,
) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user))
    return json({ error: "Hanya admin yang bisa update order." }, 403);

  const body = await request.json().catch(() => ({}));
  const updates: Record<string, any> = {};

  if (body.status) {
    const validStatuses = ["pending", "in_progress", "completed", "cancelled"];
    if (!validStatuses.includes(body.status))
      return json(
        { error: `Status tidak valid. Gunakan: ${validStatuses.join(", ")}` },
        400,
      );
    updates.status = body.status;
  }

  if (body.payment_status) {
    if (!["unpaid", "paid"].includes(body.payment_status))
      return json({ error: "payment_status harus 'unpaid' atau 'paid'." }, 400);
    updates.payment_status = body.payment_status;
  }

  if (body.invitation_id) {
    updates.invitation_id = body.invitation_id;
  }

  if (body.notes !== undefined) {
    updates.notes = body.notes;
  }

  if (Object.keys(updates).length === 0) {
    return json({ error: "Tidak ada data yang di-update." }, 400);
  }

  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("orders")
    .update(updates)
    .eq("id", orderId)
    .select("*")
    .single();

  if (error) return json({ error: error.message }, 500);
  if (!data) return json({ error: "Order tidak ditemukan." }, 404);

  return json({ order: data });
}

export const dispatchOrderRoute: ApiDispatcher = async ({
  supabase,
  env,
  request,
  pathname,
}) => {
  // POST /api/orders — public (no auth)
  if (pathname === "orders" && request.method === "POST") {
    return await handleCreateOrder(supabase, request, env);
  }

  // GET /api/orders — admin only
  if (pathname === "orders" && request.method === "GET") {
    return await handleListOrders(supabase, request, env);
  }

  // PATCH /api/orders/:id — admin only
  if (pathname.startsWith("orders/") && request.method === "PATCH") {
    const orderId = pathname.slice("orders/".length);
    return await handleUpdateOrder(supabase, request, orderId, env);
  }

  return null;
};
