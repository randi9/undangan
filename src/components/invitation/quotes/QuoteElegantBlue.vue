<template>
  <section ref="sectionRef" v-if="quote" class="relative min-h-[100dvh] flex items-center justify-center py-20 px-6 text-center z-0 overflow-hidden bg-[#f8f9f9]">
    <!-- Background Image -->
    <div class="absolute inset-0 w-full h-full -z-10 pointer-events-none">
      <img src="https://media.mengundanganda.com/elegant_blue/quotes%20section/sashkeh_8b5d1157-ae29-4db2-bc4f-2b0200711e2a.webp"
           class="absolute inset-0 w-full h-full object-cover"
           style="-webkit-mask-image: linear-gradient(183deg, transparent 0%, transparent 6%, rgba(0,0,0,0.02) 15%, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.12) 35%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.32) 55%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.78) 85%, rgba(0,0,0,0.92) 95%, black 100%); mask-image: linear-gradient(183deg, transparent 0%, transparent 6%, rgba(0,0,0,0.02) 15%, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.12) 35%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.32) 55%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.78) 85%, rgba(0,0,0,0.92) 95%, black 100%);"
           alt="Background" />
    </div>

    <!-- Bagian Teks Quote (Silakan atur posisinya manual di sini) -->
    <div class="z-10 w-full flex justify-center" style="position: absolute; top: 15%; left: 0%; width: 100%;">
      <div style="width: 85%; max-width: 260px;">
        <blockquote class="quote-anim italic font-light text-[var(--theme-text)] leading-relaxed tracking-[0.2em] break-words whitespace-pre-line" style="font-size: 0.9rem;">
           "{{ quote }}"
        </blockquote>
      </div>
    </div>

    <!-- Bottom Decoration (Istana) -->
    <img src="https://media.mengundanganda.com/elegant_blue/quotes%20section/sashkeh_ff63884d-b730-4135-97a2-3a187733562c.webp"
         class="absolute bottom-0 left-0 w-full h-auto object-cover max-w-none pointer-events-none z-[5] scroll-anim"
         alt="Bottom Decoration" />

    <!-- 
      KUMPULAN ASSET BOTTOM (Bisa Anda atur sendiri)
      Silakan ubah angka di bagian `style="..."` (bottom, left, width, z-index, dll)
    -->
    <!-- 1. Layer Paling Dasar (Merak 1) -->
    <div class="absolute pointer-events-none scroll-anim" style="z-index: 10; bottom: 50px; left: 170px; width: 40%;">
      <img src="https://media.mengundanganda.com/elegant_blue/quotes%20section/sashkeh_03b1b0b3-28de-4c9b-8371-49dc6fcb3244.webp"
           class="w-full h-auto object-contain max-w-none animate-breathe-1"
           alt="Layer 17" />
    </div>
         
    <!-- 2. Layer Kedua (Daun Kiri) -->
    <div class="absolute pointer-events-none scroll-anim" style="z-index: 11; bottom: -20px; left: -50px; width: 70%;">
      <img src="https://media.mengundanganda.com/elegant_blue/quotes%20section/sashkeh_d4c6cbc2-2900-409f-8739-65d7006f8810.webp"
           class="w-full h-auto object-contain max-w-none animate-sway-left"
           alt="Layer 16" />
    </div>
         
    <!-- 3. Layer Ketiga (Merak 2) -->
    <div class="absolute pointer-events-none scroll-anim" style="z-index: 12; bottom: -50px; left: 120px; width: 60%;">
      <img src="https://media.mengundanganda.com/desain%20web%20elegan%20blue%20(18).png"
           class="https://media.mengundanganda.com/elegant_blue/quotes%20section/randidewi_0c1638a0-9c70-43b1-9f74-fc65f3e5b5da.webp"
           alt="Layer 18" />
    </div>
         
    <!-- 4. Layer Paling Depan (Daun Kanan) -->
    <div class="absolute pointer-events-none scroll-anim" style="z-index: 13; bottom: -50px; right: -20px; width: 30%;">
      <img src="https://media.mengundanganda.com/elegant_blue/quotes%20section/sashkeh_70d47e8b-3654-41cc-b239-d506e37319a5.webp"
           class="w-full h-auto object-contain max-w-none animate-sway-right"
           alt="Layer 15" />
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

onMounted(() => {
  if (!sectionRef.value) return;
  ctx = gsap.context(() => {
    // Animasi teks masuk
    gsap.from(".quote-anim", {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 60%", 
      },
      y: 30, // Efek fade up sedikit
      opacity: 0,
      duration: 2,
      ease: "power3.out",
    });

    // Animasi masuk saat di-scroll (untuk aset bawah)
    gsap.from(".scroll-anim", {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "75% 100%", // Mulai animasi saat section sudah 75% terlihat dari bawah layar
      },
      y: 120, // Muncul dari bawah
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      stagger: 0.2 // Berurutan dengan jeda
    });
  }, sectionRef.value);
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
});
</script>

<style scoped>
@keyframes sway-left {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(2deg); }
}
@keyframes sway-right {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-2deg); }
}

@keyframes breathe-1 {
  0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
  50% { transform: translateY(-2px) scale(1.01) rotate(0.5deg); }
}
@keyframes breathe-2 {
  0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
  50% { transform: translateY(-1px) scale(1.005) rotate(-0.5deg); }
}

.animate-sway-left {
  animation: sway-left 12s ease-in-out infinite;
  transform-origin: bottom left;
}

.animate-sway-right {
  animation: sway-right 14s ease-in-out infinite;
  transform-origin: bottom right;
}

.animate-breathe-1 {
  animation: breathe-1 12s ease-in-out infinite;
  transform-origin: bottom center;
}

.animate-breathe-2 {
  animation: breathe-2 15s ease-in-out infinite;
  transform-origin: bottom center;
  animation-delay: 2s; /* Membuat gerakannya tidak 100% bersamaan dengan merak 1 */
}
</style>
