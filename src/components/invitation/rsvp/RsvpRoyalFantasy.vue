<template>
  <section ref="rsvpSection" class="relative py-24 px-4 md:px-8 bg-[#18201B] overflow-hidden text-center">
    <!-- Ambient Radial Glow -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(circle at 50% 30%, rgba(112, 132, 120, 0.2) 0%, transparent 70%);"
    ></div>

    <div ref="rsvpWrapper" class="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
      <!-- Section Header -->
      <div class="mb-16 text-center">
        <div class="flex items-center justify-center gap-2 mb-2">
          <span class="text-[#D4A6AD] text-xs">✦</span>
          <span class="text-xs uppercase tracking-[0.35em] text-[#D4A6AD] font-semibold">Buku Tamu &amp; Kehadiran</span>
          <span class="text-[#D4A6AD] text-xs">✦</span>
        </div>
        <h2
          class="text-3xl md:text-5xl font-serif text-[#ECE0D3] font-normal"
          :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
        >
          Konfirmasi Kehadiran &amp; Doa
        </h2>
        <p class="text-xs md:text-sm text-[#D4A6AD] mt-3 max-w-md mx-auto leading-relaxed">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>
        <div class="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#708478] to-transparent mx-auto mt-4"></div>
      </div>

      <!-- Main Two Column Grid (Form & Wishes) -->
      <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch text-left">
        <!-- Form Column -->
        <div class="p-8 md:p-10 rounded-3xl border border-[#708478]/50 bg-[#243029]/85 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(212,166,173,0.1)] relative overflow-hidden flex flex-col justify-between">
          <span class="absolute top-3 left-4 text-[#D4A6AD]/60 text-xs">❖</span>
          <span class="absolute top-3 right-4 text-[#D4A6AD]/60 text-xs">❖</span>

          <div>
            <h3
              class="text-2xl font-normal text-[#ECE0D3] mb-6 flex items-center gap-2"
              :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
            >
              <svg class="w-6 h-6 text-[#D4A6AD]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-7 4.5L5 8V6l7 4.5L19 6v2z"/>
              </svg>
              Kirim Konfirmasi
            </h3>

            <form @submit.prevent="onSubmit" class="space-y-5">
              <!-- Name Input -->
              <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-[#D4A6AD] mb-2">Nama Lengkap</label>
                <input
                  v-model="form.guest_name"
                  type="text"
                  maxlength="50"
                  placeholder="Masukkan nama Anda"
                  required
                  class="w-full px-4 py-3 rounded-2xl border border-[#708478]/50 bg-[#1E2622] text-[#ECE0D3] placeholder-[#ECE0D3]/40 focus:outline-none focus:border-[#D4A6AD] focus:ring-1 focus:ring-[#D4A6AD] transition-all text-sm"
                />
              </div>

              <!-- Attendance Choice -->
              <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-[#D4A6AD] mb-2">Konfirmasi Kehadiran</label>
                <div class="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    @click="form.attendance = 'hadir'"
                    class="py-3 px-4 rounded-2xl border text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    :class="
                      form.attendance === 'hadir'
                        ? 'border-[#D4A6AD] bg-gradient-to-r from-[#D4A6AD] to-[#ECE0D3] text-[#18201B] shadow-md'
                        : 'border-[#708478]/30 bg-[#1E2622]/60 text-[#ECE0D3]/80 hover:border-[#D4A6AD]/50'
                    "
                  >
                    <span>✓</span> Hadir
                  </button>
                  <button
                    type="button"
                    @click="form.attendance = 'tidak_hadir'"
                    class="py-3 px-4 rounded-2xl border text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    :class="
                      form.attendance === 'tidak_hadir'
                        ? 'border-red-400 bg-red-950/60 text-red-200 shadow-md'
                        : 'border-[#708478]/30 bg-[#1E2622]/60 text-[#ECE0D3]/80 hover:border-[#D4A6AD]/50'
                    "
                  >
                    <span>✕</span> Tidak Hadir
                  </button>
                </div>
              </div>

              <!-- Guest Count -->
              <div v-show="form.attendance === 'hadir'">
                <label class="block text-xs font-semibold uppercase tracking-wider text-[#D4A6AD] mb-2">Jumlah Tamu</label>
                <div class="flex items-center justify-between px-3 py-1.5 rounded-2xl border border-[#708478]/50 bg-[#1E2622]">
                  <button
                    type="button"
                    @click="form.guest_count = Math.max(1, form.guest_count - 1)"
                    class="w-10 h-10 rounded-xl flex items-center justify-center text-lg text-[#ECE0D3] hover:bg-[#D4A6AD]/20 transition-all cursor-pointer"
                  >
                    −
                  </button>
                  <div class="text-sm font-semibold text-[#ECE0D3]">
                    {{ form.guest_count }} Orang
                  </div>
                  <button
                    type="button"
                    @click="form.guest_count = Math.min(10, form.guest_count + 1)"
                    class="w-10 h-10 rounded-xl flex items-center justify-center text-lg text-[#ECE0D3] hover:bg-[#D4A6AD]/20 transition-all cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-[#D4A6AD] mb-2">Ucapan &amp; Doa Restu</label>
                <textarea
                  v-model="form.message"
                  rows="3"
                  maxlength="500"
                  placeholder="Tulis doa restu Anda untuk kedua mempelai..."
                  class="w-full px-4 py-3 rounded-2xl border border-[#708478]/50 bg-[#1E2622] text-[#ECE0D3] placeholder-[#ECE0D3]/40 focus:outline-none focus:border-[#D4A6AD] focus:ring-1 focus:ring-[#D4A6AD] transition-all text-sm resize-none"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="submitting"
                class="w-full py-3.5 px-6 rounded-2xl text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#18201B] bg-gradient-to-r from-[#D4A6AD] via-[#ECE0D3] to-[#D4A6AD] shadow-[0_4px_20px_rgba(212,166,173,0.3)] hover:shadow-[0_6px_25px_rgba(236,224,211,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                <svg v-if="submitting" class="animate-spin h-4 w-4 text-[#18201B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ submitting ? 'Mengirim...' : 'Kirim Ucapan & Konfirmasi' }}</span>
              </button>
            </form>
          </div>
        </div>

        <!-- Wishes List Column -->
        <div class="p-8 md:p-10 rounded-3xl border border-[#708478]/50 bg-[#243029]/85 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(212,166,173,0.1)] relative overflow-hidden flex flex-col h-[520px]">
          <span class="absolute top-3 left-4 text-[#D4A6AD]/60 text-xs">❖</span>
          <span class="absolute top-3 right-4 text-[#D4A6AD]/60 text-xs">❖</span>

          <div class="flex justify-between items-center mb-6 pb-3 border-b border-[#708478]/30">
            <h3
              class="text-2xl font-normal text-[#ECE0D3]"
              :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
            >
              Ucapan Doa
            </h3>
            <span class="px-3 py-1 rounded-full text-xs font-semibold border border-[#D4A6AD]/40 text-[#D4A6AD] bg-[#1E2622]">
              {{ rsvpMessages.length }} Pesan
            </span>
          </div>

          <!-- Empty State -->
          <div v-if="rsvpMessages.length === 0" class="flex-1 flex flex-col items-center justify-center text-center text-[#708478]">
            <div class="w-14 h-14 rounded-full border border-[#708478]/50 bg-[#1E2622] flex items-center justify-center text-2xl mb-3">
              💌
            </div>
            <p class="text-xs text-[#D4A6AD]">
              Belum ada ucapan.<br />Jadilah yang pertama menyampaikan doa restu!
            </p>
          </div>

          <!-- Messages Scrollable List -->
          <div v-else class="flex-1 overflow-y-auto space-y-4 pr-2 custom-scroll">
            <div
              v-for="msg in rsvpMessages"
              :key="msg.id"
              class="p-4 rounded-2xl border border-[#708478]/30 bg-[#1E2622]/80 space-y-2"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full border border-[#D4A6AD]/50 bg-gradient-to-br from-[#D4A6AD] to-[#708478] text-[#18201B] font-bold flex items-center justify-center text-sm shadow-sm">
                    {{ msg.guest_name.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <h4 class="text-sm font-semibold text-[#ECE0D3]">{{ msg.guest_name }}</h4>
                    <span
                      class="text-[10px] font-medium flex items-center gap-1"
                      :class="msg.attendance === 'hadir' ? 'text-[#D4A6AD]' : 'text-gray-400'"
                    >
                      <span>●</span> {{ msg.attendance === 'hadir' ? 'Akan Hadir' : 'Berhalangan' }}
                      <span v-if="msg.attendance === 'hadir' && msg.guest_count > 1">({{ msg.guest_count }} orang)</span>
                    </span>
                  </div>
                </div>
              </div>

              <p class="text-xs text-[#ECE0D3]/80 leading-relaxed pt-2 border-t border-[#708478]/20 whitespace-pre-wrap">
                {{ msg.message }}
              </p>

              <!-- Couple Reply (if any) -->
              <div v-if="msg.reply_text" class="mt-2 p-3 rounded-xl bg-[#243029] border-l-2 border-[#D4A6AD] text-xs">
                <div class="text-[10px] font-semibold uppercase tracking-wider text-[#D4A6AD] mb-1">Balasan Mempelai</div>
                <p class="text-[#ECE0D3]">{{ msg.reply_text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Rsvp } from '@/types/invitation';

gsap.registerPlugin(ScrollTrigger);

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

const rsvpSection = ref<HTMLElement | null>(null);
const rsvpWrapper = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  if (!rsvpWrapper.value) return;
  ctx = gsap.context(() => {
    gsap.from(rsvpWrapper.value, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: rsvpWrapper.value,
        start: 'top 80%',
      },
    });
  }, rsvpSection.value || undefined);
});

onUnmounted(() => {
  ctx?.revert();
});

function onSubmit() {
  emit('submitRsvp', { ...form });
  form.guest_name = '';
  form.attendance = 'hadir';
  form.guest_count = 1;
  form.message = '';
}
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  width: 4px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(212, 175, 55, 0.3);
  border-radius: 4px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 175, 55, 0.6);
}
</style>
