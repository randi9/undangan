<template>
  <div
    ref="coverRoot"
    class="fixed inset-0 z-[100] flex flex-col items-center justify-center w-full h-[100dvh] overflow-hidden select-none"
    :style="{
      backgroundColor: '#2D3E35',
      fontFamily: fontBody || `'Plus Jakarta Sans', sans-serif`,
      padding: '28px 16px',
      boxSizing: 'border-box',
    }"
  >
    <!-- Background Image Spanning Entire Screen -->
    <div
      ref="bgImg"
      class="absolute inset-0 z-0 pointer-events-none transform-gpu"
      :style="{
        backgroundImage: `url('${coverImage || 'https://media.mengundanganda.com/evergreen/cover%20section/dewirandi_0009b342-21cc-4132-b79c-d7d041a71b4f.webp'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'calc(50% - 20px) center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
      }"
    ></div>

    <!-- Soft Ambient Overlays -->
    <div class="absolute inset-0 z-[1] pointer-events-none bg-[#15231C]/35"></div>
    <div
      class="absolute inset-0 z-[2] pointer-events-none"
      style="background: radial-gradient(circle at 50% 50%, rgba(20, 32, 26, 0.2) 0%, rgba(10, 18, 14, 0.65) 100%);"
    ></div>

    <!-- Decorative Corner Leaf Accents -->
    <div
      :ref="(el) => setLeafRef(el)"
      class="absolute top-5 left-5 z-[3] text-[#A2B8A6]/35 pointer-events-none"
    >
      <svg class="w-10 h-10 md:w-12 md:h-12 rotate-[-45deg]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17,8C8,10 59,16.17 3.82,21.34L5.23,22.75C10.4,17.58 16.58,15 17,8M6.5,5A1.5,1.5 0 0,0 5,6.5A1.5,1.5 0 0,0 6.5,8A1.5,1.5 0 0,0 6.5,5Z"/>
      </svg>
    </div>
    <div
      :ref="(el) => setLeafRef(el)"
      class="absolute bottom-5 right-5 z-[3] text-[#A2B8A6]/35 pointer-events-none"
    >
      <svg class="w-10 h-10 md:w-12 md:h-12 rotate-[135deg]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17,8C8,10 59,16.17 3.82,21.34L5.23,22.75C10.4,17.58 16.58,15 17,8M6.5,5A1.5,1.5 0 0,0 5,6.5A1.5,1.5 0 0,0 6.5,8A1.5,1.5 0 0,0 6.5,5Z"/>
      </svg>
    </div>

    <!-- CENTERED WEDDING CARD -->
    <div
      ref="cardContainer"
      class="relative z-10 rounded-[32px] bg-[#16271F]/75 backdrop-blur-md border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.45)] text-center"
      :style="{
        width: '100%',
        maxWidth: '380px',
        height: 'calc(100dvh - 56px)',
        maxHeight: 'calc(100dvh - 56px)',
        boxSizing: 'border-box',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }"
    >
      <!-- TOP SECTION -->
      <div class="flex flex-col items-center w-full">
        <!-- Botanical Leaf Emblem -->
        <div class="mb-2 text-[#A2B8A6] opacity-90">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M12 3v18m0-18C8 3 4 7 4 12s4 9 8 9m0-18c4 0 8 4 8 9s-4 9-8 9"/>
          </svg>
        </div>

        <!-- "THE WEDDING OF" Header with dividers -->
        <div class="flex items-center gap-2.5 mb-2">
          <span class="w-5 h-[1px] bg-[#7A9A8B]/70"></span>
          <span class="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#D8E5DC] font-medium">
            The Wedding Of
          </span>
          <span class="w-5 h-[1px] bg-[#7A9A8B]/70"></span>
        </div>

        <!-- COUPLE NAMES -->
        <h1
          class="text-3xl sm:text-4xl md:text-[2.5rem] text-white font-normal leading-[1.2] my-1 drop-shadow-md tracking-wide"
          :style="{ fontFamily: fontHeading || `'Cormorant Garamond', Georgia, serif` }"
        >
          <span class="block">{{ groomName }}</span>
          <span class="block text-2xl sm:text-3xl text-[#C8D8CC] italic font-light my-0.5 opacity-90">
            &amp;
          </span>
          <span class="block">{{ brideName }}</span>
        </h1>

        <!-- Delicate Divider Line -->
        <div class="w-12 h-[1px] bg-[#7A9A8B]/50 my-3"></div>
      </div>

      <!-- MIDDLE SECTION (GUEST RECIPIENT INFO) -->
      <div class="flex flex-col items-center w-full my-auto py-2">
        <p class="text-[10px] sm:text-[11px] tracking-[0.25em] text-[#B4C9BA] uppercase font-medium mb-1">
          Kepada Yth. Bapak/Ibu/Saudara/i
        </p>
        <h3
          class="text-base sm:text-lg md:text-xl font-semibold text-white tracking-wide leading-snug break-words max-w-[280px] drop-shadow-sm"
          :style="{ fontFamily: fontHeading || `'Cormorant Garamond', Georgia, serif` }"
        >
          {{ guestName || 'Tamu Undangan' }}
        </h3>
      </div>

      <!-- BOTTOM SECTION (BUKA UNDANGAN BUTTON) -->
      <div class="w-full flex justify-center pt-2">
        <button
          ref="bukaBtn"
          @click="bukaAmplop"
          type="button"
          class="group relative flex items-center justify-center gap-2.5 px-8 py-3 rounded-full bg-[#4A6B5B] hover:bg-[#5C7E6E] active:scale-95 text-white font-semibold text-xs uppercase tracking-[0.25em] border border-white/25 shadow-[0_8px_20px_rgba(20,36,28,0.5)] hover:shadow-[0_12px_28px_rgba(74,107,91,0.6)] hover:scale-[1.03] transition-all duration-300 focus:outline-none cursor-pointer"
        >
          <svg
            class="w-4 h-4 text-[#D8E5DC] group-hover:text-white transition-transform duration-300 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span class="drop-shadow-sm">Buka Undangan</span>
        </button>
      </div>
    </div>

    <!-- Soft Low-Opacity Flash Flare Overlay -->
    <div
      ref="whiteBloom"
      class="absolute inset-0 z-[50] pointer-events-none opacity-0"
      style="background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.45) 50%, rgba(240, 248, 244, 0) 100%); mix-blend-mode: screen;"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';

withDefaults(
  defineProps<{
    groomName: string;
    brideName: string;
    guestName: string;
    fontHeading?: string;
    fontBody?: string;
    coverImage?: string;
  }>(),
  {
    coverImage:
      'https://media.mengundanganda.com/evergreen/cover%20section/dewirandi_0009b342-21cc-4132-b79c-d7d041a71b4f.webp',
  }
);

const emit = defineEmits<{
  (e: 'open'): void;
}>();

const coverRoot = ref<HTMLElement | null>(null);
const bgImg = ref<HTMLElement | null>(null);
const cardContainer = ref<HTMLElement | null>(null);
const whiteBloom = ref<HTMLElement | null>(null);
const bukaBtn = ref<HTMLElement | null>(null);
const leafRefs = ref<HTMLElement[]>([]);
const isOpening = ref(false);

const setLeafRef = (el: any) => {
  if (el && !leafRefs.value.includes(el)) {
    leafRefs.value.push(el);
  }
};

const bukaAmplop = () => {
  if (isOpening.value) return;
  isOpening.value = true;

  const tl = gsap.timeline();

  // Step 0: Button press feedback
  tl.to(bukaBtn.value, {
    scale: 0.92,
    opacity: 0,
    duration: 0.2,
    ease: 'power2.in',
  });

  // Step 1: Fade out text card container & leaf accents (clean image remains)
  tl.to([cardContainer.value, ...leafRefs.value].filter(Boolean), {
    opacity: 0,
    scale: 0.97,
    y: -6,
    duration: 0.6,
    ease: 'power2.inOut',
  }, "+=0.05");

  // Step 2: Gentle, slow zoom-in on clean background photo + mount Hero standby
  tl.to(bgImg.value, {
    scale: 1.07,
    duration: 1.4,
    ease: 'power2.out',
    onStart: () => {
      emit('open');
    }
  }, "+=0.05");

  // Step 3: Low-opacity soft light flash flare (image remains completely visible!)
  tl.to(whiteBloom.value, {
    opacity: 0.35,
    duration: 0.5,
    ease: 'power2.out',
  }, "-=0.6");

  // Step 4: Soft flash dissolves & cover overlay crossfades directly into Hero section
  tl.to(whiteBloom.value, {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.in',
  }, "+=0.05");

  tl.to(coverRoot.value, {
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
  }, "-=0.6");
};
</script>
