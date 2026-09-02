<template>
  <section v-if="hasDate" ref="countdownSection" class="relative w-full py-20 px-4 md:px-6 flex flex-col justify-center items-center text-center overflow-hidden bg-[#18201B]">
    <!-- Ambient Radial Glow -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(circle at 50% 50%, rgba(112, 132, 120, 0.25) 0%, transparent 70%);"
    ></div>

    <!-- Header -->
    <div class="relative z-10 mb-10">
      <span class="text-xs uppercase tracking-[0.35em] text-[#D4A6AD] font-semibold block mb-2">Save The Date</span>
      <h2
        class="text-3xl md:text-5xl text-[#ECE0D3] font-normal"
        :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
      >
        Menghitung Hari
      </h2>
      <p class="text-xs md:text-sm text-[#D4A6AD] tracking-wider mt-2">
        Menuju ikatan suci dan hari bahagia kami
      </p>
      <div class="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#708478] to-transparent mx-auto mt-4"></div>
    </div>

    <!-- Royal Glowing Digits Grid -->
    <div class="relative z-10 grid grid-cols-4 gap-3 md:gap-6 max-w-lg mx-auto w-full">
      <!-- Days -->
      <div class="flex flex-col items-center py-4 px-2 rounded-2xl border border-[#708478]/50 bg-[#243029]/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(212,166,173,0.15)]">
        <span class="text-2xl md:text-4xl font-serif font-bold text-[#ECE0D3] drop-shadow-[0_0_8px_rgba(236,224,211,0.3)]">
          {{ padZero(countdown.days) }}
        </span>
        <span class="text-[10px] md:text-xs uppercase tracking-widest text-[#D4A6AD] mt-1 font-medium">Hari</span>
      </div>

      <!-- Hours -->
      <div class="flex flex-col items-center py-4 px-2 rounded-2xl border border-[#708478]/50 bg-[#243029]/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(212,166,173,0.15)]">
        <span class="text-2xl md:text-4xl font-serif font-bold text-[#ECE0D3] drop-shadow-[0_0_8px_rgba(236,224,211,0.3)]">
          {{ padZero(countdown.hours) }}
        </span>
        <span class="text-[10px] md:text-xs uppercase tracking-widest text-[#D4A6AD] mt-1 font-medium">Jam</span>
      </div>

      <!-- Minutes -->
      <div class="flex flex-col items-center py-4 px-2 rounded-2xl border border-[#708478]/50 bg-[#243029]/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(212,166,173,0.15)]">
        <span class="text-2xl md:text-4xl font-serif font-bold text-[#ECE0D3] drop-shadow-[0_0_8px_rgba(236,224,211,0.3)]">
          {{ padZero(countdown.minutes) }}
        </span>
        <span class="text-[10px] md:text-xs uppercase tracking-widest text-[#D4A6AD] mt-1 font-medium">Menit</span>
      </div>

      <!-- Seconds -->
      <div class="flex flex-col items-center py-4 px-2 rounded-2xl border border-[#708478]/50 bg-[#243029]/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(212,166,173,0.15)]">
        <span class="text-2xl md:text-4xl font-serif font-bold text-[#ECE0D3] drop-shadow-[0_0_8px_rgba(236,224,211,0.3)]">
          {{ padZero(countdown.seconds) }}
        </span>
        <span class="text-[10px] md:text-xs uppercase tracking-widest text-[#D4A6AD] mt-1 font-medium">Detik</span>
      </div>
    </div>

    <!-- Calendar Reminder Button -->
    <div class="relative z-10 mt-10">
      <a
        v-if="invitation && (invitation.akad_date || invitation.resepsi_date)"
        :href="getCalendarUrl()"
        target="_blank"
        class="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs md:text-sm font-semibold tracking-wider text-[#18201B] bg-gradient-to-r from-[#D4A6AD] via-[#ECE0D3] to-[#D4A6AD] shadow-[0_4px_20px_rgba(212,166,173,0.35)] hover:shadow-[0_6px_30px_rgba(236,224,211,0.5)] hover:scale-105 transition-all duration-300"
      >
        <Icon icon="ph:calendar-plus-duotone" class="w-4 h-4 text-[#18201B]" />
        Simpan ke Google Calendar
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { generateGoogleCalendarUrl } from '@/utils/calendar';
import { Icon } from '@iconify/vue';

const props = defineProps<{
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig: ThemeConfig;
  hasDate: boolean;
  invitation?: Invitation;
}>();

const countdownSection = ref<HTMLElement | null>(null);

const padZero = (val: number) => {
  return val.toString().padStart(2, '0');
};

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
