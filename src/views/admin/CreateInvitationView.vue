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
          </h1>
          <p class="admin-page-subtitle">
            Isi informasi di bawah untuk membuat undangan pernikahan
          </p>

          <!-- Onboarding Guide Popup Modal -->
          <div v-if="showGuide" class="guide-modal-overlay" @click.self="dismissGuide">
            <div class="guide-modal">
              <button class="guide-modal-close" @click="dismissGuide" title="Tutup panduan">
                <Icon icon="lucide:x" />
              </button>
              <div class="guide-modal-header">
                <div class="guide-modal-icon">
                  <Icon icon="lucide:book-open" style="font-size: 22px;" />
                </div>
                <h2>Panduan Membuat Undangan</h2>
                <p>Ikuti langkah-langkah berikut untuk membuat undangan pernikahan digital Anda</p>
              </div>
              <div class="guide-modal-steps">
                <div class="guide-step-card">
                  <div class="guide-step-num">1</div>
                  <div class="guide-step-body">
                    <strong>Pilih Tema & Buat URL</strong>
                    <span>Pilih desain undangan, lalu buat alamat unik, contoh: <em>andi-sarah</em></span>
                  </div>
                </div>
                <div class="guide-step-card">
                  <div class="guide-step-num">2</div>
                  <div class="guide-step-body">
                    <strong>Isi Data Mempelai</strong>
                    <span>Nama panggilan wajib diisi. Nama lengkap & orang tua opsional.</span>
                  </div>
                </div>
                <div class="guide-step-card">
                  <div class="guide-step-num">3</div>
                  <div class="guide-step-body">
                    <strong>Upload Foto & Isi Acara</strong>
                    <span>Foto sampul, detail akad/resepsi, galeri, dan musik latar.</span>
                  </div>
                </div>
                <div class="guide-step-card">
                  <div class="guide-step-num">4</div>
                  <div class="guide-step-body">
                    <strong>Klik "Buat Undangan"</strong>
                    <span>Setelah selesai, klik tombol biru. Undangan langsung bisa disebar!</span>
                  </div>
                </div>
              </div>
              <div class="guide-modal-footer">
                <div class="guide-modal-tip">
                  <Icon icon="lucide:lightbulb" style="color: #f59e0b; flex-shrink: 0;" />
                  <span>Yang bertanda <strong>*</strong> wajib diisi. Sisanya opsional — bisa dilengkapi nanti lewat menu <strong>Edit</strong>.</span>
                </div>
                <button class="btn btn-primary" @click="dismissGuide" style="width: 100%;">
                  <Icon icon="lucide:check-circle-2" style="font-size: 16px;" /> Oke, Saya Paham
                </button>
              </div>
            </div>
          </div>

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
            <label class="form-label">Slug (URL) <span class="text-error" style="color: #dc2626;">*</span></label>
            <div style="position: relative;">
              <input
                v-model="form.slug"
                class="form-input"
                :class="{ 'input-error': slugStatus === 'taken', 'input-success': slugStatus === 'available' }"
                placeholder="contoh: andi-sarah"
                required
                maxlength="50"
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
            <small v-else-if="slugStatus === 'available'" style="color: #10b981; font-size: 13px; font-weight: 500; display: flex; align-items: flex-start; gap: 6px; margin-top: 6px;">
              <Icon icon="lucide:check" style="flex-shrink: 0; margin-top: 2px;" /> 
              <span style="word-break: break-word; line-height: 1.4;"><strong>{{ form.slug }}</strong>.mengundanganda.com tersedia!</span>
            </small>
            <small v-else style="color: var(--admin-text-secondary); font-size: 12px; margin-top: 6px; display: block; line-height: 1.4;">
              Undangan akan bisa diakses di: <strong style="word-break: break-word;">{{ form.slug || "slug-anda" }}.mengundanganda.com</strong>
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
          <div class="helper-tip">
            <Icon icon="lucide:info" class="helper-tip-icon" />
            <span>Hanya <strong>Nama Panggilan & Nama Lengkap</strong> yang wajib. Data orang tua dan foto opsional, namun akan terlihat lebih berkesan jika diisi lengkap.</span>
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
                  <label class="form-label">Nama Panggilan <span class="text-error" style="color: #dc2626;">*</span></label>
                  <input
                    v-model="form.groom_name"
                    class="form-input"
                    placeholder="Andi"
                    required
                    maxlength="20"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Nama Lengkap <span class="text-error" style="color: #dc2626;">*</span></label>
                  <input
                    v-model="form.groom_full_name"
                    class="form-input"
                    placeholder="Ahmad Andi Pratama, S.Kom"
                    maxlength="60"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Putra dari Bapak</label>
                  <input
                    v-model="form.groom_father"
                    class="form-input"
                    placeholder="Bapak Ahmad"
                    maxlength="60"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">dan Ibu</label>
                  <input
                    v-model="form.groom_mother"
                    class="form-input"
                    placeholder="Ibu Siti"
                    maxlength="60"
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
                  <label class="form-label">Nama Panggilan <span class="text-error" style="color: #dc2626;">*</span></label>
                  <input
                    v-model="form.bride_name"
                    class="form-input"
                    placeholder="Sarah"
                    required
                    maxlength="20"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Nama Lengkap <span class="text-error" style="color: #dc2626;">*</span></label>
                  <input
                    v-model="form.bride_full_name"
                    class="form-input"
                    placeholder="Sarah Amalia, S.E"
                    maxlength="60"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Putri dari Bapak</label>
                  <input
                    v-model="form.bride_father"
                    class="form-input"
                    placeholder="Bapak Budi"
                    maxlength="60"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">dan Ibu</label>
                  <input
                    v-model="form.bride_mother"
                    class="form-input"
                    placeholder="Ibu Rina"
                    maxlength="60"
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
          <p class="form-section-subtitle">Informasi waktu dan tempat acara</p>
          <div class="helper-tip">
            <Icon icon="lucide:info" class="helper-tip-icon" />
            <span>Jadwal <strong>Akad Nikah wajib diisi</strong> (Tanggal, Waktu Mulai, Tempat, Alamat). Jadwal Resepsi sepenuhnya opsional.</span>
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
                  <label class="form-label">Tanggal <span class="text-error" style="color: #dc2626;">*</span></label>
                  <input
                    v-model="form.akad_date"
                    type="date"
                    class="form-input"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Waktu (Mulai <span class="text-error" style="color: #dc2626;">*</span> - Selesai)</label>
                  <div class="time-input-group">
                    <div class="time-range-row">
                      <input
                        v-model="akadStart"
                        type="time"
                        class="form-input"
                        @keydown.enter.prevent
                      />
                      <span class="time-separator">-</span>
                      <input
                        v-model="akadEnd"
                        type="time"
                        class="form-input"
                        @keydown.enter.prevent
                      />
                    </div>
                    <select v-model="akadZone" class="form-input time-zone-select">
                      <option value="WIB">WIB</option>
                      <option value="WITA">WITA</option>
                      <option value="WIT">WIT</option>
                    </select>
                  </div>
                  <p v-if="akadStart && akadEnd && akadStart >= akadEnd" class="time-error-hint">
                    <Icon icon="lucide:alert-circle" style="font-size: 13px; flex-shrink: 0;" /> Waktu selesai harus lebih dari waktu mulai
                  </p>
                </div>
                <div class="form-group">
                  <label class="form-label">Tempat <span class="text-error" style="color: #dc2626;">*</span></label>
                  <input
                    v-model="form.akad_venue"
                    class="form-input"
                    placeholder="Masjid Al-Ikhlas"
                    maxlength="100"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label" style="display: flex; justify-content: space-between; align-items: center;">
                    <span>Alamat <span class="text-error" style="color: #dc2626;">*</span></span>
                    <button type="button" class="btn btn-outline btn-sm" @click="openMapPicker('akad')" style="font-size: 11.5px; height: auto; padding: 4px 8px; border-radius: 6px;">
                      <Icon icon="lucide:map-pin" style="font-size: 14px; margin-right: 4px;" /> Cari di Peta
                    </button>
                  </label>
                  <textarea
                    v-model="form.akad_address"
                    class="form-input"
                    placeholder="Jl. Raya No. 123, Jakarta"
                    rows="2"
                    maxlength="200"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label class="form-label">Link Google Maps</label>
                  <input
                    v-model="form.akad_map_url"
                    class="form-input"
                    placeholder="https://maps.google.com/..."
                    maxlength="500"
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
                  <label class="form-label">Waktu (Mulai - Selesai)</label>
                  <div class="time-input-group">
                    <div class="time-range-row">
                      <input
                        v-model="resepsiStart"
                        type="time"
                        class="form-input"
                        @keydown.enter.prevent
                      />
                      <span class="time-separator">-</span>
                      <input
                        v-model="resepsiEnd"
                        type="time"
                        class="form-input"
                        @keydown.enter.prevent
                      />
                    </div>
                    <select v-model="resepsiZone" class="form-input time-zone-select">
                      <option value="WIB">WIB</option>
                      <option value="WITA">WITA</option>
                      <option value="WIT">WIT</option>
                    </select>
                  </div>
                  <p v-if="resepsiStart && resepsiEnd && resepsiStart >= resepsiEnd" class="time-error-hint">
                    <Icon icon="lucide:alert-circle" style="font-size: 13px; flex-shrink: 0;" /> Waktu selesai harus lebih dari waktu mulai
                  </p>
                </div>
                <div class="form-group">
                  <label class="form-label">Tempat</label>
                  <input
                    v-model="form.resepsi_venue"
                    class="form-input"
                    placeholder="Grand Ballroom Hotel"
                    maxlength="100"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label" style="display: flex; justify-content: space-between; align-items: center;">
                    <span>Alamat</span>
                    <button type="button" class="btn btn-outline btn-sm" @click="openMapPicker('resepsi')" style="font-size: 11.5px; height: auto; padding: 4px 8px; border-radius: 6px;">
                      <Icon icon="lucide:map-pin" style="font-size: 14px; margin-right: 4px;" /> Cari di Peta
                    </button>
                  </label>
                  <textarea
                    v-model="form.resepsi_address"
                    class="form-input"
                    placeholder="Jl. Sudirman No. 456, Jakarta"
                    rows="2"
                    maxlength="200"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label class="form-label">Link Google Maps</label>
                  <input
                    v-model="form.resepsi_map_url"
                    class="form-input"
                    placeholder="https://maps.google.com/..."
                    maxlength="500"
                  />
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
                maxlength="20"
              />
              <input
                v-model="story.title"
                class="form-input"
                placeholder="Judul, contoh: Pertama Bertemu"
                maxlength="50"
              />
              <textarea
                v-model="story.description"
                class="form-input"
                placeholder="Ceritakan momen ini..."
                rows="2"
                maxlength="300"
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

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button type="button" class="btn btn-outline" @click="addLoveStory">
              + Tambah Cerita
            </button>
            <button type="button" class="btn btn-outline" @click="showLoveStoryTemplateModal = true" style="display: flex; align-items: center; gap: 6px;">
              <Icon icon="lucide:wand-2" style="font-size: 15px;" /> Pilih Template Cerita
            </button>
          </div>
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
              maxlength="500"
            ></textarea>
            <div style="margin-top: 12px; display: flex; justify-content: flex-end;">
              <button type="button" class="btn btn-outline btn-sm" @click="showQuoteModal = true" style="font-size: 13px; display: flex; align-items: center; gap: 6px;">
                <Icon icon="lucide:book-text" style="font-size: 15px;" /> Pilih dari Template
              </button>
            </div>
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
                <label class="form-label" style="display: flex; justify-content: space-between; align-items: center;">
                  Nama Bank / E-Wallet
                </label>
                <input v-model="bank.bank_name" class="form-input" placeholder="Contoh: BCA, Mandiri, GoPay" maxlength="50" />
                <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                  <button type="button" @click="bank.bank_name = 'BCA'" class="bank-pill">BCA</button>
                  <button type="button" @click="bank.bank_name = 'Mandiri'" class="bank-pill">Mandiri</button>
                  <button type="button" @click="bank.bank_name = 'BNI'" class="bank-pill">BNI</button>
                  <button type="button" @click="bank.bank_name = 'BRI'" class="bank-pill">BRI</button>
                  <button type="button" @click="bank.bank_name = 'BSI'" class="bank-pill">BSI</button>
                  <button type="button" @click="bank.bank_name = 'GoPay'" class="bank-pill">GoPay</button>
                  <button type="button" @click="bank.bank_name = 'OVO'" class="bank-pill">OVO</button>
                  <button type="button" @click="bank.bank_name = 'DANA'" class="bank-pill">DANA</button>
                  <button type="button" @click="bank.bank_name = 'ShopeePay'" class="bank-pill">ShopeePay</button>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">No. Rekening</label>
                <input v-model="bank.bank_account" class="form-input" placeholder="1234567890" maxlength="20" />
              </div>
              <div class="form-group full-width">
                <label class="form-label">Atas Nama</label>
                <input v-model="bank.bank_holder" class="form-input" placeholder="Ahmad Andi Pratama" maxlength="60" />
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
            <span>Setiap tema sudah memiliki musik default. Kamu bisa menggantinya dengan upload lagu sendiri, music default, atau dari pustaka lagu.</span>
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
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button type="button" class="btn btn-outline btn-sm" @click.stop="musicFileInput?.click()" style="font-size: 13px;">
                  <Icon icon="lucide:upload" style="font-size: 14px;" /> Upload Lagu
                </button>
                <button type="button" class="btn btn-outline btn-sm" @click.stop="openMusicLibrary" style="font-size: 13px;">
                  <Icon icon="lucide:library" style="font-size: 14px;" /> Pustaka Lagu
                </button>
                <button type="button" class="btn btn-danger btn-sm" @click.stop="removeMusic" style="font-size: 13px;">
                  <Icon icon="lucide:volume-x" style="font-size: 14px;" /> Tanpa Lagu
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
              <div style="display: flex; justify-content: center; gap: 8px; margin-top: 12px; flex-wrap: wrap;">
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
                  <span v-if="!submitting" style="margin-right: 8px; vertical-align: -3px;"><Icon icon="lucide:sparkles" /></span>
                  {{ submitting ? "Menyimpan..." : "Buat Undangan" }}
                </button>
              </div>
            </div>
            </div>
          </form>
        </div>
        <!-- Live Preview Panel Component -->
        <LivePreviewPanel ref="previewPanel" :form="form" />
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
          <div class="edit-theme-card" :class="{ active: form.theme === 'floral_blue' }" @click="selectTheme('floral_blue')">
            <div class="edit-theme-preview" style="background: #3b6b8a; color: #fff;">
              <div style="font-size: 8px; letter-spacing: 3px; color: #b8d4e3; text-transform: uppercase;">The Wedding</div>
              <div style="font-family: 'Great Vibes', cursive; font-size: 22px; margin-top: 4px;">Romeo &amp; Juliet</div>
            </div>
            <div class="edit-theme-label">Floral Blue</div>
            <div v-if="form.theme === 'floral_blue'" class="edit-theme-active-badge">Aktif</div>
          </div>
        </div>
      </div>
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

    <!-- Toast -->
    <div v-if="toast" :class="['toast', `toast-${toast.type}`, 'flex', 'items-center', 'gap-2']">
      <Icon :icon="toast.type === 'error' ? 'lucide:x-circle' : 'lucide:check-circle-2'" style="font-size: 18px; flex-shrink: 0;" />
      <span>{{ toast.message }}</span>
    </div>

    <!-- Image Crop Modal -->
    <ImageCropModal
      v-if="cropModalOpen"
      :image-src="cropImageSrc"
      :aspect-ratio="cropAspectRatio"
      :stencil-shape="cropStencilShape"
      @confirm="handleCropConfirm"
      @cancel="handleCropCancel"
    />

    <!-- Quote Library Modal -->
    <QuoteLibraryModal
      :show="showQuoteModal"
      @close="showQuoteModal = false"
      @select="handleQuoteSelect"
    />

    <!-- Love Story Template Modal -->
    <LoveStoryTemplateModal
      :show="showLoveStoryTemplateModal"
      @close="showLoveStoryTemplateModal = false"
      @select="handleLoveStoryTemplateSelect"
    />

    <!-- Map Picker Modal -->
    <MapPickerModal
      :show="showMapPickerModal"
      @close="showMapPickerModal = false"
      @select="handleMapLocationSelect"
    />
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

/* ===== Guide Modal ===== */
.guide-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: fadeIn 0.3s ease;
}
.guide-modal {
  position: relative;
  background: white;
  border-radius: 20px;
  max-width: 560px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 32px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.18);
  animation: slideUp 0.35s ease-out;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.guide-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  transition: all 0.2s;
  font-size: 18px;
}
.guide-modal-close:hover {
  background: #f1f5f9;
  color: #475569;
}
.guide-modal-header {
  text-align: center;
  margin-bottom: 24px;
}
.guide-modal-icon {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  color: #2563eb;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
}
.guide-modal-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 6px;
}
.guide-modal-header p {
  font-size: 13.5px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}
.guide-modal-steps {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
}
@media (max-width: 520px) {
  .guide-modal {
    padding: 24px 20px;
    border-radius: 16px;
  }
  .guide-modal-steps {
    grid-template-columns: 1fr;
  }
}
.guide-step-card {
  display: flex;
  gap: 12px;
  padding: 14px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}
.guide-step-card:hover {
  border-color: #93c5fd;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.08);
  transform: translateY(-1px);
}
.guide-step-num {
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
.guide-step-body {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.guide-step-body strong {
  font-size: 13px;
  color: #1e293b;
}
.guide-step-body span {
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
}
.guide-modal-footer {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.guide-modal-tip {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12.5px;
  color: #64748b;
  background: #fffbeb;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #fde68a;
  line-height: 1.5;
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
.time-error-hint {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 6px 0 0;
  padding: 0;
  font-size: 12.5px;
  color: #dc2626;
  font-weight: 500;
  animation: fadeIn 0.3s ease;
}

/* Responsive Time Input */
.time-input-group {
  display: flex;
  gap: 8px;
  align-items: center;
}
.time-range-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 8px;
  align-items: center;
  width: 100%;
  flex: 1;
}
.time-range-row .form-input {
  width: 100%;
  min-width: 0;
  padding-left: 8px;
  padding-right: 4px;
}
.time-separator {
  color: var(--admin-text-secondary);
  font-weight: 500;
}
.time-zone-select {
  width: 84px;
  flex-shrink: 0;
  padding-left: 6px;
  padding-right: 6px;
}

@media (max-width: 480px) {
  .time-input-group {
    flex-direction: column;
    align-items: stretch;
  }
  .time-zone-select {
    width: 100%;
  }
}
</style>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, computed } from "vue";
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
import { useInvitationStore } from "@/stores/invitation";
import { resolveAssetUrl } from "@/utils/url";
import { THEME_REGISTRY, THEME_LIST, getThemeGalleryDefault } from "@/config/themes";
import { DEFAULT_MUSIC } from "@/config/defaultMusic";

// Shared composables
import { useInvitationForm } from "@/composables/useInvitationForm";
import { useSlugValidation } from "@/composables/useSlugValidation";
import { usePhotoUpload } from "@/composables/usePhotoUpload";
import { useMusicManager } from "@/composables/useMusicManager";
import { useFormWizard } from "@/composables/useFormWizard";
import { useFormDraft } from "@/composables/useFormDraft";
import LivePreviewPanel from "@/components/admin/LivePreviewPanel.vue";
import ImageCropModal from "@/components/admin/ImageCropModal.vue";
import QuoteLibraryModal from "@/components/admin/QuoteLibraryModal.vue";
import MapPickerModal from "@/components/admin/MapPickerModal.vue";
import LoveStoryTemplateModal from "@/components/admin/LoveStoryTemplateModal.vue";

const router = useRouter();
const route = useRoute();
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
    case 2: // Acara
      if (akadStart.value && akadEnd.value && akadStart.value >= akadEnd.value) {
        errors.push('Waktu selesai Akad Nikah tidak boleh lebih awal atau sama dengan waktu mulai')
      }
      if (resepsiStart.value && resepsiEnd.value && resepsiStart.value >= resepsiEnd.value) {
        errors.push('Waktu selesai Resepsi tidak boleh lebih awal atau sama dengan waktu mulai')
      }
      break
    // Step 3 (Konten), 4 (Finalisasi) — no required fields
  }
  return errors
}

// --- Time Parsing (Jam & Zona Waktu) ---
function parseTimeStr(timeStr: string) {
  if (!timeStr) return { start: '', end: '', zone: 'WIB' };
  const match = timeStr.match(/^(\d{2}:\d{2})(?:\s*-\s*(\d{2}:\d{2}))?\s*(WIB|WITA|WIT)?$/i);
  if (match) {
    return { start: match[1] || '', end: match[2] || '', zone: match[3]?.toUpperCase() || 'WIB' };
  }
  return { start: '', end: '', zone: 'WIB' };
}
function buildTimeStr(start: string, end: string, zone: string) {
  if (!start && !end) return ''; // if both empty, clear it
  return `${start || '00:00'}${end ? ' - ' + end : ''} ${zone}`;
}

const akadStart = computed({
  get: () => parseTimeStr(form.akad_time).start,
  set: (val) => form.akad_time = buildTimeStr(val, parseTimeStr(form.akad_time).end, parseTimeStr(form.akad_time).zone)
});
const akadEnd = computed({
  get: () => parseTimeStr(form.akad_time).end,
  set: (val) => form.akad_time = buildTimeStr(parseTimeStr(form.akad_time).start, val, parseTimeStr(form.akad_time).zone)
});
const akadZone = computed({
  get: () => parseTimeStr(form.akad_time).zone,
  set: (val) => form.akad_time = buildTimeStr(parseTimeStr(form.akad_time).start, parseTimeStr(form.akad_time).end, val)
});

const resepsiStart = computed({
  get: () => parseTimeStr(form.resepsi_time).start,
  set: (val) => form.resepsi_time = buildTimeStr(val, parseTimeStr(form.resepsi_time).end, parseTimeStr(form.resepsi_time).zone)
});
const resepsiEnd = computed({
  get: () => parseTimeStr(form.resepsi_time).end,
  set: (val) => form.resepsi_time = buildTimeStr(parseTimeStr(form.resepsi_time).start, val, parseTimeStr(form.resepsi_time).zone)
});
const resepsiZone = computed({
  get: () => parseTimeStr(form.resepsi_time).zone,
  set: (val) => form.resepsi_time = buildTimeStr(parseTimeStr(form.resepsi_time).start, parseTimeStr(form.resepsi_time).end, val)
});

// --- Wizard ---
const wizard = useFormWizard([
  { id: 'theme', label: 'Tema & URL', icon: 'lucide:palette' },
  { id: 'couple', label: 'Mempelai', icon: 'lucide:users' },
  { id: 'event', label: 'Acara', icon: 'lucide:calendar-days' },
  { id: 'content', label: 'Konten', icon: 'lucide:image' },
  { id: 'extras', label: 'Finalisasi', icon: 'lucide:sparkles' },
], validateStep);


// --- Form State ---
const initialTheme = (route.query.theme as string) || 'elegant';
const {
  form, submitting, toast, showToast,
  getSubmitPayload, addLoveStory, removeLoveStory,
} = useInvitationForm(initialTheme);

// --- Slug Validation ---
const slugRef = computed({
  get: () => form.slug,
  set: (v) => { form.slug = v },
});
const { slugStatus, slugSuggestions, handleSlugInput, applySuggestion } = useSlugValidation(slugRef);

// --- Draft Auto-Save ---
const DRAFT_KEY = 'createInvitation_draft';
const draft = useFormDraft(DRAFT_KEY);
const restoredFromDraft = (() => {
  const saved = draft.loadDraft();
  if (saved) {
    // Restore form data
    Object.assign(form, saved.form);
    // Restore wizard step (bypass validation)
    wizard.goToStepDirect(saved.stepIndex);
    // Re-trigger slug validation if slug was restored
    if (form.slug) {
      handleSlugInput();
    }
    return true;
  }
  return false;
})();
// Start auto-saving form changes + current wizard step
draft.startAutoSave(form, () => wizard.currentStepIndex.value);

// --- Photo Upload ---
const {
  coverDragover, galleryDragover,
  groomPhotoInput, bridePhotoInput, coverPhotoInput, loveStoryPhotoInput,
  triggerUpload, handleSingleUpload, handleCoverDrop,
  removeCoverPhoto, removeGroomPhoto, removeBridePhoto,
  handleGalleryUpload, handleGalleryDrop, removeGalleryPhoto,
  triggerLoveStoryPhotoUpload, handleLoveStoryPhotoUpload, removeLoveStoryPhoto,
  cropModalOpen, cropImageSrc, cropAspectRatio, cropStencilShape,
  handleCropConfirm, handleCropCancel,
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

// --- Quote Library ---
const showQuoteModal = ref(false);
function handleQuoteSelect(quoteStr: string) {
  form.quote = quoteStr;
  showQuoteModal.value = false;
}

// --- Love Story Template ---
const showLoveStoryTemplateModal = ref(false);
function handleLoveStoryTemplateSelect(stories: import('@/types/invitation').LoveStoryItem[]) {
  form.love_story = stories;
  showLoveStoryTemplateModal.value = false;
  showToast('success', 'Template kisah cinta berhasil diterapkan!');
}

// --- Map Picker ---
const showMapPickerModal = ref(false);
const mapPickerTarget = ref<'akad' | 'resepsi'>('akad');

function openMapPicker(target: 'akad' | 'resepsi') {
  mapPickerTarget.value = target;
  showMapPickerModal.value = true;
}

function handleMapLocationSelect(payload: { lat: number, lng: number, address: string, link: string }) {
  if (mapPickerTarget.value === 'akad') {
    form.akad_address = payload.address;
    form.akad_map_url = payload.link;
  } else {
    form.resepsi_address = payload.address;
    form.resepsi_map_url = payload.link;
  }
  showMapPickerModal.value = false;
}

function selectTheme(themeId: "elegant" | "minimalist" | "floral" | "elegant_blue" | "floral_blue") {
  const oldTheme = form.theme;
  form.theme = themeId;
  form.gallery_type = getThemeGalleryDefault(themeId);
  // Auto-switch default music when switching themes
  if (!form.music_url || (DEFAULT_MUSIC[oldTheme] && form.music_url === DEFAULT_MUSIC[oldTheme].url)) {
    form.music_url = DEFAULT_MUSIC[themeId]?.url || "";
  }
  showThemeModal.value = false;
}

// --- Onboarding Guide ---
const GUIDE_KEY = 'createGuideShown';
// Don't show guide if we just restored from a draft (user is resuming work)
const showGuide = ref(!restoredFromDraft && sessionStorage.getItem(GUIDE_KEY) !== 'true');
function dismissGuide() {
  showGuide.value = false;
  sessionStorage.setItem(GUIDE_KEY, 'true');
}

// Clear guide flag AND draft when navigating away so next visit starts fresh
onBeforeRouteLeave(() => {
  sessionStorage.removeItem(GUIDE_KEY);
  draft.clearDraft();
});

// --- Submit ---
async function handleSubmit() {
  // Validate ALL wizard steps before submitting
  for (let i = 0; i < wizard.steps.length; i++) {
    const errors = validateStep(i)
    if (errors.length > 0) {
      wizard.goToStepDirect(i)
      wizard.stepErrors.value = errors
      wizard.showStepErrors.value = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
      showToast("error", errors[0] || "Terdapat error pada form")
      return
    }
  }

  if (!form.slug || !form.groom_name || !form.bride_name) {
    showToast("error", "Slug, nama mempelai pria dan wanita wajib diisi");
    return;
  }

  submitting.value = true;
  try {
    await store.createInvitation(getSubmitPayload());
    showToast("success", "Undangan berhasil dibuat!");
    draft.clearDraft(); // Clear draft on successful submit
    setTimeout(() => router.push("/dashboard?just_created=1"), 1500);
  } catch (e: any) {
    showToast("error", e.message || "Gagal membuat undangan");
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.bank-pill {
  background: var(--admin-bg, #f1f5f9);
  color: var(--admin-text-secondary, #64748b);
  border: 1px solid var(--admin-border, #e2e8f0);
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.bank-pill:hover {
  background: #e2e8f0;
  color: var(--admin-text);
  border-color: #cbd5e1;
}
</style>
