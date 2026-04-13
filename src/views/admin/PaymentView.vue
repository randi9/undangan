<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <router-link to="/dashboard" class="sidebar-brand">
        <div class="sidebar-brand-icon" style="overflow:hidden;background:transparent">
          <img src="/images/logo.webp" alt="Logo" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div class="sidebar-brand-text">Mengundang<span>Anda</span></div>
      </router-link>

      <nav class="sidebar-nav">
        <router-link to="/dashboard" class="sidebar-link">
          <span class="material-symbols-rounded">dashboard</span>
          Dashboard
        </router-link>
        <router-link to="/dashboard/themes" class="sidebar-link">
          <span class="material-symbols-rounded">palette</span>
          Tema
        </router-link>
        <router-link to="/dashboard/payment" class="sidebar-link" exact>
          <span class="material-symbols-rounded">payments</span>
          Pembayaran
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
        <router-link to="/dashboard" class="mobile-brand">
          <div class="sidebar-brand-icon" style="width:28px;height:28px;border-radius:6px;overflow:hidden;background:transparent">
            <img src="/images/logo.webp" alt="Logo" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <div class="sidebar-brand-text" style="font-size:16px;">Mengundang<span>Anda</span></div>
        </router-link>

        <div class="search-bar" style="visibility: hidden;"></div>
        <div class="topbar-actions" style="gap: 12px;">
          <router-link to="/dashboard" class="btn btn-outline">
            <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">arrow_back</span>
            Kembali ke Dashboard
          </router-link>
        </div>
      </header>

      <div class="admin-container">
        <!-- Loading -->
        <div v-if="loading" style="text-align:center;padding:80px 0;">
          <div class="loading-spinner"></div>
          <p style="margin-top:12px;color:var(--admin-text-secondary)">Memuat data pembayaran...</p>
        </div>

        <!-- No invitation -->
        <div v-else-if="!invitationId" class="payment-empty">
          <Icon icon="ph:credit-card-duotone" class="payment-empty-icon" />
          <h2>Pilih Undangan</h2>
          <p>Silakan pilih undangan yang ingin di-upgrade dari dashboard.</p>
          <router-link to="/dashboard" class="btn btn-primary btn-lg">
            <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">dashboard</span>
            Ke Dashboard
          </router-link>
        </div>

        <!-- Payment Content -->
        <div v-else class="payment-wrapper">
          <!-- Status: Already Paid -->
          <div v-if="paymentData?.payment_status === 'paid'" class="payment-card payment-success-card">
            <Icon icon="ph:check-circle-duotone" class="payment-success-icon" />
            <h2>Undangan Sudah Premium!</h2>
            <p>Undangan Anda sudah dalam status <strong>PAID</strong>. Semua fitur premium sudah aktif tanpa batas akses.</p>
            <div class="payment-actions">
              <router-link to="/dashboard" class="btn btn-primary btn-lg">
                <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">dashboard</span>
                Kembali ke Dashboard
              </router-link>
            </div>
          </div>

          <!-- Status: Trial/Needs Payment -->
          <div v-else class="payment-card">
            <div class="payment-header">
              <div class="payment-icon-wrapper">
                <Icon icon="ph:sketch-logo-duotone" class="payment-icon" />
              </div>
              <h1>Upgrade ke Premium</h1>
              <p class="payment-subtitle">Dapatkan akses penuh dan fitur premium untuk undangan Anda</p>
            </div>

            <!-- Trial Status -->
            <div v-if="paymentData" class="trial-status-box">
              <div class="trial-status-row">
                <div class="trial-stat">
                  <div class="trial-stat-icon-wrapper primary">
                    <Icon icon="ph:chart-bar-duotone" class="trial-stat-icon" />
                  </div>
                  <div class="trial-stat-info">
                    <div class="trial-stat-label">Sisa Akses</div>
                    <div class="trial-stat-value">{{ paymentData.views_remaining ?? '—' }} / {{ paymentData.max_views || 20 }}</div>
                  </div>
                </div>
                <div class="trial-stat-divider"></div>
                <div class="trial-stat">
                  <div class="trial-stat-icon-wrapper warning">
                    <Icon icon="ph:clock-duotone" class="trial-stat-icon" />
                  </div>
                  <div class="trial-stat-info">
                    <div class="trial-stat-label">Sisa Waktu Free</div>
                    <div class="trial-stat-value">
                      <template v-if="paymentData.trial_time_remaining">
                        {{ paymentData.trial_time_remaining.hours }}j {{ paymentData.trial_time_remaining.minutes }}m
                      </template>
                      <template v-else-if="paymentData.trial_expired">
                        <span style="color: #ef4444;">Expired</span>
                      </template>
                      <template v-else>—</template>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="paymentData.trial_expired || paymentData.views_exhausted" class="trial-warning">
                <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">warning</span>
                {{ paymentData.trial_expired ? 'Masa free telah berakhir!' : 'Batas akses free telah tercapai!' }}
                Segera upgrade untuk melanjutkan.
              </div>
            </div>

            <!-- Features Comparison -->
            <div class="features-comparison">
              <div class="feature-col feature-trial">
                <h3>
                  <Icon icon="ph:gift-duotone" class="feature-title-icon" />
                  Free
                </h3>
                <ul>
                  <li class="feature-item feature-limited">
                    <Icon icon="ph:hourglass-duotone" class="feature-list-icon" />
                    Masa aktif 2 hari
                  </li>
                  <li class="feature-item feature-limited">
                    <Icon icon="ph:eye-duotone" class="feature-list-icon" />
                    20x akses link
                  </li>
                  <li class="feature-item feature-included">
                    <Icon icon="ph:pencil-simple-duotone" class="feature-list-icon" />
                    Unlimited edit
                  </li>
                  <li class="feature-item feature-included">
                    <Icon icon="ph:check-circle-duotone" class="feature-list-icon" />
                    Langsung jadi setelah input data
                  </li>
                  <li class="feature-item feature-included">
                    <Icon icon="ph:monitor-play-duotone" class="feature-list-icon" />
                    Live preview editor
                  </li>
                </ul>
              </div>
              <div class="feature-col feature-premium">
                <h3>
                  <Icon icon="ph:crown-duotone" class="feature-title-icon premium-icon" />
                  Premium
                </h3>
                <ul>
                  <li class="feature-item feature-included">
                    <Icon icon="ph:star-duotone" class="feature-list-icon" style="color: #3b82f6;" />
                    <strong>Semua fitur di Free</strong>
                  </li>
                  <li class="feature-item feature-included">
                    <Icon icon="ph:infinity-duotone" class="feature-list-icon" style="color: #3b82f6;" />
                    Unlimited akses link
                  </li>
                  <li class="feature-item feature-included">
                    <Icon icon="ph:calendar-check-duotone" class="feature-list-icon" style="color: #3b82f6;" />
                    1 tahun masa aktif
                  </li>
                  <li class="feature-item feature-included">
                    <Icon icon="ph:users-duotone" class="feature-list-icon" style="color: #3b82f6;" />
                    Unlimited tamu undangan
                  </li>
                </ul>
              </div>
            </div>

            <!-- Price & CTA -->
            <div class="payment-price-section">
              <div class="price-tag">
                <span class="price-currency">Rp</span>
                <span class="price-amount">50.000</span>
                <span class="price-period">/ sekali bayar</span>
              </div>
              <button
                class="btn btn-primary btn-lg btn-glow"
                :disabled="payLoading"
                @click="handlePay"
              >
                <span v-if="payLoading" class="loading-spinner-sm"></span>
                <span v-else class="material-symbols-rounded" style="font-size:20px;vertical-align:-4px">bolt</span>
                {{ payLoading ? 'Memproses...' : 'Bayar Sekarang' }}
              </button>
              <p class="payment-note">Pembayaran aman melalui <strong>Mayar.id</strong> — Transfer Bank, QRIS, E-Wallet</p>
            </div>

            <!-- Voucher Divider -->
            <div class="voucher-divider">
              <span class="voucher-divider-line"></span>
              <span class="voucher-divider-text">atau punya voucher?</span>
              <span class="voucher-divider-line"></span>
            </div>

            <!-- Voucher Redeem -->
            <div class="voucher-section">
              <div class="voucher-input-row">
                <div class="voucher-input-wrapper">
                  <span class="material-symbols-rounded voucher-input-icon">confirmation_number</span>
                  <input
                    v-model="voucherCode"
                    type="text"
                    class="voucher-input"
                    placeholder="Masukkan kode voucher (misal: MA-XXXXXXXX)"
                    :disabled="voucherLoading"
                    @keyup.enter="handleRedeem"
                  />
                </div>
                <button
                  class="btn btn-voucher"
                  :disabled="!voucherCode.trim() || voucherLoading"
                  @click="handleRedeem"
                >
                  <span v-if="voucherLoading" class="loading-spinner-sm"></span>
                  <span v-else class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">redeem</span>
                  {{ voucherLoading ? 'Proses...' : 'Tukarkan' }}
                </button>
              </div>
              <p class="voucher-hint">Beli dari Shopee? Masukkan kode voucher yang Anda terima untuk akses premium instan.</p>

              <!-- Voucher Success -->
              <div v-if="voucherSuccess" class="voucher-success">
                <span class="material-symbols-rounded" style="font-size:20px;color:#10b981">check_circle</span>
                {{ voucherSuccess }}
              </div>
            </div>

            <div v-if="payError" class="payment-error">
              <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">error</span>
              {{ payError }}
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
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { UserButton } from "@clerk/vue";
import { Icon } from "@iconify/vue";

const route = useRoute();
const authStore = useAuthStore();

const invitationId = computed(() => (route.query.invitation_id as string) || "");
const loading = ref(false);
const payLoading = ref(false);
const payError = ref<string | null>(null);
const paymentData = ref<any>(null);
const toast = ref<{ type: string; message: string } | null>(null);

// Voucher
const voucherCode = ref("");
const voucherLoading = ref(false);
const voucherSuccess = ref<string | null>(null);

function showToast(type: string, message: string) {
  toast.value = { type, message };
  setTimeout(() => { toast.value = null; }, 4000);
}

async function loadPaymentStatus() {
  if (!invitationId.value) return;
  loading.value = true;
  try {
    const data = await authStore.checkPaymentStatus(invitationId.value);
    paymentData.value = data;
  } catch {
    showToast("error", "Gagal memuat status pembayaran");
  } finally {
    loading.value = false;
  }
}

async function handlePay() {
  payLoading.value = true;
  payError.value = null;
  try {
    const result = await authStore.createPaymentInvoice(invitationId.value);
    if (result?.payment_url) {
      showToast("success", "Mengarahkan ke halaman pembayaran...");
      setTimeout(() => {
        window.location.href = result.payment_url;
      }, 800);
    } else {
      payError.value = "Gagal mendapatkan link pembayaran. Coba lagi.";
    }
  } catch (err: any) {
    payError.value = err.message || "Terjadi kesalahan. Coba lagi.";
  } finally {
    payLoading.value = false;
  }
}

async function handleRedeem() {
  if (!voucherCode.value.trim()) return;
  voucherLoading.value = true;
  payError.value = null;
  voucherSuccess.value = null;
  try {
    const headers = await authStore.getAuthHeaders();
    const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api';
    const res = await fetch(`${API_BASE}/vouchers/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify({
        code: voucherCode.value.trim(),
        invitation_id: invitationId.value,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      payError.value = data.error || 'Gagal redeem voucher.';
      return;
    }
    voucherSuccess.value = data.message || 'Voucher berhasil digunakan!';
    showToast('success', 'Voucher berhasil! Undangan Anda sekarang Premium.');
    // Reload payment status
    await loadPaymentStatus();
  } catch (err: any) {
    payError.value = err.message || 'Gagal redeem voucher.';
  } finally {
    voucherLoading.value = false;
  }
}

onMounted(() => {
  loadPaymentStatus();
});
</script>

<style scoped>
.payment-wrapper {
  max-width: 640px;
  margin: 0 auto;
  padding: 20px 0;
}

.payment-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  padding: 40px 32px;
  border: 1px solid #e8ecf4;
}

.payment-success-card {
  text-align: center;
}
.payment-success-icon {
  font-size: 72px;
  margin-bottom: 16px;
}
.payment-success-card h2 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #10b981;
  margin-bottom: 12px;
}
.payment-success-card p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 24px;
}

.payment-header {
  text-align: center;
  margin-bottom: 36px;
}
.payment-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #e0e7ff, #ede9fe);
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.12);
  transform: rotate(-5deg);
}
.payment-icon {
  font-size: 38px;
  color: #4f46e5;
  transform: rotate(5deg);
}
.payment-header h1 {
  font-size: 1.85rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
}
.payment-subtitle {
  color: #64748b;
  font-size: 1.05rem;
  max-width: 80%;
  margin: 0 auto;
}

/* Trial Status Box */
.trial-status-box {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}
.trial-status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.trial-stat {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}
.trial-stat:last-child {
  padding-left: 24px;
}
.trial-stat-divider {
  width: 1px;
  height: 48px;
  background: #e2e8f0;
  margin: 0 16px;
}
.trial-stat-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
}
.trial-stat-icon-wrapper.primary {
  background: #eef2ff;
  color: #4f46e5;
}
.trial-stat-icon-wrapper.warning {
  background: #fffbeb;
  color: #d97706;
}
.trial-stat-icon {
  font-size: 26px;
}
.trial-stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.trial-stat-label {
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 700;
}
.trial-stat-value {
  font-size: 1.3rem;
  font-weight: 800;
  color: #0f172a;
}
.trial-warning {
  margin-top: 20px;
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #b91c1c;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

/* Features Comparison */
.features-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 36px;
}
.feature-col {
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}
.feature-col h3 {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.feature-title-icon {
  font-size: 24px;
  color: #64748b;
}
.feature-title-icon.premium-icon {
  color: #3b82f6;
}
.feature-trial {
  background: #f8fafc;
}
.feature-premium {
  background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%);
  border-color: #86efac;
  box-shadow: 0 4px 20px rgba(34, 197, 94, 0.08);
}
.feature-premium h3 {
  color: #166534;
}
.feature-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  font-weight: 500;
}
.feature-list-icon {
  font-size: 20px;
}
.feature-limited {
  color: #64748b;
}
.feature-limited .feature-list-icon {
  color: #cbd5e1;
}
.feature-included {
  color: #0f172a;
}
.feature-included .feature-list-icon {
  color: #10b981;
}

/* Price Section */
.payment-price-section {
  text-align: center;
}
.price-tag {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  margin-bottom: 20px;
}
.price-currency {
  font-size: 1.2rem;
  color: #64748b;
  font-weight: 600;
}
.price-amount {
  font-size: 2.8rem;
  font-weight: 900;
  color: #1e293b;
  letter-spacing: -0.02em;
}
.price-period {
  font-size: 0.9rem;
  color: #94a3b8;
  font-weight: 500;
}

.btn-glow {
  animation: glow-pulse 2s ease-in-out infinite;
  padding: 14px 40px !important;
  font-size: 1.05rem !important;
  border-radius: 14px !important;
}
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 4px 28px rgba(99, 102, 241, 0.5); }
}

.payment-note {
  margin-top: 14px;
  font-size: 0.8rem;
  color: #94a3b8;
}

.payment-error {
  margin-top: 16px;
  padding: 10px 14px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  color: #dc2626;
  font-size: 0.85rem;
  text-align: center;
}

.payment-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.payment-empty {
  text-align: center;
  padding: 80px 0;
}
.payment-empty-icon {
  font-size: 72px;
  margin-bottom: 16px;
}
.payment-empty h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}
.payment-empty p {
  color: #64748b;
  margin-bottom: 24px;
}

.loading-spinner-sm {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  vertical-align: -3px;
  margin-right: 6px;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .payment-card { padding: 28px 20px; }
  .features-comparison { grid-template-columns: 1fr; }
  .trial-status-row { flex-direction: column; gap: 20px; align-items: flex-start; }
  .trial-stat:last-child { padding-left: 0; }
  .trial-stat-divider { display: none; }
  .price-amount { font-size: 2.2rem; }
  .voucher-input-row { flex-direction: column; }
}

/* Voucher Section */
.voucher-divider {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 36px 0 24px;
}
.voucher-divider-line {
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}
.voucher-divider-text {
  font-size: 0.85rem;
  color: #94a3b8;
  font-weight: 500;
  white-space: nowrap;
}

.voucher-section {
  text-align: center;
}
.voucher-input-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.voucher-input-wrapper {
  flex: 1;
  position: relative;
}
.voucher-input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #94a3b8;
}
.voucher-input {
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1e293b;
  transition: border-color 0.2s;
  outline: none;
  box-sizing: border-box;
}
.voucher-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
}
.voucher-input::placeholder {
  text-transform: none;
  letter-spacing: normal;
  font-weight: 400;
  color: #94a3b8;
}
.btn-voucher {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: 12px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}
.btn-voucher:hover:not(:disabled) {
  background: linear-gradient(135deg, #059669, #047857);
  box-shadow: 0 4px 14px rgba(16,185,129,0.35);
}
.btn-voucher:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.voucher-hint {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 6px;
}
.voucher-success {
  margin-top: 14px;
  padding: 12px 16px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  color: #15803d;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>
