<template>
  <div
    :class="[
      'fixed inset-0 z-[100] flex flex-col items-center justify-between w-full h-[100dvh] transition-opacity duration-[400ms] ease-out',
      isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100',
    ]"
    :style="{ backgroundColor: 'var(--theme-bg)', fontFamily: fontBody }"
  >
    <!-- Background: Gold Damask Pattern -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="absolute inset-0" style="background-color: var(--theme-bg);"></div>
      <svg class="absolute inset-0 w-full h-full opacity-[0.08]">
        <defs>
          <pattern id="elegant-cover-damask" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <!-- Classic ornamental motif -->
            <path d="M60 10 C65 20, 80 25, 80 40 C80 55, 65 60, 60 70 C55 60, 40 55, 40 40 C40 25, 55 20, 60 10Z" fill="var(--theme-secondary)" opacity="0.6"/>
            <path d="M60 70 C63 75, 70 78, 70 85 C70 92, 63 95, 60 100 C57 95, 50 92, 50 85 C50 78, 57 75, 60 70Z" fill="var(--theme-secondary)" opacity="0.4"/>
            <circle cx="60" cy="40" r="3" fill="var(--theme-secondary)" opacity="0.5"/>
            <!-- Corner pieces -->
            <path d="M0 0 C10 5, 15 15, 10 25 C5 15, 0 10, 0 0Z" fill="var(--theme-secondary)" opacity="0.3"/>
            <path d="M120 0 C110 5, 105 15, 110 25 C115 15, 120 10, 120 0Z" fill="var(--theme-secondary)" opacity="0.3"/>
            <path d="M0 120 C10 115, 15 105, 10 95 C5 105, 0 110, 0 120Z" fill="var(--theme-secondary)" opacity="0.3"/>
            <path d="M120 120 C110 115, 105 105, 110 95 C115 105, 120 110, 120 120Z" fill="var(--theme-secondary)" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#elegant-cover-damask)" />
      </svg>
    </div>

    <!-- TOP CONTENT -->
    <div ref="topContentRef" style="width: 100%; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding-top: 10vh; padding-bottom: 28vh; padding-left: 24px; padding-right: 24px; position: relative; z-index: 10;">
      
      <!-- Groom & Bride Header -->
      <div style="text-align: center;">
        <p style="font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; margin: 0 0 12px 0; font-weight: 500;" :style="{ color: 'var(--theme-text-light)' }">The Wedding Of</p>
        <h1 :style="{ fontFamily: fontHeading, fontSize: 'clamp(2.5rem, 10vw, 3.5rem)', lineHeight: '1', color: 'var(--theme-primary)', textAlign: 'center', margin: 0 }">
          {{ groomName }}
          <span style="display: block; margin-top: 4px; margin-bottom: 4px;" :style="{ fontSize: 'clamp(1.5rem, 6vw, 2.2rem)', color: 'var(--theme-secondary)' }">&amp;</span>
          {{ brideName }}
        </h1>
      </div>
      
      <!-- Cover Photo in Gold Frame -->
      <div v-if="coverImage" style="position: relative; width: 220px; height: 220px; display: flex; align-items: center; justify-content: center; margin-top: auto; margin-bottom: auto; z-index: 10;">
        <!-- Gold frame ring (SVG) -->
        <svg viewBox="0 0 220 220" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2;">
          <defs>
            <linearGradient id="gold-frame-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#e5c875"/>
              <stop offset="50%" style="stop-color:#d4af37"/>
              <stop offset="100%" style="stop-color:#c9a96e"/>
            </linearGradient>
          </defs>
          <circle cx="110" cy="110" r="104" fill="none" stroke="url(#gold-frame-grad)" stroke-width="3"/>
          <circle cx="110" cy="110" r="98" fill="none" stroke="url(#gold-frame-grad)" stroke-width="1" opacity="0.5"/>
          <!-- Corner ornaments on the circle -->
          <circle cx="110" cy="6" r="4" fill="var(--theme-secondary)"/>
          <circle cx="110" cy="214" r="4" fill="var(--theme-secondary)"/>
          <circle cx="6" cy="110" r="4" fill="var(--theme-secondary)"/>
          <circle cx="214" cy="110" r="4" fill="var(--theme-secondary)"/>
        </svg>
        <img :src="coverImage" alt="Cover" style="width: 70%; height: 70%; object-fit: cover; border-radius: 50%; z-index: 1;" />
      </div>

      <!-- Kepada Yth. -->
      <div style="text-align: center; z-index: 10; padding: 10px 28px; border-radius: 12px;" :style="{ backgroundColor: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)' }">
        <p style="font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 6px 0; font-weight: 500;" :style="{ color: 'var(--theme-text-light)' }">Kepada Yth.</p>
        <h3 style="font-size: 16px; font-weight: 700; max-width: 240px; margin: 0 auto; line-height: 1.4;" :style="{ color: 'var(--theme-text)' }">{{ guestName || 'Tamu Undangan' }}</h3>
      </div>
    </div>

    <!-- 3D ENVELOPE BOTTOM SECTION -->
    <div class="absolute bottom-[12vh] left-1/2 -translate-x-1/2 z-20 flex justify-center" :class="{ 'pointer-events-none': isOpening }">

      <!-- Envelope Wrapper -->
      <div class="relative w-[140px] sm:w-[160px] md:w-[180px]" style="perspective: 1200px; aspect-ratio: 34/22;">
        
        <!-- 1. BACK BODY -->
        <svg ref="envelopeBackRef" class="absolute inset-0 w-full h-full drop-shadow-xl z-[1]" viewBox="0 0 340 220" preserveAspectRatio="none">
          <defs>
            <linearGradient id="env-back-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#c9a96e"/>
              <stop offset="100%" style="stop-color:#8b6f4e"/>
            </linearGradient>
          </defs>
          <path d="M0 20 L340 20 L340 220 L0 220 Z" fill="url(#env-back-gold)" opacity="0.9" />
        </svg>

        <!-- 2. THE PAPER -->
        <div class="absolute inset-0 z-[2] flex justify-center items-end" style="padding-bottom: 5%;">
          <div
            ref="paperRef"
            class="relative w-[90%] h-[90%] overflow-hidden"
            :style="{ backgroundColor: 'var(--theme-bg)', willChange: 'transform', transformOrigin: 'center center' }"
          >
            <div class="absolute inset-0 z-[1] w-full h-full" style="background: linear-gradient(to bottom, rgba(201,169,110,0.08), transparent);"></div>
            <div ref="paperDecorRef" class="absolute inset-0 z-[2] rounded-[2px] shadow-[0_-2px_6px_rgba(0,0,0,0.05)]" style="border: 1px solid rgba(201,169,110,0.2);"></div>
          </div>
        </div>

        <!-- 3. FRONT POCKET -->
        <svg ref="envelopeFrontRef" class="absolute inset-0 w-full h-full z-[3] pointer-events-none drop-shadow-md" viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="env-front-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#d4af37"/>
              <stop offset="100%" style="stop-color:#c9a96e"/>
            </linearGradient>
          </defs>
          <path d="M0 20 L170 130 L0 220 Z" fill="url(#env-front-gold)" opacity="0.75"/>
          <path d="M340 20 L170 130 L340 220 Z" fill="url(#env-front-gold)" opacity="0.75"/>
          <path d="M0 220 L170 130 L340 220 Z" fill="url(#env-front-gold)" opacity="0.90"/>
        </svg>

        <!-- 4. TOP FLAP -->
        <div ref="flapWrapperRef" class="absolute left-0 w-full z-[4] origin-top" style="perspective: 1000px; top: 9%; height: 59%;">
          <svg ref="flapRef" class="w-full h-full origin-top" viewBox="0 0 340 130" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="env-flap-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#c9a96e"/>
                <stop offset="100%" style="stop-color:#8b6f4e"/>
              </linearGradient>
            </defs>
            <path d="M0 0 L170 130 L340 0 Z" fill="url(#env-flap-gold)" class="drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]"/>
            <path d="M0 0 L170 130 L340 0" stroke="var(--theme-bg)" stroke-opacity="0.25" stroke-width="1.5"/>
          </svg>
        </div>

        <!-- 5. WAX SEAL / BUKA BUTTON (Gold) -->
        <button
          ref="sealRef"
          @click="bukaAmplop"
          class="absolute left-1/2 z-[5] w-12 sm:w-14 h-12 sm:h-14 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-lg"
          style="top: 66%; transform: translate(-50%, -50%); background: linear-gradient(135deg, #d4af37, #c9a96e); border: 3px solid rgba(250,248,244,0.5);"
        >
          <span ref="sealTextRef" class="text-[10px] sm:text-xs font-bold tracking-widest mt-0.5 transition-opacity pointer-events-none" :style="{ color: 'var(--theme-bg)' }">BUKA</span>
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
const sealTextRef = ref<HTMLElement | null>(null);

const isOpening = ref(false);

const bukaAmplop = () => {
  if (isOpening.value) return;
  isOpening.value = true;

  const tl = gsap.timeline();

  // 1. Text "BUKA" fades out
  tl.to(sealTextRef.value, { opacity: 0, duration: 0.3 });

  // 2. Fade out the Wax Seal
  tl.to(sealRef.value, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.inOut"
  }, "+=0.1");

  // 3. Open the Flap (rotateX to 180deg)
  tl.to(flapRef.value, {
    rotateX: 180,
    duration: 1.0,
    ease: "power2.inOut"
  }, "-=0.1");

  // Drop the flap's z-index
  tl.set(flapWrapperRef.value, { zIndex: 1 });

  // 4. Slide the paper out (Upwards)
  tl.to(paperRef.value, {
    y: -180,
    duration: 1.2,
    ease: "power2.out"
  }, "-=0.2");

  // 5. Calculate scale factor
  const paperBounds = paperRef.value!.getBoundingClientRect();
  const scaleFactorX = window.innerWidth / paperBounds.width;
  const scaleFactorY = window.innerHeight / paperBounds.height;
  const maxScale = Math.max(scaleFactorX, scaleFactorY) * 3.5;

  // 6. Envelope and text fade out
  tl.to([topContentRef.value, envelopeBackRef.value, envelopeFrontRef.value, flapWrapperRef.value], {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut"
  }, "+=0.2");

  // Paper decorator fades
  tl.to(paperDecorRef.value, {
    opacity: 0,
    duration: 1.0,
    ease: "power2.inOut"
  }, "<");

  // 7. Paper zooms to fill screen
  tl.to(paperRef.value, {
    scale: maxScale,
    duration: 1.2,
    ease: "expo.in"
  }, "<");

  // 8. Emit open
  tl.call(() => {
    emit('open');
    isOpening.value = false;
  }, undefined, "-=0.2");
};
</script>