<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
    <!-- Background — full cover -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/893a8f56-6a87-4c3b-978e-a0977e36477c.webp"
        alt="Cover Background"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0" :style="{ background: overlayGradient }"></div>
    </div>

    <!-- Tree 1 (curtain): Left — mirrored -->
    <img
      ref="tree1Left"
      src="https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/c5c7b939-7890-4552-97b0-f101efefa870.webp"
      alt=""
      class="absolute top-0 left-0 h-full w-auto z-[18] pointer-events-none will-change-transform opacity-0"
      style="transform-origin: center center;"
    />
    <!-- Tree 1 (curtain): Right -->
    <img
      ref="tree1Right"
      src="https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/c5c7b939-7890-4552-97b0-f101efefa870.webp"
      alt=""
      class="absolute top-0 right-0 h-full w-auto z-[18] pointer-events-none will-change-transform opacity-0"
      style="transform-origin: center center;"
    />

    <!-- Tree 2 (rise from bottom): Left — mirrored -->
    <img
      ref="tree2Left"
      src="https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/29c33031-394d-45ca-bee2-1e405f32ef6c.webp"
      alt=""
      class="absolute top-0 -left-28 w-60 md:w-64 z-[19] pointer-events-none will-change-transform opacity-0"
      style="transform-origin: center bottom;"
    />
    <!-- Tree 2 (rise from bottom): Right -->
    <img
      ref="tree2Right"
      src="https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/29c33031-394d-45ca-bee2-1e405f32ef6c.webp"
      alt=""
      class="absolute top-0 -right-28 w-60 md:w-64 z-[19] pointer-events-none will-change-transform opacity-0"
      style="transform-origin: center bottom;"
    />

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

    <!-- Flower 2: Slightly higher -->
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

// Tree 1 (curtain effect — start center, slide off-screen)
const tree1Left = ref<HTMLImageElement | null>(null);
const tree1Right = ref<HTMLImageElement | null>(null);

// Tree 2 (rise from bottom, sway like wind)
const tree2Left = ref<HTMLImageElement | null>(null);
const tree2Right = ref<HTMLImageElement | null>(null);

// Flowers
const flower1Left = ref<HTMLImageElement | null>(null);
const flower1Right = ref<HTMLImageElement | null>(null);
const flower2Left = ref<HTMLImageElement | null>(null);
const flower2Right = ref<HTMLImageElement | null>(null);

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
// SWAY CONFIGS
// ============================================
const flower1Sway: SwayConfig = {
  rotation: 4, xRange: 8, yRange: 5, speed: 0.7, delay: 0,
};
const flower2Sway: SwayConfig = {
  rotation: 2.5, xRange: 5, yRange: 3, speed: 1.1, delay: 0.6,
};
const tree2Sway: SwayConfig = {
  rotation: 3, xRange: 4, yRange: 3, speed: 1, delay: 0,
};

onMounted(() => {
  // =============================================
  // INITIAL STATES
  // =============================================

  // Tree 1 (curtain): Start zoomed in at center, covering the screen
  if (tree1Left.value) {
    gsap.set(tree1Left.value, {
      opacity: 1,
      x: '30vw',           // pushed toward center
      scaleX: -3,           // mirrored + zoomed so leaves cover screen
      scaleY: 3,
      transformOrigin: 'center center',
    });
  }
  if (tree1Right.value) {
    gsap.set(tree1Right.value, {
      opacity: 1,
      x: '-30vw',           // pushed toward center
      scale: 3,             // zoomed so leaves cover screen
      transformOrigin: 'center center',
    });
  }

  // Tree 2 (rise): Hidden below
  if (tree2Left.value) {
    gsap.set(tree2Left.value, { y: 300, opacity: 0, scaleX: -1, transformOrigin: 'center bottom' });
  }
  if (tree2Right.value) {
    gsap.set(tree2Right.value, { y: 300, opacity: 0, transformOrigin: 'center bottom' });
  }

  // Flowers: Hidden below
  gsap.set([flower1Left.value, flower2Left.value], { y: 250, opacity: 0, transformOrigin: 'center bottom' });
  gsap.set([flower1Right.value, flower2Right.value], { y: 250, opacity: 0, scaleX: -1, transformOrigin: 'center bottom' });

  // =============================================
  // ANIMATION TIMELINE
  // =============================================
  const masterTl = gsap.timeline({ delay: 0.3 });

  // STAGE 1a: Hold the curtain visible for a moment (leaves covering screen)
  masterTl.to({}, { duration: 0.5 })

  // STAGE 1b: Curtain opens — trees slide to sides + shrink + fade out
    .to(tree1Left.value, {
      x: '-120%',           // slide off-screen left
      scaleX: -1,           // back to normal mirror size
      scaleY: 1,
      opacity: 0,
      duration: 2.0,
      ease: 'power3.inOut',
    })
    .to(tree1Right.value, {
      x: '120%',            // slide off-screen right
      scale: 1,             // back to normal size
      opacity: 0,
      duration: 2.0,
      ease: 'power3.inOut',
    }, '<')                  // simultaneous

  // STAGE 2: Tree 2 rises from bottom (during curtain opening)
    .to(tree2Left.value, {
      y: 0, opacity: 1, duration: 1.4, ease: 'power3.out',
    }, '-=1.0')
    .to(tree2Right.value, {
      y: 0, opacity: 1, duration: 1.4, ease: 'power3.out',
    }, '-=1.2')

  // STAGE 3: Flowers rise from bottom
    .to(flower1Left.value, {
      y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
    }, '-=0.8')
    .to(flower1Right.value, {
      y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
    }, '-=0.9')
    .to(flower2Left.value, {
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
    }, '-=0.7')
    .to(flower2Right.value, {
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
    }, '-=0.7');

  // STAGE 4: Start wind sway on everything
  masterTl.call(() => {
    // Tree 2 sway
    if (tree2Left.value) startWindSway(tree2Left.value, tree2Sway);
    if (tree2Right.value) startWindSway(tree2Right.value, tree2Sway);
    // Flowers sway
    startWindSway(flower1Left.value!, flower1Sway);
    startWindSway(flower1Right.value!, flower1Sway);
    startWindSway(flower2Left.value!, flower2Sway);
    startWindSway(flower2Right.value!, flower2Sway);
  });

  timelines.push(masterTl);
});

onBeforeUnmount(() => {
  timelines.forEach(tl => tl.kill());
});
</script>
