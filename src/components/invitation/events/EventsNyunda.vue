<template>
  <section 
    v-if="invitation.akad_venue || invitation.resepsi_venue" 
    ref="sectionRef" 
    class="w-full h-[100dvh] relative overflow-hidden flex items-center justify-center bg-[#FFF8E7]"
    style="background-image: url('https://media.mengundanganda.com/nyunda/event%20section/dewirandi_5ceb7630-ac5e-4ec9-abe9-77334df5d40d.webp'); background-size: cover; background-position: center;"
  >

    <!-- Centered Event Info Card (Transparent Wrapper) -->
    <div 
      ref="cardRef" 
      class="relative z-10 w-[90%] max-w-[400px] min-h-[480px] md:min-h-[520px] flex items-center justify-center p-6 md:p-8"
    >

      <!-- 1. AKAD NIKAH PANEL -->
      <div 
        v-if="invitation.akad_venue" 
        ref="akadRef" 
        class="event-panel"
        style="opacity: 0; pointer-events: none;"
      >
        <h3 class="event-title" :style="{ fontFamily: themeConfig.fontHeading }">
          Akad Nikah
        </h3>

        <!-- Date & Time Group -->
        <div class="event-datetime-group">
          <p v-if="invitation.akad_date" class="event-date">
            {{ formatDateLong(invitation.akad_date) }}
          </p>
          <p v-if="invitation.akad_time" class="event-time">
            {{ invitation.akad_time }}
          </p>
        </div>

        <!-- Elegant Horizontal Divider -->
        <div class="event-divider"></div>

        <!-- Venue & Address Group -->
        <div class="event-location-group">
          <p class="event-venue">
            {{ invitation.akad_venue }}
          </p>
          <p v-if="invitation.akad_address" class="event-address">
            {{ invitation.akad_address }}
          </p>
        </div>

        <div class="event-actions pointer-events-auto">
          <a 
            v-if="invitation.akad_map_url" 
            :href="invitation.akad_map_url" 
            target="_blank" 
            class="btn-primary"
          >
            <Icon icon="ph:map-pin-bold" class="w-4 h-4" /> Buka Peta
          </a>
          <a 
            v-if="invitation.akad_date" 
            :href="getAkadCalendarUrl()" 
            target="_blank" 
            class="btn-secondary"
          >
            <Icon icon="ph:calendar-plus-bold" class="w-4 h-4" /> Simpan Acara
          </a>
        </div>
      </div>

      <!-- 2. RESEPSI PANEL -->
      <div 
        v-if="invitation.resepsi_venue" 
        ref="resepsiRef" 
        class="event-panel"
        style="opacity: 0; pointer-events: none;"
      >
        <h3 class="event-title" :style="{ fontFamily: themeConfig.fontHeading }">
          Resepsi
        </h3>

        <!-- Date & Time Group -->
        <div class="event-datetime-group">
          <p v-if="invitation.resepsi_date" class="event-date">
            {{ formatDateLong(invitation.resepsi_date) }}
          </p>
          <p v-if="invitation.resepsi_time" class="event-time">
            {{ invitation.resepsi_time }}
          </p>
        </div>

        <!-- Elegant Horizontal Divider -->
        <div class="event-divider"></div>

        <!-- Venue & Address Group -->
        <div class="event-location-group">
          <p class="event-venue">
            {{ invitation.resepsi_venue }}
          </p>
          <p v-if="invitation.resepsi_address" class="event-address">
            {{ invitation.resepsi_address }}
          </p>
        </div>

        <div class="event-actions pointer-events-auto">
          <a 
            v-if="invitation.resepsi_map_url" 
            :href="invitation.resepsi_map_url" 
            target="_blank" 
            class="btn-primary"
          >
            <Icon icon="ph:map-pin-bold" class="w-4 h-4" /> Buka Peta
          </a>
          <a 
            v-if="invitation.resepsi_date" 
            :href="getResepsiCalendarUrl()" 
            target="_blank" 
            class="btn-secondary"
          >
            <Icon icon="ph:calendar-plus-bold" class="w-4 h-4" /> Simpan Acara
          </a>
        </div>
      </div>

      <!-- 3. LIVE STREAMING PANEL -->
      <div 
        v-if="invitation.streaming_enabled && invitation.streaming_url" 
        ref="streamRef" 
        class="event-panel"
        style="opacity: 0; pointer-events: none;"
      >
        <h3 class="event-title" :style="{ fontFamily: themeConfig.fontHeading }">
          Live Streaming
        </h3>

        <p class="event-subtitle">
          Ikuti prosesi acara kami secara virtual
        </p>

        <div class="event-video-wrapper pointer-events-auto">
          <iframe
            :src="getEmbedUrl(invitation.streaming_url, invitation.streaming_platform || 'youtube') || ''"
            style="width: 100%; height: 100%; border: none;"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>

    <!-- ========================================================= -->
    <!-- DECORATIVE FLOWER ORNAMENTS (EASY TO MODIFY MANUALLY)    -->
    <!-- ========================================================= -->

    <!-- Flower 1: Bottom Tengah Agak Kiri -->
    <img 
      src="https://media.mengundanganda.com/nyunda/event%20section/flower/dewirandi_6740390c-e656-46dc-a576-83cc3da06b5e.webp"
      class="decor-flower flower-left"
      style="
        position: absolute;
        bottom: -80px;                     /* Tweak posisi vertical */
        left: 35%;                       /* Tweak posisi horizontal */
        transform: translateX(-50%);     /* Menjaga penyejajaran tengah */
        width: 150px;                    /* Tweak ukuran lebar */
        height: auto;
        z-index: 5;
        pointer-events: none;
      "
      alt="Flower Left"
    />

    <!-- Flower 2: Bottom Tengah Agak Kanan (Mirrored) -->
    <img 
      src="https://media.mengundanganda.com/nyunda/event%20section/flower/dewirandi_6740390c-e656-46dc-a576-83cc3da06b5e.webp"
      class="decor-flower flower-right"
      style="
        position: absolute;
        bottom: -80px;                     /* Tweak posisi vertical */
        right: 35%;                      /* Tweak posisi horizontal */
        transform: translateX(50%) scaleX(-1); /* Menjaga penyejajaran tengah & mirror */
        width: 150px;                    /* Tweak ukuran lebar */
        height: auto;
        z-index: 5;
        pointer-events: none;
      "
      alt="Flower Right"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { getEmbedUrl } from '@/utils/streaming';
import { generateGoogleCalendarUrl } from '@/utils/calendar';
import { Icon } from '@iconify/vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const cardRef = ref<HTMLElement | null>(null);
const akadRef = ref<HTMLElement | null>(null);
const resepsiRef = ref<HTMLElement | null>(null);
const streamRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

const hasResepsi = computed(() => !!props.invitation.resepsi_venue);
const hasStream = computed(() => !!(props.invitation.streaming_enabled && props.invitation.streaming_url));

const onResize = () => ScrollTrigger.refresh();

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
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    // Initial states
    gsap.set(akadRef.value, { opacity: 0, y: 30, pointerEvents: 'none' });
    gsap.set(resepsiRef.value, { opacity: 0, y: 30, pointerEvents: 'none' });
    if (streamRef.value) {
      gsap.set(streamRef.value, { opacity: 0, y: 30, pointerEvents: 'none' });
    }
    // Set initial position of flowers (slide down by 150px, invisible)
    gsap.set('.decor-flower', { opacity: 0, y: 150 });

    // Determine the scroll duration based on available panels
    let scrollEnd = '+=150%';
    if (hasResepsi.value && hasStream.value) {
      scrollEnd = '+=300%';
    } else if (hasResepsi.value || hasStream.value) {
      scrollEnd = '+=200%';
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: scrollEnd,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Phase 1: Show Akad & Animate Flowers rising
    tl.to(akadRef.value, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.5, ease: 'power2.out' });
    tl.to('.decor-flower', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '<');
    tl.to({}, { duration: 0.5 }); // read/hold buffer

    // Phase 2: transition from Akad to Resepsi (if exists)
    if (hasResepsi.value) {
      tl.to(akadRef.value, { opacity: 0, y: -30, pointerEvents: 'none', duration: 0.5, ease: 'power2.in' });
      tl.to(resepsiRef.value, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.5, ease: 'power2.out' }, '-=0.25');
      tl.to({}, { duration: 0.5 }); // read/hold buffer
    }

    // Phase 3: transition to Streaming (if exists)
    if (hasStream.value) {
      const prevRef = hasResepsi.value ? resepsiRef.value : akadRef.value;
      tl.to(prevRef, { opacity: 0, y: -30, pointerEvents: 'none', duration: 0.5, ease: 'power2.in' });
      tl.to(streamRef.value, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.5, ease: 'power2.out' }, '-=0.25');
      tl.to({}, { duration: 0.5 }); // read/hold buffer
    }

    // Prevent jumping issues
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    window.addEventListener('resize', onResize);
  }, sectionRef.value);
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
  }
  window.removeEventListener('resize', onResize);
});
</script>

<style scoped>
.event-panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  box-sizing: border-box;
}

.event-title {
  color: #5C3D2E !important;
  font-size: 44px !important;
  font-weight: 700 !important;
  line-height: 1.2 !important;
  margin: 0 !important;
  margin-bottom: 24px !important;
}

.event-datetime-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px !important;
  margin-bottom: 12px !important;
}

.event-date {
  color: #8B6F5C !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.2em !important;
  margin: 0 !important;
}

.event-time {
  color: #8B6F5C !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  letter-spacing: 0.1em !important;
  margin: 0 !important;
}

.event-divider {
  width: 48px !important;
  height: 1px !important;
  background-color: rgba(92, 61, 46, 0.2) !important;
  margin: 16px 0 !important;
}

.event-location-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px !important;
  margin-bottom: 36px !important;
}

.event-venue {
  color: #5C3D2E !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  letter-spacing: 0.05em !important;
  line-height: 1.4 !important;
  max-width: 320px !important;
  margin: 0 !important;
}

.event-address {
  color: #8B6F5C !important;
  font-size: 12px !important;
  font-weight: 300 !important;
  line-height: 1.6 !important;
  max-width: 280px !important;
  margin: 0 !important;
}

.event-subtitle {
  color: #8B6F5C !important;
  font-size: 13px !important;
  font-weight: 300 !important;
  letter-spacing: 0.05em !important;
  margin: 0 !important;
  margin-bottom: 24px !important;
}

.event-video-wrapper {
  width: 100% !important;
  max-width: 280px !important;
  aspect-ratio: 16/9 !important;
  border-radius: 12px !important;
  overflow: hidden !important;
  border: 1px solid rgba(92, 61, 46, 0.2) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  background-color: rgba(0, 0, 0, 0.05) !important;
}

.event-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px !important;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background-color: #5C3D2E !important;
  color: #FFF8E7 !important;
  border: 1.5px solid #5C3D2E !important;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none !important;
  box-shadow: 0 2px 4px rgba(92, 61, 46, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
}
.btn-primary:hover {
  background-color: #4A3124 !important;
  border-color: #4A3124 !important;
  color: #FFF8E7 !important;
  box-shadow: 0 4px 8px rgba(92, 61, 46, 0.3);
  transform: translateY(-1px);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background-color: transparent !important;
  color: #5C3D2E !important;
  border: 1.5px solid #5C3D2E !important;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none !important;
  transition: all 0.3s ease;
  cursor: pointer;
}
.btn-secondary:hover {
  background-color: #5C3D2E !important;
  color: #FFF8E7 !important;
  box-shadow: 0 4px 8px rgba(92, 61, 46, 0.2);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .event-title {
    font-size: 32px !important;
    margin-bottom: 16px !important;
  }
  .event-date {
    font-size: 12px !important;
  }
  .event-time {
    font-size: 11px !important;
  }
  .event-venue {
    font-size: 16px !important;
  }
  .event-address {
    font-size: 11px !important;
  }
  .event-subtitle {
    font-size: 12px !important;
  }
}
</style>
