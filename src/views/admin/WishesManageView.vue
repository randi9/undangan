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
      <div v-if="loading">
        <!-- Header Skeleton -->
        <div class="editor-header-compact" style="margin-bottom: 24px; display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between; align-items: center;">
          <div style="flex: 1;">
            <AppSkeleton height="28px" width="350px" style="margin-bottom: 8px;" />
            <AppSkeleton height="16px" width="250px" />
          </div>
        </div>

        <!-- STATS CARDS Skeleton -->
        <div class="stats-overview" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
          <AppSkeleton v-for="i in 3" :key="`skel-stat-${i}`" height="100px" rounded="xl" />
        </div>
        
        <!-- Progress Bar Skeleton -->
        <div style="margin-bottom: 32px;">
          <AppSkeleton height="70px" width="100%" rounded="xl" />
        </div>

        <!-- Table Skeleton -->
        <div class="admin-card" style="padding: 0; overflow: hidden;">
          <div class="desktop-only-table">
            <div style="padding: 16px; border-bottom: 1px solid var(--admin-border); display: flex; gap: 16px;">
              <AppSkeleton height="20px" width="20%" />
              <AppSkeleton height="20px" width="15%" />
              <AppSkeleton height="20px" width="40%" />
              <AppSkeleton height="20px" width="10%" style="margin-left: auto;" />
            </div>
            <div v-for="i in 4" :key="`skel-wish-${i}`" style="padding: 16px; border-bottom: 1px solid var(--admin-border); display: flex; align-items: flex-start; gap: 16px;">
              <div style="width: 20%;">
                <AppSkeleton height="20px" width="80%" style="margin-bottom: 8px;" />
                <AppSkeleton height="14px" width="60%" />
              </div>
              <div style="width: 15%;">
                <AppSkeleton height="24px" width="80px" rounded="full" />
              </div>
              <div style="width: 40%;">
                <AppSkeleton height="16px" width="90%" style="margin-bottom: 6px;" />
                <AppSkeleton height="16px" width="70%" />
              </div>
              <div style="margin-left: auto; width: 15%; display: flex; gap: 8px; justify-content: flex-end;">
                <AppSkeleton height="32px" width="32px" rounded="md" />
                <AppSkeleton height="32px" width="32px" rounded="md" />
                <AppSkeleton height="32px" width="32px" rounded="md" />
              </div>
            </div>
          </div>
          
          <div class="mobile-only-cards" style="padding: 16px; display: flex; flex-direction: column; gap: 16px;">
            <div v-for="i in 3" :key="`skel-mob-wish-${i}`" class="mobile-guest-card" style="background: white; border-radius: 12px; border: 1px solid var(--admin-border); display: flex; flex-direction: column; box-shadow: 0 1px 2px rgba(0,0,0,0.02); overflow: hidden;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 16px;">
                <div style="display: flex; flex-direction: column; gap: 4px; width: 60%;">
                  <AppSkeleton height="20px" width="80%" />
                  <AppSkeleton height="14px" width="60%" />
                </div>
                <AppSkeleton height="24px" width="70px" rounded="full" />
              </div>
              <div style="padding: 12px 16px; background: #f8fafc; border-top: 1px solid var(--admin-border); border-bottom: 1px solid var(--admin-border);">
                <AppSkeleton height="14px" width="100%" style="margin-bottom: 6px;" />
                <AppSkeleton height="14px" width="80%" />
              </div>
              <div style="padding: 12px 16px; display: flex; gap: 8px; width: 100%;">
                <AppSkeleton height="36px" width="100%" rounded="md" />
                <AppSkeleton height="36px" width="100%" rounded="md" />
                <AppSkeleton height="36px" width="40px" rounded="md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="invitation">
        <div class="editor-header-compact" style="margin-bottom: 24px; display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between; align-items: center;">
          <div style="flex: 1; min-width: 250px;">
            <h1 class="admin-page-title" style="margin-bottom: 4px; display: flex; align-items: center; gap: 8px; font-size: 20px;">
              <span class="material-symbols-rounded" style="color: var(--admin-primary)">forum</span>
              Statistik & Ucapan: {{ invitation.groom_name }} & {{ invitation.bride_name }}
            </h1>
            <p class="admin-page-subtitle">Pantau statistik kehadiran dan moderasi ucapan dari tamu</p>
          </div>
        </div>

        <!-- STATS CARDS -->
        <div v-if="stats" class="stats-overview" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
          <div class="stat-box" style="background: white; padding: 16px; border-radius: 12px; border: 1px solid var(--admin-border); text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: var(--admin-primary); margin-bottom: 4px;">{{ stats.totalPax }}</div>
            <div style="font-size: 13px; color: var(--admin-text-secondary); font-weight: 500;">Porsi Catering (Estimasi Pax)</div>
          </div>
          <div class="stat-box" style="background: white; padding: 16px; border-radius: 12px; border: 1px solid var(--admin-border); text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #10b981; margin-bottom: 4px;">{{ stats.attendanceStats.hadir }}</div>
            <div style="font-size: 13px; color: var(--admin-text-secondary); font-weight: 500;">Konfirmasi Hadir</div>
          </div>
          <div class="stat-box" style="background: white; padding: 16px; border-radius: 12px; border: 1px solid var(--admin-border); text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #ef4444; margin-bottom: 4px;">{{ stats.attendanceStats.tidak_hadir }}</div>
            <div style="font-size: 13px; color: var(--admin-text-secondary); font-weight: 500;">Tidak Hadir</div>
          </div>
        </div>

        <div v-if="stats" style="background: white; padding: 16px; border-radius: 12px; border: 1px solid var(--admin-border); margin-bottom: 32px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; font-weight: 600;">
            <span style="color: #10b981;">Hadir ({{ attendancePercentage.hadir }}%)</span>
            <span style="color: #ef4444;">Tidak Hadir ({{ attendancePercentage.tidakHadir }}%)</span>
          </div>
          <div style="height: 12px; width: 100%; background: #f1f5f9; border-radius: 999px; overflow: hidden; display: flex;">
            <div :style="`width: ${attendancePercentage.hadir}%; background: #10b981;`"></div>
            <div :style="`width: ${attendancePercentage.tidakHadir}%; background: #ef4444;`"></div>
          </div>
        </div>

        <!-- Tabel Ucapan -->
        <div class="admin-card" style="padding: 0; overflow: hidden;">
          <div v-if="rsvps.length === 0" style="padding: 40px; text-align: center; color: var(--admin-text-secondary);">
            <span class="material-symbols-rounded" style="font-size: 48px; opacity: 0.5; margin-bottom: 12px;">speaker_notes_off</span>
            <h3>Belum ada ucapan</h3>
            <p>Ucapan dan RSVP dari tamu akan muncul di sini.</p>
          </div>
          
          <div class="desktop-only-table">
            <table class="admin-table" style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: var(--admin-surface); border-bottom: 1px solid var(--admin-border); text-align: left;">
                  <th style="padding: 16px;">Tamu</th>
                  <th style="padding: 16px;">RSVP</th>
                  <th style="padding: 16px;">Ucapan & Balasan</th>
                  <th style="padding: 16px; text-align: right;">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rsvp in rsvps" :key="rsvp.id" style="border-bottom: 1px solid var(--admin-border);" :class="{'row-hidden': rsvp.is_hidden}">
                  <td style="padding: 16px; font-weight: 500; color: var(--admin-text); vertical-align: top;">
                    {{ rsvp.guest_name }}
                    <div style="font-size: 12px; color: var(--admin-text-secondary); margin-top: 4px;">{{ formatDate(rsvp.created_at) }}</div>
                  </td>
                  <td style="padding: 16px; vertical-align: top;">
                    <span v-if="rsvp.attendance === 'hadir'" class="badge badge-success">Hadir ({{ rsvp.guest_count }} pax)</span>
                    <span v-else class="badge badge-danger">Tidak Hadir</span>
                  </td>
                  <td style="padding: 16px; vertical-align: top; max-width: 400px;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">{{ rsvp.message || '-' }}</p>
                    
                    <div v-if="rsvp.reply_text" style="background: #f8fafc; padding: 10px 12px; border-radius: 8px; border-left: 3px solid var(--admin-primary); margin-top: 8px;">
                      <div style="font-size: 11px; font-weight: 700; color: var(--admin-primary); margin-bottom: 2px;">Balasan Anda:</div>
                      <div style="font-size: 13px; color: var(--admin-text-secondary);">{{ rsvp.reply_text }}</div>
                    </div>
                  </td>
                  <td style="padding: 16px; text-align: right; vertical-align: top;">
                    <div style="display: flex; gap: 8px; justify-content: flex-end;">
                      <button class="btn btn-outline btn-sm action-icon-btn" @click="toggleVisibility(rsvp)" :title="rsvp.is_hidden ? 'Tampilkan' : 'Sembunyikan'">
                        <span class="material-symbols-rounded">{{ rsvp.is_hidden ? 'visibility_off' : 'visibility' }}</span>
                      </button>
                      <button class="btn btn-outline btn-sm action-icon-btn" @click="openReplyModal(rsvp)" title="Balas">
                        <span class="material-symbols-rounded">reply</span>
                      </button>
                      <button class="btn btn-danger btn-sm action-icon-btn" @click="handleDelete(rsvp.id!)" title="Hapus">
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
            <div v-for="rsvp in rsvps" :key="rsvp.id" class="mobile-guest-card" :class="{'row-hidden': rsvp.is_hidden}">
              <div class="mgc-header">
                <div class="mgc-info">
                  <h4 class="mgc-name">{{ rsvp.guest_name }}</h4>
                  <p class="mgc-phone">{{ formatDate(rsvp.created_at) }}</p>
                </div>
                <div class="mgc-status">
                  <span v-if="rsvp.attendance === 'hadir'" class="badge badge-success">Hadir ({{ rsvp.guest_count }})</span>
                  <span v-else class="badge badge-danger">Tidak Hadir</span>
                </div>
              </div>
              <div style="padding: 12px 16px; background: #f8fafc; border-top: 1px solid var(--admin-border); border-bottom: 1px solid var(--admin-border);">
                 <p style="margin: 0; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">{{ rsvp.message || '-' }}</p>
                 <div v-if="rsvp.reply_text" style="background: white; padding: 10px 12px; border-radius: 8px; border-left: 3px solid var(--admin-primary); margin-top: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                    <div style="font-size: 11px; font-weight: 700; color: var(--admin-primary); margin-bottom: 2px;">Balasan Anda:</div>
                    <div style="font-size: 13px; color: var(--admin-text-secondary);">{{ rsvp.reply_text }}</div>
                  </div>
              </div>
              <div class="mgc-actions" style="padding: 12px 16px;">
                <div style="display: flex; gap: 8px; width: 100%;">
                  <button class="btn btn-outline btn-sm" style="flex: 1; justify-content: center;" @click="toggleVisibility(rsvp)">
                    <span class="material-symbols-rounded" style="font-size: 18px;">{{ rsvp.is_hidden ? 'visibility_off' : 'visibility' }}</span>
                    {{ rsvp.is_hidden ? 'Sembunyi' : 'Tampil' }}
                  </button>
                  <button class="btn btn-outline btn-sm" style="flex: 1; justify-content: center;" @click="openReplyModal(rsvp)">
                    <span class="material-symbols-rounded" style="font-size: 18px;">reply</span> Balas
                  </button>
                  <button class="btn btn-danger btn-sm" style="padding: 6px 12px;" @click="handleDelete(rsvp.id!)">
                    <span class="material-symbols-rounded" style="font-size: 18px;">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Balas Ucapan -->
    <div v-if="showReplyModal" class="modal-overlay" @click.self="showReplyModal = false">
      <div class="modal-content" style="max-width: 500px; padding: 24px; border-radius: 12px; background: white;">
        <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; color: var(--admin-primary)">Balas Pesan: {{ activeRsvp?.guest_name }}</h3>
        
        <div style="background: #f1f5f9; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; font-style: italic;">
          "{{ activeRsvp?.message }}"
        </div>

        <form @submit.prevent="submitReply">
          <div class="form-group" style="margin-bottom: 24px;">
            <label style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: var(--admin-text-secondary)">Teks Balasan</label>
            <textarea v-model="replyFormText" rows="4" class="form-input" style="width: 100%; border: 1px solid var(--admin-border); padding: 12px; border-radius: 6px; resize: vertical; font-size: 14px;" placeholder="Tulis ucapan terima kasih atau balasan Anda di sini..."></textarea>
          </div>
          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button type="button" class="btn btn-outline" @click="showReplyModal = false">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="saving">Simpan Balasan</button>
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
import type { Invitation, Rsvp } from '@/types/invitation';
import AppSkeleton from '@/components/ui/AppSkeleton.vue';

const route = useRoute();
const store = useInvitationStore();
const invitationId = route.params.id as string;

const loading = ref(true);
const saving = ref(false);
const invitation = ref<Invitation | null>(null);
const rsvps = ref<Rsvp[]>([]);
const stats = ref<any>(null);

const showReplyModal = ref(false);
const activeRsvp = ref<Rsvp | null>(null);
const replyFormText = ref('');

const toast = ref<{ type: string; message: string } | null>(null);

const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api';

const attendancePercentage = computed(() => {
  if (!stats.value) return { hadir: 0, tidakHadir: 0 };
  const total = stats.value.attendanceStats.hadir + stats.value.attendanceStats.tidak_hadir;
  if (total === 0) return { hadir: 0, tidakHadir: 0 };
  return {
    hadir: Math.round((stats.value.attendanceStats.hadir / total) * 100),
    tidakHadir: Math.round((stats.value.attendanceStats.tidak_hadir / total) * 100)
  };
});

onMounted(async () => {
  await loadData();
});

async function loadData() {
  loading.value = true;
  try {
    invitation.value = await store.fetchInvitationById(invitationId);
    if (!invitation.value) return;
    
    // Fetch RSVPs details directly (not just guest list)
    const headers = await (store as any).authHeaders?.() || {};
    // Wait, the API endpoint for rsvp is public, so no auth headers needed for GET
    const rsvpRes = await fetch(`${API_BASE}/rsvp/${invitationId}`);
    if (rsvpRes.ok) {
      rsvps.value = await rsvpRes.json();
    }
    
    // Fetch Stats
    stats.value = await store.fetchStats(invitationId);
  } catch (err: any) {
    showToast('error', 'Gagal memuat data');
  } finally {
    loading.value = false;
  }
}

function showToast(type: 'success' | 'error', message: string) {
  toast.value = { type, message };
  setTimeout(() => { toast.value = null; }, 3000);
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function openReplyModal(rsvp: Rsvp) {
  activeRsvp.value = rsvp;
  replyFormText.value = rsvp.reply_text || '';
  showReplyModal.value = true;
}

async function submitReply() {
  if (!activeRsvp.value || !activeRsvp.value.id) return;
  saving.value = true;
  try {
    const updated = await store.updateRsvp(activeRsvp.value.id, { reply_text: replyFormText.value });
    const index = rsvps.value.findIndex(r => r.id === updated.id);
    if (index !== -1) {
      rsvps.value[index] = updated;
    }
    showToast('success', 'Balasan berhasil disimpan!');
    showReplyModal.value = false;
  } catch (err: any) {
    showToast('error', 'Gagal menyimpan balasan');
  } finally {
    saving.value = false;
  }
}

async function toggleVisibility(rsvp: Rsvp) {
  if (!rsvp.id) return;
  try {
    const newStatus = !rsvp.is_hidden;
    const updated = await store.updateRsvp(rsvp.id, { is_hidden: newStatus });
    const index = rsvps.value.findIndex(r => r.id === updated.id);
    if (index !== -1) {
      rsvps.value[index] = updated;
    }
    showToast('success', `Ucapan berhasil ${newStatus ? 'disembunyikan' : 'ditampilkan'}.`);
  } catch (err) {
    showToast('error', 'Gagal mengubah status');
  }
}

async function handleDelete(rsvpId: string) {
  if (!confirm('Hapus ucapan/RSVP ini secara permanen? Data guest count dan konfirmasi kehadiran akan ikut terhapus dari statistik.')) return;
  try {
    await store.deleteRsvp(rsvpId);
    rsvps.value = rsvps.value.filter(r => r.id !== rsvpId);
    // Reload stats
    stats.value = await store.fetchStats(invitationId);
    showToast('success', 'Ucapan dihapus permanen');
  } catch (err) {
    showToast('error', 'Gagal menghapus ucapan');
  }
}
</script>

<style scoped>
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

.row-hidden td {
  opacity: 0.6;
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.02) 10px, rgba(0,0,0,0.02) 20px);
}
.mobile-guest-card.row-hidden {
  opacity: 0.7;
  border-style: dashed;
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
.badge-danger { background: #fee2e2; color: #991b1b; }

.action-icon-btn { padding: 6px 10px; }
.action-icon-btn span { font-size: 16px; }

@media (max-width: 768px) {
  .editor-container { padding: 16px; }
  .simple-topbar { padding: 0 16px; }
  .simple-topbar-brand span { display: none; }

  .desktop-only-table { display: none; }
  .mobile-only-cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    background: var(--admin-bg);
  }

  .mobile-guest-card {
    background: white;
    border: 1px solid var(--admin-border);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    overflow: hidden;
  }
  .mgc-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px;
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
    font-size: 12px;
    color: var(--admin-text-secondary);
  }
}
</style>
