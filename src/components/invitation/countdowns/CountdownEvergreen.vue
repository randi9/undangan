<template>
  <section ref="countdownSection" class="py-20 px-4 md:px-8 bg-[#EBF2EE] relative overflow-hidden text-center">
    <div class="max-w-3xl mx-auto relative z-10">
      <!-- Section Header -->
      <div ref="headerRef" class="opacity-0 translate-y-6 mb-12">
        <span class="text-xs uppercase tracking-[0.3em] text-[#5C7367] font-semibold block mb-2">Menghitung Hari</span>
        <h2 class="text-3xl md:text-5xl font-serif text-[#2D3E35] font-medium" style="font-family: 'Cormorant Garamond', Georgia, serif;">
          Menuju Hari Bahagia
        </h2>
        <div class="w-12 h-[1.5px] bg-[#7A9A8B] mx-auto mt-4"></div>
      </div>

      <!-- Countdown Grid -->
      <div v-if="hasDate" ref="gridRef" class="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto mb-12 opacity-0 translate-y-8">
        <!-- Days -->
        <div class="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6 border border-[#8B9E8B]/30 shadow-[0_8px_24px_rgba(45,62,53,0.05)] flex flex-col items-center">
          <span class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2D3E35] leading-none mb-2" style="font-family: 'Cormorant Garamond', Georgia, serif;">
            {{ pad(countdown.days) }}
          </span>
          <span class="text-[10px] sm:text-xs uppercase tracking-widest text-[#5C7367] font-medium">Hari</span>
        </div>

        <!-- Hours -->
        <div class="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6 border border-[#8B9E8B]/30 shadow-[0_8px_24px_rgba(45,62,53,0.05)] flex flex-col items-center">
          <span class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2D3E35] leading-none mb-2" style="font-family: 'Cormorant Garamond', Georgia, serif;">
            {{ pad(countdown.hours) }}
          </span>
          <span class="text-[10px] sm:text-xs uppercase tracking-widest text-[#5C7367] font-medium">Jam</span>
        </div>

        <!-- Minutes -->
        <div class="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6 border border-[#8B9E8B]/30 shadow-[0_8px_24px_rgba(45,62,53,0.05)] flex flex-col items-center">
          <span class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2D3E35] leading-none mb-2" style="font-family: 'Cormorant Garamond', Georgia, serif;">
            {{ pad(countdown.minutes) }}
          </span>
          <span class="text-[10px] sm:text-xs uppercase tracking-widest text-[#5C7367] font-medium">Menit</span>
        </div>

        <!-- Seconds -->
        <div class="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6 border border-[#8B9E8B]/30 shadow-[0_8px_24px_rgba(45,62,53,0.05)] flex flex-col items-center">
          <span class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#4A6B5B] leading-none mb-2" style="font-family: 'Cormorant Garamond', Georgia, serif;">
            {{ pad(countdown.seconds) }}
          </span>
          <span class="text-[10px] sm:text-xs uppercase tracking-widest text-[#5C7367] font-medium">Detik</span>
        </div>
      </div>

      <!-- Save Date Action Button -->
      <div v-if="calendarUrl" ref="actionRef" class="opacity-0 translate-y-4">
        <a
          :href="calendarUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#4A6B5B] text-white hover:bg-[#3D5A4C] transition-all duration-300 shadow-[0_6px_20px_rgba(74,107,91,0.25)] hover:shadow-[0_8px_24px_rgba(74,107,91,0.35)] hover:-translate-y-0.5 text-xs font-semibold uppercase tracking-widest"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          Simpan Ke Kalender
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Invitation } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig: ThemeConfig;
  hasDate: boolean;
  invitation?: Invitation;
}>();

const countdownSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);
const actionRef = ref<HTMLElement | null>(null);

const pad = (num: number) => String(Math.max(0, num)).padStart(2, '0');

const calendarUrl = computed(() => {
  const dateStr = props.invitation?.akad_date || props.invitation?.resepsi_date;
  if (!dateStr) return '';
  
  const title = encodeURIComponent(`Pernikahan ${props.invitation?.groom_name || ''} & ${props.invitation?.bride_name || ''}`);
  const details = encodeURIComponent(`Acara Pernikahan ${props.invitation?.groom_full_name || ''} & ${props.invitation?.bride_full_name || ''}`);
  const location = encodeURIComponent(props.invitation?.akad_venue || props.invitation?.resepsi_venue || '');
  
  // Format YYYYMMDD
  const formattedDate = dateStr.replace(/-/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${formattedDate}/${formattedDate}`;
});

onMounted(() => {
  if (!countdownSection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: countdownSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'power3.out'
  })
  .to(gridRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out'
  }, "-=0.6")
  .to(actionRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, "-=0.6");
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
