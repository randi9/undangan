<template>
  <section ref="coupleSection" class="py-24 px-6 max-w-5xl mx-auto text-center bg-[#F8F3EE]">
    <!-- Section Header -->
    <div ref="headerRef" class="opacity-0 translate-y-6 mb-16">
      <h2 class="text-3xl md:text-5xl mb-3 text-[#D9A9AF]" :style="{ fontFamily: themeConfig.fontHeading }">Mempelai</h2>
      <div class="flex items-center justify-center gap-4">
        <svg viewBox="0 0 60 2" class="w-12 md:w-16" style="opacity: 0.4;"><rect width="60" height="1.5" rx="0.75" fill="#AEB8A3"/></svg>
        <svg viewBox="0 0 24 24" class="w-5 h-5 text-[#D9A9AF]" style="opacity: 0.8;">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
        </svg>
        <svg viewBox="0 0 60 2" class="w-12 md:w-16" style="opacity: 0.4;"><rect width="60" height="1.5" rx="0.75" fill="#AEB8A3"/></svg>
      </div>
    </div>
    
    <div class="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-12">
      <!-- Groom -->
      <div ref="groomRef" class="flex-1 flex flex-col items-center opacity-0 translate-y-8">
        <!-- Photo with botanical frame -->
        <div class="relative w-52 h-52 md:w-60 md:h-60 mb-8">
          <!-- Sage Green Ring with Leaf Details -->
          <svg viewBox="0 0 240 240" class="absolute inset-0 w-full h-full z-[2] pointer-events-none text-[#AEB8A3]">
            <circle cx="120" cy="120" r="114" fill="none" stroke="currentColor" stroke-width="2" />
            <circle cx="120" cy="120" r="110" fill="none" stroke="#D9A9AF" stroke-width="1" stroke-dasharray="4,4" />
            <!-- Little flower ornaments on circular border -->
            <circle cx="120" cy="6" r="5" fill="#EBCFD1" stroke="#6A4E42" stroke-width="1" />
            <circle cx="120" cy="234" r="5" fill="#EBCFD1" stroke="#6A4E42" stroke-width="1" />
            <circle cx="6" cy="120" r="5" fill="#EBCFD1" stroke="#6A4E42" stroke-width="1" />
            <circle cx="234" cy="120" r="5" fill="#EBCFD1" stroke="#6A4E42" stroke-width="1" />
          </svg>
          <!-- Photo -->
          <div class="absolute inset-[12px] rounded-full overflow-hidden z-[1]">
            <img v-if="invitation.groom_photo" :src="resolveAssetUrl(invitation.groom_photo, apiBase)" class="w-full h-full object-cover" alt="Groom" />
            <div v-else class="w-full h-full flex items-center justify-center text-4xl bg-[#EBCFD1] text-[#6A4E42]">👤</div>
          </div>
        </div>
        <h3 class="text-2xl md:text-3xl font-normal mb-3 text-[#6A4E42]" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.groom_full_name || invitation.groom_name }}</h3>
        <p v-if="invitation.groom_father || invitation.groom_mother" class="text-sm md:text-base leading-relaxed text-[#9A7B6B]">
          Putra dari<br/>
          <span v-if="invitation.groom_father" class="text-[#6A4E42] font-semibold">Bapak {{ invitation.groom_father }}</span>
          <span v-if="invitation.groom_father && invitation.groom_mother"> &amp; </span>
          <span v-if="invitation.groom_mother" class="text-[#6A4E42] font-semibold">Ibu {{ invitation.groom_mother }}</span>
        </p>
      </div>
      
      <!-- Divider -->
      <div ref="dividerRef" class="opacity-0 scale-50">
        <svg viewBox="0 0 60 80" class="w-12 md:w-16" style="opacity: 0.5;">
          <line x1="30" y1="0" x2="30" y2="25" stroke="#AEB8A3" stroke-width="1" opacity="0.6"/>
          <text x="30" y="52" text-anchor="middle" fill="#D9A9AF" font-size="36" :style="{ fontFamily: themeConfig.fontHeading }">&amp;</text>
          <line x1="30" y1="62" x2="30" y2="80" stroke="#AEB8A3" stroke-width="1" opacity="0.6"/>
        </svg>
      </div>
      
      <!-- Bride -->
      <div ref="brideRef" class="flex-1 flex flex-col items-center opacity-0 translate-y-8">
        <!-- Photo with botanical frame -->
        <div class="relative w-52 h-52 md:w-60 md:h-60 mb-8">
          <svg viewBox="0 0 240 240" class="absolute inset-0 w-full h-full z-[2] pointer-events-none text-[#AEB8A3]">
            <circle cx="120" cy="120" r="114" fill="none" stroke="currentColor" stroke-width="2" />
            <circle cx="120" cy="120" r="110" fill="none" stroke="#D9A9AF" stroke-width="1" stroke-dasharray="4,4" />
            <circle cx="120" cy="6" r="5" fill="#EBCFD1" stroke="#6A4E42" stroke-width="1" />
            <circle cx="120" cy="234" r="5" fill="#EBCFD1" stroke="#6A4E42" stroke-width="1" />
            <circle cx="6" cy="120" r="5" fill="#EBCFD1" stroke="#6A4E42" stroke-width="1" />
            <circle cx="234" cy="120" r="5" fill="#EBCFD1" stroke="#6A4E42" stroke-width="1" />
          </svg>
          <div class="absolute inset-[12px] rounded-full overflow-hidden z-[1]">
            <img v-if="invitation.bride_photo" :src="resolveAssetUrl(invitation.bride_photo, apiBase)" class="w-full h-full object-cover" alt="Bride" />
            <div v-else class="w-full h-full flex items-center justify-center text-4xl bg-[#EBCFD1] text-[#6A4E42]">👤</div>
          </div>
        </div>
        <h3 class="text-2xl md:text-3xl font-normal mb-3 text-[#6A4E42]" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.bride_full_name || invitation.bride_name }}</h3>
        <p v-if="invitation.bride_father || invitation.bride_mother" class="text-sm md:text-base leading-relaxed text-[#9A7B6B]">
          Putri dari<br/>
          <span v-if="invitation.bride_father" class="text-[#6A4E42] font-semibold">Bapak {{ invitation.bride_father }}</span>
          <span v-if="invitation.bride_father && invitation.bride_mother"> &amp; </span>
          <span v-if="invitation.bride_mother" class="text-[#6A4E42] font-semibold">Ibu {{ invitation.bride_mother }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
    duration: 1,
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
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });

  // Divider entrance
  gsap.to(dividerRef.value, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: 'back.out(1.4)',
    scrollTrigger: {
      trigger: dividerRef.value,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });

  // Bride entrance (slight delay after groom)
  gsap.to(brideRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    delay: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: brideRef.value,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
});
</script>
