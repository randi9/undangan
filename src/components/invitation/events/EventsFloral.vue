<template>
  <section v-if="invitation.akad_venue || invitation.resepsi_venue" ref="sectionRef" class="relative">
    <!-- Pinned viewport -->
    <div ref="pinnedRef" class="w-full h-screen overflow-hidden relative">
      
      <!-- Background Image -->
      <div ref="bgRef" class="absolute inset-0 w-full h-full" style="
        background-image: url('https://media.mengundanganda.fun/tema%20floral/acara%20section/7de1e0a0-702e-4cbd-845e-a7b44faa28db.webp');
        background-size: cover;
        background-position: center;
        transform-origin: 0% 58%;
      "></div>

      <!-- Dark Overlay (muncul saat zoom untuk kontras teks) -->
      <div ref="overlayRef" class="absolute inset-0 bg-black/0 pointer-events-none z-[1]"></div>

      <!-- Board / Papan dengan info acara -->
      <div ref="boardRef" class="absolute inset-0 flex items-center justify-center z-[2]" style="opacity: 0;">
        <div class="relative flex items-center justify-center" style="width: clamp(280px, 70vw, 420px);">
          <!-- Papan Kosong Asset -->
          <img src="https://media.mengundanganda.fun/tema%20floral/acara%20section/7de1e0a0-702e-4cbd-845e-a7b44faa28db.webp" 
               class="w-full pointer-events-none" 
               style="opacity: 0;" />

          <!-- Info Akad Nikah -->
          <div ref="akadRef" class="absolute inset-0 flex flex-col items-center justify-center px-10 py-8 text-center" style="opacity: 0;">
            <div class="text-3xl mb-2 drop-shadow-md" style="line-height:1;">💍</div>
            <h3 class="text-2xl md:text-3xl font-bold mb-4 drop-shadow-md" :style="{ fontFamily: themeConfig.fontHeading, color: 'white' }">Akad Nikah</h3>
            <div class="space-y-2 text-sm md:text-base font-medium" style="color: white; text-shadow: 1px 1px 4px rgba(0,0,0,0.6);">
              <p v-if="invitation.akad_date">{{ formatDateLong(invitation.akad_date) }}</p>
              <p v-if="invitation.akad_time">{{ invitation.akad_time }}</p>
              <p v-if="invitation.akad_venue" class="font-bold mt-2 text-lg">{{ invitation.akad_venue }}</p>
              <p v-if="invitation.akad_address" class="text-xs md:text-sm font-light opacity-90">{{ invitation.akad_address }}</p>
            </div>
            <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" 
               class="inline-flex items-center gap-2 mt-5 px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-white hover:text-black transition-colors"
               style="border: 1.5px solid white; color: white; box-shadow: 0px 4px 6px rgba(0,0,0,0.2);">
              📍 Buka Maps
            </a>
          </div>

          <!-- Info Resepsi -->
          <div ref="resepsiRef" class="absolute inset-0 flex flex-col items-center justify-center px-10 py-8 text-center" style="opacity: 0;">
            <div class="text-3xl mb-2 drop-shadow-md" style="line-height:1;">🎉</div>
            <h3 class="text-2xl md:text-3xl font-bold mb-4 drop-shadow-md" :style="{ fontFamily: themeConfig.fontHeading, color: 'white' }">Resepsi</h3>
            <div class="space-y-2 text-sm md:text-base font-medium" style="color: white; text-shadow: 1px 1px 4px rgba(0,0,0,0.6);">
              <p v-if="invitation.resepsi_date">{{ formatDateLong(invitation.resepsi_date) }}</p>
              <p v-if="invitation.resepsi_time">{{ invitation.resepsi_time }}</p>
              <p v-if="invitation.resepsi_venue" class="font-bold mt-2 text-lg">{{ invitation.resepsi_venue }}</p>
              <p v-if="invitation.resepsi_address" class="text-xs md:text-sm font-light opacity-90">{{ invitation.resepsi_address }}</p>
            </div>
            <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank"
               class="inline-flex items-center gap-2 mt-5 px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-white hover:text-black transition-colors"
               style="border: 1.5px solid white; color: white; box-shadow: 0px 4px 6px rgba(0,0,0,0.2);">
              📍 Buka Maps
            </a>
          </div>
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

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

function formatDateLong(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const sectionRef = ref<HTMLElement | null>(null);
const pinnedRef = ref<HTMLElement | null>(null);
const bgRef = ref<HTMLElement | null>(null);
const overlayRef = ref<HTMLElement | null>(null);
const boardRef = ref<HTMLElement | null>(null);
const akadRef = ref<HTMLElement | null>(null);
const resepsiRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedRef.value,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      }
    });

    // Phase 1 (0% - 25%): Background visible, nothing happening (just the scenery)
    tl.to({}, { duration: 1 }); // spacer

    // Phase 2 (Zoom into the board area + show board container)
    // Durasi diperbesar jadi 3 agar porsi scroll untuk ngezoom jauh lebih panjang/lama
    tl.to(bgRef.value, {
      scale: 3.5,
      duration: 3,
      ease: 'power2.inOut',
    }, '+=0');

    tl.to(overlayRef.value, {
      backgroundColor: 'rgba(0,0,0,0.3)',
      duration: 3,
    }, '<');

    tl.to(boardRef.value, {
      opacity: 1,
      duration: 1.5,
    }, '-=1.5');

    // Phase 3 (40% - 55%): Akad info fades in
    tl.to(akadRef.value, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Phase 4 (55% - 65%): Hold akad visible
    tl.to({}, { duration: 0.5 }); // hold

    // Phase 5 (65% - 75%): Akad fades out, Resepsi fades in
    tl.to(akadRef.value, {
      opacity: 0,
      duration: 0.5,
    });

    tl.to(resepsiRef.value, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Phase 6 (75% - 85%): Hold resepsi visible
    tl.to({}, { duration: 0.5 }); // hold

    // Phase 7 (85% - 100%): Zoom out + everything fades, prepare transition
    tl.to(resepsiRef.value, {
      opacity: 0,
      duration: 0.5,
    });

    tl.to(boardRef.value, {
      opacity: 0,
      duration: 0.5,
    }, '<');

    tl.to(bgRef.value, {
      scale: 1,
      duration: 1,
    }, '<');

    tl.to(overlayRef.value, {
      backgroundColor: 'rgba(0,0,0,0)',
      duration: 1,
    }, '<');

  }, sectionRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<style scoped>
/* Smooth transitions for the sticky pinned layer */
</style>
