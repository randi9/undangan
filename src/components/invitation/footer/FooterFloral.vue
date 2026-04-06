<template>
  <footer class="py-20 px-6 text-center text-[#1e3a5f] relative overflow-hidden bg-white">
    <div class="absolute inset-0 bg-gradient-to-b from-white to-[#f0f5ff] z-0"></div>
    <div class="relative z-10 flex flex-col items-center justify-center">
      <p class="text-4xl md:text-5xl mb-4 text-[#1e3a5f] drop-shadow-sm" :style="{ fontFamily: themeConfig.fontHeading }">
        {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
      </p>
      <p class="text-sm font-medium tracking-wide text-[#475569]">Terima kasih telah menjadi bagian dari kebahagiaan kami</p>
      
      <div class="mt-16 flex flex-col items-center gap-3 border-t border-[#1e3a5f]/10 pt-8 w-full max-w-sm mx-auto">
        <span class="text-[10px] uppercase tracking-widest text-[#64748b] font-bold">Dibuat dengan</span>
        <a href="https://mengundanganda.fun" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-300">
          <img src="/images/logo.webp" alt="MengundangAnda Logo" class="w-8 h-8 md:w-10 md:h-10 object-contain mb-1 drop-shadow-sm" />
          <span class="text-sm md:text-base font-bold tracking-[0.15em] text-[#0f2440]">Mengundang<span class="font-normal text-[#3b82f6]">Anda</span></span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';

defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();
</script>
