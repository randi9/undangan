<template>
  <section 
    ref="heroSection"
    style="height: 100dvh; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; text-align: center; padding: 48px 16px; position: relative; overflow: hidden; background-color: transparent;"
  >
    
    <!-- Hidden SVG Filter for Realistic Water Distortion -->
    <svg style="position: absolute; width: 0; height: 0; pointer-events: none;">
      <filter id="waterfall-distortion" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035 0.05" numOctaves="4" result="noise">
          <animate attributeName="seed" from="1" to="100" dur="18s" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>

    <!-- Scenic Backdrop Container (animates zoom and blur on mount) -->
    <div
      class="hero-scenic-backdrop"
    >
      <!-- Sky Background Image (was on parent section style) -->
      <div
        style="position: absolute; inset: 0; background-image: url('https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_808a2f2b-d48a-4099-a3d2-b4a59147644c.webp'); background-size: cover; background-position: center; z-index: 0;"
      ></div>

      <!-- Cloud Left & Right Overlays -->
      <img 
        src="https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_fd4ee1ea-950e-433a-8026-cf80364cb6a9.webp" 
        alt="Cloud Left" 
        class="cloud-anim-left"
        style="position: absolute; top: 0; right: -250px; width: 100%; height: 40%; object-fit: cover; z-index: 1; pointer-events: none;"
      />
      <img 
        src="https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_4c1a0785-54c4-4f62-a27b-c6277249360d.webp" 
        alt="Cloud Right" 
        class="cloud-anim-right"
        style="position: absolute; top: 100px; left: -160px; width: 100%; height: 40%; object-fit: cover; z-index: 1; pointer-events: none;"
      />

      <!-- Foreground Cliff Overlay (without sky) -->
      <img 
        src="https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_e5766616-8b07-419a-b12f-cb576a738daa.webp" 
        alt="Cliff Overlay" 
        class="bg-cliff-layer" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 2; pointer-events: none;"
      />

      <!-- Dynamic Waterfall Animation Overlay -->
      <div class="waterfall-container">
        <div class="waterfall-stream stream-1"></div>
        <div class="waterfall-stream stream-2"></div>
        <div class="waterfall-mist-container">
          <div v-for="n in 8" :key="n" :class="['mist-particle', `mist-${n}`]"></div>
        </div>
      </div>

      <!-- Large Rolling Fog/Mist at the bottom of the waterfall -->
      <div class="waterfall-fog-container">
        <div class="fog-layer fog-1"></div>
        <div class="fog-layer fog-2"></div>
        <div class="fog-layer fog-3"></div>
      </div>

      <!-- Static Decorative Assets inside backdrop to zoom/blur together -->
      <img 
        v-for="(asset, index) in DECORATIVE_ASSETS.filter(a => a.className === 'anim-static')" 
        :key="'static-' + index" 
        :src="asset.src" 
        :alt="asset.name" 
        class="decor-asset anim-static"
        :style="asset.style" 
      />
    </div>

    <!-- Dynamic Foreground/Entrance Decorative Assets (trees, shrubs, flowers) -->
    <img 
      v-for="(asset, index) in DECORATIVE_ASSETS.filter(a => a.className !== 'anim-static')" 
      :key="'dynamic-' + index" 
      :src="asset.src" 
      :alt="asset.name" 
      :class="['decor-asset', asset.className]"
      :style="asset.style" 
    />

    <!-- Content slot -->
    <div 
      ref="heroContentContainer"
      style="width: 100%; max-width: 600px; margin: 0 auto; color: #6A4E42; z-index: 3; position: relative; transform: translateY(8vh); will-change: opacity, transform;"
    >
      <slot />
    </div>

    <!-- Quotes Container (fades in as hero content fades out) -->
    <div 
      v-if="quote"
      ref="quoteCardRef"
      class="fairytale-quote-container"
      style="position: absolute; inset: 0; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transform: translateY(15vh); will-change: opacity, transform;"
    >
      <div class="fairytale-quote-card">
        <!-- Quote Icon -->
        <div class="quote-icon-wrapper mb-4 text-[#D9A9AF]">
          <svg class="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        
        <!-- Quote Content -->
        <blockquote class="quote-text text-base md:text-lg font-light text-[#6A4E42] leading-relaxed md:leading-loose tracking-wide break-words whitespace-pre-line px-4" :style="{ fontFamily: themeConfig?.fontBody }">
          {{ quote }}
        </blockquote>
        
        <!-- Bottom Accent Line -->
        <div class="w-12 h-[1px] bg-[#D9A9AF] mx-auto mt-4"></div>
      </div>

      <!-- Bottom Decoration Asset -->
      <img 
        src="https://media.mengundanganda.com/fairygarden/quotes%20section/dewirandi_16ea4f80-300c-41c5-91b1-4ba941ed161a.webp" 
        alt="Quotes bottom decoration" 
        class="absolute bottom-0 left-0 w-full object-contain z-10 pointer-events-none origin-bottom scale-[1.35]"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import type { CSSProperties } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  overlayGradient: string;
  quote?: string;
  themeConfig?: any;
}>();

const heroSection = ref<HTMLElement | null>(null);
const heroContentContainer = ref<HTMLElement | null>(null);
const quoteCardRef = ref<HTMLElement | null>(null);

let scrollTl: gsap.core.Timeline | null = null;
let triggerInstance: ScrollTrigger | null = null;

onMounted(async () => {
  await nextTick();
  if (!heroSection.value) return;

  let activated = false;
  let activateScrollAnimations = () => {};

  // --- BACKGROUND ENTRANCE ANIMATION VIA GSAP ---
  const semakKanan = heroSection.value.querySelector('.anim-semak-kanan');
  const semakKiri = heroSection.value.querySelector('.anim-semak-kiri');
  const pohonKanan = heroSection.value.querySelector('.anim-pohon-kanan');
  const pohonKiri = heroSection.value.querySelector('.anim-pohon-kiri');
  const flowers1 = heroSection.value.querySelectorAll('.pair-1');
  const flowers2 = heroSection.value.querySelectorAll('.pair-2');
  const flowers3 = heroSection.value.querySelectorAll('.pair-3');
  const cloudLeft = heroSection.value.querySelector('.cloud-anim-left');
  const cloudRight = heroSection.value.querySelector('.cloud-anim-right');

  // Set initial states in GSAP to match the CSS starting values exactly
  gsap.set([semakKanan, semakKiri], { y: 100, opacity: 0 });
  gsap.set(pohonKanan, { x: 350, rotation: -15, scale: 1, opacity: 0 });
  gsap.set(pohonKiri, { x: -350, rotation: 12, scale: 1, opacity: 0 });
  gsap.set(flowers1, { y: 200, rotation: 0, opacity: 0 });
  gsap.set(flowers2, { y: 200, rotation: 0, opacity: 0 });
  gsap.set(flowers3, { y: 200, rotation: 0, opacity: 0 });
  gsap.set(cloudLeft, { x: 250, opacity: 0 });
  gsap.set(cloudRight, { x: -250, opacity: 0 });

  // Semak Kanan & Kiri entry (delay 3.2s, duration 1.8s)
  gsap.to([semakKanan, semakKiri], {
    y: 0,
    opacity: (index) => index === 0 ? 1 : 0.95,
    duration: 1.8,
    ease: 'power2.out',
    delay: 3.2,
  });

  // Pohon Kanan entry (delay 3.2s, duration 2.5s)
  gsap.to(pohonKanan, {
    x: 0,
    rotation: -15,
    opacity: 0.95,
    duration: 2.5,
    ease: 'power2.out',
    delay: 3.2,
    onComplete: () => {
      // Start sway animation
      gsap.to(pohonKanan, {
        rotation: -11,
        duration: 4.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  });

  // Pohon Kiri entry (delay 4.5s, duration 2.5s)
  gsap.to(pohonKiri, {
    x: 0,
    rotation: 12,
    opacity: 0.9,
    duration: 2.5,
    ease: 'power2.out',
    delay: 4.5,
    onComplete: () => {
      gsap.to(pohonKiri, {
        rotation: 8,
        duration: 4.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  });

  // Flowers pair 1 (delay 3.8s, duration 2.2s)
  gsap.to(flowers1, {
    y: 0,
    rotation: 0,
    opacity: 1,
    duration: 2.2,
    ease: 'power2.out',
    delay: 3.8,
    onComplete: () => {
      gsap.to(flowers1, {
        rotation: -4.5,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  });

  // Flowers pair 2 (delay 4.4s, duration 2.2s)
  gsap.to(flowers2, {
    y: 0,
    rotation: 0,
    opacity: 1,
    duration: 2.2,
    ease: 'power2.out',
    delay: 4.4,
    onComplete: () => {
      gsap.to(flowers2, {
        rotation: 4,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  });

  // Flowers pair 3 (delay 5.0s, duration 2.2s)
  gsap.to(flowers3, {
    y: 0,
    rotation: 0,
    opacity: 1,
    duration: 2.2,
    ease: 'power2.out',
    delay: 5.0,
    onComplete: () => {
      gsap.to(flowers3, {
        rotation: -3.5,
        duration: 4.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
      // Activate scroll animations once entrance completes naturally
      if (scrollTl && !activated) {
        activateScrollAnimations();
      }
    }
  });

  // Cloud Left (delay 3.2s, duration 8s)
  gsap.to(cloudLeft, {
    x: 0,
    opacity: 1,
    duration: 8,
    ease: 'power2.out',
    delay: 3.2,
    onComplete: () => {
      gsap.to(cloudLeft, {
        x: -8,
        y: -3,
        duration: 24,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  });

  // Cloud Right (delay 3.2s, duration 8s)
  gsap.to(cloudRight, {
    x: 0,
    opacity: 1,
    duration: 8,
    ease: 'power2.out',
    delay: 3.2,
    onComplete: () => {
      gsap.to(cloudRight, {
        x: 8,
        y: 3,
        duration: 28,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  });

  const allFlowers = heroSection.value.querySelectorAll('.anim-flower');
  const fadeOutTargets = [semakKanan, semakKiri, ...Array.from(allFlowers)].filter(Boolean);

  activateScrollAnimations = () => {
    if (activated) return;
    activated = true;

    // Stop entrance animations on y and opacity so they don't fight with the scrub timeline
    gsap.killTweensOf(fadeOutTargets, 'y,opacity');

    if (scrollTl) {
      // Add the fade out tween to the timeline at the very beginning (position 0)
      scrollTl.to(fadeOutTargets, {
        opacity: 0,
        y: 200,
        ease: 'power1.inOut',
        duration: 1,
      }, 0);

      // Invalidate the timeline to record correct start values
      scrollTl.invalidate();
    }
  };

  // --- SCROLLTRIGGER PINNING TIMELINE ---
  if (props.quote) {
    scrollTl = gsap.timeline();

    // Fade out hero card and slide it up slightly
    scrollTl.to(heroContentContainer.value, {
      opacity: 0,
      y: '-8vh',
      ease: 'power1.inOut',
      duration: 1,
    });

    // Fade in quote container (Quote Card & Bridge decoration) and slide it up from y: 15vh to 0vh
    scrollTl.to(quoteCardRef.value, {
      opacity: 1,
      y: '0vh',
      ease: 'power1.inOut',
      duration: 1,
      onUpdate: function() {
        const progress = this.progress();
        if (quoteCardRef.value) {
          if (progress > 0.5) {
            quoteCardRef.value.style.pointerEvents = 'auto';
          } else {
            quoteCardRef.value.style.pointerEvents = 'none';
          }
        }
      }
    }, '-=0.5');

    // Keep showing the quote for a little bit of scroll duration before unpinning
    scrollTl.to({}, { duration: 0.8 });

    triggerInstance = ScrollTrigger.create({
      trigger: heroSection.value,
      start: 'top top',
      end: '+=150%', // Scroll distance of 1.5 screens
      pin: true,
      scrub: true, // Smooth scrub linked to scrollbar
      animation: scrollTl,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // If the user starts scrolling (scrolled past 20px), activate the animations immediately
        if (!activated && self.scroll() > 20) {
          activateScrollAnimations();
        }
      }
    });
  }
});

onBeforeUnmount(() => {
  if (scrollTl) scrollTl.kill();
  if (triggerInstance) triggerInstance.kill();
  // Kill entry animations and sway loops
  const elements = heroSection.value?.querySelectorAll('.decor-asset, .cloud-anim-left, .cloud-anim-right');
  if (elements) {
    elements.forEach(el => gsap.killTweensOf(el));
  }
});

/**
 * =========================================================================
 * CENTRALIZED DECORATIVE ASSETS CONFIGURATION
 * =========================================================================
 * You can easily customize the position, size, rotation, scale, z-index,
 * and visibility of each asset by editing the properties below.
 * =========================================================================
 */
interface DecorativeAsset {
  name: string;
  src: string;
  className: string;
  style: CSSProperties;
}

const DECORATIVE_ASSETS: DecorativeAsset[] = [
  {
    name: 'gazebo',
    src: 'https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_48c13914-302a-45a6-88af-b607ce04cb6c.webp',
    className: 'anim-static',
    style: {
      position: 'absolute',
      bottom: '270px',
      right: '-80px',
      width: '180px',
      zIndex: 5,
      opacity: 1,
      pointerEvents: 'none',
    }
  },
  {
    name: 'pohon ijo',
    src: 'https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_3eb9571f-8d1d-4713-917e-c16867e656a1.webp',
    className: 'anim-static',
    style: {
      position: 'absolute',
      bottom: '240px',
      right: '100px',
      width: '50px',
      zIndex: 5,
      opacity: 1,
      pointerEvents: 'none',
    }
  },
  {
    name: 'tanah',
    src: 'https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_7cc65aec-b5b2-48a7-8ebe-a4cb6c798b50.webp',
    className: 'anim-static',
    style: {
      position: 'absolute',
      bottom: '70px',
      right: '-10px',
      width: '230px',
      zIndex: 5,
      opacity: 1,
      pointerEvents: 'none',
    }
  },
  {
    name: 'semak kanan',
    src: 'https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_b2bc00e4-6742-443a-a73b-1f5c4db4b7f1.webp',
    className: 'anim-semak-kanan',
    style: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      width: '200px',
      zIndex: 5,
      opacity: 1,
      pointerEvents: 'none',
    }
  },
  {
    name: 'semak kiri',
    src: 'https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_4553fba2-ed12-47a5-9137-ac646642cc15.webp',
    className: 'anim-semak-kiri',
    style: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '200px',
      zIndex: 4,
      opacity: 0.95,
      pointerEvents: 'none',
    }
  },
  {
    name: 'pohon kanan',
    src: 'https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_05679a4e-ee34-4138-85f9-528f6f06630e.webp',
    className: 'anim-pohon-kanan',
    style: {
      position: 'absolute',
      top: '16%',
      right: '-240px',
      width: '300px',
      '--base-transform': 'rotate(-15deg) scale(1)',
      zIndex: 5,
      opacity: 0.95,
      pointerEvents: 'none',
    } as CSSProperties
  },
  {
    name: 'pohon kiri',
    src: 'https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_efe194b7-b4cb-46c1-ab20-28d9fc85e3f5.webp',
    className: 'anim-pohon-kiri',
    style: {
      position: 'absolute',
      bottom: '30%',
      left: '-30%',
      width: '210px',
      '--base-transform': 'rotate(12deg) scale(1)',
      zIndex: 5,
      opacity: 0.9,
      pointerEvents: 'none',
    } as CSSProperties
  },
  {
    name: 'bunga 1',
    src: 'https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_99b2b330-5fbc-48e5-ab76-94f3d595c6b1.webp',
    className: 'anim-flower pair-1',
    style: {
      position: 'absolute',
      bottom: '50px',
      left: '-9%',
      width: '100px',
      zIndex: 6,
      opacity: 1,
      pointerEvents: 'none',
    }
  },
  {
    name: 'bunga 2',
    src: 'https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_90a53a4b-4dce-4779-a421-1c48ca4b7f93.webp',
    className: 'anim-flower pair-3',
    style: {
      position: 'absolute',
      bottom: '-40px',
      left: '13%',
      width: '120px',
      zIndex: 6,
      opacity: 1,
      pointerEvents: 'none',
    }
  },
  {
    name: 'bunga 2',
    src: 'https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_90a53a4b-4dce-4779-a421-1c48ca4b7f93.webp',
    className: 'anim-flower pair-2',
    style: {
      position: 'absolute',
      bottom: '-40px',
      right: '-4%',
      width: '120px',
      zIndex: 7,
      opacity: 1,
      pointerEvents: 'none',
    }
  },
  {
    name: 'bunga 3',
    src: 'https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_373980a6-6fcb-4798-bba7-cd4e9c6eea5b.webp',
    className: 'anim-flower pair-2',
    style: {
      position: 'absolute',
      bottom: '-20px',
      left: '-7%',
      width: '120px',
      zIndex: 6,
      opacity: 1,
      pointerEvents: 'none',
    }
  },
  {
    name: 'bunga 4',
    src: 'https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_06344b3b-a7d2-46b4-8a7a-9f1f34a40033.webp',
    className: 'anim-flower pair-1',
    style: {
      position: 'absolute',
      bottom: '20px',
      right: '-7%',
      width: '120px',
      zIndex: 6,
      opacity: 1,
      pointerEvents: 'none',
    }
  },
  {
    name: 'bunga 3',
    src: 'https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_373980a6-6fcb-4798-bba7-cd4e9c6eea5b.webp',
    className: 'anim-flower pair-3',
    style: {
      position: 'absolute',
      bottom: '-70px',
      right: '17%',
      width: '120px',
      zIndex: 6,
      opacity: 1,
      pointerEvents: 'none',
    }
  },
];
</script>

<style scoped>
.bg-cliff-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  pointer-events: none;
}

/* Base configuration for decorative assets */
.decor-asset {
  opacity: 0;
  transform-origin: bottom center;
}

/* Pohon Kanan slide from right + sway */
.anim-pohon-kanan {
  transform-origin: bottom right;
  --base-transform: rotate(-15deg) scale(1);
  transform: translateX(350px) var(--base-transform);
}

/* Pohon Kiri slide from left + sway */
.anim-pohon-kiri {
  transform-origin: bottom left;
  --base-transform: rotate(12deg) scale(1);
  transform: translateX(-350px) var(--base-transform);
}

/* Ground layers entry */
.decor-asset.anim-static {
  opacity: 1 !important;
  transform: none !important;
}

.anim-semak-kanan {
  transform: translateY(100px);
}

.anim-semak-kiri {
  transform: translateY(100px);
}

/* Flowers entry & sway animations */
.anim-flower {
  transform-origin: bottom center;
  transform: translateY(200px);
}



/* Keyframes for Tree Swaying (Wind Effect) */
@keyframes sway-kanan {
  0% {
    transform: rotate(-15deg) scale(1);
  }
  100% {
    transform: rotate(-11deg) scale(1);
  }
}

@keyframes sway-kiri {
  0% {
    transform: rotate(12deg) scale(1);
  }
  100% {
    transform: rotate(8deg) scale(1);
  }
}

@keyframes sway-general {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(3.5deg);
  }
}

/* Keyframes for Flower Swaying */
@keyframes sway-flower-p1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-4.5deg);
  }
}

@keyframes sway-flower-p2 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(4deg);
  }
}

@keyframes sway-flower-p3 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-3.5deg);
  }
}

/* ========================================================= */
/* DYNAMIC WATERFALL ANIMATION OVERLAY                        */
/* ========================================================= */
.waterfall-container {
  position: absolute;
  top: 23%;
  left: 43%; /* Shifted right to match the background waterfall */
  width: 23%;
  height: 44%;
  z-index: 3;
  pointer-events: none;
  clip-path: polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%);
  overflow: visible;
  filter: url(#waterfall-distortion);
  mask-image: radial-gradient(ellipse at 50% 45%, black 20%, transparent 85%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 45%, black 20%, transparent 85%);
  opacity: 0.85; /* Increased opacity to highlight the falling waves */
  transform: rotate(3deg);
  transform-origin: top center;
}

.waterfall-stream {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: screen; /* Changed to screen for brighter, more pronounced highlights */
}

.stream-1 {
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.35) 15%,
    rgba(255, 255, 255, 0.7) 25%,
    rgba(255, 255, 255, 0.75) 35%,
    rgba(255, 255, 255, 0.35) 45%,
    rgba(255, 255, 255, 0) 60%
  );
  background-size: 100% 220px;
  animation: waterfall-flow-down 8s linear infinite; /* Slower, more elegant flow */
}

.stream-2 {
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.25) 20%,
    rgba(255, 255, 255, 0.5) 35%,
    rgba(255, 255, 255, 0.55) 45%,
    rgba(255, 255, 255, 0.25) 60%,
    rgba(255, 255, 255, 0) 80%
  );
  background-size: 100% 300px;
  transform: scaleX(-1);
  animation: waterfall-flow-down 12s linear infinite; /* Slower secondary flow */
}

@keyframes waterfall-flow-down {
  0% {
    background-position-y: 0px;
  }
  100% {
    background-position-y: 1000px;
  }
}

/* Mist Particles at the bottom */
.waterfall-mist-container {
  position: absolute;
  bottom: -15px;
  left: -10%;
  width: 120%;
  height: 40px;
  pointer-events: none;
}

.mist-particle {
  position: absolute;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  filter: blur(10px);
  opacity: 0;
}

/* Staggered Mist Semburan */
.mist-1 { left: 10%; width: 35px; height: 35px; animation: mist-rise-up 2.2s ease-out infinite; animation-delay: 0.1s; }
.mist-2 { left: 23%; width: 28px; height: 28px; animation: mist-rise-up 1.8s ease-out infinite; animation-delay: 0.5s; }
.mist-3 { left: 38%; width: 32px; height: 32px; animation: mist-rise-up 2.5s ease-out infinite; animation-delay: 0.9s; }
.mist-4 { left: 50%; width: 40px; height: 40px; animation: mist-rise-up 2.1s ease-out infinite; animation-delay: 0.3s; }
.mist-5 { left: 62%; width: 25px; height: 25px; animation: mist-rise-up 1.9s ease-out infinite; animation-delay: 1.2s; }
.mist-6 { left: 75%; width: 30px; height: 30px; animation: mist-rise-up 2.4s ease-out infinite; animation-delay: 0.7s; }
.mist-7 { left: 88%; width: 36px; height: 36px; animation: mist-rise-up 2.0s ease-out infinite; animation-delay: 1.5s; }
.mist-8 { left: 45%; width: 32px; height: 32px; animation: mist-rise-up 2.3s ease-out infinite; animation-delay: 1.8s; }

@keyframes mist-rise-up {
  0% {
    transform: translateY(15px) scale(0.6);
    opacity: 0;
  }
  30% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(-25px) scale(1.7);
    opacity: 0;
  }
}

/* Cloud Animations */
.cloud-anim-left {
  opacity: 0;
  transform: translateX(250px);
}

.cloud-anim-right {
  opacity: 0;
  transform: translateX(-250px);
}

@keyframes cloud-left-entry {
  0% {
    opacity: 0;
    transform: translateX(250px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes cloud-float-left {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-8px, -3px);
  }
  100% {
    transform: translate(4px, 3px);
  }
}

@keyframes cloud-right-entry {
  0% {
    opacity: 0;
    transform: translateX(-250px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes cloud-right-float {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(8px, 3px);
  }
  100% {
    transform: translate(-4px, -3px);
  }
}

/* Waterfall Bottom Fog/Mist Animations */
.waterfall-fog-container {
  position: absolute;
  top: 60%;
  left: 38%;
  width: 32%;
  height: 120px;
  z-index: 3;
  pointer-events: none;
  overflow: visible;
}

.fog-layer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.85) 0%,
    rgba(255, 255, 255, 0.4) 55%,
    rgba(255, 255, 255, 0) 80%
  );
  filter: blur(22px);
  border-radius: 50%;
  transform-origin: center center;
}

.fog-1 {
  animation: roll-fog-1 25s ease-in-out infinite alternate;
  opacity: 0.9;
}

.fog-2 {
  animation: roll-fog-2 30s ease-in-out infinite alternate;
  opacity: 0.8;
  filter: blur(30px);
  height: 80%;
  bottom: 10px;
}

.fog-3 {
  animation: roll-fog-3 20s ease-in-out infinite alternate;
  opacity: 0.85;
  filter: blur(22px);
  height: 60%;
  bottom: -5px;
}

@keyframes roll-fog-1 {
  0% {
    transform: translate(-15px, 0) scale(1);
  }
  50% {
    transform: translate(20px, -5px) scale(1.15);
  }
  100% {
    transform: translate(-8px, 6px) scale(0.95);
  }
}

@keyframes roll-fog-2 {
  0% {
    transform: translate(20px, 6px) scale(0.85);
  }
  50% {
    transform: translate(-15px, -3px) scale(1.2);
  }
  100% {
    transform: translate(8px, 10px) scale(0.95);
  }
}

@keyframes roll-fog-3 {
  0% {
    transform: translate(8px, -10px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 5px) scale(0.85);
  }
  100% {
    transform: translate(15px, -3px) scale(1.15);
  }
}

/* Scenic backdrop entry zoom-fade and blur */
.hero-scenic-backdrop {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  transform: scale(0.88);
  filter: blur(12px);
  opacity: 0;
  animation: hero-backdrop-zoom-in 3.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes hero-backdrop-zoom-in {
  0% {
    transform: scale(0.88);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    filter: blur(0);
    opacity: 1;
  }
}

/* Fairytale Theme Quote Card & Container styling */
.fairytale-quote-container {
  box-sizing: border-box;
}

.fairytale-quote-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
  width: 100%;
  max-width: none;
  height: 100%;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: none;
  border-radius: 0;
  box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.2);
  padding: 40px 48px;
  position: relative;
  z-index: 1;
}

.quote-decor-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  object-fit: contain;
  z-index: 0;
  pointer-events: none;
}
</style>
