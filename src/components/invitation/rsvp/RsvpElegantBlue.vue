<template>
  <section class="rsvp-section">
    <div class="rsvp-container">
      
      <!-- Header -->
      <h2 class="rsvp-title" :style="{ fontFamily: themeConfig.fontHeading }">RSVP</h2>
      <div class="rsvp-divider">
        <div class="divider-line"></div>
        <div class="w-1.5 h-1.5 rotate-45 bg-[#304851]/40 mx-2"></div>
        <div class="divider-line"></div>
      </div>
      <p class="rsvp-subtitle">
        Kehadiran Anda merupakan kebahagiaan bagi kami
      </p>
      
      <!-- Form Card -->
      <div class="rsvp-card">
        <form @submit.prevent="onSubmit" class="rsvp-form">
          <!-- Nama -->
          <div class="form-group">
            <label class="input-label">Nama Lengkap</label>
            <input 
              v-model="form.guest_name" 
              type="text" 
              placeholder="Masukkan nama Anda" 
              required 
              class="input-field" 
            />
          </div>
          
          <!-- Konfirmasi -->
          <div class="form-group">
            <label class="input-label">Konfirmasi Kehadiran</label>
            <div class="attendance-options">
              <button 
                type="button" 
                @click="form.attendance = 'hadir'" 
                class="attendance-btn"
                :class="{ 'active-hadir': form.attendance === 'hadir' }"
              >
                Hadir
              </button>
              <button 
                type="button" 
                @click="form.attendance = 'tidak_hadir'" 
                class="attendance-btn"
                :class="{ 'active-absen': form.attendance === 'tidak_hadir' }"
              >
                Tidak Hadir
              </button>
            </div>
          </div>
          
          <!-- Jumlah Tamu (Conditional) -->
          <div v-show="form.attendance === 'hadir'" class="form-group">
            <label class="input-label">Jumlah Tamu</label>
            <input 
              v-model.number="form.guest_count" 
              type="number" 
              min="1" 
              max="10" 
              placeholder="1" 
              class="input-field" 
            />
          </div>
          
          <!-- Pesan / Doa -->
          <div class="form-group">
            <label class="input-label">Ucapan &amp; Doa</label>
            <textarea 
              v-model="form.message" 
              rows="4" 
              placeholder="Tulis doa untuk kedua mempelai" 
              class="input-field textarea-field"
            ></textarea>
          </div>
          
          <!-- Submit -->
          <button type="submit" :disabled="submitting" class="submit-btn">
            {{ submitting ? 'Mengirim...' : 'Kirim Ucapan' }}
          </button>
        </form>
      </div>
      
      <!-- Wishes Feed Card -->
      <div v-if="rsvpMessages.length > 0" class="feed-card">
        <h3 class="feed-title" :style="{ fontFamily: themeConfig.fontHeading }">
          Ucapan ({{ rsvpMessages.length }})
        </h3>
        
        <div class="feed-list">
          <div v-for="msg in rsvpMessages" :key="msg.id" class="feed-item">
            <div class="feed-item-header">
              <span class="feed-guest-name">{{ msg.guest_name }}</span>
              <span class="feed-badge" :class="msg.attendance === 'hadir' ? 'badge-hadir' : 'badge-absen'">
                {{ msg.attendance === 'hadir' ? 'Akan Hadir' : 'Berhalangan' }}
                <span v-if="msg.attendance === 'hadir' && msg.guest_count > 1">({{ msg.guest_count }})</span>
              </span>
            </div>
            <p class="feed-message">{{ msg.message }}</p>
            <div v-if="msg.reply_text" class="feed-reply">
              <div class="feed-reply-header">Balasan Mempelai</div>
              <p class="feed-reply-text">{{ msg.reply_text }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { ThemeConfig } from '@/types/theme';
import type { Rsvp } from '@/types/invitation';

const props = defineProps<{
  rsvpMessages: Rsvp[];
  themeConfig: ThemeConfig;
  submitting: boolean;
}>();

const emit = defineEmits<{
  (e: 'submitRsvp', form: { guest_name: string; attendance: 'hadir' | 'tidak_hadir'; guest_count: number; message: string }): void;
}>();

const form = reactive({
  guest_name: '',
  attendance: 'hadir' as 'hadir' | 'tidak_hadir',
  guest_count: 1,
  message: '',
});

function onSubmit() {
  emit('submitRsvp', { ...form });
}
</script>

<style scoped>
.rsvp-section {
  padding: 100px 0;
  background-color: #f8f9f9;
  text-align: center;
}

.rsvp-container {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header Text */
.rsvp-title {
  color: #1a252c;
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 8px;
  letter-spacing: 0.05em;
}

.rsvp-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
}
.divider-line {
  height: 1px;
  width: 48px;
  background-color: rgba(48,72,81,0.2);
}

.rsvp-subtitle {
  color: #304851;
  font-size: clamp(0.85rem, 3vw, 1rem);
  font-weight: 400;
  margin-bottom: 32px;
}

/* Form Card */
.rsvp-card {
  background-color: #ffffff;
  padding: 24px 20px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.03);
  text-align: left;
  margin-bottom: 48px;
}
@media (min-width: 768px) {
  .rsvp-card {
    padding: 32px 32px;
  }
}

.form-group {
  margin-bottom: 16px;
}

.input-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #304851;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input-field {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.1);
  background-color: #fafafa;
  color: #1a252c;
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;
}
.input-field:focus {
  background-color: #ffffff;
  border-color: #405C66;
  box-shadow: 0 0 0 3px rgba(64,92,102,0.1);
}

.textarea-field {
  resize: vertical;
  min-height: 80px;
}

/* Attendance Buttons */
.attendance-options {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.attendance-btn {
  flex: 1;
  padding: 12px 8px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.1);
  background-color: #ffffff;
  color: #64748b;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}
.attendance-btn:hover {
  background-color: #f8fafc;
}

.active-hadir {
  border-color: #405C66;
  background-color: rgba(64,92,102,0.05);
  color: #405C66;
  font-weight: 700;
}
.active-absen {
  border-color: #ef4444;
  background-color: rgba(239,68,68,0.05);
  color: #ef4444;
  font-weight: 700;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background-color: #405C66;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(64,92,102,0.2);
  margin-top: 16px;
}
.submit-btn:hover:not(:disabled) {
  background-color: #304851;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(64,92,102,0.3);
}
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Feed Card */
.feed-card {
  background-color: #ffffff;
  padding: 32px 24px;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.03);
  text-align: left;
}
@media (min-width: 768px) {
  .feed-card {
    padding: 40px;
  }
}

.feed-title {
  color: #405C66;
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 24px;
  border-bottom: 2px solid rgba(48,72,81,0.05);
  padding-bottom: 16px;
}

.feed-list {
  max-height: 480px;
  overflow-y: auto;
  padding-right: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  /* Scrollbar estetik */
  scrollbar-width: thin;
  scrollbar-color: rgba(64,92,102,0.3) transparent;
}
.feed-list::-webkit-scrollbar {
  width: 6px;
}
.feed-list::-webkit-scrollbar-track {
  background: transparent;
}
.feed-list::-webkit-scrollbar-thumb {
  background-color: rgba(64,92,102,0.3);
  border-radius: 10px;
}

.feed-item {
  background-color: #fafafa;
  border: 1px solid rgba(0,0,0,0.03);
  padding: 20px;
  border-radius: 16px;
}

.feed-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.feed-guest-name {
  font-weight: 700;
  color: #1a252c;
  font-size: 1.05rem;
}

.feed-badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.badge-hadir {
  background-color: rgba(16,185,129,0.1);
  color: #059669;
}
.badge-absen {
  background-color: rgba(239,68,68,0.1);
  color: #dc2626;
}

.feed-message {
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
  white-space: pre-line; /* Handle multiline breaks in text */
}

.feed-reply {
  margin-top: 12px;
  background-color: rgba(64,92,102,0.05);
  padding: 12px 16px;
  border-radius: 12px;
  border-left: 3px solid #405C66;
}
.feed-reply-header {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  color: #405C66;
  margin-bottom: 4px;
}
.feed-reply-text {
  font-size: 0.9rem;
  color: #475569;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
}
</style>
