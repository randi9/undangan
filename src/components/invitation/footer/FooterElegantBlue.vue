<template>
  <footer ref="footerRef" style="margin-top: -1px; padding: 100px 24px 60px; text-align: center; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 500px; background: linear-gradient(to bottom, rgba(168, 208, 230, 0.45) 0%, #f8f9f9 85%);" class="text-white">
    
    <div style="position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; margin-top: -20px;">
      
      <!-- Interlocking Rings Line-Art Animation -->
      <div ref="ringsWrapper" class="rings-wrapper" style="display: flex; justify-content: center; align-items: center; position: relative; height: 120px; margin-bottom: 24px; perspective: 1000px;">
        
        <!-- Groom Ring (Plain) -->
        <div ref="groomRing" style="position: absolute; color: #304851;">
          <svg width="65" height="65" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="50" cy="50" r="32" />
            <circle cx="50" cy="50" r="23" />
            <!-- Single line on top to track rotation -->
            <line x1="50" y1="18" x2="50" y2="27" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
          </svg>
        </div>

        <!-- Bride Ring (Diamond) -->
        <div ref="brideRing" style="position: absolute; color: #304851; z-index: 2;">
          <svg width="65" height="85" viewBox="0 0 100 120" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" style="margin-top: -20px;">
            <circle cx="50" cy="70" r="32" />
            <circle cx="50" cy="70" r="23" />
            <polygon points="33,42 67,42 50,65" fill="#f8f9f9" stroke="none" />
            <polygon points="26,26 74,26 67,42 33,42" fill="#f8f9f9" stroke="none" />
            
            <polygon points="33,42 67,42 50,65" />
            <polygon points="26,26 74,26 67,42 33,42" />
            <line x1="42" y1="26" x2="45" y2="42" />
            <line x1="58" y1="26" x2="55" y2="42" />
            <line x1="45" y1="42" x2="50" y2="65" />
            <line x1="55" y1="42" x2="50" y2="65" />
            <line x1="28" y1="15" x2="20" y2="5" />
            <line x1="50" y1="12" x2="50" y2="0" />
            <line x1="72" y1="15" x2="80" y2="5" />
          </svg>
        </div>

        <!-- Center Glowing Star -->
        <div ref="sparkle" style="position: absolute; z-index: 3; margin-top: -30px; margin-left: 30px; filter: drop-shadow(0 0 8px rgba(223, 189, 106, 0.8));">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#dfbd6a">
            <path d="M12 0 L14.59 9.41 L24 12 L14.59 14.59 L12 24 L9.41 14.59 L0 12 L9.41 9.41 Z" />
          </svg>
        </div>
      </div>

      <p style="font-size: clamp(34px, 8vw, 48px); margin-bottom: 24px; color: #304851; font-weight: 600; letter-spacing: 0.02em; margin-top: 0;" :style="{ fontFamily: themeConfig.fontHeading }">
        {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
      </p>
      
      <p style="font-size: clamp(13px, 3.5vw, 14px); font-weight: 500; letter-spacing: 0.05em; color: #405C66; max-width: 400px; line-height: 1.6; margin: 0 auto;">
        Terima kasih yang terdalam telah menjadi bagian dari hari bahagia kami. Doa restu Anda adalah anugerah terbesar.
      </p>
      
      <!-- Jarak memisahkan dari Ucapan Terima Kasih -->
      <div style="margin-top: 150px; display: flex; flex-direction: column; align-items: center; gap: 5px; padding-top: 16px; width: 100%; max-width: 280px; margin-left: auto; margin-right: auto; opacity: 0.9;">
        <span style="font-size: clamp(10px, 2.5vw, 11px); text-transform: uppercase; letter-spacing: 0.25em; color: #5B7F8C; font-weight: 700; margin: 0;">POWERED BY</span>
        
        <a href="https://mengundanganda.com" target="_blank" rel="noopener noreferrer" style="display: flex; flex-direction: column; align-items: center; gap: 8px; text-decoration: none; margin-top: 4px; transition: transform 0.3s ease;">
          <img src="/images/logo.webp" alt="MengundangAnda Logo" style="width: 44px; height: 44px; object-fit: contain; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15)); margin: 0;" />
          <span style="font-size: clamp(13px, 3.5vw, 14px); font-weight: 700; letter-spacing: 0.15em; color: #304851; margin-top: 4px;">
            Mengundang<span style="font-weight: 700; color: #3b82f6;">Anda</span>
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
const ringsWrapper = ref<HTMLElement | null>(null);
const groomRing = ref<HTMLElement | null>(null);
const brideRing = ref<HTMLElement | null>(null);
const sparkle = ref<HTMLElement | null>(null);

let ctx: gsap.Context;
let twinkleTween: gsap.core.Tween | null = null;

onMounted(() => {
  if (!footerRef.value) return;

  ctx = gsap.context(() => {
    // Initial Setting
    gsap.set(brideRing.value, { x: 0, rotation: 0, transformOrigin: '50% 90%' });
    // Rotasi tinggi (-720) agar guliran cincin cowo terlihat tajam dan cepat
    gsap.set(groomRing.value, { x: -200, rotation: -720, opacity: 0, transformOrigin: 'center center' });
    gsap.set(sparkle.value, { scale: 0, opacity: 0, rotation: 0, transformOrigin: 'center center' });

    const tl = gsap.timeline({ paused: true });

    // 1. Groom Ring rolls in rapidly from the left
    tl.to(groomRing.value, { 
      x: -12, 
      rotation: 5, 
      opacity: 1, 
      duration: 1.2, 
      ease: 'power2.in' 
    }, 0);

    // 2. BOOM! Groom hits the bride ring. Groom bounces back slightly.
    tl.to(groomRing.value, { 
      x: -25, 
      rotation: -10, 
      duration: 0.6, 
      ease: 'back.out(1.5)' 
    }, 1.2);

    // 3. Bride Ring wobbles aggressively initially, then settles slightly tilted
    tl.to(brideRing.value, { 
      x: 10, 
      rotation: 12, 
      duration: 1.0, 
      ease: 'elastic.out(1.2, 0.4)' 
    }, 1.2);

    // 4. After rings have settled, the twinkle/sparkle bursts out
    tl.to(sparkle.value, { 
      scale: 1.2, 
      opacity: 1, 
      rotation: 90, 
      duration: 0.6, 
      ease: 'back.out(2)' 
    }, 1.8);

    // 5. Trigger infinite custom loop kelapa-kelip
    tl.add(() => {
      twinkleTween = gsap.to(sparkle.value, { 
        scale: 0.4, 
        opacity: 0.1, 
        duration: 1.5, 
        ease: 'sine.inOut', 
        repeat: -1, 
        yoyo: true 
      });
    }, 2.4);

    // Use Intersection Observer which is 100% immune to height calculation bugs
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        tl.play();
        observer.disconnect();
      }
    }, { 
      rootMargin: "0px 0px -30% 0px", // Trigger saat bagian atas footer menyentuh tengah layar (50%)
      threshold: 0 
    });

    if (footerRef.value) {
      observer.observe(footerRef.value);
    }

  }, footerRef.value!);
});

onUnmounted(() => {
  if (twinkleTween) twinkleTween.kill();
  if (ctx) ctx.revert();
});
</script>

<style scoped>
/* All static CSS keyframes removed as animation is now fully controlled dynamically by GSAP */
</style>
