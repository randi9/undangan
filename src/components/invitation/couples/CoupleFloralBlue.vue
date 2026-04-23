<template>
  <section id="couple-section-fb" ref="sectionRef" style="position: relative; width: 100%; min-height: 100dvh; display: flex; flex-direction: column; justify-content: center; overflow: hidden; background-color: #f0f0f0;">
    <!-- Proportional Container that acts like object-fit: cover while allowing precise absolute positioning -->
    <div style="position: absolute; top: 50%; left: 50%; width: 100vw; height: 177.778vw; min-height: 100vh; min-width: 56.25vh; transform: translate(-50%, -50%);">
      <!-- Background Image -->
      <img src="https://media.mengundanganda.com/floral-blue/quotes%20section/randidewi_a3c9baee-e441-4998-811f-127f8c76b04b.webp" alt="Background" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;" />
      
      <!-- Polaroid Photo Area -->
      <div style="position: absolute; top: 54.5%; left: 51%; width: 62%; height: 38%; transform: translate(-50%, -50%) rotate(-5deg); z-index: 1;">
        <!-- Groom Photo -->
        <div style="position: absolute; top: 4%; left: 5%; width: 90%; height: 78%; overflow: hidden; border-radius: 2px;">
          <img v-if="invitation.groom_photo" :src="resolveAssetUrl(invitation.groom_photo, apiBase)" style="width: 100%; height: 100%; object-fit: cover;" />
          <div v-else style="width: 100%; height: 100%; background: #ddd; display: flex; align-items: center; justify-content: center;">Groom</div>
          <!-- Inset Shadow Overlay for Depth -->
          <div style="position: absolute; inset: 0; box-shadow: inset 0px 2px 10px rgba(0,0,0,0.25); pointer-events: none;"></div>
        </div>
        
        <!-- Bride Photo -->
        <div ref="bridePhotoRef" style="position: absolute; top: 4%; left: 5%; width: 90%; height: 78%; overflow: hidden; opacity: 0; border-radius: 2px;">
          <img v-if="invitation.bride_photo" :src="resolveAssetUrl(invitation.bride_photo, apiBase)" style="width: 100%; height: 100%; object-fit: cover;" />
          <div v-else style="width: 100%; height: 100%; background: #ccc; display: flex; align-items: center; justify-content: center;">Bride</div>
          <!-- Inset Shadow Overlay for Depth -->
          <div style="position: absolute; inset: 0; box-shadow: inset 0px 2px 10px rgba(0,0,0,0.25); pointer-events: none;"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  apiBase: string;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const bridePhotoRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    gsap.to(bridePhotoRef.value, {
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: true,
      }
    });
  }, sectionRef.value!);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>
<style scoped>
/* Removed the wavy masks to ensure the section connects directly to the previous one without empty spaces */
</style>
