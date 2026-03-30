<template>
  <div
    :class="[
      'fixed inset-0 z-50 flex flex-col overflow-hidden w-full h-[100dvh] transition-all duration-[1200ms] ease-in-out',
      isClosing ? '-translate-y-full opacity-0 pointer-events-none' : 'opacity-100',
    ]"
  >
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        :src="coverImage"
        alt="Cover Background"
        class="min-w-full min-h-full w-full h-full object-cover object-center scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/80"></div>
    </div>

    <div class="absolute z-10 inset-0 flex items-center justify-center px-6">
      <div
        class="
          w-full h-full
          bg-white/20
          flex flex-col items-center justify-center text-center text-white gap-10
        "
      >
        <h1
          class="text-[80px] md:text-[110px] lg:text-[130px] leading-[1.1] drop-shadow-md"
          :style="{ fontFamily: fontHeading }"
        >
          {{ groomName }}
          <span class="block text-[50px] md:text-[70px] lg:text-[80px] text-white/70 my-1.5 md:my-3">&amp;</span>
          {{ brideName }}
        </h1>

        <div class="w-12 md:w-16 h-px bg-white/30 my-6 md:my-10"></div>

        <div class="w-full max-w-[240px] md:max-w-[360px] lg:max-w-[420px] h-fit flex flex-col items-center gap-2 md:gap-4">
          <div class="flex items-center justify-center gap-3 mb-3 md:mb-5">
            <div class="h-px w-8 md:w-12 bg-white/40"></div>
            <MailOpen class="w-4 md:w-5 h-4 md:h-5 text-white/70" />
            <div class="h-px w-8 md:w-12 bg-white/40"></div>
          </div>

          <p class="text-[15px] md:text-[18px] uppercase tracking-[0.2em] text-white/70 font-medium ">Kepada Yth.</p>
          <h3 class="text-base md:text-xl lg:text-2xl font-semibold tracking-wide text-white break-words mb-10 md:mb-14 mt-4 md:mt-6">{{ guestName || 'Tamu Undangan' }}</h3>

          <button
            ref="stampRef"
            @click="bukaAmplop"
            class="
              w-16 md:w-20 h-16 md:h-20 rounded-full flex-shrink-0
              flex flex-col items-center justify-center gap-1
              bg-white/20 backdrop-blur-xl border border-white/40
              text-white hover:bg-white/30
              transition-colors duration-300 active:scale-95
              shadow-[0_4px_20px_rgba(0,0,0,0.2)]
            "
          >
            <Mail class="w-6 md:w-8 h-6 md:h-8" />
            <span class="text-[8px] md:text-[10px] tracking-widest uppercase font-semibold">Buka</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Mail, MailOpen } from 'lucide-vue-next';
import { gsap } from 'gsap';

defineProps<{
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

const stampRef = ref(null);

const bukaAmplop = () => {
  gsap.to(stampRef.value, {
    scale: 1.5,
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      emit('open');
    }
  });
};
</script>