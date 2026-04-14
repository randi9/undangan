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

    <div class="editor-container" style="max-width: 1000px; margin: 0 auto;">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Memuat daftar tamu...</p>
      </div>

      <div v-else-if="invitation">
        <div class="editor-header-compact" style="margin-bottom: 24px; display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between; align-items: center;">
          <div style="flex: 1; min-width: 250px;">
            <h1 class="admin-page-title" style="margin-bottom: 4px; display: flex; align-items: center; gap: 8px; font-size: 20px;">
              <span class="material-symbols-rounded" style="color: var(--admin-primary)">book</span>
              Buku Tamu: {{ invitation.groom_name }} & {{ invitation.bride_name }}
            </h1>
            <p class="admin-page-subtitle">Kelola tamu dan bagikan undangan via WA</p>
          </div>
          <div class="action-buttons-group" style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-outline btn-sm action-btn" @click="openMessageModal">
              <span class="material-symbols-rounded" style="font-size: 16px;">edit_note</span>
              Edit Pesan WA
            </button>
            <button class="btn btn-outline btn-sm action-btn" @click="showBulkModal = true">
              <span class="material-symbols-rounded" style="font-size: 16px;">playlist_add</span>
              Massal
            </button>
            <button class="btn btn-primary btn-sm action-btn" @click="showSingleModal = true">
              <span class="material-symbols-rounded" style="font-size: 16px;">person_add</span>
              Tambah
            </button>
          </div>
        </div>

        <!-- Tabel Daftar Tamu -->
        <div class="admin-card" style="padding: 0; overflow: hidden;">
          <div v-if="guests.length === 0" style="padding: 40px; text-align: center; color: var(--admin-text-secondary);">
            <span class="material-symbols-rounded" style="font-size: 48px; opacity: 0.5; margin-bottom: 12px;">group_off</span>
            <h3>Belum ada daftar tamu</h3>
            <p>Klik tombol "Tambah Tamu" di atas untuk mulai membuat daftar tamu.</p>
          </div>
          
          <!-- Desktop view: Table -->
          <div class="desktop-only-table">
            <table class="admin-table" style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: var(--admin-surface); border-bottom: 1px solid var(--admin-border); text-align: left;">
                  <th style="padding: 16px;">Nama Tamu</th>
                  <th style="padding: 16px;">No. WhatsApp</th>
                  <th style="padding: 16px;">Status</th>
                  <th style="padding: 16px; text-align: right;">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="guest in guests" :key="guest.id || guest.name" style="border-bottom: 1px solid var(--admin-border);">
                  <td style="padding: 16px; font-weight: 500; color: var(--admin-text);">{{ guest.name }}</td>
                  <td style="padding: 16px; color: var(--admin-text-secondary);">{{ guest.phone_number || '-' }}</td>
                  <td style="padding: 16px;">
                    <span v-if="guest.is_sent" class="badge badge-success">
                      <span class="material-symbols-rounded" style="font-size: 14px;">check_circle</span> Terkirim
                    </span>
                    <span v-else class="badge badge-pending">
                      <span class="material-symbols-rounded" style="font-size: 14px;">pending</span> Belum
                    </span>
                  </td>
                  <td style="padding: 16px; text-align: right;">
                    <div style="display: flex; gap: 8px; justify-content: flex-end;">
                      <button class="btn btn-outline btn-sm action-icon-btn" @click="copyLink(guest)" title="Copy Link">
                        <span class="material-symbols-rounded">content_copy</span>
                      </button>
                      <button class="btn btn-primary btn-sm action-wa-btn" @click="sendWhatsApp(guest)">
                        <span class="material-symbols-rounded">send</span> WA
                      </button>
                      <button class="btn btn-danger btn-sm action-icon-btn" @click="handleDelete(guest.id!)" title="Hapus">
                        <span class="material-symbols-rounded">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile view: Cards -->
          <div class="mobile-only-cards">
            <div v-for="guest in guests" :key="guest.id || guest.name" class="mobile-guest-card">
              <div class="mgc-header">
                <div class="mgc-info">
                  <h4 class="mgc-name">{{ guest.name }}</h4>
                  <p class="mgc-phone">{{ guest.phone_number || 'Tidak ada nomor WA' }}</p>
                </div>
                <div class="mgc-status">
                  <span v-if="guest.is_sent" class="badge badge-success">
                    <span class="material-symbols-rounded" style="font-size: 14px;">check_circle</span> Terkirim
                  </span>
                  <span v-else class="badge badge-pending">
                    <span class="material-symbols-rounded" style="font-size: 14px;">pending</span> Belum
                  </span>
                </div>
              </div>
              <div class="mgc-actions">
                <button class="btn btn-primary btn-sm" style="flex: 1; background: #25D366; border-color: #25D366; justify-content: center;" @click="sendWhatsApp(guest)">
                  <span class="material-symbols-rounded" style="font-size: 16px;">send</span> Kirim WA
                </button>
                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-outline btn-sm" style="padding: 6px 12px;" @click="copyLink(guest)" title="Copy Link">
                    <span class="material-symbols-rounded" style="font-size: 18px;">content_copy</span>
                  </button>
                  <button class="btn btn-danger btn-sm" style="padding: 6px 12px;" @click="handleDelete(guest.id!)" title="Hapus">
                    <span class="material-symbols-rounded" style="font-size: 18px;">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Tambah Single -->
    <div v-if="showSingleModal" class="modal-overlay" @click.self="showSingleModal = false">
      <div class="modal-content" style="max-width: 400px; padding: 24px; border-radius: 12px; background: white;">
        <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 18px; color: var(--admin-primary)">Tambah Tamu</h3>
        <form @submit.prevent="submitSingleGuest">
          <div class="form-group" style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: var(--admin-text-secondary)">Nama Tamu (Wajib)</label>
            <input type="text" v-model="singleForm.name" required class="form-input" style="width: 100%; border: 1px solid var(--admin-border); padding: 10px; border-radius: 6px;" placeholder="Misal: Budi & Keluarga" />
          </div>
          <div class="form-group" style="margin-bottom: 24px;">
            <label style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: var(--admin-text-secondary)">No WhatsApp (Opsional)</label>
            <input type="text" v-model="singleForm.phone" class="form-input" style="width: 100%; border: 1px solid var(--admin-border); padding: 10px; border-radius: 6px;" placeholder="Misal: 08123456789" />
          </div>
          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button type="button" class="btn btn-outline" @click="showSingleModal = false">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="saving">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Tambah Massal -->
    <div v-if="showBulkModal" class="modal-overlay" @click.self="showBulkModal = false">
      <div class="modal-content" style="max-width: 600px; padding: 24px; border-radius: 12px; background: white;">
        <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; color: var(--admin-primary)">Tambah Tamu Massal</h3>
        <p style="font-size: 13px; color: var(--admin-text-secondary); margin-bottom: 16px;">
          Paste daftar tamu dari Excel atau ketik manual. Pisahkan nama dan nomor WA dengan koma (,). Satu baris untuk satu tamu.
        </p>
        <form @submit.prevent="submitBulkGuests">
          <div class="form-group" style="margin-bottom: 24px;">
            <textarea v-model="bulkText" rows="10" class="form-input" style="width: 100%; border: 1px solid var(--admin-border); padding: 12px; border-radius: 6px; resize: vertical; font-family: monospace; font-size: 13px;" placeholder="Budi & Keluarga, 0812xxx&#10;Andi Santoso&#10;Siti, 0857xxx"></textarea>
          </div>
          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button type="button" class="btn btn-outline" @click="showBulkModal = false">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="saving || !bulkText.trim()">Simpan Daftar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Edit Pesan WA -->
    <div v-if="showMessageModal" class="modal-overlay" @click.self="showMessageModal = false">
      <div class="modal-content responsive-modal">
        <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; color: var(--admin-primary)">Edit Pesan WhatsApp</h3>
        <p style="font-size: 13px; color: var(--admin-text-secondary); margin-bottom: 12px;">
          Sesuaikan template tulisan yang dikirimkan ke WhatsApp secara bawaan. Gunakan kode variabel berikut agar diganti otomatis oleh sistem:
        </p>
        <div style="background:var(--admin-surface); padding:10px 12px; border-radius:6px; font-size:12px; font-family:monospace; margin-bottom: 16px; color: #475569;">
          <strong>[Nama Tamu]</strong> - Nama tamu yang akan diundang<br/>
          <strong>[Pria]</strong> - Panggilan mempelai pria<br/>
          <strong>[Wanita]</strong> - Panggilan mempelai wanita<br/>
          <strong>[Link]</strong> - URL tautan undangan
        </div>
        <form @submit.prevent="saveWAMessage">
          <div class="form-group" style="margin-bottom: 24px;">
            <textarea v-model="waMessageInput" class="form-input wa-textarea" placeholder="Tuliskan template pesan WA Anda..."></textarea>
          </div>
          <div class="modal-actions-container">
            <button type="button" class="btn btn-outline" @click="showMessageModal = false">Batal</button>
            <button type="button" class="btn btn-outline reset-btn" @click="resetWAMessage">Reset Default</button>
            <button type="submit" class="btn btn-primary submit-btn" :disabled="savingMessage">
              <span v-if="savingMessage" class="spinner" style="width:14px;height:14px;border-width:2px;margin:0 8px 0 0"></span>
              Simpan Pesan
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="toast" :class="['toast', `toast-${toast.type}`]">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useInvitationStore } from '@/stores/invitation';
import type { Invitation, Guest } from '@/types/invitation';

const route = useRoute();
const store = useInvitationStore();
const invitationId = route.params.id as string;

const loading = ref(true);
const saving = ref(false);
const invitation = ref<Invitation | null>(null);
const guests = computed(() => store.guests);

const showSingleModal = ref(false);
const showBulkModal = ref(false);
const showMessageModal = ref(false);

const singleForm = ref({ name: '', phone: '' });
const bulkText = ref('');
const waMessageInput = ref('');
const savingMessage = ref(false);

const defaultWAMessage = `Kepada Yth.\nBapak/Ibu/Saudara/i *[Nama Tamu]*\n\nTanpa mengurangi rasa hormat, kami bermaksud mengundang Anda untuk hadir pada acara pernikahan kami:\n\n*[Pria] & [Wanita]*\n\nBerikut adalah link undangan detail acara kami:\n[Link]\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.\n\nTerima kasih.`;

const toast = ref<{ type: string; message: string } | null>(null);

const apiBase = import.meta.env.VITE_API_URL || '';

onMounted(async () => {
  await loadData();
});

async function loadData() {
  loading.value = true;
  invitation.value = await store.fetchInvitationById(invitationId);
  await store.fetchGuests(invitationId);
  loading.value = false;
}

function showToast(type: 'success' | 'error', message: string) {
  toast.value = { type, message };
  setTimeout(() => { toast.value = null; }, 3000);
}

function openMessageModal() {
  waMessageInput.value = invitation.value?.wa_message || defaultWAMessage;
  showMessageModal.value = true;
}

function resetWAMessage() {
  waMessageInput.value = defaultWAMessage;
}

async function saveWAMessage() {
  if (!invitation.value) return;
  savingMessage.value = true;
  try {
    const data = await store.updateInvitation(invitationId, { wa_message: waMessageInput.value });
    invitation.value.wa_message = data.wa_message;
    showMessageModal.value = false;
    showToast('success', 'Template pesan WA berhasil disimpan!');
  } catch (err: any) {
    showToast('error', err.message || 'Gagal menyimpan pesan WA');
  } finally {
    savingMessage.value = false;
  }
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

function getShareUrl(guestName: string) {
  if (!invitation.value) return '';
  const baseUrl = getInvitationUrl(invitation.value.slug);
  const url = new URL(baseUrl);
  url.searchParams.set('to', guestName);
  return url.toString();
}

function generateWhatsAppMessage(guestName: string, link: string) {
  if (!invitation.value) return '';
  let template = invitation.value.wa_message || defaultWAMessage;
  template = template.replace(/\[Nama Tamu\]/g, guestName);
  template = template.replace(/\[Pria\]/g, invitation.value.groom_name);
  template = template.replace(/\[Wanita\]/g, invitation.value.bride_name);
  template = template.replace(/\[Link\]/g, link);
  return template;
}

async function copyLink(guest: Guest) {
  const link = getShareUrl(guest.name);
  try {
    await navigator.clipboard.writeText(link);
    showToast('success', 'Link berhasil disalin!');
  } catch (err) {
    showToast('error', 'Gagal menyalin link');
  }
}

async function sendWhatsApp(guest: Guest) {
  const link = getShareUrl(guest.name);
  const text = encodeURIComponent(generateWhatsAppMessage(guest.name, link));
  let waUrl = `https://wa.me/?text=${text}`;
  
  if (guest.phone_number) {
    // Format ke internasional jika mulai dari 0/62/+62
    let phone = guest.phone_number.replace(/\D/g, '');
    if (phone.startsWith('0')) phone = '62' + phone.substring(1);
    waUrl = `https://wa.me/${phone}?text=${text}`;
  }

  window.open(waUrl, '_blank');

  if (!guest.is_sent) {
    try {
      await store.updateGuestStatus(invitationId, guest.id!, true);
    } catch (e) {
      console.error('Failed to update status', e);
    }
  }
}

async function submitSingleGuest() {
  if (!singleForm.value.name.trim()) return;
  saving.value = true;
  try {
    await store.bulkAddGuests(invitationId, [{ 
      name: singleForm.value.name, 
      phone_number: singleForm.value.phone 
    }]);
    showToast('success', 'Tamu berhasil ditambahkan');
    showSingleModal.value = false;
    singleForm.value = { name: '', phone: '' };
  } catch (err) {
    showToast('error', 'Gagal menambah tamu');
  } finally {
    saving.value = false;
  }
}

async function submitBulkGuests() {
  if (!bulkText.value.trim()) return;
  saving.value = true;
  
  const lines = bulkText.value.split('\n').filter(l => l.trim().length > 0);
  const payload = lines.map(line => {
    const parts = line.split(',');
    return {
      name: parts[0]?.trim() || 'Tamu',
      phone_number: parts.length > 1 ? parts[1]?.trim() : ''
    };
  });

  try {
    await store.bulkAddGuests(invitationId, payload);
    showToast('success', `${payload.length} tamu berhasil ditambahkan`);
    showBulkModal.value = false;
    bulkText.value = '';
  } catch (err) {
    showToast('error', 'Gagal menambah tamu massal');
  } finally {
    saving.value = false;
  }
}

async function handleDelete(guestId: string) {
  if (!confirm('Hapus tamu ini dari daftar?')) return;
  try {
    await store.deleteGuest(invitationId, guestId);
    showToast('success', 'Tamu dihapus');
  } catch (err) {
    showToast('error', 'Gagal menghapus tamu');
  }
}
</script>

<style scoped>
/* Copied styles from DashboardView & Admin defaults */
.admin-page-simple {
  min-height: 100vh;
  background-color: var(--admin-bg, #f4f6fa);
  padding-bottom: 64px;
}
.simple-topbar {
  background: white;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid var(--admin-border);
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.simple-topbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--admin-primary);
  font-weight: 700;
  font-size: 18px;
}
.simple-topbar-brand img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
.editor-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-success { background: #10b981; }
.toast-error { background: #ef4444; }

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 0;
  color: var(--admin-text-secondary);
}
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--admin-border);
  border-top-color: var(--admin-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.mobile-only-cards {
  display: none;
}

.desktop-only-table {
  display: block;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}
.badge-success { background: #dcfce7; color: #166534; }
.badge-pending { background: #f1f5f9; color: #475569; }

.action-icon-btn { padding: 6px 10px; }
.action-wa-btn { background: #25D366; border-color: #25D366; padding: 6px 16px; }
.action-icon-btn span, .action-wa-btn span { font-size: 16px; }

/* Desktop Modal Defaults */
.responsive-modal {
  max-width: 600px;
  padding: 24px;
  border-radius: 12px;
  background: white;
  max-height: 90vh;
  overflow-y: auto;
}
.modal-actions-container {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
.reset-btn {
  margin-right: auto;
}
.wa-textarea {
  width: 100%;
  border: 1px solid var(--admin-border);
  padding: 12px;
  border-radius: 6px;
  resize: vertical;
  font-family: sans-serif;
  font-size: 14px;
  min-height: 200px;
}

@media (max-width: 640px) {
  .editor-container { padding: 16px; }
  .simple-topbar { padding: 0 16px; }
  .simple-topbar-brand span { display: none; }
  .action-buttons-group { width: 100%; margin-top: 8px; }
  .action-btn { flex: 1; justify-content: center; }

  /* Responsive Modal Overrides */
  .responsive-modal {
    padding: 16px;
    width: 90%;
  }
  .modal-actions-container {
    flex-direction: row;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: nowrap;
  }
  .modal-actions-container .btn {
    width: auto;
    flex: 1;
    margin-right: 0;
    justify-content: center;
    padding: 8px 4px;
    font-size: 13px;
    white-space: nowrap;
  }
  .reset-btn {
    margin: 0;
  }
  .wa-textarea {
    min-height: 250px;
  }

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
    gap: 16px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  }
  .mgc-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }
  .mgc-name {
    margin: 0 0 4px 0;
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
