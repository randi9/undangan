<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <router-link to="/" class="sidebar-brand">
        <div class="sidebar-brand-icon">
          <span class="material-symbols-rounded">church</span>
        </div>
        <div class="sidebar-brand-text">Undangan<span>Gen</span></div>
      </router-link>

      <nav class="sidebar-nav">
        <router-link to="/" class="sidebar-link">
          <span class="material-symbols-rounded">dashboard</span>
          Dashboard
        </router-link>
        <router-link to="/users" class="sidebar-link">
          <span class="material-symbols-rounded">group</span>
          Kelola User
        </router-link>
        <router-link to="/vouchers" class="sidebar-link" exact>
          <span class="material-symbols-rounded">confirmation_number</span>
          Voucher
        </router-link>
      </nav>

      <div class="sidebar-footer" style="padding: 1rem 0; border-top: 1px solid #e1e8f0; margin-top: auto;">
        <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
          <UserButton showName />
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="admin-main">
      <header class="admin-topbar">
        <div class="search-bar">
          <span class="material-symbols-rounded" style="font-size:20px">search</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari kode voucher..."
          />
        </div>
        <div class="topbar-actions">
          <button class="btn btn-primary" @click="showGenerateModal = true">
            <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">add</span>
            Generate Voucher
          </button>
        </div>
      </header>

      <div class="admin-container">
        <!-- Stats -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-body">
              <div class="stat-label">Total Voucher</div>
              <div class="stat-value">{{ vouchers.length }}</div>
            </div>
            <div class="stat-icon blue">
              <span class="material-symbols-rounded">confirmation_number</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-body">
              <div class="stat-label">Aktif</div>
              <div class="stat-value">{{ activeCount }}</div>
            </div>
            <div class="stat-icon emerald">
              <span class="material-symbols-rounded">check_circle</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-body">
              <div class="stat-label">Terpakai</div>
              <div class="stat-value">{{ redeemedCount }}</div>
            </div>
            <div class="stat-icon pink">
              <span class="material-symbols-rounded">redeem</span>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" style="text-align:center;padding:60px 0;">
          <div class="loading-spinner"></div>
          <p style="margin-top:12px;color:var(--admin-text-secondary)">Memuat data voucher...</p>
        </div>

        <!-- Voucher Table -->
        <div v-else class="admin-card">
          <div class="section-header" style="margin-bottom:16px">
            <div>
              <h2 class="admin-page-title" style="font-size:20px;margin-bottom:2px">Daftar Voucher</h2>
              <p class="admin-page-subtitle">Kelola voucher untuk pembeli dari Shopee</p>
            </div>
          </div>

          <div v-if="filteredVouchers.length === 0" class="empty-state">
            <div class="empty-icon">🎟️</div>
            <div class="empty-title">Belum ada voucher</div>
            <div class="empty-text">Klik "Generate Voucher" untuk membuat kode voucher baru.</div>
          </div>

          <div v-else class="voucher-table-wrapper">
            <table class="voucher-table">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Status</th>
                  <th>Catatan</th>
                  <th>Digunakan Oleh</th>
                  <th>Tanggal Dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="v in filteredVouchers" :key="v.id">
                  <td>
                    <div class="voucher-code-cell">
                      <code class="voucher-code-text">{{ v.code }}</code>
                      <button class="btn-copy" @click="copyCode(v.code)" :title="'Salin ' + v.code">
                        <span class="material-symbols-rounded" style="font-size:16px">content_copy</span>
                      </button>
                    </div>
                  </td>
                  <td>
                    <span :class="['v-badge', `v-badge-${v.status}`]">
                      {{ v.status === 'active' ? 'Aktif' : v.status === 'redeemed' ? 'Terpakai' : 'Expired' }}
                    </span>
                  </td>
                  <td><span class="text-muted">{{ v.note || '—' }}</span></td>
                  <td>
                    <span v-if="v.redeemed_at" class="text-sm">
                      {{ formatDate(v.redeemed_at) }}
                    </span>
                    <span v-else class="text-muted">—</span>
                  </td>
                  <td class="text-sm">{{ formatDate(v.created_at) }}</td>
                  <td>
                    <button
                      v-if="v.status === 'active'"
                      class="btn btn-sm btn-danger"
                      @click="expireVoucher(v)"
                      title="Nonaktifkan"
                    >
                      <span class="material-symbols-rounded" style="font-size:16px">block</span>
                    </button>
                    <span v-else class="text-muted">—</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Generate Modal -->
    <div v-if="showGenerateModal" class="modal-overlay" @click.self="showGenerateModal = false">
      <div class="modal-content" style="max-width:440px">
        <h3 class="modal-title">
          <span class="material-symbols-rounded" style="font-size:22px;vertical-align:-4px;color:var(--admin-primary)">confirmation_number</span>
          Generate Voucher Baru
        </h3>
        <p class="modal-text">Buat batch voucher baru untuk diberikan ke pembeli Shopee.</p>

        <div class="form-group" style="margin-bottom:16px;text-align:left">
          <label class="form-label">Jumlah Voucher</label>
          <input
            v-model.number="generateCount"
            type="number"
            class="form-input"
            min="1"
            max="50"
            placeholder="1-50"
          />
        </div>
        <div class="form-group" style="margin-bottom:24px;text-align:left">
          <label class="form-label">Catatan (opsional)</label>
          <input
            v-model="generateNote"
            type="text"
            class="form-input"
            placeholder="Misal: Shopee batch 1, Order #12345"
          />
        </div>

        <div class="modal-actions">
          <button class="btn btn-outline" @click="showGenerateModal = false">Batal</button>
          <button class="btn btn-primary" :disabled="generateLoading || generateCount < 1" @click="handleGenerate">
            <span v-if="generateLoading" class="loading-spinner" style="width:16px;height:16px"></span>
            <span v-else class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">bolt</span>
            {{ generateLoading ? 'Membuat...' : `Buat ${generateCount} Voucher` }}
          </button>
        </div>

        <!-- Generated Result -->
        <div v-if="generatedCodes.length" class="generated-result">
          <div class="generated-header">
            <span class="material-symbols-rounded" style="font-size:18px;color:#10b981">check_circle</span>
            <strong>{{ generatedCodes.length }} voucher berhasil dibuat!</strong>
            <button class="btn btn-sm btn-outline" @click="copyAllCodes" style="margin-left:auto">
              <span class="material-symbols-rounded" style="font-size:14px;vertical-align:-2px">content_copy</span>
              Salin Semua
            </button>
          </div>
          <div class="generated-codes-list">
            <div v-for="code in generatedCodes" :key="code" class="generated-code-item">
              <code>{{ code }}</code>
              <button class="btn-copy" @click="copyCode(code)">
                <span class="material-symbols-rounded" style="font-size:14px">content_copy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toast" :class="['toast', `toast-${toast.type}`]">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { UserButton } from "@clerk/vue";

interface Voucher {
  id: string;
  code: string;
  status: "active" | "redeemed" | "expired";
  redeemed_by: string | null;
  redeemed_invitation_id: string | null;
  redeemed_at: string | null;
  note: string;
  created_at: string;
}

const authStore = useAuthStore();

const vouchers = ref<Voucher[]>([]);
const loading = ref(false);
const searchQuery = ref("");
const toast = ref<{ type: string; message: string } | null>(null);

// Generate modal
const showGenerateModal = ref(false);
const generateCount = ref(5);
const generateNote = ref("");
const generateLoading = ref(false);
const generatedCodes = ref<string[]>([]);

const API_BASE = (import.meta.env.VITE_API_URL || "") + "/api";

const activeCount = computed(() => vouchers.value.filter((v) => v.status === "active").length);
const redeemedCount = computed(() => vouchers.value.filter((v) => v.status === "redeemed").length);

const filteredVouchers = computed(() => {
  if (!searchQuery.value.trim()) return vouchers.value;
  const q = searchQuery.value.toUpperCase();
  return vouchers.value.filter(
    (v) => v.code.includes(q) || (v.note && v.note.toUpperCase().includes(q))
  );
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

async function fetchVouchers() {
  loading.value = true;
  try {
    const headers = await authStore.getAuthHeaders();
    const res = await fetch(`${API_BASE}/vouchers`, { headers });
    if (!res.ok) throw new Error("Gagal memuat voucher");
    vouchers.value = await res.json();
  } catch {
    showToast("error", "Gagal memuat data voucher");
  } finally {
    loading.value = false;
  }
}

async function handleGenerate() {
  generateLoading.value = true;
  generatedCodes.value = [];
  try {
    const headers = await authStore.getAuthHeaders();
    const res = await fetch(`${API_BASE}/vouchers/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({
        count: generateCount.value,
        note: generateNote.value,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Gagal generate voucher");

    generatedCodes.value = data.vouchers.map((v: any) => v.code);
    showToast("success", `${data.vouchers.length} voucher berhasil dibuat!`);
    generateNote.value = "";
    await fetchVouchers();
  } catch (err: any) {
    showToast("error", err.message || "Gagal generate voucher");
  } finally {
    generateLoading.value = false;
  }
}

async function expireVoucher(v: Voucher) {
  if (!confirm(`Nonaktifkan voucher ${v.code}?`)) return;
  try {
    const headers = await authStore.getAuthHeaders();
    // We'll call a simple PATCH-like approach via the redeem endpoint,
    // but actually we need a dedicated expire endpoint. Let's use direct supabase update.
    // For now, there's no backend endpoint for this, so let's show a placeholder.
    showToast("error", "Fitur nonaktifkan belum tersedia. Hapus manual dari Supabase.");
  } catch {
    showToast("error", "Gagal menonaktifkan voucher");
  }
}

function copyCode(code: string) {
  navigator.clipboard.writeText(code).then(() => {
    showToast("success", `Kode "${code}" disalin!`);
  });
}

function copyAllCodes() {
  const text = generatedCodes.value.join("\n");
  navigator.clipboard.writeText(text).then(() => {
    showToast("success", `${generatedCodes.value.length} kode disalin!`);
  });
}

onMounted(() => {
  fetchVouchers();
});
</script>

<style scoped>
/* Voucher Table */
.voucher-table-wrapper {
  overflow-x: auto;
}
.voucher-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.voucher-table th {
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
.voucher-table td {
  padding: 14px;
  border-bottom: 1px solid var(--admin-border);
  vertical-align: middle;
}
.voucher-table tbody tr:hover {
  background: rgba(59, 130, 246, 0.03);
}

.voucher-code-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}
.voucher-code-text {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 14px;
  font-weight: 700;
  color: var(--admin-primary);
  background: var(--admin-primary-light);
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.06em;
}
.btn-copy {
  background: none;
  border: 1px solid var(--admin-border);
  border-radius: 6px;
  padding: 4px 6px;
  cursor: pointer;
  color: var(--admin-text-secondary);
  display: flex;
  align-items: center;
  transition: all 0.15s;
}
.btn-copy:hover {
  border-color: var(--admin-primary);
  color: var(--admin-primary);
  background: var(--admin-primary-light);
}

/* Status Badges */
.v-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 600;
}
.v-badge-active {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}
.v-badge-redeemed {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}
.v-badge-expired {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.text-muted {
  color: var(--admin-text-secondary);
  font-size: 13px;
}
.text-sm {
  font-size: 13px;
  color: var(--admin-text-secondary);
}

/* Generated Result */
.generated-result {
  margin-top: 20px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  padding: 16px;
}
.generated-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #15803d;
}
.generated-codes-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
  max-height: 240px;
  overflow-y: auto;
}
.generated-code-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border: 1px solid #d1fae5;
  border-radius: 8px;
  padding: 8px 10px;
}
.generated-code-item code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 13px;
  font-weight: 700;
  color: #059669;
  letter-spacing: 0.04em;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .voucher-table {
    font-size: 13px;
  }
  .voucher-table th,
  .voucher-table td {
    padding: 10px 8px;
  }
  .generated-codes-list {
    grid-template-columns: 1fr;
  }
}
</style>
