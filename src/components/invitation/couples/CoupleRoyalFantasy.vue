<template>
  <section ref="coupleSection" class="relative py-24 px-4 md:px-8 bg-[#18201B] overflow-hidden text-center">
    <!-- Ambient Glow -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(circle at 50% 30%, rgba(112, 132, 120, 0.2) 0%, transparent 70%);"
    ></div>

    <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
      <!-- Section Header -->
      <div ref="headerRef" class="opacity-0 translate-y-6 mb-16 text-center">
        <div class="flex items-center justify-center gap-2 mb-2">
          <span class="text-[#D4A6AD] text-xs">✦</span>
          <span class="text-xs uppercase tracking-[0.35em] text-[#D4A6AD] font-semibold">Mempelai Kerajaan</span>
          <span class="text-[#D4A6AD] text-xs">✦</span>
        </div>
        <h2
          class="text-3xl md:text-5xl font-serif text-[#ECE0D3] font-normal"
          :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
        >
          Pasangan Mempelai
        </h2>
        <p class="text-[#D4A6AD] text-xs md:text-sm mt-3 max-w-md mx-auto leading-relaxed">
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan kami:
        </p>
        <div class="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#708478] to-transparent mx-auto mt-4"></div>
      </div>

      <!-- Couple Profiles Grid -->
      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-stretch">
        <!-- Groom Card -->
        <div
          ref="groomRef"
          class="couple-card relative py-10 px-6 rounded-3xl border border-[#708478]/50 bg-[#243029]/80 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_25px_rgba(212,166,173,0.1)] flex flex-col items-center opacity-0 translate-y-8"
        >
          <!-- Corner Accents -->
          <span class="absolute top-2 left-3 text-[#D4A6AD]/60 text-xs">❖</span>
          <span class="absolute top-2 right-3 text-[#D4A6AD]/60 text-xs">❖</span>

          <!-- Photo with Royal Arch Frame -->
          <div class="relative w-44 h-56 mb-6 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#D4A6AD]/60 shadow-[0_0_25px_rgba(212,166,173,0.25)] bg-[#18201B]">
            <img
              v-if="invitation.groom_photo"
              :src="resolveUrl(invitation.groom_photo)"
              :alt="invitation.groom_name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-[#D4A6AD]/50">
              <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>

          <!-- Groom Info -->
          <h3
            class="text-2xl md:text-3xl text-[#ECE0D3] font-normal mb-1 drop-shadow-sm"
            :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
          >
            {{ invitation.groom_name }}
          </h3>
          <p class="text-sm font-semibold text-[#D4A6AD] tracking-wider mb-3">
            {{ invitation.groom_full_name || invitation.groom_name }}
          </p>

          <p class="text-xs text-[#ECE0D3]/80 leading-relaxed max-w-xs mb-4">
            Putra tercinta dari:
            <br />
            <strong class="text-[#ECE0D3]">{{ invitation.groom_father }}</strong>
            <br />
            &amp;
            <br />
            <strong class="text-[#ECE0D3]">{{ invitation.groom_mother }}</strong>
          </p>

          <p v-if="invitation.groom_origin" class="text-[11px] text-[#D4A6AD] tracking-wide mt-auto">
            📍 {{ invitation.groom_origin }}
          </p>
        </div>

        <!-- Bride Card -->
        <div
          ref="brideRef"
          class="couple-card relative py-10 px-6 rounded-3xl border border-[#708478]/50 bg-[#243029]/80 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_25px_rgba(212,166,173,0.1)] flex flex-col items-center opacity-0 translate-y-8"
        >
          <!-- Corner Accents -->
          <span class="absolute top-2 left-3 text-[#D4A6AD]/60 text-xs">❖</span>
          <span class="absolute top-2 right-3 text-[#D4A6AD]/60 text-xs">❖</span>

          <!-- Photo with Royal Arch Frame -->
          <div class="relative w-44 h-56 mb-6 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#D4A6AD]/60 shadow-[0_0_25px_rgba(212,166,173,0.25)] bg-[#18201B]">
            <img
              v-if="invitation.bride_photo"
              :src="resolveUrl(invitation.bride_photo)"
              :alt="invitation.bride_name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-[#D4A6AD]/50">
              <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>

          <!-- Bride Info -->
          <h3
            class="text-2xl md:text-3xl text-[#ECE0D3] font-normal mb-1 drop-shadow-sm"
            :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
          >
            {{ invitation.bride_name }}
          </h3>
          <p class="text-sm font-semibold text-[#D4A6AD] tracking-wider mb-3">
            {{ invitation.bride_full_name || invitation.bride_name }}
          </p>

          <p class="text-xs text-[#ECE0D3]/80 leading-relaxed max-w-xs mb-4">
            Putri tercinta dari:
            <br />
            <strong class="text-[#ECE0D3]">{{ invitation.bride_father }}</strong>
            <br />
            &amp;
            <br />
            <strong class="text-[#ECE0D3]">{{ invitation.bride_mother }}</strong>
          </p>

          <p v-if="invitation.bride_origin" class="text-[11px] text-[#D4A6AD] tracking-wide mt-auto">
            📍 {{ invitation.bride_origin }}
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
import type { Invitation } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';
import { resolveAssetUrl } from '@/utils/url';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  apiBase?: string;
}>();

const coupleSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const groomRef = ref<HTMLElement | null>(null);
const brideRef = ref<HTMLElement | null>(null);

const resolveUrl = (url: string | undefined) => {
  if (!url) return '';
  return resolveAssetUrl(url, props.apiBase || '');
};

onMounted(() => {
  if (!coupleSection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: coupleSection.value,
      start: 'top 75%',
    },
  });

  tl.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
  }).to(
    [groomRef.value, brideRef.value],
    {
      opacity: 1,
      y: 0,
      duration: 1.0,
      stagger: 0.2,
      ease: 'power3.out',
    },
    '-=0.4',
  );
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((st) => st.kill());
});
</script>
