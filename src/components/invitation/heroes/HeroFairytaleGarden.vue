<template>
  <section style="height: 100dvh; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; text-align: center; padding: 48px 16px; background-image: url('https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_0eacac4b-3d0f-4388-9d77-3d02cbbb6c9c.webp'); background-size: cover; background-position: center; position: relative; overflow: hidden;">
    
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
    <div style="width: 100%; max-width: 600px; margin: 0 auto; color: #6A4E42; z-index: 20; position: relative; transform: translateY(8vh);">
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
    className: 'anim-gazebo',
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
    className: 'anim-pohon-ijo',
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
    src: 'https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_f24d0c0a-8ce3-48db-8af8-e0b7beabcda5.webp',
    className: 'anim-pohon-kanan',
    style: {
      position: 'absolute',
      top: '23%',
      right: '-250px',
      width: '350px',
      '--base-transform': 'rotate(-15deg) scale(1)',
      zIndex: 4,
      opacity: 0.95,
      pointerEvents: 'none',
    } as CSSProperties
  },
  {
    name: 'pohon kiri',
    src: 'https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_8dd723f4-1823-457a-adf2-9f4e5cb1e84d.webp',
    className: 'anim-pohon-kiri',
    style: {
      position: 'absolute',
      bottom: '25%',
      left: '-40%',
      width: '310px',
      '--base-transform': 'rotate(12deg) scale(1)',
      zIndex: 3,
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
    className: 'anim-flower pair-2',
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
    className: 'anim-flower pair-3',
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
/* Base configuration for decorative assets */
.decor-asset {
  opacity: 0;
  transform-origin: bottom center;
  transition: opacity 1.5s ease-out;
}

/* Gazebo slide from right edge */
.anim-gazebo {
  transform: translateX(250px);
  transition: transform 2.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.2s ease-out;
}
.anim-gazebo.animate-active {
  opacity: 1;
  transform: translateX(0);
}

/* Pohon Kanan slide from right + sway */
.anim-pohon-kanan {
  transform-origin: bottom right;
  --base-transform: rotate(-15deg) scale(1);
  transform: translateX(350px) var(--base-transform);
  transition: transform 2.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.5s ease-out;
}
.anim-pohon-kanan.animate-active {
  opacity: 0.95;
  transform: translateX(0) var(--base-transform);
  animation: sway-kanan 4.5s ease-in-out infinite alternate;
  animation-delay: 2.5s;
}

/* Pohon Kiri slide from left + sway */
.anim-pohon-kiri {
  transform-origin: bottom left;
  --base-transform: rotate(12deg) scale(1);
  transform: translateX(-350px) var(--base-transform);
  transition: transform 2.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.5s ease-out;
}
.anim-pohon-kiri.animate-active {
  opacity: 0.9;
  transform: translateX(0) var(--base-transform);
  animation: sway-kiri 4.8s ease-in-out infinite alternate;
  animation-delay: 2.5s;
}

/* Pohon Ijo fade/up + sway */
.anim-pohon-ijo {
  transform-origin: bottom center;
  transform: translateY(120px);
  transition: transform 2s cubic-bezier(0.25, 1, 0.5, 1), opacity 2s ease-out;
}
.anim-pohon-ijo.animate-active {
  opacity: 1;
  transform: translateY(0);
  animation: sway-general 4s ease-in-out infinite alternate;
  animation-delay: 2s;
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
  transition-delay: 0.5s;
}
.pair-1.animate-active {
  animation: sway-flower-p1 3.5s ease-in-out infinite alternate;
  animation-delay: 2.7s;
}

.pair-2 {
  transition-delay: 1.1s;
}
.pair-2.animate-active {
  animation: sway-flower-p2 4s ease-in-out infinite alternate;
  animation-delay: 3.3s;
}

.pair-3 {
  transition-delay: 1.7s;
}
.pair-3.animate-active {
  animation: sway-flower-p3 4.5s ease-in-out infinite alternate;
  animation-delay: 3.9s;
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
</style>
