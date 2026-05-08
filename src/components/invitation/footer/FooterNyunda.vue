<template>
  <footer style="padding: 60px 24px; text-align: center; background-color: #FFF8E7;">
    <p :style="{ fontFamily: themeConfig.fontHeading, color: '#5C3D2E', fontSize: '1.75rem', marginBottom: '16px' }">
      {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
    </p>
    <p style="font-size: 0.85rem; color: #8B6F5C; max-width: 360px; margin: 0 auto 60px; line-height: 1.6;">
      Terima kasih yang terdalam telah menjadi bagian dari hari bahagia kami. Doa restu Anda adalah anugerah terbesar.
    </p>

    <!-- Powered By -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: 5px; opacity: 0.9;">
      <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em; color: #A67B5B; font-weight: 700;">POWERED BY</span>
      <a href="https://mengundanganda.com" target="_blank" rel="noopener noreferrer" style="display: flex; flex-direction: column; align-items: center; gap: 8px; text-decoration: none; margin-top: 4px;">
        <img src="/images/logo.webp" alt="MengundangAnda Logo" style="width: 44px; height: 44px; object-fit: contain;" />
        <span style="font-size: 13px; font-weight: 700; letter-spacing: 0.15em; color: #5C3D2E;">
          Mengundang<span style="font-weight: 700; color: #3b82f6;">Anda</span>
        </span>
      </a>
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
