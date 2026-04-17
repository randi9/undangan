<template>
  <div
    :class="[
      'fixed inset-0 z-[100] flex flex-col items-center w-full h-[100dvh] transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)]',
      isClosing ? '-translate-y-full' : 'translate-y-0',
    ]"
    :style="{ backgroundColor: '#000000' }"
  >
    <!-- Fullscreen Cover Photo with Elegant Gradient Overlay -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <!-- Image with automatic slow zoom effect -->
      <img
        v-if="coverImage"
        ref="bgImg"
        :src="coverImage"
        alt="Cover Photo"
        class="absolute inset-0 w-full h-full object-cover scale-[1.05]"
      />
      
      <!-- Better Cinematic Gradient Overlay -->
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-black/80 via-black/20 to-transparent"></div>
      <div class="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
    </div>

    <!-- CONTENT WRAPPER -->
    <div class="relative z-[10] flex flex-col items-center justify-between w-full h-full px-8 py-16 text-center text-white">
      
      <!-- Top Text -->
      <div class="flex flex-col items-center mt-8 md:mt-12">
        <span class="text-[9px] md:text-xs tracking-[0.4em] uppercase font-medium mb-6 text-white/80">The Wedding Of</span>
        <h1 class="text-6xl md:text-8xl drop-shadow-lg text-white font-light leading-none" :style="{ fontFamily: fontHeading || 'sans-serif' }">
          {{ groomName }}
          <span class="block text-4xl text-white/70 italic my-4">&amp;</span>
          {{ brideName }}
        </h1>
      </div>

      <!-- Bottom Text & Buka Button -->
      <div class="flex flex-col items-center mb-2">
        <div class="w-[1px] h-12 md:h-16 bg-white/40 mb-8"></div>
        <p class="text-[9px] md:text-[10px] tracking-[0.25em] text-white/70 uppercase font-medium mb-3">Kepada Yth.</p>
        <h3 class="text-xl md:text-2xl font-medium tracking-wider mb-12 max-w-[280px] break-words leading-relaxed drop-shadow-md">{{ guestName || 'Tamu Undangan' }}</h3>
        
        <button
          ref="bukaBtn"
          @click="bukaAmplop"
          class="group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/60 bg-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-white hover:text-black hover:border-white hover:scale-105 active:scale-95 shadow-[0_4px_30px_rgba(0,0,0,0.2)] focus:outline-none"
        >
          <span class="text-[9px] md:text-[10px] uppercase tracking-widest font-bold z-10 transition-colors group-hover:text-black">Buka</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const props = defineProps<{
  groomName: string;
  brideName: string;
  guestName: string;
  isClosing: boolean;
  fontHeading?: string;
  fontBody?: string;
  coverImage: string;
}>();

const emit = defineEmits<{
  (e: 'open'): void;
}>();

const bgImg = ref<HTMLElement | null>(null);
const bukaBtn = ref<HTMLElement | null>(null);
const isOpening = ref(false);

onMounted(() => {
  // Gentle continuous zoom for the background
  if (bgImg.value) {
    gsap.to(bgImg.value, {
      scale: 1.15,
      duration: 20,
      ease: "none",
      repeat: -1,
      yoyo: true
    });
  }
});

const bukaAmplop = () => {
  if (isOpening.value) return;
  isOpening.value = true;
  
  gsap.to(bukaBtn.value, {
    scale: 0.5,
    opacity: 0,
    duration: 0.4,
    ease: "back.in(1.5)",
    onComplete: () => {
      emit('open');
    }
  });
};
</script>