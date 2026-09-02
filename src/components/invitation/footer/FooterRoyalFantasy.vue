<template>
  <footer
    ref="footerRef"
    class="relative py-24 px-6 text-center overflow-hidden bg-[#18201B] flex flex-col items-center justify-center min-h-[500px]"
  >
    <!-- Ambient Radial Glow -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(circle at 50% 40%, rgba(112, 132, 120, 0.2) 0%, #18201B 80%);"
    ></div>

    <!-- Floating Sparkles -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <span v-for="i in 10" :key="i" class="footer-sparkle text-[#ECE0D3]" :style="getSparkleStyle(i)">✦</span>
    </div>

    <div class="relative z-10 max-w-xl mx-auto flex flex-col items-center">
      <!-- Royal Crown Ornament -->
      <div ref="crownRef" class="w-14 h-14 rounded-full border border-[#708478]/50 bg-[#243029]/80 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(212,166,173,0.3)]">
        <svg class="w-7 h-7 text-[#D4A6AD]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
        </svg>
      </div>

      <!-- Couple Initials / Names -->
      <h2
        class="text-3xl md:text-5xl font-serif text-[#ECE0D3] font-normal mb-4 drop-shadow-[0_2px_12px_rgba(236,224,211,0.3)]"
        :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
      >
        {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
      </h2>

      <!-- Thank you message -->
      <p class="text-xs md:text-sm text-[#ECE0D3]/80 leading-relaxed max-w-md mx-auto mb-16 font-light">
        Terima kasih yang terdalam telah menjadi bagian dari kisah dan hari bahagia kami. Doa restu Anda adalah anugerah terbesar bagi awal perjalanan rumah tangga kami.
      </p>

      <!-- Branding / Powered By -->
      <div class="flex flex-col items-center gap-2 pt-8 border-t border-[#708478]/30 w-full max-w-xs opacity-90">
        <span class="text-[10px] uppercase tracking-[0.3em] text-[#D4A6AD] font-semibold">
          POWERED BY
        </span>
        <a
          href="https://mengundanganda.com"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col items-center gap-2 text-decoration-none hover:scale-105 transition-transform duration-300"
        >
          <img src="/images/logo.webp" alt="MengundangAnda Logo" class="w-10 h-10 object-contain drop-shadow-md" />
          <span class="text-sm font-bold tracking-widest text-[#ECE0D3]">
            Mengundang<span class="text-[#D4A6AD]">Anda</span>
          </span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const footerRef = ref<HTMLElement | null>(null);
const crownRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

function getSparkleStyle(i: number) {
  const top = (i * 19) % 85;
  const left = (i * 27) % 90;
  const size = 8 + (i % 6);
  const delay = (i * 0.4) % 3;
  return {
    top: `${top}%`,
    left: `${left}%`,
    fontSize: `${size}px`,
    animationDelay: `${delay}s`,
  };
}

onMounted(() => {
  if (!footerRef.value) return;

  ctx = gsap.context(() => {
    gsap.from(footerRef.value, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: footerRef.value,
        start: 'top 85%',
      },
    });

    if (crownRef.value) {
      gsap.to(crownRef.value, {
        y: -6,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, footerRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<style scoped>
.footer-sparkle {
  position: absolute;
  color: #F3E5AB;
  opacity: 0.5;
  animation: footerTwinkle 3.5s ease-in-out infinite alternate;
  text-shadow: 0 0 8px rgba(243, 229, 171, 0.7);
}

@keyframes footerTwinkle {
  0% {
    opacity: 0.2;
    transform: scale(0.7) rotate(0deg);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.2) rotate(45deg);
  }
  100% {
    opacity: 0.3;
    transform: scale(0.8) rotate(90deg);
  }
}
</style>
