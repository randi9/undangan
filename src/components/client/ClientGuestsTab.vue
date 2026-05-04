<template>
  <div class="guests-tab">
    <div class="tab-header">
      <h2 class="tab-title"><span class="material-symbols-rounded">group</span> Buku Tamu</h2>
      <div class="tab-actions">
        <button class="btn btn-outline btn-sm" @click="showMessageModal = true">
          <span class="material-symbols-rounded" style="font-size:16px">edit_note</span> Pesan WA
        </button>
        <button class="btn btn-outline btn-sm" @click="showBulkModal = true">
          <span class="material-symbols-rounded" style="font-size:16px">playlist_add</span> Massal
        </button>
        <button class="btn btn-primary btn-sm" @click="showSingleModal = true">
          <span class="material-symbols-rounded" style="font-size:16px">person_add</span> Tambah
        </button>
      </div>
    </div>

    <div v-if="loading" style="text-align:center;padding:40px;color:#64748b">Memuat...</div>

    <div v-else-if="store.guests.length === 0" class="empty-state">
      <span class="material-symbols-rounded" style="font-size:48px;opacity:0.3">group_off</span>
      <h3>Belum ada tamu</h3>
      <p>Klik "Tambah" untuk menambah tamu undangan.</p>
    </div>

    <div v-else class="guest-list">
      <div v-for="guest in store.guests" :key="guest.id" class="guest-card">
        <div class="gc-info">
          <div class="gc-name">{{ guest.name }}</div>
          <div class="gc-phone">{{ guest.phone_number || 'Tidak ada nomor' }}</div>
        </div>
        <div class="gc-status">
          <span v-if="guest.is_sent" class="badge badge-success"><span class="material-symbols-rounded" style="font-size:14px">check_circle</span> Terkirim</span>
          <span v-else class="badge badge-pending"><span class="material-symbols-rounded" style="font-size:14px">pending</span> Belum</span>
        </div>
        <div class="gc-actions">
          <button class="btn btn-primary btn-sm" style="flex:1;background:#25D366;border-color:#25D366;justify-content:center" @click="sendWhatsApp(guest)">
            <span class="material-symbols-rounded" style="font-size:16px">send</span> WA
          </button>
          <button class="btn btn-outline btn-sm" style="padding:6px 10px" @click="copyLink(guest)" title="Copy"><span class="material-symbols-rounded" style="font-size:16px">content_copy</span></button>
          <button class="btn btn-danger btn-sm" style="padding:6px 10px" @click="handleDelete(guest.id!)" title="Hapus"><span class="material-symbols-rounded" style="font-size:16px">delete</span></button>
        </div>
      </div>
    </div>

    <!-- Modal Tambah Single -->
    <div v-if="showSingleModal" class="modal-overlay" @click.self="showSingleModal = false">
      <div class="modal-box">
        <h3 class="modal-title-text">Tambah Tamu</h3>
        <form @submit.prevent="submitSingle">
          <div class="form-group"><label>Nama Tamu (Wajib)</label><input v-model="singleForm.name" type="text" required class="form-input" placeholder="Misal: Budi & Keluarga" /></div>
          <div class="form-group"><label>No WhatsApp (Opsional)</label><input v-model="singleForm.phone" type="text" class="form-input" placeholder="08123456789" /></div>
          <div class="modal-actions"><button type="button" class="btn btn-outline" @click="showSingleModal = false">Batal</button><button type="submit" class="btn btn-primary" :disabled="saving">Simpan</button></div>
        </form>
      </div>
    </div>

    <!-- Modal Tambah Massal -->
    <div v-if="showBulkModal" class="modal-overlay" @click.self="showBulkModal = false">
      <div class="modal-box">
        <h3 class="modal-title-text">Tambah Tamu Massal</h3>
        <p style="font-size:13px;color:#64748b;margin-bottom:12px">Satu baris per tamu. Pisahkan nama dan nomor WA dengan koma.</p>
        <form @submit.prevent="submitBulk">
          <textarea v-model="bulkText" rows="8" class="form-input" style="resize:vertical;font-family:monospace;font-size:13px" placeholder="Budi & Keluarga, 0812xxx&#10;Andi Santoso&#10;Siti, 0857xxx"></textarea>
          <div class="modal-actions"><button type="button" class="btn btn-outline" @click="showBulkModal = false">Batal</button><button type="submit" class="btn btn-primary" :disabled="saving || !bulkText.trim()">Simpan</button></div>
        </form>
      </div>
    </div>

    <!-- Modal Edit Pesan WA -->
    <div v-if="showMessageModal" class="modal-overlay" @click.self="showMessageModal = false">
      <div class="modal-box">
        <h3 class="modal-title-text">Edit Pesan WhatsApp</h3>
        <div style="background:#f8fafc;padding:10px 12px;border-radius:6px;font-size:12px;font-family:monospace;margin-bottom:12px;color:#475569">
          <strong>[Nama Tamu]</strong> — Nama tamu<br/>
          <strong>[Pria]</strong> — Mempelai pria<br/>
          <strong>[Wanita]</strong> — Mempelai wanita<br/>
          <strong>[Link]</strong> — URL undangan
        </div>
        <form @submit.prevent="saveWA">
          <textarea v-model="waInput" rows="8" class="form-input" style="resize:vertical;font-size:14px"></textarea>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" @click="waInput = defaultWA">Reset</button>
            <button type="button" class="btn btn-outline" @click="showMessageModal = false">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="savingWA">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import { useClientStore } from '@/stores/client'
import type { Guest } from '@/types/invitation'

const props = defineProps<{ invitation: any }>()
const store = useClientStore()
const showToast = inject<(type: 'success' | 'error', msg: string) => void>('showToast')!

const loading = ref(true)
const saving = ref(false)
const savingWA = ref(false)
const showSingleModal = ref(false)
const showBulkModal = ref(false)
const showMessageModal = ref(false)
const singleForm = ref({ name: '', phone: '' })
const bulkText = ref('')
const waInput = ref('')

const defaultWA = `Kepada Yth.\nBapak/Ibu/Saudara/i *[Nama Tamu]*\n\nTanpa mengurangi rasa hormat, kami bermaksud mengundang Anda untuk hadir pada acara pernikahan kami:\n\n*[Pria] & [Wanita]*\n\nBerikut adalah link undangan detail acara kami:\n[Link]\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.\n\nTerima kasih.`

onMounted(async () => {
  await store.fetchGuests()
  waInput.value = props.invitation?.wa_message || defaultWA
  loading.value = false
})

function getInvitationUrl(slug: string) {
  const h = window.location.hostname, p = window.location.port ? `:${window.location.port}` : '', pr = window.location.protocol
  if (h === 'localhost' || h === '127.0.0.1' || h.endsWith('.vercel.app')) return `${pr}//${h}${p}/invitation/${slug}`
  return `${pr}//${slug}.${h.replace('www.','').replace('admin.','')}${p}`
}

function getShareUrl(name: string) {
  if (!props.invitation) return ''
  const url = new URL(getInvitationUrl(props.invitation.slug))
  url.searchParams.set('to', name)
  return url.toString()
}

function generateWAMessage(name: string, link: string) {
  if (!props.invitation) return ''
  let t = props.invitation.wa_message || defaultWA
  t = t.replace(/\[Nama Tamu\]/g, name)
  t = t.replace(/\[Pria\]/g, props.invitation.groom_name)
  t = t.replace(/\[Wanita\]/g, props.invitation.bride_name)
  t = t.replace(/\[Link\]/g, link)
  return t
}

async function copyLink(guest: Guest) {
  try {
    await navigator.clipboard.writeText(getShareUrl(guest.name))
    showToast('success', 'Link disalin!')
  } catch { showToast('error', 'Gagal menyalin') }
}

async function sendWhatsApp(guest: Guest) {
  const link = getShareUrl(guest.name)
  const text = encodeURIComponent(generateWAMessage(guest.name, link))
  let waUrl = `https://wa.me/?text=${text}`
  if (guest.phone_number) {
    let phone = guest.phone_number.replace(/\D/g, '')
    if (phone.startsWith('0')) phone = '62' + phone.substring(1)
    waUrl = `https://wa.me/${phone}?text=${text}`
  }
  window.open(waUrl, '_blank')
  if (!guest.is_sent && guest.id) {
    try { await store.updateGuestStatus(guest.id, true) } catch {}
  }
}

async function submitSingle() {
  if (!singleForm.value.name.trim()) return
  saving.value = true
  try {
    await store.bulkAddGuests([{ name: singleForm.value.name, phone_number: singleForm.value.phone }])
    showToast('success', 'Tamu ditambahkan')
    showSingleModal.value = false
    singleForm.value = { name: '', phone: '' }
  } catch { showToast('error', 'Gagal menambah tamu') }
  finally { saving.value = false }
}

async function submitBulk() {
  if (!bulkText.value.trim()) return
  saving.value = true
  const lines = bulkText.value.split('\n').filter(l => l.trim())
  const payload = lines.map(l => { const p = l.split(','); return { name: p[0]?.trim() || 'Tamu', phone_number: p[1]?.trim() || '' } })
  try {
    await store.bulkAddGuests(payload)
    showToast('success', `${payload.length} tamu ditambahkan`)
    showBulkModal.value = false
    bulkText.value = ''
  } catch { showToast('error', 'Gagal menambah tamu') }
  finally { saving.value = false }
}

async function saveWA() {
  savingWA.value = true
  try {
    await store.updateWaMessage(waInput.value)
    showToast('success', 'Pesan WA disimpan')
    showMessageModal.value = false
  } catch { showToast('error', 'Gagal menyimpan') }
  finally { savingWA.value = false }
}

async function handleDelete(id: string) {
  if (!confirm('Hapus tamu ini?')) return
  try { await store.deleteGuest(id); showToast('success', 'Tamu dihapus') }
  catch { showToast('error', 'Gagal menghapus') }
}
</script>

<style scoped>
.tab-header { display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px; margin-bottom:20px; }
.tab-title { font-size:18px; font-weight:700; color:#1e293b; display:flex; align-items:center; gap:8px; margin:0; }
.tab-title .material-symbols-rounded { color:#3b82f6; }
.tab-actions { display:flex; gap:8px; flex-wrap:wrap; }
.empty-state { text-align:center; padding:40px 20px; color:#64748b; }
.empty-state h3 { margin:12px 0 4px; }

.guest-list { display:flex; flex-direction:column; gap:10px; }
.guest-card { background:white; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; flex-wrap:wrap; align-items:center; gap:12px; }
.gc-info { flex:1; min-width:150px; }
.gc-name { font-size:15px; font-weight:600; color:#1e293b; }
.gc-phone { font-size:13px; color:#64748b; margin-top:2px; }
.gc-actions { display:flex; gap:8px; width:100%; }

.badge { display:inline-flex; align-items:center; gap:4px; padding:4px 10px; border-radius:999px; font-size:12px; font-weight:600; }
.badge-success { background:#dcfce7; color:#166534; }
.badge-pending { background:#f1f5f9; color:#475569; }

.modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; padding:16px; }
.modal-box { background:white; border-radius:16px; padding:24px; max-width:500px; width:100%; max-height:90vh; overflow-y:auto; }
.modal-title-text { margin:0 0 16px; font-size:18px; font-weight:700; color:#1e293b; }
.form-group { margin-bottom:16px; }
.form-group label { display:block; margin-bottom:6px; font-size:13px; font-weight:600; color:#64748b; }
.form-input { width:100%; padding:10px 12px; border:1px solid #e2e8f0; border-radius:8px; font-size:14px; outline:none; box-sizing:border-box; }
.form-input:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,0.1); }
.modal-actions { display:flex; gap:12px; justify-content:flex-end; margin-top:20px; }

@media (min-width:640px) {
  .gc-actions { width:auto; }
}
</style>
