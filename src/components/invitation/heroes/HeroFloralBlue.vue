<template>
  <section class="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
    <!-- Background — full cover -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        src="https://media.mengundanganda.com/floral-blue/cover%20section/randidewi_28658e27-e94d-40ca-b897-607ef8ea0d83.webp"
        alt="Hero Background"
        class="min-w-full min-h-full w-full h-full object-cover object-center"
      />
    </div>

    <!-- Content Slot (names, date — from parent) -->
    <div ref="heroContent" class="relative z-10 w-full max-w-2xl mx-auto py-20 flex justify-center text-white opacity-0 translate-y-8">
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

const heroContent = ref<HTMLDivElement | null>(null);

let entranceTimeline: gsap.core.Timeline | null = null;

onMounted(() => {
  const tl = gsap.timeline();
  entranceTimeline = tl;

  tl.to(heroContent.value, { opacity: 1, y: 0, duration: 1.8, ease: 'power3.out', delay: 0.5 });
});

onBeforeUnmount(() => {
  if (entranceTimeline) entranceTimeline.kill();
});
</script>
