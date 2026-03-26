<template>
  <div
    :class="[
      'fixed inset-0 z-50 flex flex-col transition-all duration-1000 overflow-hidden w-full h-screen min-h-[100dvh] h-[100dvh]',
      isClosing ? '-translate-y-full opacity-0 pointer-events-none' : '',
    ]"
  >
    <!-- Background Layer — truly fullscreen absolute wrapper -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
  <img
    src="https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/0cb12e55-7f41-4aeb-bff0-9b81a3ddfa5a.webp"
    alt="Cover Background"
    class="min-w-full min-h-full w-full h-full object-cover object-center scale-110"
  />
  <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/80"></div>
</div>

    <!-- Content — relative flex layout to float OVER the background -->
    <div class="relative z-10 flex flex-col items-center justify-between w-full h-full px-6 py-10 text-center text-white">
      
      <!-- Top spacer (can be adjusted if names need to be higher) -->
      <div class="flex-1 mt-4">
        <!-- Optional space above names if needed -->
      </div>

      <!-- Center: Couple names -->
      <div class="flex flex-col items-center w-full">
        <p
          class="uppercase tracking-[0.35em] text-[11px] mb-4 text-white/80 font-medium"
          :style="{ fontFamily: fontBody }"
        >
          The Wedding Of
        </p>
        <h1
          class="text-[2.75rem] leading-[1.1] drop-shadow-md"
          :style="{ fontFamily: fontHeading }"
        >
          {{ groomName }}
          <span class="block text-xl text-white/70 my-1.5">&amp;</span>
          {{ brideName }}
        </h1>
      </div>

      <!-- Bottom spacer -->
      <div class="flex-1"></div>

      <!-- Bottom: Guest card + CTA -->
      <div class="w-full max-w-[280px] flex flex-col items-center drop-shadow-2xl mt-auto mb-4">
        <!-- Guest card with glass effect -->
        <div class="w-full rounded-t-2xl border border-white/20 px-4 py-5">
          <!-- Decorative divider -->
          <div class="flex items-center justify-center gap-3 mb-3">
            <div class="h-px w-8 bg-white/40"></div>
            <MailOpen class="w-4 h-4 text-white/70" />
            <div class="h-px w-8 bg-white/40"></div>
          </div>

          <p class="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/70 mb-1.5 font-medium">Kepada Yth.</p>
          <h3 class="text-base font-semibold tracking-wide text-white break-words">{{ guestName || 'Tamu Undangan' }}</h3>
        </div>

        <!-- CTA Button -->
        <button
          @click="$emit('open')"
          class="
            w-full py-3.5 rounded-b-2xl
            text-[12px] font-semibold tracking-widest uppercase
            transition-all duration-300 active:scale-[0.98]
            bg-white/20 backdrop-blur-xl border border-white/30 border-t-white/10
            text-white hover:bg-white/30
            flex items-center justify-center gap-2.5
            shadow-[0_8px_32px_rgba(0,0,0,0.5)]
          "
        >
          <Mail class="w-[18px] h-[18px]" />
          <span>Buka Undangan</span>
        </button>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { Mail, MailOpen } from 'lucide-vue-next';

defineProps<{
  groomName: string;
  brideName: string;
  guestName: string;
  isClosing: boolean;
  fontHeading?: string;
  fontBody?: string;
}>();

defineEmits<{
  (e: 'open'): void;
}>();
</script>
