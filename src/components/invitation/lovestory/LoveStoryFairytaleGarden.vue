<template>
  <section v-if="stories.length > 0" ref="lovestorySection" class="py-24 px-6 max-w-4xl mx-auto text-center rounded-[2.5rem] mb-24 relative overflow-hidden bg-[#F8F3EE]" 
           :style="{ border: '1px solid rgba(154,123,107,0.15)', boxShadow: '0 20px 40px rgba(106,78,66,0.02)' }">
    
    <!-- Decorative patterns (Botanical / fairytale aura) -->
    <div class="absolute top-0 left-0 w-32 h-32 opacity-20 pointer-events-none" style="background: radial-gradient(circle at top left, #AEB8A3, transparent 70%);"></div>
    <div class="absolute bottom-0 right-0 w-32 h-32 opacity-20 pointer-events-none" style="background: radial-gradient(circle at bottom right, #D9A9AF, transparent 70%);"></div>

    <!-- Header -->
    <div ref="headerRef" class="opacity-0 translate-y-6 relative z-10">
      <h2 class="text-3xl md:text-5xl mb-3 text-[#D9A9AF]" :style="{ fontFamily: themeConfig.fontHeading }">Love Story</h2>
      <div class="flex items-center justify-center gap-4 mb-16 text-[#AEB8A3]">
        <svg viewBox="0 0 60 2" class="w-12 md:w-16" style="opacity: 0.4;"><rect width="60" height="1.5" rx="0.75" fill="currentColor"/></svg>
        <svg viewBox="0 0 24 24" class="w-5 h-5 text-[#D9A9AF]" style="opacity: 0.8;">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
        </svg>
        <svg viewBox="0 0 60 2" class="w-12 md:w-16" style="opacity: 0.4;"><rect width="60" height="1.5" rx="0.75" fill="currentColor"/></svg>
      </div>
    </div>
    
    <div class="relative max-w-3xl mx-auto z-10">
      <!-- Main vertical line -->
      <div ref="timelineLineRef" class="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 md:-translate-x-1/2 origin-top scale-y-0 bg-gradient-to-b from-transparent via-[#AEB8A3] to-transparent"></div>
      
      <div v-for="(story, i) in stories" :key="i" 
           :ref="el => { if (el) storyRefs[i] = el as HTMLElement }"
           class="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 mb-16 last:mb-0 opacity-0"
           :class="i % 2 === 0 ? '-translate-x-10 md:-translate-x-16' : '-translate-x-10 md:translate-x-16'">
        
        <!-- Left Side (Date) -->
        <div class="md:w-1/2 md:pr-14 text-left md:text-right w-full pl-14 md:pl-0">
          <div class="inline-block px-4 py-1.5 rounded-full border mb-3 md:mb-1 shadow-sm backdrop-blur-sm border-[#EBCFD1] bg-white">
            <span class="font-bold tracking-widest text-xs uppercase text-[#D9A9AF]">{{ story.date }}</span>
          </div>
          <h4 class="font-normal text-xl md:hidden mb-2 text-[#6A4E42]" :style="{ fontFamily: themeConfig.fontHeading }">{{ story.title }}</h4>
          <img v-if="story.photo" :src="resolveAssetUrl(story.photo, apiBase)" :alt="story.title" 
               class="md:hidden w-full aspect-[4/3] rounded-xl mb-3 object-cover shadow-sm border border-[#EBCFD1]" />
        </div>
        
        <!-- Center Flower Node -->
        <div class="absolute left-4 md:left-1/2 -translate-x-[7px] md:-translate-x-1/2 mt-7 md:mt-0 z-10 flex items-center justify-center">
          <div class="absolute w-8 h-8 rounded-full bg-[#EBCFD1]/30 animate-ping duration-1000"></div>
          <svg viewBox="0 0 24 24" class="w-7 h-7 text-[#D9A9AF]">
            <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" fill="#F8F3EE" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="12" r="3" fill="#AEB8A3"/>
          </svg>
        </div>
        
        <!-- Right Side (Content) -->
        <div class="md:w-1/2 md:pl-14 text-left w-full pl-14 md:pl-0">
          <h4 class="font-normal text-xl mb-3 hidden md:block text-[#6A4E42]" :style="{ fontFamily: themeConfig.fontHeading }">{{ story.title }}</h4>
          <img v-if="story.photo" :src="resolveAssetUrl(story.photo, apiBase)" :alt="story.title" 
               class="hidden md:block w-full aspect-[4/3] rounded-xl mb-4 object-cover shadow-sm border border-[#EBCFD1]" />
          <p class="text-sm leading-relaxed whitespace-pre-line text-[#6A4E42]">{{ story.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
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

const lovestorySection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const timelineLineRef = ref<HTMLElement | null>(null);
const storyRefs = ref<HTMLElement[]>([]);

onMounted(() => {
  if (!lovestorySection.value) return;

  // Header entrance
  gsap.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: lovestorySection.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // Timeline vertical line grows downward
  if (timelineLineRef.value) {
    gsap.to(timelineLineRef.value, {
      scaleY: 1,
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: timelineLineRef.value,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
  }

  // Story items stagger in from sides
  if (storyRefs.value.length > 0) {
    storyRefs.value.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }
});
</script>
