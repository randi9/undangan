<template>
  <section ref="coupleSection" class="py-20 md:py-28 px-4 md:px-8 bg-[#F2F5F3] relative overflow-hidden">
    <!-- Ambient Blur -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[700px] bg-[#D8E5DC]/50 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="max-w-4xl mx-auto relative z-10 text-center">
      <!-- Section Header -->
      <div ref="sectionHeader" class="opacity-0 translate-y-6 mb-16">
        <span class="text-xs uppercase tracking-[0.3em] text-[#5C7367] font-semibold block mb-2">Mempelai Pernikahan</span>
        <h2 class="text-3xl md:text-5xl font-serif text-[#2D3E35] font-medium" style="font-family: 'Cormorant Garamond', Georgia, serif;">
          Pasangan Mempelai
        </h2>
        <div class="w-12 h-[1.5px] bg-[#7A9A8B] mx-auto mt-4"></div>
      </div>

      <!-- Couple Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <!-- Groom Card -->
        <div ref="groomCard" class="opacity-0 translate-y-8 flex flex-col items-center">
          <div class="relative w-48 h-64 md:w-56 md:h-72 mb-6 rounded-[100px] overflow-hidden p-2 bg-white/70 border border-[#8B9E8B]/40 shadow-[0_12px_32px_rgba(45,62,53,0.08)]">
            <img
              :src="resolveUrl(invitation.groom_photo)"
              :alt="invitation.groom_name"
              class="w-full h-full object-cover rounded-[90px] transition-transform duration-700 hover:scale-105"
            />
          </div>
          <h3 class="text-2xl md:text-3xl font-serif font-semibold text-[#2D3E35] mb-2" style="font-family: 'Cormorant Garamond', Georgia, serif;">
            {{ invitation.groom_full_name || invitation.groom_name }}
          </h3>
          <p v-if="invitation.groom_father || invitation.groom_mother" class="text-xs md:text-sm text-[#5C7367] leading-relaxed max-w-xs mb-1">
            Putra dari <br />
            <strong class="font-medium text-[#2D3E35]">{{ invitation.groom_father }}</strong>
            <template v-if="invitation.groom_mother"> &amp; <strong class="font-medium text-[#2D3E35]">{{ invitation.groom_mother }}</strong></template>
          </p>
          <p v-if="invitation.groom_origin" class="text-xs text-[#7A9A8B] mt-1 font-medium tracking-wide">
            {{ invitation.groom_origin }}
          </p>
        </div>

        <!-- Bride Card -->
        <div ref="brideCard" class="opacity-0 translate-y-8 flex flex-col items-center">
          <div class="relative w-48 h-64 md:w-56 md:h-72 mb-6 rounded-[100px] overflow-hidden p-2 bg-white/70 border border-[#8B9E8B]/40 shadow-[0_12px_32px_rgba(45,62,53,0.08)]">
            <img
              :src="resolveUrl(invitation.bride_photo)"
              :alt="invitation.bride_name"
              class="w-full h-full object-cover rounded-[90px] transition-transform duration-700 hover:scale-105"
            />
          </div>
          <h3 class="text-2xl md:text-3xl font-serif font-semibold text-[#2D3E35] mb-2" style="font-family: 'Cormorant Garamond', Georgia, serif;">
            {{ invitation.bride_full_name || invitation.bride_name }}
          </h3>
          <p v-if="invitation.bride_father || invitation.bride_mother" class="text-xs md:text-sm text-[#5C7367] leading-relaxed max-w-xs mb-1">
            Putri dari <br />
            <strong class="font-medium text-[#2D3E35]">{{ invitation.bride_father }}</strong>
            <template v-if="invitation.bride_mother"> &amp; <strong class="font-medium text-[#2D3E35]">{{ invitation.bride_mother }}</strong></template>
          </p>
          <p v-if="invitation.bride_origin" class="text-xs text-[#7A9A8B] mt-1 font-medium tracking-wide">
            {{ invitation.bride_origin }}
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
  apiBase: string;
}>();

const coupleSection = ref<HTMLElement | null>(null);
const sectionHeader = ref<HTMLElement | null>(null);
const groomCard = ref<HTMLElement | null>(null);
const brideCard = ref<HTMLElement | null>(null);

const resolveUrl = (url: string | undefined) => {
  if (!url) return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80';
  return resolveAssetUrl(url, props.apiBase);
};

onMounted(() => {
  if (!coupleSection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: coupleSection.value,
      start: 'top 75%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(sectionHeader.value, {
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'power3.out'
  })
  .to([groomCard.value, brideCard.value], {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.25,
    ease: 'power3.out'
  }, "-=0.6");
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
