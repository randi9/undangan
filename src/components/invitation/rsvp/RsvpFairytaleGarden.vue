<template>
  <section ref="rsvpSection" class="py-24 px-6 max-w-3xl mx-auto text-center relative overflow-hidden bg-[#F8F3EE]">
    <!-- Background Decor -->
    <div class="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#EBCFD1]/20 to-transparent -z-10 blur-xl"></div>

    <div ref="headerRef" class="opacity-0 translate-y-6 mb-12">
      <h2 class="text-3xl md:text-5xl font-normal tracking-wide text-[#6A4E42] mb-4" :style="{ fontFamily: themeConfig.fontHeading }">RSVP & Ucapan</h2>
      <div class="flex items-center justify-center gap-4 text-[#AEB8A3]">
        <div class="h-[1px] w-8 bg-[#AEB8A3]"></div>
        <div class="w-1.5 h-1.5 border border-[#AEB8A3] transform rotate-45"></div>
        <div class="h-[1px] w-8 bg-[#AEB8A3]"></div>
      </div>
    </div>
    
    <p ref="descRef" class="text-[#9A7B6B] mb-10 text-sm md:text-base font-light tracking-wide opacity-0 translate-y-4">Kehadiran Anda merupakan kebahagiaan bagi kami</p>
    
    <div ref="formRef" class="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_10px_40px_rgba(106,78,66,0.04)] border border-[#EBCFD1] text-left mb-16 opacity-0 translate-y-10">
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-[#6A4E42] mb-2">Nama Lengkap</label>
          <input v-model="form.guest_name" type="text" maxlength="50" placeholder="Masukkan nama Anda" required class="w-full px-5 py-4 rounded-xl border border-[#EBCFD1] bg-[#F8F3EE]/30 text-[#6A4E42] focus:bg-white focus:border-[#D9A9AF] outline-none transition-all font-light" />
        </div>
        
        <div>
          <label class="block text-xs uppercase tracking-widest text-[#9A7B6B] font-semibold mb-3">Konfirmasi Kehadiran</label>
          <div class="flex flex-col sm:flex-row gap-4">
            <button type="button" @click="form.attendance = 'hadir'" :class="['flex-1 py-4 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all font-medium text-sm', form.attendance === 'hadir' ? 'border-[#D9A9AF] bg-[#D9A9AF] text-white shadow-md' : 'border-[#EBCFD1] text-[#9A7B6B] hover:bg-[#F8F3EE]/50 bg-white']">
              Akan Hadir
            </button>
            <button type="button" @click="form.attendance = 'tidak_hadir'" :class="['flex-1 py-4 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all font-medium text-sm', form.attendance === 'tidak_hadir' ? 'border-red-200 bg-red-50 text-red-600 shadow-sm' : 'border-[#EBCFD1] text-[#9A7B6B] hover:bg-[#F8F3EE]/50 bg-white']">
              Tidak Hadir
            </button>
          </div>
        </div>
        
        <div v-show="form.attendance === 'hadir'">
          <label class="block text-sm font-medium text-[#6A4E42] mb-2">Jumlah Tamu</label>
          <div class="flex items-center justify-between rounded-xl border border-[#EBCFD1] bg-[#F8F3EE]/30 overflow-hidden transition-all focus-within:bg-white focus-within:border-[#D9A9AF]">
            <button type="button" @click="form.guest_count = Math.max(1, form.guest_count - 1)" class="w-14 h-14 flex items-center justify-center text-xl text-[#9A7B6B] hover:bg-gray-100 transition-colors">−</button>
            <div class="flex-1 flex justify-center items-center">
              <input v-model.number="form.guest_count" type="number" min="1" max="10" class="w-10 text-center bg-transparent border-none font-medium text-[#6A4E42] outline-none appearance-none" style="-moz-appearance: textfield;" />
              <span class="text-sm font-medium text-[#9A7B6B] ml-1">Orang</span>
            </div>
            <button type="button" @click="form.guest_count = Math.min(10, form.guest_count + 1)" class="w-14 h-14 flex items-center justify-center text-xl text-[#9A7B6B] hover:bg-gray-100 transition-colors">+</button>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-[#6A4E42] mb-2">Ucapan &amp; Doa</label>
          <textarea v-model="form.message" rows="3" maxlength="500" placeholder="Tulis doa untuk kedua mempelai" class="w-full px-5 py-4 rounded-xl border border-[#EBCFD1] bg-[#F8F3EE]/30 text-[#6A4E42] focus:bg-white focus:border-[#D9A9AF] outline-none transition-all font-light resize-y"></textarea>
        </div>
        
        <button type="submit" :disabled="submitting" class="w-full py-4 mt-4 rounded-xl bg-[#AEB8A3] text-white font-medium text-sm uppercase tracking-widest hover:bg-[#9A7B6B] disabled:opacity-50 transition-all shadow-[0_8px_20px_rgba(174,184,163,0.3)]">
          {{ submitting ? 'Mengirim...' : 'Kirim Ucapan' }}
        </button>
      </form>
    </div>
    
    <div v-if="rsvpMessages.length > 0" ref="messagesRef" class="opacity-0 translate-y-8 text-left max-w-3xl mx-auto">
      <div class="flex items-center justify-between mb-8">
         <h3 class="text-xl md:text-2xl font-normal tracking-wide text-[#6A4E42]" :style="{ fontFamily: themeConfig.fontHeading }">Pesan Tamu</h3>
         <span class="bg-[#EBCFD1] text-[#6A4E42] px-4 py-1.5 rounded-full text-xs font-semibold">{{ rsvpMessages.length }} Pesan</span>
      </div>
      
      <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-[#EBCFD1] scrollbar-track-transparent">
        <div v-for="msg in rsvpMessages" :key="msg.id" class="p-6 bg-white rounded-2xl shadow-[0_4px_20px_rgba(106,78,66,0.02)] border border-[#EBCFD1] hover:border-[#D9A9AF] transition-colors">
          <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0 mb-4">
            <span class="font-medium text-[#6A4E42] text-sm tracking-wide break-words max-w-full">{{ msg.guest_name }}</span>
            <span class="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-md font-semibold" :class="msg.attendance === 'hadir' ? 'bg-[#EBCFD1]/30 text-[#6A4E42] border border-[#EBCFD1]' : 'bg-red-50 text-red-600 border border-red-100'">
              {{ msg.attendance === 'hadir' ? 'Hadir' : 'Absen' }}
              <span v-if="msg.attendance === 'hadir' && msg.guest_count > 1">({{ msg.guest_count }})</span>
            </span>
          </div>
          <p class="text-sm text-[#9A7B6B] font-light leading-relaxed whitespace-pre-wrap" style="word-break: break-word; overflow-wrap: anywhere;">{{ msg.message }}</p>
          <div v-if="msg.reply_text" class="mt-4 bg-[#F8F3EE] p-4 rounded-xl border border-[#EBCFD1]">
            <div class="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-[#9A7B6B] mb-2">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
              Balasan Mempelai
            </div>
            <p class="text-[13px] text-[#6A4E42] font-light leading-relaxed whitespace-pre-wrap" style="word-break: break-word; overflow-wrap: anywhere;">{{ msg.reply_text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Rsvp } from '@/types/invitation';

gsap.registerPlugin(ScrollTrigger);

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

const rsvpSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const descRef = ref<HTMLElement | null>(null);
const formRef = ref<HTMLElement | null>(null);
const messagesRef = ref<HTMLElement | null>(null);

let tl: gsap.core.Timeline | null = null;

function onSubmit() {
  emit('submitRsvp', { ...form });
  form.guest_name = '';
  form.attendance = 'hadir';
  form.guest_count = 1;
  form.message = '';
}

onMounted(() => {
  if (!rsvpSection.value) return;

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: rsvpSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(headerRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
    .to(descRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6")
    .to(formRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.6");
    
  if (messagesRef.value) {
    tl.to(messagesRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.4");
  }
});

onBeforeUnmount(() => {
  if (tl) {
    tl.kill();
    if (tl.scrollTrigger) tl.scrollTrigger.kill();
  }
});

</script>
