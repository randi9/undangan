<template>
  <div class="admin-layout">
    <header class="admin-header">
      <router-link to="/" class="admin-logo">
        <div class="logo-icon">💒</div>
        <span
          >Undangan<span style="color: var(--admin-primary)">Gen</span></span
        >
      </router-link>
      <nav class="admin-nav">
        <router-link to="/">Dashboard</router-link>
        <router-link v-if="!hasReachedLimit" to="/select-template">+ Buat Undangan</router-link>
        <router-link v-if="authStore.isAdmin" to="/users">👥 User</router-link>
        <span class="nav-user-info" v-if="authStore.user">
          <span class="user-badge" :class="authStore.user.role">{{ authStore.user.role }}</span>
          {{ authStore.user.username }}
        </span>
        <button class="btn-logout" @click="handleLogout" title="Logout">🚪</button>
      </nav>
    </header>

    <div class="admin-container">
      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ invitations.length }}</div>
          <div class="stat-label">Total Undangan</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ totalPhotos }}</div>
          <div class="stat-label">Total Foto</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ totalRsvps }}</div>
          <div class="stat-label">Total RSVP</div>
        </div>
      </div>

      <!-- Header & Search -->
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        "
      >
        <div>
          <h1 class="admin-page-title">Daftar Undangan</h1>
          <p class="admin-page-subtitle" style="margin-bottom: 0">
            Kelola semua undangan pernikahan yang telah dibuat
          </p>
        </div>
        <router-link v-if="!hasReachedLimit" to="/select-template" class="btn btn-primary btn-lg">
          ✨ Buat Undangan Baru
        </router-link>
        <div v-else-if="hasReachedLimit" class="limit-reached-block">
          <button class="btn btn-primary btn-lg btn-disabled" disabled>
            🚫 Buat Undangan Baru
          </button>
          <div class="limit-warning">
            ⚠️ Limit tercapai! Anda sudah membuat {{ invitations.length }}/{{ authStore.user?.max_invitations }} undangan.
          </div>
        </div>
        <div v-if="authStore.user && !authStore.isAdmin && !hasReachedLimit" class="invitation-limit-info">
          📊 {{ invitations.length }} / {{ authStore.user.max_invitations }} undangan
        </div>
      </div>

      <div class="search-bar">
        <span>🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari undangan berdasarkan nama..."
        />
      </div>

      <!-- Loading -->
      <div v-if="store.loading" style="text-align: center; padding: 60px 0">
        <div class="loading-spinner"></div>
        <p style="margin-top: 12px; color: var(--admin-text-secondary)">
          Memuat data...
        </p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="filteredInvitations.length === 0 && !searchQuery"
        class="empty-state"
      >
        <div class="empty-icon">💌</div>
        <div class="empty-title">Belum Ada Undangan</div>
        <div class="empty-text">
          Mulai buat undangan pernikahan pertama Anda dengan klik tombol di
          bawah
        </div>
        <router-link v-if="!hasReachedLimit" to="/select-template" class="btn btn-primary btn-lg">
          ✨ Buat Undangan Pertama
        </router-link>
        <div v-else class="limit-warning" style="margin-top: 12px">
          ⚠️ Limit tercapai! Hubungi admin untuk menambah kuota.
        </div>
      </div>

      <!-- Search Empty -->
      <div
        v-else-if="filteredInvitations.length === 0 && searchQuery"
        class="empty-state"
      >
        <div class="empty-icon">🔍</div>
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
          <img
            v-if="invitation.cover_photo"
            :src="resolveAssetUrl(invitation.cover_photo, apiBase)"
            :alt="invitation.groom_name + ' & ' + invitation.bride_name"
            class="invitation-card-cover"
          />
          <div
            v-else
            class="invitation-card-cover"
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 48px;
              background: linear-gradient(135deg, #1a1a24, #2a2a3a);
            "
          >
            💒
          </div>

          <div class="invitation-card-body">
            <div class="invitation-card-names">
              {{ invitation.groom_name }}
              <span class="heart">❤</span>
              {{ invitation.bride_name }}
            </div>
            <div class="invitation-card-slug">
              🔗 {{ getInvitationDisplayUrl(invitation.slug) }}
            </div>
            <div class="invitation-card-meta">
              <span>📸 {{ invitation.photo_count || 0 }} foto</span>
              <span>💌 {{ invitation.rsvp_count || 0 }} RSVP</span>
              <span>📅 {{ formatDate(invitation.created_at) }}</span>
            </div>
            <div class="invitation-card-actions">
              <a
                :href="getInvitationUrl(invitation.slug)"
                target="_blank"
                class="btn btn-outline btn-sm"
              >
                👁 Preview
              </a>
              <router-link
                :to="`/edit/${invitation.id}`"
                class="btn btn-outline btn-sm"
              >
                ✏️ Edit
              </router-link>
              <button
                class="btn btn-danger btn-sm"
                @click="confirmDelete(invitation)"
              >
                🗑 Hapus
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
        <div class="modal-title">Hapus Undangan?</div>
        <div class="modal-text">
          Undangan
          <strong
            >{{ deleteTarget.groom_name }} &
            {{ deleteTarget.bride_name }}</strong
          >
          akan dihapus secara permanen.
        </div>
        <div class="modal-actions">
          <button class="btn btn-outline" @click="deleteTarget = null">
            Batal
          </button>
          <button class="btn btn-danger" @click="handleDelete">
            Ya, Hapus
          </button>
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
import { resolveAssetUrl } from "@/utils/url";

const router = useRouter();
const store = useInvitationStore();
const authStore = useAuthStore();
const searchQuery = ref("");
const deleteTarget = ref<Invitation | null>(null);
const toast = ref<{ type: string; message: string } | null>(null);
const apiBase = import.meta.env.VITE_API_URL || "";

function handleLogout() {
  authStore.logout();
  router.push('/login');
}

const invitations = computed(() => store.invitations);

const hasReachedLimit = computed(() => {
  if (!authStore.user) return false;
  if (authStore.user.role === 'admin') return false;
  return invitations.value.length >= authStore.user.max_invitations;
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

onMounted(() => {
  store.fetchInvitations();
});
</script>
