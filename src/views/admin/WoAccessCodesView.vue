<template>
  <AdminLayout>
    <template #search>
      <div style="display: flex; gap: 12px; flex: 1; align-items: center; max-width: 500px;">
        <div class="search-bar" style="flex: 1; margin: 0; max-width: none;">
          <span class="material-symbols-rounded" style="font-size:20px">search</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari kode akses..."
          />
        </div>
        <select v-model="filterStatus" style="padding: 11px 14px; border-radius: 8px; border: 1px solid var(--admin-border); background: var(--admin-surface); color: var(--admin-text); outline: none; font-size: 14px; font-family: inherit;">
          <option value="all">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="used">Terpakai</option>
          <option value="revoked">Dicabut</option>
        </select>
      </div>
    </template>
    <template #actions>
      <button 
        class="btn btn-primary" 
        :disabled="stats ? stats.quota_remaining <= 0 : false"
        @click="handleGenerateCode"
      >
        <span v-if="generateLoading" class="loading-spinner" style="width:16px;height:16px;margin-right:8px"></span>
        <span v-else class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px;margin-right:4px">add</span>
        Generate Kode Akses
      </button>
    </template>

    <!-- Quota Stats Banner -->
    <div class="quota-banner-card" v-if="stats">
      <div class="qb-info">
        <div class="qb-title">Kuota Undangan Wedding Organizer</div>
        <div class="qb-stats">
          <span class="qb-used">{{ stats.quota_used }}</span>
          <span class="qb-divider">/</span>
          <span class="qb-total">{{ stats.quota_limit }} Terpakai</span>
        </div>
      </div>
      <div class="qb-progress-container">
        <div class="qb-progress-bar" :style="{ width: `${(stats.quota_used / Math.max(1, stats.quota_limit)) * 100}%` }" :class="{ 'warning': stats.quota_remaining <= 1, 'danger': stats.quota_remaining === 0 }"></div>
      </div>
      <div class="qb-footer">
        Sisa kuota: <strong>{{ stats.quota_remaining }} undangan</strong>. 
        <span v-if="stats.quota_remaining === 0" class="quota-warning-text">Kuota Anda habis. Hubungi Admin untuk menambah kuota.</span>
      </div>
    </div>

    <!-- Stats grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-body">
          <div class="stat-label">Kode Aktif</div>
          <div class="stat-value">{{ stats?.codes_active ?? 0 }}</div>
        </div>
        <div class="stat-icon blue">
          <span class="material-symbols-rounded">vpn_key</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-body">
          <div class="stat-label">Kode Terpakai</div>
          <div class="stat-value">{{ stats?.codes_used ?? 0 }}</div>
        </div>
        <div class="stat-icon emerald">
          <span class="material-symbols-rounded">check_circle</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-body">
          <div class="stat-label">Kode Dicabut</div>
          <div class="stat-value">{{ stats?.codes_revoked ?? 0 }}</div>
        </div>
        <div class="stat-icon pink">
          <span class="material-symbols-rounded">cancel</span>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" style="text-align:center;padding:60px 0;">
      <div class="loading-spinner"></div>
      <p style="margin-top:12px;color:var(--admin-text-secondary)">Memuat data kode akses...</p>
    </div>

    <!-- Data Table -->
    <div v-else class="admin-card">
      <div class="section-header" style="margin-bottom:16px">
        <div>
          <h2 class="admin-page-title" style="font-size:20px;margin-bottom:2px">Kode Akses Client</h2>
          <p class="admin-page-subtitle">Bagikan kode akses ini kepada client Anda untuk membuat undangan pernikahan</p>
        </div>
      </div>

      <div v-if="filteredCodes.length === 0" class="empty-state">
        <div class="empty-icon"><Icon icon="lucide:key-round" style="font-size: 48px; opacity: 0.5;" /></div>
        <div class="empty-title">Tidak ada kode akses</div>
        <div class="empty-text">Klik "Generate Kode Akses" untuk membuat kode baru.</div>
      </div>

      <div v-else class="codes-container">
        <!-- Desktop Table -->
        <div class="desktop-only-table codes-table-wrapper">
          <table class="codes-table">
            <thead>
              <tr>
                <th>Kode Akses</th>
                <th>Status</th>
                <th>Undangan Terkait</th>
                <th>Tanggal Dibuat</th>
                <th>Tanggal Digunakan</th>
                <th>Aksi / Bagikan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in filteredCodes" :key="c.id">
                <td>
                  <div class="code-cell">
                    <code class="code-text">{{ c.code }}</code>
                    <button class="btn-copy" @click="copyCode(c.code)" :title="'Salin kode ' + c.code">
                      <span class="material-symbols-rounded" style="font-size:16px">content_copy</span>
                    </button>
                  </div>
                </td>
                <td>
                  <span :class="['v-badge', `v-badge-${c.status}`]">
                    {{ c.status === 'active' ? 'Aktif' : c.status === 'used' ? 'Terpakai' : 'Dicabut' }}
                  </span>
                </td>
                <td>
                  <div v-if="c.invitation" class="invitation-link-cell">
                    <a :href="`/invitation/${c.invitation.slug}`" target="_blank" class="inv-link">
                      {{ c.invitation.groom_name }} & {{ c.invitation.bride_name }}
                    </a>
                  </div>
                  <span v-else class="text-muted">— Belum dibuat —</span>
                </td>
                <td class="text-sm">{{ formatDate(c.created_at) }}</td>
                <td class="text-sm">{{ formatDate(c.used_at) }}</td>
                <td>
                  <div style="display:flex; gap: 8px; align-items:center;">
                    <button 
                      class="btn btn-sm btn-outline btn-share" 
                      @click="copyShareLink(c.code)"
                      title="Salin Link Akses Client"
                    >
                      <span class="material-symbols-rounded" style="font-size:16px;margin-right:4px">share</span>
                      Salin Link
                    </button>
                    <button
                      v-if="c.status === 'active'"
                      class="btn btn-sm btn-danger"
                      @click="handleRevokeCode(c)"
                      title="Cabut Kode Akses"
                    >
                      <span class="material-symbols-rounded" style="font-size:16px">block</span>
                    </button>
                    <button
                      v-if="c.status === 'active' || c.status === 'revoked' || !c.invitation_id"
                      class="btn btn-sm btn-danger"
                      @click="handleDeleteCode(c)"
                      title="Hapus Kode Akses Secara Permanen"
                      style="background-color: #ef4444; border-color: #ef4444; color: #fff;"
                    >
                      <span class="material-symbols-rounded" style="font-size:16px">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="mobile-only-cards">
          <div v-for="c in filteredCodes" :key="c.id" class="mobile-code-card">
            <div class="mcc-header">
              <div class="code-cell">
                <code class="code-text">{{ c.code }}</code>
                <button class="btn-copy" @click="copyCode(c.code)">
                  <span class="material-symbols-rounded" style="font-size:16px">content_copy</span>
                </button>
              </div>
              <span :class="['v-badge', `v-badge-${c.status}`]">
                {{ c.status === 'active' ? 'Aktif' : c.status === 'used' ? 'Terpakai' : 'Dicabut' }}
              </span>
            </div>
            <div class="mcc-body">
              <div class="mcc-row">
                <span class="mcc-label">Undangan:</span>
                <span class="mcc-value">
                  <a v-if="c.invitation" :href="`/invitation/${c.invitation.slug}`" target="_blank" class="inv-link">
                    {{ c.invitation.groom_name }} & {{ c.invitation.bride_name }}
                  </a>
                  <span v-else class="text-muted">— Belum dibuat —</span>
                </span>
              </div>
              <div class="mcc-row">
                <span class="mcc-label">Dibuat:</span>
                <span class="mcc-value">{{ formatDate(c.created_at) }}</span>
              </div>
              <div class="mcc-row" v-if="c.used_at">
                <span class="mcc-label">Digunakan:</span>
                <span class="mcc-value">{{ formatDate(c.used_at) }}</span>
              </div>
            </div>
            <div class="mcc-actions">
              <button 
                class="btn btn-sm btn-outline btn-share" 
                style="flex: 1; justify-content: center;"
                @click="copyShareLink(c.code)"
              >
                <span class="material-symbols-rounded" style="font-size:16px;margin-right:4px">share</span>
                Salin Link Akses
              </button>
              <button
                v-if="c.status === 'active'"
                class="btn btn-sm btn-danger"
                style="padding: 6px 12px;"
                @click="handleRevokeCode(c)"
                title="Cabut Kode Akses"
              >
                <span class="material-symbols-rounded" style="font-size:16px">block</span>
              </button>
              <button
                v-if="c.status === 'active' || c.status === 'revoked' || !c.invitation_id"
                class="btn btn-sm btn-danger"
                style="padding: 6px 12px; background-color: #ef4444; border-color: #ef4444; color: #fff;"
                @click="handleDeleteCode(c)"
                title="Hapus Kode Akses Secara Permanen"
              >
                <span class="material-symbols-rounded" style="font-size:16px">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Alert -->
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

interface WoAccessCode {
  id: string;
  code: string;
  wo_user_id: string;
  invitation_id: string | null;
  status: "active" | "used" | "revoked";
  created_at: string;
  used_at: string | null;
  invitation?: {
    id: string;
    slug: string;
    groom_name: string;
    bride_name: string;
    cover_photo: string;
    theme: string;
  };
}

interface WoStats {
  quota_limit: number;
  quota_used: number;
  quota_remaining: number;
  codes_active: number;
  codes_used: number;
  codes_revoked: number;
}

const authStore = useAuthStore();
const codes = ref<WoAccessCode[]>([]);
const stats = ref<WoStats | null>(null);
const loading = ref(false);
const generateLoading = ref(false);
const searchQuery = ref("");
const filterStatus = ref("all");
const toast = ref<{ type: string; message: string } | null>(null);

const API_BASE = (import.meta.env.VITE_API_URL || "") + "/api";

const filteredCodes = computed(() => {
  let result = codes.value;

  if (filterStatus.value !== "all") {
    result = result.filter((c) => c.status === filterStatus.value);
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toUpperCase();
    result = result.filter((c) => {
      const matchCode = c.code.includes(q);
      const matchInvitation = c.invitation && (
        c.invitation.groom_name.toUpperCase().includes(q) ||
        c.invitation.bride_name.toUpperCase().includes(q) ||
        c.invitation.slug.toUpperCase().includes(q)
      );
      return matchCode || matchInvitation;
    });
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

async function fetchStats() {
  try {
    const headers = await authStore.getAuthHeaders();
    const res = await fetch(`${API_BASE}/wo/stats`, { headers });
    if (!res.ok) throw new Error();
    stats.value = await res.json();
  } catch {
    console.error("Gagal memuat statistik WO");
  }
}

async function fetchCodes() {
  loading.value = true;
  try {
    const headers = await authStore.getAuthHeaders();
    const res = await fetch(`${API_BASE}/wo/codes`, { headers });
    if (!res.ok) throw new Error("Gagal memuat kode akses");
    codes.value = await res.json();
    await fetchStats();
  } catch {
    showToast("error", "Gagal memuat data kode akses");
  } finally {
    loading.value = false;
  }
}

async function handleGenerateCode() {
  if (stats.value && stats.value.quota_remaining <= 0) {
    showToast("error", "Kuota pembuatan undangan Anda telah habis.");
    return;
  }

  generateLoading.value = true;
  try {
    const headers = await authStore.getAuthHeaders();
    const res = await fetch(`${API_BASE}/wo/codes`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Gagal membuat kode akses");

    showToast("success", `Kode akses baru "${data.code}" berhasil di-generate!`);
    await fetchCodes();
  } catch (err: any) {
    showToast("error", err.message || "Gagal membuat kode akses");
  } finally {
    generateLoading.value = false;
  }
}

async function handleRevokeCode(c: WoAccessCode) {
  if (!confirm(`Apakah Anda yakin ingin mencabut kode akses "${c.code}"?`)) return;

  try {
    const headers = await authStore.getAuthHeaders();
    const res = await fetch(`${API_BASE}/wo/codes/${c.id}/revoke`, {
      method: "POST",
      headers,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Gagal mencabut kode akses");

    showToast("success", `Kode akses "${c.code}" dicabut.`);
    await fetchCodes();
  } catch (err: any) {
    showToast("error", err.message || "Gagal mencabut kode akses");
  }
}

async function handleDeleteCode(c: WoAccessCode) {
  if (!confirm(`Apakah Anda yakin ingin menghapus secara permanen kode akses "${c.code}"?`)) return;

  try {
    const headers = await authStore.getAuthHeaders();
    const res = await fetch(`${API_BASE}/wo/codes/${c.id}`, {
      method: "DELETE",
      headers,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Gagal menghapus kode akses");

    showToast("success", `Kode akses "${c.code}" berhasil dihapus secara permanen.`);
    await fetchCodes();
  } catch (err: any) {
    showToast("error", err.message || "Gagal menghapus kode akses");
  }
}

function copyCode(code: string) {
  navigator.clipboard.writeText(code).then(() => {
    showToast("success", `Kode "${code}" disalin!`);
  });
}

function copyShareLink(code: string) {
  const origin = window.location.origin;
  const link = `${origin}/client?code=${code}`;
  navigator.clipboard.writeText(link).then(() => {
    showToast("success", "Link akses client berhasil disalin!");
  });
}

onMounted(() => {
  fetchCodes();
});
</script>

<style scoped>
/* Quota Banner */
.quota-banner-card {
  background: white;
  border: 1px solid var(--admin-border);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}
.qb-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.qb-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--admin-text);
}
.qb-stats {
  font-size: 15px;
  font-weight: 500;
}
.qb-used {
  font-size: 20px;
  font-weight: 700;
  color: var(--admin-primary);
}
.qb-divider {
  margin: 0 4px;
  color: var(--admin-text-secondary);
}
.qb-total {
  color: var(--admin-text-secondary);
}
.qb-progress-container {
  height: 8px;
  background: #f1f5f9;
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 12px;
}
.qb-progress-bar {
  height: 100%;
  background: var(--admin-primary);
  border-radius: 99px;
  transition: width 0.4s ease;
}
.qb-progress-bar.warning {
  background: #f59e0b;
}
.qb-progress-bar.danger {
  background: #ef4444;
}
.qb-footer {
  font-size: 13px;
  color: var(--admin-text-secondary);
}
.quota-warning-text {
  color: #ef4444;
  font-weight: 600;
  margin-left: 6px;
}

/* Table styling */
.codes-table-wrapper {
  overflow-x: auto;
}
.codes-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.codes-table th {
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
.codes-table td {
  padding: 14px;
  border-bottom: 1px solid var(--admin-border);
  vertical-align: middle;
}
.codes-table tbody tr:hover {
  background: rgba(59, 130, 246, 0.03);
}

.code-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}
.code-text {
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
.v-badge-used {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}
.v-badge-revoked {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.inv-link {
  color: var(--admin-primary);
  text-decoration: none;
  font-weight: 600;
}
.inv-link:hover {
  text-decoration: underline;
}

.text-muted {
  color: var(--admin-text-secondary);
  font-size: 13px;
}
.text-sm {
  font-size: 13px;
  color: var(--admin-text-secondary);
}

/* Share Button */
.btn-share {
  background: white;
  border-color: #cbd5e1;
  color: #475569;
  font-weight: 500;
}
.btn-share:hover {
  background: #f8fafc;
  border-color: var(--admin-primary);
  color: var(--admin-primary);
}

/* Mobile Visibility styling */
.mobile-only-cards {
  display: none;
}
.desktop-only-table {
  display: block;
}

@media (max-width: 768px) {
  .desktop-only-table { display: none; }
  .mobile-only-cards {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px 0;
  }
  .mobile-code-card {
    background: white;
    border: 1px solid var(--admin-border);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  }
  .mcc-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .mcc-body {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 13px;
    border-top: 1px solid var(--admin-border);
    border-bottom: 1px solid var(--admin-border);
    padding: 10px 0;
  }
  .mcc-row {
    display: flex;
    justify-content: space-between;
  }
  .mcc-label {
    color: var(--admin-text-secondary);
  }
  .mcc-value {
    font-weight: 500;
    color: var(--admin-text);
  }
  .mcc-actions {
    display: flex;
    gap: 8px;
  }
}
</style>
