<template>
  <section
    ref="heroSection"
    class="relative min-h-[100dvh] w-full flex flex-col items-center justify-between text-center px-4 sm:px-8 py-12 sm:py-16 overflow-hidden box-border"
    :style="{
      background: '#F4EDE0',
    }"
  >
    <!-- Kotak biru langit pastel (paling bawah, di bawah gambar.
         Lebar selayar, tinggi setengah layar, bawah memudar sampai transparan 100%.) -->
    <svg
      aria-hidden="true"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      style="position:absolute; top:0; left:0; width:100%; height:50dvh; z-index:0; pointer-events:none; display:block;"
    >
      <defs>
        <linearGradient id="haneulSkyFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#C7E0F4" stop-opacity="1" />
          <stop offset="100%" stop-color="#C7E0F4" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="100" fill="url(#haneulSkyFade)" />
    </svg>
    <!-- Gambar background hero (di atas kotak biru, di bawah frame & konten.
         Ukuran atur pakai width / height di bawah (jangan pakai zoom/transform,
         tidak mempan di sini). Makin kecil height = gambar makin pendek.) -->
    <img
      src="https://media.mengundanganda.com/haneul/hero%20section/dewirandi_f6d9fb79-3cb6-4c5d-905a-24f0c68585a2.webp"
      alt=""
      aria-hidden="true"
      style="position:absolute; top:0; left:0; width:100%; height:80%; object-fit:cover; object-position:center top; z-index:1; pointer-events:none; opacity:0.7;"
    />
      <!-- Vintage sine frame : tebal ke dalam, fully-rounded, ukuran sama semua sisi -->
      <!-- Kiri -->
      <svg
        class="absolute left-0 top-0 h-full w-[42px] z-[1] pointer-events-none block"
        :viewBox="`0 0 42 ${frameH}`"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path :d="pathV" fill="#95a987" />
      </svg>
      <!-- Kanan : mirrored -->
      <svg
        class="absolute right-0 top-0 h-full w-[42px] z-[1] pointer-events-none block -scale-x-100"
        :viewBox="`0 0 42 ${frameH}`"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path :d="pathV" fill="#95a987" />
      </svg>
      <!-- Atas -->
      <svg
        class="absolute top-0 left-0 w-full h-[42px] z-[1] pointer-events-none block"
        :viewBox="`0 0 ${frameW} 42`"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path :d="pathH" fill="#95a987" />
      </svg>
      <!-- Bawah : mirrored -->
      <svg
        class="absolute bottom-0 left-0 w-full h-[42px] z-[1] pointer-events-none block -scale-y-100"
        :viewBox="`0 0 ${frameW} 42`"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path :d="pathH" fill="#95a987" />
      </svg>
    <!-- Teks pembuka di ATAS hero (bukan di blok tengah) -->
    <div class="relative z-10 w-full flex justify-center px-10" style="padding-top:96px; padding-bottom:8px;">
      <p class="haneul-top-text text-center font-medium text-[#74B8A3]" style="font-size:11px; letter-spacing:0.2em; line-height:1.8; max-width:270px; text-transform:uppercase; font-style:italic;">
        We joyfully invite you to the marriage of
      </p>
    </div>

    <!-- Center Hero Content Container (nama mempelai, posisi di TENGAH) -->
    <div class="relative z-10 w-full max-w-[360px] sm:max-w-[440px] flex-1 flex flex-col items-center justify-center">
      <!-- Arch Aura Backdrop -->
      <div class="w-full p-6 sm:p-8 relative bg-transparent">
        <slot />
      </div>
    </div>

    <!-- Tanggal pernikahan di BAWAH hero (model badge: hari di atas, MON | DD | YYYY di bawah) -->
    <div class="relative z-10 w-full flex flex-col items-center px-10" style="padding-bottom:34px;">
      <div class="haneul-date-wrapper haneul-bottom-date">
        <div class="haneul-date-day">{{ dateData.dayName }}</div>
        <div class="haneul-date-row">
          <span class="haneul-date-month">{{ dateData.month }}</span>
          <span class="haneul-date-divider" aria-hidden="true"></span>
          <span class="haneul-date-num">{{ dateData.dayNum }}</span>
          <span class="haneul-date-divider" aria-hidden="true"></span>
          <span class="haneul-date-year">{{ dateData.year }}</span>
        </div>
      </div>
      <div style="width:48px; height:1px; background:rgba(125,168,204,0.4); margin-top:8px; margin-bottom:6px;"></div>
      <span class="font-medium" style="font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:#74B8A3; font-style:italic;">The Wedding Day</span>
    </div>

    <!-- Bottom Scroll Cue (panah minimalis, bouncing) -->
    <div class="relative z-10 flex flex-col items-center cursor-pointer select-none" style="padding-bottom:18px;">
      <svg class="haneul-scroll-arrow" style="width:28px; height:28px;" viewBox="0 0 24 24" fill="none" stroke="#386B99" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M6 8.5l6 6 6-6" />
        <path d="M6 13.5l6 6 6-6" opacity="0.35" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    overlayGradient?: string;
    heroImage?: string;
    themeConfig?: any;
    invitation?: any;
    quote?: string;
    apiBase?: string;
  }>(),
  {}
);

const heroSection = ref<HTMLElement | null>(null);

function parseDateInput(raw: any): { dayName: string; month: string; dayNum: string; year: string } {
  let d: Date | null = null;
  if (raw instanceof Date && !isNaN(raw.getTime())) {
    d = raw;
  } else if (typeof raw === "string" && raw.trim()) {
    const s = raw.trim();
    const parsed = new Date(s);
    if (!isNaN(parsed.getTime())) {
      d = parsed;
    } else {
      const indoMonths: Record<string, number> = {
        januari: 0, jan: 0,
        februari: 1, feb: 1,
        maret: 2, mar: 2,
        april: 3, apr: 3,
        mei: 4, may: 4,
        juni: 5, jun: 5,
        juli: 6, jul: 6,
        agustus: 7, agu: 7, aug: 7,
        september: 8, sep: 8,
        oktober: 9, okt: 9, oct: 9,
        november: 10, nov: 10,
        desember: 11, des: 11, dec: 11,
      };
      const m = s.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
      if (m) {
        const day = parseInt(m[1], 10);
        const mKey = m[2].toLowerCase();
        const month = indoMonths[mKey] ?? 0;
        const yr = parseInt(m[3], 10);
        d = new Date(yr, month, day);
      }
    }
  }

  if (!d || isNaN(d.getTime())) {
    d = new Date(2026, 11, 16);
  }

  const daysEn = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const monthsEn = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  return {
    dayName: daysEn[d.getDay()],
    month: monthsEn[d.getMonth()],
    dayNum: String(d.getDate()).padStart(2, "0"),
    year: String(d.getFullYear()),
  };
}

const dateData = computed(() => {
  const raw =
    props.invitation?.akad_date ||
    props.invitation?.resepsi_date ||
    props.invitation?.wedding_date ||
    props.invitation?.date;
  return parseDateInput(raw);
});

// Ukuran gelombang dipatok (sama untuk vertikal & horizontal),
// jumlah mengikuti panjang sisi. Fully sine, rounded dua arah.
const T = 30; // garis tengah kertas (tebal ke dalam)
const AMP = 12; // amplitudo (+/-) -> total strip 42px
const HALF = 32; // setengah gelombang (full 64px)
const K = AMP * 1.25;

const frameH = ref(800);
const frameW = ref(400);

function buildVertical(len: number) {
  const n = Math.max(4, Math.round(len / HALF));
  const L = len / n;
  let d = `M0,0 H${T} `;
  let y = 0;
  for (let i = 0; i < n; i++) {
    const s = i % 2 === 0 ? 1 : -1;
    const cx = T + s * K;
    const yEnd = y + L;
    if (i === 0) {
      d += `C${cx},${(y + L * 0.35).toFixed(1)} ${cx},${(y + L * 0.65).toFixed(1)} ${T},${yEnd.toFixed(1)} `;
    } else {
      d += `S${cx},${(y + L * 0.65).toFixed(1)} ${T},${yEnd.toFixed(1)} `;
    }
    y = yEnd;
  }
  return d + `H0 Z`;
}

function buildHorizontal(len: number) {
  const n = Math.max(4, Math.round(len / HALF));
  const L = len / n;
  let d = `M0,0 H${len} V${T} `;
  let x = len;
  for (let i = 0; i < n; i++) {
    const s = i % 2 === 0 ? 1 : -1;
    const cy = T + s * K;
    const xEnd = x - L;
    if (i === 0) {
      d += `C${(x - L * 0.35).toFixed(1)},${cy} ${(x - L * 0.65).toFixed(1)},${cy} ${xEnd.toFixed(1)},${T} `;
    } else {
      d += `S${(x - L * 0.65).toFixed(1)},${cy} ${xEnd.toFixed(1)},${T} `;
    }
    x = xEnd;
  }
  return d + `V0 Z`;
}

const pathV = computed(() => buildVertical(frameH.value));
const pathH = computed(() => buildHorizontal(frameW.value));

let ro: ResizeObserver | null = null;

onMounted(() => {
  const update = () => {
    if (!heroSection.value) return;
    frameH.value = heroSection.value.clientHeight || 800;
    frameW.value = heroSection.value.clientWidth || 400;
  };
  update();
  ro = new ResizeObserver(update);
  if (heroSection.value) ro.observe(heroSection.value);
});

onUnmounted(() => {
  ro?.disconnect();
});
</script>

<style scoped>
/* container transparan - tanpa background/border/shadow */

/* Bingkai sage fade-in halus */
svg {
  animation: haneul-frame-in 1.8s ease both;
}
@keyframes haneul-frame-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Teks pembuka atas */
.haneul-top-text {
  animation: haneul-top-in 1.4s ease both;
  animation-delay: 0.3s;
}
@keyframes haneul-top-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Tanggal bawah — font & warna sama kayak teks atas (biru, bukan hitam) */
.haneul-bottom-date {
  animation: haneul-top-in 1.4s ease both;
  animation-delay: 0.6s;
}

.haneul-date-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #74B8A3;
  user-select: none;
}

.haneul-date-day {
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #74B8A3;
  line-height: 1;
  margin-bottom: 7px;
  text-align: center;
  padding-left: 0.22em; /* offset letter-spacing for centered optical alignment */
}

@media (min-width: 640px) {
  .haneul-date-day {
    font-size: 19px;
    letter-spacing: 0.24em;
    padding-left: 0.24em;
    margin-bottom: 8px;
  }
}

.haneul-date-row {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  color: #74B8A3;
}

.haneul-date-month {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #74B8A3;
  padding-right: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
}

@media (min-width: 640px) {
  .haneul-date-month {
    font-size: 28px;
    padding-right: 16px;
  }
}

.haneul-date-divider {
  display: inline-block;
  width: 2px;
  height: 32px;
  background-color: #74B8A3;
  flex-shrink: 0;
  border-radius: 1px;
}

@media (min-width: 640px) {
  .haneul-date-divider {
    height: 36px;
    width: 2.2px;
  }
}

.haneul-date-num {
  font-size: 28px;
  font-weight: 600;
  color: #74B8A3;
  padding: 0 14px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

@media (min-width: 640px) {
  .haneul-date-num {
    font-size: 34px;
    padding: 0 16px;
    min-width: 50px;
  }
}

.haneul-date-year {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #74B8A3;
  padding-left: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
}

@media (min-width: 640px) {
  .haneul-date-year {
    font-size: 28px;
    padding-left: 16px;
  }
}

/* Panah scroll — bounce tegas + glow biar fokus ke bawah */
.haneul-scroll-arrow {
  animation: haneul-arrow-bounce 1.3s ease-in-out infinite;
  filter: drop-shadow(0 2px 6px rgba(56, 107, 153, 0.45));
}
@keyframes haneul-arrow-bounce {
  0%, 100% { transform: translateY(-4px); opacity: 1; }
  50% { transform: translateY(8px); opacity: 0.45; }
}
</style>
