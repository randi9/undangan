<template>
  <section v-if="invitation.akad_venue || invitation.resepsi_venue" style="padding: 60px 24px; text-align: center; background-color: #FFF8E7;">

    <!-- Akad -->
    <div v-if="invitation.akad_venue" style="margin-bottom: 48px;">
      <h3 :style="{ fontFamily: themeConfig.fontHeading, color: '#5C3D2E', fontSize: '1.75rem', marginBottom: '16px' }">Akad Nikah</h3>
      <p v-if="invitation.akad_date" style="font-size: 0.85rem; color: #8B6F5C; margin: 0 0 4px 0;">{{ formatDateLong(invitation.akad_date) }}</p>
      <p v-if="invitation.akad_time" style="font-size: 0.85rem; color: #8B6F5C; margin: 0 0 12px 0;">{{ invitation.akad_time }}</p>
      <p style="font-size: 0.9rem; font-weight: 600; color: #5C3D2E; margin: 0 0 4px 0;">{{ invitation.akad_venue }}</p>
      <p v-if="invitation.akad_address" style="font-size: 0.75rem; color: #8B6F5C; margin: 0 0 12px 0;">{{ invitation.akad_address }}</p>
      <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" style="display: inline-block; padding: 8px 20px; border: 1px solid #5C3D2E; color: #5C3D2E; border-radius: 4px; font-size: 12px; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em;">Buka Peta</a>
    </div>

    <!-- Resepsi -->
    <div v-if="invitation.resepsi_venue">
      <h3 :style="{ fontFamily: themeConfig.fontHeading, color: '#5C3D2E', fontSize: '1.75rem', marginBottom: '16px' }">Resepsi</h3>
      <p v-if="invitation.resepsi_date" style="font-size: 0.85rem; color: #8B6F5C; margin: 0 0 4px 0;">{{ formatDateLong(invitation.resepsi_date) }}</p>
      <p v-if="invitation.resepsi_time" style="font-size: 0.85rem; color: #8B6F5C; margin: 0 0 12px 0;">{{ invitation.resepsi_time }}</p>
      <p style="font-size: 0.9rem; font-weight: 600; color: #5C3D2E; margin: 0 0 4px 0;">{{ invitation.resepsi_venue }}</p>
      <p v-if="invitation.resepsi_address" style="font-size: 0.75rem; color: #8B6F5C; margin: 0 0 12px 0;">{{ invitation.resepsi_address }}</p>
      <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank" style="display: inline-block; padding: 8px 20px; border: 1px solid #5C3D2E; color: #5C3D2E; border-radius: 4px; font-size: 12px; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em;">Buka Peta</a>
    </div>

    <!-- Live Streaming -->
    <div v-if="invitation.streaming_enabled && invitation.streaming_url" style="margin-top: 48px;">
      <h3 :style="{ fontFamily: themeConfig.fontHeading, color: '#5C3D2E', fontSize: '1.5rem', marginBottom: '12px' }">Live Streaming</h3>
      <p style="font-size: 0.8rem; color: #8B6F5C; margin-bottom: 16px;">Ikuti acara kami secara virtual.</p>
      <div style="width: 100%; max-width: 400px; margin: 0 auto; aspect-ratio: 16/9; border-radius: 8px; overflow: hidden; background: #F5E6D0;">
        <iframe
          :src="getEmbedUrl(invitation.streaming_url, invitation.streaming_platform || 'youtube') || ''"
          style="width: 100%; height: 100%; border: none;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { getEmbedUrl } from '@/utils/streaming';

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
</script>
