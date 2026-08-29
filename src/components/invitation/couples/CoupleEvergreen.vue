<template>
  <section
    ref="sectionRef"
    data-couple-section
    class="relative min-h-[100dvh] w-full flex flex-col items-center justify-center box-border overflow-hidden bg-[#2D3E35]"
  >
    <!-- ======================================================== -->
    <!-- 1. SHARED BACKGROUND IMAGE (PANORAMA FULL IMAGE)         -->
    <!-- PANDUAN NGE-PASS-IN:                                     -->
    <!-- - Zoom (Skala): Ubah scale(1.85) misal: 1.8, 1.9, 2.0    -->
    <!-- - Geser X: Ubah translate(-19%, ...) misal: -21% (makin kiri), -16% (makin kanan) -->
    <!-- - Geser Y: Ubah translate(..., -4%) misal: -6% (naik), -2% (turun) -->
    <!-- ======================================================== -->
    <div
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
          bottom: 0;
          left: 0;
          width: 200%;
          height: 100%;
        "
      >
        <div
          ref="bgInnerRef"
          style="
            position: absolute;
            inset: 0;
            background-image: url('https://media.mengundanganda.com/evergreen/quotes%20section/dewirandi_dc65be01-175c-434a-8fb5-924219e56045.webp');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            transform: scale(1.2) translate(-5.5%, 3.5%);
            filter: blur(0px);
            will-change: filter, transform;
          "
        ></div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- 2. LAYER PUTIH (OVERLAY MENUTUP SELURUH SECTION) -->
    <!-- ======================================================== -->
    <div
      ref="whiteOverlayRef"
      style="
        position: absolute;
        inset: 0;
        z-index: 30;
        pointer-events: none;
        background-color: #ffffff;
        opacity: 0.5;
      "
    ></div>

    <!-- ======================================================== -->
    <!-- 3. ASSET DEKORASI AIR MANCUR (WRAPPED FOR SHIFTING)      -->
    <!-- ======================================================== -->
    <div
      ref="fountainWrapperRef"
      style="
        position: absolute;
        inset: 0;
        z-index: 31;
        pointer-events: none;
        filter: blur(0px);
        will-change: filter, transform;
      "
    >
      <div
        style="
          position: absolute;
          top: 80%;
          left: 20%;
          transform: translate(-50%, -50%) scale(1);
          width: 185%;
          user-select: none;
          opacity: 1;
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

        <!-- ANIMASI AIR MANCUR (CSS + SVG OVERLAY) -->
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
          <div
            class="fountain-spout-container"
            style="
              position: absolute;
              top: 12%;
              left: 50%;
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
                <linearGradient id="c_fountainWaterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stop-color="rgba(255, 255, 255, 0.95)" />
                  <stop offset="60%" stop-color="rgba(215, 245, 245, 0.85)" />
                  <stop offset="100%" stop-color="rgba(255, 255, 255, 0.4)" />
                </linearGradient>
                <linearGradient id="c_fountainWaterGradCascade" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="rgba(255, 255, 255, 0.95)" />
                  <stop offset="30%" stop-color="rgba(220, 250, 255, 0.8)" />
                  <stop offset="70%" stop-color="rgba(210, 245, 252, 0.55)" />
                  <stop offset="100%" stop-color="rgba(195, 240, 250, 0.2)" />
                </linearGradient>
                <filter id="c_waterGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="0.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <!-- Pancaran Tengah Tinggi -->
              <path
                class="water-stream stream-center"
                d="M 70 46 Q 70 18, 70 6 Q 70 18, 69 46"
                fill="none"
                stroke="url(#c_fountainWaterGrad)"
                stroke-width="2.2"
                stroke-linecap="round"
                filter="url(#c_waterGlow)"
              />
              <path
                class="water-stream stream-center-fine"
                d="M 70 46 Q 70 12, 70 2 Q 70 12, 71 46"
                fill="none"
                stroke="rgba(255, 255, 255, 0.9)"
                stroke-width="1.2"
                stroke-linecap="round"
              />

              <!-- Pancaran Lengkung Dalam -->
              <path
                class="water-stream stream-left-inner"
                d="M 70 46 Q 66 18, 58 12 Q 46 18, 42 50"
                fill="none"
                stroke="url(#c_fountainWaterGrad)"
                stroke-width="1.8"
                stroke-linecap="round"
                filter="url(#c_waterGlow)"
              />
              <path
                class="water-stream stream-right-inner"
                d="M 70 46 Q 74 18, 82 12 Q 94 18, 98 50"
                fill="none"
                stroke="url(#c_fountainWaterGrad)"
                stroke-width="1.8"
                stroke-linecap="round"
                filter="url(#c_waterGlow)"
              />

              <!-- Pancaran Lengkung Luar -->
              <path
                class="water-stream stream-left-cascade"
                d="M 70 46 Q 58 15, 40 14 Q 18 28, 12 75 Q 8 115, 18 146"
                fill="none"
                stroke="url(#c_fountainWaterGradCascade)"
                stroke-width="1.5"
                stroke-linecap="round"
                filter="url(#c_waterGlow)"
              />
              <path
                class="water-stream stream-right-cascade"
                d="M 70 46 Q 82 15, 100 14 Q 122 28, 128 75 Q 132 115, 122 146"
                fill="none"
                stroke="url(#c_fountainWaterGradCascade)"
                stroke-width="1.5"
                stroke-linecap="round"
                filter="url(#c_waterGlow)"
              />

              <!-- Untaian Halus Tambahan -->
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

              <!-- Aliran Tengah Depan -->
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

              <!-- Percikan Air di Mangkok Pertama -->
              <g class="basin-top-splashes">
                <circle class="top-splash tsp-1" cx="18" cy="146" r="0.9" fill="#ffffff" />
                <circle class="top-splash tsp-2" cx="16" cy="144" r="0.6" fill="rgba(230,250,255,0.85)" />
                <circle class="top-splash tsp-3" cx="32" cy="148" r="1.1" fill="#ffffff" />
                <circle class="top-splash tsp-4" cx="35" cy="146" r="0.7" fill="rgba(230,250,255,0.85)" />
                <circle class="top-splash tsp-5" cx="60" cy="150" r="0.9" fill="#ffffff" />
                <circle class="top-splash tsp-6" cx="70" cy="151" r="1.2" fill="#ffffff" />
                <circle class="top-splash tsp-7" cx="80" cy="150" r="0.9" fill="#ffffff" />
                <circle class="top-splash tsp-8" cx="108" cy="148" r="1.1" fill="#ffffff" />
                <circle class="top-splash tsp-9" cx="105" cy="146" r="0.7" fill="rgba(230,250,255,0.85)" />
                <circle class="top-splash tsp-10" cx="122" cy="146" r="0.9" fill="#ffffff" />
                <circle class="top-splash tsp-11" cx="124" cy="144" r="0.6" fill="rgba(230,250,255,0.85)" />
              </g>
            </svg>

            <div class="water-droplet drop-1"></div>
            <div class="water-droplet drop-2"></div>
            <div class="water-droplet drop-3"></div>
            <div class="water-droplet drop-4"></div>
            <div class="water-droplet drop-5"></div>

            <div class="basin-cascade-drop b-drop-left-1"></div>
            <div class="basin-cascade-drop b-drop-left-2"></div>
            <div class="basin-cascade-drop b-drop-right-1"></div>
            <div class="basin-cascade-drop b-drop-right-2"></div>
            <div class="basin-cascade-drop b-drop-center-1"></div>
            <div class="basin-cascade-drop b-drop-center-2"></div>
          </div>

          <!-- 2. TUMPAHAN AIR DARI MANGKUK ATAS KE KOLAM -->
          <div
            class="basin-drips-container"
            style="
              position: absolute;
              top: 28%;
              left: 50.5%;
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
                <linearGradient id="c_rimLipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
                  <stop offset="50%" stop-color="#e8faff" stop-opacity="0.85" />
                  <stop offset="100%" stop-color="#d0f4fc" stop-opacity="0.7" />
                </linearGradient>
                <linearGradient id="c_streamGradNaturalSide" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
                  <stop offset="30%" stop-color="#f0fcff" stop-opacity="0.9" />
                  <stop offset="70%" stop-color="#d8f8ff" stop-opacity="0.8" />
                  <stop offset="100%" stop-color="#ffffff" stop-opacity="0.85" />
                </linearGradient>
                <linearGradient id="c_streamGradNaturalCenter" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="0.98" />
                  <stop offset="25%" stop-color="#f4feff" stop-opacity="0.92" />
                  <stop offset="70%" stop-color="#ddf9ff" stop-opacity="0.85" />
                  <stop offset="100%" stop-color="#ffffff" stop-opacity="0.9" />
                </linearGradient>
                <filter id="c_naturalWaterGlow" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
                  <feDropShadow dx="0" dy="0" stdDeviation="0.6" flood-color="#ffffff" flood-opacity="0.75" />
                </filter>
              </defs>

              <!-- Bibir Mangkuk Melimpah -->
              <path
                class="rim-water-sheen"
                d="M 18 8 Q 60 15, 100 16 Q 155 15, 215 8 Q 155 12, 100 13 Q 60 12, 18 8 Z"
                fill="#ffffff"
                fill-opacity="0.7"
                filter="url(#c_naturalWaterGlow)"
              />

              <!-- 5 Kolom Aliran Air -->
              <!-- Kolom 1 (Ujung Kiri) -->
              <g class="water-column col-1">
                <path class="stream-strand strand-main-1" d="M 24 18 Q 21.5 110, 24 222" stroke="url(#c_streamGradNaturalSide)" stroke-width="2.2" stroke-linecap="round" fill="none" filter="url(#c_naturalWaterGlow)" />
                <path class="stream-strand strand-fine-1" d="M 24.3 20 Q 21.8 110, 24.3 222" stroke="#ffffff" stroke-opacity="0.9" stroke-width="1.1" stroke-linecap="round" fill="none" />
                <path class="stream-root seg-root-1" d="M 20.5 9 Q 21.5 16, 22.8 20 Q 24 22.5, 25.2 20 Q 26.5 16, 27.5 9 C 25 10.5, 23 10.5, 20.5 9 Z" fill="url(#c_rimLipGrad)" filter="url(#c_naturalWaterGlow)" />
              </g>

              <!-- Kolom 2 (Tengah Kiri) -->
              <g class="water-column col-2">
                <path class="stream-strand strand-main-2" d="M 68 27 Q 66.5 125, 68 238" stroke="url(#c_streamGradNaturalCenter)" stroke-width="2.6" stroke-linecap="round" fill="none" filter="url(#c_naturalWaterGlow)" />
                <path class="stream-strand strand-fine-2" d="M 68.4 29 Q 66.9 125, 68.4 238" stroke="#ffffff" stroke-opacity="0.95" stroke-width="1.3" stroke-linecap="round" fill="none" />
                <path class="stream-root seg-root-2" d="M 63.5 13 Q 65 22, 66.5 27.5 Q 68 30.5, 69.5 27.5 Q 71 22, 72.5 13 C 69.5 14.5, 66.5 14.5, 63.5 13 Z" fill="url(#c_rimLipGrad)" filter="url(#c_naturalWaterGlow)" />
              </g>

              <!-- Kolom 3 (Tengah Kanan) -->
              <g class="water-column col-3">
                <path class="stream-strand strand-main-3" d="M 126 27 Q 127.5 125, 126 238" stroke="url(#c_streamGradNaturalCenter)" stroke-width="2.6" stroke-linecap="round" fill="none" filter="url(#c_naturalWaterGlow)" />
                <path class="stream-strand strand-fine-3" d="M 125.6 29 Q 127.1 125, 125.6 238" stroke="#ffffff" stroke-opacity="0.95" stroke-width="1.3" stroke-linecap="round" fill="none" />
                <path class="stream-root seg-root-3" d="M 121.5 13 Q 123 22, 124.5 27.5 Q 126 30.5, 127.5 27.5 Q 129 22, 130.5 13 C 127.5 14.5, 124.5 14.5, 121.5 13 Z" fill="url(#c_rimLipGrad)" filter="url(#c_naturalWaterGlow)" />
              </g>

              <!-- Kolom 4 (Kanan) -->
              <g class="water-column col-4">
                <path class="stream-strand strand-main-4" d="M 166 20 Q 168.5 110, 166 226" stroke="url(#c_streamGradNaturalSide)" stroke-width="2.2" stroke-linecap="round" fill="none" filter="url(#c_naturalWaterGlow)" />
                <path class="stream-strand strand-fine-4" d="M 165.7 22 Q 168.2 110, 165.7 226" stroke="#ffffff" stroke-opacity="0.9" stroke-width="1.1" stroke-linecap="round" fill="none" />
                <path class="stream-root seg-root-4" d="M 162.5 11 Q 163.5 18, 164.8 22 Q 166 24.5, 167.2 22 Q 168.5 18, 169.5 11 C 167 12.5, 165 12.5, 162.5 11 Z" fill="url(#c_rimLipGrad)" filter="url(#c_naturalWaterGlow)" />
              </g>

              <!-- Kolom 5 (Ujung Kanan) -->
              <g class="water-column col-5">
                <path class="stream-strand strand-main-5" d="M 207 12.5 Q 209.5 110, 207 218" stroke="url(#c_streamGradNaturalSide)" stroke-width="2.0" stroke-linecap="round" fill="none" filter="url(#c_naturalWaterGlow)" />
                <path class="stream-strand strand-fine-5" d="M 206.7 14 Q 209.2 110, 206.7 218" stroke="#ffffff" stroke-opacity="0.9" stroke-width="1.0" stroke-linecap="round" fill="none" />
                <path class="stream-root seg-root-5" d="M 203.5 5 Q 204.5 10.5, 205.8 14 Q 207 16.5, 208.2 14 Q 209.5 10.5, 210.5 5 C 208 6.5, 206 6.5, 203.5 5 Z" fill="url(#c_rimLipGrad)" filter="url(#c_naturalWaterGlow)" />
              </g>

              <!-- Percikan & Riak Air Kolam Bawah -->
              <g class="micro-splashes-group">
                <ellipse class="pond-hit-ripple phr-1" cx="24" cy="222" rx="5.5" ry="2" fill="none" stroke="#ffffff" stroke-opacity="0.8" stroke-width="0.8" />
                <ellipse class="pond-hit-ripple phr-2" cx="68" cy="238" rx="7" ry="2.4" fill="none" stroke="#ffffff" stroke-opacity="0.9" stroke-width="0.9" />
                <ellipse class="pond-hit-ripple phr-3" cx="126" cy="238" rx="7" ry="2.4" fill="none" stroke="#ffffff" stroke-opacity="0.9" stroke-width="0.9" />
                <ellipse class="pond-hit-ripple phr-4" cx="166" cy="226" rx="5.5" ry="2" fill="none" stroke="#ffffff" stroke-opacity="0.8" stroke-width="0.8" />
                <ellipse class="pond-hit-ripple phr-5" cx="207" cy="218" rx="5" ry="1.8" fill="none" stroke="#ffffff" stroke-opacity="0.75" stroke-width="0.8" />

                <circle class="micro-splash ms-1a" cx="22.5" cy="221" r="1.6" fill="#ffffff" filter="url(#c_naturalWaterGlow)" />
                <circle class="micro-splash ms-1b" cx="25.5" cy="220" r="1.2" fill="#ffffff" />
                <circle class="micro-splash ms-1c" cx="21" cy="219" r="0.9" fill="#ffffff" />

                <circle class="micro-splash ms-2a" cx="66" cy="237" r="2.0" fill="#ffffff" filter="url(#c_naturalWaterGlow)" />
                <circle class="micro-splash ms-2b" cx="70" cy="236" r="1.5" fill="#ffffff" />
                <circle class="micro-splash ms-2c" cx="64" cy="235" r="1.1" fill="#ffffff" />
                <circle class="micro-splash ms-2d" cx="71.5" cy="234.5" r="0.8" fill="#ffffff" />

                <circle class="micro-splash ms-3a" cx="124" cy="237" r="2.0" fill="#ffffff" filter="url(#c_naturalWaterGlow)" />
                <circle class="micro-splash ms-3b" cx="128" cy="236" r="1.5" fill="#ffffff" />
                <circle class="micro-splash ms-3c" cx="130" cy="235" r="1.1" fill="#ffffff" />
                <circle class="micro-splash ms-3d" cx="122.5" cy="234.5" r="0.8" fill="#ffffff" />

                <circle class="micro-splash ms-4a" cx="164.5" cy="225" r="1.6" fill="#ffffff" filter="url(#c_naturalWaterGlow)" />
                <circle class="micro-splash ms-4b" cx="167.5" cy="224" r="1.2" fill="#ffffff" />
                <circle class="micro-splash ms-4c" cx="169" cy="223" r="0.9" fill="#ffffff" />

                <circle class="micro-splash ms-5a" cx="205.5" cy="217" r="1.5" fill="#ffffff" filter="url(#c_naturalWaterGlow)" />
                <circle class="micro-splash ms-5b" cx="208.5" cy="216" r="1.1" fill="#ffffff" />
                <circle class="micro-splash ms-5c" cx="210" cy="215" r="0.8" fill="#ffffff" />
              </g>
            </svg>
          </div>

          <!-- 3. RIAK GELOMBANG KOLAM BAWAH -->
          <div
            class="pond-ripples-container"
            style="
              position: absolute;
              top: 63%;
              left: 50%;
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
  </div>

    <!-- ======================================================== -->
    <!-- 4. TEKS QUOTES (AWAL TAMPIL, LALU FADE OUT SAAT SCROLL)   -->
    <!-- ======================================================== -->
    <div
      v-if="invitation.quote"
      ref="quoteContainerRef"
      class="quote-text-container"
      style="
        position: absolute;
        top: 16%;
        right: 6%;
        max-width: 300px;
        z-index: 35;
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
          font-weight: 400;
          font-size: 16px;
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

      <!-- Sumber / Ayat Quotes (Q.S. / QS. / Penulis) -->
      <div
        v-if="parsedQuote.source"
        class="quote-source"
        style="
          font-family: 'Montserrat', 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #2F4A3B;
          margin-top: 10px;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.85);
          opacity: 0.95;
        "
      >
        {{ parsedQuote.source }}
      </div>

      <!-- Garis Aksen Dekoratif -->
      <div style="display: flex; align-items: center; justify-content: flex-end; gap: 6px; margin-top: 10px; opacity: 0.75;">
        <span style="width: 40px; height: 1px; background: linear-gradient(to left, #3F6350, transparent);"></span>
        <div style="width: 4px; height: 4px; border-radius: 50%; background-color: #2F4A3B;"></div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- TEKS DOA PENGANTIN (AWAL HIDDEN, FADE IN SETELAH QUOTE FADE OUT) -->
    <!-- ======================================================== -->
    <div
      v-if="invitation.show_doa_pengantin"
      ref="doaContainerRef"
      class="doa-text-container"
      style="
        position: absolute;
        top: 16%;
        right: 6%;
        max-width: 320px;
        z-index: 35;
        text-align: right;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        pointer-events: auto;
        opacity: 0;
        visibility: hidden;
      "
    >
      <!-- Icon / Decorative Mark -->
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
        <svg style="width: 18px; height: 18px;" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      </div>

      <!-- Judul -->
      <h3
        style="
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 24px;
          color: #1B3024;
          margin-bottom: 12px;
          font-weight: 600;
        "
      >
        Doa Pengantin
      </h3>

      <!-- Teks Arab -->
      <p
        style="
          font-family: 'Amiri', 'Traditional Arabic', serif;
          font-size: 24px;
          line-height: 1.6;
          color: #1B3024;
          direction: rtl;
          margin-bottom: 12px;
          text-align: right;
          word-spacing: 2px;
        "
      >
        بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
      </p>

      <!-- Terjemahan -->
      <p
        style="
          font-family: 'Montserrat', sans-serif;
          font-size: 11.5px;
          line-height: 1.6;
          color: #2F4A3B;
          margin: 0;
          font-style: italic;
          opacity: 0.9;
        "
      >
        "Semoga Allah memberkahimu dan memberkahi apa yang menjadi tanggung jawabmu, serta menyatukan kalian berdua dalam kebaikan."
      </p>

      <!-- Sumber -->
      <p
        style="
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #3F6350;
          margin-top: 8px;
          letter-spacing: 0.05em;
        "
      >
        (HR. Abu Dawud no. 2130)
      </p>

      <!-- Garis Aksen Dekoratif -->
      <div style="display: flex; align-items: center; justify-content: flex-end; gap: 6px; margin-top: 12px; opacity: 0.75;">
        <span style="width: 40px; height: 1px; background: linear-gradient(to left, #3F6350, transparent);"></span>
        <div style="width: 4px; height: 4px; border-radius: 50%; background-color: #2F4A3B;"></div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- PANDUAN PENGATURAN POSISI CONTAINER GERBANG INFO COUPLE: -->
    <!-- - Posisi Vertikal   : Ubah 'top: 60%' (misal: 48%, 52%, 60%) -->
    <!-- - Posisi Horizontal : Ubah 'left: 50%' (misal: 50%, 52%) -->
    <!-- - Lebar Container   : Ubah 'width: 88%' / max-w-[330px]  -->
    <!-- - Tinggi Container  : Ubah 'min-h-[400px]'               -->
    <!-- - Kelengkungan Arch : Ubah 'border-radius: 170px 170px 28px 28px' -->
    <!-- ======================================================== -->

    <!-- ======================================================== -->
    <!-- 4. ASSET DEKORASI SISI COUPLE (IKUT GESER DENGAN PANORAMA) -->
    <!-- ======================================================== -->
    <div
      ref="coupleDecorWrapperRef"
      style="
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 200%;
        height: 100%;
        z-index: 10;
        pointer-events: none;
        overflow: hidden;
      "
    >
      <!-- ======================================================== -->
      <!-- PANDUAN NGE-EDIT ASSET DEKORASI COUPLE:                  -->
      <!-- 1. Posisi Vertikal   : Ubah 'top: 60%' (misal: '55%', '60%', '50%') -->
      <!-- 2. Posisi Horizontal : Ubah 'left: 75%' (75% = tengah layar section couple) -->
      <!-- 3. Ukuran Lebar      : Ubah 'width: 540px' (misal: '450px', '540px', '600px') -->
      <!-- 4. Geser / Skala     : Ubah 'transform: translate(-50%, -50%) scale(1)' -->
      <!-- 5. Opasitas          : Ubah 'opacity: 1' (0.0 - 1.0)     -->
      <!-- 6. Layer (z-index)   : 'z-index: 15' di wrapper (di belakang card) ATAU '25' (di depan card) -->
      <!-- ======================================================== -->
      <div
        style="
          position: absolute;
          top: 55%;
          left: 75%;
          transform: translate(-50%, -50%);
          width: 540px;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_53a39fa3-c602-46e2-83a5-15b4b14ffae0.webp"
          alt="Dekorasi Couple Evergreen"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- 4a. KELOPAK BUNGA JATUH                                    -->
    <!-- z-index:10 + ditaruh SETELAH dekor couple & SEBELUM layer -->
    <!-- bunga => kelopak tampil DI BAWAH bunga, DI ATAS aset lain.-->
    <!--                                                          -->
    <!-- PANDUAN NGE-TWEAK ANIMASI KELOPAK:                         -->
    <!-- - Semua setelan gerak (ukuran, kecepatan jatuh, goyang    -->
    <!--   angin, jarak jatuh, kemiringan) ada di CSS `.petal-layer`-->
    <!--   di bagian <style> paling bawah.                          -->
    <!-- - Titik lepas kelopak dari bunga: ubah 'top' & 'left'      -->
    <!--   pada .petal-spawn di bawah ini.                          -->
    <!-- - Mau tambah kelopak? Duplikat blok .petal-spawn, lalu     -->
    <!--   geser posisi & tambahkan animation-delay inline kalau    -->
    <!--   ingin waktu jatuhnya tidak bersamaan.                   -->
    <!-- ======================================================== -->
    <div
      ref="petalLayerRef"
      class="petal-layer"
      style="
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 200%;
        height: 100%;
        z-index: 10;
        pointer-events: none;
        overflow: hidden;
      "
    >
      <!-- ======================================================== -->
      <!-- 10 KELOPAK JATUH dari barisan bunga atas lengkungan.     -->
      <!-- - Delay dibuat berdekatan (-0.1s s/d -0.8s) supaya       -->
      <!--   semuanya jatuh HAMPIR BERSAMAAN dalam satu gelombang. -->
      <!-- - Kelas .still = kelopak TIDAK sway (hanya jatuh lurus   -->
      <!--   dengan kemiringan tetap).                               -->
      <!-- - Opasitas penuh kelopak sudah dikunci 0.8 di keyframes  -->
      <!--   petalFall, tidak perlu diatur per kelopak lagi.         -->
      <!-- ======================================================== -->

      <!-- P1 : Bunga Pink 6 -->
      <div class="petal-spawn" style="top: 32%; left: 66.8%;">
        <div class="petal-fall" style="--petal-fall-duration: 6.1s; --petal-fall-distance: 56vh;">
          <img class="petal-sway" style="--petal-size: 15px; --petal-sway-duration: 2.9s; --petal-sway-distance: 9px; --petal-tilt: 7deg;"
            src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_2242715c-0bf6-49c5-a6ab-c205a6b0a8bd.webp" alt="Kelopak Bunga" />
        </div>
      </div>

      <!-- P2 : Bunga Putih 2 -->
      <div class="petal-spawn" style="top: 30%; left: 70.2%;">
        <div class="petal-fall" style="--petal-fall-duration: 5.7s; --petal-fall-distance: 58vh;">
          <img class="petal-sway still" style="--petal-size: 13px; transform: rotate(-14deg);"
            src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_490342c2-4d03-4d50-bcfd-8a6ede9627d7.webp" alt="Kelopak Bunga" />
        </div>
      </div>

      <!-- P3 : Bunga Pink 1 -->
      <div class="petal-spawn" style="top: 31%; left: 74.4%;">
        <div class="petal-fall" style="--petal-fall-duration: 6.4s; --petal-fall-distance: 52vh;">
          <img class="petal-sway" style="--petal-size: 16px; --petal-sway-duration: 3.3s; --petal-sway-distance: 12px; --petal-tilt: 9deg;"
            src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_5475ce69-bd75-44ba-b858-0918718d1f27.webp" alt="Kelopak Bunga" />
        </div>
      </div>

      <!-- P4 : Bunga Putih 1 -->
      <div class="petal-spawn" style="top: 30%; left: 79.8%;">
        <div class="petal-fall" style="--petal-fall-duration: 5.9s; --petal-fall-distance: 60vh;">
          <img class="petal-sway" style="--petal-size: 14px; --petal-sway-duration: 2.6s; --petal-sway-distance: 8px; --petal-tilt: 6deg;"
            src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_2242715c-0bf6-49c5-a6ab-c205a6b0a8bd.webp" alt="Kelopak Bunga" />
        </div>
      </div>

      <!-- P5 : Bunga Pink 7 -->
      <div class="petal-spawn" style="top: 32%; left: 82.9%;">
        <div class="petal-fall" style="--petal-fall-duration: 6.3s; --petal-fall-distance: 54vh;">
          <img class="petal-sway still" style="--petal-size: 15px; transform: rotate(11deg);"
            src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_490342c2-4d03-4d50-bcfd-8a6ede9627d7.webp" alt="Kelopak Bunga" />
        </div>
      </div>

      <!-- P6 : Bunga Putih 3 -->
      <div class="petal-spawn" style="top: 34%; left: 87.8%;">
        <div class="petal-fall" style="--petal-fall-duration: 5.5s; --petal-fall-distance: 57vh;">
          <img class="petal-sway" style="--petal-size: 13px; --petal-sway-duration: 3s; --petal-sway-distance: 11px; --petal-tilt: 8deg;"
            src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_5475ce69-bd75-44ba-b858-0918718d1f27.webp" alt="Kelopak Bunga" />
        </div>
      </div>

      <!-- P7 : Bunga Pink 3 -->
      <div class="petal-spawn" style="top: 36%; left: 60.8%;">
        <div class="petal-fall" style="--petal-fall-duration: 6.2s; --petal-fall-distance: 50vh;">
          <img class="petal-sway" style="--petal-size: 16px; --petal-sway-duration: 2.7s; --petal-sway-distance: 10px; --petal-tilt: 7deg;"
            src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_2242715c-0bf6-49c5-a6ab-c205a6b0a8bd.webp" alt="Kelopak Bunga" />
        </div>
      </div>

      <!-- P8 : Bunga Pink 2 -->
      <div class="petal-spawn" style="top: 36%; left: 91.6%;">
        <div class="petal-fall" style="--petal-fall-duration: 5.8s; --petal-fall-distance: 55vh;">
          <img class="petal-sway still" style="--petal-size: 12px; transform: rotate(-9deg);"
            src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_5475ce69-bd75-44ba-b858-0918718d1f27.webp" alt="Kelopak Bunga" />
        </div>
      </div>

      <!-- P9 : celah antara Pink 1 & Putih 1 -->
      <div class="petal-spawn" style="top: 31%; left: 77%;">
        <div class="petal-fall" style="--petal-fall-duration: 6.5s; --petal-fall-distance: 62vh;">
          <img class="petal-sway" style="--petal-size: 14px; --petal-sway-duration: 3.2s; --petal-sway-distance: 7px; --petal-tilt: 5deg;"
            src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_490342c2-4d03-4d50-bcfd-8a6ede9627d7.webp" alt="Kelopak Bunga" />
        </div>
      </div>

      <!-- P10 : celah antara Putih 1 & Pink 7 -->
      <div class="petal-spawn" style="top: 33%; left: 85%;">
        <div class="petal-fall" style="--petal-fall-duration: 5.6s; --petal-fall-distance: 51vh;">
          <img class="petal-sway still" style="--petal-size: 13px; transform: rotate(16deg);"
            src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_2242715c-0bf6-49c5-a6ab-c205a6b0a8bd.webp" alt="Kelopak Bunga" />
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- 4b. ASSET DEKORASI COUPLE BUNGA LAYER (DI BAWAH OVERLAY PUTIH) -->
    <!-- ======================================================== -->
    <div
      ref="coupleTopDecorWrapperRef"
      style="
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 200%;
        height: 100%;
        z-index: 10;
        pointer-events: none;
        overflow: hidden;
      "
    >
      <!-- ======================================================== -->
      <!-- PANDUAN NGE-EDIT BUNGA PINK (1 s/d 5):                  -->
      <!-- 1. Posisi Vertikal   : Ubah 'top: 30%' (misal: '25%', '40%', '65%') -->
      <!-- 2. Posisi Horizontal : Ubah 'left: 75%' (75% = tengah layar section couple) -->
      <!-- 3. Ukuran Lebar      : Ubah 'width: 70px' (misal: '50px', '90px', '120px') -->
      <!-- 4. Rotasi & Skala    : Ubah 'transform: translate(-50%, -50%) rotate(0deg) scale(1)' -->
      <!--                        - Miring ke kanan : rotate(25deg)  -->
      <!--                        - Miring ke kiri  : rotate(-25deg) -->
      <!-- 5. Opasitas          : Ubah 'opacity: 1' (0.0 - 1.0)     -->
      <!-- ======================================================== -->

      <!-- 1. BUNGA PINK 1 -->
      <div
        style="
          position: absolute;
          top: 30%;
          left: 75%;
          transform: translate(-50%, -50%) rotate(12deg) scale(1);
          width: 96px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_fe3fa073-1230-48ec-bc0c-920f7ac410a2.webp"
          alt="Bunga Pink 1"
          class="flower-sway flower-sway-1"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 2. BUNGA PINK 2 -->
      <div
        style="
          position: absolute;
          top: 35%;
          left: 92%;
          transform: translate(-50%, -50%) rotate(38deg) scale(1);
          width: 52px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_fe3fa073-1230-48ec-bc0c-920f7ac410a2.webp"
          alt="Bunga Pink 2"
          class="flower-sway flower-sway-2"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 3. BUNGA PINK 3 -->
      <div
        style="
          position: absolute;
          top: 35%;
          left: 60%;
          transform: translate(-50%, -50%) rotate(-48deg) scale(1);
          width: 104px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_fe3fa073-1230-48ec-bc0c-920f7ac410a2.webp"
          alt="Bunga Pink 3"
          class="flower-sway flower-sway-3"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 4. BUNGA PINK 4 -->
      <div
        style="
          position: absolute;
          top: 50%;
          left: 98%;
          transform: translate(-50%, -50%) rotate(52deg) scale(1);
          width: 44px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_fe3fa073-1230-48ec-bc0c-920f7ac410a2.webp"
          alt="Bunga Pink 4"
          class="flower-sway flower-sway-4"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 5. BUNGA PINK 5 -->
      <div
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-28deg) scale(1);
          width: 82px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_fe3fa073-1230-48ec-bc0c-920f7ac410a2.webp"
          alt="Bunga Pink 5"
          class="flower-sway flower-sway-5"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 6. BUNGA PINK 6 -->
      <div
        style="
          position: absolute;
          top: 31%;
          left: 67%;
          transform: translate(-50%, -50%) rotate(-20deg) scale(1);
          width: 60px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_fe3fa073-1230-48ec-bc0c-920f7ac410a2.webp"
          alt="Bunga Pink 6"
          class="flower-sway flower-sway-6"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 7. BUNGA PINK 7 -->
      <div
        style="
          position: absolute;
          top: 31%;
          left: 83%;
          transform: translate(-50%, -50%) rotate(22deg) scale(1);
          width: 90px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_fe3fa073-1230-48ec-bc0c-920f7ac410a2.webp"
          alt="Bunga Pink 7"
          class="flower-sway flower-sway-7"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 8. BUNGA PINK 8 -->
      <div
        style="
          position: absolute;
          top: 42%;
          left: 97%;
          transform: translate(-50%, -50%) rotate(32deg) scale(1);
          width: 74px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_fe3fa073-1230-48ec-bc0c-920f7ac410a2.webp"
          alt="Bunga Pink 8"
          class="flower-sway flower-sway-8"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 9. BUNGA PINK 9 -->
      <div
        style="
          position: absolute;
          top: 42%;
          left: 52%;
          transform: translate(-50%, -50%) rotate(-42deg) scale(1);
          width: 48px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_fe3fa073-1230-48ec-bc0c-920f7ac410a2.webp"
          alt="Bunga Pink 9"
          class="flower-sway flower-sway-9"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 10. BUNGA PINK 10 -->
      <div
        style="
          position: absolute;
          top: 60%;
          left: 98%;
          transform: translate(-50%, -50%) rotate(18deg) scale(1);
          width: 88px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_fe3fa073-1230-48ec-bc0c-920f7ac410a2.webp"
          alt="Bunga Pink 10"
          class="flower-sway flower-sway-10"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- ======================================================== -->
      <!-- PANDUAN NGE-EDIT BUNGA PUTIH (1 s/d 10):                -->
      <!-- 1. Posisi Vertikal   : Ubah 'top: 30%' (misal: '25%', '45%', '65%') -->
      <!-- 2. Posisi Horizontal : Ubah 'left: 75%' (75% = tengah layar section couple) -->
      <!-- 3. Ukuran Lebar      : Ubah 'width: 70px' (misal: '50px', '85px', '110px') -->
      <!-- 4. Rotasi & Skala    : Ubah 'transform: translate(-50%, -50%) rotate(0deg) scale(1)' -->
      <!--                        - Miring ke kanan : rotate(25deg)  -->
      <!--                        - Miring ke kiri  : rotate(-25deg) -->
      <!-- 5. Opasitas          : Ubah 'opacity: 1' (0.0 - 1.0)     -->
      <!-- ======================================================== -->

      <!-- 1. BUNGA PUTIH 1 -->
      <div
        style="
          position: absolute;
          top: 29%;
          left: 80%;
          transform: translate(-50%, -50%) rotate(16deg) scale(1);
          width: 46px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_f96cf1ea-0ebc-4b01-908b-5edc4e1ea5f8.webp"
          alt="Bunga Putih 1"
          class="flower-sway flower-sway-1"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 2. BUNGA PUTIH 2 -->
      <div
        style="
          position: absolute;
          top: 29%;
          left: 70%;
          transform: translate(-50%, -50%) rotate(-14deg) scale(1);
          width: 102px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_f96cf1ea-0ebc-4b01-908b-5edc4e1ea5f8.webp"
          alt="Bunga Putih 2"
          class="flower-sway flower-sway-2"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 3. BUNGA PUTIH 3 -->
      <div
        style="
          position: absolute;
          top: 33%;
          left: 88%;
          transform: translate(-50%, -50%) rotate(44deg) scale(1);
          width: 78px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_f96cf1ea-0ebc-4b01-908b-5edc4e1ea5f8.webp"
          alt="Bunga Putih 3"
          class="flower-sway flower-sway-3"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 4. BUNGA PUTIH 4 -->
      <div
        style="
          position: absolute;
          top: 33%;
          left: 62%;
          transform: translate(-50%, -50%) rotate(-34deg) scale(1);
          width: 50px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_f96cf1ea-0ebc-4b01-908b-5edc4e1ea5f8.webp"
          alt="Bunga Putih 4"
          class="flower-sway flower-sway-4"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 5. BUNGA PUTIH 5 -->
      <div
        style="
          position: absolute;
          top: 38%;
          left: 54%;
          transform: translate(-50%, -50%) rotate(-52deg) scale(1);
          width: 98px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_f96cf1ea-0ebc-4b01-908b-5edc4e1ea5f8.webp"
          alt="Bunga Putih 5"
          class="flower-sway flower-sway-5"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 6. BUNGA PUTIH 6 -->
      <div
        style="
          position: absolute;
          top: 45%;
          left: 53%;
          transform: translate(-50%, -50%) rotate(-18deg) scale(1);
          width: 70px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_f96cf1ea-0ebc-4b01-908b-5edc4e1ea5f8.webp"
          alt="Bunga Putih 6"
          class="flower-sway flower-sway-6"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 7. BUNGA PUTIH 7 -->
      <div
        style="
          position: absolute;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-36deg) scale(1);
          width: 86px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_f96cf1ea-0ebc-4b01-908b-5edc4e1ea5f8.webp"
          alt="Bunga Putih 7"
          class="flower-sway flower-sway-7"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 8. BUNGA PUTIH 8 -->
      <div
        style="
          position: absolute;
          top: 38%;
          left: 94%;
          transform: translate(-50%, -50%) rotate(28deg) scale(1);
          width: 94px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_f96cf1ea-0ebc-4b01-908b-5edc4e1ea5f8.webp"
          alt="Bunga Putih 8"
          class="flower-sway flower-sway-8"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 9. BUNGA PUTIH 9 -->
      <div
        style="
          position: absolute;
          top: 45%;
          left: 97%;
          transform: translate(-50%, -50%) rotate(48deg) scale(1);
          width: 54px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_f96cf1ea-0ebc-4b01-908b-5edc4e1ea5f8.webp"
          alt="Bunga Putih 9"
          class="flower-sway flower-sway-9"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>

      <!-- 10. BUNGA PUTIH 10 -->
      <div
        style="
          position: absolute;
          top: 55%;
          left: 97%;
          transform: translate(-50%, -50%) rotate(24deg) scale(1);
          width: 76px;
          max-width: 90%;
          opacity: 1;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/couple%20section/dewirandi_f96cf1ea-0ebc-4b01-908b-5edc4e1ea5f8.webp"
          alt="Bunga Putih 10"
          class="flower-sway flower-sway-10"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          "
        />
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- 5. SINGLE CARD GERBANG SETENGAH OVAL (TETAP DI POSISI)   -->
    <!-- ======================================================== -->
    <div
      ref="cardContainerRef"
      style="
        position: absolute;
        top: calc(60% - 20px);
        left: calc(50% + 15px);
        transform: translate(-50%, -50%);
        width: 88%;
        max-width: 330px;
        z-index: 0;
        pointer-events: none;
        opacity: 0;
      "
    >

      <!-- Container Gerbang Lengkung (+1/3 lebih tinggi, opacity 0.6) -->
      <div
        class="relative w-full min-h-[385px] overflow-hidden bg-white/70 border border-white/65 shadow-[0_20px_50px_rgba(27,48,36,0.28)] pointer-events-auto flex items-center justify-center"
        style="
          border-radius: 170px 170px 28px 28px;
          padding: 26px 16px 18px 16px;
        "
      >
        <!-- Garis Aksen Dekoratif Lengkung Bagian Dalam (Inner Arch Border) -->
        <div
          style="
            position: absolute;
            inset: 6px;
            border: 1px solid rgba(47, 74, 59, 0.2);
            border-radius: 164px 164px 20px 20px;
            pointer-events: none;
          "
        ></div>

        <!-- ===================================================== -->
        <!-- KONTEN INFO GROOM (FADE IN/OUT DI DALAM CARD)         -->
        <!-- ===================================================== -->
        <div
          ref="groomContentRef"
          style="
            position: relative;
            z-index: 10;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            justify-content: center;
            padding: 4px 0;
          "
        >
          <!-- Badge The Groom -->
          <span
            style="
              font-family: 'Montserrat', 'Outfit', sans-serif;
              font-size: 9px;
              text-transform: uppercase;
              letter-spacing: 0.25em;
              color: #1F3A2C;
              font-weight: 700;
              background-color: rgba(228, 236, 231, 0.95);
              padding: 5px 18px;
              border-radius: 9999px;
              margin-bottom: 8px;
              border: 1px solid #C2D6C9;
              display: inline-block;
              box-shadow: 0 1px 2px rgba(0,0,0,0.02);
            "
          >
            The Groom
          </span>

          <!-- Foto Groom (Hanya tampil jika ada foto yang di-upload) -->
          <div
            v-if="invitation.groom_photo && resolveUrl(invitation.groom_photo)"
            style="
              position: relative;
              width: 80px;
              height: 106px;
              margin-bottom: 8px;
              overflow: hidden;
              background-color: rgba(255, 255, 255, 0.95);
              border: 2px solid #ffffff;
              box-shadow: 0 6px 16px rgba(45, 62, 53, 0.15);
              border-radius: 40px 40px 10px 10px;
            "
          >
            <img
              :src="resolveUrl(invitation.groom_photo)"
              :alt="invitation.groom_name"
              style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.7s ease;
              "
              class="hover:scale-105"
            />
          </div>

          <!-- Nama Panggilan / Nama Depan -->
          <h3
            v-if="invitation.groom_name"
            style="
              font-family: 'Cormorant Garamond', Georgia, serif;
              font-size: 26px;
              font-weight: 600;
              color: #162B20;
              line-height: 1.15;
              margin: 0;
              letter-spacing: 0.01em;
            "
          >
            {{ invitation.groom_name }}
          </h3>

          <!-- Nama Lengkap / Panjang -->
          <span
            v-if="invitation.groom_full_name && invitation.groom_full_name !== invitation.groom_name"
            style="
              font-family: 'Cormorant Garamond', Georgia, serif;
              font-size: 14px;
              font-style: italic;
              color: #3D5447;
              margin-top: 4px;
              margin-bottom: 8px;
              font-weight: 500;
              letter-spacing: 0.02em;
              display: block;
              line-height: 1.2;
            "
          >
            {{ invitation.groom_full_name }}
          </span>

          <!-- Divider Garis Halus -->
          <div
            style="
              width: 50px;
              height: 1px;
              background: linear-gradient(to right, transparent, rgba(63, 99, 80, 0.4), transparent);
              margin: 6px 0;
            "
          ></div>

          <!-- Orang Tua Groom -->
          <p
            v-if="invitation.groom_father || invitation.groom_mother"
            style="
              font-family: 'Montserrat', 'Outfit', sans-serif;
              font-size: 11px;
              color: #4A5F52;
              line-height: 1.5;
              max-width: 220px;
              margin: 4px 0 6px 0;
            "
          >
            <span style="font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 13px; color: #5C7367; display: block; margin-bottom: 2px;">Putra dari</span>
            <span style="font-weight: 600; color: #1B3024; font-size: 12px; letter-spacing: 0.02em; display: block;">{{ invitation.groom_father }}</span>
            <template v-if="invitation.groom_mother">
              <span style="font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 12px; color: #5C7367; display: block; margin: 1px 0;">&amp;</span>
              <span style="font-weight: 600; color: #1B3024; font-size: 12px; letter-spacing: 0.02em; display: block;">{{ invitation.groom_mother }}</span>
            </template>
          </p>

          <!-- Asal Groom -->
          <p
            v-if="invitation.groom_origin"
            style="
              font-family: 'Montserrat', 'Outfit', sans-serif;
              font-size: 10.5px;
              color: #5C7367;
              margin-top: 4px;
              margin-bottom: 0;
              font-weight: 500;
              letter-spacing: 0.04em;
              display: flex;
              align-items: center;
              gap: 4px;
              justify-content: center;
            "
          >
            <svg style="width: 11px; height: 11px; color: #3F6350; flex-shrink: 0;" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {{ invitation.groom_origin }}
          </p>
        </div>

        <!-- ===================================================== -->
        <!-- KONTEN INFO BRIDE (FADE IN/OUT DI DALAM CARD)         -->
        <!-- ===================================================== -->
        <div
          ref="brideContentRef"
          style="
            position: absolute;
            inset: 0;
            padding: 26px 16px 18px 16px;
            z-index: 10;
            opacity: 0;
            pointer-events: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            justify-content: center;
          "
        >
          <!-- Badge The Bride -->
          <span
            style="
              font-family: 'Montserrat', 'Outfit', sans-serif;
              font-size: 9px;
              text-transform: uppercase;
              letter-spacing: 0.25em;
              color: #1F3A2C;
              font-weight: 700;
              background-color: rgba(228, 236, 231, 0.95);
              padding: 5px 18px;
              border-radius: 9999px;
              margin-bottom: 8px;
              border: 1px solid #C2D6C9;
              display: inline-block;
              box-shadow: 0 1px 2px rgba(0,0,0,0.02);
            "
          >
            The Bride
          </span>

          <!-- Foto Bride (Hanya tampil jika ada foto yang di-upload) -->
          <div
            v-if="invitation.bride_photo && resolveUrl(invitation.bride_photo)"
            style="
              position: relative;
              width: 80px;
              height: 106px;
              margin-bottom: 8px;
              overflow: hidden;
              background-color: rgba(255, 255, 255, 0.95);
              border: 2px solid #ffffff;
              box-shadow: 0 6px 16px rgba(45, 62, 53, 0.15);
              border-radius: 40px 40px 10px 10px;
            "
          >
            <img
              :src="resolveUrl(invitation.bride_photo)"
              :alt="invitation.bride_name"
              style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.7s ease;
              "
              class="hover:scale-105"
            />
          </div>

          <!-- Nama Panggilan / Nama Depan -->
          <h3
            v-if="invitation.bride_name"
            style="
              font-family: 'Cormorant Garamond', Georgia, serif;
              font-size: 26px;
              font-weight: 600;
              color: #162B20;
              line-height: 1.15;
              margin: 0;
              letter-spacing: 0.01em;
            "
          >
            {{ invitation.bride_name }}
          </h3>

          <!-- Nama Lengkap / Panjang -->
          <span
            v-if="invitation.bride_full_name && invitation.bride_full_name !== invitation.bride_name"
            style="
              font-family: 'Cormorant Garamond', Georgia, serif;
              font-size: 14px;
              font-style: italic;
              color: #3D5447;
              margin-top: 4px;
              margin-bottom: 8px;
              font-weight: 500;
              letter-spacing: 0.02em;
              display: block;
              line-height: 1.2;
            "
          >
            {{ invitation.bride_full_name }}
          </span>

          <!-- Divider Garis Halus -->
          <div
            style="
              width: 50px;
              height: 1px;
              background: linear-gradient(to right, transparent, rgba(63, 99, 80, 0.4), transparent);
              margin: 6px 0;
            "
          ></div>

          <!-- Orang Tua Bride -->
          <p
            v-if="invitation.bride_father || invitation.bride_mother"
            style="
              font-family: 'Montserrat', 'Outfit', sans-serif;
              font-size: 11px;
              color: #4A5F52;
              line-height: 1.5;
              max-width: 220px;
              margin: 4px 0 6px 0;
            "
          >
            <span style="font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 13px; color: #5C7367; display: block; margin-bottom: 2px;">Putri dari</span>
            <span style="font-weight: 600; color: #1B3024; font-size: 12px; letter-spacing: 0.02em; display: block;">{{ invitation.bride_father }}</span>
            <template v-if="invitation.bride_mother">
              <span style="font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 12px; color: #5C7367; display: block; margin: 1px 0;">&amp;</span>
              <span style="font-weight: 600; color: #1B3024; font-size: 12px; letter-spacing: 0.02em; display: block;">{{ invitation.bride_mother }}</span>
            </template>
          </p>

          <!-- Asal Bride -->
          <p
            v-if="invitation.bride_origin"
            style="
              font-family: 'Montserrat', 'Outfit', sans-serif;
              font-size: 10.5px;
              color: #5C7367;
              margin-top: 4px;
              margin-bottom: 0;
              font-weight: 500;
              letter-spacing: 0.04em;
              display: flex;
              align-items: center;
              gap: 4px;
              justify-content: center;
            "
          >
            <svg style="width: 11px; height: 11px; color: #3F6350; flex-shrink: 0;" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {{ invitation.bride_origin }}
          </p>
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
import { resolveAssetUrl } from '@/utils/url';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  apiBase: string;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const bgWrapperRef = ref<HTMLElement | null>(null);
const bgInnerRef = ref<HTMLElement | null>(null);
const fountainWrapperRef = ref<HTMLElement | null>(null);
const coupleDecorWrapperRef = ref<HTMLElement | null>(null);
const coupleTopDecorWrapperRef = ref<HTMLElement | null>(null);
const petalLayerRef = ref<HTMLElement | null>(null);
const quoteContainerRef = ref<HTMLElement | null>(null);
const doaContainerRef = ref<HTMLElement | null>(null);
const cardContainerRef = ref<HTMLElement | null>(null);
const groomContentRef = ref<HTMLElement | null>(null);
const brideContentRef = ref<HTMLElement | null>(null);
const whiteOverlayRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;
let petalAmbientTimer: number | null = null;

const resolveUrl = (url: string | undefined) => {
  if (!url || !url.trim()) return '';
  return resolveAssetUrl(url, props.apiBase);
};

const parsedQuote = computed(() => {
  if (!props.invitation?.quote) return { body: '', source: '' };

  const raw = props.invitation.quote.trim();

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

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    // ============================================================
    // KELOPAK: BURST (semua gugur bersamaan sesaat sebelum groom
    // muncul) -> setelah kelopak lewat, groom fade in (via label
    // timeline) -> AMBIENT (beberapa kelopak gugur berkala, tidak
    // bersamaan, repeat terus). Kontrol lewat longhand animasi
    // inline supaya aman dengan scoped keyframes.
    // ============================================================
    const petalFalls = petalLayerRef.value
      ? (Array.from(petalLayerRef.value.querySelectorAll('.petal-fall')) as HTMLElement[])
      : [];

    const resetPetals = () => {
      if (petalAmbientTimer !== null) {
        clearTimeout(petalAmbientTimer);
        petalAmbientTimer = null;
      }
      petalFalls.forEach((el) => {
        el.style.animationName = '';
        el.style.animationDelay = '';
        el.style.animationDuration = '';
        el.style.animationIterationCount = '';
        el.style.animationFillMode = '';
        el.style.visibility = '';
        el.style.animationPlayState = 'paused';
      });
    };

    const startAmbient = () => {
      if (!petalFalls.length) return;
      // Pilih acak 4-6 kelopak saja; sisanya dimatikan.
      const shuffled = [...petalFalls].sort(() => Math.random() - 0.5);
      const activeSet = new Set(shuffled.slice(0, 4 + Math.floor(Math.random() * 3)));
      petalFalls.forEach((el) => {
        if (activeSet.has(el)) {
          el.style.animationName = '';
          el.style.visibility = '';
          el.style.animationDelay = `${(Math.random() * 7).toFixed(2)}s`;
          el.style.animationDuration = `${(6.5 + Math.random() * 2.5).toFixed(2)}s`;
          el.style.animationIterationCount = 'infinite';
          el.style.animationPlayState = 'running';
        } else {
          // Sembunyikan total: tanpa animasi, opacity default balik ke 1
          // dan kelopak terlihat diam di posisi spawn kalau cuma di-
          // matikan animation-name-nya.
          el.style.animationName = 'none';
          el.style.visibility = 'hidden';
        }
      });
    };

    const startBurst = () => {
      if (!petalFalls.length) return;
      resetPetals();
      petalFalls.forEach((el) => {
        el.style.animationDelay = `${(Math.random() * 0.45).toFixed(2)}s`;
        el.style.animationDuration = `${(5.8 + Math.random() * 0.8).toFixed(2)}s`;
        el.style.animationIterationCount = '1';
        el.style.animationFillMode = 'forwards'; // kunci di opacity 0 setelah lewat
        el.style.animationPlayState = 'running';
      });
      // Semua kelopak sudah lewat (maks ~6.3s + 0.45s delay) -> mode ambient
      petalAmbientTimer = window.setTimeout(startAmbient, 7300);
    };

    // PINNING TIMELINE: QUOTE -> (DOA PENGANTIN if enabled) -> SLIDE PANORAMA -> PETAL BURST -> CARD & GROOM IN -> HOLD GROOM -> GROOM OUT -> JEDA -> BRIDE IN -> HOLD BRIDE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: props.invitation?.show_doa_pengantin ? '+=500%' : '+=400%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      }
    });

    // 1. Tahan quote & posisi awal persis seperti semula saat baru masuk
    tl.to({}, { duration: 0.35 });

    if (props.invitation?.show_doa_pengantin) {
      // 2. Teks quote fade out & geser ke atas sedikit
      if (quoteContainerRef.value) {
        tl.to(quoteContainerRef.value, {
          opacity: 0,
          y: -30,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            if (quoteContainerRef.value) quoteContainerRef.value.style.visibility = 'hidden';
          },
          onReverseComplete: () => {
            if (quoteContainerRef.value) quoteContainerRef.value.style.visibility = 'visible';
          }
        });
      }

      // 3. Teks Doa Pengantin fade in
      if (doaContainerRef.value) {
        tl.to(doaContainerRef.value, {
          onStart: () => {
            if (doaContainerRef.value) doaContainerRef.value.style.visibility = 'visible';
          },
          onReverseComplete: () => {
            if (doaContainerRef.value) doaContainerRef.value.style.visibility = 'hidden';
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        });
      }

      // 4. Tahan teks Doa Pengantin sejenak
      tl.to({}, { duration: 0.6 });

      // 5. Teks Doa Pengantin fade out
      if (doaContainerRef.value) {
        tl.to(doaContainerRef.value, {
          opacity: 0,
          y: -30,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            if (doaContainerRef.value) doaContainerRef.value.style.visibility = 'hidden';
          },
          onReverseComplete: () => {
            if (doaContainerRef.value) doaContainerRef.value.style.visibility = 'visible';
          }
        }, "fadeOutDoa");
      }
    } else {
      // JIKA TIDAK ADA DOA: Langsung fade out quote
      if (quoteContainerRef.value) {
        tl.to(quoteContainerRef.value, {
          opacity: 0,
          y: -30,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            if (quoteContainerRef.value) quoteContainerRef.value.style.visibility = 'hidden';
          },
          onReverseComplete: () => {
            if (quoteContainerRef.value) quoteContainerRef.value.style.visibility = 'visible';
          }
        }, "fadeOutQuoteOnly");
      }
    }

    // Jeda sedikit sebelum mulai slide
    tl.to({}, { duration: 0.3 });

    // 5. Geser background panorama ke lorong gerbang bunga, Dekorasi Couple masuk, & Air mancur geser ke kiri
    if (bgWrapperRef.value && fountainWrapperRef.value) {
      tl.to(bgWrapperRef.value, {
        xPercent: -50, // Geser 50% dari lebarnya (100vw) ke kiri
        duration: 1.5,
        ease: 'power1.inOut',
      }, "slideGarden");

      tl.to(fountainWrapperRef.value, {
        xPercent: -100, // Geser 100% dari lebarnya (100vw) ke kiri
        duration: 1.5,
        ease: 'power1.inOut',
      }, "slideGarden");

      if (coupleDecorWrapperRef.value) {
        tl.to(coupleDecorWrapperRef.value, {
          xPercent: -50, // Geser bersama panorama ke tengah viewport couple
          duration: 1.5,
          ease: 'power1.inOut',
        }, "slideGarden");
      }

      if (coupleTopDecorWrapperRef.value) {
        tl.to(coupleTopDecorWrapperRef.value, {
          xPercent: -50, // Geser bersama panorama ke tengah viewport couple
          duration: 1.5,
          ease: 'power1.inOut',
        }, "slideGarden");
      }

      // Kelopak bunga ikut geser bersama layer bunga agar tetap jatuh dari posisi bunga
      if (petalLayerRef.value) {
        tl.to(petalLayerRef.value, {
          xPercent: -50,
          duration: 1.5,
          ease: 'power1.inOut',
        }, "slideGarden");
      }

      if (bgInnerRef.value) {
        tl.to(bgInnerRef.value, {
          scale: 1.2,
          duration: 1.5,
          ease: 'power1.inOut',
        }, "slideGarden");
      }

      if (whiteOverlayRef.value) {
        tl.to(whiteOverlayRef.value, {
          opacity: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        }, "slideGarden");
      }
    }

    // 6. GELOMBANG KELOPAK: SAAT INFO GROOM AKAN MUNCUL -> SEMUA 10 KELOPAK
    // GUGUR BERSAMAAN (posisi & gerakan random tapi satu gelombang).
    // Jeda scroll ini memberi waktu ~6.5d kelopak lewat seluruhnya,
    // BARU setelah itu card & info groom fade in.
    tl.to({}, {
      duration: 1.15,
      onStart: () => { startBurst(); },
      onReverseComplete: () => { resetPetals(); },
    }, "petalBurst");

    if (cardContainerRef.value) {
      tl.fromTo(
        cardContainerRef.value,
        { opacity: 0, scale: 0.93, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: 'power2.out' },
        "cardAppear"
      );
    }

    // Background panorama dan Asset Quotes (air mancur / mawar) ikut dibuat blur saat card mulai muncul
    if (bgInnerRef.value) {
      tl.to(
        bgInnerRef.value,
        {
          filter: 'blur(4px)',
          duration: 0.85,
          ease: 'power2.out',
        },
        "cardAppear+=0.1"
      );
    }

    if (fountainWrapperRef.value) {
      tl.to(
        fountainWrapperRef.value,
        {
          filter: 'blur(4px)',
          duration: 0.85,
          ease: 'power2.out',
        },
        "cardAppear+=0.1"
      );
    }

    if (groomContentRef.value) {
      tl.fromTo(
        groomContentRef.value,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
        "cardAppear+=0.15"
      );
    }

    // 7. Hold info Groom agar bisa dibaca dengan nyaman & jelas
    tl.to({}, { duration: 1.0 });

    // 8. PERPINDAHAN DARI GROOM KE BRIDE DENGAN JEDA (TIDAK BERTUMPUKAN/NEMPEL)
    // a. Info Groom Fade Out tuntas terlebih dahulu
    if (groomContentRef.value) {
      tl.to(groomContentRef.value, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.in',
      }, "groomOut");
    }

    // b. Beri jeda kosong (gap) saat card sedang bersih
    tl.to({}, { duration: 0.45 });

    // c. Info Bride baru Fade In masuk setelah jeda selesai
    if (brideContentRef.value) {
      tl.fromTo(
        brideContentRef.value,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          onStart: () => {
            if (brideContentRef.value) brideContentRef.value.style.pointerEvents = 'auto';
            if (groomContentRef.value) groomContentRef.value.style.pointerEvents = 'none';
          },
          onReverseComplete: () => {
            if (brideContentRef.value) brideContentRef.value.style.pointerEvents = 'none';
            if (groomContentRef.value) groomContentRef.value.style.pointerEvents = 'auto';
          }
        },
        "brideIn"
      );
    }

    // 9. Hold info Bride agar terbaca dengan nyaman
    tl.to({}, { duration: 1.0 });

    // 10. Card & Info Bride Fade Out, dan hilangkan blur background panorama sebelum pindah ke section countdown
    if (cardContainerRef.value) {
      tl.to(cardContainerRef.value, {
        opacity: 0,
        y: -15,
        scale: 0.95,
        duration: 0.8,
        ease: 'power2.inOut',
      }, "clearBlurAndExit");
    }

    if (bgInnerRef.value) {
      tl.to(
        bgInnerRef.value,
        {
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.inOut',
        },
        "clearBlurAndExit"
      );
    }

    if (fountainWrapperRef.value) {
      tl.to(
        fountainWrapperRef.value,
        {
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.inOut',
        },
        "clearBlurAndExit"
      );
    }

    // 11. Tahan sejenak tampilan background jernih tanpa blur sebelum lanjut scroll ke section countdown
    tl.to({}, { duration: 0.8 });
  }, sectionRef.value);
});

onBeforeUnmount(() => {
  if (petalAmbientTimer !== null) {
    clearTimeout(petalAmbientTimer);
    petalAmbientTimer = null;
  }
  if (ctx) {
    ctx.revert();
  }
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
.stream-center-mid-cascade {
  stroke-dasharray: 14 26 12 28 10 24;
  animation: waterCascadeFlow 1.25s linear infinite;
  animation-delay: -0.3s;
  opacity: 0.8;
}
.stream-center-mid-cascade2 {
  stroke-dasharray: 14 26 12 28 10 24;
  animation: waterCascadeFlow 1.25s linear infinite;
  animation-delay: -0.8s;
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

/* PERCIKAN / MIST PARTICLES DI PUCUK ATAS */
.water-droplet {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, #ffffff 30%, rgba(220, 245, 255, 0.8) 70%, transparent 100%);
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.9));
  pointer-events: none;
  opacity: 0;
}

.drop-1 {
  width: 4.5px;
  height: 4.5px;
  top: 10px;
  left: 48%;
  animation: sprayPop 1.1s ease-out infinite;
  animation-delay: 0s;
}
.drop-2 {
  width: 3.5px;
  height: 3.5px;
  top: 12px;
  left: 52%;
  animation: sprayPop 0.9s ease-out infinite;
  animation-delay: 0.25s;
}
.drop-3 {
  width: 4px;
  height: 4px;
  top: 8px;
  left: 50%;
  animation: sprayPop 1.3s ease-out infinite;
  animation-delay: 0.5s;
}
.drop-4 {
  width: 3px;
  height: 3px;
  top: 14px;
  left: 46%;
  animation: sprayPop 0.85s ease-out infinite;
  animation-delay: 0.7s;
}
.drop-5 {
  width: 3.5px;
  height: 3.5px;
  top: 14px;
  left: 54%;
  animation: sprayPop 1.0s ease-out infinite;
  animation-delay: 0.35s;
}

@keyframes sprayPop {
  0% {
    transform: translate(0, 0) scale(0.3);
    opacity: 0;
  }
  30% {
    opacity: 0.95;
    transform: translate(calc((var(--rand-x, 0.5) - 0.5) * 14px), -8px) scale(1.1);
  }
  100% {
    transform: translate(calc((var(--rand-x, 0.5) - 0.5) * 26px), 12px) scale(0.2);
    opacity: 0;
  }
}

/* TETESAN AIR JATUH KE MANGKOK */
.basin-cascade-drop {
  position: absolute;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 3px rgba(220, 250, 255, 0.9);
  pointer-events: none;
  opacity: 0;
}

.b-drop-left-1 {
  width: 3.2px;
  height: 4.5px;
  top: 30px;
  left: 28px;
  animation: dropSlideLeft 1.45s cubic-bezier(0.4, 0, 0.9, 1) infinite;
  animation-delay: 0.1s;
}
.b-drop-left-2 {
  width: 2.5px;
  height: 3.5px;
  top: 32px;
  left: 42px;
  animation: dropSlideLeft 1.2s cubic-bezier(0.4, 0, 0.9, 1) infinite;
  animation-delay: 0.65s;
}
.b-drop-right-1 {
  width: 3.2px;
  height: 4.5px;
  top: 30px;
  left: 110px;
  animation: dropSlideRight 1.45s cubic-bezier(0.4, 0, 0.9, 1) infinite;
  animation-delay: 0.4s;
}
.b-drop-right-2 {
  width: 2.5px;
  height: 3.5px;
  top: 32px;
  left: 96px;
  animation: dropSlideRight 1.2s cubic-bezier(0.4, 0, 0.9, 1) infinite;
  animation-delay: 0.95s;
}
.b-drop-center-1 {
  width: 2.8px;
  height: 4px;
  top: 35px;
  left: 62px;
  animation: dropSlideCenter 1.3s ease-in infinite;
  animation-delay: 0.3s;
}
.b-drop-center-2 {
  width: 2.8px;
  height: 4px;
  top: 35px;
  left: 78px;
  animation: dropSlideCenter 1.3s ease-in infinite;
  animation-delay: 0.8s;
}

@keyframes dropSlideLeft {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.5);
  }
  20% {
    opacity: 0.9;
  }
  85% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translate(-18px, 116px) scale(1.1);
  }
}

@keyframes dropSlideRight {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.5);
  }
  20% {
    opacity: 0.9;
  }
  85% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translate(18px, 116px) scale(1.1);
  }
}

@keyframes dropSlideCenter {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.5);
  }
  25% {
    opacity: 0.85;
  }
  85% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
    transform: translate(0, 115px) scale(1.0);
  }
}

.top-splash {
  animation: topSplashPop 1.1s ease-out infinite;
  transform-origin: center;
  transform-box: fill-box;
}

.tsp-1 { animation-delay: 0.1s;  animation-duration: 1.1s; }
.tsp-2 { animation-delay: 0.25s; animation-duration: 1.1s; }
.tsp-3 { animation-delay: 0.35s; animation-duration: 1.0s; }
.tsp-4 { animation-delay: 0.55s; animation-duration: 1.0s; }
.tsp-5 { animation-delay: 0.15s; animation-duration: 1.25s; }
.tsp-6 { animation-delay: 0.3s;  animation-duration: 0.9s; }
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

/* PERCIKAN AIR DI KOLAM BAWAH */
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

/* ======================================================== */
/* 4. ANIMASI BUNGA PINK TERTIUP ANGIN (RANDOM & FADED BASE)*/
/* ======================================================== */
.flower-sway {
  transform-origin: bottom center;
  /* Area pudar dibuat lebih luas & halus dari atas ke bawah */
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0.5) 55%, rgba(0, 0, 0, 0) 85%);
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0.5) 55%, rgba(0, 0, 0, 0) 85%);
  will-change: transform;
}

/* Bunga 1: Ritme lembut ayun kiri-kanan */
.flower-sway-1 {
  animation: flowerWindSway1 3.7s ease-in-out infinite;
  animation-delay: -0.4s;
}

/* Bunga 2: Ritme lambat melengkung lebih lebar */
.flower-sway-2 {
  animation: flowerWindSway2 4.6s ease-in-out infinite;
  animation-delay: -1.8s;
}

/* Bunga 3: Ritme cepat dengan getaran angin kecil */
.flower-sway-3 {
  animation: flowerWindSway3 3.3s ease-in-out infinite;
  animation-delay: -2.7s;
}

/* Bunga 4: Ritme tenang dengan variasi jeda angin */
.flower-sway-4 {
  animation: flowerWindSway4 4.9s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
  animation-delay: -3.5s;
}

/* Bunga 5: Ritme asimetris dinamis */
.flower-sway-5 {
  animation: flowerWindSway5 4.1s ease-in-out infinite;
  animation-delay: -1.1s;
}

/* Bunga 6: Ritme halus hembusan tipis */
.flower-sway-6 {
  animation: flowerWindSway6 3.6s ease-in-out infinite;
  animation-delay: -0.7s;
}

/* Bunga 7: Ritme perlahan meliuk */
.flower-sway-7 {
  animation: flowerWindSway7 4.4s ease-in-out infinite;
  animation-delay: -2.2s;
}

/* Bunga 8: Ritme dinamis ayun tegas */
.flower-sway-8 {
  animation: flowerWindSway8 3.8s ease-in-out infinite;
  animation-delay: -1.5s;
}

/* Bunga 9: Ritme santai bergelombang */
.flower-sway-9 {
  animation: flowerWindSway9 4.7s cubic-bezier(0.4, 0.1, 0.6, 0.9) infinite;
  animation-delay: -3.1s;
}

/* Bunga 10: Ritme cepat sepoi-sepoi */
.flower-sway-10 {
  animation: flowerWindSway10 3.4s ease-in-out infinite;
  animation-delay: -2.0s;
}

@keyframes flowerWindSway1 {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-3.5deg); }
  60% { transform: rotate(4deg); }
  85% { transform: rotate(-1.5deg); }
  100% { transform: rotate(0deg); }
}

@keyframes flowerWindSway2 {
  0% { transform: rotate(0deg); }
  30% { transform: rotate(4.2deg); }
  55% { transform: rotate(-1deg); }
  75% { transform: rotate(-3.8deg); }
  100% { transform: rotate(0deg); }
}

@keyframes flowerWindSway3 {
  0% { transform: rotate(0deg); }
  20% { transform: rotate(-4.5deg); }
  45% { transform: rotate(2deg); }
  70% { transform: rotate(5deg); }
  90% { transform: rotate(-1.2deg); }
  100% { transform: rotate(0deg); }
}

@keyframes flowerWindSway4 {
  0% { transform: rotate(0deg); }
  35% { transform: rotate(3.2deg); }
  65% { transform: rotate(-4.2deg); }
  85% { transform: rotate(1deg); }
  100% { transform: rotate(0deg); }
}

@keyframes flowerWindSway5 {
  0% { transform: rotate(0deg); }
  22% { transform: rotate(-2.8deg); }
  48% { transform: rotate(3.8deg); }
  78% { transform: rotate(-4deg); }
  100% { transform: rotate(0deg); }
}

@keyframes flowerWindSway6 {
  0% { transform: rotate(0deg); }
  28% { transform: rotate(3.6deg); }
  52% { transform: rotate(-2.2deg); }
  80% { transform: rotate(1.8deg); }
  100% { transform: rotate(0deg); }
}

@keyframes flowerWindSway7 {
  0% { transform: rotate(0deg); }
  24% { transform: rotate(-3.8deg); }
  58% { transform: rotate(4.2deg); }
  82% { transform: rotate(-1.8deg); }
  100% { transform: rotate(0deg); }
}

@keyframes flowerWindSway8 {
  0% { transform: rotate(0deg); }
  32% { transform: rotate(-4.0deg); }
  62% { transform: rotate(3.4deg); }
  84% { transform: rotate(-1.0deg); }
  100% { transform: rotate(0deg); }
}

@keyframes flowerWindSway9 {
  0% { transform: rotate(0deg); }
  20% { transform: rotate(2.5deg); }
  50% { transform: rotate(-3.6deg); }
  75% { transform: rotate(4.0deg); }
  100% { transform: rotate(0deg); }
}

@keyframes flowerWindSway10 {
  0% { transform: rotate(0deg); }
  26% { transform: rotate(-4.2deg); }
  54% { transform: rotate(3.0deg); }
  78% { transform: rotate(-2.0deg); }
  100% { transform: rotate(0deg); }
}

/* ======================================================== */
/* 5. ANIMASI KELOPAK BUNGA JATUH (TERBANG SWAY KENA ANGIN) */
/* ======================================================== */
.petal-layer {
  /* ========= SEMUA SETELAN KELOPAK ADA DI SINI ========= */
  --petal-size: 16px;           /* ukuran kelopak (lebar gambar)            */
  --petal-fall-duration: 6s;    /* lama 1x jatuh ( makin besar makin lambat)*/
  --petal-fall-distance: 55vh;  /* jarak jatuhnya ke bawah                  */
  --petal-sway-duration: 3.2s;  /* lama 1x goyang kiri-kanan (ayunan angin) */
  --petal-sway-distance: 10px;  /* jarak goyang ke kiri & ke kanan (dikit)  */
  --petal-tilt: 8deg;           /* sudut miring/rotasi kelopak saat goyang  */
  /* ====================================================== */
}

/* Titik lepas kelopak (posisikan lewat inline style top/left di template) */
.petal-spawn {
  position: absolute;
}

/* Gerak JATUH ke bawah + fade in/out (lapisan luar). */
/* PAUSED by default: dipicu via JS (burst -> ambient) */
.petal-fall {
  animation: petalFall var(--petal-fall-duration) linear infinite;
  animation-play-state: paused;
  will-change: transform, opacity;
}

/* Gerak GOYANG kiri-kanan + miring (lapisan dalam, terpisah supaya   */
/* ritme ayunan & kecepatan jatuh bisa diatur sendiri-sendiri)        */
.petal-sway {
  display: block;
  width: var(--petal-size);
  height: auto;
  object-fit: contain;
  animation: petalSway var(--petal-sway-duration) ease-in-out infinite;
  will-change: transform;
}

/* Kelopak TANPA sway: jatuh lurus, pakai rotasi tetap dari inline style */
.petal-sway.still {
  animation: none;
}

@keyframes petalFall {
  0%   { transform: translateY(0);                                 opacity: 0; }
  6%   { opacity: 0.8; }
  85%  { opacity: 0.8; }
  100% { transform: translateY(var(--petal-fall-distance));        opacity: 0; }
}

@keyframes petalSway {
  0%, 100% { transform: translateX(calc(var(--petal-sway-distance) * -1)) rotate(calc(var(--petal-tilt) * -1)); }
  50%      { transform: translateX(var(--petal-sway-distance))            rotate(var(--petal-tilt)); }
}
</style>
