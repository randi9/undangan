<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-x-clip">
    <!-- Background -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/893a8f56-6a87-4c3b-978e-a0977e36477c.webp"
        alt="Cover Background"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0" :style="{ background: overlayGradient }"></div>
    </div>

    <!-- Flower 1: Bottom corners -->
    <img
      ref="flower1Left"
      src="https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/b278bf07-9eb0-45ea-b5d3-4a2e887bc800.webp"
      alt=""
      class="absolute -bottom-10 -left-4 w-44 md:w-60 z-20 pointer-events-none will-change-transform opacity-0"
    />
    <img
      ref="flower1Right"
      src="https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/b278bf07-9eb0-45ea-b5d3-4a2e887bc800.webp"
      alt=""
      class="absolute -bottom-10 -right-4 w-44 md:w-60 z-20 pointer-events-none will-change-transform opacity-0"
    />

    <!-- Flower 2: Slightly higher, more inward -->
    <img
      ref="flower2Left"
      src="https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/b278bf07-9eb0-45ea-b5d3-4a2e887bc800.webp"
      alt=""
      class="absolute bottom-12 left-4 w-36 md:w-48 z-[19] pointer-events-none will-change-transform opacity-0"
    />
    <img
      ref="flower2Right"
      src="https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/b278bf07-9eb0-45ea-b5d3-4a2e887bc800.webp"
      alt=""
      class="absolute bottom-12 right-4 w-36 md:w-48 z-[19] pointer-events-none will-change-transform opacity-0"
    />

    <!-- Trees -->
    <img
      ref="treeLeft"
      src="https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/04a8f905-a972-4906-889c-46433ca72659.webp"
      alt=""
      class="absolute top-0 -left-10 w-44 z-[18] pointer-events-none will-change-transform opacity-0"
    />
    <img
      ref="treeRight"
      src="https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/04a8f905-a972-4906-889c-46433ca72659.webp"
      alt=""
      class="absolute top-0 -right-10 w-44 z-[18] pointer-events-none will-change-transform opacity-0"
    />

    <!-- Content Slot (names, date — from parent) -->
    <div class="relative z-10 text-white w-full max-w-2xl mx-auto py-20">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

defineProps<{
  overlayGradient: string;
}>();

const flower1Left = ref<HTMLImageElement | null>(null);
const flower1Right = ref<HTMLImageElement | null>(null);
const flower2Left = ref<HTMLImageElement | null>(null);
const flower2Right = ref<HTMLImageElement | null>(null);
const treeLeft = ref<HTMLImageElement | null>(null);
const treeRight = ref<HTMLImageElement | null>(null);

let timelines: gsap.core.Timeline[] = [];

interface SwayConfig {
  rotation: number;
  xRange: number;
  yRange: number;
  speed: number;
  delay: number;
}

function startWindSway(el: HTMLElement, config: SwayConfig) {
  const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: config.delay });
  tl.to(el, {
    rotation: config.rotation,
    x: config.xRange,
    y: -config.yRange,
    duration: 2.8 / config.speed,
    ease: 'sine.inOut',
  })
  .to(el, {
    rotation: -config.rotation * 0.6,
    x: -config.xRange * 0.7,
    y: config.yRange * 0.5,
    duration: 3.2 / config.speed,
    ease: 'sine.inOut',
  })
  .to(el, {
    rotation: config.rotation * 0.4,
    x: config.xRange * 0.5,
    y: -config.yRange * 0.3,
    duration: 2.5 / config.speed,
    ease: 'sine.inOut',
  });
  timelines.push(tl);
}

// ============================================
// CONFIG GOYANG — atur di sini!
// ============================================
const flower1Sway: SwayConfig = {
  rotation: 4, xRange: 8, yRange: 5, speed: 0.7, delay: 0,
};
const flower2Sway: SwayConfig = {
  rotation: 2.5, xRange: 5, yRange: 3, speed: 1.1, delay: 0.6,
};
const treeSway: SwayConfig = {
  rotation: 1.5, xRange: 3, yRange: 2, speed: 0.5, delay: 0.3,
};

onMounted(() => {
  const leftFlowers = [flower1Left.value, flower2Left.value];
  const rightFlowers = [flower1Right.value, flower2Right.value];

  if ([...leftFlowers, ...rightFlowers].some(el => !el)) return;

  // =============================================
  // INITIAL STATE — semua tersembunyi
  // =============================================

  // Bunga: tersembunyi di bawah
  gsap.set(leftFlowers, { y: 250, opacity: 0, transformOrigin: 'center bottom' });
  gsap.set(rightFlowers, { y: 250, opacity: 0, scaleX: -1, transformOrigin: 'center bottom' });

  // Pohon: zoom besar di tengah layar (kayak menutupi layar), lalu nanti buka ke samping
  if (treeLeft.value) {
    gsap.set(treeLeft.value, {
      opacity: 0,
      scale: 3,            // zoom gede banget
      x: '50vw',           // ditaruh di tengah layar
      scaleX: -3,          // flip + zoom
      transformOrigin: 'center center',
    });
  }
  if (treeRight.value) {
    gsap.set(treeRight.value, {
      opacity: 0,
      scale: 3,            // zoom gede banget
      x: '-50vw',          // ditaruh di tengah layar
      transformOrigin: 'center center',
    });
  }

  // =============================================
  // TAHAP 1: Pohon muncul dulu (efek gorden)
  // Delay 1.5 detik setelah overlay kebuka
  // =============================================
  const masterTl = gsap.timeline({ delay: 0.5 });

  // Pohon fade-in di tengah (zoom besar)
  masterTl
    .to([treeLeft.value, treeRight.value], {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    })
    // Lalu buka ke samping kayak gorden + zoom out ke ukuran normal
    .to(treeLeft.value, {
      scale: 1,
      scaleX: -1,          // tetap flip, tapi ukuran normal
      x: 0,                // balik ke posisi CSS asli (left)
      duration: 1.8,
      ease: 'power3.inOut',
    }, '-=0.1')
    .to(treeRight.value, {
      scale: 1,
      x: 0,                // balik ke posisi CSS asli (right)
      duration: 1.8,
      ease: 'power3.inOut',
    }, '<')               // '<' = bareng dengan treeLeft

  // =============================================
  // TAHAP 2: Bunga naik dari bawah
  // Dimulai saat gorden pohon sedang membuka
  // =============================================
    .to(flower1Left.value, {
      y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
    }, '-=1.0')           // mulai 1 detik sebelum gorden selesai
    .to(flower1Right.value, {
      y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
    }, '-=0.9')
    .to(flower2Left.value, {
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
    }, '-=0.7')
    .to(flower2Right.value, {
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
    }, '-=0.7');

  // =============================================
  // TAHAP 3: Setelah semua masuk → mulai goyang angin
  // =============================================
  masterTl.call(() => {
    startWindSway(flower1Left.value!, flower1Sway);
    startWindSway(flower1Right.value!, flower1Sway);
    startWindSway(flower2Left.value!, flower2Sway);
    startWindSway(flower2Right.value!, flower2Sway);
    if (treeLeft.value) startWindSway(treeLeft.value, treeSway);
    if (treeRight.value) startWindSway(treeRight.value, treeSway);
  });

  timelines.push(masterTl);
});

onBeforeUnmount(() => {
  timelines.forEach(tl => tl.kill());
});
</script>
