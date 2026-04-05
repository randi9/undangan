<template>
  <section v-if="photos && photos.length > 0" style="position: relative; width: 100%; padding: 64px 24px 120px; text-align: center; background-color: var(--theme-surface); overflow: hidden; z-index: 20;">
    <!-- Full width floral image sticking to bottom -->
    <img src="https://media.mengundanganda.fun/tema%20floral/gallery%20section/ca980a43-47c7-431c-910d-c676e749a8fe.webp" style="position: absolute; bottom: 0; left: 0; width: 100%; height: auto; outline: none; pointer-events: none; z-index: 0;" />
    
    <!-- Top Right Decoration -->
    <img src="https://media.mengundanganda.fun/tema%20floral/gallery%20section/enneggg_7bc7e912-01fb-486e-b873-66803c7e63ae.webp" style="position: absolute; top: 0; right: 0; width: clamp(120px, 25vw, 200px); height: auto; pointer-events: none; z-index: 1;" />
    
    <!-- Top Right Butterfly (Smaller, Faster, Tilted Left) -->
    <div style="position: absolute; right: 5px; top: 10px; width: 50px; height: 50px; perspective: 600px; z-index: 2; transform: rotate(-5deg); pointer-events: none; opacity: 0.8;">
      <img src="https://media.mengundanganda.fun/tema%20floral/gallery%20section/sashkeh_6ed3fbd6-b062-4196-bb32-8b2b7206e6bb.webp" class="bw-left" style="animation-duration: 0.22s; animation-delay: -0.1s; position: absolute; left: 50%; top: 0; width: auto; height: 100%; transform-origin: left center; object-fit: contain;" />
      <img src="https://media.mengundanganda.fun/tema%20floral/gallery%20section/sashkeh_6ed3fbd6-b062-4196-bb32-8b2b7206e6bb.webp" class="bw-right" style="animation-duration: 0.22s; animation-delay: -0.1s; position: absolute; left: 50%; top: 0; width: auto; height: 100%; transform-origin: left center; object-fit: contain;" />
    </div>

    <!-- Top Left Decoration (Flipped) -->
    <img src="https://media.mengundanganda.fun/tema%20floral/gallery%20section/enneggg_7bc7e912-01fb-486e-b873-66803c7e63ae.webp" style="position: absolute; top: 0; left: 0; width: clamp(120px, 25vw, 200px); height: auto; transform: scaleX(-1); pointer-events: none; z-index: 1;" />
    
    <!-- Top Left Butterfly (Larger, Slower, Slightly Tilted Right) -->
    <div style="position: absolute; left: -10px; top: 40px; width: 60px; height: 60px; perspective: 600px; z-index: 2; transform: rotate(18deg); pointer-events: none; opacity: 0.8;">
      <img src="https://media.mengundanganda.fun/tema%20floral/gallery%20section/sashkeh_6ed3fbd6-b062-4196-bb32-8b2b7206e6bb.webp" class="bw-left" style="animation-duration: 0.38s; animation-delay: -0.3s; position: absolute; left: 50%; top: 0; width: auto; height: 100%; transform-origin: left center; object-fit: contain;" />
      <img src="https://media.mengundanganda.fun/tema%20floral/gallery%20section/sashkeh_6ed3fbd6-b062-4196-bb32-8b2b7206e6bb.webp" class="bw-right" style="animation-duration: 0.38s; animation-delay: -0.3s; position: absolute; left: 50%; top: 0; width: auto; height: 100%; transform-origin: left center; object-fit: contain;" />
    </div>
    
    <h2 :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-primary)', fontSize: 'clamp(36px, 6vw, 60px)', marginBottom: '32px', position: 'relative', zIndex: 10, letterSpacing: '0.025em', textShadow: '0 1px 2px rgba(0,0,0,0.05)' }">Our Gallery</h2>
    
    <div style="position: relative; z-index: 10; max-width: 64rem; margin: 0 auto;">
      <GalleryMasonryLayout
        :photos="photos"
        :api-base="apiBase"
        @open-lightbox="(i: number) => $emit('openLightbox', i)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { Photo } from '@/types/invitation';
import GalleryMasonryLayout from './GalleryMasonryLayout.vue';

defineProps<{
  photos: Photo[];
  themeConfig: ThemeConfig;
  apiBase: string;
}>();

defineEmits<{
  (e: 'openLightbox', index: number): void;
}>();
</script>

<style scoped>
/* Butterfly Animations */
.bw-right {
  animation: flap-right 0.3s ease-in-out infinite alternate;
}
.bw-left {
  animation: flap-left 0.3s ease-in-out infinite alternate;
}

@keyframes flap-right {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(70deg); }
}
@keyframes flap-left {
  0% { transform: rotateY(180deg); }
  100% { transform: rotateY(110deg); }
}
</style>
