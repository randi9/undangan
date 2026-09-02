<template>
  <section v-if="photos && photos.length > 0" ref="gallerySection" class="relative py-24 px-4 md:px-8 bg-[#18201B] overflow-hidden text-center">
    <!-- Ambient Glow -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(circle at 50% 50%, rgba(112, 132, 120, 0.2) 0%, transparent 70%);"
    ></div>

    <div class="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
      <!-- Section Header -->
      <div ref="headerRef" class="opacity-0 translate-y-6 mb-16 text-center">
        <div class="flex items-center justify-center gap-2 mb-2">
          <span class="text-[#D4A6AD] text-xs">✦</span>
          <span class="text-xs uppercase tracking-[0.35em] text-[#D4A6AD] font-semibold">Galeri Kenangan</span>
          <span class="text-[#D4A6AD] text-xs">✦</span>
        </div>
        <h2
          class="text-3xl md:text-5xl font-serif text-[#ECE0D3] font-normal"
          :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
        >
          Momen Bahagia
        </h2>
        <div class="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#708478] to-transparent mx-auto mt-4"></div>
      </div>

      <!-- Masonry Grid View -->
      <div
        v-if="galleryType === 'masonry'"
        ref="gridRef"
        class="w-full columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 opacity-0 translate-y-8"
      >
        <div
          v-for="(photo, idx) in photos"
          :key="idx"
          @click="emit('open-lightbox', idx)"
          class="break-inside-avoid relative rounded-3xl overflow-hidden group cursor-pointer border border-[#708478]/50 shadow-[0_8px_25px_rgba(0,0,0,0.5)] bg-[#243029]"
        >
          <img
            :src="resolveUrl(photo.url)"
            :alt="photo.caption || 'Foto Galeri'"
            class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-[#18201B]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div class="w-12 h-12 rounded-full border border-[#D4A6AD]/60 bg-[#243029]/80 flex items-center justify-center text-[#ECE0D3] shadow-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Carousel View -->
      <div v-else ref="carouselRef" class="w-full opacity-0 translate-y-8 max-w-3xl mx-auto">
        <div class="relative overflow-hidden rounded-3xl border border-[#708478]/50 shadow-[0_12px_40px_rgba(0,0,0,0.6)] aspect-[4/3] bg-[#243029]">
          <img
            :src="resolveUrl(photos[activeIndex]?.url)"
            :alt="photos[activeIndex]?.caption || 'Foto Galeri'"
            class="w-full h-full object-cover transition-all duration-500 cursor-pointer"
            @click="emit('open-lightbox', activeIndex)"
          />

          <!-- Prev Button -->
          <button
            @click="prevSlide"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#243029]/80 border border-[#708478]/50 text-[#D4A6AD] flex items-center justify-center shadow-lg hover:bg-[#D4A6AD] hover:text-[#18201B] hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <!-- Next Button -->
          <button
            @click="nextSlide"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#243029]/80 border border-[#708478]/50 text-[#D4A6AD] flex items-center justify-center shadow-lg hover:bg-[#D4A6AD] hover:text-[#18201B] hover:scale-110 transition-all duration-300 cursor-pointer"
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
            class="w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-[#243029] cursor-pointer"
            :class="activeIndex === idx ? 'border-[#D4A6AD] scale-110 shadow-[0_0_15px_rgba(212,166,173,0.4)]' : 'border-transparent opacity-50 hover:opacity-90'"
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
    },
  });

  tl.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'power3.out',
  }).to(
    [gridRef.value, carouselRef.value].filter(Boolean),
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
    },
    '-=0.6',
  );
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((st) => st.kill());
});
</script>
