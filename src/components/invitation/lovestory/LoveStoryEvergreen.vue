<template>
  <section
    v-if="stories && stories.length > 0"
    ref="storySection"
    class="min-h-[100dvh] flex flex-col justify-center py-20 md:py-28 px-4 md:px-8 relative overflow-hidden bg-[#EBF2EE]"
  >
    <!-- Background Image Spanning Entire Section (Full Cover) -->
    <div
      ref="bgImg"
      class="absolute inset-0 z-0 pointer-events-none transform-gpu"
      :style="{
        backgroundImage: `url('${backgroundImage || 'https://media.mengundanganda.com/evergreen/lovestory%20section/dewirandi_58ea9077-7626-4fc9-9599-5b1233a9db3f.webp'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'calc(50% + 7px) center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
      }"
    ></div>

    <div class="max-w-3xl mx-auto w-full relative z-10">
      <!-- Section Header -->
      <div ref="headerRef" class="opacity-0 translate-y-6 text-center mb-16">
        <span class="text-xs uppercase tracking-[0.3em] text-[#5C7367] font-semibold block mb-2">Kisah Cinta</span>
        <h2 class="text-3xl md:text-5xl font-serif text-[#2D3E35] font-medium" style="font-family: 'Cormorant Garamond', Georgia, serif;">
          Cerita Perjalanan Kami
        </h2>
        <div class="w-12 h-[1.5px] bg-[#7A9A8B] mx-auto mt-4"></div>
      </div>

      <!-- Timeline Container -->
      <div class="relative pl-6 md:pl-0">
        <!-- Vertical Line -->
        <div class="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-[#8B9E8B]/40 -translate-x-1/2"></div>

        <!-- Story Items -->
        <div 
          v-for="(item, idx) in stories" 
          :key="idx"
          ref="storyNodes"
          class="relative mb-12 last:mb-0 opacity-0 translate-y-8 flex flex-col md:flex-row items-center group"
          :class="idx % 2 === 0 ? 'md:flex-row-reverse' : ''"
        >
          <!-- Timeline Node Marker -->
          <div class="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-[#4A6B5B] flex items-center justify-center shadow-sm z-10 group-hover:scale-125 transition-transform duration-300">
            <div class="w-2 h-2 rounded-full bg-[#4A6B5B]"></div>
          </div>

          <!-- Content Card -->
          <div class="w-full md:w-[45%] ml-6 md:ml-0">
            <div class="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-[#8B9E8B]/30 shadow-[0_8px_25px_rgba(45,62,53,0.05)]">
              <span class="inline-block px-3.5 py-1 rounded-full bg-[#E3ECE5] text-[#4A6B5B] text-xs font-semibold uppercase tracking-wider mb-3">
                {{ item.date }}
              </span>
              <h3 class="text-xl md:text-2xl font-serif font-semibold text-[#2D3E35] mb-3" style="font-family: 'Cormorant Garamond', Georgia, serif;">
                {{ item.title }}
              </h3>
              <p class="text-xs md:text-sm text-[#5C7367] leading-relaxed whitespace-pre-line">
                {{ item.description }}
              </p>
              
              <div v-if="item.photo" class="mt-4 rounded-2xl overflow-hidden aspect-[4/3]">
                <img 
                  :src="resolveUrl(item.photo)" 
                  :alt="item.title"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
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

const props = withDefaults(
  defineProps<{
    stories: LoveStoryItem[];
    themeConfig?: ThemeConfig;
    apiBase?: string;
    backgroundImage?: string;
  }>(),
  {
    backgroundImage:
      'https://media.mengundanganda.com/evergreen/lovestory%20section/dewirandi_58ea9077-7626-4fc9-9599-5b1233a9db3f.webp',
  }
);

const storySection = ref<HTMLElement | null>(null);
const bgImg = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const storyNodes = ref<HTMLElement[]>([]);

const resolveUrl = (url: string | undefined) => {
  if (!url) return '';
  return resolveAssetUrl(url, props.apiBase || '');
};

onMounted(() => {
  if (bgImg.value) {
    gsap.to(bgImg.value, {
      scale: 1.05,
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    });
  }

  if (!storySection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: storySection.value,
      start: 'top 75%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'power3.out'
  });

  if (storyNodes.value.length > 0) {
    tl.to(storyNodes.value, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      stagger: 0.25,
      ease: 'power3.out'
    }, "-=0.6");
  }
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
