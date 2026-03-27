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
          class="text-[80px] leading-[1.1] drop-shadow-md"
          :style="{ fontFamily: fontHeading }"
        >
          {{ groomName }}
          <span class="block text-[50px] text-white/70 my-1.5">&amp;</span>
          {{ brideName }}
        </h1>

        <div class="w-12 h-px bg-white/30 my-6"></div>

        <div class="w-full max-w-[240px] h-fit flex flex-col items-center gap-2">
          <div class="flex items-center justify-center gap-3 mb-3">
            <div class="h-px w-8 bg-white/40"></div>
            <MailOpen class="w-4 h-4 text-white/70" />
            <div class="h-px w-8 bg-white/40"></div>
          </div>

          <p class="text-[15px] uppercase tracking-[0.2em] text-white/70 font-medium ">Kepada Yth.</p>
          <h3 class="text-base font-semibold tracking-wide text-white break-words mb-10 mt-4">{{ guestName || 'Tamu Undangan' }}</h3>

          <button
            ref="stampRef"
            @click="bukaAmplop"
            class="
              w-16 h-16 rounded-full flex-shrink-0
              flex flex-col items-center justify-center gap-1
              bg-white/20 backdrop-blur-xl border border-white/40
              text-white hover:bg-white/30
              transition-colors duration-300 active:scale-95
              shadow-[0_4px_20px_rgba(0,0,0,0.2)]
            "
          >
            <Mail class="w-6 h-6" />
            <span class="text-[8px] tracking-widest uppercase font-semibold">Buka</span>
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