<template>
  <section v-if="hasDate" style="padding: 60px 24px; text-align: center; background-color: #F5E6D0;">
    <h2 :style="{ fontFamily: themeConfig.fontHeading, color: '#5C3D2E', fontSize: '1.75rem', marginBottom: '32px' }">Menghitung Hari</h2>

    <!-- Countdown -->
    <div style="display: flex; justify-content: center; gap: 24px;">
      <div style="text-align: center;">
        <div style="font-size: 2rem; font-weight: 700; color: #5C3D2E;">{{ countdown.days }}</div>
        <div style="font-size: 0.75rem; color: #8B6F5C; text-transform: uppercase; letter-spacing: 0.1em;">Hari</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 2rem; font-weight: 700; color: #5C3D2E;">{{ countdown.hours }}</div>
        <div style="font-size: 0.75rem; color: #8B6F5C; text-transform: uppercase; letter-spacing: 0.1em;">Jam</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 2rem; font-weight: 700; color: #5C3D2E;">{{ countdown.minutes }}</div>
        <div style="font-size: 0.75rem; color: #8B6F5C; text-transform: uppercase; letter-spacing: 0.1em;">Menit</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 2rem; font-weight: 700; color: #5C3D2E;">{{ countdown.seconds }}</div>
        <div style="font-size: 0.75rem; color: #8B6F5C; text-transform: uppercase; letter-spacing: 0.1em;">Detik</div>
      </div>
    </div>

    <!-- Calendar Reminder -->
    <a v-if="invitation && (invitation.akad_date || invitation.resepsi_date)" :href="getCalendarUrl()" target="_blank" style="display: inline-block; margin-top: 32px; padding: 10px 24px; background-color: #5C3D2E; color: #FFF8E7; border-radius: 4px; font-size: 13px; text-decoration: none; letter-spacing: 0.1em;">
      Ingatkan Saya
    </a>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { generateGoogleCalendarUrl } from '@/utils/calendar';

const props = defineProps<{
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig: ThemeConfig;
  hasDate: boolean;
  invitation?: Invitation;
}>();

function getCalendarUrl() {
  if (!props.invitation) return '#';
  const dateStr = props.invitation.akad_date || props.invitation.resepsi_date;
  const timeStr = props.invitation.akad_date ? props.invitation.akad_time : props.invitation.resepsi_time;
  const venue = props.invitation.akad_date ? props.invitation.akad_venue : props.invitation.resepsi_venue;
  const address = props.invitation.akad_date ? props.invitation.akad_address : props.invitation.resepsi_address;
  if (!dateStr) return '#';
  return generateGoogleCalendarUrl({
    title: `Pernikahan ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
    date: dateStr,
    time: timeStr,
    venue: venue,
    address: address,
    description: `Undangan Pernikahan ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
  });
}
</script>
