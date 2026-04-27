<template>
  <footer ref="footerRef" style="padding: 40px 24px 60px; text-align: center; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; background-color: #ffffff;">
    
    <div style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: linear-gradient(to bottom, #eef4fc, #ffffff); z-index: 0;"></div>
    
    <!-- Floral Decor Container -->
    <div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; pointer-events: none; z-index: 5; overflow: visible;">
      
      <!-- ================= LEFT SIDE FLOWERS ================= -->
      <!-- Bunga 1 (bawah) -->
      <img src="https://media.mengundanganda.com/floral-blue/footer%20section/randidewi_86d95fec-466c-4562-837d-f66b1d04c75f.webp" class="footer-floral" style="position: absolute; z-index: 5; --bottom: -50px; --left: -50px; --width: 150px; --rotate: 0deg; --scaleX: 1; bottom: var(--bottom); left: var(--left); width: var(--width); transform: rotate(var(--rotate)) scaleX(var(--scaleX)); opacity: 0.9;" alt="Floral Left 1" />
      
      <!-- Bunga 2 -->
      <img src="https://media.mengundanganda.com/floral-blue/footer%20section/randidewi_d28fa7d1-1c5f-4deb-9193-befd72c49a7b.webp" class="footer-floral" style="position: absolute; z-index: 4; --bottom: 40px; --left: -60px; --width: 140px; --rotate: 15deg; --scaleX: 1; bottom: var(--bottom); left: var(--left); width: var(--width); transform: rotate(var(--rotate)) scaleX(var(--scaleX)); opacity: 0.8;" alt="Floral Left 2" />
      
      <!-- Bunga 3 (Kanan aslinya, di-mirror ke kiri) -->
      <img src="https://media.mengundanganda.com/floral-blue/footer%20section/randidewi_19487eb2-19e6-4208-9067-0cfb47c3e3fe.webp" class="footer-floral" style="position: absolute; z-index: 3; --bottom: 60px; --left: -50px; --width: 120px; --rotate: -10deg; --scaleX: -1; bottom: var(--bottom); left: var(--left); width: var(--width); transform: rotate(var(--rotate)) scaleX(var(--scaleX)); opacity: 0.7;" alt="Floral Left 3" />
      
      <!-- Bunga 4 (Kanan aslinya, di-mirror ke kiri) -->
      <img src="https://media.mengundanganda.com/floral-blue/footer%20section/randidewi_aa6c83fc-f759-4f19-b50a-d1c159fbaa00.webp" class="footer-floral" style="position: absolute; z-index: 2; --bottom: 170px; --left: -90px; --width: 140px; --rotate: 5deg; --scaleX: -1; bottom: var(--bottom); left: var(--left); width: var(--width); transform: rotate(var(--rotate)) scaleX(var(--scaleX)); opacity: 0.6;" alt="Floral Left 4" />
      
      <!-- Bunga 5 -->
      <img src="https://media.mengundanganda.com/floral-blue/footer%20section/randidewi_7e970bd9-26cd-4abf-9bd7-90e04996ce54.webp" class="footer-floral" style="position: absolute; z-index: 1; --bottom: 270px; --left: -50px; --width: 100px; --rotate: -5deg; --scaleX: 1; bottom: var(--bottom); left: var(--left); width: var(--width); transform: rotate(var(--rotate)) scaleX(var(--scaleX)); opacity: 0.5;" alt="Floral Left 5" />


      
      <!-- ================= RIGHT SIDE FLOWERS ================= -->
      <!-- Bunga 1 (bawah, Kiri aslinya, di-mirror ke kanan) -->
      <img src="https://media.mengundanganda.com/floral-blue/footer%20section/randidewi_86d95fec-466c-4562-837d-f66b1d04c75f.webp" class="footer-floral" style="position: absolute; z-index: 5; --bottom: -50px; --right: -50px; --width: 150px; --rotate: 0deg; --scaleX: -1; bottom: var(--bottom); right: var(--right); width: var(--width); transform: rotate(var(--rotate)) scaleX(var(--scaleX)); opacity: 0.9;" alt="Floral Right 1" />
      
      <!-- Bunga 2 (Kiri aslinya, di-mirror ke kanan) -->
      <img src="https://media.mengundanganda.com/floral-blue/footer%20section/randidewi_d28fa7d1-1c5f-4deb-9193-befd72c49a7b.webp" class="footer-floral" style="position: absolute; z-index: 4; --bottom: 40px; --right: -60px; --width: 140px; --rotate: -15deg; --scaleX: -1; bottom: var(--bottom); right: var(--right); width: var(--width); transform: rotate(var(--rotate)) scaleX(var(--scaleX)); opacity: 0.8;" alt="Floral Right 2" />
      
      <!-- Bunga 3 (Kanan aslinya, TIDAK di-mirror) -->
      <img src="https://media.mengundanganda.com/floral-blue/footer%20section/randidewi_19487eb2-19e6-4208-9067-0cfb47c3e3fe.webp" class="footer-floral" style="position: absolute; z-index: 3; --bottom: 60px; --right: -50px; --width: 120px; --rotate: 10deg; --scaleX: 1; bottom: var(--bottom); right: var(--right); width: var(--width); transform: rotate(var(--rotate)) scaleX(var(--scaleX)); opacity: 0.7;" alt="Floral Right 3" />
      
      <!-- Bunga 4 (Kanan aslinya, TIDAK di-mirror) -->
      <img src="https://media.mengundanganda.com/floral-blue/footer%20section/randidewi_aa6c83fc-f759-4f19-b50a-d1c159fbaa00.webp" class="footer-floral" style="position: absolute; z-index: 2; --bottom: 170px; --right: -90px; --width: 140px; --rotate: -5deg; --scaleX: 1; bottom: var(--bottom); right: var(--right); width: var(--width); transform: rotate(var(--rotate)) scaleX(var(--scaleX)); opacity: 0.6;" alt="Floral Right 4" />
      
      <!-- Bunga 5 (Kiri aslinya, di-mirror ke kanan) -->
      <img src="https://media.mengundanganda.com/floral-blue/footer%20section/randidewi_7e970bd9-26cd-4abf-9bd7-90e04996ce54.webp" class="footer-floral" style="position: absolute; z-index: 1; --bottom: 270px; --right: -50px; --width: 100px; --rotate: 5deg; --scaleX: -1; bottom: var(--bottom); right: var(--right); width: var(--width); transform: rotate(var(--rotate)) scaleX(var(--scaleX)); opacity: 0.5;" alt="Floral Right 5" />
      
    </div>


    <div style="position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; margin-top: 20px;">
      <p style="font-size: clamp(34px, 8vw, 48px); margin-bottom: 16px; color: #2c5f82; font-weight: 600; letter-spacing: 0.02em; margin-top: 0;" :style="{ fontFamily: themeConfig.fontHeading }">
        {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
      </p>
      
      <p style="font-size: clamp(13px, 3.5vw, 14px); font-weight: 500; letter-spacing: 0.05em; color: #4a6d8a; max-width: 400px; line-height: 1.6; margin: 0 auto;">
        Terima kasih yang terdalam telah menjadi bagian dari hari bahagia kami. Doa restu Anda adalah anugerah terbesar.
      </p>
      
      <div style="margin-top: 50px; display: flex; flex-direction: column; align-items: center; gap: 5px; padding-top: 16px; width: 100%; max-width: 280px; margin-left: auto; margin-right: auto; opacity: 0.9;">
        <span style="font-size: clamp(10px, 2.5vw, 11px); text-transform: uppercase; letter-spacing: 0.25em; color: #5a7a8b; font-weight: 700; margin: 0;">POWERED BY</span>
        
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
import { onMounted, ref, onUnmounted } from 'vue';
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
let ctx: gsap.Context;

onMounted(() => {
  if (!footerRef.value) return;
  
  ctx = gsap.context(() => {
    // Select all flowers
    const flowers = gsap.utils.toArray('.footer-floral');
    
    // Scale up and fade in animation when scrolling into footer
    gsap.from(flowers, {
      scale: 0,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.5)',
      stagger: 0.1,
      scrollTrigger: {
        trigger: footerRef.value,
        start: 'top 80%', // Animates when footer top is 80% down the screen
      }
    });
  }, footerRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>
