<template>
  <section v-if="stories.length > 0" class="min-h-[100dvh] w-full mx-auto text-center bg-[#fffaf2] overflow-hidden" style="padding-top: 100px; padding-bottom: 100px; padding-left: 20px; padding-right: 20px;">
    <h2 class="text-3xl md:text-4xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">Love Story</h2>
    <div class="flex items-center justify-center gap-4 mb-20 text-[var(--theme-secondary)]">
      <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
      <span class="text-xl">💕</span>
      <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
    </div>
    
    <div class="relative w-full max-w-6xl mx-auto flex flex-col items-center pb-24">
       <div v-for="(story, i) in stories" :key="i" 
           class="flex items-center w-full relative" 
           :style="{ zIndex: 10 + i, marginTop: i > 0 ? '80px' : '0px' }">
        
        <!-- Left Area -->
        <div :class="[!story.photo ? 'flex-1' : (i % 2 === 0 ? 'flex-1' : 'w-2 md:w-8 shrink-0'), 'relative flex flex-col justify-center']" style="padding-left: 15px; padding-right: 15px;">
          
          <!-- TEXT (Even Index) -->
          <div v-if="story.photo && i % 2 === 0" class="text-right">
            <div class="font-bold text-[var(--theme-primary)] text-[10px] md:text-sm mb-1">{{ story.date }}</div>
            <h4 class="font-bold text-sm md:text-2xl text-[var(--theme-primary)] mb-1 md:mb-3 leading-tight">{{ story.title }}</h4>
            <p class="text-[9px] md:text-sm text-[var(--theme-text-light)] leading-relaxed md:line-clamp-none">{{ story.description }}</p>
          </div>

          <!-- BUNGA KIRI (Muncul saat tulisan ada di kanan / Odd Index) -->
          <div v-if="i % 2 === 1" class="absolute inset-0 pointer-events-none -z-10">
            <img src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_3c16b77d-3a6b-4239-8e9e-68a976fd8c71.webp" 
                 class="absolute drop-shadow-sm" style="width: 85px; top: -40px; right: -40px; transform: rotate(-15deg) scaleX(-1);" />
                 
            <img src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_78c5a10f-c4e7-48f8-8e2e-7d7cc702d814.webp" 
                 class="absolute drop-shadow-sm" style="width: 70px; top: 20px; right: -40px; transform: rotate(-10deg) scaleX(-1);" />
                 
            <img src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_ec4bf919-6310-40d6-9313-b276df6d2a7b.webp" 
                 class="absolute drop-shadow-sm" style="width: 110px; bottom: -100px; right: -50px; transform: rotate(-1deg) scaleX(-1);" />
          </div>

        </div>

        <!-- Center Frame (Always in center, alternates rotation) -->
           <div
             :class="[
            !story.photo ? 'w-[240px] md:w-[480px]' : 'w-[140px] md:w-[260px]',
            'shrink-0 relative transition-transform duration-500 hover:scale-105'
             ]"
             :style="{ transform: `rotate(${i % 2 === 0 ? '-4deg' : '4deg'})` }">
          <!-- The Polaroid Frame Background -->
          <img src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_217b045a-3695-41e6-b879-e6738da90277.png" 
               class="absolute inset-0 w-full h-full object-fill pointer-events-none z-0 drop-shadow-xl" 
               alt="Frame" />
          
          <!-- Content Inside Frame -->
          <div class="relative z-10" style="padding: 12% 8% 13% 8%; transform: rotate(-0.2deg) translateY(-3%);"> 
             <!-- Condition 1: Has Photo -->
             <img v-if="story.photo" :src="resolveAssetUrl(story.photo, apiBase)" 
                  class="w-full aspect-[4.5/5] object-cover rounded-[2px]" 
                  :alt="story.title" />
             
             <!-- Condition 2: No Photo (White Card with Text) -->
             <div v-else class="w-full aspect-[4/5] bg-[#ffffff] p-4 md:p-6 flex flex-col items-center justify-center text-center rounded-[2px] overflow-hidden shadow-inner">
                 <div class="font-bold text-[var(--theme-primary)] text-[10px] md:text-xs mb-1 md:mb-2">{{ story.date }}</div>
                 <h4 class="font-bold text-xs md:text-lg text-[var(--theme-primary)] mb-2 md:mb-3 leading-tight">{{ story.title }}</h4>
                 <p class="text-[9px] md:text-xs leading-relaxed text-[var(--theme-text-light)] line-clamp-6 md:line-clamp-none">{{ story.description }}</p>
             </div>
          </div>
        </div>

        <!-- Right Area -->
        <div :class="[!story.photo ? 'flex-1' : (i % 2 === 1 ? 'flex-1' : 'w-2 md:w-8 shrink-0'), 'relative flex flex-col justify-center']" style="padding-left: 15px; padding-right: 15px;">

          <!-- TEXT (Odd Index) -->
          <div v-if="story.photo && i % 2 === 1" class="text-left">
            <div class="font-bold text-[var(--theme-primary)] text-[10px] md:text-sm mb-1">{{ story.date }}</div>
            <h4 class="font-bold text-sm md:text-2xl text-[var(--theme-primary)] mb-1 md:mb-3 leading-tight">{{ story.title }}</h4>
            <p class="text-[9px] md:text-sm text-[var(--theme-text-light)] leading-relaxed md:line-clamp-none">{{ story.description }}</p>
          </div>

          <!-- BUNGA KANAN (Muncul saat tulisan ada di kiri / Even Index) -->
          <div v-if="i % 2 === 0" class="absolute inset-0 pointer-events-none -z-10">
            <img src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_3c16b77d-3a6b-4239-8e9e-68a976fd8c71.webp" 
                 class="absolute drop-shadow-sm" style="width: 85px; top: -40px; left: -40px; transform: rotate(15deg);" />
                 
            <img src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_78c5a10f-c4e7-48f8-8e2e-7d7cc702d814.webp" 
                 class="absolute drop-shadow-sm" style="width: 70px; top: 20px; left: -40px; transform: rotate(10deg);" />
                 
            <img src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_ec4bf919-6310-40d6-9313-b276df6d2a7b.webp" 
                 class="absolute drop-shadow-sm" style="width: 110px; bottom: -100px; left: -50px; transform: rotate(1deg);" />
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { LoveStoryItem } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

defineProps<{
  stories: LoveStoryItem[];
  themeConfig: ThemeConfig;
  apiBase: string;
}>();
</script>
