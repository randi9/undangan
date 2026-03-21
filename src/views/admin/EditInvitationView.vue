<template>
  <div class="admin-layout">
    <header class="admin-header">
      <router-link to="/" class="admin-logo">
        <div class="logo-icon">💒</div>
        <span>Undangan<span style="color: var(--admin-primary)">Gen</span></span>
      </router-link>
      <nav class="admin-nav">
        <router-link to="/">Dashboard</router-link>
        <router-link to="/create">+ Buat Undangan</router-link>
      </nav>
    </header>

    <div class="admin-container">
      <div v-if="loading" style="text-align: center; padding: 60px 0;">
        <div class="loading-spinner"></div>
        <p style="margin-top: 12px; color: var(--admin-text-secondary);">Memuat data undangan...</p>
      </div>

      <template v-else-if="form">
        <h1 class="admin-page-title">
          ✏️ Edit Undangan
          <span class="badge" style="background: var(--admin-primary); padding: 4px 12px; border-radius: 20px; font-size: 14px; vertical-align: middle; margin-left: 12px; text-transform: capitalize;">Tema: {{ form.theme }}</span>
        </h1>
        <p class="admin-page-subtitle">{{ form.groom_name }} & {{ form.bride_name }}</p>

        <form @submit.prevent="handleSubmit">
          <!-- Slug -->
          <div class="form-section">
            <h3 class="form-section-title">🔗 URL Undangan</h3>
            <p class="form-section-subtitle">Slug unik untuk alamat undangan</p>
            <div class="form-group">
              <label class="form-label">Slug (URL)</label>
              <input
                v-model="form.slug"
                class="form-input"
                placeholder="contoh: andi-sarah"
                required
                @input="sanitizeSlug"
              />
              <small style="color: var(--admin-text-secondary); font-size: 12px;">
                /invitation/<strong>{{ form.slug || 'slug-anda' }}</strong>
              </small>
            </div>
          </div>

          <!-- Couple Info -->
          <div class="form-section">
            <h3 class="form-section-title">💑 Informasi Pasangan</h3>
            <p class="form-section-subtitle">Data mempelai pria dan wanita</p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
              <div>
                <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 16px; color: var(--admin-primary);">Mempelai Pria</h4>
                <div class="single-photo-upload" @click="($refs.groomPhotoInput as HTMLInputElement).click()">
                  <img v-if="form.groom_photo" :src="getPhotoUrl(form.groom_photo)" alt="Foto mempelai pria" />
                  <div v-else class="upload-placeholder">
                    <span class="icon">👤</span>
                    Upload Foto
                  </div>
                </div>
                <input ref="groomPhotoInput" type="file" accept="image/*" hidden @change="e => handleSingleUpload(e, 'groom_photo')" />
                <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 12px;">
                  <div class="form-group">
                    <label class="form-label">Nama Panggilan *</label>
                    <input v-model="form.groom_name" class="form-input" required />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Nama Lengkap</label>
                    <input v-model="form.groom_full_name" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Putra dari Bapak</label>
                    <input v-model="form.groom_father" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">dan Ibu</label>
                    <input v-model="form.groom_mother" class="form-input" />
                  </div>
                </div>
              </div>

              <div>
                <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 16px; color: var(--admin-accent);">Mempelai Wanita</h4>
                <div class="single-photo-upload" @click="($refs.bridePhotoInput as HTMLInputElement).click()">
                  <img v-if="form.bride_photo" :src="getPhotoUrl(form.bride_photo)" alt="Foto mempelai wanita" />
                  <div v-else class="upload-placeholder">
                    <span class="icon">👤</span>
                    Upload Foto
                  </div>
                </div>
                <input ref="bridePhotoInput" type="file" accept="image/*" hidden @change="e => handleSingleUpload(e, 'bride_photo')" />
                <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 12px;">
                  <div class="form-group">
                    <label class="form-label">Nama Panggilan *</label>
                    <input v-model="form.bride_name" class="form-input" required />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Nama Lengkap</label>
                    <input v-model="form.bride_full_name" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Putri dari Bapak</label>
                    <input v-model="form.bride_father" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">dan Ibu</label>
                    <input v-model="form.bride_mother" class="form-input" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cover Photo -->
          <div class="form-section">
            <h3 class="form-section-title">🖼️ Foto Sampul</h3>
            <p class="form-section-subtitle">Foto utama yang ditampilkan di halaman depan undangan</p>
            <div class="photo-upload-zone" @click="($refs.coverPhotoInput as HTMLInputElement).click()">
              <div v-if="form.cover_photo">
                <img :src="getPhotoUrl(form.cover_photo)" style="max-height: 200px; border-radius: 8px;" />
                <p style="margin-top: 8px; font-size: 13px; color: var(--admin-text-secondary);">Klik untuk ganti foto</p>
              </div>
              <div v-else>
                <div class="upload-icon">📷</div>
                <div class="upload-text">Klik atau drag foto ke sini</div>
                <div class="upload-hint">JPG, PNG, WebP • Max 10MB</div>
              </div>
            </div>
            <input ref="coverPhotoInput" type="file" accept="image/*" hidden @change="e => handleSingleUpload(e, 'cover_photo')" />
          </div>

          <!-- Event Details -->
          <div class="form-section">
            <h3 class="form-section-title">📅 Detail Acara</h3>
            <p class="form-section-subtitle">Informasi waktu dan tempat acara</p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
              <div style="padding: 20px; background: var(--admin-bg); border-radius: var(--radius-md); border: 1px solid var(--admin-border);">
                <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 16px;">💍 Akad Nikah</h4>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                  <div class="form-group">
                    <label class="form-label">Tanggal</label>
                    <input v-model="form.akad_date" type="date" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Waktu</label>
                    <input v-model="form.akad_time" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Tempat</label>
                    <input v-model="form.akad_venue" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Alamat</label>
                    <textarea v-model="form.akad_address" class="form-input" rows="2"></textarea>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Link Google Maps</label>
                    <input v-model="form.akad_map_url" class="form-input" />
                  </div>
                </div>
              </div>

              <div style="padding: 20px; background: var(--admin-bg); border-radius: var(--radius-md); border: 1px solid var(--admin-border);">
                <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 16px;">🎉 Resepsi</h4>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                  <div class="form-group">
                    <label class="form-label">Tanggal</label>
                    <input v-model="form.resepsi_date" type="date" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Waktu</label>
                    <input v-model="form.resepsi_time" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Tempat</label>
                    <input v-model="form.resepsi_venue" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Alamat</label>
                    <textarea v-model="form.resepsi_address" class="form-input" rows="2"></textarea>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Link Google Maps</label>
                    <input v-model="form.resepsi_map_url" class="form-input" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Love Story -->
          <div class="form-section">
            <h3 class="form-section-title">💕 Love Story</h3>
            <p class="form-section-subtitle">Ceritakan perjalanan cinta kalian</p>

            <div v-for="(story, index) in form.love_story" :key="index" class="love-story-item">
              <div style="font-size: 24px; color: var(--admin-primary);">{{ index + 1 }}</div>
              <div class="story-fields">
                <input v-model="story.date" class="form-input" placeholder="Tahun/Tanggal" />
                <input v-model="story.title" class="form-input" placeholder="Judul" />
                <textarea v-model="story.description" class="form-input" placeholder="Ceritakan momen ini..." rows="2"></textarea>
              </div>
              <button type="button" class="btn btn-danger btn-icon" @click="form.love_story.splice(index, 1)">×</button>
            </div>

            <button type="button" class="btn btn-outline" @click="form.love_story.push({ date: '', title: '', description: '' })">
              + Tambah Cerita
            </button>
          </div>

          <!-- Gallery -->
          <div class="form-section">
            <h3 class="form-section-title">📸 Galeri Foto</h3>
            <p class="form-section-subtitle">Upload foto-foto prewedding atau momen spesial</p>

            <div class="photo-upload-zone" @click="($refs.galleryInput as HTMLInputElement).click()">
              <div class="upload-icon">🖼️</div>
              <div class="upload-text">Klik atau drag foto ke sini</div>
              <div class="upload-hint">Bisa upload banyak foto sekaligus</div>
            </div>
            <input ref="galleryInput" type="file" accept="image/*" multiple hidden @change="handleGalleryUpload" />

            <div v-if="form.photos && form.photos.length > 0" class="photo-preview-grid">
              <div v-for="(photo, index) in form.photos" :key="index" class="photo-preview-item">
                <img :src="getPhotoUrl(photo.url)" />
                <button type="button" class="remove-btn" @click="form.photos.splice(index, 1)">×</button>
              </div>
            </div>
          </div>

          <!-- Quote & Extras -->
          <div class="form-section">
            <h3 class="form-section-title">✍️ Quote & Tambahan</h3>
            <p class="form-section-subtitle">Kutipan dan informasi tambahan</p>
            <div class="form-grid">
              <div class="form-group full-width">
                <label class="form-label">Kutipan / Ayat</label>
                <textarea v-model="form.quote" class="form-input" rows="3"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Nama Bank (Gift)</label>
                <input v-model="form.bank_name" class="form-input" />
              </div>
              <div class="form-group">
                <label class="form-label">No. Rekening</label>
                <input v-model="form.bank_account" class="form-input" />
              </div>
              <div class="form-group full-width">
                <label class="form-label">Atas Nama</label>
                <input v-model="form.bank_holder" class="form-input" />
              </div>
            </div>
          </div>

          <!-- Submit -->
          <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
            <router-link to="/" class="btn btn-outline btn-lg">Batal</router-link>
            <button type="submit" class="btn btn-primary btn-lg" :disabled="submitting">
              <span v-if="submitting" class="loading-spinner" style="margin-right: 8px;"></span>
              {{ submitting ? 'Menyimpan...' : '💾 Simpan Perubahan' }}
            </button>
          </div>
        </form>
      </template>
    </div>

    <!-- Toast -->
    <div v-if="toast" :class="['toast', `toast-${toast.type}`]">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInvitationStore } from '@/stores/invitation'
import type { LoveStoryItem, Photo } from '@/types/invitation'

const route = useRoute()
const router = useRouter()
const store = useInvitationStore()
const apiBase = import.meta.env.VITE_API_URL || ''

const loading = ref(true)
const submitting = ref(false)
const toast = ref<{ type: string; message: string } | null>(null)

const form = reactive({
  slug: '',
  theme: 'elegant' as 'elegant' | 'minimalist' | 'floral',
  groom_name: '',
  bride_name: '',
  groom_full_name: '',
  bride_full_name: '',
  groom_father: '',
  groom_mother: '',
  bride_father: '',
  bride_mother: '',
  groom_photo: '',
  bride_photo: '',
  cover_photo: '',
  akad_date: '',
  akad_time: '',
  akad_venue: '',
  akad_address: '',
  akad_map_url: '',
  resepsi_date: '',
  resepsi_time: '',
  resepsi_venue: '',
  resepsi_address: '',
  resepsi_map_url: '',
  love_story: [] as LoveStoryItem[],
  quote: '',
  bank_name: '',
  bank_account: '',
  bank_holder: '',
  photos: [] as Photo[]
})

function getPhotoUrl(url: string) {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return apiBase + url
}

function sanitizeSlug() {
  form.slug = form.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')
}

async function handleSingleUpload(event: Event, field: 'groom_photo' | 'bride_photo' | 'cover_photo') {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  try {
    form[field] = await store.uploadPhoto(file)
  } catch {
    showToast('error', 'Gagal upload foto')
  }
  input.value = ''
}

async function handleGalleryUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files || [])
  if (files.length === 0) return
  try {
    const results = await store.uploadPhotos(files)
    results.forEach(r => {
      form.photos.push({ url: r.url, caption: '' })
    })
  } catch {
    showToast('error', 'Gagal upload foto')
  }
  input.value = ''
}

function showToast(type: string, message: string) {
  toast.value = { type, message }
  setTimeout(() => { toast.value = null }, 3000)
}

async function handleSubmit() {
  submitting.value = true
  try {
    const id = route.params.id as string
    await store.updateInvitation(id, {
      ...form,
      love_story: form.love_story.filter(s => s.title || s.date)
    })
    showToast('success', 'Undangan berhasil diperbarui! 🎉')
    setTimeout(() => router.push('/'), 1500)
  } catch (e: any) {
    showToast('error', e.message || 'Gagal memperbarui undangan')
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  const id = route.params.id as string
  const data = await store.fetchInvitationById(id)
  if (data) {
    Object.assign(form, {
      ...data,
      theme: data.theme || 'elegant',
      love_story: data.love_story ? JSON.parse(data.love_story as string) : [],
      photos: data.photos || []
    })
  }
  loading.value = false
})
</script>
