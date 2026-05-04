<template>
  <div class="wishes-tab">
    <div class="tab-header">
      <h2 class="tab-title"><span class="material-symbols-rounded">forum</span> Ucapan & RSVP</h2>
    </div>

    <!-- Stats Summary -->
    <div v-if="stats" class="stats-row">
      <div class="mini-stat"><strong style="color:#10b981">{{ stats.attendanceStats?.hadir || 0 }}</strong> Hadir</div>
      <div class="mini-stat"><strong style="color:#ef4444">{{ stats.attendanceStats?.tidak_hadir || 0 }}</strong> Tidak</div>
      <div class="mini-stat"><strong style="color:#8b5cf6">{{ stats.totalPax || 0 }}</strong> Pax</div>
    </div>

    <div v-if="loading" style="text-align:center;padding:40px;color:#64748b">Memuat...</div>

    <div v-else-if="store.rsvps.length === 0" class="empty-state">
      <span class="material-symbols-rounded" style="font-size:48px;opacity:0.3">speaker_notes_off</span>
      <h3>Belum ada ucapan</h3>
      <p>Ucapan dan RSVP dari tamu akan muncul di sini.</p>
    </div>

    <div v-else class="rsvp-list">
      <div v-for="rsvp in store.rsvps" :key="rsvp.id" class="rsvp-card" :class="{'rsvp-hidden': rsvp.is_hidden}">
        <div class="rc-header">
          <div class="rc-info">
            <div class="rc-name">{{ rsvp.guest_name }}</div>
            <div class="rc-date">{{ formatDate(rsvp.created_at) }}</div>
          </div>
          <span v-if="rsvp.attendance === 'hadir'" class="badge badge-success">Hadir ({{ rsvp.guest_count }})</span>
          <span v-else class="badge badge-danger">Tidak Hadir</span>
        </div>

        <div class="rc-message" v-if="rsvp.message">{{ rsvp.message }}</div>
        <div v-else class="rc-message rc-no-message">Tidak ada pesan</div>

        <div v-if="rsvp.reply_text" class="rc-reply">
          <div class="rc-reply-label">Balasan Anda:</div>
          <div class="rc-reply-text">{{ rsvp.reply_text }}</div>
        </div>

        <div class="rc-actions">
          <button class="btn btn-outline btn-sm" style="flex:1;justify-content:center" @click="toggleVisibility(rsvp)">
            <span class="material-symbols-rounded" style="font-size:16px">{{ rsvp.is_hidden ? 'visibility_off' : 'visibility' }}</span>
            {{ rsvp.is_hidden ? 'Sembunyi' : 'Tampil' }}
          </button>
          <button class="btn btn-outline btn-sm" style="flex:1;justify-content:center" @click="openReply(rsvp)">
            <span class="material-symbols-rounded" style="font-size:16px">reply</span> Balas
          </button>
          <button class="btn btn-danger btn-sm" style="padding:6px 10px" @click="handleDelete(rsvp)">
            <span class="material-symbols-rounded" style="font-size:16px">delete</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Reply Modal -->
    <div v-if="showReplyModal" class="modal-overlay" @click.self="showReplyModal = false">
      <div class="modal-box">
        <h3 class="modal-title-text">Balas: {{ activeRsvp?.guest_name }}</h3>
        <div v-if="activeRsvp?.message" class="reply-original">"{{ activeRsvp.message }}"</div>
        <form @submit.prevent="submitReply">
          <textarea v-model="replyText" rows="4" class="form-input" style="resize:vertical" placeholder="Tulis balasan Anda..."></textarea>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" @click="showReplyModal = false">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="saving">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
      <div class="modal-box">
        <h3 class="modal-title-text" style="color:#ef4444">
          <span class="material-symbols-rounded" style="font-size:22px;vertical-align:-4px">warning</span> Hapus Ucapan?
        </h3>
        <p style="font-size:14px;color:#64748b">Ucapan dari <strong>{{ deleteTarget.guest_name }}</strong> akan dihapus permanen.</p>
        <div class="modal-actions">
          <button class="btn btn-outline" @click="deleteTarget = null">Batal</button>
          <button class="btn btn-danger" @click="confirmDelete">Ya, Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import { useClientStore } from '@/stores/client'
import type { Rsvp } from '@/types/invitation'

const props = defineProps<{ invitation: any; stats: any }>()
const store = useClientStore()
const showToast = inject<(type: 'success' | 'error', msg: string) => void>('showToast')!

const loading = ref(true)
const saving = ref(false)
const showReplyModal = ref(false)
const activeRsvp = ref<Rsvp | null>(null)
const replyText = ref('')
const deleteTarget = ref<Rsvp | null>(null)

onMounted(async () => {
  await store.fetchRsvps()
  loading.value = false
})

function formatDate(d?: string) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function openReply(rsvp: Rsvp) {
  activeRsvp.value = rsvp
  replyText.value = rsvp.reply_text || ''
  showReplyModal.value = true
}

async function submitReply() {
  if (!activeRsvp.value?.id) return
  saving.value = true
  try {
    await store.replyRsvp(activeRsvp.value.id, { reply_text: replyText.value })
    showToast('success', 'Balasan disimpan!')
    showReplyModal.value = false
  } catch { showToast('error', 'Gagal menyimpan') }
  finally { saving.value = false }
}

async function toggleVisibility(rsvp: Rsvp) {
  if (!rsvp.id) return
  try {
    await store.replyRsvp(rsvp.id, { is_hidden: !rsvp.is_hidden })
    showToast('success', `Ucapan ${rsvp.is_hidden ? 'ditampilkan' : 'disembunyikan'}`)
  } catch { showToast('error', 'Gagal mengubah status') }
}

function handleDelete(rsvp: Rsvp) { deleteTarget.value = rsvp }

async function confirmDelete() {
  if (!deleteTarget.value?.id) return
  try {
    await store.deleteRsvp(deleteTarget.value.id)
    await store.fetchStats()
    showToast('success', 'Ucapan dihapus')
  } catch { showToast('error', 'Gagal menghapus') }
  finally { deleteTarget.value = null }
}
</script>

<style scoped>
.tab-header { margin-bottom:16px; }
.tab-title { font-size:18px; font-weight:700; color:#1e293b; display:flex; align-items:center; gap:8px; margin:0; }
.tab-title .material-symbols-rounded { color:#3b82f6; }

.stats-row { display:flex; gap:8px; margin-bottom:16px; }
.mini-stat { flex:1; background:white; border:1px solid #e2e8f0; border-radius:10px; padding:10px; text-align:center; font-size:13px; color:#64748b; }
.mini-stat strong { display:block; font-size:20px; margin-bottom:2px; }

.empty-state { text-align:center; padding:40px 20px; color:#64748b; }
.empty-state h3 { margin:12px 0 4px; }

.rsvp-list { display:flex; flex-direction:column; gap:12px; }
.rsvp-card { background:white; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; }
.rsvp-hidden { opacity:0.6; border-style:dashed; }

.rc-header { display:flex; justify-content:space-between; align-items:flex-start; padding:16px 16px 0; gap:8px; }
.rc-name { font-size:15px; font-weight:600; color:#1e293b; }
.rc-date { font-size:12px; color:#94a3b8; margin-top:2px; }

.rc-message { padding:8px 16px 12px; font-size:14px; line-height:1.5; color:#334155; white-space:pre-wrap; }
.rc-no-message { color:#94a3b8; font-style:italic; }

.rc-reply { margin:0 16px 12px; padding:10px 12px; background:#f8fafc; border-radius:8px; border-left:3px solid #3b82f6; }
.rc-reply-label { font-size:11px; font-weight:700; color:#3b82f6; margin-bottom:2px; }
.rc-reply-text { font-size:13px; color:#64748b; }

.rc-actions { display:flex; gap:8px; padding:12px 16px; border-top:1px solid #f1f5f9; }

.badge { display:inline-flex; align-items:center; gap:4px; padding:4px 10px; border-radius:999px; font-size:12px; font-weight:600; white-space:nowrap; }
.badge-success { background:#dcfce7; color:#166534; }
.badge-danger { background:#fee2e2; color:#991b1b; }

.modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; padding:16px; }
.modal-box { background:white; border-radius:16px; padding:24px; max-width:500px; width:100%; max-height:90vh; overflow-y:auto; }
.modal-title-text { margin:0 0 16px; font-size:18px; font-weight:700; color:#1e293b; }
.reply-original { background:#f1f5f9; padding:12px; border-radius:8px; font-size:13px; font-style:italic; color:#64748b; margin-bottom:16px; }
.form-input { width:100%; padding:10px 12px; border:1px solid #e2e8f0; border-radius:8px; font-size:14px; outline:none; box-sizing:border-box; }
.form-input:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,0.1); }
.modal-actions { display:flex; gap:12px; justify-content:flex-end; margin-top:20px; }
</style>
