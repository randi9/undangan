<template>
  <section
    ref="sectionRef"
    class="relative min-h-[100dvh] w-full flex flex-col items-center justify-center box-border overflow-hidden bg-[#2D3E35]"
  >
    <!-- ======================================================== -->
    <!-- 1. SHARED BACKGROUND IMAGE (PANORAMA VERTIKAL GAZEBO)    -->
    <!-- PANDUAN NGE-EDIT:                                        -->
    <!-- - Tinggi Panorama     : 'height: 200%' di bgWrapperRef (2x tinggi layar) -->
    <!-- - Posisi Awal (Bawah) : translateY(-50%) (fokus 100% padang rumput bawah) -->
    <!-- - Posisi Akhir (Atas) : yPercent: 0 (fokus 100% puncak kubah gazebo atas) -->
    <!-- ======================================================== -->
    <div
      ref="bgContainerRef"
      style="
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
      "
    >
      <div
        ref="bgWrapperRef"
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 200%;
          will-change: transform;
        "
      >
        <img
          ref="bgImageRef"
          src="https://media.mengundanganda.com/evergreen/countdown%20section/dewirandi_9dbeed92-b311-4f90-8c41-3a4f21b005c4.webp"
          alt="Evergreen Gazebo Garden"
          style="
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center top;
            will-change: transform;
          "
        />

        <!-- ======================================================== -->
        <!-- 4 BATU PIJAKAN GROUND (MENEMPEL DI RUMPUT & IKUT SLIDE)  -->
        <!-- PANDUAN NGE-EDIT POSISI & UKURAN:                        -->
        <!-- ======================================================== -->
        <div
          ref="countdownDecorRef"
          style="
            position: absolute;
            top: 50%;
            height: 50%;
            left: 0;
            width: 100%;
            pointer-events: none;
            user-select: none;
            z-index: 5;
          "
        >
          <!-- ---------------------------------------------------- -->
          <!-- 1. BATU 4 (PALING ATAS - DETIK)                      -->
          <!-- PANDUAN: top: 23.8%, left: 52%, width: 155px         -->
          <!-- ---------------------------------------------------- -->
          <div
            style="
              position: absolute;
              top: 23.8%;
              left: 52%;
              transform: translate(-50%, -50%);
              width: 155px;
              opacity: 1;
            "
          >
            <div style="position: relative; width: 100%; height: 100%;">
              <img
                src="https://media.mengundanganda.com/evergreen/countdown%20section/dewirandi_3413e0a7-5e28-44d0-a2ef-5bb6d9e052da.webp"
                alt="Batu Detik"
                style="display: block; width: 100%; height: auto; object-fit: contain;"
              />
              <div
                v-if="hasDateSafe"
                style="
                  position: absolute;
                  inset: 0;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  transform: translateY(-3px);
                "
              >
                <span
                  class="font-serif font-bold text-white leading-none"
                  style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 34px; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(0, 0, 0, 0.55);"
                >
                  {{ pad(safeCountdown.seconds) }}
                </span>
                <span
                  class="font-semibold text-white/95 uppercase tracking-wider"
                  style="font-size: 11px; margin-top: 1px; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);"
                >
                  Detik
                </span>
              </div>
            </div>
          </div>

          <!-- ---------------------------------------------------- -->
          <!-- 2. BATU 3 (TENGAH ATAS - MENIT)                      -->
          <!-- PANDUAN: top: 38.5%, left: 46%, width: 210px         -->
          <!-- ---------------------------------------------------- -->
          <div
            style="
              position: absolute;
              top: 38.5%;
              left: 46%;
              transform: translate(-50%, -50%);
              width: 210px;
              opacity: 1;
            "
          >
            <div style="position: relative; width: 100%; height: 100%;">
              <img
                src="https://media.mengundanganda.com/evergreen/countdown%20section/dewirandi_3413e0a7-5e28-44d0-a2ef-5bb6d9e052da.webp"
                alt="Batu Menit"
                style="display: block; width: 100%; height: auto; object-fit: contain;"
              />
              <div
                v-if="hasDateSafe"
                style="
                  position: absolute;
                  inset: 0;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  transform: translateY(-4px);
                "
              >
                <span
                  class="font-serif font-bold text-white leading-none"
                  style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 46px; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(0, 0, 0, 0.55);"
                >
                  {{ pad(safeCountdown.minutes) }}
                </span>
                <span
                  class="font-semibold text-white/95 uppercase tracking-wider"
                  style="font-size: 13px; margin-top: 1.5px; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);"
                >
                  Menit
                </span>
              </div>
            </div>
          </div>

          <!-- ---------------------------------------------------- -->
          <!-- 3. BATU 2 (TENGAH BAWAH - JAM)                       -->
          <!-- PANDUAN: top: 58%, left: 53.5%, width: 265px         -->
          <!-- ---------------------------------------------------- -->
          <div
            style="
              position: absolute;
              top: 58%;
              left: 53.5%;
              transform: translate(-50%, -50%);
              width: 265px;
              opacity: 1;
            "
          >
            <div style="position: relative; width: 100%; height: 100%;">
              <img
                src="https://media.mengundanganda.com/evergreen/countdown%20section/dewirandi_3413e0a7-5e28-44d0-a2ef-5bb6d9e052da.webp"
                alt="Batu Jam"
                style="display: block; width: 100%; height: auto; object-fit: contain;"
              />
              <div
                v-if="hasDateSafe"
                style="
                  position: absolute;
                  inset: 0;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  transform: translateY(-5px);
                "
              >
                <span
                  class="font-serif font-bold text-white leading-none"
                  style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 58px; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(0, 0, 0, 0.55);"
                >
                  {{ pad(safeCountdown.hours) }}
                </span>
                <span
                  class="font-semibold text-white/95 uppercase tracking-wider"
                  style="font-size: 15px; margin-top: 2px; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);"
                >
                  Jam
                </span>
              </div>
            </div>
          </div>

          <!-- ---------------------------------------------------- -->
          <!-- 4. BATU 1 (PALING BAWAH - HARI)                      -->
          <!-- PANDUAN: top: 85%, left: 47%, width: 320px           -->
          <!-- ---------------------------------------------------- -->
          <div
            style="
              position: absolute;
              top: 85%;
              left: 47%;
              transform: translate(-50%, -50%);
              width: 320px;
              opacity: 1;
            "
          >
            <div style="position: relative; width: 100%; height: 100%;">
              <img
                src="https://media.mengundanganda.com/evergreen/countdown%20section/dewirandi_3413e0a7-5e28-44d0-a2ef-5bb6d9e052da.webp"
                alt="Batu Hari"
                style="display: block; width: 100%; height: auto; object-fit: contain;"
              />
              <div
                v-if="hasDateSafe"
                style="
                  position: absolute;
                  inset: 0;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  transform: translateY(-6px);
                "
              >
                <span
                  class="font-serif font-bold text-white leading-none"
                  style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 72px; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.6);"
                >
                  {{ pad(safeCountdown.days) }}
                </span>
                <span
                  class="font-semibold text-white/95 uppercase tracking-widest"
                  style="font-size: 17px; margin-top: 2px; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);"
                >
                  Hari
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- 2. KONTEN HEADER COUNTDOWN (DI POSISI ATAS LAYAR)        -->
    <!-- ======================================================== -->
    <div
      ref="countdownContainerRef"
      class="w-full max-w-3xl mx-auto px-4 relative z-10 flex flex-col items-center justify-start text-center"
      style="position: absolute; top: 6.5%; left: 0; right: 0; margin: auto;"
    >
      <!-- Countdown Header Title -->
      <div class="mb-3">
        <span
          class="text-xs uppercase tracking-[0.3em] text-white font-bold block mb-1.5"
          style="text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6), 0 1px 2px rgba(0, 0, 0, 0.85);"
        >
          Menghitung Hari
        </span>
        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-semibold leading-tight"
          style="font-family: 'Cormorant Garamond', Georgia, serif; text-shadow: 0 3px 8px rgba(0, 0, 0, 0.65), 0 1px 3px rgba(0, 0, 0, 0.85);"
        >
          Menuju Hari Bahagia
        </h2>
        <div class="w-12 h-[1.5px] bg-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] mx-auto mt-2.5"></div>
      </div>

      <!-- Tombol Simpan Ke Kalender -->
      <div v-if="calendarUrl" style="margin-top: 14px; margin-bottom: 8px;">
        <a
          :href="calendarUrl"
          target="_blank"
          rel="noopener noreferrer"
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 12px 28px;
            border-radius: 9999px;
            background-color: rgba(39, 70, 53, 0.4);
            color: #ffffff;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            text-decoration: none;
            border: 1px solid rgba(255, 255, 255, 0.5);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            transition: all 0.3s ease;
          "
        >
          <svg style="width: 16px; height: 16px; flex-shrink: 0; color: #ffffff;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <span style="color: #ffffff; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);">Simpan Ke Kalender</span>
        </a>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- 3. KONTEN EVENTS / RANGKAIAN ACARA (FASE 2: DI DEPAN GAZEBO) -->
    <!-- ======================================================== -->
    <div
      ref="eventsContainerRef"
      class="w-full mx-auto px-0 relative z-20 flex flex-col items-center justify-center text-center opacity-0"
      style="position: absolute; inset: 0; margin: auto; height: 100%; max-width: 580px; pointer-events: none;"
    >
      <!-- Events Header -->
      <div ref="eventsHeaderRef" style="position: absolute; top: 8%; margin-bottom: 0; pointer-events: auto;">
        <span
          class="text-[12px] uppercase tracking-[0.3em] font-bold block mb-1.5"
          style="color: #ffffff; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.9);"
        >
          Rangkaian Acara
        </span>
        <h2
          class="font-serif font-semibold leading-tight"
          style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 38px; color: #ffffff; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.9);"
        >
          Waktu & Lokasi
        </h2>
        <div class="w-12 h-[1.5px] mx-auto mt-3" style="background-color: #ffffff; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);"></div>
      </div>

      <!-- ===================================================== -->
      <!-- CONTAINER CARD EVENT DENGAN 3D FLIP UNTUK KHUTBAH NIKAH -->
      <!-- ===================================================== -->
      <div
        ref="eventCardWrapperRef"
        class="relative w-full pointer-events-auto flex items-center justify-center"
        style="
          width: 540px;
          max-width: 100%;
          min-height: 450px;
          opacity: 1;
          perspective: 1200px;
        "
      >
        <div
          ref="cardInnerRef"
          style="
            position: relative;
            width: 100%;
            min-height: 450px;
            transform-style: preserve-3d;
            will-change: transform;
          "
        >
          <!-- ===================================================== -->
          <!-- MUKA DEPAN: AKAD NIKAH & RESEPSI                      -->
          <!-- ===================================================== -->
          <div
            ref="cardFrontRef"
            style="
              position: relative;
              width: 100%;
              min-height: 450px;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
              transform: rotateY(0deg);
            "
          >
            <!-- Background Image dengan Opasitas 0.8 (Akad & Resepsi) -->
            <!-- Menggunakan background-size 128% 100% untuk memotong margin transparan pada gambar asli sehingga kertas parchment terlihat jauh lebih lebar -->
            <div
              style="
                position: absolute;
                inset: 0;
                background-image: url('https://media.mengundanganda.com/evergreen/event%20section/dewirandi_8708174e-3b5b-43cb-b600-7f147e60e54f.webp');
                background-size: 128% 100%;
                background-position: center center;
                background-repeat: no-repeat;
                opacity: 0.8;
                pointer-events: none;
                z-index: 0;
              "
            ></div>

            <!-- ===================================================== -->
            <!-- KONTEN INFO AKAD NIKAH                                -->
            <!-- ===================================================== -->
            <div
              v-if="invitation.akad_date"
              ref="akadContentRef"
              class="w-full flex flex-col items-center justify-center text-center relative z-10"
              style="max-width: 320px; margin: 0 auto; padding-top: 55px; padding-bottom: 55px;"
            >
              <!-- Badge Akad Nikah -->
              <div style="margin-bottom: 8px;">
                <span style="
                  display: inline-block;
                  padding: 4px 12px;
                  border-radius: 9999px;
                  background-color: rgba(228, 236, 231, 0.95);
                  color: #1f3a2c;
                  font-size: 9.5px;
                  font-weight: 700;
                  text-transform: uppercase;
                  letter-spacing: 0.15em;
                  border: 1px solid #c2d6c9;
                ">
                  Akad Nikah
                </span>
              </div>

              <!-- Tanggal Akad -->
              <h3
                style="
                  font-family: 'Cormorant Garamond', Georgia, serif;
                  font-size: 19px;
                  font-weight: 700;
                  color: #162b20;
                  margin-bottom: 10px;
                  line-height: 1.2;
                "
              >
                {{ formatDate(invitation.akad_date) }}
              </h3>

              <!-- Detail Waktu & Lokasi -->
              <div style="
                display: flex;
                flex-direction: column;
                gap: 6px;
                font-size: 11px;
                color: #3d5447;
                margin-bottom: 14px;
                width: 100%;
              ">
                <!-- Waktu -->
                <div style="display: flex; align-items: center; justify-content: center; gap: 6px;">
                  <svg style="width: 14px; height: 14px; color: #3f6350; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span style="font-weight: 600;">{{ invitation.akad_time || '08:00 WIB - Selesai' }}</span>
                </div>

                <!-- Tempat & Alamat -->
                <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
                  <div style="display: flex; align-items: center; gap: 4px; color: #1b3024; font-weight: 700;">
                    <svg style="width: 14px; height: 14px; color: #3f6350; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>{{ invitation.akad_venue }}</span>
                  </div>
                  <p v-if="invitation.akad_address" style="font-size: 10.5px; color: #5c7367; line-height: 1.4; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    {{ invitation.akad_address }}
                  </p>
                </div>
              </div>

              <!-- Tombol Peta Lokasi & Streaming -->
              <div style="display: flex; flex-direction: column; gap: 6px; width: 100%; align-items: center;">
                <a
                  v-if="invitation.akad_map_url"
                  :href="invitation.akad_map_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    padding: 8px 24px;
                    border-radius: 9999px;
                    background-color: #2f4a3b;
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 10px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                  "
                >
                  <span>Buka Peta Lokasi</span>
                  <svg style="width: 12px; height: 12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>

                <!-- Streaming Button if no resepsi and no khutbah -->
                <a
                  v-if="!invitation.resepsi_date && !invitation.khutbah_nikah && invitation.streaming_enabled && invitation.streaming_url"
                  :href="invitation.streaming_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    padding: 7px 20px;
                    border-radius: 9999px;
                    background-color: #e4ece7;
                    color: #1f3a2c;
                    text-decoration: none;
                    font-size: 9.5px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                  "
                >
                  <span>Live Streaming</span>
                </a>
              </div>
            </div>

            <!-- ===================================================== -->
            <!-- KONTEN INFO RESEPSI PERNIKAHAN                        -->
            <!-- ===================================================== -->
            <div
              v-if="invitation.resepsi_date"
              ref="resepsiContentRef"
              class="w-full flex flex-col items-center justify-center text-center"
              :style="invitation.akad_date ? 'position: absolute; left: 0; right: 0; margin: auto; max-width: 320px; padding-top: 55px; padding-bottom: 55px; z-index: 10; opacity: 0; pointer-events: none;' : 'position: relative; z-index: 10; max-width: 320px; margin: 0 auto; padding-top: 55px; padding-bottom: 55px;'"
            >
              <!-- Badge Resepsi -->
              <div style="margin-bottom: 8px;">
                <span style="
                  display: inline-block;
                  padding: 4px 12px;
                  border-radius: 9999px;
                  background-color: rgba(228, 236, 231, 0.95);
                  color: #1f3a2c;
                  font-size: 9.5px;
                  font-weight: 700;
                  text-transform: uppercase;
                  letter-spacing: 0.15em;
                  border: 1px solid #c2d6c9;
                ">
                  Resepsi Pernikahan
                </span>
              </div>

              <!-- Tanggal Resepsi -->
              <h3
                style="
                  font-family: 'Cormorant Garamond', Georgia, serif;
                  font-size: 18px;
                  font-weight: 700;
                  color: #162b20;
                  margin-bottom: 10px;
                  line-height: 1.2;
                "
              >
                {{ formatDate(invitation.resepsi_date) }}
              </h3>

              <!-- Detail Waktu & Lokasi -->
              <div style="
                display: flex;
                flex-direction: column;
                gap: 6px;
                font-size: 11px;
                color: #3d5447;
                margin-bottom: 14px;
                width: 100%;
              ">
                <!-- Waktu -->
                <div style="display: flex; align-items: center; justify-content: center; gap: 6px;">
                  <svg style="width: 14px; height: 14px; color: #3f6350; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span style="font-weight: 600;">{{ invitation.resepsi_time || '11:00 WIB - Selesai' }}</span>
                </div>

                <!-- Tempat & Alamat -->
                <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
                  <div style="display: flex; align-items: center; gap: 4px; color: #1b3024; font-weight: 700;">
                    <svg style="width: 14px; height: 14px; color: #3f6350; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>{{ invitation.resepsi_venue }}</span>
                  </div>
                  <p v-if="invitation.resepsi_address" style="font-size: 10.5px; color: #5c7367; line-height: 1.4; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    {{ invitation.resepsi_address }}
                  </p>
                </div>
              </div>

              <!-- Tombol Peta Lokasi & Streaming -->
              <div style="display: flex; flex-direction: column; gap: 6px; width: 100%; align-items: center;">
                <a
                  v-if="invitation.resepsi_map_url"
                  :href="invitation.resepsi_map_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    padding: 8px 24px;
                    border-radius: 9999px;
                    background-color: #2f4a3b;
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 10px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                  "
                >
                  <span>Buka Peta Lokasi</span>
                  <svg style="width: 12px; height: 12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>

                <!-- Live Streaming Button (jika tidak ada khutbah) -->
                <a
                  v-if="!invitation.khutbah_nikah && invitation.streaming_enabled && invitation.streaming_url"
                  :href="invitation.streaming_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    padding: 7px 20px;
                    border-radius: 9999px;
                    background-color: #e4ece7;
                    color: #1f3a2c;
                    text-decoration: none;
                    font-size: 9.5px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                  "
                >
                  <span>Live Streaming</span>
                </a>
              </div>
            </div>
          </div>

          <!-- ===================================================== -->
          <!-- MUKA BELAKANG: KHUTBAH NIKAH (3D FLIP EFFECT)         -->
          <!-- ===================================================== -->
          <div
            v-if="invitation.khutbah_nikah"
            ref="cardBackRef"
            style="
              position: absolute;
              inset: 0;
              width: 100%;
              min-height: 450px;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
              transform: rotateY(180deg);
              pointer-events: none;
            "
          >
            <!-- Background Image dengan Opasitas 0.8 (Gambar Khutbah Nikah Khusus) -->
            <div
              style="
                position: absolute;
                inset: 0;
                background-image: url('https://media.mengundanganda.com/evergreen/event%20section/dewirandi_6b2fbf61-2abe-4871-9fe3-6e0e3c90637a.webp');
                background-size: 128% 100%;
                background-position: center center;
                background-repeat: no-repeat;
                opacity: 0.8;
                pointer-events: none;
                z-index: 0;
              "
            ></div>

            <!-- KONTEN INFO KHUTBAH NIKAH -->
            <div
              class="w-full flex flex-col items-center justify-center text-center relative z-10"
              style="max-width: 320px; margin: 0 auto; padding-top: 55px; padding-bottom: 55px;"
            >
              <!-- Badge Khutbah Nikah -->
              <div style="margin-bottom: 8px;">
                <span
                  style="
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: 9999px;
                    background-color: rgba(228, 236, 231, 0.95);
                    color: #1f3a2c;
                    font-size: 9.5px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    border: 1px solid #c2d6c9;
                  "
                >
                  Khutbah Nikah
                </span>
              </div>

              <!-- Deskripsi Pengantar -->
              <p
                style="
                  font-size: 11.5px;
                  color: #ffffff;
                  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
                  line-height: 1.45;
                  margin: 0 0 14px 0;
                  max-width: 270px;
                "
              >
                Akad nikah akan dibekali khutbah nikah oleh:
              </p>

              <!-- Kotak Nama Khatib / Penceramah -->
              <div
                style="
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  background: rgba(255, 255, 255, 0.65);
                  border: 1px solid rgba(47, 74, 59, 0.2);
                  border-radius: 12px;
                  padding: 8px 16px;
                  margin-bottom: 8px;
                  max-width: 280px;
                  box-sizing: border-box;
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
                "
              >
                <div style="display: flex; align-items: center; gap: 6px;">
                  <svg style="width: 15px; height: 15px; color: #2f4a3b; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                  <span
                    style="
                      font-family: 'Cormorant Garamond', Georgia, serif;
                      font-size: 16px;
                      font-weight: 700;
                      color: #142a1d;
                      line-height: 1.25;
                    "
                  >
                    {{ khutbahParts.speaker }}
                  </span>
                </div>
              </div>

              <!-- Waktu Khutbah -->
              <div
                v-if="khutbahParts.time"
                style="
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  gap: 5px;
                  font-size: 11px;
                  font-weight: 600;
                  color: #ffffff;
                  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
                  margin-bottom: 14px;
                "
              >
                <svg style="width: 13px; height: 13px; color: #ffffff; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Pukul: {{ khutbahParts.time }}</span>
              </div>

              <!-- Live Streaming Button (jika streaming diaktifkan) -->
              <div v-if="invitation.streaming_enabled && invitation.streaming_url" style="display: flex; flex-direction: column; gap: 6px; width: 100%; align-items: center;">
                <a
                  :href="invitation.streaming_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    padding: 7px 20px;
                    border-radius: 9999px;
                    background-color: #2f4a3b;
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 9.5px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                  "
                >
                  <svg style="width: 12px; height: 12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  <span>Saksikan Khutbah Live</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Invitation } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig?: ThemeConfig;
  countdown?: { days: number; hours: number; minutes: number; seconds: number };
  hasDate?: boolean;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const bgContainerRef = ref<HTMLElement | null>(null);
const bgWrapperRef = ref<HTMLElement | null>(null);
const bgImageRef = ref<HTMLElement | null>(null);
const countdownDecorRef = ref<HTMLElement | null>(null);
const countdownContainerRef = ref<HTMLElement | null>(null);
const eventsContainerRef = ref<HTMLElement | null>(null);
const eventsHeaderRef = ref<HTMLElement | null>(null);
const eventCardWrapperRef = ref<HTMLElement | null>(null);
const cardInnerRef = ref<HTMLElement | null>(null);
const cardFrontRef = ref<HTMLElement | null>(null);
const cardBackRef = ref<HTMLElement | null>(null);
const akadContentRef = ref<HTMLElement | null>(null);
const resepsiContentRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

const pad = (num: number) => String(Math.max(0, num)).padStart(2, '0');

const safeCountdown = computed(() => {
  return props.countdown || { days: 0, hours: 0, minutes: 0, seconds: 0 };
});

const hasDateSafe = computed(() => {
  return props.hasDate !== undefined
    ? props.hasDate
    : !!(props.invitation?.akad_date || props.invitation?.resepsi_date);
});

const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const calendarUrl = computed(() => {
  const dateStr = props.invitation?.akad_date || props.invitation?.resepsi_date;
  if (!dateStr) return '';

  const title = encodeURIComponent(
    `Pernikahan ${props.invitation?.groom_name || ''} & ${props.invitation?.bride_name || ''}`
  );
  const details = encodeURIComponent(
    `Acara Pernikahan ${props.invitation?.groom_full_name || ''} & ${props.invitation?.bride_full_name || ''}`
  );
  const location = encodeURIComponent(
    props.invitation?.akad_venue || props.invitation?.resepsi_venue || ''
  );

  const formattedDate = dateStr.replace(/-/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${formattedDate}/${formattedDate}`;
});

const khutbahParts = computed(() => {
  const raw = props.invitation?.khutbah_nikah;
  if (!raw) return { speaker: '', time: '' };
  if (raw.includes('/')) {
    const parts = raw.split('/');
    return {
      speaker: parts[0]?.trim() ?? '',
      time: parts[1]?.trim() ?? ''
    };
  }
  return { speaker: raw.trim(), time: '' };
});

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    // POSISI AWAL (FASE COUNTDOWN):
    // yPercent: -50 menaikkan wrapper setinggi 100vh sehingga yang terlihat di layar adalah DASAR/BAWAH GAMBAR (padang rumput hijau)
    if (bgWrapperRef.value) {
      gsap.set(bgWrapperRef.value, { yPercent: -50 });
    }
    if (bgImageRef.value) {
      gsap.set(bgImageRef.value, { scale: 1.25, transformOrigin: 'center center' });
    }

    // HITUNG PIN END DINAMIS
    const hasResepsi = !!props.invitation?.resepsi_date;
    const hasKhutbah = !!props.invitation?.khutbah_nikah;
    let pinEnd = '+=400%';
    if (hasResepsi && hasKhutbah) {
      pinEnd = '+=550%';
    } else if (hasResepsi || hasKhutbah) {
      pinEnd = '+=460%';
    }

    // PINNING TIMELINE: COUNTDOWN -> FULL SLIDE TO GAZEBO -> EVENTS IN -> AKAD -> RESEPSI -> FLIP KHUTBAH -> EXIT
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: pinEnd,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });

    // 1. Tahan tampilan countdown di awal (melihat bagian rumput/bawah gambar)
    tl.to({}, { duration: 0.2 });

    // 2. Header Countdown fade out & geser naik sedikit (Batu tetap utuh menempel di tanah dan ikut meluncur ke bawah bersama background)
    if (countdownContainerRef.value) {
      tl.to(countdownContainerRef.value, {
        opacity: 0,
        y: -25,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          if (countdownContainerRef.value) {
            countdownContainerRef.value.style.pointerEvents = 'none';
          }
        },
        onReverseComplete: () => {
          if (countdownContainerRef.value) {
            countdownContainerRef.value.style.pointerEvents = 'auto';
          }
        },
      });
    }

    // 3. SLIDE CEPAT & MULUS DARI DASAR BAWAH MENUJU PUNCAK ATAS (GAZEBO):
    //    yPercent bergerak dari -50% (bawah) menuju 0% (tepat pucuk atas kubah gazebo & langit)
    //    sambil zoom out dari 1.25 ke 1.0
    if (bgWrapperRef.value) {
      tl.to(
        bgWrapperRef.value,
        {
          yPercent: 0, // Pindah ke puncak atas gambar
          duration: 1.2,
          ease: 'power2.inOut',
        },
        'slideToGazebo'
      );
    }

    if (bgImageRef.value) {
      tl.to(
        bgImageRef.value,
        {
          scale: 1.0,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        'slideToGazebo'
      );
    }

    // 4. Jeda setelah slide mencapai gazebo
    tl.to({}, { duration: 0.2 });

    // 5. Events Container & Header mulai Fade In di depan Gazebo
    if (eventsContainerRef.value) {
      tl.to(
        eventsContainerRef.value,
        {
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          onStart: () => {
            if (eventsContainerRef.value) {
              eventsContainerRef.value.style.pointerEvents = 'auto';
            }
          },
          onReverseComplete: () => {
            if (eventsContainerRef.value) {
              eventsContainerRef.value.style.pointerEvents = 'none';
            }
          },
        },
        'eventsAppear'
      );
    }

    if (eventsHeaderRef.value) {
      tl.fromTo(
        eventsHeaderRef.value,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        'eventsAppear+=0.05'
      );
    }

    if (eventCardWrapperRef.value) {
      tl.fromTo(
        eventCardWrapperRef.value,
        { opacity: 0, scale: 0.94, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        'eventsAppear+=0.1'
      );
    }

    // 6. Hold info Akad Nikah
    tl.to({}, { duration: 1.1 });

    // 7. Jika ada Resepsi Pernikahan, lakukan pergantian halus (Akad out -> Resepsi in)
    const hasBoth = props.invitation?.akad_date && props.invitation?.resepsi_date;
    if (hasBoth) {
      if (akadContentRef.value) {
        tl.to(
          akadContentRef.value,
          {
            opacity: 0,
            y: -18,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
              if (akadContentRef.value) akadContentRef.value.style.pointerEvents = 'none';
            },
            onReverseComplete: () => {
              if (akadContentRef.value) akadContentRef.value.style.pointerEvents = 'auto';
            },
          },
          'akadOut'
        );
      }

      // Jeda gap card kosong sejenak
      tl.to({}, { duration: 0.35 });

      if (resepsiContentRef.value) {
        tl.fromTo(
          resepsiContentRef.value,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            onStart: () => {
              if (resepsiContentRef.value) resepsiContentRef.value.style.pointerEvents = 'auto';
            },
            onReverseComplete: () => {
              if (resepsiContentRef.value) resepsiContentRef.value.style.pointerEvents = 'none';
            },
          },
          'resepsiIn'
        );
      }

      // Hold info Resepsi
      tl.to({}, { duration: 1.1 });
    }

    // 8. Jika ada Khutbah Nikah, lakukan efek 3D Flip Card ke samping
    if (props.invitation?.khutbah_nikah && cardInnerRef.value) {
      tl.to({}, { duration: 0.35 });

      tl.to(
        cardInnerRef.value,
        {
          rotateY: 180,
          duration: 1.1,
          ease: 'power2.inOut',
          onStart: () => {
            if (cardBackRef.value) cardBackRef.value.style.pointerEvents = 'auto';
            if (cardFrontRef.value) cardFrontRef.value.style.pointerEvents = 'none';
          },
          onReverseComplete: () => {
            if (cardBackRef.value) cardBackRef.value.style.pointerEvents = 'none';
            if (cardFrontRef.value) cardFrontRef.value.style.pointerEvents = 'auto';
          },
        },
        'flipToKhutbah'
      );

      // Hold info Khutbah Nikah
      tl.to({}, { duration: 1.2 });
    }

    // 9. Keluar ke section berikutnya (Love Story)
    if (eventsContainerRef.value) {
      tl.to(eventsContainerRef.value, {
        opacity: 0,
        y: -15,
        scale: 0.96,
        duration: 0.75,
        ease: 'power2.inOut',
      });
    }
  }, sectionRef.value);
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
});
</script>

<style scoped>
/* Scoped transitions & adjustments for Evergreen Countdown & Events */
</style>

