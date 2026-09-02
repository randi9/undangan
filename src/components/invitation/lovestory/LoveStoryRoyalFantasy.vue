<template>
  <section
    v-if="stories && stories.length > 0"
    ref="storySection"
    class="relative py-24 px-4 md:px-8 bg-[#18201B] overflow-hidden text-center"
  >
    <!-- Ambient Glow -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(circle at 50% 40%, rgba(112, 132, 120, 0.2) 0%, transparent 70%);"
    ></div>

    <div class="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
      <!-- Section Header -->
      <div ref="headerRef" class="opacity-0 translate-y-6 mb-16 text-center">
        <div class="flex items-center justify-center gap-2 mb-2">
          <span class="text-[#D4A6AD] text-xs">✦</span>
          <span class="text-xs uppercase tracking-[0.35em] text-[#D4A6AD] font-semibold">Kisah Cinta</span>
          <span class="text-[#D4A6AD] text-xs">✦</span>
        </div>
        <h2
          class="text-3xl md:text-5xl font-serif text-[#ECE0D3] font-normal"
          :style="{ fontFamily: themeConfig?.fontHeading || `'Cinzel Decorative', serif` }"
        >
          Cerita Perjalanan Kami
        </h2>
        <p class="text-xs md:text-sm text-[#D4A6AD] mt-3 max-w-md mx-auto leading-relaxed">
          Setiap momen dan cerita indah yang mengantarkan kami menuju gerbang kebahagiaan
        </p>
        <div class="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#708478] to-transparent mx-auto mt-4"></div>
      </div>

      <!-- Timeline Stories -->
      <div class="w-full flex flex-col gap-8">
        <div
          v-for="(item, idx) in stories"
          :key="idx"
          ref="storyCards"
          class="story-card relative p-6 md:p-8 rounded-3xl border border-[#708478]/50 bg-[#243029]/80 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(212,166,173,0.1)] text-left flex flex-col opacity-0 translate-y-8"
        >
          <!-- Corner Accents -->
          <span class="absolute top-3 left-4 text-[#D4A6AD]/60 text-xs">❖</span>
          <span class="absolute top-3 right-4 text-[#D4A6AD]/60 text-xs">❖</span>

          <!-- Year / Date Badge -->
          <div class="mb-4">
            <span class="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#18201B] bg-gradient-to-r from-[#D4A6AD] via-[#ECE0D3] to-[#D4A6AD] shadow-sm">
              {{ item.date }}
            </span>
          </div>

          <!-- Story Title -->
          <h3
            class="text-xl md:text-2xl font-normal text-[#ECE0D3] mb-3"
            :style="{ fontFamily: themeConfig?.fontHeading || `'Cinzel Decorative', serif` }"
          >
            {{ item.title }}
          </h3>

          <!-- Story Description -->
          <p class="text-xs md:text-sm text-[#ECE0D3]/80 leading-relaxed whitespace-pre-line mb-4 font-light">
            {{ item.description }}
          </p>

          <!-- Story Photo (if exists) -->
          <div
            v-if="item.photo"
            class="mt-2 w-full rounded-2xl overflow-hidden border border-[#708478]/40 aspect-[16/9] shadow-md bg-black/40"
          >
            <img
              :src="resolveUrl(item.photo)"
              :alt="item.title"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LoveStoryItem } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';
import { resolveAssetUrl } from '@/utils/url';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  stories: LoveStoryItem[];
  themeConfig?: ThemeConfig;
  apiBase?: string;
}>();

const storySection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const storyCards = ref<HTMLElement[]>([]);

let ctx: gsap.Context | null = null;

const resolveUrl = (url: string | undefined) => {
  if (!url) return '';
  return resolveAssetUrl(url, props.apiBase || '');
};

onMounted(() => {
  if (!storySection.value) return;

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: storySection.value,
        start: 'top 80%',
      },
    });

    if (headerRef.value) {
      tl.to(headerRef.value, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    }

    storyCards.value.forEach((card, idx) => {
      if (!card) return;
      tl.to(
        card,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
        },
        idx === 0 ? '-=0.4' : '-=0.6',
      );
    });
  }, storySection.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>
