<template>
  <footer
    ref="footerSection"
    class="px-6 text-center text-white relative overflow-hidden flex flex-col items-center justify-center"
    style="min-height: 100dvh;"
  >
    <!-- Background Cover Image (Scale 2.4) -->
    <div 
      ref="bgImageRef"
      class="absolute inset-0 z-0 bg-[#6A4E42]" 
      style="background-image: url('https://media.mengundanganda.com/fairygarden/footer%20section/dewirandi_b928e5b1-d044-45bc-b314-24b25b4ca215.webp'); background-size: cover; background-position: center; transform: scale(2.4);"
    ></div>
    
    <!-- White Overlay Layer -->
    <div 
      ref="whiteOverlayRef"
      class="absolute inset-0 z-[1] bg-white pointer-events-none" 
      style="opacity: 0.5;"
    ></div>

    <!-- Slide 1: Love Story Section Content -->
    <div
      v-show="stories && stories.length > 0"
      ref="lovestoryWrapper"
      class="absolute inset-0 z-10 flex flex-col items-center justify-start px-4 overflow-y-auto pt-48 pb-32 hide-scrollbar"
      data-lenis-prevent
    >
      <div 
        class="flex flex-col" 
        style="width: 100%; max-width: 600px; padding: 0 12px; gap: 24px; box-sizing: border-box;"
      >
        <!-- Header -->
        <div class="text-center" style="margin-bottom: 12px; padding-top: 24px;">
          <h2
            class="text-5xl md:text-7xl mb-2 drop-shadow-md"
            :style="{ fontFamily: themeConfig.fontHeading }"
            style="color: #8A4E56; font-weight: 700; text-shadow: 0 1px 3px rgba(255,255,255,0.85); line-height: 1.3; padding-top: 24px;"
          >
            Love Story
          </h2>
        </div>

        <!-- Stories Stack of Individual Cards -->
        <div 
          v-for="(story, i) in stories" 
          :key="i" 
          style="
            position: relative; 
            width: 100%; 
            max-width: 520px; 
            margin: 0 auto; 
            text-align: left; 
            background: rgba(255, 255, 255, 0.95); 
            backdrop-filter: blur(12px); 
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid #EBCFD1; 
            border-radius: 16px 36px 16px 36px;
            box-shadow: 0px 8px 30px rgba(106, 78, 66, 0.05); 
            overflow: hidden; 
            padding: 24px 24px 38px 24px; 
            box-sizing: border-box;
            transition: all 0.3s ease;
            flex-shrink: 0;
          "
          class="hover:shadow-[0_12px_40px_rgba(106,78,66,0.1)] hover:-translate-y-1"
        >
          
          <!-- Elegant dashed inner border for fairytale parchment feel -->
          <div 
            style="
              position: absolute; 
              top: 10px; 
              bottom: 10px; 
              left: 10px; 
              right: 10px; 
              border: 1px dashed rgba(174, 184, 163, 0.35); 
              border-radius: 10px 30px 10px 30px; 
              pointer-events: none; 
              box-sizing: border-box;
            "
          ></div>
          
          <!-- Botanical Line SVG Illustration in background (corner decoration) -->
          <svg viewBox="0 0 100 100" class="absolute bottom-2 right-2 w-16 h-16 text-[#AEB8A3]/15 pointer-events-none" fill="currentColor">
            <!-- Elegant single leaf/vine -->
            <path d="M15,85 Q45,65 85,25" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" />
            <!-- Small leaves along the vine -->
            <path d="M35,62 Q25,52 30,45 Q40,50 35,62 Z" fill="currentColor" />
            <path d="M55,48 Q65,38 70,44 Q60,54 55,48 Z" fill="currentColor" />
            <path d="M45,55 Q35,45 40,39 Q50,45 45,55 Z" fill="currentColor" />
            <path d="M68,36 Q78,26 83,32 Q78,42 68,36 Z" fill="currentColor" />
            <path d="M78,30 C82,24 84,20 85,26 C82,29 80,30 78,30 Z" fill="currentColor" />
          </svg>

          <!-- Card Content -->
          <div style="position: relative; z-index: 10; display: flex; flex-direction: column; height: auto; box-sizing: border-box;">
            <!-- Top Row: Date Badge and Story Number -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; box-sizing: border-box;">
              <span 
                style="
                  display: inline-block; 
                  padding: 4px 12px; 
                  font-size: 10px; 
                  font-weight: 700; 
                  letter-spacing: 0.15em; 
                  text-transform: uppercase; 
                  background-color: rgba(235, 207, 209, 0.35); 
                  color: #8A4E56; 
                  border-radius: 9999px;
                  font-family: sans-serif;
                "
              >
                {{ story.date }}
              </span>
              <span 
                style="
                  font-size: 10px; 
                  font-weight: 800; 
                  letter-spacing: 0.1em; 
                  color: #6E875C; 
                  text-transform: uppercase;
                  font-family: sans-serif;
                "
              >
                Chapter {{ i + 1 }}
              </span>
            </div>
            
            <!-- Story Title -->
            <h4 
              :style="{ fontFamily: themeConfig.fontHeading }"
              style="
                font-size: 18px; 
                font-weight: 700; 
                color: #5A1E25; 
                margin-top: 0px; 
                margin-bottom: 12px; 
                line-height: 1.4;
              "
            >
              {{ story.title }}
            </h4>
            
            <!-- Story Image (Only if exists) -->
            <div 
              v-if="story.photo" 
              style="
                width: 100%; 
                border-radius: 12px; 
                overflow: hidden; 
                margin-bottom: 16px; 
                border: 1px solid rgba(235, 207, 209, 0.4); 
                aspect-ratio: 16/10;
                box-sizing: border-box;
              "
            >
              <img :src="resolveAssetUrl(story.photo, apiBase)" :alt="story.title" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            
            <!-- Story Description -->
            <p 
              style="
                font-size: 13.5px; 
                line-height: 1.68; 
                color: #5C3E35; 
                font-weight: 400; 
                margin: 0; 
                font-family: var(--font-body), sans-serif;
                white-space: pre-line;
              "
            >
              {{ story.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Slide 2: Gallery Section Content -->
    <div
      v-show="photos && photos.length > 0"
      ref="galleryWrapper"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center px-4"
    >
      <div class="w-full max-w-2xl px-4 py-2 flex flex-col gap-6">
        <!-- Header -->
        <div class="text-center">
          <h2
            class="text-5xl md:text-7xl mb-2 drop-shadow-md"
            :style="{ fontFamily: themeConfig.fontHeading }"
            style="color: #8A4E56; font-weight: 700; text-shadow: 0 1px 3px rgba(255,255,255,0.85); line-height: 1.3; padding-top: 12px;"
          >
            Galeri Foto
          </h2>
          <div class="flex items-center justify-center gap-4 mb-2 text-[#EBCFD1] opacity-80">
            <svg viewBox="0 0 60 2" class="w-10 md:w-14 opacity-40">
              <rect width="60" height="1" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 24 24" class="w-4 h-4 opacity-60">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 60 2" class="w-10 md:w-14 opacity-40">
              <rect width="60" height="1" fill="currentColor" />
            </svg>
          </div>
        </div>

        <!-- Gallery content -->
        <div class="w-full">
          <!-- Dispatch Masonry or Carousel dynamically inside the footer card -->
          <div v-if="galleryType === 'masonry'" class="bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-[#EBCFD1] shadow-xl w-full">
            <GalleryMasonryLayout
              :photos="photos"
              :api-base="apiBase"
              @open-lightbox="(i) => $emit('openLightbox', i)"
            />
          </div>
          <div v-else class="w-full">
            <GalleryFairytaleGardenCarousel
              :photos="photos"
              :theme-config="themeConfig"
              :api-base="apiBase"
              :is-inline="true"
              @open-lightbox="(i) => $emit('openLightbox', i)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Slide 3: RSVP Section Content -->
    <div
      ref="rsvpWrapper"
      class="absolute inset-0 z-10 flex flex-col items-center justify-start overflow-y-auto py-24 hide-scrollbar"
      style="padding-left: 24px; padding-right: 24px; box-sizing: border-box;"
      data-lenis-prevent
    >
      <!-- RSVP container (scrollable for mobile screens) -->
      <div style="width: 100%; max-width: 580px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; box-sizing: border-box;">
        <!-- Header -->
        <div class="text-center" style="margin-bottom: 8px;">
          <h2
            class="text-5xl md:text-7xl mb-2 drop-shadow-md"
            :style="{ fontFamily: themeConfig.fontHeading }"
            style="color: #8A4E56; font-weight: 700; text-shadow: 0 1px 3px rgba(255,255,255,0.85); line-height: 1.3; padding-top: 12px;"
          >
            Reservasi & Ucapan
          </h2>
          <div class="flex items-center justify-center gap-4 mb-2 text-[#EBCFD1] opacity-80">
            <svg viewBox="0 0 60 2" class="w-10 md:w-14 opacity-40">
              <rect width="60" height="1" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 24 24" class="w-4 h-4 opacity-60">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 60 2" class="w-10 md:w-14 opacity-40">
              <rect width="60" height="1" fill="currentColor" />
            </svg>
          </div>
          <p class="text-xs md:text-sm text-[#F8F3EE] opacity-90">Kehadiran Anda merupakan kebahagiaan bagi kami</p>
        </div>

        <!-- RSVP Form & Messages side-by-side or stacked -->
        <div class="grid md:grid-cols-2 gap-4 text-left items-start" style="position: relative; z-index: 10;">
          <!-- Form -->
          <div 
            style="
              position: relative; 
              background: rgba(252, 248, 244, 0.97); 
              backdrop-filter: blur(16px); 
              -webkit-backdrop-filter: blur(16px);
              padding: 16px 14px; 
              border-radius: 20px 40px 20px 40px; 
              border: 1.5px solid #EBCFD1; 
              box-shadow: 0px 10px 25px rgba(106, 78, 66, 0.05);
              box-sizing: border-box;
            "
          >
            <!-- Elegant dashed inner border -->
            <div style="position: absolute; top: 6px; bottom: 6px; left: 6px; right: 6px; border: 1px dashed rgba(174, 184, 163, 0.4); border-radius: 14px 34px 14px 34px; pointer-events: none; box-sizing: border-box;"></div>

            <form @submit.prevent="onSubmit" class="space-y-3" style="position: relative; z-index: 10;">
              <div>
                <label style="display: block; font-size: 10px; font-weight: 700; color: #6A4E42; margin-bottom: 4px; letter-spacing: 0.08em; text-transform: uppercase; font-family: sans-serif;">Nama Lengkap</label>
                <input v-model="form.guest_name" type="text" maxlength="50" placeholder="Nama Anda" required class="premium-input" style="width: 100%; px-4; height: 34px; padding-left: 10px; padding-right: 10px; rounded-lg; border: 1.5px solid #EBCFD1; background: rgba(255,255,255,0.85); color: #6A4E42; font-size: 12px; outline: none; border-radius: 10px; box-sizing: border-box;" />
              </div>
              
              <div>
                <label style="display: block; font-size: 10px; font-weight: 700; color: #6A4E42; margin-bottom: 6px; letter-spacing: 0.08em; text-transform: uppercase; font-family: sans-serif;">Konfirmasi Kehadiran</label>
                <div class="flex gap-2">
                  <button 
                    type="button" 
                    @click="form.attendance = 'hadir'" 
                    :style="form.attendance === 'hadir' 
                      ? 'flex: 1; py-2; height: 34px; rounded-xl; border: none; background: linear-gradient(135deg, #8FA47F 0%, #6E875C 100%); color: white; font-weight: 700; font-size: 12px; cursor: pointer; border-radius: 10px; box-shadow: 0 4px 12px rgba(110,135,92,0.2);' 
                      : 'flex: 1; py-2; height: 34px; rounded-xl; border: 1.5px dashed #AEB8A3; background: transparent; color: #6E875C; font-weight: 600; font-size: 12px; cursor: pointer; border-radius: 10px;'"
                  >
                    Hadir
                  </button>
                  <button 
                    type="button" 
                    @click="form.attendance = 'tidak_hadir'" 
                    :style="form.attendance === 'tidak_hadir' 
                      ? 'flex: 1; py-2; height: 34px; rounded-xl; border: none; background: linear-gradient(135deg, #D49BA2 0%, #BA7D85 100%); color: white; font-weight: 700; font-size: 12px; cursor: pointer; border-radius: 10px; box-shadow: 0 4px 12px rgba(186,125,133,0.2);' 
                      : 'flex: 1; py-2; height: 34px; rounded-xl; border: 1.5px dashed #EBCFD1; background: transparent; color: #BA7D85; font-weight: 600; font-size: 12px; cursor: pointer; border-radius: 10px;'"
                  >
                    Absen
                  </button>
                </div>
              </div>
              
              <div v-show="form.attendance === 'hadir'">
                <label style="display: block; font-size: 10px; font-weight: 700; color: #6A4E42; margin-bottom: 4px; letter-spacing: 0.08em; text-transform: uppercase; font-family: sans-serif;">Jumlah Tamu</label>
                <div style="display: flex; align-items: center; justify-content: space-between; rounded-lg; border: 1.5px solid #EBCFD1; background: rgba(255,255,255,0.85); overflow: hidden; height: 34px; border-radius: 10px; box-sizing: border-box;">
                  <button type="button" @click="form.guest_count = Math.max(1, form.guest_count - 1)" style="width: 34px; height: 100%; display: flex; align-items: center; justify-content: center; color: #6E875C; font-weight: bold; background: transparent; border: none; cursor: pointer;">-</button>
                  <span style="color: #6A4E42; font-weight: 700; font-size: 12px; font-family: sans-serif;">{{ form.guest_count }} Orang</span>
                  <button type="button" @click="form.guest_count = Math.min(10, form.guest_count + 1)" style="width: 34px; height: 100%; display: flex; align-items: center; justify-content: center; color: #6E875C; font-weight: bold; background: transparent; border: none; cursor: pointer;">+</button>
                </div>
              </div>
              
              <div>
                <label style="display: block; font-size: 10px; font-weight: 700; color: #6A4E42; margin-bottom: 4px; letter-spacing: 0.08em; text-transform: uppercase; font-family: sans-serif;">Ucapan &amp; Doa</label>
                <textarea v-model="form.message" rows="2" maxlength="500" placeholder="Tulis ucapan selamat..." class="premium-input" style="width: 100%; padding: 8px 10px; rounded-lg; border: 1.5px solid #EBCFD1; background: rgba(255,255,255,0.85); color: #6A4E42; font-size: 12px; outline: none; border-radius: 10px; resize: none; box-sizing: border-box; font-family: var(--font-body), sans-serif;"></textarea>
              </div>
              
              <button 
                type="submit" 
                :disabled="submitting" 
                class="premium-submit-btn"
                style="width: 100%; py-2.5; height: 38px; rounded-lg; background: linear-gradient(135deg, #8FA47F 0%, #6E875C 100%); color: white; font-weight: 700; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; border: none; border-radius: 10px; box-shadow: 0 6px 15px rgba(110,135,92,0.2); cursor: pointer; display: flex; align-items: center; justify-content: center;"
              >
                {{ submitting ? 'Mengirim...' : 'Kirim Ucapan' }}
              </button>
            </form>
          </div>

          <!-- Messages List -->
          <div 
            style="
              position: relative; 
              background: rgba(252, 248, 244, 0.97); 
              backdrop-filter: blur(16px); 
              -webkit-backdrop-filter: blur(16px);
              padding: 16px 14px; 
              border-radius: 40px 20px 40px 20px; 
              border: 1.5px solid #EBCFD1; 
              box-shadow: 0px 10px 25px rgba(106, 78, 66, 0.05);
              box-sizing: border-box;
              align-self: stretch;
              display: flex;
              flex-direction: column;
            "
          >
            <!-- Elegant dashed inner border -->
            <div style="position: absolute; top: 8px; bottom: 8px; left: 8px; right: 8px; border: 1px dashed rgba(174, 184, 163, 0.4); border-radius: 34px 14px 34px 14px; pointer-events: none; box-sizing: border-box;"></div>

            <div style="position: relative; z-index: 10; display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px dashed rgba(235, 207, 209, 0.6); padding-bottom: 8px; box-sizing: border-box;">
              <span style="font-size: 12px; font-weight: 700; color: #6A4E42; font-family: var(--font-body), sans-serif; letter-spacing: 0.05em; text-transform: uppercase;">Pesan Tamu</span>
              <span style="background: #EBCFD1; color: #8A4E56; padding: 2px 8px; border-radius: 9999px; font-size: 10px; font-weight: 700; font-family: sans-serif;">{{ rsvpMessages.length }}</span>
            </div>
            
            <div class="flex-1 overflow-y-auto pr-1 space-y-3 max-h-[210px] md:max-h-[240px]" style="position: relative; z-index: 10; overscroll-behavior: contain;" data-lenis-prevent>
              <div v-if="rsvpMessages.length === 0" class="text-center py-12 text-xs text-gray-400 font-light font-sans">Belum ada ucapan</div>
              <div 
                v-else 
                v-for="msg in rsvpMessages" 
                :key="msg.id" 
                style="
                  position: relative;
                  padding: 16px; 
                  background: rgba(255, 255, 255, 0.92); 
                  border-radius: 12px 24px 12px 24px; 
                  border: 1.5px solid rgba(235, 207, 209, 0.4); 
                  box-shadow: 0 4px 15px rgba(106, 78, 66, 0.03);
                  box-sizing: border-box;
                "
              >
                <!-- Card Inner Info -->
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 8px; box-sizing: border-box;">
                  <span style="font-weight: 700; font-size: 12.5px; color: #5A1E25; font-family: sans-serif; max-width: 130px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ msg.guest_name }}</span>
                  <span 
                    :style="msg.attendance === 'hadir' 
                      ? 'font-size: 8.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 3px 8px; border-radius: 6px; background: rgba(110, 135, 92, 0.12); color: #6E875C; font-family: sans-serif;' 
                      : 'font-size: 8.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 3px 8px; border-radius: 6px; background: rgba(186, 125, 133, 0.12); color: #BA7D85; font-family: sans-serif;'"
                  >
                    {{ msg.attendance === 'hadir' ? 'Hadir' : 'Absen' }}
                  </span>
                </div>
                <p style="font-size: 11.5px; line-height: 1.6; color: #6A4E42; font-weight: 400; font-family: var(--font-body), sans-serif; margin: 0; white-space: pre-line; word-break: break-word;">{{ msg.message }}</p>
                <div 
                  v-if="msg.reply_text" 
                  style="
                    margin-top: 10px; 
                    background: rgba(252, 248, 244, 0.9); 
                    padding: 10px; 
                    border-radius: 8px 16px 8px 16px; 
                    border: 1px dashed rgba(235, 207, 209, 0.7);
                    box-sizing: border-box;
                  "
                >
                  <div style="font-size: 8px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #BA7D85; margin-bottom: 4px; display: block; font-family: sans-serif;">Balasan Mempelai</div>
                  <p style="font-size: 11px; line-height: 1.5; color: #6A4E42; font-weight: 400; font-family: var(--font-body), sans-serif; margin: 0; word-break: break-word;">{{ msg.reply_text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Slide 2: Gift Section Content -->
    <div
      v-show="bankList.length > 0 || invitation.gift_address"
      ref="giftWrapper"
      class="absolute inset-0 z-10 flex flex-col items-center justify-start px-4 overflow-y-auto py-32 hide-scrollbar"
      data-lenis-prevent
    >
      <!-- Header -->
      <div class="mb-8">
        <h2
          class="text-5xl md:text-7xl mb-3 drop-shadow-md"
          :style="{ fontFamily: themeConfig.fontHeading }"
          style="color: #8A4E56; font-weight: 700; text-shadow: 0 1px 3px rgba(255,255,255,0.85); line-height: 1.3; padding-top: 12px;"
        >
          Wedding Gift
        </h2>
        <div class="flex items-center justify-center gap-4 mb-3 text-[#EBCFD1] opacity-80">
          <svg viewBox="0 0 60 2" class="w-10 md:w-14" style="opacity: 0.4">
            <rect width="60" height="1" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 24 24" class="w-4 h-4" style="opacity: 0.6">
            <path
              d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"
              fill="currentColor"
            />
          </svg>
          <svg viewBox="0 0 60 2" class="w-10 md:w-14" style="opacity: 0.4">
            <rect width="60" height="1" fill="currentColor" />
          </svg>
        </div>
        <p class="max-w-md mx-auto text-xs md:text-sm leading-relaxed text-[#F8F3EE] opacity-90 px-4">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami.<br />
          Namun, apabila Anda ingin memberikan tanda kasih, kami menyediakan
          amplop digital di bawah ini.
        </p>
      </div>

      <!-- Gift Cards Container (Horizontal on Desktop, Vertical on Mobile) -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-4xl px-4 py-2">
        
        <!-- Bank Accounts -->
        <div
          v-for="(bank, index) in bankList"
          :key="index"
          class="flex flex-col items-center gap-2 w-full max-w-[340px]"
        >
          <!-- Debit Card Design -->
          <div
            class="group w-full aspect-[1.58] bg-white/95 p-5 rounded-2xl shadow-xl border border-[#EBCFD1] relative overflow-hidden flex flex-col justify-between text-left transition-transform duration-500 hover:scale-[1.02]"
          >
            <!-- Elegant Pattern Decor -->
            <div class="absolute -right-12 -top-12 w-48 h-48 border-[1.5px] border-[#EBCFD1]/30 rounded-full pointer-events-none"></div>
            <div class="absolute -right-6 -top-6 w-32 h-32 border-[1.5px] border-[#EBCFD1]/40 rounded-full pointer-events-none"></div>
            <div class="absolute -left-12 -bottom-12 w-40 h-40 border-[1px] border-[#EBCFD1]/20 rounded-full pointer-events-none"></div>

            <!-- Top Row: Chip and Bank Name -->
            <div class="flex justify-between items-start z-10">
              <!-- EMV Chip -->
              <div class="w-10 h-7 rounded-md relative overflow-hidden shadow-sm border border-black/10 bg-gradient-to-br from-[#EBCFD1] to-[#D9A9AF]">
                <div class="absolute inset-y-0 left-2.5 w-px bg-black/10"></div>
                <div class="absolute inset-y-0 right-2.5 w-px bg-black/10"></div>
                <div class="absolute inset-x-0 top-2.5 h-px bg-black/10"></div>
                <div class="absolute inset-x-0 bottom-2.5 h-px bg-black/10"></div>
              </div>

              <div class="font-bold text-base tracking-widest uppercase text-[#D9A9AF]">
                {{ bank.bank_name }}
              </div>
            </div>

            <!-- Middle: Account Number -->
            <div class="z-10 mt-auto mb-4 relative">
              <div class="text-lg md:text-xl font-bold tracking-[0.12em] font-mono drop-shadow-sm flex items-center gap-2 text-[#6A4E42]">
                {{ bank.bank_account }}
                <button
                  @click="copyAccount(index)"
                  title="Salin Nomor"
                  class="bg-white border border-[#EBCFD1] text-gray-700 p-1.5 rounded-lg hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center hover:scale-105 active:scale-95"
                >
                  <svg v-if="copiedIndex !== index" viewBox="0 0 24 24" class="w-3.5 h-3.5 text-[#AEB8A3] fill-current">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" class="w-3.5 h-3.5 text-green-600 fill-current">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </button>
              </div>
              <div
                v-show="copiedIndex === index"
                class="absolute mt-0.5 text-[9px] font-bold uppercase tracking-wider text-green-600 animate-fade-in"
              >
                Berhasil Disalin!
              </div>
            </div>

            <!-- Bottom Row: Card Holder & Rings -->
            <div class="flex justify-between items-end z-10">
              <div class="flex flex-col">
                <span class="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">A.N. Rekening</span>
                <span class="text-xs md:text-sm font-bold uppercase tracking-widest leading-tight text-[#6A4E42]">
                  {{ bank.bank_holder }}
                </span>
              </div>
              <!-- Debit Card Rings Mock -->
              <div class="flex opacity-50 items-center drop-shadow-sm">
                <div class="w-7 h-7 rounded-full mix-blend-multiply bg-[#AEB8A3]"></div>
                <div class="w-7 h-7 rounded-full mix-blend-multiply -ml-3 bg-[#EBCFD1]"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Physical Gift Address Card -->
        <div
          v-if="invitation.gift_address"
          class="flex flex-col items-center gap-2 w-full max-w-[340px]"
        >
          <div class="group w-full p-5 rounded-2xl shadow-xl border border-[#EBCFD1] bg-white/95 relative overflow-hidden flex flex-col justify-between text-left transition-transform duration-500 hover:scale-[1.02]">
            <!-- Pattern decor -->
            <div class="absolute -right-12 -top-12 w-48 h-48 border-[1.5px] border-[#EBCFD1]/30 rounded-full pointer-events-none"></div>

            <div class="flex justify-between items-start z-10 mb-2">
              <div class="font-bold text-xs tracking-wider uppercase text-[#D9A9AF]">
                Kirim Kado
              </div>
              <svg viewBox="0 0 24 24" class="w-4 h-4 text-[#AEB8A3] fill-current">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>

            <div class="z-10 mb-2">
              <p class="text-xs text-[#6A4E42] leading-relaxed font-semibold mb-2" style="white-space: pre-line">
                {{ invitation.gift_address }}
              </p>
              <div class="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">
                Penerima
              </div>
              <div class="text-xs font-bold uppercase tracking-wider text-[#D9A9AF]">
                {{ invitation.gift_recipient || "-" }}
              </div>
              <div v-if="invitation.gift_phone" class="text-[10px] text-gray-500 mt-0.5 font-mono">
                Telp: {{ invitation.gift_phone }}
              </div>
            </div>

            <div class="flex justify-between items-center z-10 mt-1">
              <button
                @click="copyAddress"
                class="bg-white border border-[#EBCFD1] text-[#6A4E42] px-3.5 py-1.5 rounded-lg hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-1.5 text-[10px] font-semibold hover:scale-102 active:scale-95"
              >
                <svg v-if="!copiedAddress" viewBox="0 0 24 24" class="w-3.5 h-3.5 text-[#AEB8A3] fill-current">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
                <svg v-else viewBox="0 0 24 24" class="w-3.5 h-3.5 text-green-600 fill-current">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                {{ copiedAddress ? "Alamat Disalin!" : "Salin Alamat" }}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Gate Assets — independent layer, NOT inside footerWrapper -->
    <div class="absolute inset-0 z-[5] pointer-events-none overflow-hidden" style="perspective: 1200px;">
      <!-- Left Gate -->
      <div 
        ref="leftGateRef"
        style="
          position: absolute; 
          top: 25%; 
          left: 10%; 
          width: 41%; 
          height: auto; 
          opacity: 0;
          transform-origin: left center;
          transform: rotateY(-60deg);
        "
      >
        <img 
          src="https://media.mengundanganda.com/fairygarden/footer%20section/dewirandi_3a822cdf-ccca-4384-9045-074cb36c06fe.webp" 
          alt="Left Gate"
          style="width: 100%; height: auto; object-fit: contain;"
        />
      </div>
      <!-- Right Gate (Flipped horizontally) -->
      <div 
        ref="rightGateRef"
        style="
          position: absolute; 
          top: 25%; 
          right: 10%; 
          width: 41%; 
          height: auto; 
          opacity: 0;
          transform-origin: right center;
          transform: rotateY(60deg);
        "
      >
        <img 
          src="https://media.mengundanganda.com/fairygarden/footer%20section/dewirandi_3a822cdf-ccca-4384-9045-074cb36c06fe.webp" 
          alt="Right Gate"
          style="width: 100%; height: auto; object-fit: contain; transform: scaleX(-1);"
        />
      </div>
    </div>

    <!-- Slide 2: Footer Section Content -->
    <div
      ref="footerWrapper"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
    >
      <!-- Footer Content Wrapper styled as a soft circular white shadow container -->
      <div 
        class="relative z-10 flex flex-col items-center justify-center text-center"
        style="background: radial-gradient(ellipse closest-side, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.65) 65%, rgba(255, 255, 255, 0) 98%); border-radius: 50%; padding: 5rem 2.5rem; max-width: 380px; width: 90%; border: none; outline: none;"
      >
        <p 
          class="text-[9px] md:text-sm tracking-[0.3em] uppercase mb-3 font-semibold"
          style="color: #8C655A; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);"
        >
          The Wedding Of
        </p>
        
        <!-- Name with margin-bottom: mb-16 to increase vertical distance -->
        <p 
          class="text-4xl md:text-6xl lg:text-7xl mb-16 leading-tight font-medium" 
          :style="{ fontFamily: themeConfig.fontHeading, color: '#4A2E2B', textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)' }"
        >
          {{ invitation.groom_name }}
          <span style="display: inline-block; margin: 0 0.5rem; font-size: 1.75rem; opacity: 0.85; font-weight: 300;">&amp;</span>
          {{ invitation.bride_name }}
        </p>
        
        <p 
          class="text-xs md:text-sm font-light tracking-wide max-w-sm mx-auto leading-relaxed"
          style="color: #5C3E35; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);"
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
        
        <p 
          class="text-xs md:text-sm italic mt-4 opacity-90"
          style="color: #5C3E35; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);"
        >
          Terima kasih.
        </p>
      </div>

      <!-- Credit positioned absolute bottom-0 -->
      <div style="position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); width: 85%; max-width: 300px; border-top: 1px solid rgba(255,255,255,0.25); padding-top: 1rem; display: flex; flex-direction: column; align-items: center; gap: 0.25rem; pointer-events: auto;">
        <div style="font-size: 9px; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.15em; font-family: sans-serif;">Dibuat dengan</div>
        <div style="font-weight: bold; letter-spacing: 0.1em; font-size: 12px; display: flex; align-items: center; gap: 0.25rem; color: #FFFFFF; font-family: sans-serif;">
          Mengundang<span style="color: rgba(255,255,255,0.85);">Anda</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/vue';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation, BankAccount, Rsvp, LoveStoryItem, Photo } from '@/types/invitation';
import GalleryMasonryLayout from '../gallery/GalleryMasonryLayout.vue';
import GalleryFairytaleGardenCarousel from '../gallery/GalleryFairytaleGardenCarousel.vue';
import { resolveAssetUrl } from '@/utils/url';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  rsvpMessages: Rsvp[];
  submitting: boolean;
  stories: LoveStoryItem[];
  photos: Photo[];
  galleryType: 'carousel' | 'masonry';
  apiBase: string;
}>();

const emit = defineEmits<{
  (e: 'submitRsvp', form: { guest_name: string; attendance: 'hadir' | 'tidak_hadir'; guest_count: number; message: string }): void;
  (e: 'openLightbox', index: number): void;
}>();

const footerSection = ref<HTMLElement | null>(null);
const bgImageRef = ref<HTMLElement | null>(null);
const whiteOverlayRef = ref<HTMLElement | null>(null);
const lovestoryWrapper = ref<HTMLElement | null>(null);
const galleryWrapper = ref<HTMLElement | null>(null);
const rsvpWrapper = ref<HTMLElement | null>(null);
const giftWrapper = ref<HTMLElement | null>(null);
const footerWrapper = ref<HTMLElement | null>(null);
const leftGateRef = ref<HTMLElement | null>(null);
const rightGateRef = ref<HTMLElement | null>(null);

const copiedIndex = ref<number | null>(null);
const copiedAddress = ref(false);

const form = reactive({
  guest_name: '',
  attendance: 'hadir' as 'hadir' | 'tidak_hadir',
  guest_count: 1,
  message: '',
});

let pinTimeline: gsap.core.Timeline | null = null;

function onSubmit() {
  emit('submitRsvp', { ...form });
  form.guest_name = '';
  form.attendance = 'hadir';
  form.guest_count = 1;
  form.message = '';
}

// --- Gift Logic & Computations ---
const bankList = computed<BankAccount[]>(() => {
  if (
    props.invitation.banks &&
    Array.isArray(props.invitation.banks) &&
    props.invitation.banks.length > 0
  ) {
    return props.invitation.banks.filter((b) => b.bank_name || b.bank_account);
  }
  if (props.invitation.bank_name) {
    return [
      {
        bank_name: props.invitation.bank_name,
        bank_account: props.invitation.bank_account,
        bank_holder: props.invitation.bank_holder,
      },
    ];
  }
  return [];
});

function copyAccount(index: number) {
  const bank = bankList.value[index];
  if (!bank?.bank_account) return;
  navigator.clipboard.writeText(bank.bank_account);
  copiedIndex.value = index;
  setTimeout(() => {
    copiedIndex.value = null;
  }, 2500);
}

// Custom CSS class to hide scrollbars cleanly inside scrollable divs
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    .hide-scrollbar {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `;
  document.head.appendChild(style);
}

function copyAddress() {
  if (!props.invitation.gift_address) return;
  let text = props.invitation.gift_address;
  if (props.invitation.gift_recipient) {
    text += `\n(Penerima: ${props.invitation.gift_recipient}`;
    if (props.invitation.gift_phone)
      text += `, Telp: ${props.invitation.gift_phone}`;
    text += `)`;
  }
  navigator.clipboard.writeText(text);
  copiedAddress.value = true;
  setTimeout(() => {
    copiedAddress.value = false;
  }, 2500);
}

onMounted(() => {
  const hasLoveStory = props.stories && props.stories.length > 0;
  const hasGallery = props.photos && props.photos.length > 0;
  const hasGift = bankList.value.length > 0 || !!props.invitation.gift_address;

  if (footerSection.value) {
    // Initial states: Slide 1 starts at y: "0%", others start below the screen at y: "100%"
    // We keep opacity: 1 on all of them, since they are hidden off-screen by translating y
    if (hasLoveStory) {
      gsap.set(lovestoryWrapper.value, { y: "0%", opacity: 1 });
    }
    if (hasGallery) {
      gsap.set(galleryWrapper.value, { y: hasLoveStory ? "100%" : "0%", opacity: 1 });
    }
    const rsvpStartBelow = hasLoveStory || hasGallery;
    gsap.set(rsvpWrapper.value, { y: rsvpStartBelow ? "100%" : "0%", opacity: 1 });
    if (hasGift) {
      gsap.set(giftWrapper.value, { y: "100%", opacity: 1 });
    }
    gsap.set(footerWrapper.value, { opacity: 0, y: 40 });
    // Gates start wide open (swung inward) and invisible
    gsap.set(leftGateRef.value, { rotateY: -60, opacity: 0 });
    gsap.set(rightGateRef.value, { rotateY: 60, opacity: 0 });

    // Calculate dynamic length based on active sections
    let scrollEndMultiplier = 250;
    if (hasLoveStory) scrollEndMultiplier += 110;
    if (hasGallery) scrollEndMultiplier += 110;
    if (hasGift) scrollEndMultiplier += 110;

    pinTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: footerSection.value,
        start: 'top top',
        end: `+=${scrollEndMultiplier}%`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      }
    });

    let activeWrapper: any = null;

    // Slide 1: Love Story
    if (hasLoveStory) {
      activeWrapper = lovestoryWrapper.value;
    }

    // Slide 2: Gallery
    if (hasGallery) {
      if (activeWrapper) {
        // Transition from previous slide: previous slides UP off-screen, gallery slides UP to center
        pinTimeline.to(activeWrapper, {
          y: "-100%",
          duration: 1.0,
          ease: 'power2.inOut',
        });
        pinTimeline.to(galleryWrapper.value, {
          y: "0%",
          duration: 1.0,
          ease: 'power2.inOut',
        }, '<');
      }
      activeWrapper = galleryWrapper.value;
    }

    // Slide 3: RSVP
    if (activeWrapper) {
      pinTimeline.to(activeWrapper, {
        y: "-100%",
        duration: 1.0,
        ease: 'power2.inOut',
      });
      pinTimeline.to(rsvpWrapper.value, {
        y: "0%",
        duration: 1.0,
        ease: 'power2.inOut',
      }, '<');
    }
    activeWrapper = rsvpWrapper.value;

    // Slide 4: Gift
    if (hasGift) {
      pinTimeline.to(activeWrapper, {
        y: "-100%",
        duration: 1.0,
        ease: 'power2.inOut',
      });
      pinTimeline.to(giftWrapper.value, {
        y: "0%",
        duration: 1.0,
        ease: 'power2.inOut',
      }, '<');
      activeWrapper = giftWrapper.value;
    }

    // Slide 5: Transition to Footer greeting
    pinTimeline.to(activeWrapper, {
      y: "-100%",
      duration: 1.0,
      ease: 'power2.inOut',
    });

    // Background zooms out first
    pinTimeline.to(bgImageRef.value, {
      scale: 1.0,
      duration: 1.5,
      ease: 'power2.inOut',
    });

    // White overlay fades out to 0 at the same time
    if (whiteOverlayRef.value) {
      pinTimeline.to(whiteOverlayRef.value, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut',
      }, '<');
    }

    // After zoom-out is done, gates fade in and swing shut
    // Starts when zoom-out is at ~80% (0.3s before zoom-out finishes)
    pinTimeline.to([leftGateRef.value, rightGateRef.value], {
      opacity: 0.9,
      duration: 0.3,
      ease: 'power1.in',
    }, '-=0.3');

    pinTimeline.to(leftGateRef.value, {
      rotateY: 0,
      duration: 1.5,
      ease: 'power2.inOut',
    }, '<');

    pinTimeline.to(rightGateRef.value, {
      rotateY: 0,
      duration: 1.5,
      ease: 'power2.inOut',
    }, '<');

    // Footer text fades in after gates are closed
    pinTimeline.to(footerWrapper.value, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
    }, '-=0.3');
  } else {
    // Standard layout (no dynamic sections): footerWrapper is immediately fully visible
    if (footerWrapper.value) {
      gsap.set(footerWrapper.value, { opacity: 1, y: 0 });
    }
    if (whiteOverlayRef.value) {
      gsap.set(whiteOverlayRef.value, { opacity: 0 });
    }
  }
});

onBeforeUnmount(() => {
  if (pinTimeline) {
    pinTimeline.kill();
    if (pinTimeline.scrollTrigger) pinTimeline.scrollTrigger.kill();
  }
});

</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease forwards;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.premium-input {
  transition: all 0.3s ease !important;
}
.premium-input:focus {
  border-color: #BA7D85 !important;
  background-color: #ffffff !important;
  box-shadow: 0 0 0 3px rgba(186, 125, 133, 0.15) !important;
}
.premium-submit-btn {
  transition: all 0.3s ease !important;
}
.premium-submit-btn:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 10px 22px rgba(110, 135, 92, 0.35) !important;
  filter: brightness(1.03);
}
.premium-submit-btn:active {
  transform: translateY(0) scale(1);
}
</style>
