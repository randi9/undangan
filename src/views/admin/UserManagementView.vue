<template>
  <div class="admin-page-simple">
    <header class="simple-topbar">
      <router-link to="/" class="simple-topbar-brand">
        <div class="sidebar-brand-icon" style="width:32px;height:32px;border-radius:10px;overflow:hidden;background:transparent">
          <img src="/images/logo.webp" alt="Logo" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <span class="sidebar-brand-text" style="font-size:17px">Undangan<span>Gen</span></span>
      </router-link>
      <nav class="simple-topbar-nav">
        <router-link to="/" class="btn btn-outline btn-sm">
          <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">arrow_back</span>
          Kembali ke Dashboard
        </router-link>
      </nav>
    </header>

    <div class="simple-container">
      <div class="section-header" style="margin-bottom: 24px;">
        <div>
          <h1 class="admin-page-title">Kelola User</h1>
          <p class="admin-page-subtitle" style="margin-bottom: 0;">
            Tambah, edit, dan hapus user yang dapat mengakses dashboard
          </p>
        </div>
        <button class="btn btn-primary btn-lg" @click="openCreateModal">
          ➕ Tambah User
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" style="text-align: center; padding: 60px 0;">
        <div class="loading-spinner"></div>
        <p style="margin-top: 12px; color: var(--admin-text-secondary);">Memuat data...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="error-banner">
        {{ error }}
      </div>

      <!-- Users Table -->
      <div v-else class="users-table-wrapper">
        <table class="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Max Undangan</th>
              <th>Jumlah Undangan</th>
              <th>Dibuat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td><strong>{{ user.username }}</strong></td>
              <td>
                <span class="user-badge" :class="user.role">{{ user.role }}</span>
              </td>
              <td>{{ user.role === 'admin' ? '♾️' : user.max_invitations }}</td>
              <td>{{ user.invitation_count ?? 0 }}</td>
              <td>{{ formatDate(user.created_at) }}</td>
              <td>
                <div class="action-btns">
                  <button class="btn btn-outline btn-sm" @click="openEditModal(user)">✏️ Edit</button>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="confirmDelete(user)"
                    :disabled="user.id === authStore.user?.id"
                    :title="user.id === authStore.user?.id ? 'Tidak bisa hapus diri sendiri' : ''"
                  >
                    🗑 Hapus
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content" style="max-width: 480px;">
        <div class="modal-title">{{ isEditing ? 'Edit User' : 'Tambah User Baru' }}</div>
        <form @submit.prevent="handleSubmit" class="modal-form">
          <div v-if="formError" class="login-error" style="margin-bottom: 12px;">{{ formError }}</div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label>Username</label>
              <button v-if="!isEditing" type="button" @click="generateRandomAccount" class="btn btn-sm btn-outline" style="padding: 2px 8px; font-size: 11px;">
                ✨ Generate Otomatis
              </button>
            </div>
            <input v-model="form.username" type="text" required :disabled="formLoading" />
          </div>

          <div class="form-group">
            <label>{{ isEditing ? 'Password (kosongkan jika tidak diubah)' : 'Password' }}</label>
            <input v-model="form.password" type="password" :required="!isEditing" :disabled="formLoading" />
          </div>

          <div class="form-group">
            <label>Role</label>
            <select v-model="form.role" :disabled="formLoading">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div class="form-group" v-if="form.role !== 'admin'">
            <label>Max Undangan</label>
            <input v-model.number="form.max_invitations" type="number" min="1" max="100" :disabled="formLoading" />
          </div>

          <div class="modal-actions">
            <!-- Copy Credentials Button for new users -->
            <button 
              v-if="!isEditing" 
              type="button" 
              class="btn btn-outline" 
              @click="copyCredentials"
              title="Salin Info Akses"
              style="margin-right: auto;"
            >
              📋 Salin Akses
            </button>

            <button type="button" class="btn btn-outline" @click="showModal = false">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="formLoading">
              {{ formLoading ? 'Menyimpan...' : (isEditing ? 'Simpan' : 'Buat User') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
      <div class="modal-content">
        <div class="modal-title">Hapus User?</div>
        <div class="modal-text">
          User <strong>{{ deleteTarget.username }}</strong> akan dihapus secara permanen beserta semua undangannya.
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api'

interface UserItem {
  id: string
  username: string
  role: 'admin' | 'user'
  max_invitations: number
  invitation_count?: number
  created_at?: string
}

const router = useRouter()
const authStore = useAuthStore()
const users = ref<UserItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const toast = ref<{ type: string; message: string } | null>(null)

// Modal state
const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref<string | null>(null)
const formLoading = ref(false)
const formError = ref<string | null>(null)
const form = ref({
  username: '',
  password: '',
  role: 'user' as 'admin' | 'user',
  max_invitations: 3
})

const deleteTarget = ref<UserItem | null>(null)

function handleLogout() {
  authStore.logout()
  router.push('/login')
}

// Auto Generate Random Account
function generateRandomAccount() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  form.value.username = `user_${randomNum}`;
  
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pass = '';
  for (let i = 0; i < 8; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  form.value.password = pass;
}

// Copy Credentials
async function copyCredentials() {
  if (!form.value.username || !form.value.password) {
    showToast('error', 'Username dan Password harus diisi untuk disalin!');
    return;
  }
  const loginUrl = window.location.origin + '/login';
  const text = `Akses Kelola Undangan:\nHalaman Login: ${loginUrl}\nUsername: ${form.value.username}\nPassword: ${form.value.password}`;
  try {
    await navigator.clipboard.writeText(text);
    showToast('success', 'Info akses berhasil disalin ke clipboard!');
  } catch (err) {
    showToast('error', 'Gagal menyalin teks. Silakan salin manual.');
  }
}

async function fetchUsers() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`${API_BASE}/auth/users`, {
      headers: await authStore.getAuthHeaders()
    })
    if (!res.ok) throw new Error('Gagal memuat user')
    users.value = await res.json()
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  isEditing.value = false
  editingId.value = null
  formError.value = null
  form.value = { username: '', password: '', role: 'user', max_invitations: 3 }
  showModal.value = true
}

function openEditModal(user: UserItem) {
  isEditing.value = true
  editingId.value = user.id
  formError.value = null
  form.value = {
    username: user.username,
    password: '',
    role: user.role,
    max_invitations: user.max_invitations
  }
  showModal.value = true
}

async function handleSubmit() {
  formLoading.value = true
  formError.value = null
  try {
    const url = isEditing.value
      ? `${API_BASE}/auth/users/${editingId.value}`
      : `${API_BASE}/auth/users`
    const method = isEditing.value ? 'PUT' : 'POST'

    const body: any = {
      username: form.value.username,
      role: form.value.role,
      max_invitations: form.value.role === 'admin' ? 999 : form.value.max_invitations
    }
    if (form.value.password) body.password = form.value.password

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...(await authStore.getAuthHeaders()) },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Gagal menyimpan')

    showModal.value = false
    showToast('success', isEditing.value ? 'User berhasil diupdate' : 'User berhasil dibuat')
    await fetchUsers()
  } catch (e: any) {
    formError.value = e.message
  } finally {
    formLoading.value = false
  }
}

function confirmDelete(user: UserItem) {
  deleteTarget.value = user
}

async function handleDelete() {
  if (!deleteTarget.value) return
  try {
    const res = await fetch(`${API_BASE}/auth/users/${deleteTarget.value.id}`, {
      method: 'DELETE',
      headers: await authStore.getAuthHeaders()
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || 'Gagal menghapus user')
    }
    showToast('success', 'User berhasil dihapus')
    await fetchUsers()
  } catch (e: any) {
    showToast('error', e.message)
  }
  deleteTarget.value = null
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

function showToast(type: string, message: string) {
  toast.value = { type, message }
  setTimeout(() => { toast.value = null }, 3000)
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.users-table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid var(--admin-border);
  background: var(--admin-surface-solid);
}

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

.user-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.user-badge.admin {
  background: rgba(245, 158, 11, 0.12);
  color: #d97706;
}

.user-badge.user {
  background: var(--admin-primary-light);
  color: var(--admin-primary);
}

.action-btns {
  display: flex;
  gap: 6px;
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

.modal-form input,
.modal-form select {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--admin-border);
  background: var(--admin-bg);
  color: var(--admin-text);
  font-size: 14px;
  outline: none;
}

.modal-form input:focus,
.modal-form select:focus {
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

@media (max-width: 768px) {
  .users-table th,
  .users-table td {
    padding: 10px 12px;
    font-size: 13px;
  }
  
  .users-table th {
    font-size: 11px;
  }

  .modal-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .modal-actions .btn {
    width: 100%;
  }

  /* Make sure inputs and selects are easier to tap on mobile */
  .modal-form input,
  .modal-form select {
    padding: 12px 14px;
    font-size: 16px; /* Prevents iOS auto-zoom */
  }
}
</style>
