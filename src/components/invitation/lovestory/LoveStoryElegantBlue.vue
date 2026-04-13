<template>
  <section ref="sectionRef" v-if="stories.length > 0" class="relative w-full overflow-hidden" style="background-color: #fffdf5; padding-top: 112px; padding-bottom: 96px;">
    
    <!-- Title Area -->
    <div class="mx-auto relative z-10 w-full text-center px-4" style="max-width: 48rem; margin-bottom: 64px;">
      <h2 ref="titleRef" class="text-3xl md:text-5xl font-bold tracking-widest opacity-0" :style="{ fontFamily: themeConfig.fontHeading, color: '#304851', textShadow: '0 1px 2px rgba(48,72,81,0.05)', transform: 'translateY(24px)', marginBottom: '16px' }">Kisah Cinta</h2>
      <div ref="heartRef" class="flex items-center justify-center gap-4 opacity-0" style="color: rgba(64,92,102,0.5); transform: translateY(24px);">
        <div style="height: 1px; width: 64px; background-color: rgba(64,92,102,0.3);"></div>
        <span style="font-size: 1.25rem;">♥</span>
        <div style="height: 1px; width: 64px; background-color: rgba(64,92,102,0.3);"></div>
      </div>
    </div>

    <!-- Timeline Wrapper -->
    <div class="mx-auto w-full px-6 md:px-12" style="max-width: 48rem;">
      <div class="relative w-full">
        <!-- Vertical fading line (tetap di sisi kiri sepanjang konten) -->
        <div class="absolute top-0 bottom-0" style="left: 23px; width: 2px; background: linear-gradient(180deg, transparent 0%, rgba(64,92,102,0.2) 20%, rgba(64,92,102,0.2) 80%, transparent 100%);"></div>
        
        <!-- Story Items -->
        <div v-for="(story, i) in stories" :key="i" class="relative w-full flex story-item" style="margin-bottom: 64px; opacity: 0; transform: translateY(40px);">
          
          <!-- Central Timeline Dot (Posisikan fix di sisi kiri exact px) -->
          <div class="absolute z-10 flex items-center justify-center rounded-full" style="width: 20px; height: 20px; left: 14px; top: 6px; background-color: #E5B551; border: 2px solid #fffdf5; box-shadow: 0 4px 10px rgba(48,72,81,0.15); transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
             <div class="rounded-full" style="width: 6px; height: 6px; background-color: #fffdf5; opacity: 0.9;"></div>
          </div>

          <!-- Content Container (Semua Teks berada di Kanan Poin dengan padding pasti!) -->
          <div class="w-full text-left" style="padding-left: 64px;">
             <!-- Date Badge -->
             <div class="inline-block rounded-full tracking-widest uppercase font-bold" style="padding: 6px 16px; background-color: #405C66; color: #fffdf5; font-size: 0.75rem; margin-bottom: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                {{ story.date }}
             </div>
             <!-- Title -->
             <h4 class="font-bold text-xl md:text-3xl mb-3" :style="{ fontFamily: themeConfig.fontHeading, color: '#304851' }">{{ story.title }}</h4>
             <!-- Description -->
             <p class="text-sm md:text-base font-light leading-relaxed whitespace-pre-line" style="color: rgba(64, 92, 102, 0.8);">{{ story.description }}</p>
          </div>
          
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { LoveStoryItem } from '@/types/invitation';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  stories: LoveStoryItem[];
  themeConfig: ThemeConfig;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const heartRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context;

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    
    // Title intro
    gsap.to([titleRef.value, heartRef.value], {
      scrollTrigger: {
         trigger: sectionRef.value,
         start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power2.out"
    });

    // Staggered points fade-in per item
    gsap.utils.toArray('.story-item').forEach((item: any) => {
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 80%", // Mulai perlahan ketika 80% bagian dari item muncul (masuk) di layar
        },
        opacity: 1,
        y: 0,
        duration: 1.8,  
        ease: "power2.out"
      });
    });

  }, sectionRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>
