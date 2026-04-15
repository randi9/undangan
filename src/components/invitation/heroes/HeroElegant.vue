<template>
  <section ref="heroSection" class="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden" :style="{ backgroundColor: 'var(--theme-bg)' }">
    <!-- Background wrapper (extends 200vh for seamless quote transition) -->
    <div class="absolute top-0 left-0 w-full h-[200vh] z-0 overflow-hidden pointer-events-none">
      <!-- Gold tint overlay -->
      <div class="absolute inset-0 z-10 w-full h-full" style="background: linear-gradient(180deg, rgba(201,169,110,0.06) 0%, transparent 60%); mix-blend-mode: multiply;"></div>
      
      <!-- SVG Damask Gold Pattern -->
      <svg class="absolute inset-0 w-full h-full opacity-100">
        <defs>
          <pattern id="elegant-hero-damask" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
            <!-- Central ornament -->
            <path d="M80 20 C88 32, 105 38, 105 55 C105 72, 88 80, 80 92 C72 80, 55 72, 55 55 C55 38, 72 32, 80 20Z" fill="var(--theme-secondary)" opacity="0.06"/>
            <path d="M80 92 C84 98, 92 102, 92 110 C92 118, 84 122, 80 128 C76 122, 68 118, 68 110 C68 102, 76 98, 80 92Z" fill="var(--theme-secondary)" opacity="0.04"/>
            <circle cx="80" cy="55" r="2.5" fill="var(--theme-secondary)" opacity="0.08"/>
            <!-- Corner pieces for seamless tiling -->
            <path d="M0 0 C8 4, 12 12, 8 20 C4 12, 0 8, 0 0Z" fill="var(--theme-secondary)" opacity="0.04"/>
            <path d="M160 0 C152 4, 148 12, 152 20 C156 12, 160 8, 160 0Z" fill="var(--theme-secondary)" opacity="0.04"/>
            <path d="M0 160 C8 156, 12 148, 8 140 C4 148, 0 152, 0 160Z" fill="var(--theme-secondary)" opacity="0.04"/>
            <path d="M160 160 C152 156, 148 148, 152 140 C156 148, 160 152, 160 160Z" fill="var(--theme-secondary)" opacity="0.04"/>
            <!-- Connecting lines -->
            <line x1="30" y1="0" x2="30" y2="20" stroke="var(--theme-secondary)" stroke-width="0.5" opacity="0.04"/>
            <line x1="130" y1="0" x2="130" y2="20" stroke="var(--theme-secondary)" stroke-width="0.5" opacity="0.04"/>
            <line x1="30" y1="140" x2="30" y2="160" stroke="var(--theme-secondary)" stroke-width="0.5" opacity="0.04"/>
            <line x1="130" y1="140" x2="130" y2="160" stroke="var(--theme-secondary)" stroke-width="0.5" opacity="0.04"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#elegant-hero-damask)" />
      </svg>
    </div>

    <!-- INTRO TEXT (reveals then fades) -->
    <div ref="introText" class="absolute inset-0 z-[5] flex items-center justify-center px-6 pointer-events-none pb-[15vh] opacity-0">
      <h2 class="tracking-[0.25em] font-semibold text-center uppercase" :style="{ color: 'var(--theme-text-light)', fontFamily: themeConfig?.fontHeading || 'inherit', fontSize: 'clamp(0.8rem, 2vw, 1rem)' }">
        <div class="block">THE WEDDING OF</div>
        <div class="block mt-3" :style="{ color: 'var(--theme-secondary)' }">— ♥ —</div>
      </h2>
    </div>

    <!-- OVAL PASSEPARTOUT MASK -->
    <div ref="ovalMask" class="hero-oval absolute top-6 bottom-6 left-6 right-6 md:top-8 md:bottom-8 md:left-8 md:right-8 z-[14] pointer-events-none rounded-[1000px] opacity-0" :style="{ boxShadow: `0 0 0 200vmax ${themeConfig?.bg || '#faf8f4'}` }"></div>

    <!-- Gold corner ornaments -->
    <div ref="ornamentTL" class="absolute top-6 left-6 w-16 h-16 opacity-0 z-20 pointer-events-none">
      <svg viewBox="0 0 60 60" class="w-full h-full">
        <path d="M2 2 L2 50" stroke="var(--theme-secondary)" stroke-width="1.5" fill="none" opacity="0.6"/>
        <path d="M2 2 L50 2" stroke="var(--theme-secondary)" stroke-width="1.5" fill="none" opacity="0.6"/>
        <circle cx="2" cy="2" r="2" fill="var(--theme-secondary)" opacity="0.4"/>
        <path d="M8 2 Q2 2, 2 8" stroke="var(--theme-secondary)" stroke-width="0.5" fill="none" opacity="0.3"/>
      </svg>
    </div>
    <div ref="ornamentTR" class="absolute top-6 right-6 w-16 h-16 opacity-0 z-20 pointer-events-none">
      <svg viewBox="0 0 60 60" class="w-full h-full">
        <path d="M58 2 L58 50" stroke="var(--theme-secondary)" stroke-width="1.5" fill="none" opacity="0.6"/>
        <path d="M58 2 L10 2" stroke="var(--theme-secondary)" stroke-width="1.5" fill="none" opacity="0.6"/>
        <circle cx="58" cy="2" r="2" fill="var(--theme-secondary)" opacity="0.4"/>
      </svg>
    </div>
    <div ref="ornamentBL" class="absolute bottom-6 left-6 w-16 h-16 opacity-0 z-20 pointer-events-none">
      <svg viewBox="0 0 60 60" class="w-full h-full">
        <path d="M2 58 L2 10" stroke="var(--theme-secondary)" stroke-width="1.5" fill="none" opacity="0.6"/>
        <path d="M2 58 L50 58" stroke="var(--theme-secondary)" stroke-width="1.5" fill="none" opacity="0.6"/>
        <circle cx="2" cy="58" r="2" fill="var(--theme-secondary)" opacity="0.4"/>
      </svg>
    </div>
    <div ref="ornamentBR" class="absolute bottom-6 right-6 w-16 h-16 opacity-0 z-20 pointer-events-none">
      <svg viewBox="0 0 60 60" class="w-full h-full">
        <path d="M58 58 L58 10" stroke="var(--theme-secondary)" stroke-width="1.5" fill="none" opacity="0.6"/>
        <path d="M58 58 L10 58" stroke="var(--theme-secondary)" stroke-width="1.5" fill="none" opacity="0.6"/>
        <circle cx="58" cy="58" r="2" fill="var(--theme-secondary)" opacity="0.4"/>
      </svg>
    </div>

    <!-- Floating Gold Particles Container -->
    <div ref="particlesContainer" class="absolute inset-0 z-[12] pointer-events-none overflow-hidden"></div>

    <!-- Content Slot (names, date — from parent) -->
    <div ref="heroContent" class="relative z-20 w-full max-w-2xl mx-auto py-20 flex justify-center text-[var(--theme-text)] opacity-0 translate-y-8">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  overlayGradient: string;
  themeConfig?: ThemeConfig;
}>();

const heroSection = ref<HTMLElement | null>(null);
const introText = ref<HTMLElement | null>(null);
const ovalMask = ref<HTMLElement | null>(null);
const heroContent = ref<HTMLElement | null>(null);
const particlesContainer = ref<HTMLElement | null>(null);
const ornamentTL = ref<HTMLElement | null>(null);
const ornamentTR = ref<HTMLElement | null>(null);
const ornamentBL = ref<HTMLElement | null>(null);
const ornamentBR = ref<HTMLElement | null>(null);

let activeParticles: gsap.core.Tween[] = [];
let spawnTimer: gsap.core.Tween | null = null;
let entranceTimeline: gsap.core.Timeline | null = null;

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Gold sparkle particle system
function spawnSparkle() {
  const container = particlesContainer.value;
  if (!container) return;

  const el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.pointerEvents = 'none';
  el.style.willChange = 'transform, opacity';
  
  const size = randomRange(2, 5);
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.borderRadius = '50%';
  el.style.background = `radial-gradient(circle, rgba(201,169,110,0.8), rgba(201,169,110,0))`;
  
  const startX = randomRange(5, 95);
  el.style.left = `${startX}%`;
  el.style.top = `${randomRange(10, 90)}%`;
  el.style.opacity = '0';

  container.appendChild(el);

  const masterTween = gsap.to(el, {
    opacity: randomRange(0.3, 0.7),
    duration: randomRange(1.5, 3),
    ease: 'sine.inOut',
    yoyo: true,
    repeat: 1,
    onComplete: () => {
      gsap.killTweensOf(el);
      el.remove();
      const idx = activeParticles.indexOf(masterTween);
      if (idx > -1) activeParticles.splice(idx, 1);
    },
  });

  // Gentle float upward
  gsap.to(el, {
    y: randomRange(-30, -80),
    duration: randomRange(4, 8),
    ease: 'none',
  });

  activeParticles.push(masterTween);
}

function startSparkleLoop() {
  spawnSparkle();
  spawnTimer = gsap.delayedCall(randomRange(0.8, 2.0), startSparkleLoop);
}

onMounted(() => {
  if (!heroSection.value) return;

  const ornaments = [ornamentTL.value, ornamentTR.value, ornamentBL.value, ornamentBR.value];

  // === ENTRANCE TIMELINE ===
  const tl = gsap.timeline();
  entranceTimeline = tl;

  // Set initial states
  gsap.set(ovalMask.value, { opacity: 0, scale: 2 });
  gsap.set(particlesContainer.value, { opacity: 0 });

  // 1. Intro text reveals
  tl.to(introText.value, { opacity: 1, duration: 1.5, delay: 0.3 });
  
  // 2. Hold text
  tl.to(introText.value, { opacity: 1, duration: 0.8 });
  
  // 3. Fade out text
  tl.to(introText.value, { opacity: 0, duration: 0.8 });

  // 4. Oval mask closes in (big → normal)
  tl.to(ovalMask.value, {
    opacity: 1,
    scale: 1,
    duration: 2.5,
    ease: "power2.out"
  }, "-=0.3");

  // 5. Corner ornaments fade in with stagger
  tl.to(ornaments, {
    opacity: 0.7,
    scale: 1,
    duration: 1.2,
    ease: 'power2.out',
    stagger: 0.1,
  }, "-=1.5");

  // 6. Hero content reveals (names/glassmorphism oval from parent)
  tl.to(heroContent.value, {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: 'power3.out'
  }, "-=1.0");

  // 7. Start particles after entrance
  tl.to(particlesContainer.value, {
    opacity: 1,
    duration: 0.5,
    onStart: () => {
      for (let i = 0; i < 5; i++) {
        gsap.delayedCall(i * 0.5, spawnSparkle);
      }
      gsap.delayedCall(2.5, startSparkleLoop);
    }
  }, "-=0.5");

  // 8. Subtle shimmer on ornaments (looping)
  gsap.to(ornaments, {
    opacity: 0.4,
    duration: 2.5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 0.3,
    delay: 6,
  });
});

onBeforeUnmount(() => {
  if (spawnTimer) spawnTimer.kill();
  if (entranceTimeline) entranceTimeline.kill();
  activeParticles.forEach(tween => tween.kill());
  activeParticles = [];
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
