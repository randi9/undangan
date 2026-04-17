<template>
  <section v-if="stories.length > 0" ref="storySection" class="py-24 px-6 max-w-4xl mx-auto text-center relative overflow-hidden">
    
    <div ref="headerRef" class="opacity-0 translate-y-6 mb-20 relative z-10">
      <h2 class="text-3xl md:text-5xl font-light tracking-wide text-gray-800 mb-4" :style="{ fontFamily: themeConfig.fontHeading }">Kisah Kami</h2>
      <div class="flex items-center justify-center gap-4 text-gray-300">
        <div class="h-[1px] w-8 bg-gray-300"></div>
        <div class="w-1.5 h-1.5 border border-gray-300 transform rotate-45"></div>
        <div class="h-[1px] w-8 bg-gray-300"></div>
      </div>
    </div>
    
    <div class="relative max-w-3xl mx-auto pb-10">
      <!-- The main vertical spine -->
      <div ref="timelineSpine" class="absolute left-4 md:left-1/2 top-4 bottom-0 w-[1px] bg-gray-200 md:-translate-x-1/2 origin-top transform scale-y-0 relative z-0"></div>
      
      <div v-for="(story, i) in stories" :key="i" :ref="el => { if (el) itemRefs[i] = el as HTMLElement }" class="relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 mb-16 last:mb-0 opacity-0 translate-y-12">
        <div class="md:w-1/2 md:pr-14 text-left md:text-right w-full pl-14 md:pl-0">
          <div class="inline-block px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-full font-semibold text-gray-400 text-[10px] tracking-widest uppercase mb-2">{{ story.date }}</div>
        </div>
        
        <!-- Center DOT -->
        <div class="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-gray-800 -translate-x-[7px] md:-translate-x-1/2 mt-1 md:mt-0 z-10 shadow-[0_0_0_4px_rgba(255,255,255,1)]"></div>
        
        <div class="md:w-1/2 md:pl-14 text-left w-full pl-14 md:pl-0">
          <h4 class="font-medium text-2xl text-gray-800 mb-3" :style="{ fontFamily: themeConfig.fontHeading }">{{ story.title }}</h4>
          <div v-if="story.photo" class="rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-4 group inline-block relative max-w-full">
             <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
             <img :src="resolveAssetUrl(story.photo, apiBase)" :alt="story.title" 
                  class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" style="max-height: 240px;" />
          </div>
          <p class="text-[13px] md:text-sm text-gray-500 font-light leading-loose whitespace-pre-line text-justify md:text-left">{{ story.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { LoveStoryItem } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  stories: LoveStoryItem[];
  themeConfig: ThemeConfig;
  apiBase: string;
}>();

const storySection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const timelineSpine = ref<HTMLElement | null>(null);
const itemRefs = ref<HTMLElement[]>([]);

onMounted(() => {
  if (!storySection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: storySection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(headerRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });

  // Draw the timeline line downwards
  tl.to(timelineSpine.value, { scaleY: 1, duration: 2, ease: 'power2.inOut' }, "-=0.5");

  // Show each item consecutively as the line is drawn
  if (itemRefs.value.length) {
    itemRefs.value.forEach((item, i) => {
      tl.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.2)'
      }, "-=1.7" + (i * 0.3)); // Stagger nicely within the drawing line
    });
  }
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
