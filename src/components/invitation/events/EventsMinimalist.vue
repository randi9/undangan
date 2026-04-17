<template>
  <section v-if="invitation.akad_venue || invitation.resepsi_venue" ref="eventsSection" class="py-24 px-6 max-w-5xl mx-auto text-center relative overflow-hidden">
    <div class="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full blur-[80px] opacity-60 -z-10 pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-gray-50 rounded-full blur-[80px] opacity-60 -z-10 pointer-events-none"></div>

    <div ref="headerRef" class="opacity-0 translate-y-6 mb-16 relative z-10">
      <div v-if="invitation.groom_name && invitation.bride_name" class="flex items-center justify-center gap-3 mb-2">
        <span class="text-4xl text-gray-800" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.groom_name.charAt(0) }}</span>
        <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
        <span class="text-4xl text-gray-800" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.bride_name.charAt(0) }}</span>
      </div>
      <h2 class="text-3xl md:text-4xl font-light tracking-wider text-gray-700 mb-4" :style="{ fontFamily: themeConfig.fontHeading }">Rangkaian Acara</h2>
      <div class="flex items-center justify-center gap-4 text-gray-300">
        <div class="h-[1px] w-8 bg-gray-300"></div>
        <div class="w-1.5 h-1.5 border border-gray-300 transform rotate-45"></div>
        <div class="h-[1px] w-8 bg-gray-300"></div>
      </div>
    </div>
    
    <div class="grid md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto relative z-10">
      <div v-if="invitation.akad_venue" ref="akadCard" class="p-8 md:p-12 rounded-[2rem] bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-left opacity-0 translate-y-10 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] group">
        <Icon icon="ph:rings-light" class="w-10 h-10 mb-6 text-gray-400 group-hover:text-gray-800 transition-colors" />
        <h3 class="text-2xl font-medium tracking-wide text-gray-800 mb-6" :style="{ fontFamily: themeConfig.fontHeading }">Akad Nikah</h3>
        <div class="space-y-5 text-sm md:text-base text-gray-500 font-light leading-relaxed">
          <div v-if="invitation.akad_date" class="flex gap-4 items-start">
            <Icon icon="ph:calendar-blank-light" class="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400" />
            <span>{{ formatDateLong(invitation.akad_date) }}</span>
          </div>
          <div v-if="invitation.akad_time" class="flex gap-4 items-start">
            <Icon icon="ph:clock-light" class="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400" />
            <span>{{ invitation.akad_time }}</span>
          </div>
          <div v-if="invitation.akad_venue" class="flex gap-4 items-start">
            <Icon icon="ph:map-pin-light" class="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400" />
            <span>
              <strong class="font-medium text-gray-700 block mb-1">{{ invitation.akad_venue }}</strong>
              <span class="text-sm opacity-80">{{ invitation.akad_address }}</span>
            </span>
          </div>
        </div>
        <div class="flex flex-wrap gap-3 mt-10">
          <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white font-medium text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors w-full sm:w-auto">
            Gmaps
          </a>
          <a v-if="invitation.akad_date" :href="getAkadCalendarUrl()" target="_blank" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium text-xs tracking-widest uppercase hover:bg-gray-50 transition-colors w-full sm:w-auto">
            Simpan
          </a>
        </div>
      </div>
      
      <div v-if="invitation.resepsi_venue" ref="resepsiCard" class="p-8 md:p-12 rounded-[2rem] bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-left opacity-0 translate-y-10 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] group">
        <Icon icon="ph:champagne-light" class="w-10 h-10 mb-6 text-gray-400 group-hover:text-gray-800 transition-colors" />
        <h3 class="text-2xl font-medium tracking-wide text-gray-800 mb-6" :style="{ fontFamily: themeConfig.fontHeading }">Resepsi</h3>
        <div class="space-y-5 text-sm md:text-base text-gray-500 font-light leading-relaxed">
          <div v-if="invitation.resepsi_date" class="flex gap-4 items-start">
            <Icon icon="ph:calendar-blank-light" class="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400" />
            <span>{{ formatDateLong(invitation.resepsi_date) }}</span>
          </div>
          <div v-if="invitation.resepsi_time" class="flex gap-4 items-start">
            <Icon icon="ph:clock-light" class="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400" />
            <span>{{ invitation.resepsi_time }}</span>
          </div>
          <div v-if="invitation.resepsi_venue" class="flex gap-4 items-start">
            <Icon icon="ph:map-pin-light" class="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400" />
            <span>
              <strong class="font-medium text-gray-700 block mb-1">{{ invitation.resepsi_venue }}</strong>
              <span class="text-sm opacity-80">{{ invitation.resepsi_address }}</span>
            </span>
          </div>
        </div>
        <div class="flex flex-wrap gap-3 mt-10">
          <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white font-medium text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors w-full sm:w-auto">
            Gmaps
          </a>
          <a v-if="invitation.resepsi_date" :href="getResepsiCalendarUrl()" target="_blank" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium text-xs tracking-widest uppercase hover:bg-gray-50 transition-colors w-full sm:w-auto">
            Simpan
          </a>
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
import { Icon } from '@iconify/vue';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const eventsSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const akadCard = ref<HTMLElement | null>(null);
const resepsiCard = ref<HTMLElement | null>(null);

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
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(headerRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
  
  if (akadCard.value) {
    tl.to(akadCard.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.6");
  }
  if (resepsiCard.value) {
    tl.to(resepsiCard.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.8");
  }
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
