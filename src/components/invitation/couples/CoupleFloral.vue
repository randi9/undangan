<template>
  <section class="py-24 px-6 max-w-5xl mx-auto text-center">
    <h2 class="text-3xl md:text-5xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">Mempelai</h2>
    <div class="flex items-center justify-center gap-4 mb-16 text-[var(--theme-secondary)]">
      <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
      <span class="text-xl">♥</span>
      <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
    </div>
    
    <div class="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8">
      <!-- Groom -->
      <div class="flex-1 flex flex-col items-center">
        <div class="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 border-4 shadow-xl" :style="{ borderColor: themeConfig.secondary }">
          <img v-if="invitation.groom_photo" :src="resolveAssetUrl(invitation.groom_photo, apiBase)" class="w-full h-full object-cover" alt="Groom" />
          <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400">👤</div>
        </div>
        <h3 class="text-2xl md:text-3xl font-bold mb-3 text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.groom_full_name || invitation.groom_name }}</h3>
        <p v-if="invitation.groom_father || invitation.groom_mother" class="text-sm md:text-base text-[var(--theme-text-light)]">
          Putra dari<br/>
          <span v-if="invitation.groom_father">Bapak {{ invitation.groom_father }}</span>
          <span v-if="invitation.groom_father && invitation.groom_mother"> &amp; </span>
          <span v-if="invitation.groom_mother">Ibu {{ invitation.groom_mother }}</span>
        </p>
      </div>
      
      <!-- Divider -->
      <div class="text-5xl md:text-7xl text-[var(--theme-secondary)] opacity-50" :style="{ fontFamily: themeConfig.fontHeading }">&amp;</div>
      
      <!-- Bride -->
      <div class="flex-1 flex flex-col items-center">
        <div class="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 border-4 shadow-xl" :style="{ borderColor: themeConfig.secondary }">
          <img v-if="invitation.bride_photo" :src="resolveAssetUrl(invitation.bride_photo, apiBase)" class="w-full h-full object-cover" alt="Bride" />
          <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400">👤</div>
        </div>
        <h3 class="text-2xl md:text-3xl font-bold mb-3 text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.bride_full_name || invitation.bride_name }}</h3>
        <p v-if="invitation.bride_father || invitation.bride_mother" class="text-sm md:text-base text-[var(--theme-text-light)]">
          Putri dari<br/>
          <span v-if="invitation.bride_father">Bapak {{ invitation.bride_father }}</span>
          <span v-if="invitation.bride_father && invitation.bride_mother"> &amp; </span>
          <span v-if="invitation.bride_mother">Ibu {{ invitation.bride_mother }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  apiBase: string;
}>();
</script>
