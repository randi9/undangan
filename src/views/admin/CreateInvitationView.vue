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
        <router-link to="/create">+ Buat Undangan</router-link>
      </nav>
    </header>

    <div class="admin-container">
      <h1 class="admin-page-title">
        ✨ Buat Undangan Baru
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
        Isi informasi di bawah untuk membuat undangan pernikahan
      </p>

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
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              title="Hanya huruf kecil, angka, dan tanda hubung"
              @input="sanitizeSlug"
            />
            <small style="color: var(--admin-text-secondary); font-size: 12px">
              Undangan akan bisa diakses di: /invitation/<strong>{{
                form.slug || "slug-anda"
              }}</strong>
            </small>
          </div>
        </div>

        <!-- Couple Info -->
        <div class="form-section">
          <h3 class="form-section-title">💑 Informasi Pasangan</h3>
          <p class="form-section-subtitle">Data mempelai pria dan wanita</p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px">
            <!-- Groom -->
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
              <div class="single-photo-upload" @click="triggerUpload('groom')">
                <img
                  v-if="form.groom_photo"
                  :src="resolveAssetUrl(form.groom_photo, apiBase)"
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
                    placeholder="Andi"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Nama Lengkap</label>
                  <input
                    v-model="form.groom_full_name"
                    class="form-input"
                    placeholder="Ahmad Andi Pratama, S.Kom"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Putra dari Bapak</label>
                  <input
                    v-model="form.groom_father"
                    class="form-input"
                    placeholder="Bapak Ahmad"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">dan Ibu</label>
                  <input
                    v-model="form.groom_mother"
                    class="form-input"
                    placeholder="Ibu Siti"
                  />
                </div>
              </div>
            </div>

            <!-- Bride -->
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
              <div class="single-photo-upload" @click="triggerUpload('bride')">
                <img
                  v-if="form.bride_photo"
                  :src="resolveAssetUrl(form.bride_photo, apiBase)"
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
                    placeholder="Sarah"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Nama Lengkap</label>
                  <input
                    v-model="form.bride_full_name"
                    class="form-input"
                    placeholder="Sarah Amalia, S.E"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Putri dari Bapak</label>
                  <input
                    v-model="form.bride_father"
                    class="form-input"
                    placeholder="Bapak Budi"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">dan Ibu</label>
                  <input
                    v-model="form.bride_mother"
                    class="form-input"
                    placeholder="Ibu Rina"
                  />
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
            :class="{ dragover: coverDragover }"
            @click="triggerUpload('cover')"
            @dragover.prevent="coverDragover = true"
            @dragleave="coverDragover = false"
            @drop.prevent="handleCoverDrop"
          >
            <div v-if="form.cover_photo">
              <img
                :src="resolveAssetUrl(form.cover_photo, apiBase)"
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
          <p class="form-section-subtitle">Informasi waktu dan tempat acara</p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px">
            <!-- Akad -->
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
                  <input
                    v-model="form.akad_time"
                    class="form-input"
                    placeholder="08:00 - 10:00 WIB"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Tempat</label>
                  <input
                    v-model="form.akad_venue"
                    class="form-input"
                    placeholder="Masjid Al-Ikhlas"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Alamat</label>
                  <textarea
                    v-model="form.akad_address"
                    class="form-input"
                    placeholder="Jl. Raya No. 123, Jakarta"
                    rows="2"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label class="form-label">Link Google Maps</label>
                  <input
                    v-model="form.akad_map_url"
                    class="form-input"
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </div>
            </div>

            <!-- Resepsi -->
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
                  <input
                    v-model="form.resepsi_time"
                    class="form-input"
                    placeholder="11:00 - 14:00 WIB"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Tempat</label>
                  <input
                    v-model="form.resepsi_venue"
                    class="form-input"
                    placeholder="Grand Ballroom Hotel"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Alamat</label>
                  <textarea
                    v-model="form.resepsi_address"
                    class="form-input"
                    placeholder="Jl. Sudirman No. 456, Jakarta"
                    rows="2"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label class="form-label">Link Google Maps</label>
                  <input
                    v-model="form.resepsi_map_url"
                    class="form-input"
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Love Story -->
        <div class="form-section">
          <h3 class="form-section-title">💕 Love Story</h3>
          <p class="form-section-subtitle">
            Ceritakan perjalanan cinta kalian (opsional)
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
                placeholder="Tahun/Tanggal, contoh: 2020"
              />
              <input
                v-model="story.title"
                class="form-input"
                placeholder="Judul, contoh: Pertama Bertemu"
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
              @click="removeLoveStory(index)"
            >
              ×
            </button>
          </div>

          <button type="button" class="btn btn-outline" @click="addLoveStory">
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
            :class="{ dragover: galleryDragover }"
            @click="($refs.galleryInput as HTMLInputElement).click()"
            @dragover.prevent="galleryDragover = true"
            @dragleave="galleryDragover = false"
            @drop.prevent="handleGalleryDrop"
          >
            <div class="upload-icon">🖼️</div>
            <div class="upload-text">Klik atau drag foto ke sini</div>
            <div class="upload-hint">
              Bisa upload banyak foto sekaligus • JPG, PNG, WebP • Max 10MB per
              foto
            </div>
          </div>
          <input
            ref="galleryInput"
            type="file"
            accept="image/*"
            multiple
            hidden
            @change="handleGalleryUpload"
          />

          <div v-if="form.photos.length > 0" class="photo-preview-grid">
            <div
              v-for="(photo, index) in form.photos"
              :key="index"
              class="photo-preview-item"
            >
              <img :src="resolveAssetUrl(photo.url, apiBase)" alt="Galeri" />
              <button
                type="button"
                class="remove-btn"
                @click="removeGalleryPhoto(index)"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <!-- Quote & Extras -->
        <div class="form-section">
          <h3 class="form-section-title">✍️ Quote & Tambahan</h3>
          <p class="form-section-subtitle">
            Kutipan dan informasi tambahan (opsional)
          </p>
          <div class="form-grid">
            <div class="form-group full-width">
              <label class="form-label">Kutipan / Ayat</label>
              <textarea
                v-model="form.quote"
                class="form-input"
                placeholder="Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan..."
                rows="3"
              ></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Nama Bank (Gift)</label>
              <input
                v-model="form.bank_name"
                class="form-input"
                placeholder="BCA"
              />
            </div>
            <div class="form-group">
              <label class="form-label">No. Rekening</label>
              <input
                v-model="form.bank_account"
                class="form-input"
                placeholder="1234567890"
              />
            </div>
            <div class="form-group full-width">
              <label class="form-label">Atas Nama</label>
              <input
                v-model="form.bank_holder"
                class="form-input"
                placeholder="Ahmad Andi Pratama"
              />
            </div>
          </div>
        </div>

        <!-- Background Music -->
        <div class="form-section">
          <h3 class="form-section-title">🎵 Musik Latar</h3>
          <p class="form-section-subtitle">
            Pilih lagu yang akan berputar otomatis saat undangan dibuka
          </p>
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
          <router-link to="/" class="btn btn-outline btn-lg">Batal</router-link>
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
            {{ submitting ? "Menyimpan..." : "✨ Buat Undangan" }}
          </button>
        </div>
      </form>
    </div>

    <!-- Toast -->
    <div v-if="toast" :class="['toast', `toast-${toast.type}`]">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useInvitationStore } from "@/stores/invitation";
import type { LoveStoryItem, Photo } from "@/types/invitation";
import { resolveAssetUrl } from "@/utils/url";

const router = useRouter();
const route = useRoute();
const store = useInvitationStore();
const apiBase = import.meta.env.VITE_API_URL || "";

const submitting = ref(false);
const coverDragover = ref(false);
const galleryDragover = ref(false);
const toast = ref<{ type: string; message: string } | null>(null);

const groomPhotoInput = ref<HTMLInputElement>();
const bridePhotoInput = ref<HTMLInputElement>();
const coverPhotoInput = ref<HTMLInputElement>();
const musicFileInput = ref<HTMLInputElement>();

const form = reactive({
  slug: "",
  theme:
    (route.query.theme as "elegant" | "minimalist" | "floral") || "elegant",
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

function sanitizeSlug() {
  form.slug = form.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function triggerUpload(type: string) {
  if (type === "groom") groomPhotoInput.value?.click();
  else if (type === "bride") bridePhotoInput.value?.click();
  else if (type === "cover") coverPhotoInput.value?.click();
}

async function handleSingleUpload(
  event: Event,
  field: "groom_photo" | "bride_photo" | "cover_photo",
) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  try {
    const url = await store.uploadPhoto(file);
    form[field] = url;
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

async function handleCoverDrop(event: DragEvent) {
  coverDragover.value = false;
  const file = event.dataTransfer?.files[0];
  if (!file || !file.type.startsWith("image/")) return;
  try {
    form.cover_photo = await store.uploadPhoto(file);
  } catch {
    showToast("error", "Gagal upload foto");
  }
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

async function handleGalleryDrop(event: DragEvent) {
  galleryDragover.value = false;
  const files = Array.from(event.dataTransfer?.files || []).filter((f) =>
    f.type.startsWith("image/"),
  );
  if (files.length === 0) return;

  try {
    const results = await store.uploadPhotos(files);
    results.forEach((r) => {
      form.photos.push({ url: r.url, caption: "" });
    });
  } catch {
    showToast("error", "Gagal upload foto");
  }
}

function removeGalleryPhoto(index: number) {
  form.photos.splice(index, 1);
}

function addLoveStory() {
  form.love_story.push({ date: "", title: "", description: "" });
}

function removeLoveStory(index: number) {
  form.love_story.splice(index, 1);
}

function showToast(type: string, message: string) {
  toast.value = { type, message };
  setTimeout(() => {
    toast.value = null;
  }, 3000);
}

async function handleSubmit() {
  if (!form.slug || !form.groom_name || !form.bride_name) {
    showToast("error", "Slug, nama mempelai pria dan wanita wajib diisi");
    return;
  }

  submitting.value = true;
  try {
    await store.createInvitation({
      ...form,
      love_story: form.love_story.filter((s) => s.title || s.date),
    });
    showToast("success", "Undangan berhasil dibuat! 🎉");
    setTimeout(() => router.push("/"), 1500);
  } catch (e: any) {
    showToast("error", e.message || "Gagal membuat undangan");
  } finally {
    submitting.value = false;
  }
}
</script>
