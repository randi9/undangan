<template>
  <div
    :class="[
      'fixed inset-0 z-[100] flex flex-col items-center justify-center w-full h-[100dvh] select-none pointer-events-auto overflow-hidden',
      isClosing ? 'pointer-events-none' : '',
    ]"
    :style="{
      backgroundColor: isClosing ? 'transparent' : '#aed4da',
      fontFamily: fontBody || `'Plus Jakarta Sans', sans-serif`,
      transition: 'background-color 700ms ease-out',
    }"
  >
    <!-- Scene Wrapper: satu kamera push-in ke arah awan (transform-origin di awan),
         semua aset lain otomatis terlempar keluar viewport -->
    <div class="cover-scene absolute inset-0" :class="entering ? 'scene-entering' : ''">

      <!-- White Gradient Panel (bottom half of screen) -->
      <svg
        class="absolute bottom-0 left-0 w-full h-[60vh] z-[1] pointer-events-none transition-opacity duration-700"
        :class="entering ? 'opacity-0' : 'opacity-100'"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="rf-white-fade" x1="0" y1="0" x2="0" y2="1">
            <!-- Top edge fully transparent -->
            <stop offset="0" stop-color="#ffffff" stop-opacity="0" />
            <!-- Fully opaque white at 1/2 from the top -->
            <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.8" />
            <!-- Solid white down to the bottom -->
            <stop offset="1" stop-color="#ffffff" stop-opacity="1" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="1" height="1" fill="url(#rf-white-fade)" />
      </svg>

    <!-- Cloud Decoration -->
    <img
      :src="cloud.src"
      alt=""
      :class="[
        'cloud-decor absolute z-[0] pointer-events-none select-none',
        cloud.drift ? 'cloud-drift' : '',
      ]"
      :style="{
        bottom: cloud.bottom,
        left: cloud.left,
        width: cloud.width,
        minWidth: cloud.width,
        maxWidth: 'none',
        height: 'auto',
        opacity: cloud.opacity,
        transform: `translateX(${cloud.translateX})`,
        '--cloud-base-x': cloud.translateX,
        '--cloud-drift-x': cloud.driftX,
        '--cloud-drift-y': cloud.driftY,
        '--cloud-drift-speed': cloud.driftSpeed,
      }"
    />

    <!-- Gate Decoration -->
    <img
      :src="gate.src"
      alt=""
      class="gate-decor absolute z-[2] pointer-events-none select-none"
      :style="{
        bottom: gate.bottom,
        left: gate.left,
        height: gate.height,
        width: 'auto',
        maxWidth: 'none',
        transform: `translateX(${gate.translateX}) rotate(${gate.rotate})`,
      }"
    />

    <!-- Sudut Kanan Bawah (di atas gerbang) -->
    <img
      v-if="cornerRight.src"
      :src="cornerRight.src"
      alt=""
      class="corner-decor absolute z-[3] pointer-events-none select-none"
      :style="{
        bottom: cornerRight.bottom,
        right: cornerRight.right,
        width: cornerRight.width,
        maxWidth: 'none',
        height: 'auto',
        opacity: cornerRight.opacity,
        transform: `rotate(${cornerRight.rotate})`,
      }"
    />

    <!-- Sudut Kiri Bawah (mirror dari kanan terhadap sumbu Y) -->
    <img
      v-if="cornerLeft.src"
      :src="cornerLeft.src"
      alt=""
      class="corner-decor absolute z-[3] pointer-events-none select-none"
      :style="{
        bottom: cornerLeft.bottom,
        left: cornerLeft.left,
        width: cornerLeft.width,
        maxWidth: 'none',
        height: 'auto',
        opacity: cornerLeft.opacity,
        transform: `rotate(${cornerLeft.rotate}) scaleX(-1)`,
      }"
    />

    <!-- Sudut Kanan ATAS: cukup ubah angka di config cornerTopRight -->
    <img
      v-if="cornerTopRight.src"
      :src="cornerTopRight.src"
      alt=""
      :class="[
        'corner-decor absolute z-[3] pointer-events-none select-none',
        cornerTopRight.sway ? 'corner-sway' : '',
      ]"
      :style="{
        top: cornerTopRight.top,
        right: cornerTopRight.right,
        width: cornerTopRight.width,
        maxWidth: 'none',
        height: 'auto',
        opacity: cornerTopRight.opacity,
        transformOrigin: cornerTopRight.swayOrigin,
        transform: `rotate(${cornerTopRight.rotate})`,
        '--sway-base': cornerTopRight.rotate,
        '--sway-angle': cornerTopRight.swayAngle,
        '--sway-speed': cornerTopRight.swaySpeed,
      }"
    />

    <!-- HIASAN KIRI BAWAH (paling atas, di atas semua aset): cukup ubah angka di config decoBottomLeft -->
    <img
      v-if="decoBottomLeft.src"
      :src="decoBottomLeft.src"
      alt=""
      :class="[
        'corner-decor absolute z-[5] pointer-events-none select-none',
        decoBottomLeft.sway ? 'flower-sway' : '',
      ]"
      :style="{
        bottom: decoBottomLeft.bottom,
        left: decoBottomLeft.left,
        width: decoBottomLeft.width,
        maxWidth: 'none',
        height: 'auto',
        opacity: decoBottomLeft.opacity,
        transformOrigin: decoBottomLeft.swayOrigin,
        transform: `rotate(${decoBottomLeft.rotate})`,
        '--sway-base': decoBottomLeft.rotate,
        '--sway-angle': decoBottomLeft.swayAngle,
        '--sway-speed': decoBottomLeft.swaySpeed,
        '--sway-delay': decoBottomLeft.swayDelay,
      }"
    />

    <!-- HIASAN KIRI BAWAH #2 (di atas bunga decoBottomLeft): cukup ubah angka di config decoBottomLeft2 -->
    <img
      v-if="decoBottomLeft2.src"
      :src="decoBottomLeft2.src"
      alt=""
      :class="[
        'corner-decor absolute z-[6] pointer-events-none select-none',
        decoBottomLeft2.sway ? 'flower-sway' : '',
      ]"
      :style="{
        bottom: decoBottomLeft2.bottom,
        left: decoBottomLeft2.left,
        width: decoBottomLeft2.width,
        maxWidth: 'none',
        height: 'auto',
        opacity: decoBottomLeft2.opacity,
        transformOrigin: decoBottomLeft2.swayOrigin,
        transform: `rotate(${decoBottomLeft2.rotate})`,
        '--sway-base': decoBottomLeft2.rotate,
        '--sway-angle': decoBottomLeft2.swayAngle,
        '--sway-speed': decoBottomLeft2.swaySpeed,
        '--sway-delay': decoBottomLeft2.swayDelay,
      }"
    />

    <!-- HIASAN KIRI BAWAH #3 (paling atas, z-[7] di atas semua aset): cukup ubah angka di config decoBottomLeft3 -->
    <img
      v-if="decoBottomLeft3.src"
      :src="decoBottomLeft3.src"
      alt=""
      :class="[
        'corner-decor absolute z-[7] pointer-events-none select-none',
        decoBottomLeft3.sway ? 'flower-sway' : '',
      ]"
      :style="{
        bottom: decoBottomLeft3.bottom,
        left: decoBottomLeft3.left,
        width: decoBottomLeft3.width,
        maxWidth: 'none',
        height: 'auto',
        opacity: decoBottomLeft3.opacity,
        transformOrigin: decoBottomLeft3.swayOrigin,
        transform: `rotate(${decoBottomLeft3.rotate})`,
        '--sway-base': decoBottomLeft3.rotate,
        '--sway-angle': decoBottomLeft3.swayAngle,
        '--sway-speed': decoBottomLeft3.swaySpeed,
        '--sway-delay': decoBottomLeft3.swayDelay,
      }"
    />

    <!-- HIASAN KIRI BAWAH #4 (paling atas, z-[8] di atas SEMUA aset): cukup ubah angka di config decoBottomLeft4 -->
    <img
      v-if="decoBottomLeft4.src"
      :src="decoBottomLeft4.src"
      alt=""
      :class="[
        'corner-decor absolute z-[8] pointer-events-none select-none',
        decoBottomLeft4.sway ? 'flower-sway' : '',
      ]"
      :style="{
        bottom: decoBottomLeft4.bottom,
        left: decoBottomLeft4.left,
        width: decoBottomLeft4.width,
        maxWidth: 'none',
        height: 'auto',
        opacity: decoBottomLeft4.opacity,
        transformOrigin: decoBottomLeft4.swayOrigin,
        transform: `rotate(${decoBottomLeft4.rotate})`,
        '--sway-base': decoBottomLeft4.rotate,
        '--sway-angle': decoBottomLeft4.swayAngle,
        '--sway-speed': decoBottomLeft4.swaySpeed,
        '--sway-delay': decoBottomLeft4.swayDelay,
      }"
    />

    <!-- HIASAN KANAN BAWAH #1 (mirror decoBottomLeft, di-flip thd sumbu Y): cukup ubah angka di config decoBottomRight -->
    <img
      v-if="decoBottomRight.src"
      :src="decoBottomRight.src"
      alt=""
      :class="[
        'corner-decor absolute z-[5] pointer-events-none select-none',
        decoBottomRight.sway ? 'flower-sway' : '',
      ]"
      :style="{
        bottom: decoBottomRight.bottom,
        right: decoBottomRight.right,
        width: decoBottomRight.width,
        maxWidth: 'none',
        height: 'auto',
        opacity: decoBottomRight.opacity,
        transformOrigin: decoBottomRight.swayOrigin,
        transform: `rotate(${decoBottomRight.rotate}) scaleX(-1)`,
        '--sway-base': decoBottomRight.rotate,
        '--sway-angle': decoBottomRight.swayAngle,
        '--sway-speed': decoBottomRight.swaySpeed,
        '--sway-delay': decoBottomRight.swayDelay,
        '--sway-dir': '-1',
        '--flip': '-1',
      }"
    />

    <!-- HIASAN KANAN BAWAH #2 (mirror decoBottomLeft2, di-flip thd sumbu Y): cukup ubah angka di config decoBottomRight2 -->
    <img
      v-if="decoBottomRight2.src"
      :src="decoBottomRight2.src"
      alt=""
      :class="[
        'corner-decor absolute z-[6] pointer-events-none select-none',
        decoBottomRight2.sway ? 'flower-sway' : '',
      ]"
      :style="{
        bottom: decoBottomRight2.bottom,
        right: decoBottomRight2.right,
        width: decoBottomRight2.width,
        maxWidth: 'none',
        height: 'auto',
        opacity: decoBottomRight2.opacity,
        transformOrigin: decoBottomRight2.swayOrigin,
        transform: `rotate(${decoBottomRight2.rotate}) scaleX(-1)`,
        '--sway-base': decoBottomRight2.rotate,
        '--sway-angle': decoBottomRight2.swayAngle,
        '--sway-speed': decoBottomRight2.swaySpeed,
        '--sway-delay': decoBottomRight2.swayDelay,
        '--sway-dir': '-1',
        '--flip': '-1',
      }"
    />

    <!-- HIASAN KANAN BAWAH #3 (mirror decoBottomLeft3, di-flip thd sumbu Y, z-[7]): cukup ubah angka di config decoBottomRight3 -->
    <img
      v-if="decoBottomRight3.src"
      :src="decoBottomRight3.src"
      alt=""
      :class="[
        'corner-decor absolute z-[7] pointer-events-none select-none',
        decoBottomRight3.sway ? 'flower-sway' : '',
      ]"
      :style="{
        bottom: decoBottomRight3.bottom,
        right: decoBottomRight3.right,
        width: decoBottomRight3.width,
        maxWidth: 'none',
        height: 'auto',
        opacity: decoBottomRight3.opacity,
        transformOrigin: decoBottomRight3.swayOrigin,
        transform: `rotate(${decoBottomRight3.rotate}) scaleX(-1)`,
        '--sway-base': decoBottomRight3.rotate,
        '--sway-angle': decoBottomRight3.swayAngle,
        '--sway-speed': decoBottomRight3.swaySpeed,
        '--sway-delay': decoBottomRight3.swayDelay,
        '--sway-dir': '-1',
        '--flip': '-1',
      }"
    />

    <!-- HIASAN KANAN BAWAH #4 (paling atas di kanan, z-[8] di atas SEMUA aset kanan): cukup ubah angka di config decoBottomRight4 -->
    <img
      v-if="decoBottomRight4.src"
      :src="decoBottomRight4.src"
      alt=""
      :class="[
        'corner-decor absolute z-[8] pointer-events-none select-none',
        decoBottomRight4.sway ? 'flower-sway' : '',
      ]"
      :style="{
        bottom: decoBottomRight4.bottom,
        right: decoBottomRight4.right,
        width: decoBottomRight4.width,
        maxWidth: 'none',
        height: 'auto',
        opacity: decoBottomRight4.opacity,
        transformOrigin: decoBottomRight4.swayOrigin,
        transform: `rotate(${decoBottomRight4.rotate})`,
        '--sway-base': decoBottomRight4.rotate,
        '--sway-angle': decoBottomRight4.swayAngle,
        '--sway-speed': decoBottomRight4.swaySpeed,
        '--sway-delay': decoBottomRight4.swayDelay,
      }"
    />

    </div>
    <!-- /Scene Wrapper -->

    <!-- All Text Centered -->
    <div
      class="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-[460px] transition-all duration-700 ease-out"
      :class="[
        entering ? 'scale-[1.35]' : isClosing ? 'scale-95' : 'scale-100',
        entering || isClosing ? 'opacity-0' : 'opacity-100',
      ]"
    >
      <p class="text-[#B0808A] text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold mb-4">
        The Royal Wedding Of
      </p>

      <h1
        class="text-4xl md:text-5xl lg:text-6xl text-[#243029] font-normal leading-tight tracking-wide"
        :style="{ fontFamily: fontHeading || `'Cinzel Decorative', 'Playfair Display', serif` }"
      >
        {{ groomName }}
        <span class="block text-2xl md:text-3xl text-[#B0808A] my-1 font-serif italic opacity-90">&amp;</span>
        {{ brideName }}
      </h1>

      <div class="text-center mt-8 mb-8">
        <p class="text-[#4A5B52] text-[10px] tracking-[0.3em] uppercase font-medium mb-1.5">
          Kepada Yth. Bapak/Ibu/Saudara/i
        </p>
        <h3 class="text-[#243029] text-base md:text-lg font-semibold tracking-wide">
          {{ guestName || 'Tamu Undangan' }}
        </h3>
      </div>

      <!-- Open Button with Royal Shimmer -->
      <button
        @click="startEnter"
        :disabled="entering"
        class="royal-open-btn relative group overflow-hidden px-8 py-3.5 rounded-full text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[#18201B] bg-gradient-to-r from-[#D4A6AD] via-[#ECE0D3] to-[#D4A6AD] shadow-[0_4px_25px_rgba(212,166,173,0.35)] hover:shadow-[0_6px_35px_rgba(236,224,211,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
      >
        <span class="relative z-10 flex items-center gap-2">
          <svg class="w-4 h-4 text-[#18201B]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-7 4.5L5 8V6l7 4.5L19 6v2z"/>
          </svg>
          Buka Undangan
        </span>
        <div class="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </button>
    </div>

    <!-- White Flash (melewati awan -> pindah ke home) -->
    <div
      class="rf-flash absolute inset-0 z-[300] pointer-events-none bg-white"
      :style="{
        opacity: flash ? 1 : 0,
        transition: flashOut
          ? 'opacity 1100ms ease-out'
          : 'opacity 550ms ease-in',
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeUnmount } from 'vue';

defineProps<{
  groomName: string;
  brideName: string;
  guestName: string;
  isClosing: boolean;
  fontHeading?: string;
  fontBody?: string;
  coverImage?: string;
}>();

const emit = defineEmits<{
  (e: 'open'): void;
}>();

// ====== ANIMASI "MASUK GEBANG" (zoom aset -> nembus awan -> flash putih -> home) ======
const entering = ref(false);   // fase zoom semua aset ke arah kamera
const flash = ref(false);      // layar putih penuh
const flashOut = ref(false);   // putih memudar, home muncul di baliknya
let enterTimers: ReturnType<typeof setTimeout>[] = [];

function startEnter() {
  if (entering.value) return;
  entering.value = true;

  // 1.15s: aset hampir menutupi layar -> mulai flash putih (550ms sampai penuh)
  enterTimers.push(setTimeout(() => (flash.value = true), 1150));
  // 1.75s: layar udah putih penuh -> emit 'open', parent mount halaman home
  enterTimers.push(setTimeout(() => emit('open'), 1750));
  // 2.0s: flash putih memudar (1.1s) ngasih liat home pelan-pelan
  enterTimers.push(setTimeout(() => (flashOut.value = true), 2000));
}

onBeforeUnmount(() => {
  enterTimers.forEach(clearTimeout);
  enterTimers = [];
});
// =====================================================================================

// ====== NGODAK-NGATIK AWAN: cukup ubah angka di sini ======
const cloud = reactive({
  src: 'https://media.mengundanganda.com/royalfantasy/cover%20section/dewirandi_127365b5-5cae-4f3b-8c6b-28b824071fdf.webp',
  bottom: '200px',    // jarak dari bawah layar (naikkan mis. '20px' biar naik)
  left: '50%',       // posisi horizontal ('50%' pas di tengah jika translateX '-50%')
  width: '200%',    // lebar awan (mis. '150%', '200%', '300%', '800px')
  translateX: '-50%', // geser -50% agar titik pusat awan tepat di tengah layar
  opacity: 0.7,
  // --- ANIMASI DRIFT AWAN (melayang pelan) ---
  drift: true,          // false = awan diam
  driftX: '10px',       // jarak melayang ke kiri & kanan
  driftY: '10px',       // jarak naik-turun (0 = murni horizontal)
  driftSpeed: '20s',    // durasi 1 siklus penuh (makin besar makin pelan)
});
// ==========================================================

// ====== GERBANG: cukup ubah angka di sini ======
const gate = reactive({
  src: 'https://media.mengundanganda.com/royalfantasy/cover%20section/dewirandi_5a901fc7-ad37-4182-be66-11bc41dac274.webp',
  bottom: '0px',     // jarak dari bawah layar (negatif juga boleh, mis. '-30px' biar agak tenggelam)
  left: '50%',       // posisi horizontal ('50%' + translateX '-50%' = pas tengah)
  height: '105%',    // tinggi gerbang (lebar otomatis ikut rasio gambar)
  translateX: '-50%', // geser horizontal biar tengah ('-50%' = tengah layar)
  rotate: '0deg',    // mis. '2deg' kalau mau agak miring
});
// ===============================================

// ====== SUDUT KANAN BAWAH: cukup ubah angka di sini ======
const cornerRight = reactive({
  src: 'https://media.mengundanganda.com/royalfantasy/cover%20section/dewirandi_947acf0e-2d70-41ad-8aae-347ede67114e.webp',
  bottom: '0px',       // jarak dari bawah layar (naikkan mis. '20px', negatif juga boleh '-10px')
  right: '-25px',        // jarak dari kanan layar (geser masuk mis. '16px')
  width: '140px',      // lebar gambar (tinggi otomatis ikut rasio) — mis. '25%', '180px'
  rotate: '0deg',      // mis. '-5deg' kalau mau agak miring
  opacity: 1,
});
// =========================================================

// ====== SUDUT KIRI BAWAH (mirror kanan, di-flip horizontal): cukup ubah angka di sini ======
const cornerLeft = reactive({
  src: 'https://media.mengundanganda.com/royalfantasy/cover%20section/dewirandi_947acf0e-2d70-41ad-8aae-347ede67114e.webp',
  bottom: '0px',       // samakan dengan cornerRight.bottom biar sejek
  left: '-25px',         // jarak dari KIRI layar (padanan dari `right` di cornerRight)
  width: '140px',      // samakan dengan cornerRight.width biar sama besar
  rotate: '0deg',      // kalau pakai rotasi, pakai nilai NEGATIF dari cornerRight biar benar2 mirror (mis. cornerRight '5deg' -> ini '-5deg')
  opacity: 1,
});
// NOTE: flip horizontal (scaleX(-1)) sudah otomatis dipasang di template, tidak perlu diatur di sini.
// ================================================================================================

// ====== SUDUT KANAN ATAS: cukup ubah angka di sini ======
const cornerTopRight = reactive({
  src: 'https://media.mengundanganda.com/royalfantasy/cover%20section/dewirandi_c6c09b17-ed2f-4988-b528-1b94a8247d4c.webp',
  top: '-30px',          // jarak dari ATAS layar (turunkan mis. '20px', negatif juga boleh '-10px')
  right: '-50px',        // jarak dari KANAN layar (geser masuk mis. '16px', negatif biar keluar)
  width: '500px',      // lebar gambar (tinggi otomatis ikut rasio) — mis. '25%', '180px'
  rotate: '0deg',      // kemiringan awal gambar
  opacity: 1,
  // --- ANIMASI SWAY (ayunan) ---
  sway: true,                      // false = matikan animasi
  swayOrigin: 'bottom right',      // titik pivot ayunan (bisa 'top left', 'center', dll.)
  swayAngle: '2deg',               // besar ayunan ke kiri & kanan dari posisi awal
  swaySpeed: '10s',                 // durasi 1 siklus penuh (makin besar = makin lambat)
});
// =========================================================

// ====== HIASAN KIRI BAWAH (z paling tinggi): cukup ubah angka di sini ======
const decoBottomLeft = reactive({
  src: 'https://media.mengundanganda.com/royalfantasy/cover%20section/dewirandi_ba871a15-8e1c-4458-8c31-ada2727ce18a.webp',
  bottom: '-50px',       // jarak dari BAWAH layar (naikkan mis. '20px', negatif biar tenggelam)
  left: '-30px',   // jarak dari KIRI layar (geser masuk mis. '16px', negatif biar keluar)
  width: '220px',      // lebar gambar (tinggi otomatis ikut rasio) — mis. '30%', '300px'
  rotate: '-30deg',      // mis. '-5deg' kalau mau agak miring
  opacity: 1,
  // --- ANIMASI SWAY BUNGA ---
  sway: true,                    // false = bunga diam
  swayOrigin: 'bottom center',   // titik pivot ayunan (bawah = pangkal batang)
  swayAngle: '2deg',             // besar ayunan (pelan = angka kecil)
  swaySpeed: '11s',              // durasi 1 siklus (makin besar = makin pelan)
  swayDelay: '-2.4s',            // delay NEGATIF = mulai di tengah siklus => terlihat random
});
// ==========================================================================

// ====== HIASAN KIRI BAWAH #3 (paling atas, z-[7] di atas semua aset): cukup ubah angka di sini ======
const decoBottomLeft3 = reactive({
  src: 'https://media.mengundanganda.com/royalfantasy/cover%20section/dewirandi_2693d84a-723c-4ced-9e64-3a7bb62ca229.webp',
  bottom: '-100px',       // jarak dari BAWAH layar (naikkan mis. '20px', negatif biar tenggelam)
  left: '10px',         // jarak dari KIRI layar (geser masuk mis. '16px', negatif biar keluar)
  width: '150px',        // lebar gambar (tinggi otomatis ikut rasio) — mis. '30%', '300px'
  rotate: '0deg',        // mis. '-5deg' kalau mau agak miring
  opacity: 1,
  // --- ANIMASI SWAY BUNGA ---
  sway: true,                    // false = bunga diam
  swayOrigin: 'bottom center',   // titik pivot ayunan (bawah = pangkal batang)
  swayAngle: '1.5deg',           // besar ayunan (pelan = angka kecil)
  swaySpeed: '9s',               // durasi 1 siklus (makin besar = makin pelan)
  swayDelay: '-5.7s',            // delay NEGATIF = mulai di tengah siklus => terlihat random
});
// ==========================================================================

// ====== HIASAN KIRI BAWAH #4 (z-[8] di atas SEMUA aset): cukup ubah angka di sini ======
const decoBottomLeft4 = reactive({
  src: 'https://media.mengundanganda.com/royalfantasy/cover%20section/dewirandi_65898184-f020-40ce-9bf7-673762952552.webp',
  bottom: '-60px',       // jarak dari BAWAH layar (naikkan mis. '20px', negatif biar tenggelam)
  left: '80px',         // jarak dari KIRI layar (geser masuk mis. '16px', negatif biar keluar)
  width: '100px',        // lebar gambar (tinggi otomatis ikut rasio) — mis. '30%', '300px'
  rotate: '0deg',        // mis. '-5deg' kalau mau agak miring
  opacity: 1,
  // --- ANIMASI SWAY BUNGA ---
  sway: true,                    // false = bunga diam
  swayOrigin: 'bottom center',   // titik pivot ayunan (bawah = pangkal batang)
  swayAngle: '2deg',             // besar ayunan (pelan = angka kecil)
  swaySpeed: '12.5s',            // durasi 1 siklus (makin besar = makin pelan)
  swayDelay: '-7.3s',            // delay NEGATIF = mulai di tengah siklus => terlihat random
});
// ==========================================================================

// ====== HIASAN KANAN BAWAH #1 (mirror decoBottomLeft, flip otomatis scaleX(-1)): cukup ubah angka di sini ======
const decoBottomRight = reactive({
  src: 'https://media.mengundanganda.com/royalfantasy/cover%20section/dewirandi_ba871a15-8e1c-4458-8c31-ada2727ce18a.webp',
  bottom: '-50px',       // samakan dengan decoBottomLeft.bottom biar sejajar
  right: '-30px',        // jarak dari KANAN layar (padanan dari `left` di decoBottomLeft)
  width: '220px',        // samakan dengan decoBottomLeft.width biar sama besar
  rotate: '30deg',       // pakai nilai NEGATIF dari decoBottomLeft.rotate biar benar2 mirror (kiri '-30deg' -> ini '30deg')
  opacity: 1,
  // --- ANIMASI SWAY BUNGA ---
  sway: true,                    // false = bunga diam
  swayOrigin: 'bottom center',   // titik pivot ayunan (bawah = pangkal batang)
  swayAngle: '2deg',             // besar ayunan (pelan = angka kecil)
  swaySpeed: '10s',              // durasi 1 siklus (makin besar = makin pelan)
  swayDelay: '-6.8s',            // delay NEGATIF = mulai di tengah siklus => terlihat random
});
// NOTE: flip horizontal (scaleX(-1)) sudah otomatis dipasang di template, tidak perlu diatur di sini.
// =========================================================================================================

// ====== HIASAN KANAN BAWAH #2 (mirror decoBottomLeft2): cukup ubah angka di sini ======
const decoBottomRight2 = reactive({
  src: 'https://media.mengundanganda.com/royalfantasy/cover%20section/dewirandi_acb8e79d-1b0b-4360-9674-b309d2d78e2f.webp',
  bottom: '-30px',       // samakan dengan decoBottomLeft2.bottom biar sejajar
  right: '-15px',        // jarak dari KANAN layar (padanan dari `left` di decoBottomLeft2)
  width: '150px',        // samakan dengan decoBottomLeft2.width biar sama besar
  rotate: '0deg',        // pakai nilai NEGATIF dari decoBottomLeft2.rotate biar benar2 mirror
  opacity: 1,
  // --- ANIMASI SWAY BUNGA ---
  sway: true,                    // false = bunga diam
  swayOrigin: 'bottom center',   // titik pivot ayunan (bawah = pangkal batang)
  swayAngle: '1.5deg',           // besar ayunan (pelan = angka kecil)
  swaySpeed: '12s',              // durasi 1 siklus (makin besar = makin pelan)
  swayDelay: '-1.9s',            // delay NEGATIF = mulai di tengah siklus => terlihat random
});
// ===============================================================================

// ====== HIASAN KANAN BAWAH #3 (mirror decoBottomLeft3, z-[7] di atas semua aset): cukup ubah angka di sini ======
const decoBottomRight3 = reactive({
  src: 'https://media.mengundanganda.com/royalfantasy/cover%20section/dewirandi_2693d84a-723c-4ced-9e64-3a7bb62ca229.webp',
  bottom: '-100px',       // samakan dengan decoBottomLeft3.bottom biar sejajar
  right: '20px',        // jarak dari KANAN layar (padanan dari `left` di decoBottomLeft3)
  width: '150px',        // samakan dengan decoBottomLeft3.width biar sama besar
  rotate: '0deg',        // pakai nilai NEGATIF dari decoBottomLeft3.rotate biar benar2 mirror
  opacity: 1,
  // --- ANIMASI SWAY BUNGA ---
  sway: true,                    // false = bunga diam
  swayOrigin: 'bottom center',   // titik pivot ayunan (bawah = pangkal batang)
  swayAngle: '2.5deg',           // besar ayunan (pelan = angka kecil)
  swaySpeed: '8.5s',             // durasi 1 siklus (makin besar = makin pelan)
  swayDelay: '-4.5s',            // delay NEGATIF = mulai di tengah siklus => terlihat random
});
// =============================================================================================================

// ====== HIASAN KANAN BAWAH #4 (paling atas di kanan, z-[8]): cukup ubah angka di sini ======
const decoBottomRight4 = reactive({
  src: 'https://media.mengundanganda.com/dewirandi/dewirandi_27174b41-0cd2-4308-9ef6-6ccd73f6e22e.webp',
  bottom: '-60px',       // jarak dari BAWAH layar (naikkan mis. '20px', negatif biar tenggelam)
  right: '80px',        // jarak dari KANAN layar (geser masuk mis. '16px', negatif biar keluar)
  width: '100px',        // lebar gambar (tinggi otomatis ikut rasio) — mis. '30%', '300px'
  rotate: '0deg',        // mis. '-5deg' kalau mau agak miring
  opacity: 1,
  // --- ANIMASI SWAY BUNGA ---
  sway: true,                    // false = bunga diam
  swayOrigin: 'bottom center',   // titik pivot ayunan (bawah = pangkal batang)
  swayAngle: '2deg',             // besar ayunan (pelan = angka kecil)
  swaySpeed: '11.5s',            // durasi 1 siklus (makin besar = makin pelan)
  swayDelay: '-9.1s',            // delay NEGATIF = mulai di tengah siklus => terlihat random
});
// =============================================================================================================

// ====== HIASAN KIRI BAWAH #2 (di atas bunga, z-[6]): cukup ubah angka di sini ======
const decoBottomLeft2 = reactive({
  src: 'https://media.mengundanganda.com/royalfantasy/cover%20section/dewirandi_acb8e79d-1b0b-4360-9674-b309d2d78e2f.webp',
  bottom: '-50px',       // jarak dari BAWAH layar (naikkan mis. '20px', negatif biar tenggelam)
  left: '-20px',         // jarak dari KIRI layar (geser masuk mis. '16px', negatif biar keluar)
  width: '150px',      // lebar gambar (tinggi otomatis ikut rasio) — mis. '30%', '300px'
  rotate: '0deg',      // mis. '-5deg' kalau mau agak miring
  opacity: 1,
  // --- ANIMASI SWAY BUNGA ---
  sway: true,                    // false = bunga diam
  swayOrigin: 'bottom center',   // titik pivot ayunan (bawah = pangkal batang)
  swayAngle: '1.5deg',           // besar ayunan (pelan = angka kecil)
  swaySpeed: '13s',              // durasi 1 siklus (makin besar = makin pelan)
  swayDelay: '-8.2s',            // delay NEGATIF = mulai di tengah siklus => terlihat random
});
// ================================================================================
</script>

<style scoped>
/* ====== FASE "MASUK GERBANG": kamera push-in ke titik awan ====== */
/* Satu wrapper scene di-zoom terhadap transform-origin posisi awan,
   jadi semua aset lain otomatis terdorong RADIAL keluar viewport.
   Animasi sway/drift TETAP jalan — keyframe-nya pakai transform sendiri
   sehingga tetap komposisional terhadap zoom wrapper. */
.cover-scene {
  transform: scale(1);
  transform-origin: 50% 68%; /* <- titik "tujuan" kamera (posisi awan). Geser kalau meleset */
  transition: transform 1700ms cubic-bezier(0.55, 0.05, 0.9, 0.5); /* pelan lalu ngebut */
  will-change: transform;
}

.cover-scene.scene-entering {
  transform: scale(4.2); /* <- seberapa jauh kamera "masuk" */
}
/* ================================================================ */

.rf-flash {
  will-change: opacity;
}

.cloud-decor {
  max-width: none !important;
  height: auto !important;
  /* Fade bagian bawah awan menjadi transparan */
  -webkit-mask-image: linear-gradient(
    to bottom,
    #000 0%,
    #000 55%,
    rgba(0, 0, 0, 0.5) 75%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    #000 0%,
    #000 55%,
    rgba(0, 0, 0, 0.5) 75%,
    transparent 100%
  );
}

.gate-decor {
  max-width: none !important;
  width: auto !important; /* lebar mengikuti rasio gambar, tinggi diatur via gate.height */
}

.corner-decor {
  max-width: none !important; /* supaya width di config corner bebas di atas 100% */
}

/* Animasi sway: berayun dari (base - swayAngle) ke (base + swayAngle) */
.corner-sway {
  animation: rf-sway var(--sway-speed, 4s) ease-in-out infinite;
  will-change: transform;
}

@keyframes rf-sway {
  0%,
  100% {
    transform: rotate(calc(var(--sway-base, 0deg) - var(--sway-angle, 3deg)));
  }
  50% {
    transform: rotate(calc(var(--sway-base, 0deg) + var(--sway-angle, 3deg)));
  }
}

/* Sway bunga bawah: tetap hormati scaleX(-1) (mirror) & rotate awal,
   arah ayunan dibalik via --sway-dir utk sisi kanan biar benar2 mirror */
.flower-sway {
  animation: rf-flower-sway var(--sway-speed, 10s) ease-in-out var(--sway-delay, 0s) infinite;
  will-change: transform;
}

@keyframes rf-flower-sway {
  0%,
  100% {
    transform: rotate(
        calc(var(--sway-base, 0deg) - var(--sway-dir, 1) * var(--sway-angle, 2deg))
      )
      scaleX(var(--flip, 1));
  }
  50% {
    transform: rotate(
        calc(var(--sway-base, 0deg) + var(--sway-dir, 1) * var(--sway-angle, 2deg))
      )
      scaleX(var(--flip, 1));
  }
}

/* Awan melayang: geser X + naik-turun dikit, kembali lagi (loop halus) */
.cloud-drift {
  animation: rf-cloud-drift var(--cloud-drift-speed, 16s) ease-in-out infinite;
  will-change: transform;
}

@keyframes rf-cloud-drift {
  0%,
  100% {
    transform: translate(
      calc(var(--cloud-base-x, 0%) - var(--cloud-drift-x, 35px)),
      calc(var(--cloud-drift-y, 5px) * -1)
    );
  }
  50% {
    transform: translate(
      calc(var(--cloud-base-x, 0%) + var(--cloud-drift-x, 35px)),
      var(--cloud-drift-y, 5px)
    );
  }
}
</style>
