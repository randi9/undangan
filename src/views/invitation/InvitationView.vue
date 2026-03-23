<template>
  <div
    v-if="loading"
    class="invitation-page"
    style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <div
      class="loading-spinner"
      style="--admin-border: #d4a574; --admin-primary: #8b6f4e"
    ></div>
  </div>

  <div
    v-else-if="!invitation"
    class="invitation-page"
    style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 16px;
    "
  >
    <div style="font-size: 64px">💌</div>
    <h2 style="font-family: var(--font-serif); color: var(--inv-primary)">
      Undangan Tidak Ditemukan
    </h2>
    <p style="color: var(--inv-text-light)">
      Link undangan yang Anda cari tidak tersedia.
    </p>
    <router-link
      to="/"
      class="btn btn-outline"
      style="
        border-color: var(--inv-gold);
        color: var(--inv-primary);
        margin-top: 8px;
      "
    >
      ← Kembali
    </router-link>
  </div>

  <!-- Main UI Wrapper -->
  <div v-else>
    <!-- COVER OVERLAY (Buka Undangan) -->
    <div
      class="inv-overlay"
      :class="['theme-' + (invitation.theme || 'elegant'), { 'is-closing': isClosingOverlay }]"
      v-if="!isOpened"
    >
      <div class="inv-overlay-bg">
        <img
          v-if="invitation.cover_photo"
          :src="resolveAssetUrl(invitation.cover_photo, apiBase)"
          alt="Cover"
        />
        <div v-else class="inv-overlay-bg-fallback"></div>
      </div>
      <div class="inv-overlay-content">
        <div class="inv-overlay-top">
          <p>The Wedding of</p>
          <h1 class="couple-names">
            {{ invitation.groom_name }} <span class="ampersand">&</span> {{ invitation.bride_name }}
          </h1>
        </div>
        <div class="inv-overlay-bottom">
          <p>Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <h3 class="guest-name">{{ guestName || 'Tamu Undangan' }}</h3>
          <button class="btn btn-primary btn-open" @click="openInvitation">
            <span class="icon">💌</span> Buka Undangan
          </button>
        </div>
      </div>
    </div>

    <!-- MAIN INVITATION — rendered by template component -->
    <div v-show="isOpened">
      <component
        :is="currentTemplate"
        :invitation="invitation"
        :love-story="loveStory"
        :countdown="countdown"
        :formatted-date="formattedDate"
        :rsvp-messages="rsvpMessages"
        :api-base="apiBase"
        :rsvp-submitting="rsvpSubmitting"
        :copied="copied"
        @submit-rsvp="submitRsvpFromTemplate"
        @open-lightbox="openLightbox"
        @copy-account="copyAccount"
      />

      <!-- LIGHTBOX -->
      <div
        v-if="lightboxOpen && invitation.photos"
        class="lightbox"
        @click="lightboxOpen = false"
      >
        <button class="lightbox-close" @click.stop="lightboxOpen = false">
          ×
        </button>
        <button
          v-if="lightboxIndex > 0"
          class="lightbox-nav lightbox-prev"
          @click.stop="lightboxIndex--"
        >
          ‹
        </button>
        <img
          v-if="currentPhotoUrl"
          :src="currentPhotoUrl"
          alt="Gallery preview"
          @click.stop
        />
        <button
          v-if="invitation.photos && lightboxIndex < invitation.photos.length - 1"
          class="lightbox-nav lightbox-next"
          @click.stop="lightboxIndex++"
        >
          ›
        </button>
      </div>
    </div>

    <!-- Music Player -->
    <audio ref="musicPlayer" v-if="invitation.music_url" :src="resolveAssetUrl(invitation.music_url, apiBase)" loop preload="auto"></audio>
    <button v-if="invitation.music_url && isOpened" class="floating-music-btn" :class="{ playing: isPlaying }" @click="toggleMusic">
      <span class="icon">{{ isPlaying ? '🎵' : '🔇' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, reactive, type Component } from "vue";
import { useRoute } from "vue-router";
import { useInvitationStore } from "@/stores/invitation";
import type { Invitation, LoveStoryItem, Rsvp } from "@/types/invitation";
import { resolveAssetUrl } from "@/utils/url";

// Template components
import ElegantTemplate from "@/components/templates/ElegantTemplate.vue";
import FloralTemplate from "@/components/templates/FloralTemplate.vue";
import MinimalistTemplate from "@/components/templates/MinimalistTemplate.vue";

const templateMap: Record<string, Component> = {
  elegant: ElegantTemplate,
  floral: FloralTemplate,
  minimalist: MinimalistTemplate,
};

const route = useRoute();
const store = useInvitationStore();
const apiBase = import.meta.env.VITE_API_URL || "";

const loading = ref(true);
const invitation = ref<Invitation | null>(null);
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
const copied = ref(false);
const rsvpSubmitting = ref(false);
const rsvpMessages = ref<Rsvp[]>([]);

const guestName = ref(route.query.to ? String(route.query.to) : '');
const isOpened = ref(false);
const isClosingOverlay = ref(false);
const isPlaying = ref(false);
const musicPlayer = ref<HTMLAudioElement>();

const currentTemplate = computed(() => {
  const theme = invitation.value?.theme || 'elegant';
  return templateMap[theme] || ElegantTemplate;
});

function openInvitation() {
  isClosingOverlay.value = true;
  setTimeout(() => {
    isOpened.value = true;
    if (invitation.value?.music_url && musicPlayer.value) {
      musicPlayer.value.play().then(() => {
        isPlaying.value = true;
      }).catch(e => console.error("Audio blocked by browser:", e));
    }
    // initialize scroll animations here to prevent them firing early behind the overlay
    setupScrollAnimations();
  }, 800);
}

function toggleMusic() {
  if (!musicPlayer.value) return;
  if (isPlaying.value) {
    musicPlayer.value.pause();
    isPlaying.value = false;
  } else {
    musicPlayer.value.play();
    isPlaying.value = true;
  }
}

const rsvpForm = reactive({
  guest_name: "",
  attendance: "hadir" as "hadir" | "tidak_hadir",
  guest_count: 1,
  message: "",
});

const countdown = reactive({ days: 0, hours: 0, minutes: 0, seconds: 0 });
let countdownTimer: ReturnType<typeof setInterval>;

const loveStory = computed<LoveStoryItem[]>(() => {
  if (!invitation.value?.love_story) return [];
  try {
    const parsed =
      typeof invitation.value.love_story === "string"
        ? JSON.parse(invitation.value.love_story)
        : invitation.value.love_story;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
});

const formattedDate = computed(() => {
  const dateStr = invitation.value?.akad_date || invitation.value?.resepsi_date;
  if (!dateStr) return "";
  return formatDateLong(dateStr);
});

function formatDateLong(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function openLightbox(index: number) {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
}

function copyAccount() {
  if (!invitation.value?.bank_account) return;
  navigator.clipboard.writeText(invitation.value.bank_account);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

const currentPhotoUrl = computed(() => {
  if (!invitation.value?.photos || invitation.value.photos.length === 0)
    return "";
  const photo = invitation.value.photos[lightboxIndex.value];
  return photo ? resolveAssetUrl(photo.url, apiBase) : "";
});

function updateCountdown() {
  const dateStr = invitation.value?.akad_date || invitation.value?.resepsi_date;
  if (!dateStr) return;

  const target = new Date(dateStr).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  countdown.days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  countdown.minutes = Math.floor((diff / (1000 * 60)) % 60);
  countdown.seconds = Math.floor((diff / 1000) % 60);
}

function submitRsvpFromTemplate(payload: { guest_name: string; attendance: string; guest_count: number; message: string }) {
  rsvpForm.guest_name = payload.guest_name;
  rsvpForm.attendance = payload.attendance as "hadir" | "tidak_hadir";
  rsvpForm.guest_count = payload.guest_count;
  rsvpForm.message = payload.message;
  submitRsvp();
}

async function submitRsvp() {
  if (!rsvpForm.guest_name || !rsvpForm.attendance) return;
  rsvpSubmitting.value = true;

  try {
    const res = await fetch(`${apiBase}/api/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invitation_id: invitation.value?.id,
        ...rsvpForm,
      }),
    });
    if (res.ok) {
      const newRsvp = await res.json();
      rsvpMessages.value.unshift(newRsvp);
      rsvpForm.guest_name = "";
      rsvpForm.message = "";
      rsvpForm.guest_count = 1;
    }
  } catch {
    // silent fail
  } finally {
    rsvpSubmitting.value = false;
  }
}

// Scroll animation observer
function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

onMounted(async () => {
  const slug =
    (route.meta.subdomain as string) || (route.params.slug as string);
  const data = await store.fetchInvitationBySlug(slug);
  invitation.value = data;
  loading.value = false;

  if (data) {
    // Load RSVPs
    rsvpMessages.value = data.rsvps || [];

    // Start countdown
    updateCountdown();
    countdownTimer = setInterval(updateCountdown, 1000);
  }
});

onBeforeUnmount(() => {
  if (countdownTimer) clearInterval(countdownTimer);
});
</script>
