<template>
  <section
    ref="heroSection"
    class="relative min-h-[100dvh] w-full flex flex-col items-center justify-between text-center px-4 sm:px-8 py-12 sm:py-16 overflow-hidden box-border"
    :style="{
      background: '#F4EDE0',
    }"
  >
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
    <!-- Spacer atas (pengganti badge agar konten tetap center) -->
    <div class="relative z-10 pt-2 h-8" aria-hidden="true"></div>

    <!-- Center Hero Content Container (Wraps Slot) -->
    <div class="relative z-10 w-full max-w-[360px] sm:max-w-[440px] my-auto flex flex-col items-center">
      <!-- Arch Aura Backdrop -->
      <div class="w-full p-6 sm:p-8 relative bg-transparent">
        <slot />
      </div>
    </div>

    <!-- Bottom Scroll Cue -->
    <div class="relative z-10 pb-2 flex flex-col items-center animate-bounce duration-1000 cursor-pointer select-none">
      <span class="text-[10px] uppercase tracking-[0.25em] text-[#4A6984] font-medium mb-1.5">
        Gulir Ke Bawah
      </span>
      <div class="w-7 h-10 rounded-full border-2 border-[#5B7B99]/40 flex items-start justify-center p-1.5 bg-white/40 backdrop-blur-xs">
        <div class="w-1.5 h-2.5 rounded-full bg-[#386B99] animate-pulse"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

withDefaults(
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
onUnmounted(() => ro?.disconnect());
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
</style>
