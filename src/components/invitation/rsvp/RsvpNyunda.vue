<template>
  <section style="padding: 60px 24px; background-color: #F5E6D0;">

    <!-- RSVP Form -->
    <div style="max-width: 400px; margin: 0 auto; text-align: center;">
      <h2 :style="{ fontFamily: themeConfig.fontHeading, color: '#5C3D2E', fontSize: '1.75rem', marginBottom: '8px' }">Konfirmasi</h2>
      <p style="font-size: 0.75rem; color: #8B6F5C; margin-bottom: 32px;">Kehadiran Anda sangat berarti bagi kami</p>

      <form @submit.prevent="onSubmit" style="text-align: left;">
        <!-- Nama -->
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 0.7rem; color: #8B6F5C; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 6px;">Nama Lengkap</label>
          <input v-model="form.guest_name" type="text" maxlength="50" placeholder="Ketik nama Anda..." required
            style="width: 100%; background: transparent; border: none; border-bottom: 1px solid #A67B5B; color: #5C3D2E; font-size: 0.9rem; padding: 8px 0; outline: none;" />
        </div>

        <!-- Kehadiran -->
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 0.7rem; color: #8B6F5C; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px; text-align: center;">Konfirmasi Kehadiran</label>
          <div style="display: flex; gap: 12px;">
            <button type="button" @click="form.attendance = 'hadir'"
              :style="{
                flex: 1, padding: '10px', border: '1px solid #5C3D2E', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer',
                background: form.attendance === 'hadir' ? '#5C3D2E' : 'transparent',
                color: form.attendance === 'hadir' ? '#FFF8E7' : '#5C3D2E',
              }">Akan Hadir</button>
            <button type="button" @click="form.attendance = 'tidak_hadir'"
              :style="{
                flex: 1, padding: '10px', border: '1px solid #5C3D2E', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer',
                background: form.attendance === 'tidak_hadir' ? '#5C3D2E' : 'transparent',
                color: form.attendance === 'tidak_hadir' ? '#FFF8E7' : '#5C3D2E',
              }">Berhalangan</button>
          </div>
        </div>

        <!-- Jumlah Tamu -->
        <div v-show="form.attendance === 'hadir'" style="margin-bottom: 24px;">
          <label style="display: block; font-size: 0.7rem; color: #8B6F5C; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 6px;">Jumlah Tamu</label>
          <div style="display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #A67B5B; padding: 4px 0;">
            <button type="button" @click="form.guest_count = Math.max(1, form.guest_count - 1)" style="width: 28px; height: 28px; background: transparent; border: none; color: #5C3D2E; font-size: 18px; cursor: pointer;">−</button>
            <span style="flex: 1; text-align: center; color: #5C3D2E; font-weight: 600;">{{ form.guest_count }} Orang</span>
            <button type="button" @click="form.guest_count = Math.min(10, form.guest_count + 1)" style="width: 28px; height: 28px; background: transparent; border: none; color: #5C3D2E; font-size: 18px; cursor: pointer;">+</button>
          </div>
        </div>

        <!-- Pesan -->
        <div style="margin-bottom: 32px;">
          <label style="display: block; font-size: 0.7rem; color: #8B6F5C; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 6px;">Pesan & Doa</label>
          <textarea v-model="form.message" rows="3" maxlength="500" placeholder="Tuliskan ucapan terindah..."
            style="width: 100%; background: transparent; border: none; border-bottom: 1px solid #A67B5B; color: #5C3D2E; font-size: 0.9rem; padding: 8px 0; outline: none; resize: none; line-height: 1.6; font-family: inherit;"></textarea>
        </div>

        <!-- Submit -->
        <div style="text-align: center;">
          <button type="submit" :disabled="submitting"
            style="padding: 12px 32px; background-color: #5C3D2E; color: #FFF8E7; border: none; border-radius: 4px; font-size: 0.75rem; cursor: pointer; letter-spacing: 0.15em; text-transform: uppercase;">
            {{ submitting ? 'Mengirim...' : 'Kirim RSVP' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Buku Tamu -->
    <div style="max-width: 400px; margin: 40px auto 0; text-align: center;">
      <h3 :style="{ fontFamily: themeConfig.fontHeading, color: '#5C3D2E', fontSize: '1.25rem', marginBottom: '24px' }">
        Buku Tamu <span style="font-size: 0.7rem; color: #8B6F5C;">({{ rsvpMessages.length }})</span>
      </h3>

      <div style="max-height: 400px; overflow-y: auto; text-align: left;">
        <div v-for="msg in rsvpMessages" :key="msg.id" style="padding: 16px 0; border-bottom: 1px solid rgba(92,61,46,0.15);">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
            <h4 style="color: #5C3D2E; font-size: 0.85rem; font-weight: 600; margin: 0;">{{ msg.guest_name }}</h4>
            <span :style="{ fontSize: '0.65rem', color: msg.attendance === 'hadir' ? '#5C3D2E' : '#A67B5B' }">
              {{ msg.attendance === 'hadir' ? 'Hadir' : 'Absen' }}
            </span>
          </div>
          <p style="color: #8B6F5C; font-size: 0.8rem; font-style: italic; line-height: 1.6; white-space: pre-wrap; margin: 0;">"{{ msg.message }}"</p>
          <!-- Reply -->
          <div v-if="msg.reply_text" style="margin-top: 10px; padding: 10px; background: rgba(92,61,46,0.05); border-radius: 4px; border-left: 2px solid #A67B5B;">
            <span style="font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #A67B5B;">Balasan Mempelai</span>
            <p style="font-size: 0.75rem; color: #5C3D2E; white-space: pre-wrap; line-height: 1.6; margin: 4px 0 0 0;">{{ msg.reply_text }}</p>
          </div>
        </div>

        <div v-if="rsvpMessages.length === 0" style="text-align: center; padding: 40px 0; color: #A67B5B; font-size: 0.8rem; font-style: italic;">
          Belum ada ucapan. Jadilah yang pertama!
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { ThemeConfig } from '@/types/theme';
import type { Rsvp } from '@/types/invitation';

defineProps<{
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
  form.guest_name = '';
  form.message = '';
}
</script>
