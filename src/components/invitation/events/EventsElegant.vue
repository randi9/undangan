<template>
  <section v-if="invitation.akad_venue || invitation.resepsi_venue" class="py-24 px-6 max-w-5xl mx-auto text-center">
    <div v-if="invitation.groom_name && invitation.bride_name" style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: -0.25rem;">
      <span :style="{ fontFamily: themeConfig.fontHeading, fontSize: '3rem', color: 'var(--theme-primary)', transform: 'rotate(-5deg)', textShadow: '1px 1px 2px rgba(0,0,0,0.05)' }">{{ invitation.groom_name.charAt(0).toUpperCase() }}</span>
      <span :style="{ fontFamily: themeConfig.fontHeading, fontSize: '2rem', color: 'var(--theme-secondary)', fontStyle: 'italic', opacity: 0.8 }">&amp;</span>
      <span :style="{ fontFamily: themeConfig.fontHeading, fontSize: '3rem', color: 'var(--theme-primary)', transform: 'rotate(5deg)', textShadow: '1px 1px 2px rgba(0,0,0,0.05)' }">{{ invitation.bride_name.charAt(0).toUpperCase() }}</span>
    </div>
    <h2 class="text-3xl md:text-5xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">Acara</h2>
    <div class="flex items-center justify-center gap-4 mb-16 text-[var(--theme-secondary)]">
      <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
      <Icon icon="ph:calendar-heart-duotone" class="w-8 h-8" />
      <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
    </div>
    
    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <!-- Akad -->
      <div v-if="invitation.akad_venue" class="p-8 md:p-10 rounded-2xl bg-[var(--theme-surface)] border border-black/5 shadow-sm text-left relative overflow-hidden group hover:shadow-md transition-shadow">
        <Icon icon="ph:rings-duotone" class="w-12 h-12 mb-6 text-[var(--theme-secondary)]" />
        <h3 class="text-2xl font-bold text-[var(--theme-primary)] mb-6" :style="{ fontFamily: themeConfig.fontHeading }">Akad Nikah</h3>
        <div class="space-y-4 text-sm md:text-base text-[var(--theme-text-light)]">
          <div v-if="invitation.akad_date" class="flex gap-4">
            <Icon icon="ph:calendar-blank-duotone" class="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--theme-secondary)]" /> <span>{{ formatDateLong(invitation.akad_date) }}</span>
          </div>
          <div v-if="invitation.akad_time" class="flex gap-4">
            <Icon icon="ph:clock-duotone" class="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--theme-secondary)]" /> <span>{{ invitation.akad_time }}</span>
          </div>
          <div v-if="invitation.akad_venue" class="flex gap-4">
            <Icon icon="ph:map-pin-duotone" class="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--theme-secondary)]" />
            <span>
              <strong class="text-[var(--theme-text)]">{{ invitation.akad_venue }}</strong>
              <br v-if="invitation.akad_address" />
              <span class="text-sm opacity-90">{{ invitation.akad_address }}</span>
            </span>
          </div>
        </div>
        <div class="flex flex-wrap gap-3 mt-8">
          <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--theme-secondary)] text-[var(--theme-primary)] font-medium text-sm hover:bg-[var(--theme-secondary)] hover:text-white transition-colors">
            <Icon icon="ph:map-trifold-duotone" class="w-5 h-5" /> Buka Maps
          </a>
          <a v-if="invitation.akad_date" :href="getAkadCalendarUrl()" target="_blank" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--theme-secondary)] text-[var(--theme-primary)] font-medium text-sm hover:bg-[var(--theme-secondary)] hover:text-white transition-colors">
            <Icon icon="ph:calendar-plus-duotone" class="w-5 h-5" /> Ingatkan Saya
          </a>
        </div>
      </div>
      
      <!-- Resepsi -->
      <div v-if="invitation.resepsi_venue" class="p-8 md:p-10 rounded-2xl bg-[var(--theme-surface)] border border-black/5 shadow-sm text-left relative overflow-hidden group hover:shadow-md transition-shadow">
        <Icon icon="ph:confetti-duotone" class="w-12 h-12 mb-6 text-[var(--theme-secondary)]" />
        <h3 class="text-2xl font-bold text-[var(--theme-primary)] mb-6" :style="{ fontFamily: themeConfig.fontHeading }">Resepsi</h3>
        <div class="space-y-4 text-sm md:text-base text-[var(--theme-text-light)]">
          <div v-if="invitation.resepsi_date" class="flex gap-4">
            <Icon icon="ph:calendar-blank-duotone" class="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--theme-secondary)]" /> <span>{{ formatDateLong(invitation.resepsi_date) }}</span>
          </div>
          <div v-if="invitation.resepsi_time" class="flex gap-4">
            <Icon icon="ph:clock-duotone" class="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--theme-secondary)]" /> <span>{{ invitation.resepsi_time }}</span>
          </div>
          <div v-if="invitation.resepsi_venue" class="flex gap-4">
            <Icon icon="ph:map-pin-duotone" class="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--theme-secondary)]" />
            <span>
              <strong class="text-[var(--theme-text)]">{{ invitation.resepsi_venue }}</strong>
              <br v-if="invitation.resepsi_address" />
              <span class="text-sm opacity-90">{{ invitation.resepsi_address }}</span>
            </span>
          </div>
        </div>
        <div class="flex flex-wrap gap-3 mt-8">
          <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--theme-secondary)] text-[var(--theme-primary)] font-medium text-sm hover:bg-[var(--theme-secondary)] hover:text-white transition-colors">
            <Icon icon="ph:map-trifold-duotone" class="w-5 h-5" /> Buka Maps
          </a>
          <a v-if="invitation.resepsi_date" :href="getResepsiCalendarUrl()" target="_blank" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--theme-secondary)] text-[var(--theme-primary)] font-medium text-sm hover:bg-[var(--theme-secondary)] hover:text-white transition-colors">
            <Icon icon="ph:calendar-plus-duotone" class="w-5 h-5" /> Ingatkan Saya
          </a>
        </div>
      </div>
      
      <!-- Live Streaming -->
      <div v-if="invitation.streaming_enabled && invitation.streaming_url" class="md:col-span-2 p-8 md:p-10 rounded-2xl bg-[var(--theme-surface)] border border-black/5 shadow-sm text-center relative overflow-hidden group hover:shadow-md transition-shadow">
        <Icon icon="ph:video-camera-duotone" class="w-12 h-12 mx-auto mb-4 text-[var(--theme-secondary)]" />
        <h3 class="text-2xl font-bold text-[var(--theme-primary)] mb-3" :style="{ fontFamily: themeConfig.fontHeading }">Live Streaming</h3>
        <p class="text-sm md:text-base text-[var(--theme-text-light)] mb-8 max-w-2xl mx-auto">
          Bagi keluarga & sahabat yang berhalangan hadir secara langsung, Anda dapat mengikuti prosesi acara kami secara virtual melalui tautan berikut:
        </p>
        <div class="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-black/10 mt-6 mx-auto max-w-2xl bg-black/5">
          <iframe 
            :src="getEmbedUrl(invitation.streaming_url, invitation.streaming_platform || 'youtube') || ''" 
            class="absolute top-0 left-0 w-full h-full"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { generateGoogleCalendarUrl } from '@/utils/calendar';
import { getEmbedUrl } from '@/utils/streaming';
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
