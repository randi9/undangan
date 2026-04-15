<template>
  <section ref="coupleSection" class="py-24 px-6 max-w-5xl mx-auto text-center">
    <!-- Section Header -->
    <div ref="headerRef" class="opacity-0 translate-y-6 mb-16">
      <h2 class="text-3xl md:text-5xl mb-3" :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-primary)' }">Mempelai</h2>
      <div class="flex items-center justify-center gap-4">
        <svg viewBox="0 0 60 2" class="w-12 md:w-16" style="opacity: 0.4;"><rect width="60" height="1.5" rx="0.75" fill="var(--theme-secondary)"/></svg>
        <svg viewBox="0 0 24 24" class="w-5 h-5" style="opacity: 0.5;">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="var(--theme-secondary)"/>
        </svg>
        <svg viewBox="0 0 60 2" class="w-12 md:w-16" style="opacity: 0.4;"><rect width="60" height="1.5" rx="0.75" fill="var(--theme-secondary)"/></svg>
      </div>
    </div>
    
    <div class="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-12">
      <!-- Groom -->
      <div ref="groomRef" class="flex-1 flex flex-col items-center opacity-0 translate-y-8">
        <!-- Photo with gold frame -->
        <div class="relative w-52 h-52 md:w-60 md:h-60 mb-8">
          <!-- Gold frame ring SVG -->
          <svg viewBox="0 0 240 240" class="absolute inset-0 w-full h-full z-[2] pointer-events-none">
            <defs>
              <linearGradient id="couple-frame-gold-g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#e5c875"/>
                <stop offset="50%" style="stop-color:#d4af37"/>
                <stop offset="100%" style="stop-color:#c9a96e"/>
              </linearGradient>
            </defs>
            <circle cx="120" cy="120" r="114" fill="none" stroke="url(#couple-frame-gold-g)" stroke-width="3"/>
            <circle cx="120" cy="120" r="108" fill="none" stroke="url(#couple-frame-gold-g)" stroke-width="1" opacity="0.4"/>
            <!-- Corner accents -->
            <circle cx="120" cy="6" r="3" fill="var(--theme-secondary)" opacity="0.6"/>
            <circle cx="120" cy="234" r="3" fill="var(--theme-secondary)" opacity="0.6"/>
            <circle cx="6" cy="120" r="3" fill="var(--theme-secondary)" opacity="0.6"/>
            <circle cx="234" cy="120" r="3" fill="var(--theme-secondary)" opacity="0.6"/>
          </svg>
          <!-- Photo -->
          <div class="absolute inset-[12px] rounded-full overflow-hidden z-[1]">
            <img v-if="invitation.groom_photo" :src="resolveAssetUrl(invitation.groom_photo, apiBase)" class="w-full h-full object-cover" alt="Groom" />
            <div v-else class="w-full h-full flex items-center justify-center text-4xl" :style="{ backgroundColor: 'var(--theme-surface)', color: 'var(--theme-text-light)' }">👤</div>
          </div>
        </div>
        <h3 class="text-2xl md:text-3xl font-bold mb-3" :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-primary)' }">{{ invitation.groom_full_name || invitation.groom_name }}</h3>
        <p v-if="invitation.groom_father || invitation.groom_mother" class="text-sm md:text-base leading-relaxed" :style="{ color: 'var(--theme-text-light)' }">
          Putra dari<br/>
          <span v-if="invitation.groom_father">Bapak {{ invitation.groom_father }}</span>
          <span v-if="invitation.groom_father && invitation.groom_mother"> &amp; </span>
          <span v-if="invitation.groom_mother">Ibu {{ invitation.groom_mother }}</span>
        </p>
      </div>
      
      <!-- Divider -->
      <div ref="dividerRef" class="opacity-0 scale-50">
        <svg viewBox="0 0 60 80" class="w-12 md:w-16" style="opacity: 0.5;">
          <defs>
            <linearGradient id="ampersand-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#d4af37"/>
              <stop offset="100%" style="stop-color:#c9a96e"/>
            </linearGradient>
          </defs>
          <line x1="30" y1="0" x2="30" y2="25" stroke="var(--theme-secondary)" stroke-width="1" opacity="0.3"/>
          <text x="30" y="52" text-anchor="middle" fill="url(#ampersand-gold)" font-size="32" :style="{ fontFamily: themeConfig.fontHeading }">&amp;</text>
          <line x1="30" y1="62" x2="30" y2="80" stroke="var(--theme-secondary)" stroke-width="1" opacity="0.3"/>
        </svg>
      </div>
      
      <!-- Bride -->
      <div ref="brideRef" class="flex-1 flex flex-col items-center opacity-0 translate-y-8">
        <!-- Photo with gold frame -->
        <div class="relative w-52 h-52 md:w-60 md:h-60 mb-8">
          <svg viewBox="0 0 240 240" class="absolute inset-0 w-full h-full z-[2] pointer-events-none">
            <defs>
              <linearGradient id="couple-frame-gold-b" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#e5c875"/>
                <stop offset="50%" style="stop-color:#d4af37"/>
                <stop offset="100%" style="stop-color:#c9a96e"/>
              </linearGradient>
            </defs>
            <circle cx="120" cy="120" r="114" fill="none" stroke="url(#couple-frame-gold-b)" stroke-width="3"/>
            <circle cx="120" cy="120" r="108" fill="none" stroke="url(#couple-frame-gold-b)" stroke-width="1" opacity="0.4"/>
            <circle cx="120" cy="6" r="3" fill="var(--theme-secondary)" opacity="0.6"/>
            <circle cx="120" cy="234" r="3" fill="var(--theme-secondary)" opacity="0.6"/>
            <circle cx="6" cy="120" r="3" fill="var(--theme-secondary)" opacity="0.6"/>
            <circle cx="234" cy="120" r="3" fill="var(--theme-secondary)" opacity="0.6"/>
          </svg>
          <div class="absolute inset-[12px] rounded-full overflow-hidden z-[1]">
            <img v-if="invitation.bride_photo" :src="resolveAssetUrl(invitation.bride_photo, apiBase)" class="w-full h-full object-cover" alt="Bride" />
            <div v-else class="w-full h-full flex items-center justify-center text-4xl" :style="{ backgroundColor: 'var(--theme-surface)', color: 'var(--theme-text-light)' }">👤</div>
          </div>
        </div>
        <h3 class="text-2xl md:text-3xl font-bold mb-3" :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-primary)' }">{{ invitation.bride_full_name || invitation.bride_name }}</h3>
        <p v-if="invitation.bride_father || invitation.bride_mother" class="text-sm md:text-base leading-relaxed" :style="{ color: 'var(--theme-text-light)' }">
          Putri dari<br/>
          <span v-if="invitation.bride_father">Bapak {{ invitation.bride_father }}</span>
          <span v-if="invitation.bride_father && invitation.bride_mother"> &amp; </span>
          <span v-if="invitation.bride_mother">Ibu {{ invitation.bride_mother }}</span>
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
