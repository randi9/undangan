<template>
  <section ref="eventsSection" class="py-20 md:py-28 px-4 md:px-8 bg-[#F2F5F3] relative overflow-hidden">
    <div class="max-w-4xl mx-auto relative z-10 text-center">
      <!-- Section Header -->
      <div ref="headerRef" class="opacity-0 translate-y-6 mb-16">
        <span class="text-xs uppercase tracking-[0.3em] text-[#5C7367] font-semibold block mb-2">Rangkaian Acara</span>
        <h2 class="text-3xl md:text-5xl font-serif text-[#2D3E35] font-medium" style="font-family: 'Cormorant Garamond', Georgia, serif;">
          Waktu & Lokasi
        </h2>
        <div class="w-12 h-[1.5px] bg-[#7A9A8B] mx-auto mt-4"></div>
      </div>

      <!-- Events Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left mb-16">
        <!-- Akad Nikah Card -->
        <div 
          v-if="invitation.akad_date" 
          ref="akadCard" 
          class="opacity-0 translate-y-8 bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-[#8B9E8B]/30 shadow-[0_10px_35px_rgba(45,62,53,0.06)] flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-6">
              <span class="px-4 py-1.5 rounded-full bg-[#E3ECE5] text-[#2D3E35] text-xs font-semibold uppercase tracking-widest">
                Akad Nikah
              </span>
              <svg class="w-6 h-6 text-[#7A9A8B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>

            <h3 class="text-2xl md:text-3xl font-serif font-semibold text-[#2D3E35] mb-4" style="font-family: 'Cormorant Garamond', Georgia, serif;">
              {{ formatDate(invitation.akad_date) }}
            </h3>

            <div class="space-y-3 text-sm text-[#5C7367] mb-6">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4A6B5B] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{{ invitation.akad_time || '08:00 WIB - Selesai' }}</span>
              </div>
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4A6B5B] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <strong class="block text-[#2D3E35] font-semibold">{{ invitation.akad_venue }}</strong>
                  <p class="mt-0.5 leading-relaxed">{{ invitation.akad_address }}</p>
                </div>
              </div>
            </div>
          </div>

          <a
            v-if="invitation.akad_map_url"
            :href="invitation.akad_map_url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#E3ECE5] hover:bg-[#4A6B5B] text-[#2D3E35] hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-wider"
          >
            <span>Buka Peta Lokasi</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        </div>

        <!-- Resepsi Card -->
        <div 
          v-if="invitation.resepsi_date" 
          ref="resepsiCard" 
          class="opacity-0 translate-y-8 bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-[#8B9E8B]/30 shadow-[0_10px_35px_rgba(45,62,53,0.06)] flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-6">
              <span class="px-4 py-1.5 rounded-full bg-[#E3ECE5] text-[#2D3E35] text-xs font-semibold uppercase tracking-widest">
                Resepsi Pernikahan
              </span>
              <svg class="w-6 h-6 text-[#7A9A8B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 01-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z"/>
              </svg>
            </div>

            <h3 class="text-2xl md:text-3xl font-serif font-semibold text-[#2D3E35] mb-4" style="font-family: 'Cormorant Garamond', Georgia, serif;">
              {{ formatDate(invitation.resepsi_date) }}
            </h3>

            <div class="space-y-3 text-sm text-[#5C7367] mb-6">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4A6B5B] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{{ invitation.resepsi_time || '11:00 WIB - Selesai' }}</span>
              </div>
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4A6B5B] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <strong class="block text-[#2D3E35] font-semibold">{{ invitation.resepsi_venue }}</strong>
                  <p class="mt-0.5 leading-relaxed">{{ invitation.resepsi_address }}</p>
                </div>
              </div>
            </div>
          </div>

          <a
            v-if="invitation.resepsi_map_url"
            :href="invitation.resepsi_map_url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#E3ECE5] hover:bg-[#4A6B5B] text-[#2D3E35] hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-wider"
          >
            <span>Buka Peta Lokasi</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Live Streaming Option -->
      <div v-if="invitation.streaming_enabled && invitation.streaming_url" class="max-w-xl mx-auto bg-[#E3ECE5] rounded-2xl p-6 text-center">
        <h4 class="text-lg font-serif font-semibold text-[#2D3E35] mb-2" style="font-family: 'Cormorant Garamond', Georgia, serif;">
          Siaran Langsung (Live Streaming)
        </h4>
        <p class="text-xs text-[#5C7367] mb-4">
          Bagi bapak/ibu/saudara/i yang berhalangan hadir secara langsung, dapat menyaksikan siaran live kami.
        </p>
        <a
          :href="invitation.streaming_url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4A6B5B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3D5A4C] transition-colors"
        >
          Tonton Live Streaming
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Invitation } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const eventsSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const akadCard = ref<HTMLElement | null>(null);
const resepsiCard = ref<HTMLElement | null>(null);

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

onMounted(() => {
  if (!eventsSection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: eventsSection.value,
      start: 'top 75%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'power3.out'
  })
  .to([akadCard.value, resepsiCard.value].filter(Boolean), {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.25,
    ease: 'power3.out'
  }, "-=0.6");
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
