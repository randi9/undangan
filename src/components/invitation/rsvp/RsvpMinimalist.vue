<template>
  <section class="py-24 px-6 max-w-3xl mx-auto text-center">
    <h2 class="text-3xl md:text-5xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">RSVP</h2>
    <div class="flex items-center justify-center gap-4 mb-8 text-[var(--theme-secondary)]">
      <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
      <span class="text-xl">💌</span>
      <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
    </div>
    
    <p class="text-[var(--theme-text-light)] mb-10 text-sm md:text-base">Kehadiran Anda merupakan kebahagiaan bagi kami</p>
    
    <div class="bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-black/5 text-left mb-16">
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-semibold mb-2 text-[var(--theme-text)]">Nama Lengkap</label>
          <input v-model="form.guest_name" type="text" placeholder="Masukkan nama Anda" required class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 outline-none transition-all" />
        </div>
        
        <div>
          <label class="block text-sm font-semibold mb-2 text-[var(--theme-text)]">Konfirmasi Kehadiran</label>
          <div class="flex flex-col sm:flex-row gap-4">
            <button type="button" @click="form.attendance = 'hadir'" :class="['flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all', form.attendance === 'hadir' ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-semibold' : 'border-gray-200 text-gray-500 hover:bg-gray-50']">
              ✅ Hadir
            </button>
            <button type="button" @click="form.attendance = 'tidak_hadir'" :class="['flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all', form.attendance === 'tidak_hadir' ? 'border-red-500 bg-red-50 text-red-600 font-semibold' : 'border-gray-200 text-gray-500 hover:bg-gray-50']">
              ❌ Tidak Hadir
            </button>
          </div>
        </div>
        
        <div v-show="form.attendance === 'hadir'">
          <label class="block text-sm font-semibold mb-2 text-[var(--theme-text)]">Jumlah Tamu</label>
          <input v-model.number="form.guest_count" type="number" min="1" max="10" placeholder="1" class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 outline-none transition-all" />
        </div>
        
        <div>
          <label class="block text-sm font-semibold mb-2 text-[var(--theme-text)]">Ucapan &amp; Doa</label>
          <textarea v-model="form.message" rows="4" placeholder="Tulis doa untuk kedua mempelai" class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 outline-none transition-all resize-y"></textarea>
        </div>
        
        <button type="submit" :disabled="submitting" class="w-full py-4 rounded-xl bg-[var(--theme-primary)] text-white font-semibold text-lg hover:bg-opacity-90 disabled:opacity-50 transition-all shadow-md">
          {{ submitting ? 'Mengirim...' : 'Kirim Ucapan' }}
        </button>
      </form>
    </div>
    
    <div v-if="rsvpMessages.length > 0" class="text-left bg-[var(--theme-surface)] rounded-2xl p-6 md:p-8">
      <h3 class="text-xl md:text-2xl font-bold mb-6 text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">Ucapan ({{ rsvpMessages.length }})</h3>
      <div class="space-y-4 max-h-96 overflow-y-auto pr-2" style="scrollbar-width: thin; scrollbar-color: var(--theme-secondary) transparent;">
        <div v-for="msg in rsvpMessages" :key="msg.id" class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="flex justify-between items-start mb-2">
            <span class="font-bold text-[var(--theme-text)]">{{ msg.guest_name }}</span>
            <span class="text-xs px-2 py-1 rounded-md" :class="msg.attendance === 'hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
              {{ msg.attendance === 'hadir' ? 'Akan Hadir' : 'Berhalangan' }}
              <span v-if="msg.attendance === 'hadir' && msg.guest_count > 1">({{ msg.guest_count }})</span>
            </span>
          </div>
          <p class="text-sm text-gray-600 leading-relaxed break-words whitespace-pre-wrap">{{ msg.message }}</p>
          <div v-if="msg.reply_text" class="mt-3 bg-gray-50 p-3 rounded-lg border-l-2 border-[var(--theme-primary)]">
            <div class="text-[0.65rem] uppercase tracking-wider font-bold text-[var(--theme-primary)] mb-1">Balasan Mempelai</div>
            <p class="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{{ msg.reply_text }}</p>
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
