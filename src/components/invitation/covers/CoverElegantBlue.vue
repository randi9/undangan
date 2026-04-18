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
      <!-- Linen Texture -->
      <div class="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75 0.5%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E'); filter: contrast(150%) brightness(90%);"></div>
      <!-- Top Right (Horizontal Flip) -->
      <img src="https://media.mengundanganda.com/elegant_blue/cover%20section/randidewi_b6cb329b-58cf-4a5c-b9ae-143545758649.webp" alt="Corner Decoration" class="absolute top-[-5px] right-[-5px] w-[55vw] max-w-[280px] opacity-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]" style="object-fit: contain; transform: scaleX(-1); z-index: 1;" />
      <!-- Bottom Left (Vertical Flip) -->
      <img src="https://media.mengundanganda.com/elegant_blue/cover%20section/randidewi_b6cb329b-58cf-4a5c-b9ae-143545758649.webp" alt="Corner Decoration" class="absolute bottom-[-5px] left-[-5px] w-[55vw] max-w-[280px] opacity-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]" style="object-fit: contain; transform: scaleY(-1); z-index: 1;" />
    </div>

    <!-- TOP CONTENT: Outside the Envelope -->
    <div ref="topContentRef" style="width: 100%; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding-top: 10vh; padding-bottom: 20vh; padding-left: 24px; padding-right: 24px; position: relative; z-index: 10; transition: opacity 0.4s;">
      
      <!-- Groom & Bride Header (Atas) -->
      <h1 :style="{ fontFamily: fontHeading }" style="font-size: clamp(3.5rem, 14vw, 5rem); font-weight: 500; line-height: 0.9; color: #2b3e51; text-align: center; margin: 0; text-shadow: 0 0 1px #2b3e51, 0 2px 4px rgba(255,255,255,0.8); transform: translateY(2vh);">
        {{ groomName }}
        <span style="display: block; font-size: clamp(2.5rem, 10vw, 3.5rem); color: #a67c21; margin-top: 2px; margin-bottom: 2px;">&amp;</span>
        {{ brideName }}
      </h1>
      
      <!-- Bingkai Image (Tengah) -->
      <div v-if="coverImage" style="position: relative; width: 95vw; max-width: 420px; aspect-ratio: 3/4; display: flex; align-items: center; justify-content: center; margin-top: auto; margin-bottom: auto; z-index: 10; transform: translateY(-4vh);">
        <!-- Frame Drop Shadow -->
        <img src="https://media.mengundanganda.com/elegant_blue/cover%20section/randidewi_80f63d0d-3082-4c51-8814-938db0dddf1d.webp" alt="Frame" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 2; pointer-events: none; filter: drop-shadow(0 12px 24px rgba(0,0,0,0.35));" />
        <!-- Layer Inner Shadow di Atas Image -->
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 62%; height: 65%; border-radius: 50% / 50%; box-shadow: inset 0 15px 30px rgba(0,0,0,0.5), inset 0 -5px 15px rgba(0,0,0,0.3); z-index: 1; pointer-events: none;"></div>
        <!-- Cover Photo -->
        <img :src="coverImage" alt="Cover" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 62%; height: 65%; object-fit: cover; border-radius: 50% / 50%; z-index: 0;" />
      </div>

      <!-- Kepada Yth (Di Atas Amplop) -->
      <div style="text-align: center; width: 100%; margin-top: auto; z-index: 10; transform: translateY(-10vh);">
        <p style="font-size: 10px; letter-spacing: 0.15em; color: #3b5068; text-transform: uppercase; margin: 0 0 6px 0; font-weight: 600;">Kepada Yth.</p>
        <h3 style="font-size: 16px; font-weight: 700; color: #2b3e51; max-width: 240px; margin: 0 auto; line-height: 1.4; text-shadow: 0 1px 3px rgba(255,255,255,0.8);">{{ guestName || 'Tamu Undangan' }}</h3>
      </div>
    </div>

    <!-- 3D ENVELOPE BOTTOM SECTION -->
    <div class="absolute bottom-[8vh] left-1/2 -translate-x-1/2 z-20 flex justify-center" :class="{ 'pointer-events-none': isOpening }">

      <!-- Envelope Wrapper (Miniature, elegant size) -->
      <div class="relative w-[160px] sm:w-[180px] md:w-[220px] lg:w-[260px]" style="perspective: 1200px; aspect-ratio: 34/22;">
        
        <!-- 1. BACK BODY (z-index: 0) -->
        <svg ref="envelopeBackRef" class="absolute inset-0 w-full h-full text-[#a8d0e6] drop-shadow-xl z-[0]" viewBox="0 0 340 220" fill="currentColor" preserveAspectRatio="none">
          <path d="M0 20 L340 20 L340 220 L0 220 Z" class="brightness-[0.80]" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
        </svg>

        <!-- 2. THE PAPER (z-index: 2) -->
        <div class="absolute inset-0 z-[2] flex justify-center items-end" style="padding-bottom: 5%;">
          <img
            ref="paperRef"
            src="https://media.mengundanganda.com/elegant_blue/cover%20section/randidewi_cbda27d8-7997-458d-b64b-1443f9ea6815.webp"
            alt="Invitation Card"
            style="width: 100%; max-width: none; height: auto; transform-origin: center center; opacity: 0;"
          />
        </div>

        <!-- 3. FRONT POCKET (z-index: 3) -->
        <svg ref="envelopeFrontRef" class="absolute inset-0 w-full h-full text-[#a8d0e6] z-[3] pointer-events-none drop-shadow-[0_20px_40px_rgba(30,60,90,0.15)]" viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 20 L170 130 L0 220 Z" fill="currentColor" stroke="currentColor" stroke-width="4" stroke-linejoin="round" class="brightness-[0.92]"/>
          <path d="M340 20 L170 130 L340 220 Z" fill="currentColor" stroke="currentColor" stroke-width="4" stroke-linejoin="round" class="brightness-[0.92]"/>
          <path d="M0 220 L170 130 L340 220 Z" fill="currentColor" stroke="currentColor" stroke-width="4" stroke-linejoin="round" class="brightness-100 drop-shadow-sm"/>
        </svg>

        <!-- 4. TOP FLAP (z-index: 1) -->
        <div ref="flapWrapperRef" class="absolute left-0 w-full z-[1] origin-top text-[#a8d0e6]" style="perspective: 1000px; top: 9%; height: 59%;">
          <svg ref="flapRef" class="w-full h-full origin-top" viewBox="0 0 340 130" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0 L170 130 L340 0 Z" fill="currentColor" stroke="currentColor" stroke-width="4" stroke-linejoin="round" class="brightness-[1.05] drop-shadow-[0_6px_10px_rgba(20,40,60,0.3)]"/>
            <path d="M0 0 L170 130 L340 0" stroke="var(--theme-bg)" stroke-opacity="0.25" stroke-width="1.5"/>
          </svg>
        </div>

        <!-- 5. WAX SEAL / BUKA BUTTON -->
        <button
          ref="sealRef"
          @click="bukaAmplop"
          class="pulse-button absolute left-1/2 z-[5] w-[40px] sm:w-[45px] h-[40px] sm:h-[45px] flex items-center justify-center cursor-pointer shadow-none border-none bg-transparent"
          style="top: 64%; transform: translate(-50%, -50%); outline: none; -webkit-tap-highlight-color: transparent;"
        >
          <img src="https://media.mengundanganda.com/elegant_blue/cover%20section/randidewi_bf662783-be26-45f3-8e96-7d36cac1c79f.webp" alt="Stamp" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.25));" />
        </button>
        
      </div>

      <!-- Action Instruction -->
      <div class="animate-pulse" style="position: absolute; bottom: -32px; background-color: rgba(255, 255, 255, 0.7); padding: 4px 14px; border-radius: 12px; backdrop-filter: blur(4px); pointer-events: none;">
        <p style="font-size: 10px; font-family: 'Inter', sans-serif; letter-spacing: 0.25em; color: #3b5068; text-transform: uppercase; font-weight: 500; white-space: nowrap; margin: 0;">
          Klik Untuk Membuka
        </p>
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

  // 4. Slide the blank paper out of the pocket (Upwards) and Fade it In
  tl.to(paperRef.value, {
    y: -180,
    scale: 1.8,
    opacity: 1,
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

  tl.to(paperRef.value, {
    scale: maxScale,
    y: -350, // Pull it further upwards while zooming!
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