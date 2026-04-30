<template>
  <footer ref="footerRef" style="padding: 40px 24px 60px; text-align: center; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; background-color: #fffaf2;">
    
    <!-- Background Gradient -->
    <div style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: linear-gradient(to bottom, #fffaf2, #fffaf2); z-index: 0;"></div>
    
    <!-- ==================== BUNGA KIRI ==================== -->
    <!-- LAMA 1 -->
    <div class="footer-flower flower-1" style="position: absolute; left: -20px; bottom: -5px; width: 140px; z-index: 5;">
      <div class="sway-wrapper sway-delay-1">
        <img src="https://media.mengundanganda.com/floral/footer%20section/randidewi_f7ba6668-cb9a-4b74-b0d5-b45597e9cd47.webp" style="width: 300px; height: auto; display: block;" />
      </div>
    </div>
    <!-- LAMA 2 -->
    <div class="footer-flower flower-2" style="position: absolute; left: 40px; bottom:-5px; width: 120px; z-index: 6;">
      <div class="sway-wrapper sway-delay-2">
        <img src="https://media.mengundanganda.com/floral/footer%20section/randidewi_2884ed55-5806-47af-adc5-83cadbe8d990.webp" style="width: 100px; height: auto; display: block;" />
      </div>
    </div>
    <!-- BARU 1 -->
    <div class="footer-flower flower-3" style="position: absolute; left: -10px; bottom: 60px; width: 100px; z-index: 4;">
      <div class="sway-wrapper sway-delay-3">
        <img src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_3c16b77d-3a6b-4239-8e9e-68a976fd8c71.webp" style="width: 120px; height: auto; display: block;" />
      </div>
    </div>
    <!-- BARU 2 -->
    <div class="footer-flower flower-4" style="position: absolute; left: 10px; bottom: -100px; width: 110px; z-index: 7;">
      <div class="sway-wrapper sway-delay-4">
        <img src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_78c5a10f-c4e7-48f8-8e2e-7d7cc702d814.webp" style="width: 70px; height: auto; display: block;" />
      </div>
    </div>
    <!-- BARU 3 -->
    <div class="footer-flower flower-5" style="position: absolute; left: -10px; bottom: -40px; width: 100px; z-index: 6;">
      <div class="sway-wrapper sway-delay-5">
        <img src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_ec4bf919-6310-40d6-9313-b276df6d2a7b.webp" style="width: 90px; height: auto; display: block;" />
      </div>
    </div>

    <!-- ==================== BUNGA KANAN ==================== -->
    <!-- LAMA 1 -->
    <div class="footer-flower flower-1" style="position: absolute; right: -20px; bottom: -5px; width: 140px; z-index: 5; transform: scaleX(-1);">
      <div class="sway-wrapper sway-delay-1">
        <img src="https://media.mengundanganda.com/floral/footer%20section/randidewi_f7ba6668-cb9a-4b74-b0d5-b45597e9cd47.webp" style="width: 300px; height: auto; display: block;" />
      </div>
    </div>
    <!-- LAMA 2 -->
    <div class="footer-flower flower-2" style="position: absolute; right: 40px; bottom:-5px; width: 120px; z-index: 6; transform: scaleX(-1);">
      <div class="sway-wrapper sway-delay-2">
        <img src="https://media.mengundanganda.com/floral/footer%20section/randidewi_2884ed55-5806-47af-adc5-83cadbe8d990.webp" style="width: 100px; height: auto; display: block;" />
      </div>
    </div>
    <!-- BARU 1 -->
    <div class="footer-flower flower-3" style="position: absolute; right: -10px; bottom: 60px; width: 100px; z-index: 4; transform: scaleX(-1);">
      <div class="sway-wrapper sway-delay-3">
        <img src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_3c16b77d-3a6b-4239-8e9e-68a976fd8c71.webp" style="width: 120px; height: auto; display: block;" />
      </div>
    </div>
    <!-- BARU 2 -->
    <div class="footer-flower flower-4" style="position: absolute; right: 10px; bottom: -100px; width: 110px; z-index: 7; transform: scaleX(-1);">
      <div class="sway-wrapper sway-delay-4">
        <img src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_78c5a10f-c4e7-48f8-8e2e-7d7cc702d814.webp" style="width: 70px; height: auto; display: block;" />
      </div>
    </div>
    <!-- BARU 3 -->
    <div class="footer-flower flower-5" style="position: absolute; right: -10px; bottom: -40px; width: 100px; z-index: 6; transform: scaleX(-1);">
      <div class="sway-wrapper sway-delay-5">
        <img src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_ec4bf919-6310-40d6-9313-b276df6d2a7b.webp" style="width: 90px; height: auto; display: block;" />
      </div>
    </div>

    <div style="position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; margin-top: 20px;">
      <p style="font-size: clamp(34px, 8vw, 48px); margin-bottom: 16px; color: #2d5a27; font-weight: 600; letter-spacing: 0.02em; margin-top: 0;" :style="{ fontFamily: themeConfig.fontHeading }">
        {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
      </p>
      
      <p style="font-size: clamp(13px, 3.5vw, 14px); font-weight: 500; letter-spacing: 0.05em; color: #4d784a; max-width: 250px; line-height: 1.6; margin: 0 auto;">
        Terima kasih yang terdalam telah menjadi bagian dari hari bahagia kami. Doa restu Anda adalah anugerah terbesar.
      </p>
      
      <!-- Jarak ekstrim besar untuk memisahkan dari Ucapan Terima Kasih -->
      <div style="margin-top: 50px; display: flex; flex-direction: column; align-items: center; gap: 5px; padding-top: 16px; width: 100%; max-width: 280px; margin-left: auto; margin-right: auto; opacity: 0.9;">
        <span style="font-size: clamp(10px, 2.5vw, 11px); text-transform: uppercase; letter-spacing: 0.25em; color: #5e8b5a; font-weight: 700; margin: 0;">POWERED BY</span>
        
        <a href="https://mengundanganda.com" target="_blank" rel="noopener noreferrer" style="display: flex; flex-direction: column; align-items: center; gap: 8px; text-decoration: none; margin-top: 4px; transition: transform 0.3s ease;">
          <img src="/images/logo.webp" alt="MengundangAnda Logo" style="width: 44px; height: 44px; object-fit: contain; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15)); margin: 0;" />
          <span style="font-size: clamp(13px, 3.5vw, 14px); font-weight: 700; letter-spacing: 0.15em; color: #374151; margin-top: 4px;">
            Mengundang<span style="font-weight: 700; color: #3b82f6;">Anda</span>
          </span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const footerRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  if (!footerRef.value) return;

  ctx = gsap.context(() => {
    // Sembunyikan elemen sebelum di-scroll
    gsap.set('.flower-1', { y: 150, opacity: 0 });
    gsap.set('.flower-2', { y: 150, opacity: 0 });
    gsap.set('.flower-3', { y: 150, opacity: 0 });
    gsap.set('.flower-4', { y: 150, opacity: 0 });
    gsap.set('.flower-5', { y: 150, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.value,
        start: 'top 80%', // Mulai saat footer masuk 20% ke dalam layar dari bawah
      }
    });

    tl.to('.flower-1', {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
    })
    .to('.flower-2', {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
    }, '-=1') // Bunga kedua menyusul sedikit (overlap)
    .to('.flower-3', {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
    }, '-=1') // Bunga ketiga menyusul sedikit
    .to('.flower-4', {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
    }, '-=1')
    .to('.flower-5', {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
    }, '-=1');
  }, footerRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<style scoped>
.sway-wrapper {
  transform-origin: bottom center;
  animation: sway ease-in-out infinite alternate;
}

.sway-delay-1 {
  animation-duration: 4.5s;
  animation-delay: 0.2s;
}

.sway-delay-2 {
  animation-duration: 3.8s;
  animation-delay: 1.5s;
}

.sway-delay-3 {
  animation-duration: 4.2s;
  animation-delay: 0.8s;
}

.sway-delay-4 {
  animation-duration: 3.5s;
  animation-delay: 0.5s;
}

.sway-delay-5 {
  animation-duration: 4.8s;
  animation-delay: 1.2s;
}

@keyframes sway {
  0% { transform: rotate(-5deg); filter: brightness(0.95); }
  100% { transform: rotate(5deg); filter: brightness(1.05); }
}
</style>
