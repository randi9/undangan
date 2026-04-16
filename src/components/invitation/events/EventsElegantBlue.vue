<template>
  <section v-if="invitation.akad_venue || invitation.resepsi_venue" class="p-6 w-full min-h-[100dvh] flex flex-col items-center justify-center text-center relative overflow-hidden" style="background-color: #073a69;">
    <div class="max-w-5xl mx-auto w-full relative z-10 flex flex-col items-center justify-center">
      <!-- Replacement Layout (Wreath Asset) -->
      <div class="relative w-full max-w-[320px] md:max-w-[400px] mx-auto flex flex-col items-center justify-center">
        <!-- Asset Background -->
        <img src="https://media.mengundanganda.com/elegant_blue/event%20section/randidewi_acc22787-ddcb-438c-a0e8-93dd3bbaf620.webp" alt="Gold Frame" class="w-full h-auto object-contain" />
        
        <!-- Text Overlay -->
        <div class="absolute inset-0 pointer-events-none" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 5%;">
          <!-- Interlocking Initials -->
          <div style="display: flex; align-items: center; justify-content: center;">
            <span :style="{ fontFamily: themeConfig.fontHeading, fontSize: 'clamp(4.5rem, 12vw, 5.5rem)', color: '#304851', lineHeight: '1', transform: 'translateX(10px)', marginBottom: 'clamp(20px, 8vw, 50px)' }">{{ invitation.groom_name ? invitation.groom_name.charAt(0).toUpperCase() : 'R' }}</span>
            <span :style="{ fontFamily: themeConfig.fontHeading, fontSize: 'clamp(4.5rem, 12vw, 5.5rem)', color: '#304851', lineHeight: '1', transform: 'translateX(-10px)', marginTop: 'clamp(20px, 8vw, 50px)' }">{{ invitation.bride_name ? invitation.bride_name.charAt(0).toUpperCase() : 'D' }}</span>
          </div>
          
          <!-- Full Names -->
          <div style="margin-top: clamp(10px, 3vw, 20px); color: #304851; font-size: clamp(0.6rem, 1.8vw, 0.75rem); font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-weight: 500; text-transform: uppercase; letter-spacing: 0.25em;">
            {{ invitation.groom_name || 'RANDI' }} &amp; {{ invitation.bride_name || 'DEWI' }}
          </div>
          
          <!-- Date -->
          <div style="margin-top: clamp(4px, 1.5vw, 8px); color: rgba(48, 72, 81, 0.7); font-size: clamp(0.55rem, 1.5vw, 0.65rem); font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; letter-spacing: 0.25em;">
            <span v-if="invitation.akad_date">{{ new Date(invitation.akad_date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.') }}</span>
            <span v-else>07.21.2027</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { generateGoogleCalendarUrl } from '@/utils/calendar';
import { Icon } from '@iconify/vue';

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

function getAkadCalendarUrl() {
  return generateGoogleCalendarUrl({
    title: `Akad Nikah ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
    date: props.invitation.akad_date!,
    time: props.invitation.akad_time,
    venue: props.invitation.akad_venue,
    address: props.invitation.akad_address,
    description: `Undangan Pernikahan ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
  });
}

function getResepsiCalendarUrl() {
  return generateGoogleCalendarUrl({
    title: `Resepsi ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
    date: props.invitation.resepsi_date!,
    time: props.invitation.resepsi_time,
    venue: props.invitation.resepsi_venue,
    address: props.invitation.resepsi_address,
    description: `Undangan Pernikahan ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
  });
}

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
