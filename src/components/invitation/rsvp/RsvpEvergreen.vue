<template>
  <section ref="rsvpSection" class="py-20 md:py-28 px-4 md:px-8 bg-[#EBF2EE] relative overflow-hidden">
    <div class="max-w-3xl mx-auto relative z-10">
      <!-- Section Header -->
      <div ref="headerRef" class="opacity-0 translate-y-6 text-center mb-14">
        <span class="text-xs uppercase tracking-[0.3em] text-[#5C7367] font-semibold block mb-2">Konfirmasi & Ucapan</span>
        <h2 class="text-3xl md:text-5xl font-serif text-[#2D3E35] font-medium" style="font-family: 'Cormorant Garamond', Georgia, serif;">
          RSVP & Buku Tamu
        </h2>
        <div class="w-12 h-[1.5px] bg-[#7A9A8B] mx-auto mt-4"></div>
      </div>

      <!-- Form Container -->
      <div ref="formRef" class="opacity-0 translate-y-8 bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-[#8B9E8B]/30 shadow-[0_10px_35px_rgba(45,62,53,0.06)] mb-14">
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Guest Name Input -->
          <div>
            <label class="block text-xs uppercase tracking-wider text-[#5C7367] font-medium mb-2">Nama Lengkap</label>
            <input
              v-[#form.guest_name]
              v-model="form.guest_name"
              type="text"
              required
              placeholder="Masukkan nama Anda"
              class="w-full px-4 py-3 rounded-2xl bg-[#F2F5F3] border border-[#8B9E8B]/30 text-[#2D3E35] placeholder-[#7A9A8B]/60 focus:outline-none focus:border-[#4A6B5B] focus:bg-white transition-all text-sm"
            />
          </div>

          <!-- Attendance Status -->
          <div>
            <label class="block text-xs uppercase tracking-wider text-[#5C7367] font-medium mb-2">Konfirmasi Kehadiran</label>
            <div class="grid grid-cols-2 gap-4">
              <button
                type="button"
                @click="form.attendance = 'hadir'"
                class="py-3 px-4 rounded-2xl text-xs font-semibold uppercase tracking-wider border transition-all duration-300 flex items-center justify-center gap-2"
                :class="form.attendance === 'hadir' ? 'bg-[#4A6B5B] text-white border-[#4A6B5B] shadow-md' : 'bg-[#F2F5F3] text-[#5C7367] border-[#8B9E8B]/30 hover:border-[#4A6B5B]'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Hadir
              </button>
              
              <button
                type="button"
                @click="form.attendance = 'tidak_hadir'"
                class="py-3 px-4 rounded-2xl text-xs font-semibold uppercase tracking-wider border transition-all duration-300 flex items-center justify-center gap-2"
                :class="form.attendance === 'tidak_hadir' ? 'bg-[#7A9A8B] text-white border-[#7A9A8B] shadow-md' : 'bg-[#F2F5F3] text-[#5C7367] border-[#8B9E8B]/30 hover:border-[#7A9A8B]'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Tidak Hadir
              </button>
            </div>
          </div>

          <!-- Guest Count -->
          <div v-if="form.attendance === 'hadir'">
            <label class="block text-xs uppercase tracking-wider text-[#5C7367] font-medium mb-2">Jumlah Tamu</label>
            <select
              v-model.number="form.guest_count"
              class="w-full px-4 py-3 rounded-2xl bg-[#F2F5F3] border border-[#8B9E8B]/30 text-[#2D3E35] focus:outline-none focus:border-[#4A6B5B] focus:bg-white transition-all text-sm"
            >
              <option :value="1">1 Orang</option>
              <option :value="2">2 Orang</option>
              <option :value="3">3 Orang</option>
              <option :value="4">4+ Orang</option>
            </select>
          </div>

          <!-- Wish Message -->
          <div>
            <label class="block text-xs uppercase tracking-wider text-[#5C7367] font-medium mb-2">Ucapan &amp; Doa</label>
            <textarea
              v-model="form.message"
              rows="4"
              placeholder="Tuliskan pesan ucapan & doa untuk mempelai..."
              class="w-full px-4 py-3 rounded-2xl bg-[#F2F5F3] border border-[#8B9E8B]/30 text-[#2D3E35] placeholder-[#7A9A8B]/60 focus:outline-none focus:border-[#4A6B5B] focus:bg-white transition-all text-sm resize-none"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="submitting"
            class="w-full py-3.5 rounded-full bg-[#4A6B5B] hover:bg-[#3D5A4C] text-white text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-[0_6px_20px_rgba(74,107,91,0.25)] active:scale-[0.99] disabled:opacity-50"
          >
            {{ submitting ? 'Mengirim...' : 'Kirim Konfirmasi & Ucapan' }}
          </button>
        </form>
      </div>

      <!-- Messages List -->
      <div v-if="rsvpMessages && rsvpMessages.length > 0" ref="messagesRef" class="opacity-0 translate-y-6">
        <h3 class="text-xl font-serif font-semibold text-[#2D3E35] mb-6 text-center" style="font-family: 'Cormorant Garamond', Georgia, serif;">
          Ucapan &amp; Doa Restu ({{ rsvpMessages.length }})
        </h3>
        
        <div class="space-y-4 max-h-[450px] overflow-y-auto pr-1 custom-scrollbar">
          <div
            v-for="(rsvp, idx) in rsvpMessages"
            :key="idx"
            class="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-[#8B9E8B]/25 text-left"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-sm text-[#2D3E35]">{{ rsvp.guest_name }}</span>
                <span
                  class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase"
                  :class="rsvp.attendance === 'hadir' ? 'bg-[#E3ECE5] text-[#4A6B5B]' : 'bg-gray-100 text-gray-500'"
                >
                  {{ rsvp.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir' }}
                </span>
              </div>
              <span v-if="rsvp.created_at" class="text-[10px] text-[#7A9A8B]">
                {{ formatDate(rsvp.created_at) }}
              </span>
            </div>
            <p class="text-xs text-[#5C7367] leading-relaxed whitespace-pre-line">
              {{ rsvp.message }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Rsvp } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  rsvpMessages: Rsvp[];
  themeConfig: ThemeConfig;
  submitting?: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit-rsvp', form: { guest_name: string; attendance: 'hadir' | 'tidak_hadir'; guest_count: number; message: string }): void;
}>();

const rsvpSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const formRef = ref<HTMLElement | null>(null);
const messagesRef = ref<HTMLElement | null>(null);

const form = reactive({
  guest_name: '',
  attendance: 'hadir' as 'hadir' | 'tidak_hadir',
  guest_count: 1,
  message: '',
});

const submitForm = () => {
  if (!form.guest_name) return;
  emit('submit-rsvp', { ...form });
  form.message = '';
};

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '';
  }
};

onMounted(() => {
  if (!rsvpSection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: rsvpSection.value,
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
  .to(formRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out'
  }, "-=0.6")
  .to(messagesRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'power3.out'
  }, "-=0.6");
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
