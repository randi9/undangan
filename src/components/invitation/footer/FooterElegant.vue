<template>
  <footer class="py-20 px-6 text-center text-white relative overflow-hidden">
    <div class="absolute inset-0 bg-gray-900 z-0"></div>
    <div class="absolute inset-0" :style="{ background: themeConfig.overlayGradient }"></div>
    <div class="relative z-10">
      <p class="text-4xl md:text-5xl mb-4 text-[var(--theme-secondary)]" :style="{ fontFamily: themeConfig.fontHeading }">
        {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
      </p>
      <p class="text-sm font-light tracking-wide opacity-80">Terima kasih telah menjadi bagian dari kebahagiaan kami</p>
      <div class="mt-12 text-xs opacity-40">
        Dibuat dengan MengundangAnda
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
