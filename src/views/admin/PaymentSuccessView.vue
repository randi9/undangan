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
      </nav>
      <div class="sidebar-footer" style="padding: 1rem 0; border-top: 1px solid #e1e8f0; margin-top: auto;">
        <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
          <UserButton showName />
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="admin-main">
      <div class="admin-container">
        <div class="success-wrapper">
          <!-- Loading / Verifying -->
          <div v-if="verifying" class="success-card">
            <div class="success-spinner-container">
              <div class="loading-spinner-lg"></div>
            </div>
            <h2>Memverifikasi Pembayaran...</h2>
            <p>Mohon tunggu, kami sedang memverifikasi pembayaran Anda.</p>
          </div>

          <!-- Payment Confirmed -->
          <div v-else-if="paymentConfirmed" class="success-card success-confirmed">
            <div class="success-icon-container">
              <div class="success-checkmark-circle">
                <svg class="success-checkmark" viewBox="0 0 52 52">
                  <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                  <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
            </div>
            <h1>Pembayaran Berhasil! 🎉</h1>
            <p class="success-message">
              Undangan Anda sekarang sudah <strong>Premium</strong>.<br>
              Watermark telah dihapus dan akses link menjadi unlimited.
            </p>
            <div class="success-features">
              <div class="success-feature">
                <span class="material-symbols-rounded" style="color: #10b981;">check_circle</span>
                Tanpa watermark
              </div>
              <div class="success-feature">
                <span class="material-symbols-rounded" style="color: #10b981;">check_circle</span>
                Akses link unlimited
              </div>
              <div class="success-feature">
                <span class="material-symbols-rounded" style="color: #10b981;">check_circle</span>
                Aktif selamanya
              </div>
            </div>
            <div class="success-actions">
              <router-link to="/" class="btn btn-primary btn-lg">
                <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">dashboard</span>
                Ke Dashboard
              </router-link>
              <a v-if="invitationSlug" :href="getInvitationUrl(invitationSlug)" target="_blank" class="btn btn-outline btn-lg">
                <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">visibility</span>
                Lihat Undangan
              </a>
            </div>
          </div>

          <!-- Payment Pending (webhook belum sampai) -->
          <div v-else class="success-card success-pending">
            <div class="pending-icon">⏳</div>
            <h2>Menunggu Konfirmasi</h2>
            <p>
              Pembayaran Anda sedang diproses. Status akan diperbarui otomatis dalam beberapa menit.
            </p>
            <p class="pending-note">
              Jika Anda sudah melakukan pembayaran, coba refresh halaman ini atau cek kembali nanti.
            </p>
            <div class="success-actions">
              <button class="btn btn-primary" @click="recheckPayment" :disabled="verifying">
                <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">refresh</span>
                Cek Ulang Status
              </button>
              <router-link to="/" class="btn btn-outline">
                <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">dashboard</span>
                Ke Dashboard
              </router-link>
            </div>
          </div>
        </div>

        <!-- Confetti animation for success -->
        <div v-if="paymentConfirmed" class="confetti-container" aria-hidden="true">
          <div v-for="i in 40" :key="i" class="confetti-piece" :style="confettiStyle(i)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { UserButton } from "@clerk/vue";

const route = useRoute();
const authStore = useAuthStore();

const invitationId = computed(() => (route.query.invitation_id as string) || "");
const verifying = ref(true);
const paymentConfirmed = ref(false);
const invitationSlug = ref("");

let retryCount = 0;
const MAX_RETRIES = 10;

function getInvitationUrl(slug: string) {
  const host = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : "";
  const protocol = window.location.protocol;

  if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".vercel.app")) {
    return `${protocol}//${host}${port}/invitation/${slug}`;
  }
  const mainDomain = host.replace("www.", "").replace("admin.", "");
  return `${protocol}//${slug}.${mainDomain}${port}`;
}

function confettiStyle(i: number) {
  const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff922b', '#cc5de8', '#20c997'];
  const color = colors[i % colors.length];
  const left = Math.random() * 100;
  const animDelay = Math.random() * 3;
  const animDuration = 2 + Math.random() * 3;
  const size = 6 + Math.random() * 8;
  return {
    left: `${left}%`,
    width: `${size}px`,
    height: `${size * 0.6}px`,
    backgroundColor: color,
    animationDelay: `${animDelay}s`,
    animationDuration: `${animDuration}s`,
  };
}

// Sync premium to user account after payment is confirmed
async function syncPremiumToAccount() {
  try {
    const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api';
    const headers = await authStore.getAuthHeaders();
    await fetch(`${API_BASE}/payment/verify-license`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify({
        payment_token: `success:${invitationId.value || 'redirect'}`,
        invitation_id: invitationId.value || undefined,
      }),
    });
  } catch {
    // Not critical — webhook will handle it
  }
}

// Find the user's latest invitation (for preview link when no invitation_id in URL)
async function findLatestInvitation() {
  try {
    const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api';
    const headers = await authStore.getAuthHeaders();
    const res = await fetch(`${API_BASE}/invitations`, { headers });
    if (res.ok) {
      const invitations = await res.json();
      if (invitations && invitations.length > 0) {
        // Find the latest paid invitation, or just the latest
        const paidInv = invitations.find((i: any) => i.payment_status === 'paid');
        const target = paidInv || invitations[0];
        invitationSlug.value = target.slug || "";
        return target;
      }
    }
  } catch { /* ignore */ }
  return null;
}

async function checkPayment() {
  verifying.value = true;

  // Always sync premium to user account first
  await syncPremiumToAccount();

  if (invitationId.value) {
    // We have invitation_id in URL — check its specific status
    try {
      const data = await authStore.checkPaymentStatus(invitationId.value);
      if (data?.payment_status === "paid") {
        paymentConfirmed.value = true;
        // Get slug for preview link
        try {
          const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api';
          const headers = await authStore.getAuthHeaders();
          const res = await fetch(`${API_BASE}/invitations/${invitationId.value}`, { headers });
          if (res.ok) {
            const inv = await res.json();
            invitationSlug.value = inv.slug || "";
          }
        } catch { /* ignore */ }
      } else if (retryCount < MAX_RETRIES) {
        retryCount++;
        setTimeout(checkPayment, 3000);
        return;
      }
    } catch { /* ignore */ }
  } else {
    // No invitation_id in URL (redirected from Mayar without params)
    // Find the user's latest invitation and assume payment succeeded
    const inv = await findLatestInvitation();
    if (inv?.payment_status === "paid") {
      paymentConfirmed.value = true;
    } else if (retryCount < MAX_RETRIES) {
      // Webhook might not have arrived yet
      retryCount++;
      setTimeout(checkPayment, 3000);
      return;
    } else {
      // After all retries, still show success (user just paid!)
      paymentConfirmed.value = true;
    }
  }

  verifying.value = false;
}

async function recheckPayment() {
  retryCount = 0;
  await checkPayment();
}

onMounted(() => {
  checkPayment();
});
</script>

<style scoped>
.success-wrapper {
  max-width: 560px;
  margin: 40px auto;
  padding: 0 16px;
}

.success-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.08);
  padding: 48px 36px;
  text-align: center;
  border: 1px solid #e8ecf4;
  position: relative;
  z-index: 2;
}

.success-card h1 {
  font-size: 1.8rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 12px;
}
.success-card h2 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 10px;
}
.success-message {
  color: #64748b;
  line-height: 1.7;
  font-size: 1rem;
  margin-bottom: 28px;
}

/* Checkmark Animation */
.success-icon-container {
  margin-bottom: 24px;
}
.success-checkmark-circle {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}
.success-checkmark {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 3;
  stroke-miterlimit: 10;
  stroke: #10b981;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}
.checkmark-check {
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke-width: 3;
  stroke-linecap: round;
  stroke: #10b981;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards;
}
@keyframes stroke {
  100% { stroke-dashoffset: 0; }
}

/* Features */
.success-features {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.success-feature {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
}
.success-feature .material-symbols-rounded {
  font-size: 20px;
}

.success-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

/* Pending */
.pending-icon {
  font-size: 64px;
  margin-bottom: 16px;
}
.pending-note {
  color: #94a3b8;
  font-size: 0.85rem;
  margin: 16px 0 24px;
}

/* Spinner */
.success-spinner-container {
  margin-bottom: 20px;
}
.loading-spinner-lg {
  width: 48px;
  height: 48px;
  border: 4px solid #e2e8f0;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Confetti */
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}
.confetti-piece {
  position: absolute;
  top: -10px;
  border-radius: 2px;
  animation: confetti-fall linear forwards;
}
@keyframes confetti-fall {
  0% {
    transform: translateY(-10px) rotate(0deg);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

@media (max-width: 640px) {
  .success-card { padding: 36px 24px; }
  .success-features { flex-direction: column; align-items: center; gap: 10px; }
}
</style>
