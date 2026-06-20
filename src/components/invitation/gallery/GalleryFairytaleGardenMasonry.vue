<template>
  <section v-if="photos && photos.length > 0" ref="gallerySection" class="pt-24 pb-32 px-6 max-w-5xl mx-auto text-center relative overflow-hidden bg-[#F8F3EE]">
    <div ref="headerRef" class="opacity-0 translate-y-6 mb-16 relative z-10">
      <h2 class="text-3xl md:text-5xl font-normal tracking-wide text-[#6A4E42] mb-4" :style="{ fontFamily: themeConfig.fontHeading }">Galeri Foto</h2>
      <div class="flex items-center justify-center gap-4 text-[#AEB8A3]">
        <div class="h-[1px] w-8 bg-[#AEB8A3]"></div>
        <div class="w-1.5 h-1.5 border border-[#AEB8A3] transform rotate-45"></div>
        <div class="h-[1px] w-8 bg-[#AEB8A3]"></div>
      </div>
    </div>
    
    <div ref="masonryRef" class="opacity-0 translate-y-12">
      <GalleryMasonryLayout
        :photos="photos"
        :api-base="apiBase"
        @open-lightbox="(i: number) => $emit('openLightbox', i)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Photo } from '@/types/invitation';
import GalleryMasonryLayout from './GalleryMasonryLayout.vue';

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  photos: Photo[];
  themeConfig: ThemeConfig;
  apiBase: string;
}>();

defineEmits<{
  (e: 'openLightbox', index: number): void;
}>();

const gallerySection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const masonryRef = ref<HTMLElement | null>(null);

let tl: gsap.core.Timeline | null = null;

onMounted(() => {
  if (!gallerySection.value) return;

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: gallerySection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(headerRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
    .to(masonryRef.value, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, "-=0.6");
});

onBeforeUnmount(() => {
  if (tl) tl.kill();
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
