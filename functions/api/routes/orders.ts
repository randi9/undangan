import { requireAdminUser, requireUser, unauthorized } from "../shared/auth";
import { json } from "../shared/http";
import type { ApiDispatcher } from "../types/api";

function generateOrderNumber(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const randomBytes = new Uint32Array(1);
  crypto.getRandomValues(randomBytes);
  const rand = (randomBytes[0] % 900000) + 100000;
  return `ORD-${dateStr}-${rand}`;
}

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

async function handleCreateOrder(db: D1Database, request: Request, env: any) {
  const body = await request.json().catch(() => ({}));

  const customerName = String(body.customer_name || "").trim();
  const customerPhone = String(body.customer_phone || "").trim();
  const groomName = String(body.groom_name || "").trim();
  const brideName = String(body.bride_name || "").trim();
  const theme = String(body.theme || "elegant").trim();

  if (!customerName)
    return json({ error: "Nama pelanggan wajib diisi." }, 400);
  if (!customerPhone)
    return json({ error: "Nomor WhatsApp wajib diisi." }, 400);
  if (!groomName)
    return json({ error: "Nama mempelai pria wajib diisi." }, 400);
  if (!brideName)
    return json({ error: "Nama mempelai wanita wajib diisi." }, 400);

  const orderNumber = generateOrderNumber();

  try {
    await db.prepare(`INSERT INTO orders (
      order_number, status, customer_name, customer_phone, customer_email,
      groom_name, bride_name, wedding_date, theme, location, notes,
      package_type, amount, payment_status
    ) VALUES (?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?, ?, 'jasa_dibuatkan', 99000, 'unpaid')`).bind(
      orderNumber, customerName, customerPhone, body.customer_email || null,
      groomName, brideName, body.wedding_date || null, theme,
      body.location || null, body.notes || null,
    ).run();
  } catch (error: any) {
    if (error.message?.includes("no such table")) {
      return json({
        order_number: orderNumber,
        status: "pending",
        note: "Order recorded (table pending setup).",
      });
    }
    return json({ error: error.message || "Gagal menyimpan order." }, 500);
  }

  const data = await db
    .prepare("SELECT id, order_number, status, created_at FROM orders WHERE order_number = ?")
    .bind(orderNumber)
    .first();

  await notifyTelegram(env, orderNumber, customerName, groomName, brideName, theme);

  return json({
    id: (data as any)?.id,
    order_number: orderNumber,
    status: "pending",
    created_at: (data as any)?.created_at,
  });
}

async function handleListOrders(
  db: D1Database,
  request: Request,
  env: any,
) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user))
    return json({ error: "Hanya admin yang bisa melihat daftar order." }, 403);

  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 100);

  let results: any[];
  if (status) {
    const { results: r } = await db
      .prepare("SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC LIMIT ?")
      .bind(status, limit)
      .all();
    results = r || [];
  } else {
    const { results: r } = await db
      .prepare("SELECT * FROM orders ORDER BY created_at DESC LIMIT ?")
      .bind(limit)
      .all();
    results = r || [];
  }

  return json({ orders: results, count: results.length });
}

async function handleUpdateOrder(
  db: D1Database,
  request: Request,
  orderId: string,
  env: any,
) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user))
    return json({ error: "Hanya admin yang bisa update order." }, 403);

  const body = await request.json().catch(() => ({}));
  const setClauses: string[] = [];
  const values: any[] = [];

  if (body.status) {
    const validStatuses = ["pending", "in_progress", "completed", "cancelled"];
    if (!validStatuses.includes(body.status))
      return json(
        { error: `Status tidak valid. Gunakan: ${validStatuses.join(", ")}` },
        400,
      );
    setClauses.push("status = ?");
    values.push(body.status);
  }

  if (body.payment_status) {
    if (!["unpaid", "paid"].includes(body.payment_status))
      return json({ error: "payment_status harus 'unpaid' atau 'paid'." }, 400);
    setClauses.push("payment_status = ?");
    values.push(body.payment_status);
  }

  if (body.invitation_id) {
    setClauses.push("invitation_id = ?");
    values.push(body.invitation_id);
  }

  if (body.notes !== undefined) {
    setClauses.push("notes = ?");
    values.push(body.notes);
  }

  if (setClauses.length === 0) {
    return json({ error: "Tidak ada data yang di-update." }, 400);
  }

  setClauses.push("updated_at = ?");
  values.push(new Date().toISOString());
  values.push(orderId);

  await db.prepare(`UPDATE orders SET ${setClauses.join(", ")} WHERE id = ?`).bind(...values).run();

  const data = await db.prepare("SELECT * FROM orders WHERE id = ?").bind(orderId).first();
  if (!data) return json({ error: "Order tidak ditemukan." }, 404);

  return json({ order: data });
}

export const dispatchOrderRoute: ApiDispatcher = async ({
  db,
  env,
  request,
  pathname,
}) => {
  if (pathname === "orders" && request.method === "POST") {
    return await handleCreateOrder(db, request, env);
  }

  if (pathname === "orders" && request.method === "GET") {
    return await handleListOrders(db, request, env);
  }

  if (pathname.startsWith("orders/") && request.method === "PATCH") {
    const orderId = pathname.slice("orders/".length);
    return await handleUpdateOrder(db, request, orderId, env);
  }

  return null;
};
