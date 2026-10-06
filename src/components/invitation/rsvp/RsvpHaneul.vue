<template>
  <section
    ref="rsvpSection"
    class="relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-8 box-border overflow-hidden"
    :style="{
      background: '#F4EDE0',
      fontFamily: themeConfig?.fontBody || `'Plus Jakarta Sans', sans-serif`,
    }"
  >
    <!-- Background Decor Elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute top-1/4 -right-24 w-88 h-88 bg-[#CDE0F2]/50 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 -left-24 w-88 h-88 bg-[#A7C7E7]/40 rounded-full blur-3xl"></div>
      <div class="absolute top-12 left-12 text-[#D4AF37] text-base opacity-40">✦</div>
      <div class="absolute bottom-12 right-12 text-[#D4AF37] text-lg opacity-40">✧</div>
    </div>

    <div class="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center">
      <!-- Section Header -->
      <div ref="headerRef" class="text-center mb-10 max-w-lg mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/70 shadow-xs mb-3">
          <span class="text-[#D4AF37] text-xs">✦</span>
          <span class="text-xs uppercase tracking-[0.3em] text-[#386B99] font-bold">
            Guest Book &amp; RSVP
          </span>
          <span class="text-[#D4AF37] text-xs">✦</span>
        </div>
        <h2
          class="text-3xl sm:text-4xl md:text-5xl text-[#1E354D] font-semibold tracking-tight leading-tight"
          :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
        >
          Konfirmasi Kehadiran
        </h2>
        <div class="w-16 h-1 bg-gradient-to-r from-transparent via-[#7DA8CC] to-transparent mx-auto mt-4 mb-4"></div>
        <p class="text-xs sm:text-sm text-[#5B7B99] leading-relaxed">
          Mohon konfirmasi kehadiran dan sampaikan doa restu terbaik Anda untuk kedua mempelai:
        </p>
      </div>

      <!-- RSVP Form Card -->
      <div
        ref="formCardRef"
        class="w-full p-6 sm:p-9 rounded-[40px] bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_15px_40px_rgba(44,74,111,0.09)] mb-10"
      >
        <form @submit.prevent="submitForm" class="flex flex-col gap-4">
          <!-- Name Input -->
          <div>
            <label class="block text-xs font-semibold text-[#1E354D] uppercase tracking-wider mb-1.5">
              Nama Lengkap
            </label>
            <input
              v-model="form.guest_name"
              type="text"
              required
              placeholder="Contoh: Bpk. Bambang & Keluarga"
              class="w-full px-4 py-3 rounded-2xl bg-white/80 border border-[#CDE0F2] text-[#1E354D] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#386B99]/40 transition-all placeholder:text-[#5B7B99]/50"
            />
          </div>

          <!-- Attendance Option -->
          <div>
            <label class="block text-xs font-semibold text-[#1E354D] uppercase tracking-wider mb-1.5">
              Konfirmasi Kehadiran
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="form.attendance = 'hadir'"
                class="py-3 px-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                :class="form.attendance === 'hadir' ? 'bg-[#386B99] text-white border-[#386B99] shadow-sm' : 'bg-white/70 text-[#2C4A6F] border-[#CDE0F2] hover:bg-white'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>Ya, Hadir</span>
              </button>
              <button
                type="button"
                @click="form.attendance = 'tidak_hadir'"
                class="py-3 px-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                :class="form.attendance === 'tidak_hadir' ? 'bg-[#5B7B99] text-white border-[#5B7B99] shadow-sm' : 'bg-white/70 text-[#2C4A6F] border-[#CDE0F2] hover:bg-white'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Tidak Hadir</span>
              </button>
            </div>
          </div>

          <!-- Number of Guests -->
          <div v-if="form.attendance === 'hadir'">
            <label class="block text-xs font-semibold text-[#1E354D] uppercase tracking-wider mb-1.5">
              Jumlah Tamu
            </label>
            <select
              v-model.number="form.guest_count"
              class="w-full px-4 py-3 rounded-2xl bg-white/80 border border-[#CDE0F2] text-[#1E354D] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#386B99]/40 transition-all cursor-pointer"
            >
              <option :value="1">1 Orang</option>
              <option :value="2">2 Orang</option>
              <option :value="3">3 Orang</option>
              <option :value="4">4 Orang</option>
              <option :value="5">5 Orang</option>
            </select>
          </div>

          <!-- Message / Wishes -->
          <div>
            <label class="block text-xs font-semibold text-[#1E354D] uppercase tracking-wider mb-1.5">
              Ucapan &amp; Doa Restu
            </label>
            <textarea
              v-model="form.message"
              rows="3"
              placeholder="Tuliskan ucapan dan doa terbaik Anda di sini..."
              class="w-full px-4 py-3 rounded-2xl bg-white/80 border border-[#CDE0F2] text-[#1E354D] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#386B99]/40 transition-all placeholder:text-[#5B7B99]/50 resize-none"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="submitting"
            class="w-full mt-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#386B99] via-[#4A7CA8] to-[#386B99] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {{ submitting ? 'Mengirim Konfirmasi...' : 'Kirim Konfirmasi & Ucapan' }}
          </button>
        </form>
      </div>

      <!-- Guest Wishes Stream (Buku Tamu) -->
      <div
        v-if="rsvpMessages && rsvpMessages.length > 0"
        ref="wishesRef"
        class="w-full p-6 sm:p-8 rounded-[40px] bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_15px_40px_rgba(44,74,111,0.08)] flex flex-col items-center"
      >
        <h3
          class="text-xl sm:text-2xl font-bold tracking-tight text-[#1E354D] mb-5 text-center"
          :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
        >
          Ucapan &amp; Doa Restu ({{ rsvpMessages.length }})
        </h3>

        <div class="w-full flex flex-col gap-3.5 max-h-[380px] overflow-y-auto pr-1">
          <div
            v-for="(rsvp, idx) in rsvpMessages"
            :key="idx"
            class="p-4 rounded-2xl bg-white/80 border border-[#E3EEF8] shadow-2xs flex flex-col gap-1.5"
          >
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#A7C7E7] to-[#386B99] text-white text-xs font-bold flex items-center justify-center">
                  {{ getInitials(rsvp.guest_name) }}
                </div>
                <div>
                  <h4 class="text-xs sm:text-sm font-bold text-[#1E354D] leading-tight">
                    {{ rsvp.guest_name }}
                  </h4>
                  <span class="text-[10px] text-[#7DA8CC]">
                    {{ formatDate(rsvp.created_at) }}
                  </span>
                </div>
              </div>

              <span
                class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                :class="rsvp.attendance === 'hadir' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'"
              >
                {{ rsvp.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir' }}
              </span>
            </div>

            <p v-if="rsvp.message" class="text-xs text-[#2C4A6F] mt-1 pl-10 leading-relaxed whitespace-pre-line">
              "{{ rsvp.message }}"
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Rsvp } from "@/types/invitation";
import type { ThemeConfig } from "@/types/theme";

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  rsvpMessages?: Rsvp[];
  themeConfig?: ThemeConfig;
  submitting?: boolean;
}>();

const emit = defineEmits<{
  (
    e: "submit-rsvp",
    form: {
      guest_name: string;
      attendance: "hadir" | "tidak_hadir";
      guest_count: number;
      message: string;
    }
  ): void;
}>();

const rsvpSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const formCardRef = ref<HTMLElement | null>(null);
const wishesRef = ref<HTMLElement | null>(null);

const form = reactive({
  guest_name: "",
  attendance: "hadir" as "hadir" | "tidak_hadir",
  guest_count: 1,
  message: "",
});

const submitForm = () => {
  if (!form.guest_name) return;
  emit("submit-rsvp", { ...form });
  form.message = "";
};

const getInitials = (name?: string) => {
  if (!name) return "✦";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0];
  const second = parts[1];
  if (first && second) {
    return (first.charAt(0) + second.charAt(0)).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

onMounted(() => {
  if (!rsvpSection.value) return;

  if (headerRef.value) {
    gsap.fromTo(
      headerRef.value,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rsvpSection.value,
          start: "top 80%",
        },
      }
    );
  }

  if (formCardRef.value) {
    gsap.fromTo(
      formCardRef.value,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formCardRef.value,
          start: "top 85%",
        },
      }
    );
  }

  if (wishesRef.value) {
    gsap.fromTo(
      wishesRef.value,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wishesRef.value,
          start: "top 85%",
        },
      }
    );
  }
});
</script>
