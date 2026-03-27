<template>
  <div class="admin-page-simple">
    <header class="simple-topbar">
      <router-link to="/" class="simple-topbar-brand">
        <div class="sidebar-brand-icon" style="width:32px;height:32px;border-radius:10px">
          <span class="material-symbols-rounded" style="font-size:18px">church</span>
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
      <div v-if="loading" style="text-align: center; padding: 60px 0">
        <div class="loading-spinner"></div>
        <p style="margin-top: 12px; color: var(--admin-text-secondary)">
          Memuat data undangan...
        </p>
      </div>

      <template v-else-if="form">
        <h1 class="admin-page-title">
          ✏️ Edit Undangan
          <span
            class="badge"
            style="
              background: var(--admin-primary);
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 14px;
              vertical-align: middle;
              margin-left: 12px;
              text-transform: capitalize;
            "
            >Tema: {{ form.theme }}</span
          >
        </h1>
        <p class="admin-page-subtitle">
          {{ form.groom_name }} & {{ form.bride_name }}
        </p>

        <form @submit.prevent="handleSubmit">
          <!-- Theme Selector -->
          <div class="form-section">
            <h3 class="form-section-title">🎨 Tema Undangan</h3>
            <p class="form-section-subtitle">Tema saat ini: <strong style="text-transform: capitalize;">{{ form.theme }}</strong>. Klik untuk mengganti.</p>
            <div class="edit-theme-grid">
              <div class="edit-theme-card" :class="{ active: form.theme === 'elegant' }" @click="form.theme = 'elegant'">
                <div class="edit-theme-preview" style="background: #2c2417; color: #fff;">
                  <div style="font-size: 8px; letter-spacing: 3px; color: #c9a96e; text-transform: uppercase;">The Wedding Of</div>
                  <div style="font-family: 'Great Vibes', cursive; font-size: 22px; margin-top: 4px;">Romeo & Juliet</div>
                </div>
                <div class="edit-theme-label">Elegant Gold</div>
                <div v-if="form.theme === 'elegant'" class="edit-theme-active-badge">✓ Aktif</div>
              </div>
              <div class="edit-theme-card" :class="{ active: form.theme === 'minimalist' }" @click="form.theme = 'minimalist'">
                <div class="edit-theme-preview" style="background: #ffffff; color: #111; border: 1px solid #eee;">
                  <div style="font-size: 8px; font-weight: 600; letter-spacing: 2px; color: #666;">THE WEDDING OF</div>
                  <div style="font-weight: 800; font-size: 18px; letter-spacing: -1px; margin-top: 4px;">ROMEO & JULIET</div>
                </div>
                <div class="edit-theme-label">Modern Minimalist</div>
                <div v-if="form.theme === 'minimalist'" class="edit-theme-active-badge">✓ Aktif</div>
              </div>
              <div class="edit-theme-card" :class="{ active: form.theme === 'floral' }" @click="form.theme = 'floral'">
                <div class="edit-theme-preview" style="background: #fdfbf7; color: #4a5d4e;">
                  <div style="font-size: 8px; font-style: italic; color: #8a9a5b;">The Wedding Of</div>
                  <div style="font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; margin-top: 4px;">Romeo & Juliet</div>
                </div>
                <div class="edit-theme-label">Romantic Floral</div>
                <div v-if="form.theme === 'floral'" class="edit-theme-active-badge">✓ Aktif</div>
              </div>
            </div>
          </div>
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
              <small
                style="color: var(--admin-text-secondary); font-size: 12px"
              >
                /invitation/<strong>{{ form.slug || "slug-anda" }}</strong>
              </small>
            </div>
          </div>

          <!-- Couple Info -->
          <div class="form-section">
            <h3 class="form-section-title">💑 Informasi Pasangan</h3>
            <p class="form-section-subtitle">Data mempelai pria dan wanita</p>

            <div class="split-grid">
              <div>
                <h4
                  style="
                    font-size: 15px;
                    font-weight: 600;
                    margin-bottom: 16px;
                    color: var(--admin-primary);
                  "
                >
                  Mempelai Pria
                </h4>
                <div
                  class="single-photo-upload"
                  @click="($refs.groomPhotoInput as HTMLInputElement).click()"
                >
                  <img
                    v-if="form.groom_photo"
                    :src="getPhotoUrl(form.groom_photo)"
                    alt="Foto mempelai pria"
                  />
                  <div v-else class="upload-placeholder">
                    <span class="icon">👤</span>
                    Upload Foto
                  </div>
                </div>
                <input
                  ref="groomPhotoInput"
                  type="file"
                  accept="image/*"
                  hidden
                  @change="(e) => handleSingleUpload(e, 'groom_photo')"
                />
                <div
                  style="
                    margin-top: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                  "
                >
                  <div class="form-group">
                    <label class="form-label">Nama Panggilan *</label>
                    <input
                      v-model="form.groom_name"
                      class="form-input"
                      required
                    />
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
                <h4
                  style="
                    font-size: 15px;
                    font-weight: 600;
                    margin-bottom: 16px;
                    color: var(--admin-accent);
                  "
                >
                  Mempelai Wanita
                </h4>
                <div
                  class="single-photo-upload"
                  @click="($refs.bridePhotoInput as HTMLInputElement).click()"
                >
                  <img
                    v-if="form.bride_photo"
                    :src="getPhotoUrl(form.bride_photo)"
                    alt="Foto mempelai wanita"
                  />
                  <div v-else class="upload-placeholder">
                    <span class="icon">👤</span>
                    Upload Foto
                  </div>
                </div>
                <input
                  ref="bridePhotoInput"
                  type="file"
                  accept="image/*"
                  hidden
                  @change="(e) => handleSingleUpload(e, 'bride_photo')"
                />
                <div
                  style="
                    margin-top: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                  "
                >
                  <div class="form-group">
                    <label class="form-label">Nama Panggilan *</label>
                    <input
                      v-model="form.bride_name"
                      class="form-input"
                      required
                    />
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
            <p class="form-section-subtitle">
              Foto utama yang ditampilkan di halaman depan undangan
            </p>
            <div
              class="photo-upload-zone"
              @click="($refs.coverPhotoInput as HTMLInputElement).click()"
            >
              <div v-if="form.cover_photo">
                <img
                  :src="getPhotoUrl(form.cover_photo)"
                  alt="Foto sampul"
                  style="max-height: 200px; border-radius: 8px"
                />
                <p
                  style="
                    margin-top: 8px;
                    font-size: 13px;
                    color: var(--admin-text-secondary);
                  "
                >
                  Klik untuk ganti foto
                </p>
              </div>
              <div v-else>
                <div class="upload-icon">📷</div>
                <div class="upload-text">Klik atau drag foto ke sini</div>
                <div class="upload-hint">JPG, PNG, WebP • Max 10MB</div>
              </div>
            </div>
            <input
              ref="coverPhotoInput"
              type="file"
              accept="image/*"
              hidden
              @change="(e) => handleSingleUpload(e, 'cover_photo')"
            />
          </div>

          <!-- Event Details -->
          <div class="form-section">
            <h3 class="form-section-title">📅 Detail Acara</h3>
            <p class="form-section-subtitle">
              Informasi waktu dan tempat acara
            </p>

            <div class="split-grid">
              <div
                style="
                  padding: 20px;
                  background: var(--admin-bg);
                  border-radius: var(--radius-md);
                  border: 1px solid var(--admin-border);
                "
              >
                <h4
                  style="font-size: 15px; font-weight: 600; margin-bottom: 16px"
                >
                  💍 Akad Nikah
                </h4>
                <div style="display: flex; flex-direction: column; gap: 12px">
                  <div class="form-group">
                    <label class="form-label">Tanggal</label>
                    <input
                      v-model="form.akad_date"
                      type="date"
                      class="form-input"
                    />
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
                    <textarea
                      v-model="form.akad_address"
                      class="form-input"
                      rows="2"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Link Google Maps</label>
                    <input v-model="form.akad_map_url" class="form-input" />
                  </div>
                </div>
              </div>

              <div
                style="
                  padding: 20px;
                  background: var(--admin-bg);
                  border-radius: var(--radius-md);
                  border: 1px solid var(--admin-border);
                "
              >
                <h4
                  style="font-size: 15px; font-weight: 600; margin-bottom: 16px"
                >
                  🎉 Resepsi
                </h4>
                <div style="display: flex; flex-direction: column; gap: 12px">
                  <div class="form-group">
                    <label class="form-label">Tanggal</label>
                    <input
                      v-model="form.resepsi_date"
                      type="date"
                      class="form-input"
                    />
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
                    <textarea
                      v-model="form.resepsi_address"
                      class="form-input"
                      rows="2"
                    ></textarea>
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
            <p class="form-section-subtitle">
              Ceritakan perjalanan cinta kalian
            </p>

            <div
              v-for="(story, index) in form.love_story"
              :key="index"
              class="love-story-item"
            >
              <div style="font-size: 24px; color: var(--admin-primary)">
                {{ index + 1 }}
              </div>
              <div class="story-fields">
                <input
                  v-model="story.date"
                  class="form-input"
                  placeholder="Tahun/Tanggal"
                />
                <input
                  v-model="story.title"
                  class="form-input"
                  placeholder="Judul"
                />
                <textarea
                  v-model="story.description"
                  class="form-input"
                  placeholder="Ceritakan momen ini..."
                  rows="2"
                ></textarea>
              </div>
              <button
                type="button"
                class="btn btn-danger btn-icon"
                @click="form.love_story.splice(index, 1)"
              >
                ×
              </button>
            </div>

            <button
              type="button"
              class="btn btn-outline"
              @click="
                form.love_story.push({ date: '', title: '', description: '' })
              "
            >
              + Tambah Cerita
            </button>
          </div>

          <!-- Gallery -->
          <div class="form-section">
            <h3 class="form-section-title">📸 Galeri Foto</h3>
            <p class="form-section-subtitle">
              Upload foto-foto prewedding atau momen spesial
            </p>

            <div
              class="photo-upload-zone"
              @click="($refs.galleryInput as HTMLInputElement).click()"
            >
              <div class="upload-icon">🖼️</div>
              <div class="upload-text">Klik atau drag foto ke sini</div>
              <div class="upload-hint">Bisa upload banyak foto sekaligus</div>
            </div>
            <input
              ref="galleryInput"
              type="file"
              accept="image/*"
              multiple
              hidden
              @change="handleGalleryUpload"
            />

            <div
              v-if="form.photos && form.photos.length > 0"
              class="photo-preview-grid"
            >
              <div
                v-for="(photo, index) in form.photos"
                :key="index"
                class="photo-preview-item"
              >
                <img :src="getPhotoUrl(photo.url)" />
                <button
                  type="button"
                  class="remove-btn"
                  @click="form.photos.splice(index, 1)"
                >
                  ×
                </button>
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
                <textarea
                  v-model="form.quote"
                  class="form-input"
                  rows="3"
                ></textarea>
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
          <!-- Background Music -->
          <div class="form-section">
            <h3 class="form-section-title">🎵 Musik Latar</h3>
            <p class="form-section-subtitle">Pilih lagu yang akan berputar otomatis saat undangan dibuka</p>
            <div class="form-group">
              <div class="single-photo-upload" style="aspect-ratio: auto; height: auto; padding: 24px;" @click="musicFileInput?.click()">
                <div v-if="form.music_url" style="width: 100%; text-align: center;">
                  <div style="font-size: 32px; margin-bottom: 8px;">🎧</div>
                  <div style="font-weight: 500; font-size: 14px; margin-bottom: 12px; word-break: break-all; color: var(--admin-primary)">Lagu Terpilih</div>
                  <audio controls :src="resolveAssetUrl(form.music_url, apiBase)" style="width: 100%; height: 36px; margin-bottom: 12px;"></audio>
                  <button type="button" class="btn btn-danger btn-sm" @click.stop="removeMusic">Hapus Lagu</button>
                </div>
                <div v-else class="upload-placeholder">
                  <span class="icon">🎵</span>
                  Upload File Audio (.mp3, .m4a, .wav)
                </div>
              </div>
              <input
                ref="musicFileInput"
                type="file"
                accept="audio/mpeg, audio/aac, audio/mp4, audio/wav, audio/ogg, audio/x-m4a"
                hidden
                @change="handleMusicUpload"
              />
            </div>
          </div>

          <!-- Submit -->
          <div
            style="
              display: flex;
              gap: 12px;
              justify-content: flex-end;
              margin-top: 24px;
            "
          >
            <router-link to="/" class="btn btn-outline btn-lg"
              >Batal</router-link
            >
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              :disabled="submitting"
            >
              <span
                v-if="submitting"
                class="loading-spinner"
                style="margin-right: 8px"
              ></span>
              {{ submitting ? "Menyimpan..." : "💾 Simpan Perubahan" }}
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
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useInvitationStore } from "@/stores/invitation";
import type { LoveStoryItem, Photo } from "@/types/invitation";
import { resolveAssetUrl } from "@/utils/url";

const route = useRoute();
const router = useRouter();
const store = useInvitationStore();
const apiBase = import.meta.env.VITE_API_URL || "";

const loading = ref(true);
const submitting = ref(false);
const toast = ref<{ type: string; message: string } | null>(null);
const musicFileInput = ref<HTMLInputElement>();

const form = reactive({
  slug: "",
  theme: "elegant" as "elegant" | "minimalist" | "floral",
  groom_name: "",
  bride_name: "",
  groom_full_name: "",
  bride_full_name: "",
  groom_father: "",
  groom_mother: "",
  bride_father: "",
  bride_mother: "",
  groom_photo: "",
  bride_photo: "",
  cover_photo: "",
  akad_date: "",
  akad_time: "",
  akad_venue: "",
  akad_address: "",
  akad_map_url: "",
  resepsi_date: "",
  resepsi_time: "",
  resepsi_venue: "",
  resepsi_address: "",
  resepsi_map_url: "",
  love_story: [] as LoveStoryItem[],
  quote: "",
  bank_name: "",
  bank_account: "",
  bank_holder: "",
  music_url: "",
  photos: [] as Photo[],
});

function getPhotoUrl(url: string) {
  return resolveAssetUrl(url, apiBase);
}

function normalizeLoveStory(value: unknown): LoveStoryItem[] {
  if (!value) return [];
  if (Array.isArray(value)) return value as LoveStoryItem[];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as LoveStoryItem[]) : [];
    } catch {
      return [];
    }
  }
  return [];
}

function sanitizeSlug() {
  form.slug = form.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-");
}

async function handleSingleUpload(
  event: Event,
  field: "groom_photo" | "bride_photo" | "cover_photo",
) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  try {
    form[field] = await store.uploadPhoto(file);
  } catch {
    showToast("error", "Gagal upload foto");
  }
  input.value = "";
}

async function handleGalleryUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files || []);
  if (files.length === 0) return;
  try {
    const results = await store.uploadPhotos(files);
    results.forEach((r) => {
      form.photos.push({ url: r.url, caption: "" });
    });
  } catch {
    showToast("error", "Gagal upload foto");
  }
  input.value = "";
}

async function handleMusicUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  try {
    const url = await store.uploadMusic(file);
    form.music_url = url;
    showToast("success", "Musik berhasil diupload");
  } catch {
    showToast("error", "Gagal upload musik");
  }
  input.value = "";
}

function removeMusic() {
  form.music_url = "";
}

function showToast(type: string, message: string) {
  toast.value = { type, message };
  setTimeout(() => {
    toast.value = null;
  }, 3000);
}

async function handleSubmit() {
  submitting.value = true;
  try {
    const id = route.params.id as string;
    await store.updateInvitation(id, {
      ...form,
      love_story: form.love_story.filter((s) => s.title || s.date),
    });
    showToast("success", "Undangan berhasil diperbarui! 🎉");
    setTimeout(() => router.push("/"), 1500);
  } catch (e: any) {
    showToast("error", e.message || "Gagal memperbarui undangan");
  } finally {
    submitting.value = false;
  }
}

onMounted(async () => {
  const id = route.params.id as string;
  const data = await store.fetchInvitationById(id);
  if (data) {
    Object.assign(form, {
      ...data,
      theme: data.theme || "elegant",
      love_story: normalizeLoveStory(data.love_story),
      photos: data.photos || [],
    });
  }
  loading.value = false;
});
</script>

<style scoped>
.edit-theme-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.edit-theme-card {
  position: relative;
  background: var(--admin-surface);
  border: 2px solid var(--admin-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-theme-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}

.edit-theme-card.active {
  border-color: var(--admin-primary);
  box-shadow: 0 0 0 3px var(--admin-primary-glow);
}

.edit-theme-preview {
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.edit-theme-label {
  padding: 10px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--admin-text);
}

.edit-theme-active-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--admin-primary);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 12px;
}

@media (max-width: 600px) {
  .edit-theme-grid {
    grid-template-columns: 1fr;
  }
}
</style>
