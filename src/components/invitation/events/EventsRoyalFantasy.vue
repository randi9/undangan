<template>
  <section v-if="invitation.akad_venue || invitation.resepsi_venue" ref="eventsSection" class="relative py-24 px-4 md:px-8 bg-[#18201B] overflow-hidden text-center">
    <!-- Ambient Radial Glow -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(circle at 50% 50%, rgba(112, 132, 120, 0.2) 0%, transparent 70%);"
    ></div>

    <div class="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
      <!-- Section Header -->
      <div ref="headerRef" class="opacity-0 translate-y-6 mb-16 text-center">
        <div class="flex items-center justify-center gap-2 mb-2">
          <span class="text-[#D4A6AD] text-xs">✦</span>
          <span class="text-xs uppercase tracking-[0.35em] text-[#D4A6AD] font-semibold">Rangkaian Acara</span>
          <span class="text-[#D4A6AD] text-xs">✦</span>
        </div>
        <h2
          class="text-3xl md:text-5xl font-serif text-[#ECE0D3] font-normal"
          :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
        >
          Agenda Pernikahan
        </h2>
        <div class="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#708478] to-transparent mx-auto mt-4"></div>
      </div>

      <!-- Events Cards Grid -->
      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
        <!-- Akad Nikah Card -->
        <div
          v-if="invitation.akad_venue"
          ref="akadRef"
          class="event-card relative p-8 md:p-10 rounded-3xl border border-[#708478]/50 bg-[#243029]/80 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(212,166,173,0.1)] text-left flex flex-col justify-between opacity-0 translate-y-8"
        >
          <span class="absolute top-3 left-4 text-[#D4A6AD]/60 text-xs">❖</span>
          <span class="absolute top-3 right-4 text-[#D4A6AD]/60 text-xs">❖</span>

          <div>
            <div class="w-12 h-12 rounded-2xl border border-[#708478]/50 bg-[#1E2622] flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(212,166,173,0.15)]">
              <Icon icon="ph:rings-duotone" class="w-6 h-6 text-[#D4A6AD]" />
            </div>

            <h3
              class="text-2xl md:text-3xl font-normal text-[#ECE0D3] mb-6"
              :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
            >
              Akad Nikah
            </h3>

            <div class="space-y-4 text-xs md:text-sm text-[#ECE0D3]/80">
              <div v-if="invitation.akad_date" class="flex gap-3.5 items-start">
                <Icon icon="ph:calendar-blank-duotone" class="w-5 h-5 flex-shrink-0 text-[#D4A6AD] mt-0.5" />
                <span class="font-medium text-[#ECE0D3]">{{ formatDateLong(invitation.akad_date) }}</span>
              </div>
              <div v-if="invitation.akad_time" class="flex gap-3.5 items-start">
                <Icon icon="ph:clock-duotone" class="w-5 h-5 flex-shrink-0 text-[#D4A6AD] mt-0.5" />
                <span>{{ invitation.akad_time }}</span>
              </div>
              <div v-if="invitation.akad_venue" class="flex gap-3.5 items-start">
                <Icon icon="ph:map-pin-duotone" class="w-5 h-5 flex-shrink-0 text-[#D4A6AD] mt-0.5" />
                <div>
                  <strong class="text-[#ECE0D3] block text-sm">{{ invitation.akad_venue }}</strong>
                  <span v-if="invitation.akad_address" class="text-xs text-[#D4A6AD] leading-relaxed block mt-1">
                    {{ invitation.akad_address }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-3 mt-8 pt-4 border-t border-[#708478]/30">
            <a
              v-if="invitation.akad_map_url"
              :href="invitation.akad_map_url"
              target="_blank"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider text-[#18201B] bg-gradient-to-r from-[#D4A6AD] via-[#ECE0D3] to-[#D4A6AD] shadow-md hover:scale-105 transition-all"
            >
              <Icon icon="ph:map-trifold-duotone" class="w-4 h-4" /> Buka Google Maps
            </a>
            <a
              v-if="invitation.akad_date"
              :href="getAkadCalendarUrl()"
              target="_blank"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider text-[#ECE0D3] border border-[#D4A6AD]/60 hover:bg-[#D4A6AD]/20 transition-all"
            >
              <Icon icon="ph:calendar-plus-duotone" class="w-4 h-4 text-[#D4A6AD]" /> Simpan Kalender
            </a>
          </div>
        </div>

        <!-- Resepsi Card -->
        <div
          v-if="invitation.resepsi_venue"
          ref="resepsiRef"
          class="event-card relative p-8 md:p-10 rounded-3xl border border-[#708478]/50 bg-[#243029]/80 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(212,166,173,0.1)] text-left flex flex-col justify-between opacity-0 translate-y-8"
        >
          <span class="absolute top-3 left-4 text-[#D4A6AD]/60 text-xs">❖</span>
          <span class="absolute top-3 right-4 text-[#D4A6AD]/60 text-xs">❖</span>

          <div>
            <div class="w-12 h-12 rounded-2xl border border-[#708478]/50 bg-[#1E2622] flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(212,166,173,0.15)]">
              <Icon icon="ph:confetti-duotone" class="w-6 h-6 text-[#D4A6AD]" />
            </div>

            <h3
              class="text-2xl md:text-3xl font-normal text-[#ECE0D3] mb-6"
              :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
            >
              Resepsi Pernikahan
            </h3>

            <div class="space-y-4 text-xs md:text-sm text-[#ECE0D3]/80">
              <div v-if="invitation.resepsi_date" class="flex gap-3.5 items-start">
                <Icon icon="ph:calendar-blank-duotone" class="w-5 h-5 flex-shrink-0 text-[#D4A6AD] mt-0.5" />
                <span class="font-medium text-[#ECE0D3]">{{ formatDateLong(invitation.resepsi_date) }}</span>
              </div>
              <div v-if="invitation.resepsi_time" class="flex gap-3.5 items-start">
                <Icon icon="ph:clock-duotone" class="w-5 h-5 flex-shrink-0 text-[#D4A6AD] mt-0.5" />
                <span>{{ invitation.resepsi_time }}</span>
              </div>
              <div v-if="invitation.resepsi_venue" class="flex gap-3.5 items-start">
                <Icon icon="ph:map-pin-duotone" class="w-5 h-5 flex-shrink-0 text-[#D4A6AD] mt-0.5" />
                <div>
                  <strong class="text-[#ECE0D3] block text-sm">{{ invitation.resepsi_venue }}</strong>
                  <span v-if="invitation.resepsi_address" class="text-xs text-[#D4A6AD] leading-relaxed block mt-1">
                    {{ invitation.resepsi_address }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-3 mt-8 pt-4 border-t border-[#708478]/30">
            <a
              v-if="invitation.resepsi_map_url"
              :href="invitation.resepsi_map_url"
              target="_blank"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider text-[#18201B] bg-gradient-to-r from-[#D4A6AD] via-[#ECE0D3] to-[#D4A6AD] shadow-md hover:scale-105 transition-all"
            >
              <Icon icon="ph:map-trifold-duotone" class="w-4 h-4" /> Buka Google Maps
            </a>
            <a
              v-if="invitation.resepsi_date"
              :href="getResepsiCalendarUrl()"
              target="_blank"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider text-[#ECE0D3] border border-[#D4A6AD]/60 hover:bg-[#D4A6AD]/20 transition-all"
            >
              <Icon icon="ph:calendar-plus-duotone" class="w-4 h-4 text-[#D4A6AD]" /> Simpan Kalender
            </a>
          </div>
        </div>

        <!-- Live Streaming Card -->
        <div
          v-if="invitation.streaming_enabled && invitation.streaming_url"
          class="md:col-span-2 p-8 md:p-10 rounded-3xl border border-[#708478]/50 bg-[#243029]/80 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.5)] text-center relative overflow-hidden"
        >
          <Icon icon="ph:video-camera-duotone" class="w-10 h-10 mx-auto mb-4 text-[#D4A6AD]" />
          <h3
            class="text-2xl font-normal text-[#ECE0D3] mb-3"
            :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
          >
            Live Streaming
          </h3>
          <p class="text-xs md:text-sm text-[#D4A6AD] mb-6 max-w-xl mx-auto leading-relaxed">
            Bagi keluarga dan sahabat yang berhalangan hadir secara langsung, Anda dapat mengikuti siaran langsung prosesi pernikahan kami secara daring melalui tautan berikut:
          </p>
          <div class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-[#708478]/40 max-w-2xl mx-auto bg-black/60">
            <iframe
              :src="getEmbedUrl(invitation.streaming_url, invitation.streaming_platform || 'youtube') || ''"
              class="absolute top-0 left-0 w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { generateGoogleCalendarUrl } from '@/utils/calendar';
import { getEmbedUrl } from '@/utils/streaming';
import { Icon } from '@iconify/vue';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  countdown?: { days: number; hours: number; minutes: number; seconds: number };
  hasDate?: boolean;
}>();

const eventsSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const akadRef = ref<HTMLElement | null>(null);
const resepsiRef = ref<HTMLElement | null>(null);

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

onMounted(() => {
  if (!eventsSection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: eventsSection.value,
      start: 'top 75%',
    },
  });

  tl.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
  }).to(
    [akadRef.value, resepsiRef.value].filter(Boolean),
    {
      opacity: 1,
      y: 0,
      duration: 1.0,
      stagger: 0.2,
      ease: 'power3.out',
    },
    '-=0.4',
  );
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((st) => st.kill());
});
</script>
