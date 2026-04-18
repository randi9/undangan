<template>
  <div
    :class="[
      'fixed inset-0 z-[100] flex flex-col items-center justify-between w-full h-[100dvh] bg-[var(--theme-bg)] transition-opacity duration-[400ms] ease-out',
      isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100',
    ]"
    :style="{ backgroundColor: 'var(--theme-bg)', fontFamily: fontBody }"
  >
    <!-- Background Layer -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden" style="background-color: rgba(168, 208, 230, 0.85);">
      <img src="https://media.mengundanganda.com/elegant_blue/cover%20section/randidewi_cda7d85b-0fae-41a2-9444-706364d76871.webp" alt="Corner Decoration" class="absolute top-[-20px] right-[-20px] w-[65vw] max-w-[350px] opacity-60" style="object-fit: contain; z-index: 1;" />
      <img src="https://media.mengundanganda.com/elegant_blue/cover%20section/randidewi_cda7d85b-0fae-41a2-9444-706364d76871.webp" alt="Corner Decoration" class="absolute bottom-[-20px] left-[-20px] w-[65vw] max-w-[350px] opacity-60" style="object-fit: contain; transform: scaleX(-1) scaleY(-1); z-index: 1;" />
    </div>

    <!-- TOP CONTENT: Outside the Envelope -->
    <div ref="topContentRef" style="width: 100%; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding-top: 10vh; padding-bottom: 28vh; padding-left: 24px; padding-right: 24px; position: relative; z-index: 10; transition: opacity 0.4s;">
      
      <!-- Groom & Bride Header (Atas) -->
      <h1 :style="{ fontFamily: fontHeading, fontSize: 'clamp(2.5rem, 10vw, 3.5rem)', lineHeight: '1', color: 'var(--theme-text)', textAlign: 'center', margin: 0, textShadow: '0 2px 4px rgba(255,255,255,0.8)' }">
        {{ groomName }}
        <span style="display: block; font-size: clamp(1.5rem, 6vw, 2.2rem); color: #7095c5; margin-top: 2px; margin-bottom: 2px;">&amp;</span>
        {{ brideName }}
      </h1>
      
      <!-- Bingkai Image (Tengah) -->
      <div v-if="coverImage" style="position: relative; width: 95vw; max-width: 420px; aspect-ratio: 3/4; display: flex; align-items: center; justify-content: center; margin-top: auto; margin-bottom: auto; z-index: 10; transform: translateY(-4vh);">
        <img src="https://media.mengundanganda.com/elegant_blue/cover%20section/randidewi_80f63d0d-3082-4c51-8814-938db0dddf1d.webp" alt="Frame" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 2;" />
        <img :src="coverImage" alt="Cover" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 62%; height: 65%; object-fit: cover; border-radius: 50% / 50%; z-index: 1;" />
      </div>

      <!-- Kepada Yth (Di Atas Amplop) -->
      <div style="text-align: center; z-index: 10; background-color: rgba(255, 255, 255, 0.4); padding: 8px 24px; border-radius: 12px; backdrop-filter: blur(4px);">
        <p style="font-size: 10px; letter-spacing: 0.15em; color: var(--theme-text-light); text-transform: uppercase; margin: 0 0 6px 0; font-weight: 500;">Kepada Yth.</p>
        <h3 style="font-size: 16px; font-weight: 700; color: var(--theme-text); max-width: 240px; margin: 0 auto; line-height: 1.4; text-shadow: 0 1px 3px rgba(255,255,255,0.8);">{{ guestName || 'Tamu Undangan' }}</h3>
      </div>
    </div>

    <!-- 3D ENVELOPE BOTTOM SECTION -->
    <div class="absolute bottom-[12vh] left-1/2 -translate-x-1/2 z-20 flex justify-center" :class="{ 'pointer-events-none': isOpening }">

      <!-- Envelope Wrapper (Miniature, elegant size) -->
      <div class="relative w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px]" style="perspective: 1200px; aspect-ratio: 34/22;">
        
        <!-- 1. BACK BODY -->
        <svg ref="envelopeBackRef" class="absolute inset-0 w-full h-full text-[#7095c5] drop-shadow-xl z-[1]" viewBox="0 0 340 220" fill="currentColor" preserveAspectRatio="none">
          <path d="M0 20 L340 20 L340 220 L0 220 Z" class="opacity-90" />
        </svg>

        <!-- 2. THE PAPER (Slides up and scales!) portrait shape -->
        <div class="absolute inset-0 z-[2] flex justify-center items-end" style="padding-bottom: 5%;">
          <div
            ref="paperRef"
            class="relative w-[90%] h-[90%] bg-white overflow-hidden"
            style="will-change: transform; transform-origin: center center;"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-[#7095c5]/5 to-transparent z-[1] w-full h-full mix-blend-multiply"></div>
            <!-- Decorator for border and shadow that fades out cleanly on zoom -->
            <div ref="paperDecorRef" class="absolute inset-0 z-[2] rounded-[2px] shadow-[0_-2px_6px_rgba(0,0,0,0.05)] border border-[#7095c5]/20"></div>
          </div>
        </div>

        <!-- 3. FRONT POCKET -->
        <svg ref="envelopeFrontRef" class="absolute inset-0 w-full h-full text-[#7095c5] z-[3] pointer-events-none drop-shadow-md" viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 20 L170 130 L0 220 Z" fill="currentColor" class="opacity-75"/>
          <path d="M340 20 L170 130 L340 220 Z" fill="currentColor" class="opacity-75"/>
          <path d="M0 220 L170 130 L340 220 Z" fill="currentColor" class="opacity-90"/>
        </svg>

        <!-- 4. TOP FLAP -->
        <div ref="flapWrapperRef" class="absolute left-0 w-full z-[4] origin-top text-[#7095c5]" style="perspective: 1000px; top: 9%; height: 59%;">
          <svg ref="flapRef" class="w-full h-full origin-top" viewBox="0 0 340 130" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0 L170 130 L340 0 Z" fill="currentColor" class="drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]"/>
            <path d="M0 0 L170 130 L340 0" stroke="var(--theme-bg)" stroke-opacity="0.25" stroke-width="1.5"/>
          </svg>
        </div>

        <!-- 5. WAX SEAL / BUKA BUTTON -->
        <button
          ref="sealRef"
          @click="bukaAmplop"
          class="pulse-button absolute left-1/2 z-[5] w-[60px] sm:w-[70px] h-[60px] sm:h-[70px] flex items-center justify-center cursor-pointer shadow-none border-none bg-transparent"
          style="top: 66%; transform: translate(-50%, -50%); outline: none; -webkit-tap-highlight-color: transparent;"
        >
          <img src="https://media.mengundanganda.com/elegant_blue/cover%20section/randidewi_bf662783-be26-45f3-8e96-7d36cac1c79f.webp" alt="Stamp" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.25));" />
        </button>
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';

const props = defineProps<{
  groomName: string;
  brideName: string;
  guestName: string;
  isClosing: boolean;
  fontHeading?: string;
  fontBody?: string;
  coverImage: string;
}>();

const emit = defineEmits<{
  (e: 'open'): void;
}>();

// Refs
const topContentRef = ref<HTMLElement | null>(null);
const envelopeBackRef = ref<SVGElement | null>(null);
const envelopeFrontRef = ref<SVGElement | null>(null);
const flapWrapperRef = ref<HTMLElement | null>(null);
const flapRef = ref<SVGElement | null>(null);
const paperRef = ref<HTMLElement | null>(null);
const paperDecorRef = ref<HTMLElement | null>(null);
const sealRef = ref<HTMLElement | null>(null);

const isOpening = ref(false);

const bukaAmplop = () => {
  if (isOpening.value) return;
  isOpening.value = true;

  const tl = gsap.timeline();

  // 2. Fade out the Wax Seal without sliding/scaling
  tl.to(sealRef.value, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.inOut"
  }, "+=0.1"); // Small pause after text fades out

  // 3. Open the Flap (rotateX to 180deg)
  tl.to(flapRef.value, {
    rotateX: 180,
    duration: 1.0,
    ease: "power2.inOut"
  }, "-=0.1");

  // Drop the flap's z-index so the paper can slide out ABOVE it
  tl.set(flapWrapperRef.value, { zIndex: 1 });

  // 4. Slide the blank paper out of the pocket (Upwards)
  tl.to(paperRef.value, {
    y: -180,
    duration: 1.2,
    ease: "power2.out"
  }, "-=0.2");

  // 5. Massive Scale on Paper dynamically based on its actual tiny size
  const paperBounds = paperRef.value!.getBoundingClientRect();
  const scaleFactorX = window.innerWidth / paperBounds.width;
  const scaleFactorY = window.innerHeight / paperBounds.height;
  const maxScale = Math.max(scaleFactorX, scaleFactorY) * 3.5; // Bumped to 3.5 safely engulf every corner

  // Envelope and text content fade out while paper is starting to zoom
  tl.to([topContentRef.value, envelopeBackRef.value, envelopeFrontRef.value, flapWrapperRef.value], {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut"
  }, "+=0.2");

  // Keep the decorator (shadow/border) visible longer, fading it over the zoom 
  // so it doesn't suddenly disappear while still small.
  tl.to(paperDecorRef.value, {
    opacity: 0,
    duration: 1.0,
    ease: "power2.inOut"
  }, "<");

  tl.to(paperRef.value, {
    scale: maxScale,
    duration: 1.2,
    ease: "expo.in" // 'expo.in' gives the best realistic 'fly into camera' illusion
  }, "<");

  // Emit 'open' later so the scale reaches much further towards full screen
  tl.call(() => {
    emit('open');
    isOpening.value = false;
  }, undefined, "-=0.2");
};
</script>

<style scoped>
.pulse-button {
  animation: pulseStamp 1.2s infinite ease-in-out alternate;
}
@keyframes pulseStamp {
  0% { transform: translate(-50%, -50%) scale(0.95); }
  100% { transform: translate(-50%, -50%) scale(1.05); }
}
</style>