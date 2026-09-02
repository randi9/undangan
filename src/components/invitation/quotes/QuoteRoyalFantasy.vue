<template>
  <section ref="sectionRef" v-if="quote" class="relative min-h-[100dvh] flex items-center justify-center py-20 px-6 text-center z-0 overflow-hidden bg-[#aed4da]">
    <!-- Ambient Radial Glow -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.45) 0%, rgba(174, 212, 218, 0) 75%);"
    ></div>

    <!-- ===== ASET TENGAH SECTION — tinggal ubah ANGKA =====
         LEBAR (px)  : ganti angka width (makin besar makin lebar)
         GESER KIRI/KANAN: ganti angka "50%" di left (50% = tengah pas)
         NAIK/TURUN  : ganti angka "50%" di top, atau geser di translate kedua:
                       translateY(-50%) = tengah pas → tambah/kurangi angka (misal translateY(-40%) = turun, translateY(-60%) = naik)
    -->
    <img
      src="https://media.mengundanganda.com/royalfantasy/quotes%20section/dewirandi_166a6302-36de-4993-8b89-c050c059387a.webp"
      alt=""
      style="
        position: absolute;
        z-index: 0;
        pointer-events: none;
        user-select: none;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 450px;
        max-width: none;
        height: auto;
        top: 50%;
      "
    />
    <!-- =================================================== -->

    <!-- Floating Sparkles -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <span v-for="i in 8" :key="i" class="quote-sparkle" :style="getSparkleStyle(i)">✦</span>
    </div>

    <!-- Quote Card Container — SEMENTARA DISEMBUNYIKAN (hapus `false &&` untuk menampilkannya lagi) -->
    <div v-if="false && quote" class="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center">
      <div class="quote-card w-full py-12 px-8 rounded-3xl border border-[#708478]/40 bg-white/65 backdrop-blur-md shadow-[0_12px_40px_rgba(36,48,41,0.18),0_0_25px_rgba(176,128,138,0.12)]">
        <!-- Top Ornament (Royal Filigree) -->
        <div class="flex items-center justify-center gap-3 mb-6">
          <div class="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#B0808A]"></div>
          <svg class="w-6 h-6 text-[#B0808A]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 5.6L20 10l-4.2 4 1.2 5.8-5-3-5 3 1.2-5.8L4 10l5.6-2.4L12 2z"/>
          </svg>
          <div class="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#B0808A]"></div>
        </div>

        <!-- Quote Text -->
        <blockquote
          class="quote-text text-[#243029] text-base md:text-lg lg:text-xl italic leading-relaxed tracking-wide font-serif mb-6"
          :style="{ fontFamily: themeConfig.fontHeading || `'Playfair Display', serif` }"
        >
          "{{ quote }}"
        </blockquote>

        <!-- Bottom Ornament -->
        <div class="flex items-center justify-center gap-2">
          <span class="text-[#B0808A]/70 text-xs">❖</span>
          <div class="w-16 h-[1px] bg-[#B0808A]/40"></div>
          <span class="text-[#B0808A]/70 text-xs">❖</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  quote: string;
  themeConfig: ThemeConfig;
}>();

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

function getSparkleStyle(i: number) {
  const top = (i * 23) % 85;
  const left = (i * 29) % 90;
  const size = 10 + (i % 6);
  const delay = (i * 0.5) % 3;
  return {
    top: `${top}%`,
    left: `${left}%`,
    fontSize: `${size}px`,
    animationDelay: `${delay}s`,
  };
}

onMounted(() => {
  if (!sectionRef.value) return;
  ctx = gsap.context(() => {
    gsap.from('.quote-card', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });
  }, sectionRef.value);
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
});
</script>

<style scoped>
.quote-sparkle {
  position: absolute;
  color: #B0808A;
  opacity: 0.5;
  animation: quoteTwinkle 4s ease-in-out infinite alternate;
  text-shadow: 0 0 10px rgba(176, 128, 138, 0.5);
}

@keyframes quoteTwinkle {
  0% {
    opacity: 0.15;
    transform: scale(0.7) rotate(0deg);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2) rotate(45deg);
  }
  100% {
    opacity: 0.2;
    transform: scale(0.9) rotate(90deg);
  }
}
</style>
