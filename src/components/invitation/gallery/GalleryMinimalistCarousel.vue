<template>
  <section v-if="photos && photos.length > 0" ref="gallerySection" class="pt-24 pb-32 px-0 max-w-5xl mx-auto text-center relative overflow-hidden bg-white">
    <div ref="headerRef" class="opacity-0 translate-y-6 mb-16 px-6 relative z-10">
      <h2 class="text-3xl md:text-5xl font-light tracking-wide text-gray-800 mb-4" :style="{ fontFamily: themeConfig.fontHeading }">Galeri Foto</h2>
      <div class="flex items-center justify-center gap-4 text-gray-300">
        <div class="h-[1px] w-8 bg-gray-300"></div>
        <div class="w-1.5 h-1.5 border border-gray-300 transform rotate-45"></div>
        <div class="h-[1px] w-8 bg-gray-300"></div>
      </div>
    </div>
    
    <!-- Horizon Carousel -->
    <div ref="scrollRef" class="w-full flex overflow-x-auto snap-x snap-mandatory hide-scroll gap-4 px-6 md:px-12 pb-8 pt-4 items-center">
      <div 
        v-for="(photo, i) in photos" 
        :key="i" 
        @click="$emit('openLightbox', i)" 
        :ref="el => { if (el) itemRefs[i] = el as HTMLElement }"
        class="snap-center flex-shrink-0 w-[65vw] md:w-[350px] aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer group shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 bg-gray-50 opacity-0 translate-x-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] focus:outline-none"
      >
        <img :src="resolveAssetUrl(photo.url, apiBase)" alt="Galeri Photo" class="w-full h-full object-cover grayscale-[15%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hide-scroll {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.hide-scroll::-webkit-scrollbar {
  display: none;
}
</style>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Photo } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

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
const scrollRef = ref<HTMLElement | null>(null);
const itemRefs = ref<HTMLElement[]>([]);

onMounted(() => {
  if (!gallerySection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: gallerySection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(headerRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
  
  if (itemRefs.value.length) {
    tl.to(itemRefs.value, { 
      opacity: 1, 
      x: 0, 
      duration: 0.8, 
      ease: 'back.out(1.1)',
      stagger: 0.15 
    }, "-=0.6");
  }
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
