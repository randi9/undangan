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
        <router-link to="/dashboard" class="sidebar-link" exact>
          <span class="material-symbols-rounded">dashboard</span>
          Dashboard
        </router-link>
        <router-link to="/dashboard/themes" class="sidebar-link">
          <span class="material-symbols-rounded">palette</span>
          Tema
        </router-link>
        <router-link v-if="!hasReachedLimit" to="/dashboard/create" class="sidebar-link">
          <span class="material-symbols-rounded">add_circle</span>
          Buat Undangan
        </router-link>
        <router-link v-if="hasTrialInvitation" :to="`/dashboard/payment?invitation_id=${firstTrialInvitationId}`" class="sidebar-link">
          <span class="material-symbols-rounded">payments</span>
          Pembayaran
        </router-link>
        <router-link v-if="authStore.isAdmin" to="/dashboard/users" class="sidebar-link">
          <span class="material-symbols-rounded">group</span>
          Kelola User
        </router-link>
        <router-link v-if="authStore.isAdmin" to="/dashboard/music" class="sidebar-link">
          <span class="material-symbols-rounded">library_music</span>
          Pustaka Lagu
        </router-link>
        <router-link v-if="authStore.isAdmin" to="/dashboard/vouchers" class="sidebar-link">
          <span class="material-symbols-rounded">confirmation_number</span>
          Voucher
        </router-link>
        <!-- Mobile logout is handled natively by UserButton popover -->
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

        <div v-if="authStore.isAdmin || (authStore.user?.max_invitations ?? 0) > 1" class="search-bar">
          <span class="material-symbols-rounded" style="font-size:20px">search</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari undangan berdasarkan nama..."
          />
        </div>
        <div class="topbar-actions">
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
        </div>
      </header>

      <div class="admin-container">
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
              <!-- Trial/Paid Badge -->
              <div v-if="invitation.payment_status === 'trial'" class="payment-status-badge trial-badge-indicator">
                <span class="material-symbols-rounded" style="font-size:14px;vertical-align:-2px">hourglass_top</span>
                TRIAL
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
                <span><span class="material-symbols-rounded" style="font-size:14px;vertical-align:-2px">visibility</span> {{ invitation.view_count || 0 }} views</span>
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

    <!-- Toast -->
    <div v-if="toast" :class="['toast', `toast-${toast.type}`]">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useInvitationStore } from "@/stores/invitation";
import { useAuthStore } from "@/stores/auth";
import type { Invitation } from "@/types/invitation";
import { UserButton } from "@clerk/vue";
import { Icon } from "@iconify/vue";
import { resolveAssetUrl } from "@/utils/url";
import AppSkeleton from "@/components/ui/AppSkeleton.vue";

const router = useRouter();
const store = useInvitationStore();
const authStore = useAuthStore();
const searchQuery = ref("");
const deleteTarget = ref<Invitation | null>(null);
const toast = ref<{ type: string; message: string } | null>(null);
const apiBase = import.meta.env.VITE_API_URL || "";

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
    showToast('success', '✅ Link berhasil disalin!');
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
        showToast("success", "🎉 Pembayaran berhasil diverifikasi! Undangan sudah aktif.");
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
