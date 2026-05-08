<template>
  <section style="padding: 60px 24px; text-align: center; background-color: #FFF8E7;">
    <h2 :style="{ fontFamily: themeConfig.fontHeading, color: '#5C3D2E', fontSize: '2rem', marginBottom: '40px' }">Mempelai</h2>

    <!-- Groom -->
    <div style="margin-bottom: 40px;">
      <div style="width: 150px; height: 150px; border-radius: 50%; overflow: hidden; margin: 0 auto 16px auto; background-color: #F5E6D0;">
        <img v-if="invitation.groom_photo" :src="resolveAssetUrl(invitation.groom_photo, apiBase)" alt="Groom" style="width: 100%; height: 100%; object-fit: cover;" />
        <div v-else style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #A67B5B;">👤</div>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #5C3D2E; margin: 0 0 8px 0;">{{ invitation.groom_full_name || invitation.groom_name }}</h3>
      <p v-if="invitation.groom_father || invitation.groom_mother" style="font-size: 0.85rem; color: #8B6F5C; margin: 0;">
        Putra dari<br />
        <span v-if="invitation.groom_father">Bapak {{ invitation.groom_father }}</span>
        <span v-if="invitation.groom_father && invitation.groom_mother"> &amp; </span>
        <span v-if="invitation.groom_mother">Ibu {{ invitation.groom_mother }}</span>
      </p>
    </div>

    <!-- Ampersand -->
    <div style="font-size: 2rem; color: #A67B5B; margin: 24px 0;" :style="{ fontFamily: themeConfig.fontHeading }">&amp;</div>

    <!-- Bride -->
    <div>
      <div style="width: 150px; height: 150px; border-radius: 50%; overflow: hidden; margin: 0 auto 16px auto; background-color: #F5E6D0;">
        <img v-if="invitation.bride_photo" :src="resolveAssetUrl(invitation.bride_photo, apiBase)" alt="Bride" style="width: 100%; height: 100%; object-fit: cover;" />
        <div v-else style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #A67B5B;">👤</div>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #5C3D2E; margin: 0 0 8px 0;">{{ invitation.bride_full_name || invitation.bride_name }}</h3>
      <p v-if="invitation.bride_father || invitation.bride_mother" style="font-size: 0.85rem; color: #8B6F5C; margin: 0;">
        Putri dari<br />
        <span v-if="invitation.bride_father">Bapak {{ invitation.bride_father }}</span>
        <span v-if="invitation.bride_father && invitation.bride_mother"> &amp; </span>
        <span v-if="invitation.bride_mother">Ibu {{ invitation.bride_mother }}</span>
      </p>
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
