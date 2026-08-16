<template>
  <section v-if="photos && photos.length > 0" ref="gallerySection" class="py-20 md:py-28 px-4 md:px-8 bg-[#F2F5F3] relative overflow-hidden">
    <div class="max-w-5xl mx-auto relative z-10 text-center">
      <!-- Section Header -->
      <div ref="headerRef" class="opacity-0 translate-y-6 mb-16">
        <span class="text-xs uppercase tracking-[0.3em] text-[#5C7367] font-semibold block mb-2">Galeri Foto</span>
        <h2 class="text-3xl md:text-5xl font-serif text-[#2D3E35] font-medium" style="font-family: 'Cormorant Garamond', Georgia, serif;">
          Momen Bahagia
        </h2>
        <div class="w-12 h-[1.5px] bg-[#7A9A8B] mx-auto mt-4"></div>
      </div>

      <!-- Masonry Grid View -->
      <div 
        v-if="galleryType === 'masonry'" 
        ref="gridRef" 
        class="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 opacity-0 translate-y-8"
      >
        <div 
          v-for="(photo, idx) in photos" 
          :key="idx" 
          @click="emit('open-lightbox', idx)"
          class="break-inside-avoid relative rounded-3xl overflow-hidden group cursor-pointer border border-[#8B9E8B]/30 shadow-[0_6px_20px_rgba(45,62,53,0.05)] bg-white/50"
        >
          <img
            :src="resolveUrl(photo.url)"
            :alt="photo.caption || 'Foto Galeri'"
            class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-[#2D3E35]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <svg class="w-8 h-8 text-white scale-75 group-hover:scale-100 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Carousel View -->
      <div v-else ref="carouselRef" class="opacity-0 translate-y-8 max-w-3xl mx-auto">
        <div class="relative overflow-hidden rounded-3xl border border-[#8B9E8B]/30 shadow-[0_12px_40px_rgba(45,62,53,0.08)] aspect-[4/3] bg-white/60">
          <img
            :src="resolveUrl(photos[activeIndex]?.url)"
            :alt="photos[activeIndex]?.caption || 'Foto Galeri'"
            class="w-full h-full object-cover transition-all duration-500 cursor-pointer"
            @click="emit('open-lightbox', activeIndex)"
          />
          
          <!-- Prev Button -->
          <button
            @click="prevSlide"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-[#2D3E35] flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <!-- Next Button -->
          <button
            @click="nextSlide"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-[#2D3E35] flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <!-- Carousel Indicators / Thumbnails -->
        <div class="flex justify-center items-center gap-3 mt-6 flex-wrap">
          <button
            v-for="(photo, idx) in photos"
            :key="idx"
            @click="activeIndex = idx"
            class="w-12 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300"
            :class="activeIndex === idx ? 'border-[#4A6B5B] scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'"
          >
            <img :src="resolveUrl(photo.url)" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Photo } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';
import { resolveAssetUrl } from '@/utils/url';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  photos: Photo[];
  themeConfig: ThemeConfig;
  apiBase: string;
  galleryType?: 'carousel' | 'masonry';
}>();

const emit = defineEmits<{
  (e: 'open-lightbox', index: number): void;
}>();

const gallerySection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);
const carouselRef = ref<HTMLElement | null>(null);
const activeIndex = ref(0);

const resolveUrl = (url: string | undefined) => {
  if (!url) return '';
  return resolveAssetUrl(url, props.apiBase);
};

const prevSlide = () => {
  if (props.photos.length === 0) return;
  activeIndex.value = (activeIndex.value - 1 + props.photos.length) % props.photos.length;
};

const nextSlide = () => {
  if (props.photos.length === 0) return;
  activeIndex.value = (activeIndex.value + 1) % props.photos.length;
};

onMounted(() => {
  if (!gallerySection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: gallerySection.value,
      start: 'top 75%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'power3.out'
  })
  .to([gridRef.value, carouselRef.value].filter(Boolean), {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out'
  }, "-=0.6");
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
