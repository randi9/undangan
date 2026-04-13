<template>
  <section ref="sectionRef" v-if="hasDate" style="padding-top:40px;" class="py-10 pb-[15%] overflow-hidden relative min-h-[66vh] flex flex-col items-center justify-start px-6 text-center bg-[var(--theme-surface)]">
    
    <!-- Awan Kiri (Muncul sedikit dari kiri, Gerak Pelan Biasa) -->
    <img src="https://media.mengundanganda.com/tema%20floral/coundown%20section/7180e6da-fcc2-44b7-b8d4-ffaa3f73b346.webp" 
         class="absolute z-0 pointer-events-none cloud-sweep-fast" 
         style="top: 2%; left: 0; width: clamp(200px, 40vw, 400px);" />

    <!-- Awan Kanan (Start dari tengah agak kanan, Pelan Banget) -->
    <img src="https://media.mengundanganda.com/tema%20floral/coundown%20section/9f8283e2-3722-4b71-8eb6-86b67cb8b9ef.webp" 
         class="absolute z-0 pointer-events-none cloud-sweep-slow" 
         style="top: 8%; left: 0; width: clamp(250px, 45vw, 450px);" />
    <div class="relative z-10 flex flex-col items-center w-full">
    <h2 class="text-[40px] md:text-4xl text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">Menghitung Hari</h2>
    <p style="font-size: 12px"; class="text-[var(--theme-text-light)] md:text-base tracking-widest uppercase mt-3 mb-2">Menuju Momen Bahagia Kami</p>
    
    <div class="flex justify-center flex-wrap mx-auto relative z-10 w-full mt-10 md:mt-16 gap-3 md:gap-6 px-4 md:px-8" style="margin-top:100px">
      <!-- HARI -->
      <div class="flex flex-col items-center w-16 md:w-20 relative">
        <div class="relative z-10 text-[var(--theme-primary)]" style="display: flex; justify-content: center; font-size: clamp(2rem, 7vw, 4.5rem); font-weight: 300; margin-bottom: 0.8rem; font-family: 'Oswald', sans-serif;">
          <CountdownDigit 
            v-for="(digit, index) in formatNumber(countdown.days)" 
            :key="`days-${index}`" 
            :target="digit"
            :isIntersecting="isVisible"
          />
        </div>
        <div class="relative z-10 text-[var(--theme-text-light)]" style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.25rem; font-weight: 400;">Hari</div>
      </div>

      <!-- JAM -->
      <div class="flex flex-col items-center w-16 md:w-20 relative">
        <div class="relative z-10 text-[var(--theme-primary)]" style="display: flex; justify-content: center; font-size: clamp(2rem, 7vw, 4.5rem); font-weight: 300; margin-bottom: 0.8rem; font-family: 'Oswald', sans-serif;">
          <CountdownDigit 
            v-for="(digit, index) in formatNumber(countdown.hours)" 
            :key="`hours-${index}`" 
            :target="digit"
            :isIntersecting="isVisible"
          />
        </div>
        <div class="relative z-10 text-[var(--theme-text-light)]" style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.25rem; font-weight: 400;">Jam</div>
      </div>

      <!-- MENIT -->
      <div class="flex flex-col items-center w-16 md:w-20 relative">
        <div class="relative z-10 text-[var(--theme-primary)]" style="display: flex; justify-content: center; font-size: clamp(2rem, 7vw, 4.5rem); font-weight: 300; margin-bottom: 0.8rem; font-family: 'Oswald', sans-serif;">
          <CountdownDigit 
            v-for="(digit, index) in formatNumber(countdown.minutes)" 
            :key="`minutes-${index}`" 
            :target="digit"
            :isIntersecting="isVisible"
          />
        </div>
        <div class="relative z-10 text-[var(--theme-text-light)]" style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.25rem; font-weight: 400;">Menit</div>
      </div>

      <!-- DETIK -->
      <div class="flex flex-col items-center w-16 md:w-20 relative">
        <div class="relative z-10 text-[var(--theme-primary)]" style="display: flex; justify-content: center; font-size: clamp(2rem, 7vw, 4.5rem); font-weight: 300; margin-bottom: 0.8rem; font-family: 'Oswald', sans-serif;">
          <CountdownDigit 
            v-for="(digit, index) in formatNumber(countdown.seconds)" 
            :key="`seconds-${index}`" 
            :target="digit"
            :isIntersecting="isVisible"
          />
        </div>
        <div class="relative z-10 text-[var(--theme-text-light)]" style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.25rem; font-weight: 400;">Detik</div>
      </div>
    </div>
    </div>
    
    <img src="https://media.mengundanganda.com/tema%20floral/coundown%20section/2bf93382-fff2-4180-8fa5-d91e7ed668be.webp" class="absolute bottom-0 left-0 w-full h-auto pointer-events-none z-0 transform -scale-x-100" alt="Floral Ornament Bottom" />

    <!-- Grass Assets Overlay -->
    <div v-for="(g, i) in grasses" :key="'grass'+i"
         class="absolute pointer-events-none z-[1]"
         :style="{ left: g.left, bottom: g.bottom, transform: g.flip ? 'scaleX(-1)' : 'none' }">
         <img src="https://media.mengundanganda.com/tema%20floral/coundown%20section/fe50069a-9362-4461-b606-1600648e50f1.webp" 
              class="sway-grass drop-shadow-sm" 
              :style="{ width: g.width, animationDuration: g.duration, animationDelay: g.delay }" />
    </div>

    <!-- Dandelion Assets Overlay -->
    <div v-for="(d, i) in dandelions" :key="'dandelion'+i"
         class="absolute pointer-events-none z-[2]"
         :style="{ left: d.left, bottom: d.bottom, transform: d.flip ? 'scaleX(-1)' : 'none' }">
         <img src="https://media.mengundanganda.com/tema%20floral/coundown%20section/7e196439-ea2b-4325-a844-ebff3113d147.webp" 
              class="sway-dandelion drop-shadow-sm" 
              :style="{ width: d.width, animationDuration: d.duration, animationDelay: d.delay }" />
    </div>

    <!-- Dandelion Image Seeds Overlay -->
    <div v-for="(seed, index) in imgSeeds" :key="'imgSeed'+index"
         class="absolute pointer-events-none z-[10] drift-path"
         :style="{
           left: seed.left,
           bottom: seed.bottom,
           width: seed.size,
           animationDuration: seed.duration,
           animationDelay: seed.delay,
           '--tx': seed.tx,
           '--ty': seed.ty
         }">
      <img src="https://media.mengundanganda.com/tema%20floral/coundown%20section/ffe221ad-761e-40cf-8a87-5ab68e81c721.webp" 
           class="w-full h-auto seed-wobble"
           :style="{ animationDuration: seed.wobble }" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import CountdownDigit from './CountdownDigit.vue';

gsap.registerPlugin(ScrollTrigger);

// Array konfigurasi rumpun rumput (ukuran, letak, kecepatan goyang berbeda)
const grasses = [
  // Rumput Utama (Tweak pengguna)
  { left: '15%', bottom: '20%', width: 'clamp(40px, 12vw, 110px)', duration: '2.4s', delay: '0.7s', flip: true },
  { left: '26%', bottom: '22%', width: 'clamp(50px, 6vw, 60px)', duration: '1.6s', delay: '1.2s', flip: true },
  { left: '38%', bottom: '17%', width: 'clamp(40px, 10vw, 90px)', duration: '2.1s', delay: '0.4s', flip: true },
  { left: '55%', bottom: '12%', width: 'clamp(50px, 14vw, 120px)', duration: '2.6s', delay: '1.5s', flip: false },
  { left: '70%', bottom: '15%', width: 'clamp(45px, 7vw, 70px)', duration: '1.7s', delay: '0.9s', flip: true },
  { left: '82%', bottom: '10%', width: 'clamp(65px, 11vw, 100px)', duration: '2.3s', delay: '0.2s', flip: false },
  { left: '92%', bottom: '12%', width: 'clamp(55px, 9vw, 85px)', duration: '1.9s', delay: '1.1s', flip: true },

  // Tambahan Rumput Kecil-Kecil (Lebat)
  { left: '5%', bottom: '18%', width: 'clamp(35px, 5vw, 50px)', duration: '1.8s', delay: '0.3s', flip: false },
  { left: '11%', bottom: '15%', width: 'clamp(28px, 4vw, 40px)', duration: '1.4s', delay: '1.1s', flip: true },
  { left: '20%', bottom: '16%', width: 'clamp(38px, 5vw, 55px)', duration: '2.0s', delay: '0.5s', flip: false },
  { left: '32%', bottom: '11%', width: 'clamp(30px, 4vw, 45px)', duration: '1.5s', delay: '0.8s', flip: true },
  { left: '46%', bottom: '14%', width: 'clamp(33px, 5vw, 48px)', duration: '1.8s', delay: '0.2s', flip: false },
  { left: '50%', bottom: '18%', width: 'clamp(25px, 3vw, 38px)', duration: '1.3s', delay: '1.4s', flip: true },
  { left: '60%', bottom: '19%', width: 'clamp(40px, 6vw, 55px)', duration: '2.2s', delay: '0.6s', flip: false },
  { left: '65%', bottom: '13%', width: 'clamp(35px, 5vw, 48px)', duration: '1.9s', delay: '1.7s', flip: true },
  { left: '76%', bottom: '16%', width: 'clamp(32px, 4vw, 45px)', duration: '1.7s', delay: '1.5s', flip: true },
  { left: '88%', bottom: '14%', width: 'clamp(36px, 5vw, 52px)', duration: '2.1s', delay: '0.1s', flip: false },
  { left: '98%', bottom: '16%', width: 'clamp(29px, 4vw, 42px)', duration: '1.6s', delay: '0.9s', flip: true }
];

// Array konfigurasi rumpun bunga Dandelion
const dandelions = [
  { left: '8%', bottom: '26%', width: 'clamp(50px, 7vw, 65px)', duration: '3.2s', delay: '0.5s', flip: false },
  { left: '20%', bottom: '24%', width: 'clamp(55px, 9vw, 85px)', duration: '4.1s', delay: '1.2s', flip: true },
  { left: '42%', bottom: '23%', width: 'clamp(35px, 5vw, 55px)', duration: '2.8s', delay: '2.0s', flip: false },
  { left: '60%', bottom: '19%', width: 'clamp(65px, 11vw, 95px)', duration: '4.6s', delay: '0.8s', flip: true },
  { left: '80%', bottom: '17%', width: 'clamp(45px, 8vw, 75px)', duration: '3.5s', delay: '1.8s', flip: false },
  { left: '90%', bottom: '15%', width: 'clamp(50px, 9vw, 80px)', duration: '4.0s', delay: '0.2s', flip: true }
];

// Array konfigurasi benih gambar (melayang terstruktur per-grup, tebaran area luas)
const imgSeeds = [
  // GRUP 1: Terbang secara acak dari tepi luar kiri membentang menuju tengah
  { left: '-15%', bottom: '5%',  size: '18px', duration: '16s', delay: '0s',   wobble: '1.2s', tx: '95vw',  ty: '-60vh' },
  { left: '2%',   bottom: '15%', size: '24px', duration: '16s', delay: '0.2s', wobble: '2s',   tx: '110vw', ty: '-50vh' },
  { left: '-8%',  bottom: '22%', size: '15px', duration: '16s', delay: '0.4s', wobble: '1.5s', tx: '85vw',  ty: '-70vh' },
  { left: '18%',  bottom: '2%',  size: '20px', duration: '16s', delay: '0.6s', wobble: '1.8s', tx: '90vw',  ty: '-45vh' },
  { left: '22%',  bottom: '28%', size: '16px', duration: '16s', delay: '0.1s', wobble: '2.2s', tx: '105vw', ty: '-65vh' },
  { left: '-5%',  bottom: '18%', size: '12px', duration: '16s', delay: '0.3s', wobble: '1.3s', tx: '82vw',  ty: '-55vh' },
  { left: '30%',  bottom: '10%', size: '14px', duration: '16s', delay: '0.8s', wobble: '2.4s', tx: '95vw',  ty: '-72vh' },
  { left: '8%',   bottom: '0%',  size: '22px', duration: '16s', delay: '0.5s', wobble: '1.7s', tx: '98vw',  ty: '-48vh' },
  { left: '-2%',  bottom: '24%', size: '17px', duration: '16s', delay: '0.7s', wobble: '2.1s', tx: '115vw', ty: '-62vh' },
  { left: '15%',  bottom: '12%', size: '19px', duration: '16s', delay: '0.9s', wobble: '1.6s', tx: '88vw',  ty: '-58vh' },
  { left: '25%',  bottom: '5%',  size: '13px', duration: '16s', delay: '0.4s', wobble: '1.4s', tx: '98vw',  ty: '-68vh' },
  { left: '-12%', bottom: '26%', size: '21px', duration: '16s', delay: '0.2s', wobble: '1.9s', tx: '100vw', ty: '-52vh' },

  // GRUP 2: Terbang menyebar dari area tengah layar bawah mengisi gap ruang
  { left: '45%',  bottom: '18%', size: '26px', duration: '16s', delay: '8s',   wobble: '1.6s', tx: '80vw',  ty: '-55vh' },
  { left: '15%',  bottom: '25%', size: '16px', duration: '16s', delay: '8.3s', wobble: '2.5s', tx: '70vw',  ty: '-65vh' },
  { left: '35%',  bottom: '5%',  size: '20px', duration: '16s', delay: '8.1s', wobble: '1.9s', tx: '85vw',  ty: '-50vh' },
  { left: '55%',  bottom: '20%', size: '14px', duration: '16s', delay: '8.5s', wobble: '1.4s', tx: '90vw',  ty: '-75vh' },
  { left: '28%',  bottom: '10%', size: '18px', duration: '16s', delay: '8.2s', wobble: '2.1s', tx: '75vw',  ty: '-60vh' },
  { left: '5%',   bottom: '22%', size: '15px', duration: '16s', delay: '8.4s', wobble: '1.8s', tx: '82vw',  ty: '-58vh' },
  { left: '42%',  bottom: '4%',  size: '13px', duration: '16s', delay: '8.8s', wobble: '1.5s', tx: '65vw',  ty: '-68vh' },
  { left: '50%',  bottom: '28%', size: '22px', duration: '16s', delay: '8.6s', wobble: '2.3s', tx: '95vw',  ty: '-52vh' },
  { left: '18%',  bottom: '15%', size: '17px', duration: '16s', delay: '8.7s', wobble: '1.7s', tx: '78vw',  ty: '-62vh' },
  { left: '38%',  bottom: '2%',  size: '19px', duration: '16s', delay: '8.9s', wobble: '2.0s', tx: '88vw',  ty: '-56vh' },
  { left: '-5%',  bottom: '12%', size: '16px', duration: '16s', delay: '8.2s', wobble: '1.4s', tx: '72vw',  ty: '-70vh' },
  { left: '20%',  bottom: '24%', size: '21px', duration: '16s', delay: '8.4s', wobble: '2.4s', tx: '84vw',  ty: '-48vh' }
];

const props = defineProps<{
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig: ThemeConfig;
  hasDate: boolean;
}>(); 

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

let observer: IntersectionObserver | null = null;
let ctx: gsap.Context | null = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (!entry) return;
    if (entry.isIntersecting) {
      isVisible.value = true;
      if (observer && sectionRef.value) observer.unobserve(sectionRef.value);
    }
  }, {
    threshold: 0.3 // Trigger when 30% of section is visible
  });

  if (sectionRef.value) {
    observer.observe(sectionRef.value);

    // Animasi GSAP: Cinematic "Walk-Through" transisi ke Slide Berikutnya
    ctx = gsap.context(() => {
      gsap.to(sectionRef.value, {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top top",     // Dimulai tepat saat ujung atas layar menyentuh section ini
          end: "bottom top",    // Selesai saat element sepenuhnya lewat (atau tergusur)
          scrub: true,          // Mengikat kepergerakan scroll
        },
        y: () => (sectionRef.value?.offsetHeight || 0) * 0.5, // Parallax turun perlahan (Curtain overlap)
        scale: 1.1,         // Efek berjalan maju menembus ruangan
        opacity: 0,         // Memudar gelap
        filter: "blur(5px)",// Cinematic depth of field
        ease: "none"
      });
    }, sectionRef.value);
  }
});

watch(sectionRef, (el) => {
  if (el && observer && !isVisible.value) {
    observer.observe(el);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  ctx?.revert();
});

const formatNumber = (num: number) => {
  const safe = isNaN(num) ? 0 : num;
  return safe.toString().padStart(2, '0').split('');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400&display=swap');

.sway-grass {
  transform-origin: bottom center;
  animation-name: grass-sway;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  -webkit-mask-image: linear-gradient(to top, transparent 0%, black 30%);
  mask-image: linear-gradient(to top, transparent 0%, black 30%);
}
@keyframes grass-sway {
  0% { transform: rotate(-5deg); filter: brightness(0.95); }
  100% { transform: rotate(5deg); filter: brightness(1.05); }
}

/* Animasi khusus untuk tanaman Dandelion supaya kena angin lebih kuat */
.sway-dandelion {
  transform-origin: bottom center;
  animation-name: dandelion-sway;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  -webkit-mask-image: linear-gradient(to top, transparent 0%, black 30%);
  mask-image: linear-gradient(to top, transparent 0%, black 30%);
}
@keyframes dandelion-sway {
  0% { transform: rotate(-12deg); filter: brightness(0.90); }
  100% { transform: rotate(18deg); filter: brightness(1.10); }
}

/* --- Image Seeds Flight & Wobble Animations --- */
.drift-path {
  animation: float-drift linear infinite;
  opacity: 0;
}
.seed-wobble {
  /* Goyang miring biasa (2D) */
  animation: wobble ease-in-out infinite alternate;
  transform-origin: bottom center;
}

@keyframes float-drift {
  0%   { transform: translate(0, 0); opacity: 0; }
  10%  { opacity: 0.35; }
  35%  { opacity: 0.35; } 
  45%  { transform: translate(var(--tx), var(--ty)); opacity: 0; } /* Selesai terbang di 45% durasi (sekitar 7 detik) */
  100% { transform: translate(var(--tx), var(--ty)); opacity: 0; } /* Menghilang menunggu giliran grup selanjutnya */
}

@keyframes wobble {
  0% { transform: rotate(-10deg); }
  100% { transform: rotate(15deg); }
}

/* --- Atmospheric Infinity Clouds Animations --- */
.cloud-sweep-fast {
  animation: cloud-sweep 40s linear infinite;
  animation-delay: -3s; /* Memulai loop dari frame sedikit nongol di kiri */
}
.cloud-sweep-slow {
  animation: cloud-sweep 75s linear infinite;
  animation-delay: -50s; /* Memulai loop lebih dari setengah jalan (posisi di tengah agak kanan) */
}

@keyframes cloud-sweep {
  0% { transform: translateX(-100%); } /* Ujung kanan gambar persis di ujung kiri layar */
  100% { transform: translateX(100vw); } /* Ujung kiri gambar persis di ujung kanan layar */
}
</style>
