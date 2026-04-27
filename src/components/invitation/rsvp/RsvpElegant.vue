<template>
  <section ref="rsvpSection" class="py-24 px-6 max-w-4xl mx-auto text-center overflow-hidden">
    <!-- Header -->
    <div ref="headerRef" class="opacity-0 translate-y-6">
      <h2 class="text-3xl md:text-5xl mb-3" :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-primary)' }">RSVP & Ucapan</h2>
      <div class="flex items-center justify-center gap-4 mb-4">
        <svg viewBox="0 0 60 2" class="w-12 md:w-16" style="opacity: 0.4;"><rect width="60" height="1.5" rx="0.75" fill="var(--theme-secondary)"/></svg>
        <svg viewBox="0 0 24 24" class="w-5 h-5" style="opacity: 0.5;">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm16 2H4l8 5 8-5z" fill="var(--theme-secondary)"/>
        </svg>
        <svg viewBox="0 0 60 2" class="w-12 md:w-16" style="opacity: 0.4;"><rect width="60" height="1.5" rx="0.75" fill="var(--theme-secondary)"/></svg>
      </div>
      <p class="mb-12 text-sm md:text-base" :style="{ color: 'var(--theme-text-light)' }">Kehadiran dan doa restu Anda merupakan kebahagiaan bagi kami</p>
    </div>
    
    <div class="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start text-left">
      
      <!-- Form Side -->
      <div ref="formRef" class="w-full lg:w-5/12 bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-2xl border relative opacity-0 translate-x-[-20px]"
           :style="{ borderColor: 'rgba(201,169,110,0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }">
        <!-- Deco corners -->
        <svg viewBox="0 0 40 40" class="absolute -top-[1px] -left-[1px] w-8 h-8 pointer-events-none">
          <path d="M0 40 L0 0 L40 0" fill="none" stroke="var(--theme-secondary)" stroke-width="1.5" opacity="0.6"/>
        </svg>
        <svg viewBox="0 0 40 40" class="absolute -top-[1px] -right-[1px] w-8 h-8 pointer-events-none">
          <path d="M0 0 L40 0 L40 40" fill="none" stroke="var(--theme-secondary)" stroke-width="1.5" opacity="0.6"/>
        </svg>
        <svg viewBox="0 0 40 40" class="absolute -bottom-[1px] -left-[1px] w-8 h-8 pointer-events-none">
           <path d="M0 0 L0 40 L40 40" fill="none" stroke="var(--theme-secondary)" stroke-width="1.5" opacity="0.6"/>
        </svg>
        <svg viewBox="0 0 40 40" class="absolute -bottom-[1px] -right-[1px] w-8 h-8 pointer-events-none">
           <path d="M40 0 L40 40 L0 40" fill="none" stroke="var(--theme-secondary)" stroke-width="1.5" opacity="0.6"/>
        </svg>

        <form @submit.prevent="onSubmit" class="space-y-5 relative z-10">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2" :style="{ color: 'var(--theme-text)' }">Nama Lengkap</label>
            <input v-model="form.guest_name" type="text" maxlength="50" placeholder="Masukkan nama Anda" required 
                   class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none transition-all placeholder-gray-400 focus:bg-white focus:ring-2 focus:border-transparent custom-focus"
                   :style="{ '--focus-ring-color': 'var(--theme-secondary)' } as any" />
          </div>
          
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2" :style="{ color: 'var(--theme-text)' }">Konfirmasi Kehadiran</label>
            <div class="flex flex-col sm:flex-row gap-3">
              <button type="button" @click="form.attendance = 'hadir'" 
                      :class="['flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all font-medium text-sm', form.attendance === 'hadir' ? 'shadow-md scale-[1.02]' : 'hover:bg-gray-50']"
                      :style="form.attendance === 'hadir' ? { borderColor: 'var(--theme-secondary)', backgroundColor: 'var(--theme-secondary)', color: 'var(--theme-bg)' } : { borderColor: '#e5e7eb', color: '#6b7280' }">
                Hadir
              </button>
              <button type="button" @click="form.attendance = 'tidak_hadir'" 
                      :class="['flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all font-medium text-sm', form.attendance === 'tidak_hadir' ? 'shadow-md scale-[1.02]' : 'hover:bg-gray-50']"
                      :style="form.attendance === 'tidak_hadir' ? { borderColor: '#ef4444', backgroundColor: '#fef2f2', color: '#dc2626' } : { borderColor: '#e5e7eb', color: '#6b7280' }">
                Berhalangan
              </button>
            </div>
          </div>
          
          <div v-show="form.attendance === 'hadir'">
            <label class="block text-xs font-bold uppercase tracking-wider mb-2" :style="{ color: 'var(--theme-text)' }">Jumlah Tamu</label>
            <div class="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 overflow-hidden transition-all focus-within:bg-white focus-within:ring-2" :style="{ '--tw-ring-color': 'var(--theme-secondary)' } as any">
              <button type="button" @click="form.guest_count = Math.max(1, form.guest_count - 1)" class="w-12 h-12 flex items-center justify-center text-xl text-gray-500 hover:bg-gray-100 transition-colors">−</button>
              <div class="flex-1 flex justify-center items-center">
                <input v-model.number="form.guest_count" type="number" min="1" max="10" class="w-10 text-center bg-transparent border-none font-semibold text-gray-700 outline-none appearance-none" style="-moz-appearance: textfield;" />
                <span class="text-sm font-medium text-gray-500 ml-1">Orang</span>
              </div>
              <button type="button" @click="form.guest_count = Math.min(10, form.guest_count + 1)" class="w-12 h-12 flex items-center justify-center text-xl text-gray-500 hover:bg-gray-100 transition-colors">+</button>
            </div>
          </div>
          
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2" :style="{ color: 'var(--theme-text)' }">Ucapan &amp; Doa</label>
            <textarea v-model="form.message" rows="3" maxlength="500" placeholder="Tulis doa untuk kedua mempelai" 
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none transition-all resize-y placeholder-gray-400"></textarea>
          </div>
          
          <button type="submit" :disabled="submitting" 
                  class="w-full py-3.5 rounded-xl text-white font-bold tracking-wide uppercase text-sm hover:opacity-90 disabled:opacity-50 transition-all shadow-[0_4px_12px_rgba(201,169,110,0.3)] mt-2"
                  :style="{ background: 'linear-gradient(135deg, var(--theme-secondary), var(--theme-primary))' }">
            {{ submitting ? 'Mengirim...' : 'Kirim Ucapan' }}
          </button>
        </form>
      </div>

      <!-- Messages Feed Side -->
      <div v-if="rsvpMessages.length > 0" class="w-full lg:w-7/12 flex flex-col h-[500px]">
        <div class="flex items-center justify-between mb-4 px-2">
          <h3 class="text-xl font-bold" :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-primary)' }">Ucapan Doa</h3>
          <span class="text-xs px-3 py-1 rounded-full bg-white border font-semibold" :style="{ borderColor: 'rgba(201,169,110,0.3)', color: 'var(--theme-secondary)' }">{{ rsvpMessages.length }} Pesan</span>
        </div>
        
        <div class="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
          <div v-for="(msg, idx) in rsvpMessages" :key="msg.id" 
               :ref="el => { if (el) messageRefs[idx] = el as HTMLElement }"
               class="p-5 bg-white/60 backdrop-blur-sm rounded-2xl border transition-all hover:bg-white"
               :style="{ borderColor: 'rgba(201,169,110,0.15)' }">
            
            <div class="flex items-start gap-4">
              <!-- Avatar Circle -->
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                   :style="{ background: 'linear-gradient(135deg, var(--theme-secondary), var(--theme-primary))' }">
                {{ msg.guest_name.charAt(0).toUpperCase() }}
              </div>
              
              <div class="flex-1">
                <div class="flex flex-wrap justify-between items-start gap-2 mb-1">
                  <span class="font-bold text-gray-800 break-words max-w-full">{{ msg.guest_name }}</span>
                  <span class="text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-bold" 
                        :class="msg.attendance === 'hadir' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-500 border border-red-100'">
                    {{ msg.attendance === 'hadir' ? 'Hadir' : 'Absen' }}
                    <span v-if="msg.attendance === 'hadir' && msg.guest_count > 1">({{ msg.guest_count }})</span>
                  </span>
                </div>
                
                <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap mb-1 italic font-light" style="word-break: break-word; overflow-wrap: anywhere;">"{{ msg.message }}"</p>
                
                <div class="text-[10px] text-gray-400 mt-2">{{ formatDate(msg.created_at || new Date().toISOString()) }}</div>
                
                <!-- Reply -->
                <div v-if="msg.reply_text" class="mt-3 bg-gray-50/80 p-3.5 rounded-xl border-l-[3px] relative"
                     :style="{ borderLeftColor: 'var(--theme-secondary)' }">
                  <div class="absolute -left-[5px] top-4 w-2 h-2 rounded-full" :style="{ backgroundColor: 'var(--theme-secondary)' }"></div>
                  <div class="flex items-center gap-2 mb-1">
                    <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" :style="{ fill: 'var(--theme-secondary)' }">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" opacity="0.3"/>
                      <path d="M12 7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1zm0 8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
                    </svg>
                    <span class="text-[10px] uppercase tracking-widest font-bold" :style="{ color: 'var(--theme-primary)' }">Balasan Mempelai</span>
                  </div>
                  <p class="text-[13px] text-gray-700 leading-relaxed font-medium whitespace-pre-wrap" style="word-break: break-word; overflow-wrap: anywhere;">{{ msg.reply_text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
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

const rsvpSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const formRef = ref<HTMLElement | null>(null);
const messageRefs = ref<HTMLElement[]>([]);

const form = reactive({
  guest_name: '',
  attendance: 'hadir' as 'hadir' | 'tidak_hadir',
  guest_count: 1,
  message: '',
});

function onSubmit() {
  emit('submitRsvp', { ...form });
}

function formatDate(dateString: string) {
  const d = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(d);
}

onMounted(() => {
  if (!rsvpSection.value) return;

  gsap.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: rsvpSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  gsap.to(formRef.value, {
    opacity: 1,
    x: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: formRef.value,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });

  // Stagger messages entrance if present
  if (messageRefs.value.length > 0) {
    ScrollTrigger.batch(messageRefs.value, {
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out' }
        );
      },
      start: 'top 90%',
      once: true
    });
  }
});
</script>

<style scoped>
.custom-focus:focus {
  --tw-ring-color: var(--focus-ring-color);
}
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--theme-secondary);
  border-radius: 10px;
  opacity: 0.5;
}
</style>
