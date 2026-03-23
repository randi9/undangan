<template>
  <div class="invitation-page theme-minimalist">
    <!-- COVER -->
    <section class="inv-cover">
      <div class="inv-cover-bg">
        <img v-if="invitation.cover_photo" :src="resolveAssetUrl(invitation.cover_photo, apiBase)" alt="Cover" />
        <div v-else class="inv-cover-fallback"></div>
      </div>
      <div class="inv-cover-content">
        <p class="inv-label">The Wedding of</p>
        <h1 class="couple-names">
          {{ invitation.groom_name }}
          <span class="ampersand">&amp;</span>
          {{ invitation.bride_name }}
        </h1>
        <p class="inv-date" v-if="formattedDate">{{ formattedDate }}</p>
        <div class="scroll-hint"><span>Scroll ke bawah</span><span>↓</span></div>
      </div>
    </section>

    <!-- QUOTE -->
    <section v-if="invitation.quote" class="inv-quote fade-in">
      <blockquote>"{{ invitation.quote }}"</blockquote>
    </section>

    <!-- COUPLE -->
    <section class="inv-section inv-couple fade-in">
      <h2 class="inv-section-title">Mempelai</h2>
      <div class="inv-section-divider"><span>♥</span></div>
      <div class="couple-profiles">
        <div class="couple-profile">
          <img v-if="invitation.groom_photo" :src="resolveAssetUrl(invitation.groom_photo, apiBase)" alt="Mempelai Pria" class="profile-photo" />
          <div v-else class="profile-photo-placeholder">👤</div>
          <h3 class="profile-name">{{ invitation.groom_full_name || invitation.groom_name }}</h3>
          <p v-if="invitation.groom_father || invitation.groom_mother" class="profile-parents">
            Putra dari<br />
            <span v-if="invitation.groom_father">Bapak {{ invitation.groom_father }}</span>
            <span v-if="invitation.groom_father && invitation.groom_mother"> &amp; </span>
            <span v-if="invitation.groom_mother">Ibu {{ invitation.groom_mother }}</span>
          </p>
        </div>
        <div class="couple-divider">&amp;</div>
        <div class="couple-profile">
          <img v-if="invitation.bride_photo" :src="resolveAssetUrl(invitation.bride_photo, apiBase)" alt="Mempelai Wanita" class="profile-photo" />
          <div v-else class="profile-photo-placeholder">👤</div>
          <h3 class="profile-name">{{ invitation.bride_full_name || invitation.bride_name }}</h3>
          <p v-if="invitation.bride_father || invitation.bride_mother" class="profile-parents">
            Putri dari<br />
            <span v-if="invitation.bride_father">Bapak {{ invitation.bride_father }}</span>
            <span v-if="invitation.bride_father && invitation.bride_mother"> &amp; </span>
            <span v-if="invitation.bride_mother">Ibu {{ invitation.bride_mother }}</span>
          </p>
        </div>
      </div>
    </section>

    <!-- COUNTDOWN -->
    <section v-if="invitation.akad_date || invitation.resepsi_date" class="inv-section fade-in" style="background: var(--inv-cream)">
      <h2 class="inv-section-title">Menghitung Hari</h2>
      <div class="inv-section-divider"><span>⏳</span></div>
      <div class="countdown-grid">
        <div class="countdown-item"><div class="count-value">{{ countdown.days }}</div><div class="count-label">Hari</div></div>
        <div class="countdown-item"><div class="count-value">{{ countdown.hours }}</div><div class="count-label">Jam</div></div>
        <div class="countdown-item"><div class="count-value">{{ countdown.minutes }}</div><div class="count-label">Menit</div></div>
        <div class="countdown-item"><div class="count-value">{{ countdown.seconds }}</div><div class="count-label">Detik</div></div>
      </div>
    </section>

    <!-- EVENTS -->
    <section v-if="invitation.akad_venue || invitation.resepsi_venue" class="inv-section inv-events fade-in">
      <h2 class="inv-section-title">Acara</h2>
      <div class="inv-section-divider"><span>📅</span></div>
      <div class="events-grid">
        <div v-if="invitation.akad_venue" class="event-card">
          <div class="event-icon">💍</div>
          <h3 class="event-name">Akad Nikah</h3>
          <div v-if="invitation.akad_date" class="event-detail"><span class="detail-icon">📅</span><span>{{ formatDateLong(invitation.akad_date) }}</span></div>
          <div v-if="invitation.akad_time" class="event-detail"><span class="detail-icon">🕐</span><span>{{ invitation.akad_time }}</span></div>
          <div v-if="invitation.akad_venue" class="event-detail"><span class="detail-icon">📍</span><span><strong>{{ invitation.akad_venue }}</strong><br v-if="invitation.akad_address" />{{ invitation.akad_address }}</span></div>
          <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" class="event-map-link">📍 Buka Maps</a>
        </div>
        <div v-if="invitation.resepsi_venue" class="event-card">
          <div class="event-icon">🎉</div>
          <h3 class="event-name">Resepsi</h3>
          <div v-if="invitation.resepsi_date" class="event-detail"><span class="detail-icon">📅</span><span>{{ formatDateLong(invitation.resepsi_date) }}</span></div>
          <div v-if="invitation.resepsi_time" class="event-detail"><span class="detail-icon">🕐</span><span>{{ invitation.resepsi_time }}</span></div>
          <div v-if="invitation.resepsi_venue" class="event-detail"><span class="detail-icon">📍</span><span><strong>{{ invitation.resepsi_venue }}</strong><br v-if="invitation.resepsi_address" />{{ invitation.resepsi_address }}</span></div>
          <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank" class="event-map-link">📍 Buka Maps</a>
        </div>
      </div>
    </section>

    <!-- LOVE STORY -->
    <section v-if="loveStory.length > 0" class="inv-section inv-story fade-in">
      <h2 class="inv-section-title">Love Story</h2>
      <div class="inv-section-divider"><span>💕</span></div>
      <div class="story-timeline">
        <div v-for="(story, i) in loveStory" :key="i" class="story-item">
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
    <section v-if="invitation.photos && invitation.photos.length > 0" class="inv-section inv-gallery fade-in">
      <h2 class="inv-section-title">Gallery</h2>
      <div class="inv-section-divider"><span>📸</span></div>
      <div class="gallery-grid">
        <div v-for="(photo, i) in invitation.photos" :key="i" class="gallery-item" @click="$emit('openLightbox', i)">
          <img :src="resolveAssetUrl(photo.url, apiBase)" alt="Galeri" />
        </div>
      </div>
    </section>

    <!-- RSVP -->
    <section class="inv-section inv-rsvp fade-in">
      <h2 class="inv-section-title">RSVP</h2>
      <div class="inv-section-divider"><span>💌</span></div>
      <p style="color: var(--inv-text-light); margin-bottom: 32px; font-size: 15px;">Kehadiran Anda merupakan kebahagiaan bagi kami</p>
      <form class="rsvp-form" @submit.prevent="onSubmitRsvp">
        <div class="form-group">
          <label class="form-label">Nama Lengkap</label>
          <input v-model="rsvpForm.guest_name" class="form-input" placeholder="Masukkan nama Anda" required />
        </div>
        <div class="form-group">
          <label class="form-label">Konfirmasi Kehadiran</label>
          <div class="radio-group">
            <div :class="['radio-option', { active: rsvpForm.attendance === 'hadir' }]" @click="rsvpForm.attendance = 'hadir'">✅ Hadir</div>
            <div :class="['radio-option', { active: rsvpForm.attendance === 'tidak_hadir' }]" @click="rsvpForm.attendance = 'tidak_hadir'">❌ Tidak Hadir</div>
          </div>
        </div>
        <div v-if="rsvpForm.attendance === 'hadir'" class="form-group">
          <label class="form-label">Jumlah Tamu</label>
          <input v-model.number="rsvpForm.guest_count" type="number" min="1" max="10" class="form-input" />
        </div>
        <div class="form-group">
          <label class="form-label">Ucapan &amp; Doa</label>
          <textarea v-model="rsvpForm.message" class="form-input" placeholder="Tulis ucapan dan doa untuk kedua mempelai..." rows="3"></textarea>
        </div>
        <button type="submit" class="btn-rsvp" :disabled="rsvpSubmitting">{{ rsvpSubmitting ? 'Mengirim...' : '💌 Kirim Ucapan' }}</button>
      </form>
      <div v-if="rsvpMessages.length > 0" class="rsvp-messages">
        <h3 style="font-family: var(--font-serif); font-size: 20px; color: var(--inv-primary); margin-bottom: 16px;">Ucapan ({{ rsvpMessages.length }})</h3>
        <div v-for="msg in rsvpMessages" :key="msg.id" class="rsvp-message">
          <div class="msg-name">{{ msg.guest_name }}</div>
          <div v-if="msg.message" class="msg-text">{{ msg.message }}</div>
          <div class="msg-status">{{ msg.attendance === 'hadir' ? '✅ Akan Hadir' : '❌ Tidak Hadir' }}{{ msg.attendance === 'hadir' && msg.guest_count > 1 ? ` (${msg.guest_count} orang)` : '' }}</div>
        </div>
      </div>
    </section>

    <!-- GIFT -->
    <section v-if="invitation.bank_name" class="inv-section fade-in" style="background: var(--inv-cream)">
      <h2 class="inv-section-title">Wedding Gift</h2>
      <div class="inv-section-divider"><span>🎁</span></div>
      <p style="color: var(--inv-text-light); margin-bottom: 24px; font-size: 14px;">
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami.<br />
        Namun, apabila Anda ingin memberikan tanda kasih, kami menyediakan amplop digital di bawah ini.
      </p>
      <div class="gift-box">
        <div class="gift-bank">{{ invitation.bank_name }}</div>
        <div class="gift-account">{{ invitation.bank_account }}</div>
        <div class="gift-holder">a.n. {{ invitation.bank_holder }}</div>
        <button class="gift-copy" @click="$emit('copyAccount')">{{ copied ? '✅ Tersalin!' : '📋 Salin Nomor Rekening' }}</button>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="inv-footer">
      <p class="footer-names">{{ invitation.groom_name }} &amp; {{ invitation.bride_name }}</p>
      <p class="footer-text">Terima kasih telah menjadi bagian dari kebahagiaan kami</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { Invitation, LoveStoryItem, Rsvp } from '@/types/invitation'
import { resolveAssetUrl } from '@/utils/url'

const props = defineProps<{
  invitation: Invitation
  loveStory: LoveStoryItem[]
  countdown: { days: number; hours: number; minutes: number; seconds: number }
  formattedDate: string
  rsvpMessages: Rsvp[]
  apiBase: string
  rsvpSubmitting: boolean
  copied: boolean
}>()

const emit = defineEmits<{
  submitRsvp: [payload: { guest_name: string; attendance: string; guest_count: number; message: string }]
  openLightbox: [index: number]
  copyAccount: []
}>()

const rsvpForm = reactive({
  guest_name: '',
  attendance: 'hadir' as 'hadir' | 'tidak_hadir',
  guest_count: 1,
  message: '',
})

function formatDateLong(d: string) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function onSubmitRsvp() {
  emit('submitRsvp', { ...rsvpForm })
  rsvpForm.guest_name = ''
  rsvpForm.message = ''
  rsvpForm.guest_count = 1
}
</script>

<style scoped>
/* ===== MODERN MINIMALIST THEME ===== */
.theme-minimalist {
  --inv-bg: #ffffff; --inv-primary: #111; --inv-primary-light: #333; --inv-secondary: #666;
  --inv-gold: #000; --inv-gold-light: rgba(0,0,0,0.05); --inv-dark: #000;
  --inv-text: #222; --inv-text-light: #555; --inv-cream: #f9f9f9; --inv-white: #fff;
  --font-serif: 'Inter', sans-serif; --font-script: 'Inter', sans-serif; --font-sans: 'Inter', sans-serif;
}
.invitation-page { background: var(--inv-bg); color: var(--inv-text); font-family: var(--font-sans); overflow-x: hidden; }
.inv-cover { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: relative; background: #fff; color: #111; overflow: hidden; }
.inv-cover-bg { position: absolute; inset: 0; z-index: 0; opacity: 0.3; filter: grayscale(100%); }
.inv-cover-bg img { width: 100%; height: 100%; object-fit: cover; }
.inv-cover-fallback { width: 100%; height: 100%; background: #f5f5f5; }
.inv-cover-content { position: relative; z-index: 1; padding: 40px 20px; }
.inv-cover .inv-label { font-size: 12px; letter-spacing: 4px; text-transform: uppercase; color: #666; font-weight: 600; margin-bottom: 24px; }
.inv-cover .couple-names { font-size: clamp(36px,7vw,64px); color: #111; font-weight: 800; letter-spacing: -2px; text-transform: uppercase; line-height: 1.1; margin-bottom: 16px; }
.inv-cover .couple-names .ampersand { display: block; font-size: 0.4em; color: #666; margin: 8px 0; font-weight: 300; }
.inv-cover .inv-date { font-size: 14px; color: #666; letter-spacing: 3px; font-weight: 600; margin-bottom: 40px; }
.inv-cover .scroll-hint { animation: bounce 2s infinite; color: #111; font-size: 13px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
.inv-section { padding: 80px 24px; max-width: 800px; margin: 0 auto; text-align: center; }
.inv-section-title { font-size: clamp(28px,5vw,40px); color: var(--inv-primary); margin-bottom: 8px; font-weight: 800; text-transform: uppercase; letter-spacing: -1px; }
.inv-section-divider { display: flex; align-items: center; justify-content: center; gap: 0; margin-bottom: 40px; }
.inv-section-divider span { display: none; }
.inv-section-divider::before { content: ''; width: 40px; height: 2px; background: #000; }
.inv-section-divider::after { display: none; }
.inv-quote { padding: 60px 24px; background: var(--inv-cream); text-align: center; }
.inv-quote blockquote { max-width: 600px; margin: 0 auto; font-style: normal; font-size: 18px; line-height: 1.8; color: var(--inv-text-light); font-weight: 300; }
.inv-couple { background: var(--inv-white); }
.couple-profiles { display: grid; grid-template-columns: 1fr auto 1fr; gap: 40px; align-items: center; }
.couple-profile { text-align: center; }
.profile-photo { width: 180px; height: 180px; border-radius: 0; object-fit: cover; border: none; margin: 0 auto 20px; }
.profile-photo-placeholder { width: 180px; height: 180px; border-radius: 0; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; background: var(--inv-cream); border: 1px solid #eee; font-size: 60px; color: #ccc; }
.profile-name { font-size: 22px; font-weight: 700; color: var(--inv-primary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
.profile-parents { font-size: 14px; color: var(--inv-text-light); line-height: 1.6; }
.couple-divider { font-size: 36px; color: #ccc; font-weight: 200; }
.inv-events { background: var(--inv-cream); }
.events-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.event-card { background: var(--inv-white); padding: 32px; border-radius: 0; box-shadow: none; border: 1px solid #eee; }
.event-icon { font-size: 32px; margin-bottom: 16px; }
.event-name { font-size: 20px; font-weight: 700; color: var(--inv-primary); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px; }
.event-detail { display: flex; align-items: flex-start; gap: 12px; text-align: left; margin-bottom: 12px; font-size: 14px; color: var(--inv-text-light); }
.detail-icon { font-size: 16px; flex-shrink: 0; margin-top: 2px; }
.event-map-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 12px; padding: 8px 16px; border: 1px solid #000; border-radius: 0; color: #000; font-size: 13px; transition: all 0.3s; text-decoration: none; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
.event-map-link:hover { background: #000; color: #fff; }
.inv-story { background: var(--inv-white); }
.story-timeline { position: relative; max-width: 600px; margin: 0 auto; }
.story-timeline::before { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: #000; transform: translateX(-50%); }
.story-item { position: relative; padding: 24px 0; display: grid; grid-template-columns: 1fr auto 1fr; gap: 24px; align-items: center; }
.story-date { font-weight: 700; color: var(--inv-primary); font-size: 14px; text-align: right; }
.story-dot { width: 16px; height: 16px; background: #000; border-radius: 50%; border: 3px solid var(--inv-bg); z-index: 1; }
.story-content { text-align: left; }
.story-title { font-weight: 700; color: var(--inv-primary); margin-bottom: 4px; }
.story-desc { font-size: 14px; color: var(--inv-text-light); line-height: 1.5; }
.inv-gallery { background: var(--inv-cream); }
.gallery-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 4px; }
.gallery-item { aspect-ratio: 1; border-radius: 0; overflow: hidden; cursor: pointer; transition: all 0.3s; }
.gallery-item:hover { transform: scale(1.02); }
.gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: all 0.3s; filter: grayscale(30%); }
.gallery-item:hover img { transform: scale(1.1); filter: grayscale(0%); }
.inv-rsvp { background: var(--inv-white); }
.rsvp-form { max-width: 500px; margin: 0 auto; text-align: left; }
.rsvp-form .form-group { margin-bottom: 20px; }
.rsvp-form .form-label { display: block; margin-bottom: 8px; font-weight: 600; color: var(--inv-text); font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
.rsvp-form .form-input { width: 100%; padding: 14px 16px; border: 1px solid #ddd; border-radius: 0; background: var(--inv-cream); color: var(--inv-text); font-size: 14px; transition: all 0.3s; }
.rsvp-form .form-input:focus { border-color: #000; box-shadow: none; outline: none; }
.radio-group { display: flex; gap: 12px; }
.radio-option { flex: 1; padding: 14px; border: 1px solid #ddd; border-radius: 0; text-align: center; cursor: pointer; transition: all 0.3s; font-size: 14px; }
.radio-option.active { border-color: #000; background: #111; color: #fff; font-weight: 600; }
.btn-rsvp { width: 100%; padding: 16px; background: #000; color: #fff; font-size: 14px; font-weight: 700; border-radius: 0; transition: all 0.3s; letter-spacing: 2px; text-transform: uppercase; border: none; cursor: pointer; }
.btn-rsvp:hover { background: #333; }
.rsvp-messages { max-width: 500px; margin: 32px auto 0; }
.rsvp-message { padding: 16px; background: var(--inv-cream); border-radius: 0; margin-bottom: 12px; text-align: left; border-left: 3px solid #000; }
.msg-name { font-weight: 700; color: var(--inv-primary); font-size: 14px; margin-bottom: 4px; }
.msg-text { font-size: 13px; color: var(--inv-text-light); line-height: 1.5; }
.msg-status { font-size: 12px; margin-top: 6px; color: #666; }
.gift-box { display: inline-block; padding: 24px 40px; background: var(--inv-white); border-radius: 0; border: 1px solid #ddd; text-align: center; }
.gift-bank { font-weight: 700; font-size: 16px; color: var(--inv-primary); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px; }
.gift-account { font-size: 24px; font-weight: 700; color: var(--inv-dark); letter-spacing: 2px; margin-bottom: 4px; }
.gift-holder { font-size: 14px; color: var(--inv-text-light); }
.gift-copy { margin-top: 12px; padding: 8px 20px; background: #000; color: #fff; border-radius: 0; font-size: 13px; font-weight: 600; border: none; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; }
.inv-footer { padding: 60px 24px; background: #000; text-align: center; color: rgba(255,255,255,0.5); }
.footer-names { font-size: 28px; color: #fff; margin-bottom: 8px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; }
.footer-text { font-size: 14px; }
.countdown-grid { display: flex; justify-content: center; gap: 24px; margin: 32px 0; }
.countdown-item { text-align: center; }
.count-value { font-size: 36px; font-weight: 800; color: var(--inv-primary); }
.count-label { font-size: 11px; color: var(--inv-text-light); text-transform: uppercase; letter-spacing: 3px; margin-top: 4px; font-weight: 600; }
.fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
.fade-in.visible { opacity: 1; transform: translateY(0); }
@media (max-width: 768px) {
  .couple-profiles { grid-template-columns: 1fr; gap: 24px; }
  .couple-divider { order: -1; }
  .events-grid { grid-template-columns: 1fr; }
  .gallery-grid { grid-template-columns: repeat(2,1fr); }
  .story-item { grid-template-columns: auto 1fr; gap: 16px; }
  .story-date { text-align: left; grid-column: 2; grid-row: 1; }
  .story-content { grid-column: 2; grid-row: 2; }
  .countdown-grid { gap: 12px; }
  .count-value { font-size: 28px; }
}
</style>
