<template>
  <section style="height: 100dvh; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; text-align: center; padding: 48px 16px; background-image: url('https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_808a2f2b-d48a-4099-a3d2-b4a59147644c.webp'); background-size: cover; background-position: center; position: relative; overflow: hidden;">
    
    <!-- Hidden SVG Filter for Realistic Water Distortion -->
    <svg style="position: absolute; width: 0; height: 0; pointer-events: none;">
      <filter id="waterfall-distortion" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035 0.05" numOctaves="4" result="noise">
          <animate attributeName="seed" from="1" to="100" dur="18s" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>

    <!-- Cloud Left & Right Overlays -->
    <img 
      src="https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_fd4ee1ea-950e-433a-8026-cf80364cb6a9.webp" 
      alt="Cloud Left" 
      class="cloud-anim-left"
      :class="{ 'animate-active': isMounted }"
      style="position: absolute; top: 0; right: -250px; width: 100%; height: 40%; object-fit: cover; z-index: 1; pointer-events: none;"
    />
    <img 
      src="https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_a01c891e-0f65-4b5e-a411-c0bc480efcf2.webp" 
      alt="Cloud Right" 
      class="cloud-anim-right"
      :class="{ 'animate-active': isMounted }"
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

    <!-- Configurable Decorative Assets -->
    <img 
      v-for="(asset, index) in DECORATIVE_ASSETS" 
      :key="index" 
      :src="asset.src" 
      :alt="asset.name" 
      :class="['decor-asset', asset.className, { 'animate-active': isMounted }]"
      :style="asset.style" 
    />

    <!-- Content slot -->
    <div style="width: 100%; max-width: 600px; margin: 0 auto; color: #6A4E42; z-index: 3; position: relative; transform: translateY(8vh);">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { CSSProperties } from 'vue';

defineProps<{
  overlayGradient: string;
}>();

const isMounted = ref(false);

onMounted(() => {
  // Trigger animation shortly after mounting for maximum reliability
  setTimeout(() => {
    isMounted.value = true;
  }, 100);
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
  transition: opacity 1.5s ease-out;
}

/* Pohon Kanan slide from right + sway */
.anim-pohon-kanan {
  transform-origin: bottom right;
  --base-transform: rotate(-15deg) scale(1);
  transform: translateX(350px) var(--base-transform);
  transition: transform 2.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.5s ease-out;
  transition-delay: 1.0s;
}
.anim-pohon-kanan.animate-active {
  opacity: 0.95;
  transform: translateX(0) var(--base-transform);
  animation: sway-kanan 4.5s ease-in-out infinite alternate;
  animation-delay: 3.5s;
}

/* Pohon Kiri slide from left + sway */
.anim-pohon-kiri {
  transform-origin: bottom left;
  --base-transform: rotate(12deg) scale(1);
  transform: translateX(-350px) var(--base-transform);
  transition: transform 2.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.5s ease-out;
  transition-delay: 0.3s;
}
.anim-pohon-kiri.animate-active {
  opacity: 0.9;
  transform: translateX(0) var(--base-transform);
  animation: sway-kiri 4.8s ease-in-out infinite alternate;
  animation-delay: 2.8s;
}

/* Ground layers entry */
.decor-asset.anim-static {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}

.anim-semak-kanan {
  transform: translateY(100px);
  transition: transform 1.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.8s ease-out;
}
.anim-semak-kanan.animate-active {
  opacity: 1;
  transform: translateY(0);
}

.anim-semak-kiri {
  transform: translateY(100px);
  transition: transform 1.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.8s ease-out;
}
.anim-semak-kiri.animate-active {
  opacity: 0.95;
  transform: translateY(0);
}

/* Flowers entry & sway animations */
.anim-flower {
  transform-origin: bottom center;
  transform: translateY(200px);
  transition: transform 2.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.2s ease-out;
}
.anim-flower.animate-active {
  opacity: 1;
  transform: translateY(0);
}

/* Flower Pair delays & individual sway configurations */
.pair-1 {
  transition-delay: 1.7s;
}
.pair-1.animate-active {
  animation: sway-flower-p1 3.5s ease-in-out infinite alternate;
  animation-delay: 3.9s;
}

.pair-2 {
  transition-delay: 2.4s;
}
.pair-2.animate-active {
  animation: sway-flower-p2 4s ease-in-out infinite alternate;
  animation-delay: 4.6s;
}

.pair-3 {
  transition-delay: 3.1s;
}
.pair-3.animate-active {
  animation: sway-flower-p3 4.5s ease-in-out infinite alternate;
  animation-delay: 5.3s;
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
.cloud-anim-left.animate-active {
  animation: cloud-left-entry 8s cubic-bezier(0.25, 1, 0.5, 1) forwards, cloud-float-left 24s ease-in-out infinite alternate 8s;
}

.cloud-anim-right {
  opacity: 0;
  transform: translateX(-250px);
}
.cloud-anim-right.animate-active {
  animation: cloud-right-entry 8s cubic-bezier(0.25, 1, 0.5, 1) forwards, cloud-float-right 28s ease-in-out infinite alternate 8s;
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
</style>
