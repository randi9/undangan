<template>
  <section ref="heroSection" class="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 md:px-8 overflow-hidden bg-[#2D3E35]">
    <!-- Background Image Spanning Entire Section (Full Cover) -->
    <div
      ref="bgImg"
      class="absolute inset-0 z-0 pointer-events-none transform-gpu"
      :style="{
        backgroundImage: `url('${heroImage || 'https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_003c89a6-d363-423d-83c4-2f34746fb0fb.webp'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
      }"
    ></div>

    <!-- ======================================================== -->
    <!-- ASSET DEKORASI AWAN (GERAK BOLAK-BALIK HALUS - Z-INDEX 1) -->
    <!-- PANDUAN NGE-EDIT: -->
    <!-- 1. Posisi Vertikal : Ubah 'top: 15px' (misal: 0px, -20px, 30px, dll) -->
    <!-- 2. Ukuran Awan     : Ubah 'width: 380px' (sesuaikan px / %) -->
    <!-- 3. Opasitas (80%)  : Ubah 'opacity: 0.8' (bisa 0.7, 0.9, dll) -->
    <!-- 4. Kecepatan Gerak : Ubah 'animation-duration: 35s' (durasi 1 arah, makin besar makin lambat) -->
    <!-- 5. Layer (z-index) : 'z-index: 1' (paling bawah dari semua dekorasi) -->
    <!-- ======================================================== -->
    <div
      style="
        position: absolute;
        top: 15px;
        left: 0;
        z-index: 1;
        pointer-events: none;
        user-select: none;
      "
    >
      <div
        class="evergreen-cloud-drift"
        style="
          width: 380px;
          max-width: 90vw;
          opacity: 0.8;
          animation-duration: 35s;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_4fb989c3-cdd6-4a38-ba48-52964e15d067.webp"
          alt="Dekorasi Awan Melayang"
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
    <!-- ASSET DEKORASI TENGAH 1 (STATIS DI ATAS BACKGROUND) -->
    <!-- PANDUAN NGE-EDIT: -->
    <!-- 1. Posisi Vertikal   : Ubah 'top: 50%' (bisa 'top: 45%', 'top: 120px', dll) -->
    <!-- 2. Posisi Horizontal : Ubah 'left: 75%' (bisa 'left: 50%', 'left: 40%', dll) -->
    <!-- 3. Ukuran Lebar      : Ubah 'width: 70%' / 'max-width: 450px' (sesuaikan px / %) -->
    <!-- 4. Crop Gambar       : Ubah nilai pada 'clip-path: inset(0 0 20% 0)' -> inset(atas kanan bawah kiri) -->
    <!-- 5. Layer (z-index)   : 'z-index: 2' (di atas awan z-1, di bawah teks z-10) -->
    <!-- ======================================================== -->
    <div
      style="
        position: absolute;
        top: 50%;
        left: 75%;
        transform: translate(-50%, -50%);
        width: 70%;
        max-width: 450px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        pointer-events: none;
        user-select: none;
      "
    >
      <img
        src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_e774a1c8-6977-4f6a-9a27-ed773d7a85d6.webp"
        alt="Dekorasi Statis Tengah"
        style="
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          clip-path: inset(0 0 20% 0);
          -webkit-clip-path: inset(0 0 20% 0);
        "
      />
    </div>

    <!-- ======================================================== -->
    <!-- ASSET DEKORASI TENGAH 2 (STATIS DI ATAS BACKGROUND) -->
    <!-- PANDUAN NGE-EDIT: -->
    <!-- 1. Posisi Vertikal   : Ubah 'top: 50%' (bisa 'top: 45%', 'top: 120px', dll) -->
    <!-- 2. Posisi Horizontal : Ubah 'left: 80%' (bisa 'left: 50%', 'left: 40%', dll) -->
    <!-- 3. Ukuran Lebar      : Ubah 'width: 50%' / 'max-width: 450px' (sesuaikan px / %) -->
    <!-- 4. Crop Gambar       : Ubah nilai pada 'clip-path: inset(0 0 10% 0)' -> inset(atas kanan bawah kiri) -->
    <!-- 5. Layer (z-index)   : 'z-index: 2' (di atas awan z-1, di bawah teks z-10) -->
    <!-- ======================================================== -->
    <div
      style="
        position: absolute;
        top: 50%;
        left: 80%;
        transform: translate(-50%, -50%);
        width: 50%;
        max-width: 450px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        pointer-events: none;
        user-select: none;
      "
    >
      <img
        src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_e774a1c8-6977-4f6a-9a27-ed773d7a85d6.webp"
        alt="Dekorasi Statis Tengah"
        style="
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          clip-path: inset(0 0 10% 0);
          -webkit-clip-path: inset(0 0 10% 0);
        "
      />
    </div>

    <!-- ======================================================== -->
    <!-- ASSET DEKORASI GAZEBO (STATIS DI TENGAH LAYAR) -->
    <!-- PANDUAN NGE-EDIT: -->
    <!-- 1. Posisi Vertikal   : Ubah 'top: 50%' (misal: 45%, 52%, atau '150px') -->
    <!-- 2. Posisi Horizontal : Ubah 'left: 50%' (misal: 48%, 55%, dll) -->
    <!-- 3. Ukuran Lebar      : Ubah 'width: 100%' / 'max-width: 420px' (sesuaikan px / %) -->
    <!-- 4. Crop Gambar (Ops) : Tambahkan 'clip-path: inset(0 0 10% 0)' jika perlu memotong -->
    <!-- 5. Layer (z-index)   : 'z-index: 2' (di atas bg z-0, di bawah dahan z-3 s/d z-5, di bawah teks z-10) -->
    <!-- ======================================================== -->
    <div
      style="
        position: absolute;
        top: 56%;
        left: 93%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: 420px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        pointer-events: none;
        user-select: none;
      "
    >
      <img
        src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_ffe34cdf-422b-4ae5-bb75-93af3d918859.webp"
        alt="Dekorasi Gazebo"
        style="
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
        "
      />
    </div>

    <!-- ======================================================== -->
    <!-- ASSET DEKORASI 1: DAHAN POHON UTAMA (KANAN ATAS) -->
    <!-- PANDUAN NGE-EDIT: -->
    <!-- 1. Posisi  : Ubah 'top' (misal: 0px, -20px) & 'right' (misal: 0px, -15px) -->
    <!-- 2. Ukuran  : 'width: 100%' menyentuh ujung kiri layar (bisa pakai misal 110%, 120%, atau pixel) -->
    <!-- 3. Layer   : 'z-index: 5' (berada di atas background & di bawah teks z-10/20) -->
    <!-- ======================================================== -->
    <div
      style="
        position: absolute;
        top: -50px;
        right: -160px;
        width: calc(100% + 80px);
        display: flex;
        justify-content: flex-end;
        z-index: 3;
        pointer-events: none;
        user-select: none;
      "
    >
      <img
        src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_714d21a6-f5bc-414f-88b1-b44248b731c5.webp"
        alt="Dekorasi Dahan Kanan Atas"
        class="evergreen-branch-sway-1"
        style="
          display: block;
          width: calc(100% + 80px);
          max-width: none;
          height: auto;
        "
      />
    </div>

    <!-- ======================================================== -->
    <!-- ASSET DEKORASI 2: DAHAN / DAUN (DI BAWAH ASSET 1) -->
    <!-- PANDUAN NGE-EDIT: -->
    <!-- 1. Posisi  : Ubah 'top' (misal: 60px, 100px, 120px) & 'right' / 'left' -->
    <!-- 2. Ukuran  : Ubah 'width' (misal: 100%, 350px, 450px) atau 'max-width' -->
    <!-- 3. Layer   : 'z-index: 4' -->
    <!-- ======================================================== -->
    <div
      style="
        position: absolute;
        top: 60px;
        right: -50px;
        width: calc(70% + 30px);
        display: flex;
        justify-content: flex-end;
        z-index: 4;
        pointer-events: none;
        user-select: none;
      "
    >
      <img
        src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_fc91163f-8a66-4463-b5e7-674cfabf2339.webp"
        alt="Dekorasi Dahan Layer 2"
        class="evergreen-branch-sway-2"
        style="
          display: block;
          width: 100%;
          height: auto;
        "
      />
    </div>

    <!-- ======================================================== -->
    <!-- ASSET DEKORASI 3: DAHAN / DAUN (DI BAWAH ASSET 2 & LEBIH KE KANAN) -->
    <!-- PANDUAN NGE-EDIT: -->
    <!-- 1. Posisi  : top lebih rendah dari asset 2, right lebih ke kanan -->
    <!-- 2. Layer   : 'z-index: 5' (paling tinggi di antara dekorasi) -->
    <!-- ======================================================== -->
    <div
      style="
        position: absolute;
        top: 140px;
        right: -70px;
        width: calc(65% + 30px);
        display: flex;
        justify-content: flex-end;
        z-index: 5;
        pointer-events: none;
        user-select: none;
      "
    >
      <img
        src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_fc91163f-8a66-4463-b5e7-674cfabf2339.webp"
        alt="Dekorasi Dahan Layer 3"
        class="evergreen-branch-sway-3"
        style="
          display: block;
          width: 100%;
          height: auto;
        "
      />
    </div>

    <!-- ======================================================== -->
    <!-- FALLING LEAVES (DAUN JATUH & TERBANG KEBAWA ANGIN - Z-INDEX DI BAWAH POHON) -->
    <!-- ======================================================== -->
    <div class="absolute inset-0 z-[2] pointer-events-none overflow-hidden select-none" aria-hidden="true">
      <!-- Leaf 1 (Type 1) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-1">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_1813dffb-2140-40b6-b4c6-fa8b352949ae.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-1"
          style="width: 17px; height: auto;"
        />
      </div>

      <!-- Leaf 2 (Type 2) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-2">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_0a208d6c-952c-420c-8b61-3afa5b43e400.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-2"
          style="width: 20px; height: auto;"
        />
      </div>

      <!-- Leaf 3 (Type 3) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-3">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_01a94984-8ffc-4b68-a807-c1661d53f7f7.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-3"
          style="width: 13px; height: auto; opacity: 0.85;"
        />
      </div>

      <!-- Leaf 4 (Type 2) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-4">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_0a208d6c-952c-420c-8b61-3afa5b43e400.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-4"
          style="width: 16px; height: auto;"
        />
      </div>

      <!-- Leaf 5 (Type 1) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-5">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_1813dffb-2140-40b6-b4c6-fa8b352949ae.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-1"
          style="width: 19px; height: auto;"
        />
      </div>

      <!-- Leaf 6 (Type 3) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-6">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_01a94984-8ffc-4b68-a807-c1661d53f7f7.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-2"
          style="width: 15px; height: auto;"
        />
      </div>

      <!-- Leaf 7 (Type 2) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-7">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_0a208d6c-952c-420c-8b61-3afa5b43e400.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-3"
          style="width: 12px; height: auto; opacity: 0.75;"
        />
      </div>

      <!-- Leaf 8 (Type 1) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-8">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_1813dffb-2140-40b6-b4c6-fa8b352949ae.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-4"
          style="width: 18px; height: auto;"
        />
      </div>

      <!-- Leaf 9 (Type 3) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-9">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_01a94984-8ffc-4b68-a807-c1661d53f7f7.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-1"
          style="width: 11px; height: auto; opacity: 0.7;"
        />
      </div>

      <!-- Leaf 10 (Type 2) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-10">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_0a208d6c-952c-420c-8b61-3afa5b43e400.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-2"
          style="width: 21px; height: auto;"
        />
      </div>

      <!-- Leaf 11 (Type 1) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-11">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_1813dffb-2140-40b6-b4c6-fa8b352949ae.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-3"
          style="width: 15px; height: auto;"
        />
      </div>

      <!-- Leaf 12 (Type 3) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-12">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_01a94984-8ffc-4b68-a807-c1661d53f7f7.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-4"
          style="width: 22px; height: auto;"
        />
      </div>

      <!-- Leaf 13 (Type 1) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-13">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_1813dffb-2140-40b6-b4c6-fa8b352949ae.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-1"
          style="width: 16px; height: auto;"
        />
      </div>

      <!-- Leaf 14 (Type 2) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-14">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_0a208d6c-952c-420c-8b61-3afa5b43e400.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-2"
          style="width: 18px; height: auto;"
        />
      </div>

      <!-- Leaf 15 (Type 3) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-15">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_01a94984-8ffc-4b68-a807-c1661d53f7f7.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-3"
          style="width: 14px; height: auto; opacity: 0.8;"
        />
      </div>

      <!-- Leaf 16 (Type 1) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-16">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_1813dffb-2140-40b6-b4c6-fa8b352949ae.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-4"
          style="width: 20px; height: auto;"
        />
      </div>

      <!-- Leaf 17 (Type 2) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-17">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_0a208d6c-952c-420c-8b61-3afa5b43e400.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-1"
          style="width: 13px; height: auto; opacity: 0.75;"
        />
      </div>

      <!-- Leaf 18 (Type 3) -->
      <div class="evergreen-leaf-wrap evergreen-leaf-18">
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_01a94984-8ffc-4b68-a807-c1661d53f7f7.webp"
          alt="Falling Leaf"
          class="evergreen-leaf-img evergreen-leaf-sway-2"
          style="width: 17px; height: auto;"
        />
      </div>
    </div>

    <!-- Hero Content (Directly Floating, No Container Box) -->
    <div ref="heroContent" class="relative z-[10] w-full max-w-xl mx-auto py-12 px-6 flex flex-col items-center">
      <!-- Hero Text Slot -->
      <div class="evergreen-hero-text relative z-20 w-full">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

withDefaults(
  defineProps<{
    overlayGradient?: string;
    heroImage?: string;
    themeConfig?: any;
    invitation?: any;
    quote?: string;
    apiBase?: string;
  }>(),
  {
    heroImage:
      'https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_003c89a6-d363-423d-83c4-2f34746fb0fb.webp',
  }
);

const heroSection = ref<HTMLElement | null>(null);
const heroContent = ref<HTMLElement | null>(null);
const bgImg = ref<HTMLElement | null>(null);
</script>

<style>
/* Typography styles injected from InvitationView slot */
.evergreen-hero-text p {
  color: #FFFFFF !important;
  letter-spacing: 0.25em !important;
  text-transform: uppercase !important;
  font-size: 0.85rem !important;
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.6) !important;
}

.evergreen-hero-text h1 {
  color: #FFFFFF !important;
  font-family: 'Cormorant Garamond', Georgia, serif !important;
  font-weight: 500 !important;
  line-height: 1.15 !important;
  margin: 0.75rem 0 !important;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.6), 0 1px 4px rgba(0, 0, 0, 0.5) !important;
}

.evergreen-hero-text h1 span {
  color: #EAF2ED !important;
  font-style: italic !important;
  font-family: 'Cormorant Garamond', Georgia, serif !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5) !important;
}
</style>

<style>
/* 0. Slow Floating Cloud Animation (Smooth Ping-Pong Back and Forth) */
.evergreen-cloud-drift {
  animation: evergreenCloudMove 35s ease-in-out infinite alternate;
  will-change: transform;
}

/* Freeze Hero animations while the cover transition is still on top
   (class added/removed by CoverEvergreen) so the hidden Hero sits at
   the exact same asset positions as the cover's end state */
html.evergreen-hero-frozen .evergreen-cloud-drift,
html.evergreen-hero-frozen .evergreen-branch-sway-1,
html.evergreen-hero-frozen .evergreen-branch-sway-2,
html.evergreen-hero-frozen .evergreen-branch-sway-3,
html.evergreen-hero-frozen .evergreen-leaf-wrap,
html.evergreen-hero-frozen .evergreen-leaf-img {
  animation-play-state: paused !important;
}

@keyframes evergreenCloudMove {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(calc(100vw - 50%), 0, 0);
  }
}

/* 1. River Masking Path - Following River Geometry from under bridge to bottom rapids */
.evergreen-river-mask {
  clip-path: polygon(
    38% 54%,
    54% 54%,
    62% 64%,
    72% 70%,
    88% 78%,
    100% 86%,
    100% 100%,
    0% 100%,
    0% 90%,
    16% 80%,
    28% 72%,
    32% 64%
  );
  -webkit-clip-path: polygon(
    38% 54%,
    54% 54%,
    62% 64%,
    72% 70%,
    88% 78%,
    100% 86%,
    100% 100%,
    0% 100%,
    0% 90%,
    16% 80%,
    28% 72%,
    32% 64%
  );
}

/* 2. Flowing Downward Light Caustic Sheen */
.evergreen-caustic-flow {
  background: repeating-linear-gradient(
    172deg,
    transparent,
    transparent 16px,
    rgba(255, 255, 255, 0.12) 20px,
    rgba(255, 255, 255, 0.28) 24px,
    rgba(255, 255, 255, 0.08) 28px,
    transparent 36px
  );
  background-size: 100% 200%;
  animation: evergreenCausticMove 5.5s linear infinite;
}

@keyframes evergreenCausticMove {
  0% {
    background-position: 0 0%;
  }
  100% {
    background-position: 0 100%;
  }
}

/* 3. Foam Rapids Glisten Shimmers */
.evergreen-foam-shimmer-1 {
  animation: evergreenFoamPulse1 3.2s ease-in-out infinite alternate;
}

.evergreen-foam-shimmer-2 {
  animation: evergreenFoamPulse2 4.0s ease-in-out infinite alternate;
}

@keyframes evergreenFoamPulse1 {
  0% {
    opacity: 0.35;
    transform: scale(0.98) translateY(0);
  }
  50% {
    opacity: 0.85;
    transform: scale(1.04) translateY(-1px);
  }
  100% {
    opacity: 0.45;
    transform: scale(1.01) translateY(1px);
  }
}

@keyframes evergreenFoamPulse2 {
  0% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.35;
    transform: scale(0.97);
  }
}

/* 4. Sunlight Glints on Water */
.evergreen-water-glint {
  width: 4px;
  height: 4px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.8);
  animation: glintBlink 2.8s ease-in-out infinite;
}

.evergreen-water-glint-2 {
  width: 5px;
  height: 5px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 8px 3px rgba(255, 255, 255, 0.85);
  animation: glintBlink 3.6s ease-in-out 1.2s infinite;
}

.evergreen-water-glint-3 {
  width: 3px;
  height: 3px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.75);
  animation: glintBlink 3.1s ease-in-out 0.6s infinite;
}

@keyframes glintBlink {
  0%, 100% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.2);
  }
}

/* 5. Wind Sway Animation for Hanging Branches (Smooth Start, Instant Response) */
.evergreen-branch-sway-1 {
  transform-origin: 100% 50%; /* Pivot tepat di tengah kanan gambar */
  animation: evergreenBranchSway1 4.5s ease-in-out infinite;
}

.evergreen-branch-sway-2 {
  transform-origin: 100% 50%; /* Pivot tepat di tengah kanan gambar */
  animation: evergreenBranchSway2 5.2s ease-in-out infinite;
}

.evergreen-branch-sway-3 {
  transform-origin: 100% 50%; /* Pivot tepat di tengah kanan gambar */
  animation: evergreenBranchSway3 4.8s ease-in-out infinite;
}

/* Dahan 1: Ayunan murni berporos di kanan tengah */
@keyframes evergreenBranchSway1 {
  0% {
    transform: rotate(0deg);
  }
  28% {
    transform: rotate(2.0deg);
  }
  68% {
    transform: rotate(-1.5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

/* Dahan 2: Ayunan dahan menengah berporos di kanan tengah */
@keyframes evergreenBranchSway2 {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(2.8deg);
  }
  70% {
    transform: rotate(-2.0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

/* Dahan 3: Ayunan dahan depan yang lebih lentur berporos di kanan tengah */
@keyframes evergreenBranchSway3 {
  0% {
    transform: rotate(0deg);
  }
  27% {
    transform: rotate(3.4deg);
  }
  67% {
    transform: rotate(-2.5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

/* ======================================================== */
/* 6. Falling Wind-Blown Leaves Animation (Daun Jatuh Melayang) */
/* ======================================================== */
.evergreen-leaf-wrap {
  position: absolute;
  pointer-events: none;
  opacity: 0;
  will-change: transform, opacity;
  perspective: 800px;
}

.evergreen-leaf-img {
  display: block;
  transform-origin: center center;
  will-change: transform;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.35));
}

/* Leaf Instances Configurations (Gentle & Calm Falling Speeds) */
.evergreen-leaf-1 {
  top: -40px;
  right: 12%;
  animation: evergreenLeafFall1 12.5s linear -4.2s infinite;
}

.evergreen-leaf-2 {
  top: 10px;
  right: -20px;
  animation: evergreenLeafFall2 16.0s linear -9.0s infinite;
}

.evergreen-leaf-3 {
  top: -30px;
  right: 32%;
  animation: evergreenLeafFall3 20.0s linear -13.5s infinite;
}

.evergreen-leaf-4 {
  top: 50px;
  right: 4%;
  animation: evergreenLeafFall4 14.5s linear -3.0s infinite;
}

.evergreen-leaf-5 {
  top: -50px;
  right: 20%;
  animation: evergreenLeafFall5 11.0s linear -6.5s infinite;
}

.evergreen-leaf-6 {
  top: 100px;
  right: -10px;
  animation: evergreenLeafFall6 18.0s linear -11.0s infinite;
}

.evergreen-leaf-7 {
  top: -45px;
  right: 42%;
  animation: evergreenLeafFall7 22.0s linear -16.0s infinite;
}

.evergreen-leaf-8 {
  top: 25px;
  right: 8%;
  animation: evergreenLeafFall8 11.5s linear -2.0s infinite;
}

.evergreen-leaf-9 {
  top: -25px;
  right: 52%;
  animation: evergreenLeafFall9 21.0s linear -9.5s infinite;
}

.evergreen-leaf-10 {
  top: 140px;
  right: -30px;
  animation: evergreenLeafFall10 13.5s linear -7.0s infinite;
}

.evergreen-leaf-11 {
  top: -60px;
  right: 26%;
  animation: evergreenLeafFall11 15.5s linear -4.8s infinite;
}

.evergreen-leaf-12 {
  top: 35px;
  right: 16%;
  animation: evergreenLeafFall12 12.0s linear -3.5s infinite;
}

.evergreen-leaf-13 {
  top: -35px;
  right: 8%;
  animation: evergreenLeafFall1 14.0s linear -10.2s infinite;
}

.evergreen-leaf-14 {
  top: 60px;
  right: -15px;
  animation: evergreenLeafFall2 12.8s linear -5.8s infinite;
}

.evergreen-leaf-15 {
  top: -50px;
  right: 36%;
  animation: evergreenLeafFall3 19.0s linear -15.0s infinite;
}

.evergreen-leaf-16 {
  top: -15px;
  right: 18%;
  animation: evergreenLeafFall5 11.8s linear -8.4s infinite;
}

.evergreen-leaf-17 {
  top: 80px;
  right: 1%;
  animation: evergreenLeafFall4 15.0s linear -12.5s infinite;
}

.evergreen-leaf-18 {
  top: -40px;
  right: 28%;
  animation: evergreenLeafFall6 13.8s linear -4.0s infinite;
}

/* ======================================================== */
/* SMOOTH LINEAR FLIGHT TRAJECTORIES (NO PAUSES / NO STUTTER) */
/* ======================================================== */

/* Trajectory 1: S-curve sway to the bottom-left */
@keyframes evergreenLeafFall1 {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  10% {
    transform: translate3d(-30px, 12vh, 0);
    opacity: 0.95;
  }
  30% {
    transform: translate3d(-75px, 36vh, 0);
  }
  55% {
    transform: translate3d(-40px, 66vh, 0);
  }
  80% {
    transform: translate3d(-155px, 96vh, 0);
    opacity: 0.95;
  }
  100% {
    transform: translate3d(-230px, 120vh, 0);
    opacity: 0;
  }
}

/* Trajectory 2: Wide graceful wind glide */
@keyframes evergreenLeafFall2 {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  10% {
    transform: translate3d(-45px, 12vh, 0);
    opacity: 0.95;
  }
  35% {
    transform: translate3d(-130px, 42vh, 0);
  }
  65% {
    transform: translate3d(-190px, 78vh, 0);
  }
  85% {
    transform: translate3d(-280px, 102vh, 0);
    opacity: 0.95;
  }
  100% {
    transform: translate3d(-340px, 120vh, 0);
    opacity: 0;
  }
}

/* Trajectory 3: Slow background float */
@keyframes evergreenLeafFall3 {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  12% {
    transform: translate3d(-20px, 14vh, 0);
    opacity: 0.85;
  }
  40% {
    transform: translate3d(-60px, 48vh, 0);
  }
  70% {
    transform: translate3d(-125px, 84vh, 0);
  }
  88% {
    transform: translate3d(-160px, 105vh, 0);
    opacity: 0.75;
  }
  100% {
    transform: translate3d(-185px, 120vh, 0);
    opacity: 0;
  }
}

/* Trajectory 4: Breezy flutter with smooth drift */
@keyframes evergreenLeafFall4 {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  10% {
    transform: translate3d(-35px, 12vh, 0);
    opacity: 0.9;
  }
  32% {
    transform: translate3d(-95px, 38vh, 0);
  }
  60% {
    transform: translate3d(-145px, 72vh, 0);
  }
  85% {
    transform: translate3d(-225px, 102vh, 0);
    opacity: 0.85;
  }
  100% {
    transform: translate3d(-275px, 120vh, 0);
    opacity: 0;
  }
}

/* Trajectory 5: Fast gust sweeping diagonal across screen */
@keyframes evergreenLeafFall5 {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  8% {
    transform: translate3d(-40px, 10vh, 0);
    opacity: 0.95;
  }
  30% {
    transform: translate3d(-140px, 36vh, 0);
  }
  60% {
    transform: translate3d(-260px, 72vh, 0);
  }
  85% {
    transform: translate3d(-340px, 102vh, 0);
    opacity: 0.9;
  }
  100% {
    transform: translate3d(-390px, 120vh, 0);
    opacity: 0;
  }
}

/* Trajectory 6: Wide sweeping arc drift */
@keyframes evergreenLeafFall6 {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  10% {
    transform: translate3d(-30px, 12vh, 0);
    opacity: 0.9;
  }
  35% {
    transform: translate3d(-90px, 42vh, 0);
  }
  65% {
    transform: translate3d(-190px, 78vh, 0);
  }
  88% {
    transform: translate3d(-270px, 105vh, 0);
    opacity: 0.85;
  }
  100% {
    transform: translate3d(-315px, 120vh, 0);
    opacity: 0;
  }
}

/* Trajectory 7: Gentle zigzag drifting from upper center */
@keyframes evergreenLeafFall7 {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  12% {
    transform: translate3d(15px, 14vh, 0);
    opacity: 0.8;
  }
  38% {
    transform: translate3d(-20px, 45vh, 0);
  }
  68% {
    transform: translate3d(-95px, 81vh, 0);
  }
  88% {
    transform: translate3d(-140px, 105vh, 0);
    opacity: 0.7;
  }
  100% {
    transform: translate3d(-175px, 120vh, 0);
    opacity: 0;
  }
}

/* Trajectory 8: Quick flutter and steady down-drift */
@keyframes evergreenLeafFall8 {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  8% {
    transform: translate3d(-35px, 10vh, 0);
    opacity: 0.95;
  }
  30% {
    transform: translate3d(-110px, 36vh, 0);
  }
  60% {
    transform: translate3d(-210px, 72vh, 0);
  }
  85% {
    transform: translate3d(-285px, 102vh, 0);
    opacity: 0.9;
  }
  100% {
    transform: translate3d(-330px, 120vh, 0);
    opacity: 0;
  }
}

/* Trajectory 9: Deep distant ambient floating drift */
@keyframes evergreenLeafFall9 {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  15% {
    transform: translate3d(-15px, 18vh, 0);
    opacity: 0.75;
  }
  45% {
    transform: translate3d(-50px, 54vh, 0);
  }
  75% {
    transform: translate3d(-105px, 90vh, 0);
  }
  90% {
    transform: translate3d(-130px, 108vh, 0);
    opacity: 0.65;
  }
  100% {
    transform: translate3d(-145px, 120vh, 0);
    opacity: 0;
  }
}

/* Trajectory 10: Swirling path starting below main branches */
@keyframes evergreenLeafFall10 {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  10% {
    transform: translate3d(-40px, 12vh, 0);
    opacity: 0.9;
  }
  35% {
    transform: translate3d(-110px, 42vh, 0);
  }
  65% {
    transform: translate3d(-200px, 78vh, 0);
  }
  88% {
    transform: translate3d(-290px, 105vh, 0);
    opacity: 0.85;
  }
  100% {
    transform: translate3d(-335px, 120vh, 0);
    opacity: 0;
  }
}

/* Trajectory 11: High lofty float with gentle wind line */
@keyframes evergreenLeafFall11 {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  10% {
    transform: translate3d(-25px, 12vh, 0);
    opacity: 0.9;
  }
  35% {
    transform: translate3d(-75px, 42vh, 0);
  }
  65% {
    transform: translate3d(-145px, 78vh, 0);
  }
  88% {
    transform: translate3d(-215px, 105vh, 0);
    opacity: 0.8;
  }
  100% {
    transform: translate3d(-255px, 120vh, 0);
    opacity: 0;
  }
}

/* Trajectory 12: Dramatic diagonal swoop */
@keyframes evergreenLeafFall12 {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  8% {
    transform: translate3d(-45px, 10vh, 0);
    opacity: 0.95;
  }
  28% {
    transform: translate3d(-150px, 34vh, 0);
  }
  58% {
    transform: translate3d(-275px, 70vh, 0);
  }
  85% {
    transform: translate3d(-365px, 102vh, 0);
    opacity: 0.9;
  }
  100% {
    transform: translate3d(-415px, 120vh, 0);
    opacity: 0;
  }
}

/* ======================================================== */
/* NATURAL 2D LEAF SWAYS (PURE SMOOTH ROTATIONS, NO 3D FLIP)*/
/* ======================================================== */
.evergreen-leaf-sway-1 {
  animation: leafSway1 3.8s ease-in-out infinite alternate;
}

.evergreen-leaf-sway-2 {
  animation: leafSway2 4.5s ease-in-out infinite alternate;
}

.evergreen-leaf-sway-3 {
  animation: leafSway3 3.2s ease-in-out infinite alternate;
}

.evergreen-leaf-sway-4 {
  animation: leafSway4 4.2s ease-in-out infinite alternate;
}

/* Sway 1: Ayunan miring seimbang mengikuti angin */
@keyframes leafSway1 {
  0% {
    transform: rotate(-14deg);
  }
  50% {
    transform: rotate(4deg);
  }
  100% {
    transform: rotate(18deg);
  }
}

/* Sway 2: Ayunan lembut daun mengapung */
@keyframes leafSway2 {
  0% {
    transform: rotate(16deg);
  }
  50% {
    transform: rotate(-3deg);
  }
  100% {
    transform: rotate(-18deg);
  }
}

/* Sway 3: Getaran flutter ringan hembusan angin */
@keyframes leafSway3 {
  0% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-5deg);
  }
}

/* Sway 4: Ayunan lentur lebar */
@keyframes leafSway4 {
  0% {
    transform: rotate(-20deg);
  }
  50% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(22deg);
  }
}
</style>
