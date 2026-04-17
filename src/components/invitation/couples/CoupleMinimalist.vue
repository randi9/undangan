<template>
  <section ref="coupleSection" class="relative py-24 px-6 max-w-5xl mx-auto text-center overflow-hidden">
    <!-- Subtle Minimalist Decorations -->
    <div class="absolute top-10 left-0 w-32 h-32 bg-gray-100 rounded-full blur-3xl opacity-50 -z-10"></div>
    <div class="absolute bottom-10 right-0 w-40 h-40 bg-gray-100 rounded-full blur-3xl opacity-50 -z-10"></div>

    <div ref="headerRef" class="opacity-0 translate-y-6 mb-20 relative z-10">
      <h2 class="text-3xl md:text-5xl font-light tracking-wide text-gray-800 mb-4" :style="{ fontFamily: themeConfig.fontHeading }">Pelaminan</h2>
      <div class="flex items-center justify-center gap-4 text-gray-300">
        <div class="h-[1px] w-12 bg-gray-300"></div>
        <div class="w-1.5 h-1.5 bg-gray-300 transform rotate-45"></div>
        <div class="h-[1px] w-12 bg-gray-300"></div>
      </div>
    </div>
    
    <div class="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 relative z-10">
      <!-- Groom -->
      <div ref="groomRef" class="flex-1 flex flex-col items-center opacity-0 translate-y-10">
        <div class="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-white border border-gray-100 relative group">
          <img v-if="invitation.groom_photo" :src="resolveAssetUrl(invitation.groom_photo, apiBase)" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Groom" />
          <div v-else class="w-full h-full bg-gray-50 flex items-center justify-center text-4xl text-gray-300">
             <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <!-- Subtle inner ring overlay -->
          <div class="absolute inset-2 border border-white/40 rounded-full pointer-events-none mix-blend-overlay"></div>
        </div>
        <div class="bg-white/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-gray-100/50 shadow-sm w-full max-w-[280px]">
          <h3 class="text-xl md:text-2xl font-medium mb-2 text-gray-800 tracking-wide" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.groom_full_name || invitation.groom_name }}</h3>
          <p v-if="invitation.groom_father || invitation.groom_mother" class="text-xs md:text-sm text-gray-500 uppercase tracking-widest leading-loose">
            Putra dari<br/>
            <span v-if="invitation.groom_father" class="font-medium text-gray-600">{{ invitation.groom_father }}</span>
            <span v-if="invitation.groom_father && invitation.groom_mother" class="mx-1">&amp;</span>
            <span v-if="invitation.groom_mother" class="font-medium text-gray-600">{{ invitation.groom_mother }}</span>
          </p>
        </div>
      </div>
      
      <!-- Divider -->
      <div ref="dividerRef" class="opacity-0 scale-50 text-3xl md:text-5xl text-gray-300 font-light" :style="{ fontFamily: themeConfig.fontHeading }">
        &amp;
      </div>
      
      <!-- Bride -->
      <div ref="brideRef" class="flex-1 flex flex-col items-center opacity-0 translate-y-10">
        <div class="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-white border border-gray-100 relative group">
          <img v-if="invitation.bride_photo" :src="resolveAssetUrl(invitation.bride_photo, apiBase)" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Bride" />
          <div v-else class="w-full h-full bg-gray-50 flex items-center justify-center text-4xl text-gray-300">
             <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <!-- Subtle inner ring overlay -->
          <div class="absolute inset-2 border border-white/40 rounded-full pointer-events-none mix-blend-overlay"></div>
        </div>
        <div class="bg-white/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-gray-100/50 shadow-sm w-full max-w-[280px]">
          <h3 class="text-xl md:text-2xl font-medium mb-2 text-gray-800 tracking-wide" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.bride_full_name || invitation.bride_name }}</h3>
          <p v-if="invitation.bride_father || invitation.bride_mother" class="text-xs md:text-sm text-gray-500 uppercase tracking-widest leading-loose">
            Putri dari<br/>
            <span v-if="invitation.bride_father" class="font-medium text-gray-600">{{ invitation.bride_father }}</span>
            <span v-if="invitation.bride_father && invitation.bride_mother" class="mx-1">&amp;</span>
            <span v-if="invitation.bride_mother" class="font-medium text-gray-600">{{ invitation.bride_mother }}</span>
          </p>
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
import type { Invitation } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  apiBase: string;
}>();

const coupleSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const groomRef = ref<HTMLElement | null>(null);
const brideRef = ref<HTMLElement | null>(null);
const dividerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!coupleSection.value) return;

  // Header entrance
  gsap.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: coupleSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Groom entrance
  gsap.to(groomRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: groomRef.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Divider entrance
  gsap.to(dividerRef.value, {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: dividerRef.value,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  });

  // Bride entrance (staggered slightly)
  gsap.to(brideRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    delay: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: brideRef.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
