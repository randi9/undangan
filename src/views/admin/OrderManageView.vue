<template>
  <AdminLayout>
    <template #search>
      <div style="display: flex; gap: 12px; flex: 1; align-items: center; max-width: 500px;">
        <div class="search-bar" style="flex: 1; margin: 0; max-width: none;">
          <span class="material-symbols-rounded" style="font-size:20px">search</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama mempelai, nomor order..."
          />
        </div>
        <select v-model="filterStatus" style="padding: 11px 14px; border-radius: 8px; border: 1px solid var(--admin-border); background: var(--admin-surface); color: var(--admin-text); outline: none; font-size: 14px; font-family: inherit;">
          <option value="all">Semua</option>
          <option value="pending">Pending</option>
          <option value="in_progress">Dikerjakan</option>
          <option value="completed">Selesai</option>
          <option value="cancelled">Dibatalkan</option>
        </select>
      </div>
    </template>
    <template #actions>
      <button class="btn btn-outline" @click="fetchOrders" :disabled="loading">
        <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">refresh</span>
        Refresh
      </button>
    </template>

    <!-- Stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-body">
          <div class="stat-label">Total Pesanan</div>
          <div class="stat-value">{{ orders.length }}</div>
        </div>
        <div class="stat-icon blue">
          <span class="material-symbols-rounded">shopping_cart</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-body">
          <div class="stat-label">Pending</div>
          <div class="stat-value">{{ pendingCount }}</div>
        </div>
        <div class="stat-icon amber">
          <span class="material-symbols-rounded">hourglass_top</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-body">
          <div class="stat-label">Dikerjakan</div>
          <div class="stat-value">{{ inProgressCount }}</div>
        </div>
        <div class="stat-icon indigo">
          <span class="material-symbols-rounded">build</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-body">
          <div class="stat-label">Selesai</div>
          <div class="stat-value">{{ completedCount }}</div>
        </div>
        <div class="stat-icon emerald">
          <span class="material-symbols-rounded">check_circle</span>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" style="text-align:center;padding:60px 0;">
      <div class="loading-spinner"></div>
      <p style="margin-top:12px;color:var(--admin-text-secondary)">Memuat pesanan...</p>
    </div>

    <!-- Orders Table -->
    <div v-else class="admin-card">
      <div class="section-header" style="margin-bottom:16px">
        <div>
          <h2 class="admin-page-title" style="font-size:20px;margin-bottom:2px">Daftar Pesanan Jasa Dibuatkan</h2>
          <p class="admin-page-subtitle">Kelola pesanan "Jasa Dibuatkan Undangan" dari pelanggan</p>
        </div>
      </div>

      <div v-if="filteredOrders.length === 0" class="empty-state">
        <div class="empty-icon"><Icon icon="lucide:inbox" style="font-size: 48px; opacity: 0.5;" /></div>
        <div class="empty-title">Belum ada pesanan</div>
        <div class="empty-text">Pesanan baru akan muncul di sini ketika pelanggan memesan melalui form order.</div>
      </div>

      <div v-else class="order-container">
        <!-- Desktop Table -->
        <div class="desktop-only-table order-table-wrapper">
          <table class="order-table">
            <thead>
              <tr>
                <th>No. Order</th>
                <th>Mempelai</th>
                <th>WA</th>
                <th>Tema</th>
                <th>Status</th>
                <th>Bayar</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="o in filteredOrders" :key="o.id">
                <td>
                  <code class="order-code">{{ o.order_number }}</code>
                </td>
                <td>
                  <div class="order-couple">
                    <strong>{{ o.groom_name }} & {{ o.bride_name }}</strong>
                    <div class="text-sm">{{ o.customer_name }}</div>
                  </div>
                </td>
                <td>
                  <a :href="`https://wa.me/${o.customer_phone}`" target="_blank" class="wa-link" :title="o.customer_phone">
                    <Icon icon="mdi:whatsapp" style="font-size:16px" />
                    {{ formatPhone(o.customer_phone) }}
                  </a>
                </td>
                <td><span class="text-sm">{{ themeLabel(o.theme) }}</span></td>
                <td>
                  <select
                    :value="o.status"
                    @change="updateStatus(o, ($event.target as HTMLSelectElement).value)"
                    class="status-select"
                    :class="`status-${o.status}`"
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="in_progress">🔨 Dikerjakan</option>
                    <option value="completed">✅ Selesai</option>
                    <option value="cancelled">❌ Dibatalkan</option>
                  </select>
                </td>
                <td>
                  <span :class="['pay-badge', o.payment_status === 'paid' ? 'pay-paid' : 'pay-unpaid']">
                    {{ o.payment_status === 'paid' ? 'Lunas' : 'Belum' }}
                  </span>
                </td>
                <td class="text-sm">{{ formatDate(o.created_at) }}</td>
                <td>
                  <div class="action-btns">
                    <button class="btn btn-sm btn-outline" @click="openDetail(o)" title="Detail">
                      <span class="material-symbols-rounded" style="font-size:16px">visibility</span>
                    </button>
                    <button
                      v-if="o.payment_status !== 'paid'"
                      class="btn btn-sm btn-primary"
                      @click="markPaid(o)"
                      title="Tandai Lunas"
                    >
                      <span class="material-symbols-rounded" style="font-size:16px">paid</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="mobile-only-cards">
          <div v-for="o in filteredOrders" :key="o.id" class="mobile-order-card">
            <div class="moc-header">
              <div class="moc-info">
                <code class="order-code" style="margin-bottom:6px;display:inline-block">{{ o.order_number }}</code>
                <div class="moc-couple"><strong>{{ o.groom_name }} & {{ o.bride_name }}</strong></div>
                <div class="text-sm">Pemesan: {{ o.customer_name }}</div>
                <div class="text-sm">Tema: {{ themeLabel(o.theme) }}</div>
                <div class="text-sm">{{ formatDate(o.created_at) }}</div>
              </div>
              <div class="moc-badges">
                <select
                  :value="o.status"
                  @change="updateStatus(o, ($event.target as HTMLSelectElement).value)"
                  class="status-select status-select-sm"
                  :class="`status-${o.status}`"
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="in_progress">🔨 Dikerjakan</option>
                  <option value="completed">✅ Selesai</option>
                  <option value="cancelled">❌ Dibatalkan</option>
                </select>
                <span :class="['pay-badge', o.payment_status === 'paid' ? 'pay-paid' : 'pay-unpaid']">
                  {{ o.payment_status === 'paid' ? 'Lunas' : 'Belum' }}
                </span>
              </div>
            </div>
            <div class="moc-actions">
              <a :href="`https://wa.me/${o.customer_phone}`" target="_blank" class="btn btn-sm btn-outline" style="flex:1;justify-content:center">
                <Icon icon="mdi:whatsapp" style="font-size:16px" /> Chat WA
              </a>
              <button class="btn btn-sm btn-outline" @click="openDetail(o)" style="flex:1;justify-content:center">
                <span class="material-symbols-rounded" style="font-size:16px">visibility</span> Detail
              </button>
              <button
                v-if="o.payment_status !== 'paid'"
                class="btn btn-sm btn-primary"
                @click="markPaid(o)"
                style="flex:1;justify-content:center"
              >
                <span class="material-symbols-rounded" style="font-size:16px">paid</span> Lunas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="detailOrder" class="modal-overlay" @click.self="detailOrder = null">
      <div class="modal-content" style="max-width:520px">
        <h3 class="modal-title">
          <span class="material-symbols-rounded" style="font-size:22px;vertical-align:-4px;color:var(--admin-primary)">receipt_long</span>
          Detail Pesanan
        </h3>
        <div class="detail-grid">
          <div class="detail-row">
            <span class="detail-label">No. Order</span>
            <code class="order-code">{{ detailOrder.order_number }}</code>
          </div>
          <div class="detail-row">
            <span class="detail-label">Pemesan</span>
            <span>{{ detailOrder.customer_name }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">WhatsApp</span>
            <a :href="`https://wa.me/${detailOrder.customer_phone}`" target="_blank" class="wa-link">
              <Icon icon="mdi:whatsapp" style="font-size:16px" />
              +{{ detailOrder.customer_phone }}
            </a>
          </div>
          <div class="detail-divider"></div>
          <div class="detail-row">
            <span class="detail-label">Mempelai Pria</span>
            <span>{{ detailOrder.groom_name }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Mempelai Wanita</span>
            <span>{{ detailOrder.bride_name }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Tanggal Nikah</span>
            <span>{{ detailOrder.wedding_date ? formatDateOnly(detailOrder.wedding_date) : '—' }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Tema</span>
            <span>{{ themeLabel(detailOrder.theme) }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Lokasi</span>
            <span>{{ detailOrder.location || '—' }}</span>
          </div>
          <div v-if="detailOrder.notes" class="detail-row detail-row-full">
            <span class="detail-label">Catatan</span>
            <p class="detail-notes">{{ detailOrder.notes }}</p>
          </div>
          <div class="detail-divider"></div>
          <div class="detail-row">
            <span class="detail-label">Status</span>
            <span :class="['status-badge', `status-badge-${detailOrder.status}`]">{{ statusLabel(detailOrder.status) }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Pembayaran</span>
            <span :class="['pay-badge', detailOrder.payment_status === 'paid' ? 'pay-paid' : 'pay-unpaid']">
              {{ detailOrder.payment_status === 'paid' ? 'Lunas' : 'Belum Bayar' }}
            </span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Dipesan</span>
            <span>{{ formatDate(detailOrder.created_at) }}</span>
          </div>
        </div>
        <div class="modal-actions" style="margin-top:24px">
          <button class="btn btn-outline" @click="detailOrder = null">Tutup</button>
          <a :href="`https://wa.me/${detailOrder.customer_phone}`" target="_blank" class="btn btn-primary">
            <Icon icon="mdi:whatsapp" style="font-size:18px" /> Chat Pelanggan
          </a>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toast" :class="['toast', `toast-${toast.type}`, 'flex', 'items-center', 'gap-2']">
      <Icon :icon="toast.type === 'error' ? 'lucide:x-circle' : 'lucide:check-circle-2'" style="font-size: 18px; flex-shrink: 0;" />
      <span>{{ toast.message }}</span>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Icon } from "@iconify/vue";
import AdminLayout from "@/components/admin/AdminLayout.vue";

interface Order {
  id: string;
  order_number: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  groom_name: string;
  bride_name: string;
  wedding_date: string | null;
  theme: string;
  location: string | null;
  notes: string | null;
  package_type: string;
  amount: number;
  payment_status: "unpaid" | "paid";
  invitation_id: string | null;
  created_at: string;
  updated_at: string;
}

const authStore = useAuthStore();

const orders = ref<Order[]>([]);
const loading = ref(false);
const searchQuery = ref("");
const filterStatus = ref("all");
const toast = ref<{ type: string; message: string } | null>(null);
const detailOrder = ref<Order | null>(null);

const API_BASE = (import.meta.env.VITE_API_URL || "") + "/api";

const themeOptions: Record<string, string> = {
  elegant: "Elegant Gold",
  floral: "Floral",
  minimalist: "Clean Minimalist",
  elegant_blue: "Elegant Blue",
  floral_blue: "Floral Blue",
};

function themeLabel(id: string) {
  return themeOptions[id] || id;
}

function statusLabel(s: string) {
  const labels: Record<string, string> = {
    pending: "Pending",
    in_progress: "Dikerjakan",
    completed: "Selesai",
    cancelled: "Dibatalkan",
  };
  return labels[s] || s;
}

const pendingCount = computed(() => orders.value.filter((o) => o.status === "pending").length);
const inProgressCount = computed(() => orders.value.filter((o) => o.status === "in_progress").length);
const completedCount = computed(() => orders.value.filter((o) => o.status === "completed").length);

const filteredOrders = computed(() => {
  let result = orders.value;

  if (filterStatus.value !== "all") {
    result = result.filter((o) => o.status === filterStatus.value);
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(
      (o) =>
        o.order_number.toLowerCase().includes(q) ||
        o.groom_name.toLowerCase().includes(q) ||
        o.bride_name.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.customer_phone.includes(q)
    );
  }

  return result;
});

function showToast(type: string, message: string) {
  toast.value = { type, message };
  setTimeout(() => {
    toast.value = null;
  }, 3000);
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateOnly(d: string) {
  return new Date(d).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPhone(phone: string) {
  if (phone.startsWith("62")) return "+62" + phone.slice(2);
  return phone;
}

function openDetail(o: Order) {
  detailOrder.value = { ...o };
}

async function fetchOrders() {
  loading.value = true;
  try {
    const headers = await authStore.getAuthHeaders();
    const res = await fetch(`${API_BASE}/orders`, { headers });
    if (!res.ok) throw new Error("Gagal memuat pesanan");
    const data = await res.json();
    orders.value = data.orders || [];
  } catch {
    showToast("error", "Gagal memuat data pesanan");
  } finally {
    loading.value = false;
  }
}

async function updateStatus(o: Order, newStatus: string) {
  try {
    const headers = await authStore.getAuthHeaders();
    const res = await fetch(`${API_BASE}/orders/${o.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Gagal update status");
    }
    o.status = newStatus as Order["status"];
    showToast("success", `Status order ${o.order_number} diubah ke "${statusLabel(newStatus)}"`);
  } catch (err: any) {
    showToast("error", err.message || "Gagal update status");
    await fetchOrders(); // Revert by refetching
  }
}

async function markPaid(o: Order) {
  if (!confirm(`Tandai order ${o.order_number} sebagai LUNAS?`)) return;
  try {
    const headers = await authStore.getAuthHeaders();
    const res = await fetch(`${API_BASE}/orders/${o.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ payment_status: "paid" }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Gagal update pembayaran");
    }
    o.payment_status = "paid";
    showToast("success", `Order ${o.order_number} ditandai LUNAS`);
  } catch (err: any) {
    showToast("error", err.message || "Gagal update pembayaran");
  }
}

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
/* Order Table */
.order-table-wrapper {
  overflow-x: auto;
}
.order-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.order-table th {
  text-align: left;
  padding: 12px 14px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--admin-text-secondary);
  border-bottom: 2px solid var(--admin-border);
  white-space: nowrap;
}
.order-table td {
  padding: 14px;
  border-bottom: 1px solid var(--admin-border);
  vertical-align: middle;
}
.order-table tbody tr:hover {
  background: rgba(59, 130, 246, 0.03);
}

.order-code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--admin-primary);
  background: var(--admin-primary-light);
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.order-couple strong {
  font-size: 14px;
  color: var(--admin-text);
}

.wa-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #25d366;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: opacity 0.15s;
}
.wa-link:hover {
  opacity: 0.8;
}

/* Status Select */
.status-select {
  padding: 5px 10px;
  border-radius: 8px;
  border: 1px solid var(--admin-border);
  font-size: 13px;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  background: white;
  transition: all 0.15s;
}
.status-select:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}
.status-select-sm {
  padding: 4px 8px;
  font-size: 12px;
}
.status-pending { color: #d97706; border-color: #fbbf24; background: #fffbeb; }
.status-in_progress { color: #4f46e5; border-color: #818cf8; background: #eef2ff; }
.status-completed { color: #059669; border-color: #34d399; background: #ecfdf5; }
.status-cancelled { color: #dc2626; border-color: #fca5a5; background: #fef2f2; }

/* Payment Badge */
.pay-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 600;
}
.pay-paid {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}
.pay-unpaid {
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;
}

/* Status Badge (detail modal) */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 600;
}
.status-badge-pending { background: #fffbeb; color: #d97706; }
.status-badge-in_progress { background: #eef2ff; color: #4f46e5; }
.status-badge-completed { background: #ecfdf5; color: #059669; }
.status-badge-cancelled { background: #fef2f2; color: #dc2626; }

.action-btns {
  display: flex;
  gap: 6px;
}

.text-sm {
  font-size: 13px;
  color: var(--admin-text-secondary);
}

/* Stats amber color */
.stat-icon.amber {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}
.stat-icon.indigo {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

/* Detail Modal */
.detail-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.detail-row-full {
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}
.detail-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--admin-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.detail-notes {
  margin: 0;
  font-size: 14px;
  color: var(--admin-text);
  background: var(--admin-surface);
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--admin-border);
  line-height: 1.6;
  width: 100%;
  box-sizing: border-box;
}
.detail-divider {
  height: 1px;
  background: var(--admin-border);
  margin: 4px 0;
}

/* Visibility Control */
.mobile-only-cards {
  display: none;
}
.desktop-only-table {
  display: block;
}

/* Mobile Order Cards */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .desktop-only-table { display: none; }
  .mobile-only-cards {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px 0;
  }
  .mobile-order-card {
    background: white;
    border: 1px solid var(--admin-border);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  }
  .moc-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }
  .moc-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }
  .moc-couple {
    font-size: 15px;
  }
  .moc-badges {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-end;
  }
  .moc-actions {
    display: flex;
    gap: 8px;
    width: 100%;
    margin-top: 4px;
  }
  .detail-row {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
