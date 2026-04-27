<template>
  <!-- Shared Static Background specifically for Floral Blue -->
  <div v-if="stories.length > 0" class="fixed inset-0 z-[-10] pointer-events-none flex items-center justify-center overflow-hidden bg-[var(--theme-bg)]">
    <img src="https://media.mengundanganda.com/floral-blue/randidewi_b6067503-cc9c-40b2-8adf-deaf357fa954.webp" style="height: 100vh; width: auto; max-width: none; opacity: 0.3; object-fit: cover; min-width: 100vw;" />
  </div>

  <section v-if="stories.length > 0" class="py-12 px-4 sm:px-8 max-w-3xl mx-auto text-center my-12 relative min-h-[100dvh] flex flex-col justify-center">
    <h2 class="mb-16 md:mb-24 mt-4 text-[var(--theme-primary)]" style="font-size: clamp(56px, 10vw, 90px); font-weight: 800; margin:60px; text-shadow: 0 2px 4px rgba(0,0,0,0.05);" :style="{ fontFamily: themeConfig.fontHeading }">Love Story</h2>
    
    <div class="relative flex flex-col mt-8 w-full max-w-lg mx-auto" style="padding: 0 16px; gap: 80px;">
      <div v-for="(story, i) in stories" :key="i" class="relative w-full flex flex-col items-center">
        
        <!-- Photo (Polaroid style) on TOP -->
        <div v-if="story.photo" 
             class="relative z-10 bg-[#fdfdfd] shadow-xl"
             :style="[
               { width: 'clamp(180px, 50vw, 240px)', padding: '12px 12px 40px 12px', marginBottom: '-40px' },
               i % 2 === 0 ? { transform: 'rotate(-4deg)' } : { transform: 'rotate(5deg)' }
             ]">
          <!-- Tape Graphic -->
          <div class="absolute top-[-12px] left-1/2 -translate-x-1/2 w-14 h-6 bg-[#9ca3af] opacity-80 shadow-sm" :style="{ transform: i % 2 === 0 ? 'rotate(3deg)' : 'rotate(-2deg)' }"></div>
          <img :src="resolveAssetUrl(story.photo, apiBase)" :alt="story.title" class="w-full h-auto object-cover aspect-square border border-gray-200" />
        </div>

        <!-- Text Card (Notebook style) on BOTTOM -->
        <div class="relative z-0 w-full bg-[#fcfbf9] shadow-md border border-gray-200"
             :style="[
               { minHeight: '200px', backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)', backgroundPosition: '0 16px' },
               story.photo ? { padding: '70px 24px 40px 24px' } : { padding: '40px 24px' }
             ]">
          
          <div class="relative z-10 text-center flex flex-col items-center">
            <h4 class="font-bold text-[var(--theme-primary)] mb-1 bg-[#fcfbf9] px-4" :style="{ fontFamily: themeConfig.fontHeading, fontSize: 'clamp(26px, 7vw, 34px)' }">{{ story.title }}</h4>
            <div class="text-[var(--theme-secondary)] font-bold mb-6 tracking-wider uppercase bg-[#fcfbf9] px-3" style="font-size: 11px;">{{ story.date }}</div>
            
            <p class="leading-relaxed whitespace-pre-line text-[#4b5563]" 
               :style="{ fontFamily: themeConfig.fontBody, fontSize: 'clamp(16px, 4vw, 18px)', letterSpacing: '0.02em' }">
              "{{ story.description }}"
            </p>
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
