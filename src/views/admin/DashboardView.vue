<template>
  <AdminLayout>
    <template #search>
      <div v-if="authStore.isAdmin || (authStore.user?.max_invitations ?? 0) > 1" class="search-bar">
        <span class="material-symbols-rounded" style="font-size:20px">search</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari undangan berdasarkan nama..."
        />
      </div>
    </template>
    <template #actions>
      <div v-if="authStore.user && !authStore.isAdmin && !hasReachedLimit && (authStore.user.max_invitations ?? 0) > 1" class="invitation-limit-info">
        <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">bar_chart</span>
        {{ invitations.length }} / {{ authStore.user.max_invitations }} undangan
      </div>
      <router-link v-if="!hasReachedLimit" to="/dashboard/create" class="btn btn-primary">
        <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">auto_awesome</span>
        Buat Undangan Baru
      </router-link>
      <div v-else-if="hasReachedLimit" class="limit-reached-block">
        <button class="btn btn-primary btn-disabled" disabled>
          <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">block</span>
          Buat Undangan Baru
        </button>
      </div>
    </template>
        <!-- Stats Skeleton Mode -->
        <div v-if="store.loading" class="stats-grid">
          <AppSkeleton v-for="i in 4" :key="`stat-skel-${i}`" height="90px" rounded="2xl" />
        </div>

        <!-- Stats -->
        <div v-else class="stats-grid">
          <div class="stat-card blue">
            <div class="stat-header">
              <div class="stat-icon-glow">
                <Icon icon="ph:envelope-open-duotone" />
              </div>
            </div>
            <div class="stat-body">
              <div class="stat-value">{{ invitations.length }}</div>
              <div class="stat-label">Total Undangan</div>
            </div>
            <div class="stat-deco">
              <Icon icon="ph:envelope-open-duotone" />
            </div>
          </div>
          <div class="stat-card pink">
            <div class="stat-header">
              <div class="stat-icon-glow">
                <Icon icon="ph:eye-duotone" />
              </div>
            </div>
            <div class="stat-body">
              <div class="stat-value">{{ totalViews }}</div>
              <div class="stat-label">Total Dilihat</div>
            </div>
            <div class="stat-deco">
              <Icon icon="ph:eye-duotone" />
            </div>
          </div>
          <div class="stat-card purple">
            <div class="stat-header">
              <div class="stat-icon-glow">
                <Icon icon="ph:image-square-duotone" />
              </div>
            </div>
            <div class="stat-body">
              <div class="stat-value">{{ totalPhotos }}</div>
              <div class="stat-label">Total Foto</div>
            </div>
            <div class="stat-deco">
              <Icon icon="ph:image-square-duotone" />
            </div>
          </div>
          <div class="stat-card emerald">
            <div class="stat-header">
              <div class="stat-icon-glow">
                <Icon icon="ph:users-duotone" />
              </div>
            </div>
            <div class="stat-body">
              <div class="stat-value">{{ totalRsvps }}</div>
              <div class="stat-label">Total RSVP</div>
            </div>
            <div class="stat-deco">
              <Icon icon="ph:users-duotone" />
            </div>
          </div>
        </div>

        <!-- Section Title -->
        <div class="section-header">
          <div>
            <h1 class="admin-page-title">Daftar Undangan</h1>
            <p class="admin-page-subtitle">Kelola semua undangan pernikahan yang telah dibuat</p>
          </div>
        </div>

        <!-- Invitation Skeletons -->
        <div v-if="store.loading" class="invitation-grid">
          <AppSkeleton v-for="i in 3" :key="`inv-skel-${i}`" height="300px" rounded="2xl" />
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredInvitations.length === 0 && !searchQuery" class="empty-state">
          <div class="empty-icon">
            <span class="material-symbols-rounded" style="font-size:64px;color:var(--admin-primary)">mail</span>
          </div>
          <div class="empty-title">Belum Ada Undangan</div>
          <div class="empty-text">
            Mulai buat undangan pernikahan pertama Anda dengan klik tombol di bawah
          </div>
          <router-link v-if="!hasReachedLimit" to="/dashboard/create" class="btn btn-primary btn-lg">
            <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">auto_awesome</span>
            Buat Undangan Pertama
          </router-link>
          <div v-else class="limit-warning" style="margin-top:12px">
            <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">warning</span>
            Limit tercapai! Hubungi admin untuk menambah kuota.
          </div>
        </div>

        <!-- Search Empty -->
        <div v-else-if="filteredInvitations.length === 0 && searchQuery" class="empty-state">
          <div class="empty-icon">
            <span class="material-symbols-rounded" style="font-size:64px;color:var(--admin-text-secondary)">search_off</span>
          </div>
          <div class="empty-title">Tidak Ditemukan</div>
          <div class="empty-text">
            Tidak ada undangan yang cocok dengan pencarian "{{ searchQuery }}"
          </div>
        </div>

        <!-- Invitation Grid -->
        <div v-else class="invitation-grid">
          <div
            v-for="invitation in filteredInvitations"
            :key="invitation.id"
            class="invitation-card"
          >
            <div class="invitation-card-cover-wrapper">
              <img
                v-if="invitation.cover_photo"
                :src="resolveAssetUrl(invitation.cover_photo, apiBase)"
                :alt="invitation.groom_name + ' & ' + invitation.bride_name"
                class="invitation-card-cover"
              />
              <div
                v-else
                class="invitation-card-cover"
                style="display:flex;align-items:center;justify-content:center;font-size:48px;background:linear-gradient(135deg,#e8ecf4,#d1d5e0)"
              >
                <img src="/images/logo.webp" alt="Logo" style="width:48px;height:48px;object-fit:cover;opacity:0.4" />
              </div>
            </div>

            <div class="invitation-card-body">
              <div v-if="invitation.payment_status === 'trial'" class="payment-status-badge trial-badge-indicator">
                <span class="material-symbols-rounded" style="font-size:14px;vertical-align:-2px">hourglass_top</span>
                Free
              </div>
              <div v-else-if="invitation.payment_status === 'paid'" class="payment-status-badge paid-badge-indicator">
                <span class="material-symbols-rounded" style="font-size:14px;vertical-align:-2px">verified</span>
                PREMIUM
              </div>

              <div class="invitation-card-names">
                {{ invitation.groom_name }}
                <span class="heart">❤</span>
                {{ invitation.bride_name }}
              </div>
              <div class="invitation-card-slug" @click="copyLink(invitation.slug)" style="cursor:pointer" title="Klik untuk salin link">
                <span class="material-symbols-rounded" style="font-size:14px;vertical-align:-2px">link</span>
                {{ getInvitationDisplayUrl(invitation.slug) }}
              </div>
              <div class="invitation-card-meta">
                <span title="Tema Undangan"><span class="material-symbols-rounded" style="font-size:14px;vertical-align:-2px">palette</span> <strong style="text-transform: capitalize">{{ invitation.theme || 'Elegant' }}</strong></span>
                <span><span class="material-symbols-rounded" style="font-size:14px;vertical-align:-2px">photo_camera</span> {{ invitation.photo_count || 0 }} foto</span>
                <span><span class="material-symbols-rounded" style="font-size:14px;vertical-align:-2px">mail</span> {{ invitation.rsvp_count || 0 }} RSVP</span>
                
                <span v-if="invitation.payment_status === 'trial'" style="color: #d97706; font-weight: 500; background: #fffbeb; padding: 2px 6px; border-radius: 4px;">
                  <span class="material-symbols-rounded" style="font-size:14px;vertical-align:-2px">incomplete_circle</span> 
                  Sisa {{ Math.max(0, (invitation.max_views || 25) - (invitation.view_count || 0)) }} akses
                </span>
                <span v-else>
                  <span class="material-symbols-rounded" style="font-size:14px;vertical-align:-2px">visibility</span> {{ invitation.view_count || 0 }} views
                </span>

                <span><span class="material-symbols-rounded" style="font-size:14px;vertical-align:-2px">calendar_today</span> {{ formatDate(invitation.created_at) }}</span>
              </div>
              <div class="invitation-card-actions">
                <!-- Upgrade Button for Trial -->
                <router-link
                  v-if="invitation.payment_status === 'trial'"
                  :to="`/dashboard/payment?invitation_id=${invitation.id}`"
                  class="btn btn-upgrade btn-sm"
                >
                  <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">bolt</span> Upgrade
                </router-link>
                <div class="invitation-card-actions-row">
                  <a
                    :href="getInvitationUrl(invitation.slug)"
                    target="_blank"
                    class="btn btn-outline btn-sm"
                  >
                    <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">visibility</span> Preview
                  </a>
                  <router-link
                    :to="`/dashboard/edit/${invitation.id}`"
                    class="btn btn-outline btn-sm"
                  >
                    <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">edit</span> Edit
                  </router-link>
                  <router-link
                    :to="`/dashboard/guests/${invitation.id}`"
                    class="btn btn-primary btn-sm"
                  >
                    <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">group</span> Tamu
                  </router-link>
                  <router-link
                    :to="`/dashboard/wishes/${invitation.id}`"
                    class="btn btn-outline btn-sm"
                  >
                    <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">forum</span> Ucapan
                  </router-link>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="confirmDelete(invitation)"
                  >
                    <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">delete</span> Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    <!-- Delete Modal -->
    <div
      v-if="deleteTarget"
      class="modal-overlay"
      @click.self="deleteTarget = null"
    >
      <div class="modal-content">
        <div class="modal-title">
          <span class="material-symbols-rounded" style="font-size:24px;color:var(--admin-danger);vertical-align:-4px">warning</span>
          Hapus Undangan?
        </div>
        <div class="modal-text">
          Undangan
          <strong>{{ deleteTarget.groom_name }} & {{ deleteTarget.bride_name }}</strong>
          akan dihapus secara permanen.
        </div>
        <div class="modal-actions">
          <button class="btn btn-outline" @click="deleteTarget = null">Batal</button>
          <button class="btn btn-danger" @click="handleDelete">Ya, Hapus</button>
        </div>
      </div>
    </div>

    <!-- Post-Create Guide Modal -->
    <div v-if="showPostCreateGuide" class="guide-modal-overlay" @click.self="dismissPostCreateGuide">
      <div class="guide-modal">
        <button class="guide-modal-close" @click="dismissPostCreateGuide" title="Tutup panduan">
          <Icon icon="lucide:x" />
        </button>
        <div class="guide-modal-header">
          <div class="guide-modal-icon">
            <Icon icon="lucide:party-popper" style="font-size: 22px;" />
          </div>
          <h2>Undangan Berhasil Dibuat!</h2>
          <p>Berikut panduan tombol yang tersedia di kartu undangan Anda</p>
        </div>
        <div class="guide-modal-steps">
          <div class="guide-step-card">
            <div class="guide-step-icon" style="background: linear-gradient(135deg, #eff6ff, #dbeafe); color: #3b82f6;"><Icon icon="lucide:eye" style="font-size: 16px;" /></div>
            <div class="guide-step-body">
              <strong>Preview</strong>
              <span>Lihat tampilan undangan Anda seperti yang dilihat tamu.</span>
            </div>
          </div>
          <div class="guide-step-card">
            <div class="guide-step-icon" style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); color: #16a34a;"><Icon icon="lucide:pencil" style="font-size: 16px;" /></div>
            <div class="guide-step-body">
              <strong>Edit</strong>
              <span>Ubah data mempelai, tanggal, foto, dan semua isi undangan.</span>
            </div>
          </div>
          <div class="guide-step-card">
            <div class="guide-step-icon" style="background: linear-gradient(135deg, #eef2ff, #e0e7ff); color: #6366f1;"><Icon icon="lucide:users" style="font-size: 16px;" /></div>
            <div class="guide-step-body">
              <strong>Tamu</strong>
              <span>Kelola daftar tamu undangan dan pantau siapa yang sudah RSVP.</span>
            </div>
          </div>
          <div class="guide-step-card">
            <div class="guide-step-icon" style="background: linear-gradient(135deg, #fdf4ff, #fae8ff); color: #a855f7;"><Icon icon="lucide:message-square" style="font-size: 16px;" /></div>
            <div class="guide-step-body">
              <strong>Ucapan</strong>
              <span>Lihat dan kelola ucapan & doa dari tamu yang hadir.</span>
            </div>
          </div>
          <div class="guide-step-card">
            <div class="guide-step-icon" style="background: linear-gradient(135deg, #fef2f2, #fecaca); color: #ef4444;"><Icon icon="lucide:trash-2" style="font-size: 16px;" /></div>
            <div class="guide-step-body">
              <strong>Hapus</strong>
              <span>Hapus undangan secara permanen beserta semua datanya.</span>
            </div>
          </div>
          <div class="guide-step-card">
            <div class="guide-step-icon" style="background: linear-gradient(135deg, #fffbeb, #fef3c7); color: #d97706;"><Icon icon="lucide:zap" style="font-size: 16px;" /></div>
            <div class="guide-step-body">
              <strong>Upgrade</strong>
              <span>Tingkatkan ke Premium agar tamu tak terbatas dan banner undangan dihilangkan.</span>
            </div>
          </div>
        </div>
        <div class="guide-modal-footer">
          <div class="guide-modal-tip">
            <Icon icon="lucide:lightbulb" style="color: #f59e0b; flex-shrink: 0;" />
            <span>Klik <strong>link URL</strong> di kartu undangan untuk langsung menyalin link. Kirimkan ke tamu lewat WhatsApp!</span>
          </div>
          <button class="btn btn-primary" @click="dismissPostCreateGuide" style="width: 100%;">
            <Icon icon="lucide:check-circle-2" style="font-size: 16px;" /> Oke, Saya Paham!
          </button>
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
import { useRouter, useRoute } from "vue-router";
import { useInvitationStore } from "@/stores/invitation";
import { useAuthStore } from "@/stores/auth";
import type { Invitation } from "@/types/invitation";
import { Icon } from "@iconify/vue";
import { resolveAssetUrl } from "@/utils/url";
import AppSkeleton from "@/components/ui/AppSkeleton.vue";
import AdminLayout from "@/components/admin/AdminLayout.vue";

const router = useRouter();
const route = useRoute();
const store = useInvitationStore();
const authStore = useAuthStore();
const searchQuery = ref("");
const deleteTarget = ref<Invitation | null>(null);
const toast = ref<{ type: string; message: string } | null>(null);
const apiBase = import.meta.env.VITE_API_URL || "";

// --- Post-Create Guide ---
const showPostCreateGuide = ref(false);

function dismissPostCreateGuide() {
  showPostCreateGuide.value = false;
  // Clean URL params
  router.replace({ path: '/dashboard' });
}

const invitations = computed(() => store.invitations);

const hasReachedLimit = computed(() => {
  if (!authStore.user) return false;
  if (authStore.user.role === 'admin') return false;
  return invitations.value.length >= authStore.user.max_invitations;
});

const hasTrialInvitation = computed(() => {
  return invitations.value.some(i => i.payment_status === 'trial');
});

const firstTrialInvitationId = computed(() => {
  const trialInv = invitations.value.find(i => i.payment_status === 'trial');
  return trialInv ? trialInv.id : null;
});

const filteredInvitations = computed(() => {
  if (!searchQuery.value) return invitations.value;
  const query = searchQuery.value.toLowerCase();
  return invitations.value.filter(
    (i) =>
      i.groom_name.toLowerCase().includes(query) ||
      i.bride_name.toLowerCase().includes(query) ||
      i.slug.toLowerCase().includes(query),
  );
});

const totalPhotos = computed(() =>
  invitations.value.reduce((sum, i) => sum + (i.photo_count || 0), 0),
);

const totalRsvps = computed(() =>
  invitations.value.reduce((sum, i) => sum + (i.rsvp_count || 0), 0),
);

const totalViews = computed(() =>
  invitations.value.reduce((sum, i) => sum + (i.view_count || 0), 0),
);

function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getInvitationUrl(slug: string) {
  const host = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : "";
  const protocol = window.location.protocol;

  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".vercel.app")
  ) {
    return `${protocol}//${host}${port}/invitation/${slug}`;
  }
  const mainDomain = host.replace("www.", "").replace("admin.", "");
  return `${protocol}//${slug}.${mainDomain}${port}`;
}

function getInvitationDisplayUrl(slug: string) {
  const host = window.location.hostname;
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".vercel.app")
  ) {
    return `/invitation/${slug}`;
  }
  const mainDomain = host.replace("www.", "").replace("admin.", "");
  return `${slug}.${mainDomain}`;
}

async function copyLink(slug: string) {
  const url = getInvitationUrl(slug);
  try {
    await navigator.clipboard.writeText(url);
    showToast('success', 'Link berhasil disalin!');
  } catch {
    showToast('error', 'Gagal menyalin link');
  }
}

function confirmDelete(invitation: Invitation) {
  deleteTarget.value = invitation;
}

async function handleDelete() {
  if (!deleteTarget.value) return;
  try {
    await store.deleteInvitation(deleteTarget.value.id);
    showToast("success", "Undangan berhasil dihapus");
  } catch {
    showToast("error", "Gagal menghapus undangan");
  }
  deleteTarget.value = null;
}

function showToast(type: string, message: string) {
  toast.value = { type, message };
  setTimeout(() => {
    toast.value = null;
  }, 3000);
}

onMounted(async () => {
  await store.fetchInvitations();

  // Show guide popup if user just created an invitation
  if (route.query.just_created === '1') {
    showPostCreateGuide.value = true;
  }

  // Auto-verify Mayar payment if redirected back with licenseCode, transaction_id, or at least invitation_id
  const urlParams = new URLSearchParams(window.location.search);
  const licenseCode = urlParams.get("licenseCode");
  const transactionId = urlParams.get("transaction_id") || urlParams.get("id");
  const fallbackInvitationId = urlParams.get("invitation_id");
  
  const paymentIdentifier = licenseCode || transactionId || fallbackInvitationId;
  
  if (paymentIdentifier) {
    const productId = urlParams.get("productId");
    const email = urlParams.get("email");
    
    console.log("[Payment] Detected payment redirect, attempting verification...");
    
    try {
      const headers = await authStore.getAuthHeaders();
      const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api';
      const res = await fetch(`${API_BASE}/payment/verify-license`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ 
          licenseCode, 
          transaction_id: transactionId, 
          invitation_id: fallbackInvitationId,
          productId, 
          email 
        }),
      });
      const data = await res.json();
      
      if (res.ok && (data.status === "ok" || data.status === "already_paid")) {
        showToast("success", "Pembayaran berhasil diverifikasi! Undangan sudah aktif.");
        // Refresh invitations to show updated status
        await store.fetchInvitations();
      } else {
        console.warn("[Payment] Verify failed:", data);
        showToast("error", data.error || "Gagal verifikasi pembayaran.");
      }
    } catch (err) {
      console.error("[Payment] Verify error:", err);
    }
    
    // Clean URL params
    window.history.replaceState({}, "", window.location.pathname);
  }
});
</script>

<style scoped>
/* ===== Post-Create Guide Modal ===== */
.guide-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.guide-modal {
  position: relative;
  background: white;
  border-radius: 20px;
  max-width: 560px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 32px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.18);
  animation: slideUp 0.35s ease-out;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.guide-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  transition: all 0.2s;
  font-size: 18px;
}
.guide-modal-close:hover {
  background: #f1f5f9;
  color: #475569;
}
.guide-modal-header {
  text-align: center;
  margin-bottom: 24px;
}
.guide-modal-icon {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  color: #16a34a;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
}
.guide-modal-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 6px;
}
.guide-modal-header p {
  font-size: 13.5px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}
.guide-modal-steps {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
}
@media (max-width: 520px) {
  .guide-modal {
    padding: 24px 20px;
    border-radius: 16px;
  }
  .guide-modal-steps {
    grid-template-columns: 1fr;
  }
}
.guide-step-card {
  display: flex;
  gap: 12px;
  padding: 14px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}
.guide-step-card:hover {
  border-color: #93c5fd;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.08);
  transform: translateY(-1px);
}
.guide-step-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.guide-step-body {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.guide-step-body strong {
  font-size: 13px;
  color: #1e293b;
}
.guide-step-body span {
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
}
.guide-modal-footer {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.guide-modal-tip {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12.5px;
  color: #64748b;
  background: #fffbeb;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #fde68a;
  line-height: 1.5;
}
</style>

