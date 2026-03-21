<template>
  <div v-if="loading" class="invitation-page" style="min-height: 100vh; display: flex; align-items: center; justify-content: center;">
    <div class="loading-spinner" style="--admin-border: #d4a574; --admin-primary: #8b6f4e;"></div>
  </div>

  <div v-else-if="!invitation" class="invitation-page" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 16px;">
    <div style="font-size: 64px;">💌</div>
    <h2 style="font-family: var(--font-serif); color: var(--inv-primary);">Undangan Tidak Ditemukan</h2>
    <p style="color: var(--inv-text-light);">Link undangan yang Anda cari tidak tersedia.</p>
    <router-link to="/" class="btn btn-outline" style="border-color: var(--inv-gold); color: var(--inv-primary); margin-top: 8px;">
      ← Kembali
    </router-link>
  </div>

  <div v-else class="invitation-page" :class="'theme-' + (invitation.theme || 'elegant')">
    <!-- COVER -->
    <section class="inv-cover">
      <div class="inv-cover-bg">
        <img v-if="invitation.cover_photo" :src="apiBase + invitation.cover_photo" alt="Cover" />
        <div v-else style="width: 100%; height: 100%; background: linear-gradient(135deg, #2c2417, #4a3a28);"></div>
      </div>
      <div class="inv-cover-content">
        <p class="inv-label">The Wedding of</p>
        <h1 class="couple-names">
          {{ invitation.groom_name }}
          <span class="ampersand">&</span>
          {{ invitation.bride_name }}
        </h1>
        <p class="inv-date" v-if="formattedDate">{{ formattedDate }}</p>
        <div class="scroll-hint">
          <span>Scroll ke bawah</span>
          <span>↓</span>
        </div>
      </div>
    </section>

    <!-- QUOTE -->
    <section v-if="invitation.quote" class="inv-quote fade-in" ref="quoteRef">
      <blockquote>
        "{{ invitation.quote }}"
      </blockquote>
    </section>

    <!-- COUPLE -->
    <section class="inv-section inv-couple fade-in" ref="coupleRef">
      <h2 class="inv-section-title">Mempelai</h2>
      <div class="inv-section-divider"><span>♥</span></div>

      <div class="couple-profiles">
        <!-- Groom -->
        <div class="couple-profile">
          <img
            v-if="invitation.groom_photo"
            :src="apiBase + invitation.groom_photo"
            alt="Mempelai Pria"
            class="profile-photo"
          />
          <div v-else class="profile-photo-placeholder">👤</div>
          <h3 class="profile-name">{{ invitation.groom_full_name || invitation.groom_name }}</h3>
          <p v-if="invitation.groom_father || invitation.groom_mother" class="profile-parents">
            Putra dari<br/>
            <span v-if="invitation.groom_father">Bapak {{ invitation.groom_father }}</span>
            <span v-if="invitation.groom_father && invitation.groom_mother"> & </span>
            <span v-if="invitation.groom_mother">Ibu {{ invitation.groom_mother }}</span>
          </p>
        </div>

        <div class="couple-divider">&</div>

        <!-- Bride -->
        <div class="couple-profile">
          <img
            v-if="invitation.bride_photo"
            :src="apiBase + invitation.bride_photo"
            alt="Mempelai Wanita"
            class="profile-photo"
          />
          <div v-else class="profile-photo-placeholder">👤</div>
          <h3 class="profile-name">{{ invitation.bride_full_name || invitation.bride_name }}</h3>
          <p v-if="invitation.bride_father || invitation.bride_mother" class="profile-parents">
            Putri dari<br/>
            <span v-if="invitation.bride_father">Bapak {{ invitation.bride_father }}</span>
            <span v-if="invitation.bride_father && invitation.bride_mother"> & </span>
            <span v-if="invitation.bride_mother">Ibu {{ invitation.bride_mother }}</span>
          </p>
        </div>
      </div>
    </section>

    <!-- COUNTDOWN -->
    <section v-if="invitation.akad_date || invitation.resepsi_date" class="inv-section fade-in" ref="countdownRef" style="background: var(--inv-cream);">
      <h2 class="inv-section-title">Menghitung Hari</h2>
      <div class="inv-section-divider"><span>⏳</span></div>
      <div class="countdown-grid">
        <div class="countdown-item">
          <div class="count-value">{{ countdown.days }}</div>
          <div class="count-label">Hari</div>
        </div>
        <div class="countdown-item">
          <div class="count-value">{{ countdown.hours }}</div>
          <div class="count-label">Jam</div>
        </div>
        <div class="countdown-item">
          <div class="count-value">{{ countdown.minutes }}</div>
          <div class="count-label">Menit</div>
        </div>
        <div class="countdown-item">
          <div class="count-value">{{ countdown.seconds }}</div>
          <div class="count-label">Detik</div>
        </div>
      </div>
    </section>

    <!-- EVENTS -->
    <section v-if="invitation.akad_venue || invitation.resepsi_venue" class="inv-section inv-events fade-in" ref="eventsRef">
      <h2 class="inv-section-title">Acara</h2>
      <div class="inv-section-divider"><span>📅</span></div>

      <div class="events-grid">
        <div v-if="invitation.akad_venue" class="event-card">
          <div class="event-icon">💍</div>
          <h3 class="event-name">Akad Nikah</h3>
          <div v-if="invitation.akad_date" class="event-detail">
            <span class="detail-icon">📅</span>
            <span>{{ formatDateLong(invitation.akad_date) }}</span>
          </div>
          <div v-if="invitation.akad_time" class="event-detail">
            <span class="detail-icon">🕐</span>
            <span>{{ invitation.akad_time }}</span>
          </div>
          <div v-if="invitation.akad_venue" class="event-detail">
            <span class="detail-icon">📍</span>
            <span>
              <strong>{{ invitation.akad_venue }}</strong>
              <br v-if="invitation.akad_address" />
              {{ invitation.akad_address }}
            </span>
          </div>
          <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" class="event-map-link">
            📍 Buka Maps
          </a>
        </div>

        <div v-if="invitation.resepsi_venue" class="event-card">
          <div class="event-icon">🎉</div>
          <h3 class="event-name">Resepsi</h3>
          <div v-if="invitation.resepsi_date" class="event-detail">
            <span class="detail-icon">📅</span>
            <span>{{ formatDateLong(invitation.resepsi_date) }}</span>
          </div>
          <div v-if="invitation.resepsi_time" class="event-detail">
            <span class="detail-icon">🕐</span>
            <span>{{ invitation.resepsi_time }}</span>
          </div>
          <div v-if="invitation.resepsi_venue" class="event-detail">
            <span class="detail-icon">📍</span>
            <span>
              <strong>{{ invitation.resepsi_venue }}</strong>
              <br v-if="invitation.resepsi_address" />
              {{ invitation.resepsi_address }}
            </span>
          </div>
          <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank" class="event-map-link">
            📍 Buka Maps
          </a>
        </div>
      </div>
    </section>

    <!-- LOVE STORY -->
    <section v-if="loveStory.length > 0" class="inv-section inv-story fade-in" ref="storyRef">
      <h2 class="inv-section-title">Love Story</h2>
      <div class="inv-section-divider"><span>💕</span></div>

      <div class="story-timeline">
        <div v-for="(story, index) in loveStory" :key="index" class="story-item">
          <div class="story-date">{{ story.date }}</div>
          <div class="story-dot"></div>
          <div class="story-content">
            <div class="story-title">{{ story.title }}</div>
            <div class="story-desc">{{ story.description }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- GALLERY -->
    <section v-if="invitation.photos && invitation.photos.length > 0" class="inv-section inv-gallery fade-in" ref="galleryRef">
      <h2 class="inv-section-title">Gallery</h2>
      <div class="inv-section-divider"><span>📸</span></div>

      <div class="gallery-grid">
        <div
          v-for="(photo, index) in invitation.photos"
          :key="index"
          class="gallery-item"
          @click="openLightbox(index)"
        >
          <img :src="apiBase + photo.url" :alt="photo.caption || 'Gallery photo'" />
        </div>
      </div>
    </section>

    <!-- RSVP -->
    <section class="inv-section inv-rsvp fade-in" ref="rsvpRef">
      <h2 class="inv-section-title">RSVP</h2>
      <div class="inv-section-divider"><span>💌</span></div>
      <p style="color: var(--inv-text-light); margin-bottom: 32px; font-size: 15px;">
        Kehadiran Anda merupakan kebahagiaan bagi kami
      </p>

      <form class="rsvp-form" @submit.prevent="submitRsvp">
        <div class="form-group">
          <label class="form-label">Nama Lengkap</label>
          <input v-model="rsvpForm.guest_name" class="form-input" placeholder="Masukkan nama Anda" required />
        </div>

        <div class="form-group">
          <label class="form-label">Konfirmasi Kehadiran</label>
          <div class="radio-group">
            <div
              :class="['radio-option', { active: rsvpForm.attendance === 'hadir' }]"
              @click="rsvpForm.attendance = 'hadir'"
            >
              ✅ Hadir
            </div>
            <div
              :class="['radio-option', { active: rsvpForm.attendance === 'tidak_hadir' }]"
              @click="rsvpForm.attendance = 'tidak_hadir'"
            >
              ❌ Tidak Hadir
            </div>
          </div>
        </div>

        <div v-if="rsvpForm.attendance === 'hadir'" class="form-group">
          <label class="form-label">Jumlah Tamu</label>
          <input v-model.number="rsvpForm.guest_count" type="number" min="1" max="10" class="form-input" />
        </div>

        <div class="form-group">
          <label class="form-label">Ucapan & Doa</label>
          <textarea v-model="rsvpForm.message" class="form-input" placeholder="Tulis ucapan dan doa untuk kedua mempelai..." rows="3"></textarea>
        </div>

        <button type="submit" class="btn-rsvp" :disabled="rsvpSubmitting">
          {{ rsvpSubmitting ? 'Mengirim...' : '💌 Kirim Ucapan' }}
        </button>
      </form>

      <!-- Messages -->
      <div v-if="rsvpMessages.length > 0" class="rsvp-messages">
        <h3 style="font-family: var(--font-serif); font-size: 20px; color: var(--inv-primary); margin-bottom: 16px;">
          Ucapan ({{ rsvpMessages.length }})
        </h3>
        <div v-for="msg in rsvpMessages" :key="msg.id" class="rsvp-message">
          <div class="msg-name">{{ msg.guest_name }}</div>
          <div v-if="msg.message" class="msg-text">{{ msg.message }}</div>
          <div class="msg-status">
            {{ msg.attendance === 'hadir' ? '✅ Akan Hadir' : '❌ Tidak Hadir' }}
            {{ msg.attendance === 'hadir' && msg.guest_count > 1 ? `(${msg.guest_count} orang)` : '' }}
          </div>
        </div>
      </div>
    </section>

    <!-- GIFT -->
    <section v-if="invitation.bank_name" class="inv-section fade-in" style="background: var(--inv-cream);">
      <h2 class="inv-section-title">Wedding Gift</h2>
      <div class="inv-section-divider"><span>🎁</span></div>
      <p style="color: var(--inv-text-light); margin-bottom: 24px; font-size: 14px;">
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami.<br />
        Namun, apabila Anda ingin memberikan tanda kasih, kami menyediakan amplop digital di bawah ini.
      </p>
      <div style="display: inline-block; padding: 24px 40px; background: var(--inv-white); border-radius: var(--radius-lg); border: 1px solid rgba(201, 169, 110, 0.3); text-align: center;">
        <div style="font-weight: 600; font-size: 16px; color: var(--inv-primary); margin-bottom: 4px;">{{ invitation.bank_name }}</div>
        <div style="font-size: 24px; font-weight: 700; color: var(--inv-dark); letter-spacing: 2px; margin-bottom: 4px;">{{ invitation.bank_account }}</div>
        <div style="font-size: 14px; color: var(--inv-text-light);">a.n. {{ invitation.bank_holder }}</div>
        <button
          style="margin-top: 12px; padding: 8px 20px; background: var(--inv-gold); color: #fff; border-radius: var(--radius-sm); font-size: 13px; font-weight: 500;"
          @click="copyAccount"
        >
          {{ copied ? '✅ Tersalin!' : '📋 Salin Nomor Rekening' }}
        </button>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="inv-footer">
      <p class="footer-names">{{ invitation.groom_name }} & {{ invitation.bride_name }}</p>
      <p class="footer-text">Terima kasih telah menjadi bagian dari kebahagiaan kami</p>
    </footer>

    <!-- LIGHTBOX -->
    <div v-if="lightboxOpen && invitation.photos" class="lightbox" @click="lightboxOpen = false">
      <button class="lightbox-close" @click.stop="lightboxOpen = false">×</button>
      <button v-if="lightboxIndex > 0" class="lightbox-nav lightbox-prev" @click.stop="lightboxIndex--">‹</button>
      <img v-if="invitation.photos[lightboxIndex]" :src="apiBase + invitation.photos[lightboxIndex].url" @click.stop />
      <button v-if="lightboxIndex < invitation.photos!.length - 1" class="lightbox-nav lightbox-next" @click.stop="lightboxIndex++">›</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useInvitationStore } from '@/stores/invitation'
import type { Invitation, LoveStoryItem, Rsvp } from '@/types/invitation'

const route = useRoute()
const store = useInvitationStore()
const apiBase = 'http://localhost:3000'

const loading = ref(true)
const invitation = ref<Invitation | null>(null)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const copied = ref(false)
const rsvpSubmitting = ref(false)
const rsvpMessages = ref<Rsvp[]>([])

const rsvpForm = reactive({
  guest_name: '',
  attendance: 'hadir' as 'hadir' | 'tidak_hadir',
  guest_count: 1,
  message: ''
})

const countdown = reactive({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let countdownTimer: ReturnType<typeof setInterval>

const loveStory = computed<LoveStoryItem[]>(() => {
  if (!invitation.value?.love_story) return []
  try {
    const parsed = typeof invitation.value.love_story === 'string'
      ? JSON.parse(invitation.value.love_story)
      : invitation.value.love_story
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
})

const formattedDate = computed(() => {
  const dateStr = invitation.value?.akad_date || invitation.value?.resepsi_date
  if (!dateStr) return ''
  return formatDateLong(dateStr)
})

function formatDateLong(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function openLightbox(index: number) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

function copyAccount() {
  if (!invitation.value?.bank_account) return
  navigator.clipboard.writeText(invitation.value.bank_account)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

function updateCountdown() {
  const dateStr = invitation.value?.akad_date || invitation.value?.resepsi_date
  if (!dateStr) return

  const target = new Date(dateStr).getTime()
  const now = Date.now()
  const diff = Math.max(0, target - now)

  countdown.days = Math.floor(diff / (1000 * 60 * 60 * 24))
  countdown.hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  countdown.minutes = Math.floor((diff / (1000 * 60)) % 60)
  countdown.seconds = Math.floor((diff / 1000) % 60)
}

async function submitRsvp() {
  if (!rsvpForm.guest_name || !rsvpForm.attendance) return
  rsvpSubmitting.value = true

  try {
    const res = await fetch(`${apiBase}/api/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        invitation_id: invitation.value?.id,
        ...rsvpForm
      })
    })
    if (res.ok) {
      const newRsvp = await res.json()
      rsvpMessages.value.unshift(newRsvp)
      rsvpForm.guest_name = ''
      rsvpForm.message = ''
      rsvpForm.guest_count = 1
    }
  } catch {
    // silent fail
  } finally {
    rsvpSubmitting.value = false
  }
}

// Scroll animation observer
function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 }
  )

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
}

onMounted(async () => {
  const slug = (route.meta.subdomain as string) || (route.params.slug as string)
  const data = await store.fetchInvitationBySlug(slug)
  invitation.value = data
  loading.value = false

  if (data) {
    // Load RSVPs
    rsvpMessages.value = data.rsvps || []

    // Start countdown
    updateCountdown()
    countdownTimer = setInterval(updateCountdown, 1000)

    // Scroll animations (next tick)
    setTimeout(setupScrollAnimations, 100)
  }
})

onBeforeUnmount(() => {
  if (countdownTimer) clearInterval(countdownTimer)
})
</script>
