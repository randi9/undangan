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
      <div class="editor-layout">
        <!-- Area Kiri: Form Isian -->
        <div class="editor-form-area">
          <h1 class="admin-page-title" style="display: flex; justify-content: space-between; align-items: center;">
            <span style="display: flex; align-items: center; gap: 8px;"><Icon icon="lucide:sparkles" style="color: var(--admin-primary);" /> Buat Undangan Baru</span>
            <button 
              class="btn btn-outline btn-sm mobile-only" 
              @click="showMobilePreview = true"
              style="border-radius: 20px; font-weight: 600;"
            >
              👀 Preview
            </button>
          </h1>
          <p class="admin-page-subtitle">
            Isi informasi di bawah untuk membuat undangan pernikahan
          </p>

          <!-- Onboarding Guide Banner -->
          <div v-if="showGuide" class="onboarding-banner">
            <button class="onboarding-close" @click="dismissGuide" title="Tutup panduan">
              <Icon icon="lucide:x" />
            </button>
            <div class="onboarding-header">
              <Icon icon="lucide:book-open" style="font-size: 20px;" />
              <span>Panduan Singkat Membuat Undangan</span>
            </div>
            <div class="onboarding-steps">
              <div class="onboarding-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <strong>Pilih Tema & Buat URL</strong>
                  <span>Pilih desain undangan, lalu buat alamat unik, contoh: <em>andi-sarah</em></span>
                </div>
              </div>
              <div class="onboarding-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <strong>Isi Data Mempelai</strong>
                  <span>Nama panggilan wajib diisi. Nama lengkap, nama orang tua opsional.</span>
                </div>
              </div>
              <div class="onboarding-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <strong>Upload Foto & Isi Acara</strong>
                  <span>Foto sampul, detail akad/resepsi, galeri, dan musik latar.</span>
                </div>
              </div>
              <div class="onboarding-step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <strong>Klik "Buat Undangan"</strong>
                  <span>Setelah selesai, klik tombol biru di bawah. Undangan langsung bisa disebar!</span>
                </div>
              </div>
            </div>
            <div class="onboarding-footer">
              <Icon icon="lucide:lightbulb" style="color: #f59e0b; flex-shrink: 0;" />
              <span>Yang bertanda <strong>*</strong> wajib diisi. Sisanya opsional — bisa dilengkapi nanti lewat menu <strong>Edit</strong>.</span>
            </div>
          </div>

          <form @submit.prevent="handleSubmit">
            <!-- Theme Selector -->
            <div class="form-section">
              <h3 class="form-section-title"><Icon icon="lucide:palette" style="color: var(--admin-primary);" /> Tema Undangan</h3>
              
              <div class="active-theme-container" style="display: flex; justify-content: space-between; align-items: center; background: var(--admin-surface); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--admin-border);">
                <div>
                  <div style="font-size: 13px; color: var(--admin-text-secondary); margin-bottom: 4px;">Tema saat ini</div>
                  <strong style="text-transform: capitalize; font-size: 16px;">{{ form.theme }}</strong>
                </div>
                <button type="button" class="btn btn-primary" @click="showThemeModal = true">
                  <Icon icon="lucide:arrow-left-right" style="font-size: 16px;" />
                  Ubah Tema
                </button>
              </div>
            </div>

            <!-- Slug -->
            <div class="form-section">
              <h3 class="form-section-title"><Icon icon="lucide:link" style="color: var(--admin-primary);" /> URL Undangan</h3>
              <p class="form-section-subtitle">Slug unik untuk alamat undangan</p>
              <div class="helper-tip">
                <Icon icon="lucide:info" class="helper-tip-icon" />
                <span>Gunakan nama pasangan yang mudah diingat, contoh: <strong>andi-sarah</strong>, <strong>budi-dan-ani</strong>. Tamu akan mengakses undangan di alamat ini.</span>
              </div>
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
          <div class="helper-tip">
            <Icon icon="lucide:info" class="helper-tip-icon" />
            <span>Hanya <strong>Nama Panggilan</strong> yang wajib. Nama lengkap & orang tua opsional tapi akan terlihat lebih lengkap di undangan.</span>
          </div>

          <div class="split-grid">
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
          <h3 class="form-section-title"><Icon icon="lucide:image" style="color: var(--admin-primary);" /> Foto Sampul</h3>
          <p class="form-section-subtitle">
            Foto utama yang ditampilkan di halaman depan undangan
          </p>
          <div class="helper-tip">
            <Icon icon="lucide:info" class="helper-tip-icon" />
            <span>Gunakan foto <strong>portrait</strong> (tegak) untuk hasil terbaik. Foto prewedding sangat direkomendasikan!</span>
          </div>
          <div
            class="photo-upload-zone"
            :class="{ dragover: coverDragover }"
            @click="triggerUpload('cover')"
            @dragover.prevent="coverDragover = true"
            @dragleave="coverDragover = false"
            @drop.prevent="handleCoverDrop"
          >
            <div v-if="form.cover_photo" style="position: relative; display: inline-block;">
              <img
                :src="resolveAssetUrl(form.cover_photo, apiBase)"
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
          <p class="form-section-subtitle">Informasi waktu dan tempat acara</p>
          <div class="helper-tip">
            <Icon icon="lucide:info" class="helper-tip-icon" />
            <span>Isi <strong>tanggal, waktu, tempat, dan alamat</strong> acara. Link Google Maps opsional tapi memudahkan tamu menemukan lokasi.</span>
          </div>

          <div class="split-grid">
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
          <h3 class="form-section-title"><Icon icon="lucide:heart" style="color: var(--admin-primary);" /> Love Story</h3>
          <p class="form-section-subtitle">
            Ceritakan perjalanan cinta kalian (opsional)
          </p>
          <div class="helper-tip">
            <Icon icon="lucide:info" class="helper-tip-icon" />
            <span>Klik <strong>"+ Tambah Cerita"</strong> untuk menambahkan momen, misalnya: "2020 — Pertama Bertemu", "2023 — Lamaran". Bagian ini opsional.</span>
          </div>

          <div
            v-for="(story, index) in form.love_story"
            :key="index"
            class="love-story-item"
          >
            <div style="font-size: 24px; color: var(--admin-primary)">
              {{ index + 1 }}
            </div>
            <div class="story-fields">
              <!-- Photo Upload -->
              <div style="margin-bottom: 8px;">
                <div v-if="story.photo" style="position: relative; display: inline-block;">
                  <img :src="resolveAssetUrl(story.photo, apiBase)" alt="Foto story" style="width: 100%; max-height: 140px; object-fit: cover; border-radius: 8px; border: 1px solid var(--admin-border);" />
                  <button
                    type="button"
                    title="Hapus foto"
                    style="position: absolute; top: -8px; right: -8px; width: 22px; height: 22px; background: #ef4444; color: white; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.15); cursor: pointer;"
                    @click.stop="removeLoveStoryPhoto(index)"
                  >
                    ✕
                  </button>
                </div>
                <button
                  v-else
                  type="button"
                  class="btn btn-outline btn-sm"
                  style="font-size: 12px; padding: 6px 12px; display: flex; align-items: center; gap: 4px;"
                  @click.stop="triggerLoveStoryPhotoUpload(index)"
                >
                  <Icon icon="lucide:image-plus" style="font-size: 14px;" /> Tambah Foto
                </button>
              </div>
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

          <!-- Hidden file input for love story photos -->
          <input
            ref="loveStoryPhotoInput"
            type="file"
            accept="image/*"
            hidden
            @change="handleLoveStoryPhotoUpload"
          />

          <button type="button" class="btn btn-outline" @click="addLoveStory">
            + Tambah Cerita
          </button>
        </div>

        <!-- Gallery -->
        <div class="form-section">
          <h3 class="form-section-title"><Icon icon="lucide:images" style="color: var(--admin-primary);" /> Galeri Foto</h3>
          <p class="form-section-subtitle">
            Upload foto-foto prewedding atau momen spesial
          </p>
          <div class="helper-tip">
            <Icon icon="lucide:info" class="helper-tip-icon" />
            <span>Bisa upload banyak foto sekaligus. Pilih mode <strong>Carousel</strong> (slideshow) atau <strong>Masonry</strong> (grid bertumpuk). Bagian ini opsional.</span>
          </div>

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
            :class="{ dragover: galleryDragover }"
            @click="($refs.galleryInput as HTMLInputElement).click()"
            @dragover.prevent="galleryDragover = true"
            @dragleave="galleryDragover = false"
            @drop.prevent="handleGalleryDrop"
          >
            <Icon icon="lucide:image-plus" class="upload-icon" style="color: var(--admin-text-secondary);" />
            <div class="upload-text">Klik atau drag foto ke sini</div>
            <div class="upload-hint">
              Bisa upload banyak foto sekaligus • JPG, PNG, WebP • Max 20MB per
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

        <!-- Quote -->
        <div class="form-section">
          <h3 class="form-section-title"><Icon icon="lucide:quote" style="color: var(--admin-primary);" /> Kutipan / Ayat</h3>
          <p class="form-section-subtitle">
            Kutipan atau ayat yang ditampilkan di undangan (opsional)
          </p>
          <div class="form-group">
            <label class="form-label">Kutipan / Ayat</label>
            <textarea
              v-model="form.quote"
              class="form-input"
              placeholder="Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan..."
              rows="3"
            ></textarea>
          </div>
        </div>

        <!-- Bank Accounts (Gift) -->
        <div class="form-section">
          <h3 class="form-section-title"><Icon icon="lucide:wallet" style="color: var(--admin-primary);" /> Informasi Bank (Gift)</h3>
          <p class="form-section-subtitle">
            Rekening untuk amplop digital. Bisa lebih dari satu. (opsional)
          </p>
          <div class="helper-tip">
            <Icon icon="lucide:info" class="helper-tip-icon" />
            <span>Tamu bisa mengirim hadiah uang digital. Klik <strong>"+ Tambah Rekening"</strong> lalu isi nama bank, nomor rekening, dan atas nama. Maksimal 2 rekening.</span>
          </div>

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
          <p class="form-section-subtitle">
            Lagu yang berputar otomatis saat undangan dibuka
          </p>
          <div class="helper-tip">
            <Icon icon="lucide:info" class="helper-tip-icon" />
            <span>Setiap tema sudah memiliki musik default. Kamu bisa menggantinya dengan upload lagu sendiri, atau biarkan musik default yang bermain.</span>
          </div>
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
          <router-link to="/dashboard" class="btn btn-outline btn-lg">Batal</router-link>
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
            <span v-if="!submitting" style="margin-right: 8px; vertical-align: -3px;"><Icon icon="lucide:sparkles" /></span>
            {{ submitting ? "Menyimpan..." : "Buat Undangan" }}
          </button>
        </div>
          </form>
        </div>

        <!-- Area Kanan: Live Preview (Desktop) -->
        <div class="editor-preview-area">
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
          <iframe 
            ref="mobilePreviewIframe" 
            class="editor-preview-iframe"
            :src="`/invitation/preview`"
            title="Live Preview Mobile"
          ></iframe>
        </div>
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
}

/* ===== Onboarding Banner ===== */
.onboarding-banner {
  position: relative;
  background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%);
  border: 1px solid #bfdbfe;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 28px;
  animation: slideDown 0.4s ease-out;
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-12px); }
  to { opacity: 1; transform: translateY(0); }
}
.onboarding-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  transition: all 0.2s;
}
.onboarding-close:hover {
  background: rgba(0,0,0,0.05);
  color: #64748b;
}
.onboarding-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 18px;
}
.onboarding-steps {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}
@media (max-width: 640px) {
  .onboarding-steps {
    grid-template-columns: 1fr;
  }
}
.onboarding-step {
  display: flex;
  gap: 12px;
  padding: 12px 14px;
  background: rgba(255,255,255,0.8);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}
.onboarding-step:hover {
  border-color: #93c5fd;
  box-shadow: 0 2px 8px rgba(59,130,246,0.08);
  transform: translateY(-1px);
}
.step-number {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}
.step-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.step-content strong {
  font-size: 13px;
  color: #1e293b;
}
.step-content span {
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
}
.onboarding-footer {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12.5px;
  color: #64748b;
  background: rgba(255,255,255,0.6);
  padding: 10px 14px;
  border-radius: 10px;
  line-height: 1.5;
}

/* ===== Helper Tips ===== */
.helper-tip {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12.5px;
  color: #64748b;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-left: 3px solid #3b82f6;
  padding: 10px 14px;
  border-radius: 0 8px 8px 0;
  margin-top: 8px;
  margin-bottom: 4px;
  line-height: 1.5;
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.helper-tip-icon {
  color: #3b82f6;
  font-size: 15px;
  flex-shrink: 0;
  margin-top: 1px;
}
.helper-tip strong {
  color: #334155;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useInvitationStore } from "@/stores/invitation";
import type { LoveStoryItem, Photo, BankAccount } from "@/types/invitation";
import { resolveAssetUrl } from "@/utils/url";
import { DEFAULT_MUSIC, isDefaultMusicUrl } from "@/config/defaultMusic";
import { computed } from "vue";

const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const router = useRouter();
const route = useRoute();
const store = useInvitationStore();

const showThemeModal = ref(false);

const themeGalleryDefaults: Record<string, 'carousel' | 'masonry'> = {
  floral: 'carousel',
  elegant: 'masonry',
  minimalist: 'masonry',
  elegant_blue: 'masonry',
};

function selectTheme(themeId: "elegant" | "minimalist" | "floral" | "elegant_blue") {
  const oldTheme = form.theme;
  form.theme = themeId;
  form.gallery_type = themeGalleryDefaults[themeId] || 'carousel';
  // Auto-ganti musik ke default tema baru jika masih pakai default tema lama atau belum ada musik
  if (!form.music_url || (DEFAULT_MUSIC[oldTheme] && form.music_url === DEFAULT_MUSIC[oldTheme].url)) {
    form.music_url = DEFAULT_MUSIC[themeId]?.url || "";
  }
  showThemeModal.value = false;
}
const apiBase = import.meta.env.VITE_API_URL || "";

const submitting = ref(false);
const coverDragover = ref(false);
const galleryDragover = ref(false);
const toast = ref<{ type: string; message: string } | null>(null);

const slugStatus = ref<"idle" | "loading" | "available" | "taken">("idle");
const slugSuggestions = ref<string[]>([]);
let slugCheckTimeout: ReturnType<typeof setTimeout> | null = null;

const groomPhotoInput = ref<HTMLInputElement>();
const bridePhotoInput = ref<HTMLInputElement>();
const coverPhotoInput = ref<HTMLInputElement>();
const musicFileInput = ref<HTMLInputElement>();

// Preview Refs & State
const previewIframe = ref<HTMLIFrameElement>();
const mobilePreviewIframe = ref<HTMLIFrameElement>();
const showMobilePreview = ref(false);
const showGuide = ref(localStorage.getItem('hideCreateGuide') !== 'true');

function dismissGuide() {
  showGuide.value = false;
  localStorage.setItem('hideCreateGuide', 'true');
}

const form = reactive({
  slug: "",
  theme:
    (route.query.theme as "elegant" | "minimalist" | "floral" | "elegant_blue") || "elegant",
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
  music_url: DEFAULT_MUSIC[(route.query.theme as string) || 'elegant']?.url || "",
  gallery_type: themeGalleryDefaults[(route.query.theme as string) || 'elegant'] || 'carousel' as 'carousel' | 'masonry',
  photos: [] as Photo[],
});

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
      const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api';
      const res = await fetch(`${API_BASE}/invitations/check-slug/${form.slug}`);
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
  // Re-check the suggestion to confirm it
  setTimeout(async () => {
    try {
      const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api';
      const res = await fetch(`${API_BASE}/invitations/check-slug/${form.slug}`);
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
  if (file.size > MAX_FILE_SIZE_BYTES) {
    showToast("error", `Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal ${MAX_FILE_SIZE_MB}MB.`);
    input.value = "";
    return;
  }

  try {
    const oldUrl = form[field];
    const url = await store.uploadPhoto(file, form.slug || undefined);
    if (oldUrl) {
      await store.deleteFile(oldUrl).catch(() => {});
    }
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

async function handleCoverDrop(event: DragEvent) {
  coverDragover.value = false;
  const file = event.dataTransfer?.files[0];
  if (!file || !file.type.startsWith("image/")) return;
  if (file.size > MAX_FILE_SIZE_BYTES) {
    showToast("error", `Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal ${MAX_FILE_SIZE_MB}MB.`);
    return;
  }
  try {
    form.cover_photo = await store.uploadPhoto(file, form.slug || undefined);
  } catch {
    showToast("error", "Gagal upload foto");
  }
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

async function handleGalleryDrop(event: DragEvent) {
  galleryDragover.value = false;
  const files = Array.from(event.dataTransfer?.files || []).filter((f) =>
    f.type.startsWith("image/"),
  );
  if (files.length === 0) return;
  const oversized = files.filter(f => f.size > MAX_FILE_SIZE_BYTES);
  if (oversized.length > 0) {
    showToast("error", `${oversized.length} file melebihi batas ${MAX_FILE_SIZE_MB}MB dan dilewati.`);
  }
  const validFiles = files.filter(f => f.size <= MAX_FILE_SIZE_BYTES);
  if (validFiles.length === 0) return;

  try {
    const results = await store.uploadPhotos(validFiles, form.slug || undefined);
    results.forEach((r) => {
      form.photos.push({ url: r.url, caption: "" });
    });
  } catch {
    showToast("error", "Gagal upload foto");
  }
}

async function removeGalleryPhoto(index: number) {
  const photo = form.photos[index];
  if (photo && photo.url) {
    await store.deleteFile(photo.url).catch(() => {});
  }
  form.photos.splice(index, 1);
}

function addLoveStory() {
  form.love_story.push({ date: "", title: "", description: "", photo: "" });
}

function removeLoveStory(index: number) {
  form.love_story.splice(index, 1);
}

// --- Love Story Photo Upload ---
const loveStoryPhotoInput = ref<HTMLInputElement>();
let loveStoryPhotoTargetIndex = -1;

function triggerLoveStoryPhotoUpload(index: number) {
  loveStoryPhotoTargetIndex = index;
  loveStoryPhotoInput.value?.click();
}

async function handleLoveStoryPhotoUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file || loveStoryPhotoTargetIndex < 0) return;
  if (file.size > MAX_FILE_SIZE_BYTES) {
    showToast("error", `Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal ${MAX_FILE_SIZE_MB}MB.`);
    input.value = "";
    return;
  }
  try {
    const url = await store.uploadPhoto(file, form.slug || undefined);
    const story = form.love_story[loveStoryPhotoTargetIndex];
    if (story) {
      if (story.photo) {
        await store.deleteFile(story.photo).catch(() => {});
      }
      story.photo = url;
    }
  } catch {
    showToast("error", "Gagal upload foto love story");
  }
  input.value = "";
  loveStoryPhotoTargetIndex = -1;
}

async function removeLoveStoryPhoto(index: number) {
  const story = form.love_story[index];
  if (!story?.photo) return;
  await store.deleteFile(story.photo).catch(() => {});
  story.photo = '';
}

function showToast(type: string, message: string) {
  toast.value = { type, message };
  setTimeout(() => {
    toast.value = null;
  }, 3000);
}

// Watch form changes to sync with Preview Iframe
import { watch, onMounted } from "vue";
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
  if (!form.slug || !form.groom_name || !form.bride_name) {
    showToast("error", "Slug, nama mempelai pria dan wanita wajib diisi");
    return;
  }

  submitting.value = true;
  try {
    const filteredBanks = form.banks.filter((b) => b.bank_name || b.bank_account);
    await store.createInvitation({
      ...form,
      love_story: form.love_story.filter((s) => s.title || s.date),
      bank_name: filteredBanks[0]?.bank_name || "",
      bank_account: filteredBanks[0]?.bank_account || "",
      bank_holder: filteredBanks[0]?.bank_holder || "",
      banks: filteredBanks,
    });
    showToast("success", "Undangan berhasil dibuat! 🎉");
    setTimeout(() => router.push("/dashboard"), 1500);
  } catch (e: any) {
    showToast("error", e.message || "Gagal membuat undangan");
  } finally {
    submitting.value = false;
  }
}
</script>