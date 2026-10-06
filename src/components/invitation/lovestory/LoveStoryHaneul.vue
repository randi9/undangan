<template>
  <section
    v-if="stories && stories.length > 0"
    ref="storySection"
    class="relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-8 box-border overflow-hidden"
    :style="{
      background: '#F4EDE0',
      fontFamily: themeConfig?.fontBody || `'Plus Jakarta Sans', sans-serif`,
    }"
  >
    <!-- Background Decor Elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute top-1/4 -right-20 w-80 h-80 bg-[#A7C7E7]/35 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#CDE0F2]/45 rounded-full blur-3xl"></div>
      <div class="absolute top-16 left-8 text-[#D4AF37] text-lg opacity-40">✦</div>
      <div class="absolute bottom-24 right-8 text-[#D4AF37] text-base opacity-40">✧</div>
    </div>

    <div class="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
      <!-- Section Header -->
      <div ref="headerRef" class="text-center mb-12 sm:mb-16 max-w-xl mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/70 shadow-xs mb-3">
          <span class="text-[#D4AF37] text-xs">✦</span>
          <span class="text-xs uppercase tracking-[0.3em] text-[#386B99] font-bold">
            Journey Of Love
          </span>
          <span class="text-[#D4AF37] text-xs">✦</span>
        </div>
        <h2
          class="text-3xl sm:text-4xl md:text-5xl text-[#1E354D] font-semibold tracking-tight leading-tight"
          :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
        >
          Kisah Cinta Kami
        </h2>
        <div class="w-16 h-1 bg-gradient-to-r from-transparent via-[#7DA8CC] to-transparent mx-auto mt-4 mb-4"></div>
        <p class="text-xs sm:text-sm text-[#5B7B99] leading-relaxed">
          Setiap babak perjalanan mempertemukan dan menyatukan dua hati menuju ikatan suci yang abadi:
        </p>
      </div>

      <!-- Vertical Timeline -->
      <div class="relative w-full flex flex-col gap-10 sm:gap-14 before:absolute before:top-4 before:bottom-4 before:left-4 sm:before:left-1/2 sm:before:-translate-x-1/2 before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-[#7DA8CC]/40 before:to-transparent">
        <div
          v-for="(item, idx) in stories"
          :key="idx"
          :ref="el => setStoryItemRef(el, idx)"
          class="relative flex flex-col sm:flex-row items-center w-full"
          :class="idx % 2 === 0 ? 'sm:flex-row-reverse' : ''"
        >
          <!-- Center Star Node -->
          <div class="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#386B99] shadow-md flex items-center justify-center text-[#D4AF37] z-20 text-xs">
            ✦
          </div>

          <!-- Content Card -->
          <div
            class="w-full sm:w-[45%] pl-12 sm:pl-0 sm:px-2 flex flex-col"
            :class="idx % 2 === 0 ? 'sm:items-start sm:text-left' : 'sm:items-end sm:text-right'"
          >
            <div class="w-full p-6 sm:p-7 rounded-[32px] bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_12px_35px_rgba(44,74,111,0.08)] transition-all duration-300 hover:shadow-[0_16px_45px_rgba(44,74,111,0.12)]">
              <!-- Year / Date Badge -->
              <div
                class="inline-block px-3 py-1 rounded-full bg-[#E3EFF9] text-[#386B99] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs"
              >
                {{ item.date }}
              </div>

              <!-- Title -->
              <h3
                class="text-xl font-bold tracking-tight text-[#1E354D] mb-3"
                :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
              >
                {{ item.title }}
              </h3>

              <!-- Description -->
              <p class="text-xs sm:text-sm text-[#5B7B99] leading-relaxed whitespace-pre-line">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LoveStoryItem } from "@/types/invitation";
import type { ThemeConfig } from "@/types/theme";

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  stories: LoveStoryItem[];
  themeConfig?: ThemeConfig;
  apiBase?: string;
  showDoa?: boolean;
}>();

const storySection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const storyItemRefs = ref<HTMLElement[]>([]);

const setStoryItemRef = (el: any, idx: number) => {
  if (el) storyItemRefs.value[idx] = el;
};

onMounted(() => {
  if (!storySection.value) return;

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
          trigger: storySection.value,
          start: "top 80%",
        },
      }
    );
  }

  storyItemRefs.value.forEach((el, idx) => {
    if (!el) return;
    const isEven = idx % 2 === 0;
    gsap.fromTo(
      el,
      { opacity: 0, x: isEven ? 30 : -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );
  });
});
</script>
