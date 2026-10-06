<template>
  <section
    ref="coupleSection"
    class="relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-8 box-border overflow-hidden"
    :style="{
      background: '#F4EDE0',
      fontFamily: themeConfig?.fontBody || `'Plus Jakarta Sans', sans-serif`,
    }"
  >
    <!-- Background Decor Elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute top-1/4 -left-20 w-96 h-96 bg-[#CDE0F2]/50 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/3 -right-20 w-96 h-96 bg-[#A7C7E7]/40 rounded-full blur-3xl"></div>
      <div class="absolute top-12 left-10 text-[#D4AF37] text-xl opacity-30">✦</div>
      <div class="absolute bottom-16 right-10 text-[#D4AF37] text-lg opacity-30">✧</div>
    </div>

    <div class="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
      <!-- Section Header -->
      <div ref="headerRef" class="text-center mb-12 sm:mb-16 max-w-xl mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/70 shadow-xs mb-3">
          <span class="text-[#D4AF37] text-xs">✦</span>
          <span class="text-xs uppercase tracking-[0.3em] text-[#386B99] font-bold">
            The Happy Couple
          </span>
          <span class="text-[#D4AF37] text-xs">✦</span>
        </div>
        <h2
          class="text-3xl sm:text-4xl md:text-5xl text-[#1E354D] font-semibold tracking-tight leading-tight"
          :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
        >
          Mempelai Yang Berbahagia
        </h2>
        <div class="w-16 h-1 bg-gradient-to-r from-transparent via-[#7DA8CC] to-transparent mx-auto mt-4 mb-4"></div>
        <p class="text-xs sm:text-sm text-[#5B7B99] leading-relaxed">
          Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami bermaksud menyelenggarakan syukuran pernikahan putra-putri kami:
        </p>
      </div>

      <!-- Couple Cards Container -->
      <div class="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 lg:gap-14">
        <!-- Groom Card -->
        <div
          ref="groomCardRef"
          class="w-full max-w-[320px] sm:max-w-[340px] flex flex-col items-center text-center p-6 sm:p-8 rounded-[44px] bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_15px_40px_rgba(44,74,111,0.08)] transition-transform duration-500 hover:-translate-y-1.5"
        >
          <!-- Name & Bio -->
          <span class="text-xs uppercase tracking-[0.25em] text-[#386B99] font-semibold mb-1">
            Mempelai Pria
          </span>
          <h3
            class="text-xl sm:text-3xl font-bold text-[#1E354D] mb-2"
            :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
          >
            {{ invitation.groom_full_name || invitation.groom_name }}
          </h3>

          <p v-if="invitation.groom_origin" class="text-xs text-[#7DA8CC] uppercase tracking-wider font-semibold mb-3">
            {{ invitation.groom_origin }}
          </p>

          <p class="text-xs text-[#5B7B99] leading-relaxed mb-4">
            Putra dari Bapak <strong>{{ invitation.groom_father || '-' }}</strong><br />
            &amp; Ibu <strong>{{ invitation.groom_mother || '-' }}</strong>
          </p>
        </div>

        <!-- Center Intertwined Rings & Star Motif -->
        <div class="flex flex-col items-center my-2 md:my-0">
          <div class="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md border border-[#CDE0F2] flex items-center justify-center shadow-md text-[#D4AF37]">
            <span class="text-3xl font-medium" :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }">&amp;</span>
          </div>
          <div class="w-10 h-0.5 md:h-12 md:w-0.5 bg-[#7DA8CC]/40 my-2"></div>
        </div>

        <!-- Bride Card -->
        <div
          ref="brideCardRef"
          class="w-full max-w-[320px] sm:max-w-[340px] flex flex-col items-center text-center p-6 sm:p-8 rounded-[44px] bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_15px_40px_rgba(44,74,111,0.08)] transition-transform duration-500 hover:-translate-y-1.5"
        >
          <!-- Name & Bio -->
          <span class="text-xs uppercase tracking-[0.25em] text-[#386B99] font-semibold mb-1">
            Mempelai Wanita
          </span>
          <h3
            class="text-xl sm:text-3xl font-bold text-[#1E354D] mb-2"
            :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
          >
            {{ invitation.bride_full_name || invitation.bride_name }}
          </h3>

          <p v-if="invitation.bride_origin" class="text-xs text-[#7DA8CC] uppercase tracking-wider font-semibold mb-3">
            {{ invitation.bride_origin }}
          </p>

          <p class="text-xs text-[#5B7B99] leading-relaxed mb-4">
            Putri dari Bapak <strong>{{ invitation.bride_father || '-' }}</strong><br />
            &amp; Ibu <strong>{{ invitation.bride_mother || '-' }}</strong>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Invitation } from "@/types/invitation";
import type { ThemeConfig } from "@/types/theme";

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  invitation: Invitation;
  themeConfig?: ThemeConfig;
  apiBase?: string;
}>();

const coupleSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const groomCardRef = ref<HTMLElement | null>(null);
const brideCardRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!coupleSection.value) return;

  if (headerRef.value) {
    gsap.fromTo(
      headerRef.value,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: coupleSection.value,
          start: "top 80%",
        },
      }
    );
  }

  if (groomCardRef.value) {
    gsap.fromTo(
      groomCardRef.value,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: coupleSection.value,
          start: "top 70%",
        },
      }
    );
  }

  if (brideCardRef.value) {
    gsap.fromTo(
      brideCardRef.value,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: coupleSection.value,
          start: "top 70%",
        },
      }
    );
  }
});
</script>
