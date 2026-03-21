<template>
  <div class="admin-layout">
    <header class="admin-header">
      <router-link to="/" class="admin-logo">
        <div class="logo-icon">💒</div>
        <span>Undangan<span style="color: var(--admin-primary)">Gen</span></span>
      </router-link>
      <nav class="admin-nav">
        <router-link to="/">Dashboard</router-link>
        <router-link to="/select-template">+ Buat Undangan</router-link>
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
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
        <div>
          <h1 class="admin-page-title">Daftar Undangan</h1>
          <p class="admin-page-subtitle" style="margin-bottom: 0;">Kelola semua undangan pernikahan yang telah dibuat</p>
        </div>
        <router-link to="/select-template" class="btn btn-primary btn-lg">
          ✨ Buat Undangan Baru
        </router-link>
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
      <div v-if="store.loading" style="text-align: center; padding: 60px 0;">
        <div class="loading-spinner"></div>
        <p style="margin-top: 12px; color: var(--admin-text-secondary);">Memuat data...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredInvitations.length === 0 && !searchQuery" class="empty-state">
        <div class="empty-icon">💌</div>
        <div class="empty-title">Belum Ada Undangan</div>
        <div class="empty-text">Mulai buat undangan pernikahan pertama Anda dengan klik tombol di bawah</div>
        <router-link to="/select-template" class="btn btn-primary btn-lg">
          ✨ Buat Undangan Pertama
        </router-link>
      </div>

      <!-- Search Empty -->
      <div v-else-if="filteredInvitations.length === 0 && searchQuery" class="empty-state">
        <div class="empty-icon">🔍</div>
        <div class="empty-title">Tidak Ditemukan</div>
        <div class="empty-text">Tidak ada undangan yang cocok dengan pencarian "{{ searchQuery }}"</div>
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
            :src="apiBase + invitation.cover_photo"
            :alt="invitation.groom_name + ' & ' + invitation.bride_name"
            class="invitation-card-cover"
          />
          <div
            v-else
            class="invitation-card-cover"
            style="display: flex; align-items: center; justify-content: center; font-size: 48px; background: linear-gradient(135deg, #1a1a24, #2a2a3a);"
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
              <a :href="getInvitationUrl(invitation.slug)" target="_blank" class="btn btn-outline btn-sm">
                👁 Preview
              </a>
              <router-link :to="`/edit/${invitation.id}`" class="btn btn-outline btn-sm">
                ✏️ Edit
              </router-link>
              <button class="btn btn-danger btn-sm" @click="confirmDelete(invitation)">
                🗑 Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
      <div class="modal-content">
        <div class="modal-title">Hapus Undangan?</div>
        <div class="modal-text">
          Undangan <strong>{{ deleteTarget.groom_name }} & {{ deleteTarget.bride_name }}</strong>
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
import { ref, computed, onMounted } from 'vue'
import { useInvitationStore } from '@/stores/invitation'
import type { Invitation } from '@/types/invitation'

const store = useInvitationStore()
const searchQuery = ref('')
const deleteTarget = ref<Invitation | null>(null)
const toast = ref<{ type: string; message: string } | null>(null)
const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const invitations = computed(() => store.invitations)

const filteredInvitations = computed(() => {
  if (!searchQuery.value) return invitations.value
  const query = searchQuery.value.toLowerCase()
  return invitations.value.filter(i =>
    i.groom_name.toLowerCase().includes(query) ||
    i.bride_name.toLowerCase().includes(query) ||
    i.slug.toLowerCase().includes(query)
  )
})

const totalPhotos = computed(() =>
  invitations.value.reduce((sum, i) => sum + (i.photo_count || 0), 0)
)

const totalRsvps = computed(() =>
  invitations.value.reduce((sum, i) => sum + (i.rsvp_count || 0), 0)
)

function formatDate(dateStr?: string) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

function getInvitationUrl(slug: string) {
  const host = window.location.hostname
  const port = window.location.port ? `:${window.location.port}` : ''
  const protocol = window.location.protocol
  
  if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.vercel.app')) {
    return `${protocol}//${host}${port}/invitation/${slug}`
  }
  const mainDomain = host.replace('www.', '').replace('admin.', '')
  return `${protocol}//${slug}.${mainDomain}${port}`
}

function getInvitationDisplayUrl(slug: string) {
  const host = window.location.hostname
  if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.vercel.app')) {
    return `/invitation/${slug}`
  }
  const mainDomain = host.replace('www.', '').replace('admin.', '')
  return `${slug}.${mainDomain}`
}

function confirmDelete(invitation: Invitation) {
  deleteTarget.value = invitation
}

async function handleDelete() {
  if (!deleteTarget.value) return
  try {
    await store.deleteInvitation(deleteTarget.value.id)
    showToast('success', 'Undangan berhasil dihapus')
  } catch {
    showToast('error', 'Gagal menghapus undangan')
  }
  deleteTarget.value = null
}

function showToast(type: string, message: string) {
  toast.value = { type, message }
  setTimeout(() => { toast.value = null }, 3000)
}

onMounted(() => {
  store.fetchInvitations()
})
</script>
