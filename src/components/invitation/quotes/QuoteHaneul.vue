<template>
  <section
    v-if="quote"
    ref="quoteSection"
    class="relative min-h-[70dvh] w-full flex flex-col items-center justify-center py-16 px-5 box-border overflow-hidden"
    :style="{
      background: '#F4EDE0',
      fontFamily: themeConfig?.fontBody || `'Plus Jakarta Sans', sans-serif`,
    }"
  >
    <!-- Background Decor Elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute -top-20 -left-20 w-80 h-80 bg-[#CDE0F2]/40 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-20 -right-20 w-80 h-80 bg-[#A7C7E7]/30 rounded-full blur-3xl"></div>
      <div class="absolute top-1/4 right-8 text-[#D4AF37] text-lg opacity-40">✦</div>
      <div class="absolute bottom-1/4 left-8 text-[#D4AF37] text-base opacity-40">✧</div>
    </div>

    <!-- Quote Card -->
    <div
      ref="cardRef"
      class="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center p-8 sm:p-12 rounded-[40px] bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_15px_40px_rgba(44,74,111,0.08)]"
    >
      <!-- Gold Celestial Quotation Icon -->
      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#E2C285]/30 to-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-6 shadow-xs border border-[#E2C285]/40">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      <!-- Quote Body -->
      <p
        class="text-base sm:text-lg md:text-xl text-[#2C4A6F] leading-relaxed sm:leading-loose mb-6 whitespace-pre-line"
        :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
      >
        "{{ parsedQuote.body }}"
      </p>

      <!-- Divider with Star -->
      <div class="flex items-center gap-3 my-2">
        <div class="w-12 h-[1px] bg-[#7DA8CC]/40"></div>
        <span class="text-[#D4AF37] text-xs">✦</span>
        <div class="w-12 h-[1px] bg-[#7DA8CC]/40"></div>
      </div>

      <!-- Source / Surah -->
      <p
        v-if="parsedQuote.source"
        class="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#386B99] mt-3"
      >
        {{ parsedQuote.source }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ThemeConfig } from "@/types/theme";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  quote?: string;
  themeConfig?: ThemeConfig;
}>();

const quoteSection = ref<HTMLElement | null>(null);
const cardRef = ref<HTMLElement | null>(null);

const parsedQuote = computed(() => {
  if (!props.quote) return { body: "", source: "" };
  const raw = props.quote.trim();

  if (raw.includes("\n")) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length > 1) {
      const lastLine = lines[lines.length - 1];
      const bodyLines = lines.slice(0, -1);
      return {
        body: bodyLines.join("\n").replace(/^[“"']+|[”"']+$/g, "").trim(),
        source: (lastLine ?? "").replace(/^[-—–\s]+/, "").trim(),
      };
    }
  }

  const qsMatch = raw.match(
    /^(.*?)(?:[\s—–-]+|\s+)([(]?(?:Q\.S\.|QS\.|Surah|H\.R\.|HR\.|Q\.S|QS)[^)]*[)]?)$/i
  );
  if (qsMatch && qsMatch[1] && qsMatch[2]) {
    return {
      body: qsMatch[1].replace(/^[“"']+|[”"']+$/g, "").trim(),
      source: qsMatch[2].replace(/^[-—–\s]+/, "").trim(),
    };
  }

  return {
    body: raw.replace(/^[“"']+|[”"']+$/g, "").trim(),
    source: "",
  };
});

onMounted(() => {
  if (!quoteSection.value || !cardRef.value) return;

  gsap.fromTo(
    cardRef.value,
    { opacity: 0, y: 35, scale: 0.96 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: quoteSection.value,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
});
</script>
