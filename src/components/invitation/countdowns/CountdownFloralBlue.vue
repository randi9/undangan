<template>
  <section v-if="hasDate || invitation.akad_venue || invitation.resepsi_venue" ref="sectionRef" class="relative min-h-[100dvh] overflow-hidden flex items-center justify-center z-[10]">
    
    <!-- Background Layer (Sky) -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        src="https://media.mengundanganda.com/floral-blue/cover%20section/randidewi_28658e27-e94d-40ca-b897-607ef8ea0d83.webp"
        alt="Sky Background"
        class="min-w-full min-h-full w-full h-full object-cover object-center"
      />
    </div>

    <!-- Container for all content -->
    <div class="relative z-10 w-full h-full flex items-center justify-center">
      
      <!-- LAYER 1: COUNTDOWN -->
      <div ref="countdownRef" class="absolute inset-0 flex flex-col items-center justify-center text-center px-4" style="opacity: 1;">
        <h2 class="text-3xl md:text-4xl mb-8 font-bold" :style="{ fontFamily: themeConfig.fontHeading, color: themeConfig.primary || '#1e293b' }">
          Menghitung Hari
        </h2>
        <div class="flex gap-4 md:gap-8 justify-center">
          <div class="flex flex-col items-center">
            <div class="text-4xl md:text-5xl font-bold text-[#2c3e50]" :style="{ fontFamily: themeConfig.fontHeading }">{{ countdown.days }}</div>
            <div class="text-xs md:text-sm uppercase tracking-widest text-[#4a5c6a] mt-2">Hari</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-4xl md:text-5xl font-bold text-[#2c3e50]" :style="{ fontFamily: themeConfig.fontHeading }">{{ countdown.hours }}</div>
            <div class="text-xs md:text-sm uppercase tracking-widest text-[#4a5c6a] mt-2">Jam</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-4xl md:text-5xl font-bold text-[#2c3e50]" :style="{ fontFamily: themeConfig.fontHeading }">{{ countdown.minutes }}</div>
            <div class="text-xs md:text-sm uppercase tracking-widest text-[#4a5c6a] mt-2">Menit</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-4xl md:text-5xl font-bold text-[#2c3e50]" :style="{ fontFamily: themeConfig.fontHeading }">{{ countdown.seconds }}</div>
            <div class="text-xs md:text-sm uppercase tracking-widest text-[#4a5c6a] mt-2">Detik</div>
          </div>
        </div>
      </div>

      <!-- LAYER 2: AKAD -->
      <div ref="akadRef" class="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none" style="opacity: 0;">
        <div class="bg-white/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 max-w-sm w-full mt-4 pointer-events-auto">
          <h2 class="text-3xl md:text-4xl mb-4 font-bold" :style="{ fontFamily: themeConfig.fontHeading, color: themeConfig.primary || '#1e293b' }">
            Akad Nikah
          </h2>
          <p class="text-lg font-medium text-[#2c3e50] mb-2">{{ formatDateLong(invitation.akad_date) }}</p>
          <p class="text-base text-[#4a5c6a] mb-4">{{ invitation.akad_time }}</p>
          <p class="font-bold text-[#1e293b] text-xl mb-1">{{ invitation.akad_venue }}</p>
          <p class="text-sm text-[#4a5c6a] italic leading-snug">{{ invitation.akad_address }}</p>
          
          <div class="mt-6 flex gap-3 justify-center">
            <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" class="px-5 py-2.5 bg-[#4a5c6a] text-white rounded-full text-xs font-semibold tracking-wide hover:bg-[#2c3e50] transition-colors shadow-md">
              Buka Maps
            </a>
            <a v-if="invitation.akad_date" :href="getAkadCalendarUrl()" target="_blank" class="px-5 py-2.5 bg-white text-[#4a5c6a] border border-[#4a5c6a] rounded-full text-xs font-semibold tracking-wide hover:bg-gray-50 transition-colors shadow-md">
              Ingatkan
            </a>
          </div>
        </div>
      </div>

      <!-- LAYER 3: RESEPSI -->
      <div ref="resepsiRef" class="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none" style="opacity: 0;">
        <div class="bg-white/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 max-w-sm w-full mt-4 pointer-events-auto">
          <h2 class="text-3xl md:text-4xl mb-4 font-bold" :style="{ fontFamily: themeConfig.fontHeading, color: themeConfig.primary || '#1e293b' }">
            Resepsi
          </h2>
          <p class="text-lg font-medium text-[#2c3e50] mb-2">{{ formatDateLong(invitation.resepsi_date) }}</p>
          <p class="text-base text-[#4a5c6a] mb-4">{{ invitation.resepsi_time }}</p>
          <p class="font-bold text-[#1e293b] text-xl mb-1">{{ invitation.resepsi_venue }}</p>
          <p class="text-sm text-[#4a5c6a] italic leading-snug">{{ invitation.resepsi_address }}</p>
          
          <div class="mt-6 flex gap-3 justify-center">
            <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank" class="px-5 py-2.5 bg-[#4a5c6a] text-white rounded-full text-xs font-semibold tracking-wide hover:bg-[#2c3e50] transition-colors shadow-md">
              Buka Maps
            </a>
            <a v-if="invitation.resepsi_date" :href="getResepsiCalendarUrl()" target="_blank" class="px-5 py-2.5 bg-white text-[#4a5c6a] border border-[#4a5c6a] rounded-full text-xs font-semibold tracking-wide hover:bg-gray-50 transition-colors shadow-md">
              Ingatkan
            </a>
          </div>
        </div>
      </div>

      <!-- Decor Container for Zooming -->
      <div ref="decorContainerRef" class="absolute inset-0 pointer-events-none z-20" style="transform-origin: 50% 80%;">
        <!-- Event Decoration -->
        <img
          ref="eventDecorRef"
          src="https://media.mengundanganda.com/floral-blue/event%20section/randidewi_8903c563-e7ae-47f8-93c1-751c9a0581cf.webp"
          alt="Decoration"
          class="absolute bottom-0 left-0 w-full object-cover object-bottom"
          style="opacity: 0;"
        />
  
        <!-- Resepsi Decoration -->
        <img
          ref="resepsiDecorRef"
          src="https://media.mengundanganda.com/floral-blue/event%20section/randidewi_9ff09159-90b3-416a-bad5-a99a71be6993.webp"
          alt="Resepsi Decoration"
          class="absolute bottom-0 left-0 w-full object-cover object-bottom"
          style="opacity: 0;"
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { generateGoogleCalendarUrl } from '@/utils/calendar';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig: ThemeConfig;
  hasDate: boolean;
  invitation: Invitation;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const countdownRef = ref<HTMLElement | null>(null);
const akadRef = ref<HTMLElement | null>(null);
const resepsiRef = ref<HTMLElement | null>(null);
const decorContainerRef = ref<HTMLElement | null>(null);
const eventDecorRef = ref<HTMLElement | null>(null);
const resepsiDecorRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

function formatDateLong(dateStr?: string) { 
  if (!dateStr) return ''; 
  return new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); 
}

function getAkadCalendarUrl() { 
  return generateGoogleCalendarUrl({ 
    title: `Akad Nikah ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`, 
    date: props.invitation.akad_date!, 
    time: props.invitation.akad_time, 
    venue: props.invitation.akad_venue, 
    address: props.invitation.akad_address, 
    description: `Undangan Pernikahan ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}` 
  }); 
}

function getResepsiCalendarUrl() { 
  return generateGoogleCalendarUrl({ 
    title: `Resepsi ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`, 
    date: props.invitation.resepsi_date!, 
    time: props.invitation.resepsi_time, 
    venue: props.invitation.resepsi_venue, 
    address: props.invitation.resepsi_address, 
    description: `Undangan Pernikahan ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}` 
  }); 
}

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    // Determine active event layers (if missing data, skip them)
    const hasAkad = !!props.invitation.akad_venue;
    const hasResepsi = !!props.invitation.resepsi_venue;
    
    // Independent entrance animation for the first decor (shows with Countdown)
    gsap.fromTo(eventDecorRef.value,
      { opacity: 0, y: '30%' },
      { opacity: 1, y: '0%', duration: 1.5, ease: 'power2.out', scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 80%', // play when section is 20% visible
        } 
      }
    );

    // Create the pinned timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: '+=400%', // Increased scroll length for more steps
        pin: true,
        scrub: 1, // Smooth scrubbing
      }
    });

    // SCROLL 1: Zoom in to couple
    const firstEventRef = hasAkad ? akadRef.value : (hasResepsi ? resepsiRef.value : null);
    
    if (firstEventRef) {
      // Fade out countdown & zoom container
      tl.to(countdownRef.value, { 
        opacity: 0, 
        scale: 1.1, 
        duration: 1, 
        ease: 'power1.inOut' 
      });
      tl.to(decorContainerRef.value, { scale: 2.2, duration: 1, ease: 'power1.inOut' }, "<");

      // Hold zoom momentarily
      tl.to({}, { duration: 0.2 });

      // SCROLL 2: Crossfade Decors while zoomed
      tl.to(eventDecorRef.value, { opacity: 0, duration: 1, ease: 'none' });
      tl.fromTo(resepsiDecorRef.value, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'none' }, "<");

      // Hold crossfaded image momentarily
      tl.to({}, { duration: 0.2 });

      // SCROLL 3: Zoom out & Fade in First Event
      tl.to(decorContainerRef.value, { scale: 1, duration: 1, ease: 'power1.inOut' });
      tl.fromTo(firstEventRef, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        "<" // start at same time as zoom out
      );
  
      // Hold First Event
      tl.to({}, { duration: 0.5 });
      
      // SCROLL 4: Transition from First Event to Second Event (if both exist)
      if (hasAkad && hasResepsi) {
        // Fade out Akad
        tl.to(akadRef.value, { 
          opacity: 0, 
          y: -30, 
          duration: 1, 
          ease: 'power2.in' 
        });

        // Fade in Resepsi (Decor 2 remains visible)
        tl.fromTo(resepsiRef.value, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );
        
        // Hold Resepsi
        tl.to({}, { duration: 0.5 });
      }
    } else {
      // If no events, just fade out countdown
      tl.to(countdownRef.value, { 
        opacity: 0, 
        scale: 1.1, 
        duration: 1, 
        ease: 'power1.inOut' 
      });
      tl.to(eventDecorRef.value, { opacity: 0, duration: 1, ease: 'none' }, "<");
    }

  }, sectionRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>
