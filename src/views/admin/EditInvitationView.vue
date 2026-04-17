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
      <!-- Skeletons while Loading (Editor Form Array) -->
      <div v-if="loading" class="editor-layout">
        <div class="editor-form-area" style="width: 100%;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <AppSkeleton height="32px" width="200px" />
            <AppSkeleton height="32px" width="100px" rounded="full" />
          </div>
          
          <div class="form-section" v-for="i in 3" :key="`skel-sec-${i}`">
            <AppSkeleton height="24px" width="150px" style="margin-bottom: 8px;" />
            <AppSkeleton height="14px" width="250px" style="margin-bottom: 24px;" />
            
            <AppSkeleton height="16px" width="120px" style="margin-bottom: 8px;" />
            <AppSkeleton height="42px" width="100%" rounded="md" style="margin-bottom: 16px;" />
            
            <div class="split-grid" v-if="i === 2">
              <div>
                <AppSkeleton height="20px" width="120px" style="margin-bottom: 16px;" />
                <AppSkeleton height="160px" width="160px" rounded="lg" style="margin-bottom: 16px; margin: 0 auto; display: block;" />
                <AppSkeleton height="16px" width="100px" style="margin-bottom: 8px;" />
                <AppSkeleton height="42px" width="100%" rounded="md" style="margin-bottom: 12px;" />
                <AppSkeleton height="16px" width="100px" style="margin-bottom: 8px;" />
                <AppSkeleton height="42px" width="100%" rounded="md" />
              </div>
              <div>
                <AppSkeleton height="20px" width="120px" style="margin-bottom: 16px;" />
                <AppSkeleton height="160px" width="160px" rounded="lg" style="margin-bottom: 16px; margin: 0 auto; display: block;" />
                <AppSkeleton height="16px" width="100px" style="margin-bottom: 8px;" />
                <AppSkeleton height="42px" width="100%" rounded="md" style="margin-bottom: 12px;" />
                <AppSkeleton height="16px" width="100px" style="margin-bottom: 8px;" />
                <AppSkeleton height="42px" width="100%" rounded="md" />
              </div>
            </div>
          </div>
        </div>
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
                @click="previewPanel?.openMobilePreview()"
                style="border-radius: 20px; font-weight: 600;"
              >
                👀 Preview
              </button>
            </h1>
            <p class="admin-page-subtitle">
              {{ form.groom_name }} & {{ form.bride_name }}
            </p>

            <form @submit.prevent="handleSubmit">

            <!-- Wizard Stepper -->
            <div class="wizard-stepper">
              <template v-for="(step, i) in wizard.steps" :key="step.id">
                <div
                  class="wizard-step"
                  :class="{ active: i === wizard.currentStepIndex.value, completed: i < wizard.currentStepIndex.value }"
                  @click="wizard.goToStep(i)"
                >
                  <div class="wizard-step-number">
                    <Icon v-if="i < wizard.currentStepIndex.value" icon="lucide:check" style="font-size: 14px;" />
                    <span v-else>{{ i + 1 }}</span>
                  </div>
                  <span class="wizard-step-label">{{ step.label }}</span>
                </div>
                <div
                  v-if="i < wizard.steps.length - 1"
                  class="wizard-step-connector"
                  :class="{ completed: i < wizard.currentStepIndex.value }"
                />
              </template>
            </div>

            <!-- Progress Bar -->
            <div class="wizard-progress">
              <div class="wizard-progress-bar" :style="{ width: wizard.progress.value + '%' }" />
            </div>

            <!-- Validation Errors Banner -->
            <Transition name="fade">
              <div v-if="wizard.showStepErrors.value && wizard.stepErrors.value.length > 0" class="wizard-errors">
                <div class="wizard-errors-header">
                  <span style="display: flex; align-items: center; gap: 6px;">
                    <Icon icon="lucide:alert-circle" style="font-size: 16px;" />
                    Lengkapi field berikut sebelum lanjut:
                  </span>
                  <button type="button" class="wizard-errors-close" @click="wizard.dismissErrors()">
                    <Icon icon="lucide:x" style="font-size: 14px;" />
                  </button>
                </div>
                <ul class="wizard-errors-list">
                  <li v-for="(err, i) in wizard.stepErrors.value" :key="i">{{ err }}</li>
                </ul>
              </div>
            </Transition>

            <!-- Step 1: Tema & URL -->
            <div v-show="wizard.currentStepIndex.value === 0" class="wizard-step-content">
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

            <!-- Wizard Nav Step 1 -->
            <div class="wizard-nav">
              <div class="wizard-nav-left">
                <router-link to="/dashboard" class="btn btn-outline">Batal</router-link>
              </div>
              <div class="wizard-nav-right">
                <button type="button" class="btn btn-primary" @click="wizard.nextStep()">
                  Lanjut <Icon icon="lucide:arrow-right" style="font-size: 16px; margin-left: 4px;" />
                </button>
              </div>
            </div>
            </div>

            <!-- Step 2: Data Mempelai -->
            <div v-show="wizard.currentStepIndex.value === 1" class="wizard-step-content">
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

            <!-- Wizard Nav Step 2 -->
            <div class="wizard-nav">
              <div class="wizard-nav-left">
                <button type="button" class="btn btn-outline" @click="wizard.prevStep()">
                  <Icon icon="lucide:arrow-left" style="font-size: 16px; margin-right: 4px;" /> Kembali
                </button>
              </div>
              <div class="wizard-nav-right">
                <button type="button" class="btn btn-primary" @click="wizard.nextStep()">
                  Lanjut <Icon icon="lucide:arrow-right" style="font-size: 16px; margin-left: 4px;" />
                </button>
              </div>
            </div>
            </div>

            <!-- Step 3: Detail Acara -->
            <div v-show="wizard.currentStepIndex.value === 2" class="wizard-step-content">
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

            <!-- Wizard Nav Step 3 -->
            <div class="wizard-nav">
              <div class="wizard-nav-left">
                <button type="button" class="btn btn-outline" @click="wizard.prevStep()">
                  <Icon icon="lucide:arrow-left" style="font-size: 16px; margin-right: 4px;" /> Kembali
                </button>
              </div>
              <div class="wizard-nav-right">
                <button type="button" class="btn btn-primary" @click="wizard.nextStep()">
                  Lanjut <Icon icon="lucide:arrow-right" style="font-size: 16px; margin-left: 4px;" />
                </button>
              </div>
            </div>
            </div>

            <!-- Step 4: Konten -->
            <div v-show="wizard.currentStepIndex.value === 3" class="wizard-step-content">
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
                <!-- Photo Upload -->
                <div style="margin-bottom: 8px;">
                  <div v-if="story.photo" style="position: relative; display: inline-block;">
                    <img :src="getPhotoUrl(story.photo)" alt="Foto story" style="width: 100%; max-height: 140px; object-fit: cover; border-radius: 8px; border: 1px solid var(--admin-border);" />
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

            <!-- Hidden file input for love story photos -->
            <input
              ref="loveStoryPhotoInput"
              type="file"
              accept="image/*"
              hidden
              @change="handleLoveStoryPhotoUpload"
            />

            <button
              type="button"
              class="btn btn-outline"
              @click="
                form.love_story.push({ date: '', title: '', description: '', photo: '' })
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

            <!-- Wizard Nav Step 4 -->
            <div class="wizard-nav">
              <div class="wizard-nav-left">
                <button type="button" class="btn btn-outline" @click="wizard.prevStep()">
                  <Icon icon="lucide:arrow-left" style="font-size: 16px; margin-right: 4px;" /> Kembali
                </button>
              </div>
              <div class="wizard-nav-right">
                <button type="button" class="btn btn-primary" @click="wizard.nextStep()">
                  Lanjut <Icon icon="lucide:arrow-right" style="font-size: 16px; margin-left: 4px;" />
                </button>
              </div>
            </div>
            </div>

            <!-- Step 5: Lainnya -->
            <div v-show="wizard.currentStepIndex.value === 4" class="wizard-step-content">
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
                  <input v-model="bank.bank_account" class="form-input" placeholder="1234567890" maxlength="20" />
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
                <div style="display: flex; gap: 8px;">
                  <button type="button" class="btn btn-outline btn-sm" @click.stop="musicFileInput?.click()" style="font-size: 13px;">
                    <Icon icon="lucide:upload" style="font-size: 14px;" /> Upload Lagu
                  </button>
                  <button type="button" class="btn btn-outline btn-sm" @click.stop="openMusicLibrary" style="font-size: 13px;">
                    <Icon icon="lucide:library" style="font-size: 14px;" /> Pustaka Lagu
                  </button>
                </div>
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
                    <Icon icon="lucide:upload" style="font-size: 14px;" /> Upload Lagu
                  </button>
                  <button type="button" class="btn btn-outline btn-sm" @click.stop="openMusicLibrary" style="font-size: 13px;">
                    <Icon icon="lucide:library" style="font-size: 14px;" /> Pustaka Lagu
                  </button>
                  <button type="button" class="btn btn-outline btn-sm" @click.stop="restoreDefaultMusic" style="font-size: 13px;">
                    <Icon icon="lucide:undo-2" style="font-size: 14px;" /> Lagu Default
                  </button>
                  <button type="button" class="btn btn-danger btn-sm" @click.stop="removeMusic" style="font-size: 13px;">
                    Hapus
                  </button>
                </div>
              </div>
              <!-- Tidak Ada Musik -->
              <div v-else class="photo-upload-zone" style="padding: 24px;" @click="musicFileInput?.click()">
                <Icon icon="lucide:music-4" class="upload-icon" style="color: var(--admin-text-secondary);" />
                <div class="upload-text">Upload File Audio</div>
                <div class="upload-hint">Format bebas: .mp3, .m4a, .wav • Max 20MB</div>
                <div style="display: flex; justify-content: center; gap: 8px; margin-top: 12px;">
                  <button type="button" class="btn btn-outline btn-sm" style="font-size: 13px;" @click.stop="restoreDefaultMusic">
                    <Icon icon="lucide:undo-2" style="font-size: 14px;" /> Lagu Default
                  </button>
                  <button type="button" class="btn btn-outline btn-sm" style="font-size: 13px;" @click.stop="openMusicLibrary">
                    <Icon icon="lucide:library" style="font-size: 14px;" /> Pustaka Lagu
                  </button>
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

            <!-- Wizard Nav Step 5 (Final) -->
            <div class="wizard-nav">
              <div class="wizard-nav-left">
                <button type="button" class="btn btn-outline" @click="wizard.prevStep()">
                  <Icon icon="lucide:arrow-left" style="font-size: 16px; margin-right: 4px;" /> Kembali
                </button>
              </div>
              <div class="wizard-nav-right">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  :disabled="submitting || slugStatus === 'taken' || slugStatus === 'loading'"
                >
                  <span v-if="submitting" class="loading-spinner" style="margin-right: 8px"></span>
                  <span v-if="!submitting" style="margin-right: 8px; vertical-align: -3px;"><Icon icon="lucide:save" /></span>
                  {{ submitting ? "Menyimpan..." : "Simpan Perubahan" }}
                </button>
              </div>
            </div>
            </div>
            </form>
          </div>

          <!-- Live Preview Panel Component -->
          <LivePreviewPanel ref="previewPanel" :form="form" />
        </div>

        <!-- Modal Pustaka Lagu -->
        <div v-if="showMusicModal" class="modal-overlay" @click.self="showMusicModal = false">
          <div class="modal-content" style="max-width: 600px; width: 90%; max-height: 85vh; display: flex; flex-direction: column;">
            <div class="modal-title" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
              <span style="display: flex; align-items: center; gap: 8px;"><Icon icon="lucide:library_music" style="color: var(--admin-primary)" /> Pustaka Lagu</span>
              <button type="button" class="btn btn-outline btn-sm" @click="showMusicModal = false" style="border: none; padding: 4px;">
                <Icon icon="lucide:x" style="font-size: 20px;" />
              </button>
            </div>
            
            <div style="margin-bottom: 16px;">
              <input type="text" v-model="searchMusicQuery" placeholder="Cari judul lagu atau artis..." style="width: 100%; padding: 10px 14px; border-radius: 8px; border: 1px solid var(--admin-border); background: var(--admin-surface); font-size: 14px; outline: none; box-sizing: border-box;" />
            </div>
            
            <div v-if="musicLibraryLoading" style="text-align: center; padding: 40px 0;">
              <div class="loading-spinner"></div>
              <div style="margin-top:12px; color:var(--admin-text-secondary); font-size:14px;">Memuat pustaka lagu...</div>
            </div>
            <div v-else-if="musicLibrary.length === 0" style="text-align: center; padding: 40px 0; color:var(--admin-text-secondary); font-size:14px;">
              Belum ada pustaka lagu yang tersedia.
            </div>
            <div v-else-if="filteredMusicLibrary.length === 0" style="text-align: center; padding: 40px 0; color:var(--admin-text-secondary); font-size:14px;">
              Lagu tidak ditemukan.
            </div>
            <div v-else style="flex: 1; overflow-y: auto; padding-right: 8px; display: flex; flex-direction: column; gap: 12px; text-align: left;">
              <div 
                v-for="music in filteredMusicLibrary" 
                :key="music.id" 
                style="border: 1px solid var(--admin-border); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; background: var(--admin-surface);"
              >
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
                  <div style="text-align: left; word-break: break-word;">
                    <div style="font-weight: 600; font-size: 15px; color: var(--admin-text); line-height: 1.3;">{{ music.title }}</div>
                    <div style="font-size: 13px; color: var(--admin-text-secondary); margin-top: 2px;">{{ music.artist || 'Unknown Artist' }}</div>
                  </div>
                  <button 
                    type="button" 
                    class="btn btn-primary btn-sm" 
                    @click="selectMusicFromLibrary(music)"
                    style="padding: 6px 12px; font-size: 12px;"
                  >
                    Gunakan
                  </button>
                </div>
                <audio controls preload="none" style="width: 100%; height: 36px;">
                  <source :src="music.url" type="audio/mpeg" />
                </audio>
              </div>
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

/* ===== Wizard Validation Errors ===== */
.wizard-errors {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 16px;
  animation: shakeX 0.4s ease;
}
@keyframes shakeX {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}
.wizard-errors-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13.5px;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 8px;
}
.wizard-errors-close {
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  transition: all 0.2s;
  opacity: 0.6;
}
.wizard-errors-close:hover {
  opacity: 1;
  background: rgba(220, 38, 38, 0.1);
}
.wizard-errors-list {
  margin: 0;
  padding: 0 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.wizard-errors-list li {
  font-size: 13px;
  color: #b91c1c;
  line-height: 1.5;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useInvitationStore } from "@/stores/invitation";
import { resolveAssetUrl } from "@/utils/url";
import { THEME_REGISTRY, THEME_LIST, getThemeGalleryDefault } from "@/config/themes";
import { DEFAULT_MUSIC } from "@/config/defaultMusic";
import AppSkeleton from "@/components/ui/AppSkeleton.vue";

// Shared composables
import { useInvitationForm } from "@/composables/useInvitationForm";
import { useSlugValidation } from "@/composables/useSlugValidation";
import { usePhotoUpload } from "@/composables/usePhotoUpload";
import { useMusicManager } from "@/composables/useMusicManager";
import { useFormWizard } from "@/composables/useFormWizard";
import LivePreviewPanel from "@/components/admin/LivePreviewPanel.vue";

const route = useRoute();
const router = useRouter();
const store = useInvitationStore();
const apiBase = import.meta.env.VITE_API_URL || "";

// --- Step Validator ---
function validateStep(stepIndex: number): string[] {
  const errors: string[] = []
  switch (stepIndex) {
    case 0: // Tema & URL
      if (!form.slug || !form.slug.trim()) errors.push('URL Undangan (slug) wajib diisi')
      if (slugStatus.value === 'taken') errors.push('URL sudah dipakai, pilih yang lain')
      break
    case 1: // Mempelai
      if (!form.groom_name || !form.groom_name.trim()) errors.push('Nama panggilan mempelai pria wajib diisi')
      if (!form.bride_name || !form.bride_name.trim()) errors.push('Nama panggilan mempelai wanita wajib diisi')
      break
  }
  return errors
}

// --- Wizard ---
const wizard = useFormWizard([
  { id: 'theme', label: 'Tema & URL', icon: 'lucide:palette' },
  { id: 'couple', label: 'Mempelai', icon: 'lucide:users' },
  { id: 'event', label: 'Acara', icon: 'lucide:calendar-days' },
  { id: 'content', label: 'Konten', icon: 'lucide:image' },
  { id: 'extras', label: 'Finalisasi', icon: 'lucide:sparkles' },
], validateStep);

const loading = ref(true);

// --- Form State ---
const {
  form, submitting, toast, showToast,
  populateForm, getSubmitPayload,
  addLoveStory, removeLoveStory,
} = useInvitationForm();

// --- Slug Validation (with excludeId for edit mode) ---
const slugRef = computed({
  get: () => form.slug,
  set: (v) => { form.slug = v },
});
const excludeId = computed(() => route.params.id as string | undefined);
const { slugStatus, slugSuggestions, handleSlugInput, applySuggestion } = useSlugValidation(slugRef, excludeId);

// --- Photo Upload ---
const {
  coverDragover, galleryDragover,
  groomPhotoInput, bridePhotoInput, coverPhotoInput, loveStoryPhotoInput,
  triggerUpload, handleSingleUpload, handleCoverDrop,
  removeCoverPhoto, removeGroomPhoto, removeBridePhoto,
  handleGalleryUpload, handleGalleryDrop, removeGalleryPhoto,
  triggerLoveStoryPhotoUpload, handleLoveStoryPhotoUpload, removeLoveStoryPhoto,
} = usePhotoUpload(form, showToast);

// --- Music Manager ---
const {
  showMusicModal, musicLibrary, musicLibraryLoading,
  searchMusicQuery, filteredMusicLibrary, musicFileInput,
  openMusicLibrary, selectMusicFromLibrary,
  handleMusicUpload, removeMusic, restoreDefaultMusic,
  isCurrentMusicDefault, currentDefaultMusicLabel,
} = useMusicManager(form, showToast);

// --- Preview Sync ---
const previewPanel = ref<InstanceType<typeof LivePreviewPanel> | null>(null);

// --- Theme Selection ---
const showThemeModal = ref(false);
const themeList = THEME_LIST;

function selectTheme(themeId: "elegant" | "minimalist" | "floral" | "elegant_blue") {
  const oldTheme = form.theme;
  form.theme = themeId;
  form.gallery_type = getThemeGalleryDefault(themeId);
  if (!form.music_url || (DEFAULT_MUSIC[oldTheme] && form.music_url === DEFAULT_MUSIC[oldTheme].url)) {
    form.music_url = DEFAULT_MUSIC[themeId]?.url || "";
  }
  showThemeModal.value = false;
}

// --- Helper ---
function getPhotoUrl(url: string) {
  return resolveAssetUrl(url, apiBase);
}

// --- Submit ---
async function handleSubmit() {
  submitting.value = true;
  try {
    const id = route.params.id as string;
    await store.updateInvitation(id, getSubmitPayload());
    showToast("success", "Undangan berhasil diperbarui! 🎉");
    setTimeout(() => router.push("/dashboard"), 1500);
  } catch (e: any) {
    showToast("error", e.message || "Gagal memperbarui undangan");
  } finally {
    submitting.value = false;
  }
}

// --- Load Data ---
onMounted(async () => {
  const id = route.params.id as string;
  const data = await store.fetchInvitationById(id);
  if (data) {
    populateForm(data);
  }
  loading.value = false;
});
</script>


