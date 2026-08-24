<template>
  <section
    v-if="quote"
    ref="quoteSection"
    class="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 box-border overflow-hidden bg-[#2D3E35]"
  >
    <!-- ======================================================== -->
    <!-- BACKGROUND IMAGE SECTION QUOTE EVERGREEN -->
    <!-- PANDUAN NGE-EDIT: -->
    <!-- 1. Zoom (Skala)     : Ubah 'background-size: cover' (misal: '110%', '125%', '150%') ATAU 'transform: scale(1.0)' -->
    <!-- 2. Posisi Geser X/Y : Ubah 'background-position: center center' (misal: '50% 30%' untuk geser naik, '60% 50%' geser kanan, dll) -->
    <!-- 3. Geser Tambahan   : Ubah 'transform: scale(1.0) translate(0px, 0px)' (misal: translate(20px, -30px)) -->
    <!-- 4. Opasitas         : Ubah 'opacity: 1' (misal: 0.9, 0.85) jika ingin lebih transparan -->
    <!-- ======================================================== -->
    <div
      style="
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background-image: url('https://media.mengundanganda.com/evergreen/quotes%20section/dewirandi_925e4a31-924c-4100-a10a-d670c0d3f801.webp');
        background-repeat: no-repeat;
        background-size: cover;                  /* ATUR ZOOM: 'cover', '110%', '125%', '150%' */
        background-position: center center;      /* ATUR GESER: '50% 50%', 'center top', 'left center', dll */
        transform: scale(1.5) translate(0px, 0px); /* ATUR ZOOM & GESER: scale(1.3 = zoom 130%, scale(1.5), dll) */
      "
    ></div>

    <!-- ======================================================== -->
    <!-- LAYER PUTIH (OVERLAY MENUTUP SELURUH SECTION) -->
    <!-- PANDUAN NGE-EDIT: -->
    <!-- 1. Warna / Gradasi : Ubah 'background: #ffffff' (misal: 'rgba(255, 255, 255, 0.9)', dll) -->
    <!-- 2. Opasitas        : Ubah 'opacity: 1' (misal: 0.8, 0.95, 1) -->
    <!-- ======================================================== -->
    <div
      style="
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background: #ffffff;
        opacity: 0.5;                            /* ATUR KEPEKATAN PUTIH: 0.2 (tipis), 0.35 (sedang), 0.5 (tebal) */
      "
    ></div>

    <!-- ======================================================== -->
    <!-- ASSET DEKORASI QUOTE EVERGREEN -->
    <!-- PANDUAN NGE-EDIT: -->
    <!-- 1. Posisi Vertikal : Ubah 'top: 50%' / 'bottom: auto' (misal: top: 20%, top: 100px, bottom: 0px) -->
    <!-- 2. Posisi Horizontal : Ubah 'left: 50%' / 'right: auto' (misal: left: 0, right: 0) -->
    <!-- 3. Ukuran Lebar    : Ubah 'width: 100%' (bisa '80%', '90%', '100%', '110%', atau pakai px '400px') -->
    <!-- 4. Transform/Geser : Ubah 'transform: translate(-50%, -50%) scale(1)' (titik tengah & skala) -->
    <!-- 5. Opasitas        : Ubah 'opacity: 1' (misal: 0.9, 0.8, dll) -->
    <!-- 6. Layer (z-index) : Ubah 'z-index: 2' -->
    <!-- ======================================================== -->
    <div
      style="
        position: absolute;
        top: 80%;                                /* ATUR POSISI VERTIKAL: '50%', '20px', 'auto', dll */
        left: 20%;                               /* ATUR POSISI HORIZONTAL: '50%' (tengah), '0px', dll */
        /* bottom: 0px; */                       /* AKTIFKAN JIKA INGIN DI TEMPEL BAWAH */
        /* right: 0px; */                        /* AKTIFKAN JIKA INGIN DI TEMPEL KANAN */
        transform: translate(-50%, -50%) scale(1); /* ATUR TITIK PUSAT & SKALA: translate(-50%, -50%) scale(1) */
        width: 185%;                             /* ATUR UKURAN: '80%', '90%', '100%', '110%', '400px', dll */
        z-index: 2;                              /* LAYER DI ATAS LAYER PUTIH (z-index: 1) */
        pointer-events: none;
        user-select: none;
        opacity: 1;                              /* TINGKAT TRANSPARANSI: 0.0 - 1.0 */
      "
    >
      <div style="position: relative; width: 100%; height: 100%;">
        <!-- GAMBAR ASSET FOUNTAIN -->
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_1304920c-0f50-491a-999d-f5048d4c3a96.webp"
          alt="Dekorasi Quotes Evergreen"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />

        <!-- ======================================================== -->
        <!-- ANIMASI AIR MANCUR (CSS + SVG OVERLAY) -->
        <!-- ======================================================== -->
        <div
          class="fountain-water-wrapper"
          style="
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: visible;
          "
        >
          <!-- 1. SEMBURAN AIR PUCUK ATAS (FOUNTAIN SPOUT JETS) -->
          <!-- PANDUAN POSISI PUCUK: top & left diatur agar pas di ujung atas mahkota nanas -->
          <div
            class="fountain-spout-container"
            style="
              position: absolute;
              top: 12%;   /* Posisi pucuk nanas */
              left: 50%;  /* Geser kiri/kanan pucuk air */
              transform: translate(-50%, -46px);
              width: 140px;
              height: 165px;
              pointer-events: none;
              overflow: visible;
            "
          >
            <svg
              viewBox="0 0 140 165"
              style="width: 100%; height: 100%; overflow: visible;"
            >
              <defs>
                <linearGradient id="fountainWaterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stop-color="rgba(255, 255, 255, 0.95)" />
                  <stop offset="60%" stop-color="rgba(215, 245, 245, 0.85)" />
                  <stop offset="100%" stop-color="rgba(255, 255, 255, 0.4)" />
                </linearGradient>
                <linearGradient id="fountainWaterGradCascade" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="rgba(255, 255, 255, 0.95)" />
                  <stop offset="30%" stop-color="rgba(220, 250, 255, 0.8)" />
                  <stop offset="70%" stop-color="rgba(210, 245, 252, 0.55)" />
                  <stop offset="100%" stop-color="rgba(195, 240, 250, 0.2)" />
                </linearGradient>
                <filter id="waterGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="0.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <!-- 1. Pancaran Tengah Tinggi -->
              <path
                class="water-stream stream-center"
                d="M 70 46 Q 70 18, 70 6 Q 70 18, 69 46"
                fill="none"
                stroke="url(#fountainWaterGrad)"
                stroke-width="2.2"
                stroke-linecap="round"
                filter="url(#waterGlow)"
              />
              <path
                class="water-stream stream-center-fine"
                d="M 70 46 Q 70 12, 70 2 Q 70 12, 71 46"
                fill="none"
                stroke="rgba(255, 255, 255, 0.9)"
                stroke-width="1.2"
                stroke-linecap="round"
              />

              <!-- 2. Pancaran Lengkung Dalam (Pundak Nanas) -->
              <path
                class="water-stream stream-left-inner"
                d="M 70 46 Q 66 18, 58 12 Q 46 18, 42 50"
                fill="none"
                stroke="url(#fountainWaterGrad)"
                stroke-width="1.8"
                stroke-linecap="round"
                filter="url(#waterGlow)"
              />
              <path
                class="water-stream stream-right-inner"
                d="M 70 46 Q 74 18, 82 12 Q 94 18, 98 50"
                fill="none"
                stroke="url(#fountainWaterGrad)"
                stroke-width="1.8"
                stroke-linecap="round"
                filter="url(#waterGlow)"
              />

              <!-- 3. Pancaran Lengkung Luar yang Jatuh Tepat ke Mangkok Atas (Mangkok Pertama) -->
              <path
                class="water-stream stream-left-cascade"
                d="M 70 46 Q 58 15, 40 14 Q 18 28, 12 75 Q 8 115, 18 146"
                fill="none"
                stroke="url(#fountainWaterGradCascade)"
                stroke-width="1.5"
                stroke-linecap="round"
                filter="url(#waterGlow)"
              />
              <path
                class="water-stream stream-right-cascade"
                d="M 70 46 Q 82 15, 100 14 Q 122 28, 128 75 Q 132 115, 122 146"
                fill="none"
                stroke="url(#fountainWaterGradCascade)"
                stroke-width="1.5"
                stroke-linecap="round"
                filter="url(#waterGlow)"
              />

              <!-- 4. Untaian Halus Tambahan yang Menetes ke Mangkok Pertama -->
              <path
                class="water-stream stream-left-fine-cascade"
                d="M 70 46 Q 62 16, 48 14 Q 30 26, 26 85 Q 24 120, 32 148"
                fill="none"
                stroke="rgba(255, 255, 255, 0.85)"
                stroke-width="1.0"
                stroke-linecap="round"
              />
              <path
                class="water-stream stream-right-fine-cascade"
                d="M 70 46 Q 78 16, 92 14 Q 110 26, 114 85 Q 116 120, 108 148"
                fill="none"
                stroke="rgba(255, 255, 255, 0.85)"
                stroke-width="1.0"
                stroke-linecap="round"
              />

              <!-- 5. Aliran Tengah Depan yang Mengalir ke Mangkok Pertama -->
              <path
                class="water-stream stream-center-mid-cascade"
                d="M 70 46 Q 67 20, 60 16 Q 54 32, 58 85 Q 62 120, 60 150"
                fill="none"
                stroke="rgba(255, 255, 255, 0.8)"
                stroke-width="1.0"
                stroke-linecap="round"
              />
              <path
                class="water-stream stream-center-mid-cascade2"
                d="M 70 46 Q 73 20, 80 16 Q 86 32, 82 85 Q 78 120, 80 150"
                fill="none"
                stroke="rgba(255, 255, 255, 0.8)"
                stroke-width="1.0"
                stroke-linecap="round"
              />

              <!-- 6. PERCIKAN AIR DI MANGKOK PERTAMA (UPPER BASIN SPLASHES) -->
              <g class="basin-top-splashes">
                <!-- Percikan Kiri Luar (X=18, Y=146) -->
                <circle class="top-splash tsp-1" cx="18" cy="146" r="0.9" fill="#ffffff" />
                <circle class="top-splash tsp-2" cx="16" cy="144" r="0.6" fill="rgba(230,250,255,0.85)" />

                <!-- Percikan Kiri Dalam (X=32, Y=148) -->
                <circle class="top-splash tsp-3" cx="32" cy="148" r="1.1" fill="#ffffff" />
                <circle class="top-splash tsp-4" cx="35" cy="146" r="0.7" fill="rgba(230,250,255,0.85)" />

                <!-- Percikan Tengah Depan (X=60 & 80, Y=150) -->
                <circle class="top-splash tsp-5" cx="60" cy="150" r="0.9" fill="#ffffff" />
                <circle class="top-splash tsp-6" cx="70" cy="151" r="1.2" fill="#ffffff" />
                <circle class="top-splash tsp-7" cx="80" cy="150" r="0.9" fill="#ffffff" />

                <!-- Percikan Kanan Dalam (X=108, Y=148) -->
                <circle class="top-splash tsp-8" cx="108" cy="148" r="1.1" fill="#ffffff" />
                <circle class="top-splash tsp-9" cx="105" cy="146" r="0.7" fill="rgba(230,250,255,0.85)" />

                <!-- Percikan Kanan Luar (X=122, Y=146) -->
                <circle class="top-splash tsp-10" cx="122" cy="146" r="0.9" fill="#ffffff" />
                <circle class="top-splash tsp-11" cx="124" cy="144" r="0.6" fill="rgba(230,250,255,0.85)" />
              </g>
            </svg>

            <!-- Percikan Mist Halus di Puncak -->
            <div class="water-droplet drop-1"></div>
            <div class="water-droplet drop-2"></div>
            <div class="water-droplet drop-3"></div>
            <div class="water-droplet drop-4"></div>
            <div class="water-droplet drop-5"></div>

            <!-- Tetesan Air yang Jatuh Meluncur Sampai ke Mangkok Pertama -->
            <div class="basin-cascade-drop b-drop-left-1"></div>
            <div class="basin-cascade-drop b-drop-left-2"></div>
            <div class="basin-cascade-drop b-drop-right-1"></div>
            <div class="basin-cascade-drop b-drop-right-2"></div>
            <div class="basin-cascade-drop b-drop-center-1"></div>
            <div class="basin-cascade-drop b-drop-center-2"></div>
          </div>

          <!-- 2. TUMPAHAN AIR DARI MANGKUK ATAS KE KOLAM (MULTI-SEGMENT STREAM & MICRO SPLASHES) -->
          <div
            class="basin-drips-container"
            style="
              position: absolute;
              top: 28%;    /* Posisi bibir mangkuk */
              left: 50.5%; /* Posisi tengah mangkuk */
              transform: translateX(-50%);
              width: 226px;
              height: 250px;
              opacity: 0.9;
              pointer-events: none;
              overflow: visible;
            "
          >
            <svg
              viewBox="0 0 226 250"
              style="width: 100%; height: 100%; overflow: visible;"
            >
              <defs>
                <!-- Gradasi Lelehan Bibir (Kristal Putih Bersih) -->
                <linearGradient id="rimLipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
                  <stop offset="50%" stop-color="#e8faff" stop-opacity="0.85" />
                  <stop offset="100%" stop-color="#d0f4fc" stop-opacity="0.7" />
                </linearGradient>

                <!-- Gradasi Aliran Jatuh (Kristal Putih Bercahaya Murni Tanpa Bias Gelap) -->
                <linearGradient id="streamGradNaturalSide" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
                  <stop offset="30%" stop-color="#f0fcff" stop-opacity="0.9" />
                  <stop offset="70%" stop-color="#d8f8ff" stop-opacity="0.8" />
                  <stop offset="100%" stop-color="#ffffff" stop-opacity="0.85" />
                </linearGradient>

                <linearGradient id="streamGradNaturalCenter" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="0.98" />
                  <stop offset="25%" stop-color="#f4feff" stop-opacity="0.92" />
                  <stop offset="70%" stop-color="#ddf9ff" stop-opacity="0.85" />
                  <stop offset="100%" stop-color="#ffffff" stop-opacity="0.9" />
                </linearGradient>

                <!-- Soft Pure White/Cyan Glow Filter -->
                <filter id="naturalWaterGlow" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
                  <feDropShadow dx="0" dy="0" stdDeviation="0.6" flood-color="#ffffff" flood-opacity="0.75" />
                </filter>
              </defs>

              <!-- A. BIBIR MANGKUK AIR MELIMPAH (BASIN RIM WATER SHEEN) -->
              <path
                class="rim-water-sheen"
                d="M 18 8 Q 60 15, 100 16 Q 155 15, 215 8 Q 155 12, 100 13 Q 60 12, 18 8 Z"
                fill="#ffffff"
                fill-opacity="0.7"
                filter="url(#naturalWaterGlow)"
              />

              <!-- ======================================================= -->
              <!-- B. 5 ALIRAN AIR ORGANIK (DILENGKAPI UJUNG KANAN MANGKOK) -->
              <!-- ======================================================= -->

              <!-- KOLOM 1: UJUNG KIRI (X = 24) -->
              <g class="water-column col-1">
                <!-- 1. Aliran Utama Panjang Hingga ke Permukaan Kolam -->
                <path class="stream-strand strand-main-1" d="M 24 18 Q 21.5 110, 24 222" stroke="url(#streamGradNaturalSide)" stroke-width="2.2" stroke-linecap="round" fill="none" filter="url(#naturalWaterGlow)" />
                <!-- 2. Untaian Shimmer Halus Kedua -->
                <path class="stream-strand strand-fine-1" d="M 24.3 20 Q 21.8 110, 24.3 222" stroke="#ffffff" stroke-opacity="0.9" stroke-width="1.1" stroke-linecap="round" fill="none" />
                <!-- 3. Lelehan Bibir Bulat Organik -->
                <path class="stream-root seg-root-1" d="M 20.5 9 Q 21.5 16, 22.8 20 Q 24 22.5, 25.2 20 Q 26.5 16, 27.5 9 C 25 10.5, 23 10.5, 20.5 9 Z" fill="url(#rimLipGrad)" filter="url(#naturalWaterGlow)" />
              </g>

              <!-- KOLOM 2: TENGAH KIRI (X = 68) -->
              <g class="water-column col-2">
                <!-- 1. Aliran Utama Panjang Hingga ke Permukaan Kolam -->
                <path class="stream-strand strand-main-2" d="M 68 27 Q 66.5 125, 68 238" stroke="url(#streamGradNaturalCenter)" stroke-width="2.6" stroke-linecap="round" fill="none" filter="url(#naturalWaterGlow)" />
                <!-- 2. Untaian Shimmer Halus Kedua -->
                <path class="stream-strand strand-fine-2" d="M 68.4 29 Q 66.9 125, 68.4 238" stroke="#ffffff" stroke-opacity="0.95" stroke-width="1.3" stroke-linecap="round" fill="none" />
                <!-- 3. Lelehan Bibir Bulat Organik -->
                <path class="stream-root seg-root-2" d="M 63.5 13 Q 65 22, 66.5 27.5 Q 68 30.5, 69.5 27.5 Q 71 22, 72.5 13 C 69.5 14.5, 66.5 14.5, 63.5 13 Z" fill="url(#rimLipGrad)" filter="url(#naturalWaterGlow)" />
              </g>

              <!-- KOLOM 3: TENGAH KANAN (X = 126) -->
              <g class="water-column col-3">
                <!-- 1. Aliran Utama Panjang Hingga ke Permukaan Kolam -->
                <path class="stream-strand strand-main-3" d="M 126 27 Q 127.5 125, 126 238" stroke="url(#streamGradNaturalCenter)" stroke-width="2.6" stroke-linecap="round" fill="none" filter="url(#naturalWaterGlow)" />
                <!-- 2. Untaian Shimmer Halus Kedua -->
                <path class="stream-strand strand-fine-3" d="M 125.6 29 Q 127.1 125, 125.6 238" stroke="#ffffff" stroke-opacity="0.95" stroke-width="1.3" stroke-linecap="round" fill="none" />
                <!-- 3. Lelehan Bibir Bulat Organik -->
                <path class="stream-root seg-root-3" d="M 121.5 13 Q 123 22, 124.5 27.5 Q 126 30.5, 127.5 27.5 Q 129 22, 130.5 13 C 127.5 14.5, 124.5 14.5, 121.5 13 Z" fill="url(#rimLipGrad)" filter="url(#naturalWaterGlow)" />
              </g>

              <!-- KOLOM 4: KANAN (X = 166) -->
              <g class="water-column col-4">
                <!-- 1. Aliran Utama Panjang Hingga ke Permukaan Kolam -->
                <path class="stream-strand strand-main-4" d="M 166 20 Q 168.5 110, 166 226" stroke="url(#streamGradNaturalSide)" stroke-width="2.2" stroke-linecap="round" fill="none" filter="url(#naturalWaterGlow)" />
                <!-- 2. Untaian Shimmer Halus Kedua -->
                <path class="stream-strand strand-fine-4" d="M 165.7 22 Q 168.2 110, 165.7 226" stroke="#ffffff" stroke-opacity="0.9" stroke-width="1.1" stroke-linecap="round" fill="none" />
                <!-- 3. Lelehan Bibir Bulat Organik -->
                <path class="stream-root seg-root-4" d="M 162.5 11 Q 163.5 18, 164.8 22 Q 166 24.5, 167.2 22 Q 168.5 18, 169.5 11 C 167 12.5, 165 12.5, 162.5 11 Z" fill="url(#rimLipGrad)" filter="url(#naturalWaterGlow)" />
              </g>

              <!-- KOLOM 5: UJUNG KANAN MANGKOK (X = 207 - DIGESER PAS DI LEKUKAN KANAN) -->
              <g class="water-column col-5">
                <!-- 1. Aliran Utama Panjang Hingga ke Permukaan Kolam (Naik ke Y = 12.5) -->
                <path class="stream-strand strand-main-5" d="M 207 12.5 Q 209.5 110, 207 218" stroke="url(#streamGradNaturalSide)" stroke-width="2.0" stroke-linecap="round" fill="none" filter="url(#naturalWaterGlow)" />
                <!-- 2. Untaian Shimmer Halus Kedua (Naik ke Y = 14) -->
                <path class="stream-strand strand-fine-5" d="M 206.7 14 Q 209.2 110, 206.7 218" stroke="#ffffff" stroke-opacity="0.9" stroke-width="1.0" stroke-linecap="round" fill="none" />
                <!-- 3. Lelehan Bibir Bulat Organik (Naik ke Y = 5) -->
                <path class="stream-root seg-root-5" d="M 203.5 5 Q 204.5 10.5, 205.8 14 Q 207 16.5, 208.2 14 Q 209.5 10.5, 210.5 5 C 208 6.5, 206 6.5, 203.5 5 Z" fill="url(#rimLipGrad)" filter="url(#naturalWaterGlow)" />
              </g>

              <!-- ======================================================= -->
              <!-- C. PERCIKAN AIR JATUH & RIAK MIKRO DI KOLAM BAWAH       -->
              <!-- ======================================================= -->
              <g class="micro-splashes-group">
                <!-- 1. Riak Mikro di Titik Pendaratan 5 Kolom -->
                <ellipse class="pond-hit-ripple phr-1" cx="24" cy="222" rx="5.5" ry="2" fill="none" stroke="#ffffff" stroke-opacity="0.8" stroke-width="0.8" />
                <ellipse class="pond-hit-ripple phr-2" cx="68" cy="238" rx="7" ry="2.4" fill="none" stroke="#ffffff" stroke-opacity="0.9" stroke-width="0.9" />
                <ellipse class="pond-hit-ripple phr-3" cx="126" cy="238" rx="7" ry="2.4" fill="none" stroke="#ffffff" stroke-opacity="0.9" stroke-width="0.9" />
                <ellipse class="pond-hit-ripple phr-4" cx="166" cy="226" rx="5.5" ry="2" fill="none" stroke="#ffffff" stroke-opacity="0.8" stroke-width="0.8" />
                <ellipse class="pond-hit-ripple phr-5" cx="207" cy="218" rx="5" ry="1.8" fill="none" stroke="#ffffff" stroke-opacity="0.75" stroke-width="0.8" />

                <!-- 2. Percikan Kolom 1 (Ujung Kiri - X=24, Y=222) -->
                <circle class="micro-splash ms-1a" cx="22.5" cy="221" r="1.6" fill="#ffffff" filter="url(#naturalWaterGlow)" />
                <circle class="micro-splash ms-1b" cx="25.5" cy="220" r="1.2" fill="#ffffff" />
                <circle class="micro-splash ms-1c" cx="21" cy="219" r="0.9" fill="#ffffff" />

                <!-- 3. Percikan Kolom 2 (Tengah Kiri - X=68, Y=238) -->
                <circle class="micro-splash ms-2a" cx="66" cy="237" r="2.0" fill="#ffffff" filter="url(#naturalWaterGlow)" />
                <circle class="micro-splash ms-2b" cx="70" cy="236" r="1.5" fill="#ffffff" />
                <circle class="micro-splash ms-2c" cx="64" cy="235" r="1.1" fill="#ffffff" />
                <circle class="micro-splash ms-2d" cx="71.5" cy="234.5" r="0.8" fill="#ffffff" />

                <!-- 4. Percikan Kolom 3 (Tengah Kanan - X=126, Y=238) -->
                <circle class="micro-splash ms-3a" cx="124" cy="237" r="2.0" fill="#ffffff" filter="url(#naturalWaterGlow)" />
                <circle class="micro-splash ms-3b" cx="128" cy="236" r="1.5" fill="#ffffff" />
                <circle class="micro-splash ms-3c" cx="130" cy="235" r="1.1" fill="#ffffff" />
                <circle class="micro-splash ms-3d" cx="122.5" cy="234.5" r="0.8" fill="#ffffff" />

                <!-- 5. Percikan Kolom 4 (Kanan - X=166, Y=226) -->
                <circle class="micro-splash ms-4a" cx="164.5" cy="225" r="1.6" fill="#ffffff" filter="url(#naturalWaterGlow)" />
                <circle class="micro-splash ms-4b" cx="167.5" cy="224" r="1.2" fill="#ffffff" />
                <circle class="micro-splash ms-4c" cx="169" cy="223" r="0.9" fill="#ffffff" />

                <!-- 6. Percikan Kolom 5 (Ujung Kanan Mangkok - X=207, Y=218) -->
                <circle class="micro-splash ms-5a" cx="205.5" cy="217" r="1.5" fill="#ffffff" filter="url(#naturalWaterGlow)" />
                <circle class="micro-splash ms-5b" cx="208.5" cy="216" r="1.1" fill="#ffffff" />
                <circle class="micro-splash ms-5c" cx="210" cy="215" r="0.8" fill="#ffffff" />
              </g>
            </svg>
          </div>

          <!-- 3. RIAK GELOMBANG KOLAM BAWAH (POND RIPPLES) -->
          <div
            class="pond-ripples-container"
            style="
              position: absolute;
              top: 63%;     /* Posisi permukaan air kolam */
              left: 50%;    /* Posisi pusat riak di kolam */
              transform: translate(-50%, -50%);
              width: 320px;
              height: 80px;
              opacity: 0.5;
            "
          >
            <div class="water-ripple ripple-1"></div>
            <div class="water-ripple ripple-2"></div>
            <div class="water-ripple ripple-3"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- TEKS QUOTES EVERGREEN (POSISI KANAN ATAS, RATA KANAN)   -->
    <!-- ======================================================== -->
    <div
      class="quote-text-container"
      style="
        position: absolute;
        top: 16%;
        right: 6%;
        max-width: 300px;
        z-index: 10;
        text-align: right;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        pointer-events: auto;
      "
    >
      <!-- Icon / Decorative Quote Mark -->
      <div
        style="
          color: #2F4A3B;
          opacity: 0.85;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        "
      >
        <span style="width: 24px; height: 1px; background: linear-gradient(to left, #3F6350, transparent);"></span>
        <svg
          style="width: 18px; height: 18px;"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
      </div>

      <!-- Isi Teks Quotes -->
      <blockquote
        v-if="parsedQuote.body"
        class="quote-content"
        style="
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 600;
          font-size: 15.5px;
          line-height: 1.65;
          letter-spacing: 0.02em;
          color: #1B3024;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.7);
          margin: 0;
          white-space: pre-line;
        "
      >
        “{{ parsedQuote.body }}”
      </blockquote>

      <!-- Sumber / Ayat Quotes (Q.S. / QS. / Penulis) dengan Style Berbeda -->
      <div
        v-if="parsedQuote.source"
        class="quote-source"
        style="
          font-family: 'Montserrat', 'Outfit', sans-serif;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #2F4A3B;
          margin-top: 10px;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.85);
          opacity: 0.95;
        "
      >
        {{ parsedQuote.source }}
      </div>

      <!-- Garis Aksen Dekoratif di Bawah Teks -->
      <div style="display: flex; align-items: center; justify-content: flex-end; gap: 6px; margin-top: 10px; opacity: 0.75;">
        <span style="width: 40px; height: 1px; background: linear-gradient(to left, #3F6350, transparent);"></span>
        <div style="width: 4px; height: 4px; border-radius: 50%; background-color: #2F4A3B;"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ThemeConfig } from '@/types/theme';

const props = defineProps<{
  quote?: string;
  themeConfig?: ThemeConfig;
  quoteImage?: string;
}>();

const quoteSection = ref<HTMLElement | null>(null);

const parsedQuote = computed(() => {
  if (!props.quote) return { body: '', source: '' };

  const raw = props.quote.trim();

  // 1. Jika teks memiliki baris baru (di-Enter saat input form)
  if (raw.includes('\n')) {
    const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length > 1) {
      const lastLine = lines[lines.length - 1];
      const bodyLines = lines.slice(0, -1);
      return {
        body: bodyLines.join('\n').replace(/^[“"']+|[”"']+$/g, '').trim(),
        source: (lastLine ?? '').replace(/^[-—–\s]+/, '').trim()
      };
    }
  }

  // 2. Jika satu baris tapi ada penanda '— QS...' / ' - Q.S...' / '(Q.S...)' / 'Q.S...'
  const qsMatch = raw.match(/^(.*?)(?:[\s—–-]+|\s+)([(]?(?:Q\.S\.|QS\.|Surah|H\.R\.|HR\.|Q\.S|QS)[^)]*[)]?)$/i);
  if (qsMatch && qsMatch[1] && qsMatch[2]) {
    return {
      body: qsMatch[1].replace(/^[“"']+|[”"']+$/g, '').trim(),
      source: qsMatch[2].replace(/^[-—–\s]+/, '').trim()
    };
  }

  return {
    body: raw.replace(/^[“"']+|[”"']+$/g, '').trim(),
    source: ''
  };
});
</script>

<style scoped>
/* ======================================================== */
/* 1. ANIMASI ALIRAN AIR PUCUK ATAS (WATER STREAMS)        */
/* ======================================================== */
.water-stream {
  stroke-dasharray: 40 20;
  animation: waterFlow 1.1s linear infinite;
  opacity: 0.9;
}

.stream-center {
  animation-duration: 0.85s;
}
.stream-center-fine {
  stroke-dasharray: 20 15;
  animation: waterFlow 0.65s linear infinite reverse;
  opacity: 0.95;
}
.stream-left-inner {
  animation-duration: 1.05s;
  animation-delay: -0.2s;
}
.stream-right-inner {
  animation-duration: 1.05s;
  animation-delay: -0.4s;
}

/* Pancaran Lengkung Luar yang Meluncur Turun ke Mangkok */
.stream-left-cascade {
  stroke-dasharray: 28 22 14 18 35 24;
  animation: waterCascadeFlow 1.45s linear infinite;
  animation-delay: -0.2s;
  opacity: 0.85;
}
.stream-right-cascade {
  stroke-dasharray: 28 22 14 18 35 24;
  animation: waterCascadeFlow 1.45s linear infinite;
  animation-delay: -0.7s;
  opacity: 0.85;
}
.stream-left-fine-cascade {
  stroke-dasharray: 12 28 16 32 8 24;
  animation: waterCascadeFlow 1.1s linear infinite;
  animation-delay: -0.4s;
  opacity: 0.8;
}
.stream-right-fine-cascade {
  stroke-dasharray: 12 28 16 32 8 24;
  animation: waterCascadeFlow 1.1s linear infinite;
  animation-delay: -0.9s;
  opacity: 0.8;
}

@keyframes waterFlow {
  0% {
    stroke-dashoffset: 60;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes waterCascadeFlow {
  0% {
    stroke-dashoffset: 75;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

/* ======================================================== */
/* PERCIKAN / MIST PARTICLES DI PUCUK ATAS                 */
/* ======================================================== */
.water-droplet {
  position: absolute;
  background: radial-gradient(circle, #ffffff 30%, rgba(220, 250, 255, 0.8) 70%, transparent 100%);
  border-radius: 50%;
  pointer-events: none;
  filter: blur(0.3px);
}

.drop-1 {
  width: 5px;
  height: 5px;
  top: 15px;
  left: 50%;
  animation: sprayDrop1 1.4s ease-out infinite;
}
.drop-2 {
  width: 4px;
  height: 4px;
  top: 20px;
  left: 48%;
  animation: sprayDrop2 1.6s ease-out infinite 0.3s;
}
.drop-3 {
  width: 6px;
  height: 6px;
  top: 12px;
  left: 52%;
  animation: sprayDrop3 1.2s ease-out infinite 0.6s;
}
.drop-4 {
  width: 4px;
  height: 4px;
  top: 25px;
  left: 45%;
  animation: sprayDrop1 1.8s ease-out infinite 0.8s;
}
.drop-5 {
  width: 5px;
  height: 5px;
  top: 22px;
  left: 55%;
  animation: sprayDrop2 1.5s ease-out infinite 1.1s;
}

@keyframes sprayDrop1 {
  0% {
    transform: translate(-50%, 0) scale(0.6);
    opacity: 0;
  }
  25% {
    opacity: 0.9;
    transform: translate(calc(-50% - 15px), -22px) scale(1.1);
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% - 30px), 30px) scale(0.4);
  }
}

@keyframes sprayDrop2 {
  0% {
    transform: translate(-50%, 0) scale(0.6);
    opacity: 0;
  }
  25% {
    opacity: 0.9;
    transform: translate(calc(-50% + 15px), -24px) scale(1.1);
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + 30px), 32px) scale(0.4);
  }
}

@keyframes sprayDrop3 {
  0% {
    transform: translate(-50%, 0) scale(0.5);
    opacity: 0;
  }
  30% {
    opacity: 1;
    transform: translate(-50%, -28px) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 25px) scale(0.3);
  }
}

/* ======================================================== */
/* TETESAN AIR YANG JATUH MELUNCUR KE MANGKOK PERTAMA       */
/* ======================================================== */
.basin-cascade-drop {
  position: absolute;
  background: radial-gradient(circle, #ffffff 40%, rgba(220, 250, 255, 0.85) 75%, transparent 100%);
  border-radius: 50%;
  pointer-events: none;
  filter: blur(0.3px);
}

/* Kiri: Melengkung keluar lalu jatuh meluncur ke mangkok pertama kiri */
.b-drop-left-1 {
  width: 4px;
  height: 4px;
  top: 15px;
  left: 50%;
  animation: dropCascadeLeft 1.8s cubic-bezier(0.35, 0, 0.7, 1) infinite;
  animation-delay: 0.1s;
}
.b-drop-left-2 {
  width: 3px;
  height: 3px;
  top: 18px;
  left: 50%;
  animation: dropCascadeLeft 2.1s cubic-bezier(0.35, 0, 0.7, 1) infinite;
  animation-delay: 1.0s;
}

/* Kanan: Melengkung keluar lalu jatuh meluncur ke mangkok pertama kanan */
.b-drop-right-1 {
  width: 4px;
  height: 4px;
  top: 15px;
  left: 50%;
  animation: dropCascadeRight 1.8s cubic-bezier(0.35, 0, 0.7, 1) infinite;
  animation-delay: 0.5s;
}
.b-drop-right-2 {
  width: 3px;
  height: 3px;
  top: 18px;
  left: 50%;
  animation: dropCascadeRight 2.2s cubic-bezier(0.35, 0, 0.7, 1) infinite;
  animation-delay: 1.4s;
}

/* Tengah: Meluncur di depan badan ornamen nanas ke mangkok pertama tengah */
.b-drop-center-1 {
  width: 3.5px;
  height: 3.5px;
  top: 12px;
  left: 50%;
  animation: dropCascadeCenter 1.6s cubic-bezier(0.35, 0, 0.7, 1) infinite;
  animation-delay: 0.3s;
}
.b-drop-center-2 {
  width: 2.8px;
  height: 2.8px;
  top: 14px;
  left: 50%;
  animation: dropCascadeCenter 1.9s cubic-bezier(0.35, 0, 0.7, 1) infinite;
  animation-delay: 1.1s;
}

@keyframes dropCascadeLeft {
  0% {
    transform: translate(-50%, 0) scale(0.5);
    opacity: 0;
  }
  15% {
    opacity: 0.95;
    transform: translate(calc(-50% - 18px), -12px) scale(1.1);
  }
  45% {
    opacity: 0.85;
    transform: translate(calc(-50% - 36px), 45px) scale(0.9);
  }
  80% {
    opacity: 0.75;
    transform: translate(calc(-50% - 44px), 105px) scale(0.8);
  }
  96% {
    opacity: 0.85;
    transform: translate(calc(-50% - 42px), 146px) scale(1.1);
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% - 42px), 148px) scale(1.5);
  }
}

@keyframes dropCascadeRight {
  0% {
    transform: translate(-50%, 0) scale(0.5);
    opacity: 0;
  }
  15% {
    opacity: 0.95;
    transform: translate(calc(-50% + 18px), -12px) scale(1.1);
  }
  45% {
    opacity: 0.85;
    transform: translate(calc(-50% + 36px), 45px) scale(0.9);
  }
  80% {
    opacity: 0.75;
    transform: translate(calc(-50% + 44px), 105px) scale(0.8);
  }
  96% {
    opacity: 0.85;
    transform: translate(calc(-50% + 42px), 146px) scale(1.1);
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + 42px), 148px) scale(1.5);
  }
}

@keyframes dropCascadeCenter {
  0% {
    transform: translate(-50%, 0) scale(0.5);
    opacity: 0;
  }
  20% {
    opacity: 0.9;
    transform: translate(calc(-50% - 6px), -15px) scale(1.1);
  }
  50% {
    opacity: 0.8;
    transform: translate(calc(-50% - 8px), 50px) scale(0.85);
  }
  80% {
    opacity: 0.75;
    transform: translate(calc(-50% - 10px), 108px) scale(0.8);
  }
  96% {
    opacity: 0.85;
    transform: translate(calc(-50% - 8px), 148px) scale(1.1);
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% - 8px), 150px) scale(1.5);
  }
}

/* PERCIKAN AIR DI MANGKOK PERTAMA (UPPER BASIN SPLASHES) */
.top-splash {
  animation: topSplashPop 1.2s ease-out infinite;
  opacity: 0;
  transform-origin: center;
  transform-box: fill-box;
}

.tsp-1 { animation-delay: 0.1s;  animation-duration: 1.1s; }
.tsp-2 { animation-delay: 0.25s; animation-duration: 1.1s; }
.tsp-3 { animation-delay: 0.3s;  animation-duration: 1.25s; }
.tsp-4 { animation-delay: 0.45s; animation-duration: 1.25s; }
.tsp-5 { animation-delay: 0.15s; animation-duration: 1.05s; }
.tsp-6 { animation-delay: 0.35s; animation-duration: 1.15s; }
.tsp-7 { animation-delay: 0.5s;  animation-duration: 1.05s; }
.tsp-8 { animation-delay: 0.2s;  animation-duration: 1.2s; }
.tsp-9 { animation-delay: 0.4s;  animation-duration: 1.2s; }
.tsp-10{ animation-delay: 0.18s; animation-duration: 1.15s; }
.tsp-11{ animation-delay: 0.32s; animation-duration: 1.15s; }

@keyframes topSplashPop {
  0% {
    transform: translate(0, 0) scale(0.2);
    opacity: 0;
  }
  30% {
    opacity: 0.9;
    transform: translate(0, -3.5px) scale(1.1);
  }
  65% {
    opacity: 0.4;
    transform: translate(0, -1px) scale(0.7);
  }
  100% {
    opacity: 0;
    transform: translate(0, 2px) scale(0.2);
  }
}

/* ======================================================== */
/* 2. ANIMASI TUMPAHAN MANGKUK (MULTI-SEGMENT STREAMS)     */
/* ======================================================== */
.basin-drips-container {
  pointer-events: none;
}

/* A. Bibir Mangkuk Air Melimpah (Subtle Sheen) */
.rim-water-sheen {
  animation: rimSheenPulse 2.6s ease-in-out infinite alternate;
}

@keyframes rimSheenPulse {
  0% {
    opacity: 0.6;
    transform: scaleY(0.95);
  }
  100% {
    opacity: 0.85;
    transform: scaleY(1.08);
  }
}

/* B. Goyangan Natural Kolom Air ke Samping (Column Sway) */
.water-column {
  animation: colSway 2.4s ease-in-out infinite alternate;
  transform-origin: top center;
  transform-box: fill-box;
}
.col-1 { animation-delay: 0s;     animation-duration: 2.5s; }
.col-2 { animation-delay: -0.7s;  animation-duration: 2.1s; }
.col-3 { animation-delay: -1.3s;  animation-duration: 2.3s; }
.col-4 { animation-delay: -0.4s;  animation-duration: 2.6s; }
.col-5 { animation-delay: -0.9s;  animation-duration: 2.4s; }

@keyframes colSway {
  0% {
    transform: rotate(-0.6deg) translateX(-0.5px);
  }
  100% {
    transform: rotate(0.6deg) translateX(0.5px);
  }
}

/* C. Lelehan Air Organik di Bibir Atas (Organic Rounded Root Swell) */
.stream-root {
  transform-origin: top center;
  transform-box: fill-box;
  animation-name: organicRootSwell;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.seg-root-1 { animation-delay: 0s;     animation-duration: 2.2s; }
.seg-root-2 { animation-delay: -0.5s;  animation-duration: 2.0s; }
.seg-root-3 { animation-delay: -1.1s;  animation-duration: 2.1s; }
.seg-root-4 { animation-delay: -0.3s;  animation-duration: 2.4s; }
.seg-root-5 { animation-delay: -0.8s;  animation-duration: 2.2s; }

@keyframes organicRootSwell {
  0%, 100% {
    transform: scaleY(0.92) scaleX(0.95);
    opacity: 0.6;
  }
  50% {
    transform: scaleY(1.08) scaleX(1.04);
    opacity: 0.85;
  }
}

/* D. Untaian Aliran Air Berkilau Alami (Shimmering Falling Water Strands) */
.stream-strand {
  opacity: 0.92;
}

.strand-main-1 {
  stroke-dasharray: 30 20 18 18 10 22 28 20;
  animation: naturalStreamFlowSide 2.5s linear infinite;
}
.strand-fine-1 {
  stroke-dasharray: 8 28 14 32 6 26 12 30;
  animation: naturalStreamFlowFineSide 1.9s linear infinite;
  animation-delay: -0.4s;
}

.strand-main-2 {
  stroke-dasharray: 35 20 22 18 12 22 8 22 28 20;
  animation: naturalStreamFlowCenter 2.3s linear infinite;
  animation-delay: -0.6s;
}
.strand-fine-2 {
  stroke-dasharray: 10 30 16 34 6 28 14 32;
  animation: naturalStreamFlowFineCenter 1.8s linear infinite;
  animation-delay: -0.9s;
}

.strand-main-3 {
  stroke-dasharray: 35 20 22 18 12 22 8 22 28 20;
  animation: naturalStreamFlowCenter 2.35s linear infinite;
  animation-delay: -1.2s;
}
.strand-fine-3 {
  stroke-dasharray: 10 30 16 34 6 28 14 32;
  animation: naturalStreamFlowFineCenter 1.85s linear infinite;
  animation-delay: -0.2s;
}

.strand-main-4 {
  stroke-dasharray: 30 20 18 18 10 22 28 20;
  animation: naturalStreamFlowSide 2.55s linear infinite;
  animation-delay: -0.8s;
}
.strand-fine-4 {
  stroke-dasharray: 8 28 14 32 6 26 12 30;
  animation: naturalStreamFlowFineSide 1.95s linear infinite;
  animation-delay: -1.1s;
}

.strand-main-5 {
  stroke-dasharray: 28 18 16 18 10 20 26 18;
  animation: naturalStreamFlowSide 2.45s linear infinite;
  animation-delay: -0.3s;
}
.strand-fine-5 {
  stroke-dasharray: 7 26 12 30 5 24 10 28;
  animation: naturalStreamFlowFineSide 1.88s linear infinite;
  animation-delay: -0.7s;
}

@keyframes naturalStreamFlowSide {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -166;
  }
}

@keyframes naturalStreamFlowFineSide {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -156;
  }
}

@keyframes naturalStreamFlowCenter {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -205;
  }
}

@keyframes naturalStreamFlowFineCenter {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -166;
  }
}

/* E. Percikan Air di Kolam Bawah (Luminous Bottom Pond Splashes) */
.micro-splash {
  animation: microSplashPop 1.3s ease-out infinite;
  opacity: 0;
  transform-origin: center;
  transform-box: fill-box;
}

.ms-1a { animation-delay: 0.1s;  animation-duration: 1.25s; }
.ms-1b { animation-delay: 0.35s; animation-duration: 1.35s; }
.ms-1c { animation-delay: 0.6s;  animation-duration: 1.2s; }

.ms-2a { animation-delay: 0.15s; animation-duration: 1.15s; }
.ms-2b { animation-delay: 0.4s;  animation-duration: 1.3s; }
.ms-2c { animation-delay: 0.65s; animation-duration: 1.2s; }
.ms-2d { animation-delay: 0.9s;  animation-duration: 1.4s; }

.ms-3a { animation-delay: 0.25s; animation-duration: 1.18s; }
.ms-3b { animation-delay: 0.5s;  animation-duration: 1.32s; }
.ms-3c { animation-delay: 0.75s; animation-duration: 1.22s; }
.ms-3d { animation-delay: 1.0s;  animation-duration: 1.38s; }

.ms-4a { animation-delay: 0.2s;  animation-duration: 1.28s; }
.ms-4b { animation-delay: 0.45s; animation-duration: 1.38s; }
.ms-4c { animation-delay: 0.7s;  animation-duration: 1.24s; }

.ms-5a { animation-delay: 0.18s; animation-duration: 1.22s; }
.ms-5b { animation-delay: 0.42s; animation-duration: 1.32s; }
.ms-5c { animation-delay: 0.68s; animation-duration: 1.26s; }

@keyframes microSplashPop {
  0% {
    transform: translate(0, 0) scale(0.2);
    opacity: 0;
  }
  25% {
    opacity: 1;
    transform: translate(0, -9px) scale(1.3);
  }
  60% {
    opacity: 0.65;
    transform: translate(0, -4px) scale(0.85);
  }
  100% {
    opacity: 0;
    transform: translate(0, 3px) scale(0.3);
  }
}

/* Riak Pendaratan Air di Kolam (Pond Hit Ripples) */
.pond-hit-ripple {
  transform-origin: center;
  transform-box: fill-box;
  animation: pondHitPulse 2.0s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
  opacity: 0;
}

.phr-1 { animation-delay: 0.1s;  animation-duration: 2.1s; }
.phr-2 { animation-delay: 0.35s; animation-duration: 1.9s; }
.phr-3 { animation-delay: 0.65s; animation-duration: 2.0s; }
.phr-4 { animation-delay: 0.25s; animation-duration: 2.2s; }
.phr-5 { animation-delay: 0.45s; animation-duration: 2.05s; }

@keyframes pondHitPulse {
  0% {
    transform: scale(0.2);
    opacity: 0.9;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

/* ======================================================== */
/* 3. ANIMASI RIAK GELOMBANG KOLAM BAWAH (POND RIPPLES)    */
/* ======================================================== */
.pond-ripples-container {
  pointer-events: none;
}

.water-ripple {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.8px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 8px rgba(180, 240, 250, 0.4), inset 0 0 8px rgba(180, 240, 250, 0.4);
  opacity: 0;
  transform: scale(0.2);
  animation: ripplePulse 2.8s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
}

.ripple-1 {
  animation-delay: 0s;
}
.ripple-2 {
  animation-delay: 0.9s;
}
.ripple-3 {
  animation-delay: 1.8s;
}

@keyframes ripplePulse {
  0% {
    transform: scale(0.2);
    opacity: 0;
  }
  20% {
    opacity: 0.85;
  }
  60% {
    opacity: 0.45;
  }
  100% {
    transform: scale(1.1);
    opacity: 0;
  }
}
</style>
