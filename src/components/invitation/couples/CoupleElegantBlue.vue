<template>
  <section class="relative py-24 px-6 text-center bg-[#405C66] overflow-hidden">
    <!-- Content Container -->
    <div class="max-w-5xl mx-auto relative z-10">
      <h2 class="text-3xl md:text-5xl mb-2 text-[#F8F9FA] drop-shadow-sm tracking-widest" :style="{ fontFamily: themeConfig.fontHeading }">Mempelai</h2>
      <div class="flex items-center justify-center gap-4 mb-16 text-white/50">
        <div class="h-px w-16 bg-white/30"></div>
        <span class="text-xl">♥</span>
        <div class="h-px w-16 bg-white/30"></div>
      </div>
      
      <div class="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8">
        <!-- Groom -->
        <div class="flex-1 flex flex-col items-center">
          <div class="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 border-[6px] shadow-2xl border-white/10 bg-white/5 backdrop-blur-sm">
            <img v-if="invitation.groom_photo" :src="resolveAssetUrl(invitation.groom_photo, apiBase)" class="w-full h-full object-cover" alt="Groom" />
            <div v-else class="w-full h-full flex items-center justify-center text-4xl text-white/50">👤</div>
          </div>
          <h3 class="text-2xl md:text-3xl font-bold mb-3 text-white drop-shadow-sm" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.groom_full_name || invitation.groom_name }}</h3>
          <p v-if="invitation.groom_father || invitation.groom_mother" class="text-sm md:text-base text-blue-100/80 font-light tracking-wide">
            Putra dari<br/>
            <span v-if="invitation.groom_father" class="font-medium text-white/90">Bapak {{ invitation.groom_father }}</span>
            <span v-if="invitation.groom_father && invitation.groom_mother"> &amp; </span>
            <span v-if="invitation.groom_mother" class="font-medium text-white/90">Ibu {{ invitation.groom_mother }}</span>
          </p>
        </div>
        
        <!-- Divider -->
        <div class="text-5xl md:text-7xl text-white/30 font-light drop-shadow-sm" :style="{ fontFamily: themeConfig.fontHeading }">&amp;</div>
        
        <!-- Bride -->
        <div class="flex-1 flex flex-col items-center">
          <div class="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 border-[6px] shadow-2xl border-white/10 bg-white/5 backdrop-blur-sm">
            <img v-if="invitation.bride_photo" :src="resolveAssetUrl(invitation.bride_photo, apiBase)" class="w-full h-full object-cover" alt="Bride" />
            <div v-else class="w-full h-full flex items-center justify-center text-4xl text-white/50">👤</div>
          </div>
          <h3 class="text-2xl md:text-3xl font-bold mb-3 text-white drop-shadow-sm" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.bride_full_name || invitation.bride_name }}</h3>
          <p v-if="invitation.bride_father || invitation.bride_mother" class="text-sm md:text-base text-blue-100/80 font-light tracking-wide">
            Putri dari<br/>
            <span v-if="invitation.bride_father" class="font-medium text-white/90">Bapak {{ invitation.bride_father }}</span>
            <span v-if="invitation.bride_father && invitation.bride_mother"> &amp; </span>
            <span v-if="invitation.bride_mother" class="font-medium text-white/90">Ibu {{ invitation.bride_mother }}</span>
          </p>
        </div>
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
