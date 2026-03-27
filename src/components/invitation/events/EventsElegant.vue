<template>
  <section v-if="invitation.akad_venue || invitation.resepsi_venue" class="py-24 px-6 max-w-5xl mx-auto text-center">
    <h2 class="text-3xl md:text-5xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">Acara</h2>
    <div class="flex items-center justify-center gap-4 mb-16 text-[var(--theme-secondary)]">
      <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
      <span class="text-xl">📅</span>
      <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
    </div>
    
    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <!-- Akad -->
      <div v-if="invitation.akad_venue" class="p-8 md:p-10 rounded-2xl bg-[var(--theme-surface)] border border-black/5 shadow-sm text-left relative overflow-hidden group hover:shadow-md transition-shadow">
        <div class="text-4xl mb-6">💍</div>
        <h3 class="text-2xl font-bold text-[var(--theme-primary)] mb-6" :style="{ fontFamily: themeConfig.fontHeading }">Akad Nikah</h3>
        <div class="space-y-4 text-sm md:text-base text-[var(--theme-text-light)]">
          <div v-if="invitation.akad_date" class="flex gap-4">
            <span class="w-6 text-center">📅</span> <span>{{ formatDateLong(invitation.akad_date) }}</span>
          </div>
          <div v-if="invitation.akad_time" class="flex gap-4">
            <span class="w-6 text-center">🕐</span> <span>{{ invitation.akad_time }}</span>
          </div>
          <div v-if="invitation.akad_venue" class="flex gap-4">
            <span class="w-6 text-center">📍</span>
            <span>
              <strong class="text-[var(--theme-text)]">{{ invitation.akad_venue }}</strong>
              <br v-if="invitation.akad_address" />
              <span class="text-sm opacity-90">{{ invitation.akad_address }}</span>
            </span>
          </div>
        </div>
        <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" class="inline-flex items-center gap-2 mt-8 px-6 py-2.5 rounded-full border border-[var(--theme-secondary)] text-[var(--theme-primary)] font-medium text-sm hover:bg-[var(--theme-secondary)] hover:text-white transition-colors">
          📍 Buka Maps
        </a>
      </div>
      
      <!-- Resepsi -->
      <div v-if="invitation.resepsi_venue" class="p-8 md:p-10 rounded-2xl bg-[var(--theme-surface)] border border-black/5 shadow-sm text-left relative overflow-hidden group hover:shadow-md transition-shadow">
        <div class="text-4xl mb-6">🎉</div>
        <h3 class="text-2xl font-bold text-[var(--theme-primary)] mb-6" :style="{ fontFamily: themeConfig.fontHeading }">Resepsi</h3>
        <div class="space-y-4 text-sm md:text-base text-[var(--theme-text-light)]">
          <div v-if="invitation.resepsi_date" class="flex gap-4">
            <span class="w-6 text-center">📅</span> <span>{{ formatDateLong(invitation.resepsi_date) }}</span>
          </div>
          <div v-if="invitation.resepsi_time" class="flex gap-4">
            <span class="w-6 text-center">🕐</span> <span>{{ invitation.resepsi_time }}</span>
          </div>
          <div v-if="invitation.resepsi_venue" class="flex gap-4">
            <span class="w-6 text-center">📍</span>
            <span>
              <strong class="text-[var(--theme-text)]">{{ invitation.resepsi_venue }}</strong>
              <br v-if="invitation.resepsi_address" />
              <span class="text-sm opacity-90">{{ invitation.resepsi_address }}</span>
            </span>
          </div>
        </div>
        <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank" class="inline-flex items-center gap-2 mt-8 px-6 py-2.5 rounded-full border border-[var(--theme-secondary)] text-[var(--theme-primary)] font-medium text-sm hover:bg-[var(--theme-secondary)] hover:text-white transition-colors">
          📍 Buka Maps
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';

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
