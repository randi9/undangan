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

    <div class="editor-container">
      <div v-if="loading" style="text-align: center; padding: 60px 0">
        <div class="loading-spinner"></div>
        <p style="margin-top: 12px; color: var(--admin-text-secondary)">
          Memuat data undangan...
        </p>
      </div>

      <template v-else-if="form">
        <!-- Layout Editor Split Screen -->
        <div class="editor-layout">
          <!-- Area Kiri: Form Isian -->
          <div class="editor-form-area">
            <h1 class="admin-page-title" style="display: flex; justify-content: space-between; align-items: center;">
              <span style="display: flex; align-items: center; gap: 8px;"><Icon icon="lucide:pencil" style="color: var(--admin-primary);" /> Edit Undangan</span>
              <button 
                class="btn btn-outline btn-sm mobile-only" 
                @click="showMobilePreview = true"
                style="border-radius: 20px; font-weight: 600;"
              >
                👀 Preview
              </button>
            </h1>
            <p class="admin-page-subtitle">
              {{ form.groom_name }} & {{ form.bride_name }}
            </p>

            <form @submit.prevent="handleSubmit">
          <!-- Theme Selector -->
          <div class="form-section">
            <h3 class="form-section-title"><Icon icon="lucide:palette" style="color: var(--admin-primary);" /> Tema Undangan</h3>
            
            <div class="active-theme-container" style="display: flex; justify-content: space-between; align-items: center; background: var(--admin-surface); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--admin-border);">
              <div>
                <div style="font-size: 13px; color: var(--admin-text-secondary); margin-bottom: 4px;">Tema saat ini</div>
                <strong style="text-transform: capitalize; font-size: 16px;">{{ form.theme }}</strong>
              </div>
              <button type="button" class="btn btn-outline" @click="showThemeModal = true">
                <Icon icon="lucide:arrow-left-right" style="font-size: 16px;" />
                Ubah Tema
              </button>
            </div>
          </div>
          <!-- Slug -->
          <div class="form-section">
            <h3 class="form-section-title"><Icon icon="lucide:link" style="color: var(--admin-primary);" /> URL Undangan</h3>
            <p class="form-section-subtitle">Slug unik untuk alamat undangan</p>
            <div class="form-group">
              <label class="form-label">Slug (URL)</label>
              <div style="position: relative;">
                <input
                  v-model="form.slug"
                  class="form-input"
                  :class="{ 'input-error': slugStatus === 'taken', 'input-success': slugStatus === 'available' }"
                  placeholder="contoh: andi-sarah"
                  required
                  pattern="[a-z0-9-]+"
                  title="Hanya huruf kecil, angka, dan tanda hubung"
                  @input="handleSlugInput"
                  style="padding-right: 36px;"
                />
                <div 
                  v-if="slugStatus !== 'idle'" 
                  style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); display:flex; align-items:center;"
                >
                  <Icon v-if="slugStatus === 'loading'" icon="lucide:loader-2" class="spin-icon" style="color: var(--admin-text-secondary);" />
                  <Icon v-else-if="slugStatus === 'available'" icon="lucide:check-circle-2" style="color: #10b981;" />
                  <Icon v-else-if="slugStatus === 'taken'" icon="lucide:x-circle" style="color: #ef4444;" />
                </div>
              </div>
              
              <small v-if="slugStatus === 'taken'" style="color: #ef4444; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 4px; margin-top: 4px;">
                <Icon icon="lucide:alert-circle" /> Link sudah dipakai, coba variasi lain
              </small>
              <div v-if="slugStatus === 'taken' && slugSuggestions.length > 0" class="slug-suggestions">
                <small style="color: var(--admin-text-secondary); font-size: 12px; display: block; margin-bottom: 6px;">💡 Saran yang tersedia:</small>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                  <button
                    v-for="s in slugSuggestions"
                    :key="s"
                    type="button"
                    class="slug-suggestion-chip"
                    @click="applySuggestion(s)"
                  >
                    {{ s }}
                  </button>
                </div>
              </div>
              <small v-else-if="slugStatus === 'available'" style="color: #10b981; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 4px; margin-top: 4px;">
                <Icon icon="lucide:check" /> Link tersedia!
              </small>
              <small v-else style="color: var(--admin-text-secondary); font-size: 12px; margin-top: 4px; display: block;">
                Undangan akan bisa diakses di: <strong>{{ form.slug || "slug-anda" }}.mengundanganda.com</strong>
              </small>
            </div>
          </div>

          <!-- Couple Info -->
          <div class="form-section">
            <h3 class="form-section-title"><Icon icon="lucide:users" style="color: var(--admin-primary);" /> Informasi Pasangan</h3>
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
                    <Icon icon="lucide:user" style="font-size: 32px; color: var(--admin-text-secondary); margin-bottom: 8px;" />
                    Upload Foto
                  </div>
                </div>
                <button v-if="form.groom_photo" type="button" class="btn btn-danger btn-sm" style="margin: 12px auto 0; display: flex;" @click="removeGroomPhoto">
                  Hapus Foto
                </button>
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
                    <Icon icon="lucide:user" style="font-size: 32px; color: var(--admin-text-secondary); margin-bottom: 8px;" />
                    Upload Foto
                  </div>
                </div>
                <button v-if="form.bride_photo" type="button" class="btn btn-danger btn-sm" style="margin: 12px auto 0; display: flex;" @click="removeBridePhoto">
                  Hapus Foto
                </button>
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
            <h3 class="form-section-title"><Icon icon="lucide:image" style="color: var(--admin-primary);" /> Foto Sampul</h3>
            <p class="form-section-subtitle">
              Foto utama yang ditampilkan di halaman depan undangan
            </p>
            <div
              class="photo-upload-zone"
              @click="($refs.coverPhotoInput as HTMLInputElement).click()"
            >
              <div v-if="form.cover_photo" style="position: relative; display: inline-block;">
                <img
                  :src="getPhotoUrl(form.cover_photo)"
                  alt="Foto sampul"
                  style="max-height: 200px; border-radius: 8px; display: block;"
                />
                <button
                  type="button"
                  title="Hapus foto"
                  style="position: absolute; top: -10px; right: -10px; width: 26px; height: 26px; background: #ef4444; color: white; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.15);"
                  @click.stop="removeCoverPhoto"
                >
                  ✕
                </button>
              </div>
              <div v-else>
                <Icon icon="lucide:camera" class="upload-icon" style="color: var(--admin-text-secondary);" />
                <div class="upload-text">Klik atau drag foto ke sini</div>
                <div class="upload-hint">JPG, PNG, WebP • Max 20MB</div>
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
            <h3 class="form-section-title"><Icon icon="lucide:calendar-days" style="color: var(--admin-primary);" /> Detail Acara</h3>
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
                  <Icon icon="lucide:heart-handshake" style="vertical-align: -4px; margin-right: 6px; color: var(--admin-primary);" /> Akad Nikah
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
                  <Icon icon="lucide:party-popper" style="vertical-align: -4px; margin-right: 6px; color: var(--admin-primary);" /> Resepsi
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
            <h3 class="form-section-title"><Icon icon="lucide:heart" style="color: var(--admin-primary);" /> Love Story</h3>
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
            <h3 class="form-section-title"><Icon icon="lucide:images" style="color: var(--admin-primary);" /> Galeri Foto</h3>
            <p class="form-section-subtitle">
              Upload foto-foto prewedding atau momen spesial
            </p>

            <!-- Gallery Type Selector -->
            <div class="gallery-type-selector">
              <label class="form-label" style="margin-bottom: 10px; display: block;">Tipe Tampilan Galeri</label>
              <div class="gallery-type-options">
                <button type="button" class="gallery-type-btn" :class="{ active: form.gallery_type === 'carousel' }" @click="form.gallery_type = 'carousel'">
                  <Icon icon="lucide:gallery-horizontal-end" style="font-size: 22px;" />
                  <span>Carousel</span>
                  <small>Slideshow satu per satu</small>
                </button>
                <button type="button" class="gallery-type-btn" :class="{ active: form.gallery_type === 'masonry' }" @click="form.gallery_type = 'masonry'">
                  <Icon icon="lucide:layout-grid" style="font-size: 22px;" />
                  <span>Masonry</span>
                  <small>Grid bertumpuk estetik</small>
                </button>
              </div>
            </div>

            <div
              class="photo-upload-zone"
              @click="($refs.galleryInput as HTMLInputElement).click()"
            >
              <Icon icon="lucide:image-plus" class="upload-icon" style="color: var(--admin-text-secondary);" />
              <div class="upload-text">Klik atau drag foto ke sini</div>
              <div class="upload-hint">Bisa upload banyak foto sekaligus • Max 20MB per foto</div>
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
                  @click="removeGalleryPhoto(index)"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <!-- Quote -->
          <div class="form-section">
            <h3 class="form-section-title"><Icon icon="lucide:quote" style="color: var(--admin-primary);" /> Kutipan / Ayat</h3>
            <p class="form-section-subtitle">Kutipan atau ayat yang ditampilkan di undangan</p>
            <div class="form-group">
              <label class="form-label">Kutipan / Ayat</label>
              <textarea
                v-model="form.quote"
                class="form-input"
                rows="3"
              ></textarea>
            </div>
          </div>

          <!-- Bank Accounts (Gift) -->
          <div class="form-section">
            <h3 class="form-section-title"><Icon icon="lucide:wallet" style="color: var(--admin-primary);" /> Informasi Bank (Gift)</h3>
            <p class="form-section-subtitle">Rekening untuk amplop digital. Bisa lebih dari satu.</p>

            <div
              v-for="(bank, index) in form.banks"
              :key="index"
              class="bank-item"
            >
              <div class="bank-item-header">
                <span class="bank-item-number">Bank {{ index + 1 }}</span>
                <button
                  type="button"
                  class="btn btn-danger btn-icon btn-sm"
                  @click="form.banks.splice(index, 1)"
                  title="Hapus bank"
                >
                  ×
                </button>
              </div>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Nama Bank</label>
                  <input v-model="bank.bank_name" class="form-input" placeholder="BCA" />
                </div>
                <div class="form-group">
                  <label class="form-label">No. Rekening</label>
                  <input v-model="bank.bank_account" class="form-input" placeholder="1234567890" />
                </div>
                <div class="form-group full-width">
                  <label class="form-label">Atas Nama</label>
                  <input v-model="bank.bank_holder" class="form-input" placeholder="Ahmad Andi Pratama" />
                </div>
              </div>
            </div>

            <button
              v-if="form.banks.length < 2"
              type="button"
              class="btn btn-outline"
              @click="form.banks.push({ bank_name: '', bank_account: '', bank_holder: '' })"
            >
              + Tambah Rekening (Maks. 2)
            </button>
          </div>
          <!-- Background Music -->
          <div class="form-section">
            <h3 class="form-section-title"><Icon icon="lucide:music" style="color: var(--admin-primary);" /> Musik Latar</h3>
            <p class="form-section-subtitle">Lagu yang berputar otomatis saat undangan dibuka</p>
            <div class="form-group">
              <!-- Musik Default Aktif -->
              <div v-if="form.music_url && isCurrentMusicDefault" style="background: var(--admin-surface); border: 1px solid var(--admin-border); border-radius: var(--radius-md); padding: 20px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                  <Icon icon="ph:music-notes-simple-fill" style="color: var(--admin-primary); font-size: 20px;" />
                  <div>
                    <div style="font-size: 13px; color: var(--admin-text-secondary);">Musik Default Tema</div>
                    <strong style="font-size: 14px;">{{ currentDefaultMusicLabel }}</strong>
                  </div>
                </div>
                <audio controls :src="form.music_url" style="width: 100%; height: 40px; margin-bottom: 12px;"></audio>
                <button type="button" class="btn btn-outline btn-sm" @click.stop="musicFileInput?.click()" style="font-size: 13px;">
                  <Icon icon="lucide:upload" style="font-size: 14px;" /> Ganti dengan Lagu Sendiri
                </button>
              </div>
              <!-- Musik Custom (Upload User) -->
              <div v-else-if="form.music_url" style="background: var(--admin-surface); border: 1px solid var(--admin-border); border-radius: var(--radius-md); padding: 20px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                  <Icon icon="lucide:headphones" style="color: var(--admin-primary); font-size: 20px;" />
                  <div>
                    <div style="font-size: 13px; color: var(--admin-text-secondary);">Lagu Custom</div>
                    <strong style="font-size: 14px;">Lagu Terpilih</strong>
                  </div>
                </div>
                <audio controls :src="resolveAssetUrl(form.music_url, apiBase)" style="width: 100%; height: 40px; margin-bottom: 12px;"></audio>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                  <button type="button" class="btn btn-outline btn-sm" @click.stop="musicFileInput?.click()" style="font-size: 13px;">
                    <Icon icon="lucide:upload" style="font-size: 14px;" /> Ganti Lagu
                  </button>
                  <button type="button" class="btn btn-outline btn-sm" @click.stop="restoreDefaultMusic" style="font-size: 13px;">
                    <Icon icon="lucide:undo-2" style="font-size: 14px;" /> Kembalikan ke Default
                  </button>
                  <button type="button" class="btn btn-danger btn-sm" @click.stop="removeMusic" style="font-size: 13px;">
                    Hapus Lagu
                  </button>
                </div>
              </div>
              <!-- Tidak Ada Musik -->
              <div v-else class="photo-upload-zone" style="padding: 24px;" @click="musicFileInput?.click()">
                <Icon icon="lucide:music-4" class="upload-icon" style="color: var(--admin-text-secondary);" />
                <div class="upload-text">Upload File Audio</div>
                <div class="upload-hint">Format bebas: .mp3, .m4a, .wav • Max 20MB</div>
                <button type="button" class="btn btn-outline btn-sm" style="margin-top: 12px; font-size: 13px;" @click.stop="restoreDefaultMusic">
                  <Icon icon="lucide:undo-2" style="font-size: 14px;" /> Gunakan Musik Default
                </button>
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
            <router-link to="/dashboard" class="btn btn-outline btn-lg"
              >Batal</router-link
            >
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              :disabled="submitting || slugStatus === 'taken' || slugStatus === 'loading'"
            >
              <span
                v-if="submitting"
                class="loading-spinner"
                style="margin-right: 8px"
              ></span>
              <span v-if="!submitting" style="margin-right: 8px; vertical-align: -3px;"><Icon icon="lucide:save" /></span>
              {{ submitting ? "Menyimpan..." : "Simpan Perubahan" }}
            </button>
          </div>
            </form>
          </div>

          <!-- Area Kanan: Live Preview (Desktop) -->
          <div class="editor-preview-area">
            <!-- Iframe Live Preview -->
            <iframe 
              ref="previewIframe" 
              class="editor-preview-iframe"
              :src="`/invitation/preview`"
              title="Live Preview"
            ></iframe>
          </div>
        </div>

        <!-- Tombol FAB Mobile Preview -->
        <button class="mobile-preview-fab" @click="showMobilePreview = true">
          <Icon icon="lucide:eye" style="font-size: 20px;" /> Lihat Preview
        </button>

        <!-- Modal Fullscreen Mobile Preview -->
        <div v-if="showMobilePreview" class="mobile-preview-modal block">
          <div class="mobile-preview-header">
            <span style="display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-rounded" style="color: var(--admin-primary); font-size: 20px;">visibility</span>
              Live Preview
            </span>
            <button class="btn btn-outline btn-sm" @click="showMobilePreview = false" style="border: none; padding: 4px;">
              <span class="material-symbols-rounded">close</span>
            </button>
          </div>
          <div style="flex: 1; height: calc(100vh - 60px);">
            <!-- Gunakan iframe yang sama secara logic, ditaruh penuh -->
            <iframe 
              ref="mobilePreviewIframe" 
              class="editor-preview-iframe"
              :src="`/invitation/preview`"
              title="Live Preview Mobile"
            ></iframe>
          </div>
        </div>
        <!-- Modal Pilih Tema -->
    <div v-if="showThemeModal" class="modal-overlay" @click.self="showThemeModal = false">
      <div class="modal-content" style="max-width: 800px; width: 90%;">
        <div class="modal-title" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <span style="display: flex; align-items: center; gap: 8px;"><Icon icon="lucide:palette" style="color: var(--admin-primary)" /> Pilih Tema Undangan</span>
          <button type="button" class="btn btn-outline btn-sm" @click="showThemeModal = false" style="border: none; padding: 4px;">
            <Icon icon="lucide:x" style="font-size: 20px;" />
          </button>
        </div>
        
        <div class="edit-theme-grid">
          <div class="edit-theme-card" :class="{ active: form.theme === 'elegant' }" @click="selectTheme('elegant')">
            <div class="edit-theme-preview" style="background: #2c2417; color: #fff;">
              <div style="font-size: 8px; letter-spacing: 3px; color: #c9a96e; text-transform: uppercase;">The Wedding Of</div>
              <div style="font-family: 'Great Vibes', cursive; font-size: 22px; margin-top: 4px;">Romeo & Juliet</div>
            </div>
            <div class="edit-theme-label">Elegant Gold</div>
            <div v-if="form.theme === 'elegant'" class="edit-theme-active-badge">Aktif</div>
          </div>
          <div class="edit-theme-card" :class="{ active: form.theme === 'floral' }" @click="selectTheme('floral')">
            <div class="edit-theme-preview" style="background: #4a5d4e; color: #fff;">
              <div style="font-size: 8px; letter-spacing: 3px; color: #e6e0d4; text-transform: uppercase;">The Wedding</div>
              <div style="font-family: 'Playfair Display', serif; font-size: 20px; font-style: italic; margin-top: 4px;">Romeo & Juliet</div>
            </div>
            <div class="edit-theme-label">Floral</div>
            <div v-if="form.theme === 'floral'" class="edit-theme-active-badge">Aktif</div>
          </div>
          <div class="edit-theme-card" :class="{ active: form.theme === 'minimalist' }" @click="selectTheme('minimalist')">
            <div class="edit-theme-preview" style="background: #f9f9f9; color: #111; border: 1px solid #eee;">
              <div style="font-size: 8px; letter-spacing: 5px; color: #666; text-transform: uppercase;">Wedding</div>
              <div style="font-family: 'Inter', sans-serif; font-weight: 300; font-size: 22px; margin-top: 4px; letter-spacing: -1px;">R & J</div>
            </div>
            <div class="edit-theme-label">Clean Minimalist</div>
            <div v-if="form.theme === 'minimalist'" class="edit-theme-active-badge">Aktif</div>
          </div>
          <div class="edit-theme-card" :class="{ active: form.theme === 'elegant_blue' }" @click="selectTheme('elegant_blue')">
            <div class="edit-theme-preview" style="background: #1e3a8a; color: #fff;">
              <div style="font-size: 8px; letter-spacing: 3px; color: #A3B5C3; text-transform: uppercase;">The Wedding Of</div>
              <div style="font-family: 'Playfair Display', serif; font-size: 22px; margin-top: 4px;">Romeo & Juliet</div>
            </div>
            <div class="edit-theme-label">Elegant Blue</div>
            <div v-if="form.theme === 'elegant_blue'" class="edit-theme-active-badge">Aktif</div>
          </div>
        </div>
      </div>
    </div>

  </template>
    </div>

    <!-- Toast -->
    <div v-if="toast" :class="['toast', `toast-${toast.type}`]">
      {{ toast.message }}
    </div>
  </div>
</template>

<style scoped>
.spin-icon {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.input-error {
  border-color: #ef4444 !important;
  background-color: #fef2f2 !important;
}
.input-success {
  border-color: #10b981 !important;
}

.slug-suggestions {
  margin-top: 8px;
  padding: 10px 12px;
  background: var(--admin-surface, #f8fafc);
  border: 1px solid var(--admin-border, #e2e8f0);
  border-radius: 8px;
}

.slug-suggestion-chip {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--admin-primary, #3b82f6);
  background: white;
  border: 1px solid var(--admin-primary, #3b82f6);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.slug-suggestion-chip:hover {
  background: var(--admin-primary, #3b82f6);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.gallery-type-selector {
  margin-bottom: 20px;
  padding: 16px;
  background: var(--admin-surface, #f8fafc);
  border: 1px solid var(--admin-border, #e2e8f0);
  border-radius: var(--radius-md, 12px);
}
.gallery-type-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.gallery-type-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 12px;
  border: 2px solid var(--admin-border, #e2e8f0);
  border-radius: var(--radius-md, 12px);
  background: white;
  cursor: pointer;
  transition: all 0.25s ease;
  color: var(--admin-text-secondary, #64748b);
}
.gallery-type-btn span {
  font-size: 14px;
  font-weight: 600;
}
.gallery-type-btn small {
  font-size: 11px;
  opacity: 0.7;
}
.gallery-type-btn:hover {
  border-color: var(--admin-primary, #3b82f6);
  color: var(--admin-primary, #3b82f6);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.gallery-type-btn.active {
  border-color: var(--admin-primary, #3b82f6);
  background: var(--admin-primary, #3b82f6);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}
.gallery-type-btn.active small {
  opacity: 0.85;
}

.bank-item {
  padding: 20px;
  background: var(--admin-bg, #f8fafc);
  border: 1px solid var(--admin-border, #e2e8f0);
  border-radius: var(--radius-md, 12px);
  margin-bottom: 16px;
  transition: border-color 0.2s ease;
}
.bank-item:hover {
  border-color: var(--admin-primary, #3b82f6);
}
.bank-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.bank-item-number {
  font-size: 14px;
  font-weight: 600;
  color: var(--admin-primary, #3b82f6);
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useInvitationStore } from "@/stores/invitation";
import type { LoveStoryItem, Photo, BankAccount } from "@/types/invitation";
import { resolveAssetUrl } from "@/utils/url";
import { DEFAULT_MUSIC, isDefaultMusicUrl } from "@/config/defaultMusic";
import { computed } from "vue";

const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const route = useRoute();
const router = useRouter();
const store = useInvitationStore();
const apiBase = import.meta.env.VITE_API_URL || "";

const showThemeModal = ref(false);

const themeGalleryDefaults: Record<string, 'carousel' | 'masonry'> = {
  floral: 'carousel',
  elegant: 'masonry',
  minimalist: 'masonry',
  elegant_blue: 'masonry',
};

function selectTheme(themeId: "elegant" | "minimalist" | "floral" | "elegant_blue") {
  if (form) {
    const oldTheme = form.theme;
    form.theme = themeId;
    form.gallery_type = themeGalleryDefaults[themeId] || 'carousel';
    // Auto-ganti musik ke default tema baru jika masih pakai default tema lama atau belum ada musik
    if (!form.music_url || (DEFAULT_MUSIC[oldTheme] && form.music_url === DEFAULT_MUSIC[oldTheme].url)) {
      form.music_url = DEFAULT_MUSIC[themeId]?.url || "";
    }
  }
  showThemeModal.value = false;
}

const loading = ref(true);
const submitting = ref(false);
const toast = ref<{ type: string; message: string } | null>(null);
const musicFileInput = ref<HTMLInputElement>();

const slugStatus = ref<"idle" | "loading" | "available" | "taken">("idle");
const slugSuggestions = ref<string[]>([]);
let slugCheckTimeout: ReturnType<typeof setTimeout> | null = null;

// Preview Refs & State
const previewIframe = ref<HTMLIFrameElement>();
const mobilePreviewIframe = ref<HTMLIFrameElement>();
const showMobilePreview = ref(false);

const form = reactive({
  slug: "",
  theme: "elegant" as "elegant" | "minimalist" | "floral" | "elegant_blue",
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
  banks: [] as BankAccount[],
  music_url: "",
  gallery_type: 'carousel' as 'carousel' | 'masonry',
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

function handleSlugInput() {
  form.slug = form.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-");

  slugSuggestions.value = [];

  if (!form.slug) {
    slugStatus.value = "idle";
    return;
  }

  slugStatus.value = "loading";
  
  if (slugCheckTimeout) clearTimeout(slugCheckTimeout);
  slugCheckTimeout = setTimeout(async () => {
    try {
      const excludeId = route.params.id;
      const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api';
      const res = await fetch(`${API_BASE}/invitations/check-slug/${form.slug}?exclude_id=${excludeId}`);
      const data = await res.json();
      
      if (res.ok) {
        slugStatus.value = data.available ? "available" : "taken";
        if (!data.available && data.suggestions) {
          slugSuggestions.value = data.suggestions;
        }
      } else {
        slugStatus.value = "idle";
      }
    } catch {
      slugStatus.value = "idle";
    }
  }, 500);
}

function applySuggestion(suggestion: string) {
  form.slug = suggestion;
  slugSuggestions.value = [];
  slugStatus.value = "loading";
  setTimeout(async () => {
    try {
      const excludeId = route.params.id;
      const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api';
      const res = await fetch(`${API_BASE}/invitations/check-slug/${form.slug}?exclude_id=${excludeId}`);
      const data = await res.json();
      if (res.ok) {
        slugStatus.value = data.available ? "available" : "taken";
        if (!data.available && data.suggestions) {
          slugSuggestions.value = data.suggestions;
        }
      }
    } catch {
      slugStatus.value = "idle";
    }
  }, 100);
}

async function handleSingleUpload(
  event: Event,
  field: "groom_photo" | "bride_photo" | "cover_photo",
) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  if (file.size > MAX_FILE_SIZE_BYTES) {
    showToast("error", `Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal ${MAX_FILE_SIZE_MB}MB.`);
    input.value = "";
    return;
  }
  try {
    const oldUrl = form[field];
    const newUrl = await store.uploadPhoto(file, form.slug || undefined);
    if (oldUrl) {
      await store.deleteFile(oldUrl).catch(() => {});
    }
    form[field] = newUrl;
  } catch {
    showToast("error", "Gagal upload foto");
  }
  input.value = "";
}

async function handleGalleryUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files || []);
  if (files.length === 0) return;
  const oversized = files.filter(f => f.size > MAX_FILE_SIZE_BYTES);
  if (oversized.length > 0) {
    showToast("error", `${oversized.length} file melebihi batas ${MAX_FILE_SIZE_MB}MB dan dilewati.`);
  }
  const validFiles = files.filter(f => f.size <= MAX_FILE_SIZE_BYTES);
  if (validFiles.length === 0) {
    input.value = "";
    return;
  }
  try {
    const results = await store.uploadPhotos(validFiles, form.slug || undefined);
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
  if (file.size > MAX_FILE_SIZE_BYTES) {
    showToast("error", `Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal ${MAX_FILE_SIZE_MB}MB.`);
    input.value = "";
    return;
  }
  try {
    const url = await store.uploadMusic(file, form.slug || undefined);
    if (form.music_url) {
      await store.deleteFile(form.music_url).catch(() => {});
    }
    form.music_url = url;
    showToast("success", "Musik berhasil diupload");
  } catch {
    showToast("error", "Gagal upload musik");
  }
  input.value = "";
}

async function removeMusic() {
  if (form.music_url) {
    // Jangan hapus file R2 jika ini adalah musik default
    if (!isDefaultMusicUrl(form.music_url)) {
      await store.deleteFile(form.music_url).catch(() => {});
    }
    form.music_url = "";
  }
}

function restoreDefaultMusic() {
  const defaultEntry = DEFAULT_MUSIC[form.theme];
  if (defaultEntry) {
    form.music_url = defaultEntry.url;
  }
}

const isCurrentMusicDefault = computed(() => {
  return isDefaultMusicUrl(form.music_url);
});

const currentDefaultMusicLabel = computed(() => {
  const entry = Object.values(DEFAULT_MUSIC).find((e) => e.url === form.music_url);
  return entry?.label || 'Musik Default';
});

async function removeCoverPhoto() {
  if (form.cover_photo) {
    await store.deleteFile(form.cover_photo).catch(() => {});
    form.cover_photo = "";
  }
}

async function removeGroomPhoto() {
  if (form.groom_photo) {
    await store.deleteFile(form.groom_photo).catch(() => {});
    form.groom_photo = "";
  }
}

async function removeBridePhoto() {
  if (form.bride_photo) {
    await store.deleteFile(form.bride_photo).catch(() => {});
    form.bride_photo = "";
  }
}

async function removeGalleryPhoto(index: number) {
  const photo = form.photos[index];
  if (photo && photo.url) {
    await store.deleteFile(photo.url).catch(() => {});
  }
  form.photos.splice(index, 1);
}

function showToast(type: string, message: string) {
  toast.value = { type, message };
  setTimeout(() => {
    toast.value = null;
  }, 3000);
}

// Watch form changes to sync with Preview Iframe
import { watch } from "vue";
watch(
  form,
  (newVal) => {
    const payload = {
      type: "LIVE_PREVIEW",
      data: {
        ...newVal,
        love_story: newVal.love_story.filter((s) => s.title || s.date),
      }
    };
    const cleanPayload = JSON.parse(JSON.stringify(payload));
    if (previewIframe.value?.contentWindow) {
      previewIframe.value.contentWindow.postMessage(cleanPayload, "*");
    }
    if (mobilePreviewIframe.value?.contentWindow) {
      mobilePreviewIframe.value.contentWindow.postMessage(cleanPayload, "*");
    }
  },
  { deep: true }
);

// Listener for PREVIEW_READY from iframe
onMounted(() => {
  window.addEventListener("message", (event) => {
    if (event.data?.type === "PREVIEW_READY") {
      const payload = {
        type: "LIVE_PREVIEW",
        data: {
          ...form,
          love_story: form.love_story.filter((s) => s.title || s.date),
        }
      };
      const cleanPayload = JSON.parse(JSON.stringify(payload));
      if (previewIframe.value?.contentWindow) {
        previewIframe.value.contentWindow.postMessage(cleanPayload, "*");
      }
      if (mobilePreviewIframe.value?.contentWindow) {
        mobilePreviewIframe.value.contentWindow.postMessage(cleanPayload, "*");
      }
    }
  });
});

async function handleSubmit() {
  submitting.value = true;
  try {
    const id = route.params.id as string;
    await store.updateInvitation(id, {
      slug: form.slug,
      theme: form.theme,
      groom_name: form.groom_name,
      bride_name: form.bride_name,
      groom_full_name: form.groom_full_name,
      bride_full_name: form.bride_full_name,
      groom_father: form.groom_father,
      groom_mother: form.groom_mother,
      bride_father: form.bride_father,
      bride_mother: form.bride_mother,
      groom_photo: form.groom_photo,
      bride_photo: form.bride_photo,
      cover_photo: form.cover_photo,
      akad_date: form.akad_date,
      akad_time: form.akad_time,
      akad_venue: form.akad_venue,
      akad_address: form.akad_address,
      akad_map_url: form.akad_map_url,
      resepsi_date: form.resepsi_date,
      resepsi_time: form.resepsi_time,
      resepsi_venue: form.resepsi_venue,
      resepsi_address: form.resepsi_address,
      resepsi_map_url: form.resepsi_map_url,
      love_story: form.love_story.filter((s) => s.title || s.date),
      quote: form.quote,
      bank_name: form.banks[0]?.bank_name || "",
      bank_account: form.banks[0]?.bank_account || "",
      bank_holder: form.banks[0]?.bank_holder || "",
      banks: form.banks.filter((b) => b.bank_name || b.bank_account),
      music_url: form.music_url,
      gallery_type: form.gallery_type,
      photos: form.photos,
    });
    showToast("success", "Undangan berhasil diperbarui! 🎉");
    setTimeout(() => router.push("/dashboard"), 1500);
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
    form.slug = data.slug || "";
    form.theme = data.theme || "elegant";
    form.groom_name = data.groom_name || "";
    form.bride_name = data.bride_name || "";
    form.groom_full_name = data.groom_full_name || "";
    form.bride_full_name = data.bride_full_name || "";
    form.groom_father = data.groom_father || "";
    form.groom_mother = data.groom_mother || "";
    form.bride_father = data.bride_father || "";
    form.bride_mother = data.bride_mother || "";
    form.groom_photo = data.groom_photo || "";
    form.bride_photo = data.bride_photo || "";
    form.cover_photo = data.cover_photo || "";
    form.akad_date = data.akad_date || "";
    form.akad_time = data.akad_time || "";
    form.akad_venue = data.akad_venue || "";
    form.akad_address = data.akad_address || "";
    form.akad_map_url = data.akad_map_url || "";
    form.resepsi_date = data.resepsi_date || "";
    form.resepsi_time = data.resepsi_time || "";
    form.resepsi_venue = data.resepsi_venue || "";
    form.resepsi_address = data.resepsi_address || "";
    form.resepsi_map_url = data.resepsi_map_url || "";
    form.love_story = normalizeLoveStory(data.love_story);
    form.quote = data.quote || "";
    // Load banks: prefer banks array, fallback to legacy single fields
    if (data.banks && Array.isArray(data.banks) && data.banks.length > 0) {
      form.banks = data.banks;
    } else if (data.bank_name) {
      form.banks = [{ bank_name: data.bank_name, bank_account: data.bank_account || "", bank_holder: data.bank_holder || "" }];
    } else {
      form.banks = [];
    }
    form.music_url = data.music_url || "";
    form.gallery_type = data.gallery_type || themeGalleryDefaults[data.theme || 'elegant'] || 'carousel';
    form.photos = data.photos || [];
  }
  loading.value = false;
});
</script>


