<template>
  <div class="admin-page-simple">
    <header class="simple-topbar">
      <router-link to="/dashboard" class="simple-topbar-brand">
        <div class="sidebar-brand-icon" style="width:32px;height:32px;border-radius:10px;overflow:hidden;background:transparent">
          <img src="/images/logo.webp" alt="Logo" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <span class="sidebar-brand-text" style="font-size:17px">Mengundang<span>Anda</span></span>
      </router-link>
      <nav class="simple-topbar-nav">
        <router-link to="/dashboard" class="btn btn-outline btn-sm">
          <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">arrow_back</span>
          Kembali ke Dashboard
        </router-link>
      </nav>
    </header>

    <div class="simple-container">
      <div class="section-header" style="margin-bottom: 24px;">
        <div>
          <h1 class="admin-page-title">Kelola Pustaka Lagu</h1>
          <p class="admin-page-subtitle" style="margin-bottom: 0;">
            Kelola koleksi musik siap pakai untuk form pembuatan undangan (CRUD).
          </p>
        </div>
        <button class="btn btn-primary btn-lg" @click="openCreateModal">
          <Icon icon="lucide:plus" style="margin-right:4px; font-size:18px;" /> Tambah Lagu
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" style="text-align: center; padding: 60px 0;">
        <div class="loading-spinner"></div>
        <p style="margin-top: 12px; color: var(--admin-text-secondary);">Memuat data pustaka lagu...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="error-banner">
        {{ error }}
      </div>

      <!-- Music Table -->
      <div v-else class="admin-card" style="padding: 0; overflow: hidden; border: 1px solid var(--admin-border); border-radius: 12px; background: var(--admin-surface-solid);">
        <!-- Desktop Table -->
        <div class="desktop-only-table" style="overflow-x: auto;">
          <table class="users-table">
            <thead>
              <tr>
                <th>Judul Lagu</th>
                <th>Artis</th>
                <th>Preview Audio</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="musics.length === 0">
                <td colspan="4" style="text-align: center; padding: 32px; color: var(--admin-text-secondary);">
                  <Icon icon="lucide:music" style="font-size: 32px; opacity: 0.5; margin-bottom: 8px; display: block; margin-left: auto; margin-right: auto;" />
                  Belum ada lagu di pustaka.
                </td>
              </tr>
              <tr v-for="music in musics" :key="music.id">
                <td><strong>{{ music.title }}</strong></td>
                <td>{{ music.artist || '-' }}</td>
                <td>
                  <audio controls preload="none" style="height: 32px; width: 220px;">
                    <source :src="music.url" type="audio/mpeg" />
                  </audio>
                </td>
                <td>
                  <div class="action-btns">
                    <button class="btn btn-outline btn-sm action-icon-btn" @click="openEditModal(music)">
                      <Icon icon="lucide:edit" /> Edit
                    </button>
                    <button class="btn btn-danger btn-sm action-icon-btn" @click="confirmDelete(music)">
                      <Icon icon="lucide:trash-2" /> Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="mobile-only-cards">
          <div v-if="musics.length === 0" style="text-align: center; padding: 32px; color: var(--admin-text-secondary);">
            <Icon icon="lucide:music" style="font-size: 32px; opacity: 0.5; margin-bottom: 8px; display: block; margin-left: auto; margin-right: auto;" />
            Belum ada lagu di pustaka.
          </div>
          <div v-for="music in musics" :key="music.id" class="mobile-guest-card">
            <div class="mgc-header" style="flex-direction: column; align-items: flex-start; gap: 4px;">
              <h4 class="mgc-name">{{ music.title }}</h4>
              <p class="mgc-phone">Artis: {{ music.artist || '-' }}</p>
            </div>
            <div style="margin: 8px 0;">
              <audio controls preload="none" style="height: 36px; width: 100%;">
                <source :src="music.url" type="audio/mpeg" />
              </audio>
            </div>
            <div class="mgc-actions">
              <button class="btn btn-outline btn-sm" style="flex: 1; justify-content: center;" @click="openEditModal(music)">
                <Icon icon="lucide:edit" style="margin-right:2px; font-size:16px;" /> Edit
              </button>
              <button class="btn btn-danger btn-sm" style="flex: 1; justify-content: center;" @click="confirmDelete(music)">
                <Icon icon="lucide:trash-2" style="margin-right:2px; font-size:16px;" /> Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content" style="max-width: 480px;">
        <div class="modal-title">{{ isEditing ? 'Edit Lagu' : 'Tambah Lagu Baru' }}</div>
        <form @submit.prevent="handleSubmit" class="modal-form">
          <div v-if="formError" class="login-error" style="margin-bottom: 12px;">{{ formError }}</div>

          <div class="form-group">
            <label>Judul Lagu *</label>
            <input v-model="form.title" type="text" placeholder="Contoh: A Thousand Years" required :disabled="formLoading" />
          </div>

          <div class="form-group">
            <label>Nama Artis</label>
            <input v-model="form.artist" type="text" placeholder="Contoh: Christina Perri" :disabled="formLoading" />
          </div>

          <div class="form-group">
            <label>URL Musik (MP3 link di bucket) *</label>
            <input v-model="form.url" type="url" placeholder="https://music.mengundanganda.com/..." required :disabled="formLoading" />
          </div>

          <div class="modal-actions mt-2" style="display:flex; justify-content:flex-end; gap:8px;">
            <button type="button" class="btn btn-outline" @click="showModal = false">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="formLoading">
              {{ formLoading ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambahkan Lagu') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
      <div class="modal-content">
        <div class="modal-title">Hapus Lagu?</div>
        <div class="modal-text">
          Lagu <strong>{{ deleteTarget.title }}</strong> akan dihapus permanen dari pustaka. (Tidak menghapus file asli di R2 Cloudflare).
        </div>
        <div class="modal-actions" style="display:flex; justify-content:flex-end; gap:8px; margin-top:24px;">
          <button class="btn btn-outline" @click="deleteTarget = null">Batal</button>
          <button class="btn btn-danger" @click="handleDelete" :disabled="formLoading">Ya, Hapus</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toast" :class="['toast', `toast-${toast.type}`, 'flex', 'items-center', 'gap-2']">
      <Icon :icon="toast.type === 'error' ? 'lucide:x-circle' : 'lucide:check-circle-2'" style="font-size: 18px; flex-shrink: 0;" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { Icon } from '@iconify/vue';

const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api';

interface MusicItem {
  id: string;
  title: string;
  artist: string;
  url: string;
  created_at?: string;
}

const authStore = useAuthStore();
const router = useRouter();

const musics = ref<MusicItem[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const toast = ref<{ type: string; message: string } | null>(null);

// Modal state
const showModal = ref(false);
const isEditing = ref(false);
const editingId = ref<string | null>(null);
const formLoading = ref(false);
const formError = ref<string | null>(null);

const form = ref({
  title: '',
  artist: '',
  url: ''
});

const deleteTarget = ref<MusicItem | null>(null);

async function fetchMusics() {
  loading.value = true;
  error.value = null;
  try {
    const headers = await authStore.getAuthHeaders();
    const res = await fetch(`${API_BASE}/music`, { headers });
    if (!res.ok) throw new Error('Gagal memuat pustaka lagu');
    musics.value = await res.json();
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

function openCreateModal() {
  isEditing.value = false;
  editingId.value = null;
  formError.value = null;
  form.value = { title: '', artist: '', url: '' };
  showModal.value = true;
}

function openEditModal(music: MusicItem) {
  isEditing.value = true;
  editingId.value = music.id;
  formError.value = null;
  form.value = {
    title: music.title,
    artist: music.artist || '',
    url: music.url
  };
  showModal.value = true;
}

async function handleSubmit() {
  formLoading.value = true;
  formError.value = null;
  try {
    const url = isEditing.value
      ? `${API_BASE}/music/${editingId.value}`
      : `${API_BASE}/music`;
    const method = isEditing.value ? 'PUT' : 'POST';

    const headers = await authStore.getAuthHeaders();
    headers['Content-Type'] = 'application/json';

    const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(form.value)
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal menyimpan lagu');

    showModal.value = false;
    showToast('success', isEditing.value ? 'Lagu berhasil diupdate' : 'Lagu berhasil ditambahkan');
    await fetchMusics();
  } catch (e: any) {
    formError.value = e.message;
  } finally {
    formLoading.value = false;
  }
}

function confirmDelete(music: MusicItem) {
  deleteTarget.value = music;
}

async function handleDelete() {
  if (!deleteTarget.value) return;
  formLoading.value = true;
  try {
    const headers = await authStore.getAuthHeaders();
    const res = await fetch(`${API_BASE}/music/${deleteTarget.value.id}`, {
      method: 'DELETE',
      headers
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Gagal menghapus lagu');
    }
    showToast('success', 'Lagu berhasil dihapus');
    await fetchMusics();
  } catch (e: any) {
    showToast('error', e.message);
  } finally {
    formLoading.value = false;
    deleteTarget.value = null;
  }
}

function showToast(type: string, message: string) {
  toast.value = { type, message };
  setTimeout(() => { toast.value = null; }, 3000);
}

onMounted(() => {
  if (!authStore.isAdmin) {
    router.push('/dashboard');
    return;
  }
  fetchMusics();
});
</script>

<style scoped>
/* Resusing the exact styles from UserManagementView for consistency */
.users-table {
  width: 100%;
  border-collapse: collapse;
}
.users-table th,
.users-table td {
  padding: 14px 18px;
  text-align: left;
  border-bottom: 1px solid var(--admin-border);
  white-space: nowrap;
}
.users-table th {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--admin-text-secondary);
  background: var(--admin-bg);
}
.users-table tbody tr:hover {
  background: var(--admin-surface-hover);
}
.action-btns {
  display: flex;
  gap: 8px;
}
.action-icon-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.error-banner {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #dc2626;
  padding: 16px 20px;
  border-radius: 10px;
  text-align: center;
}
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.modal-form .form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.modal-form label {
  font-size: 13px;
  font-weight: 500;
  color: var(--admin-text-secondary);
}
.modal-form input {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--admin-border);
  background: var(--admin-bg);
  color: var(--admin-text);
  font-size: 14px;
  outline: none;
}
.modal-form input:focus {
  border-color: var(--admin-primary);
  box-shadow: 0 0 0 3px var(--admin-primary-glow);
}
.login-error {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #dc2626;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  text-align: center;
}

/* Visibility Control */
.mobile-only-cards {
  display: none;
}
.desktop-only-table {
  display: block;
}

@media (max-width: 768px) {
  /* Tukar tampilan table dan card */
  .desktop-only-table { display: none; }
  .mobile-only-cards {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    background: var(--admin-bg);
  }

  /* Desain Kartu Mobile */
  .mobile-guest-card {
    background: white;
    border: 1px solid var(--admin-border);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  }
  .mgc-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .mgc-name {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: var(--admin-text);
  }
  .mgc-phone {
    margin: 0;
    font-size: 13px;
    color: var(--admin-text-secondary);
  }
  .mgc-actions {
    display: flex;
    gap: 8px;
    width: 100%;
  }
}
</style>
