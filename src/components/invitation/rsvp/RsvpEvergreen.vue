<template>
  <section
    ref="rsvpSection"
    style="
      position: relative;
      min-height: 100dvh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 16px;
      box-sizing: border-box;
      background: transparent;
      overflow: hidden;
    "
  >
    <div style="width: 100%; max-width: 580px; margin: 0 auto; position: relative; z-index: 10; box-sizing: border-box;">
      <!-- Section Header -->
      <div 
        ref="headerRef" 
        style="
          opacity: 0;
          transform: translateY(24px);
          text-align: center;
          margin-bottom: 28px;
          box-sizing: border-box;
        "
      >
        <span 
          style="
            display: block;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.25em;
            color: #5C7367;
            margin-bottom: 8px;
            box-sizing: border-box;
          "
        >
          Konfirmasi & Ucapan
        </span>
        <h2 
          style="
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: clamp(32px, 5vw, 44px);
            font-weight: 500;
            color: #2D3E35;
            line-height: 1.2;
            margin: 0;
            box-sizing: border-box;
          "
        >
          RSVP & Buku Tamu
        </h2>
        <div style="width: 48px; height: 1.5px; background-color: #7A9A8B; margin: 16px auto 0 auto; box-sizing: border-box;"></div>
      </div>

      <!-- ========== ASSET ATAS FORM (GW) ========== -->
      <!-- ^^ NGOTAK-NGATIK: posisi & ukuran cuma di div di bawah ini (yang ada ref="assetRef") ^^ -->
      <div
        ref="assetRef"
        style="
          opacity: 0;               /* JANGAN DIHAPUS: biar munculnya bareng animasi form */
          transform: translateY(32px); /* JANGAN DIHAPUS: posisi awal buat slide-up */

          position: relative;
          z-index: 2;               /* naikkan kalau mau asset di DEPAN form, turunkan ke 0 kalau mau di belakang */
          width: 390px;             /* >>> UBAT UKURAN DI SINI (contoh: '280px', '500px') */
          max-width: none;

          /* ====== PUSATKAN SECARA HORIZONTAL (aman di semua device) ====== */
          /* left 50% + margin-left negatif setengah lebar = selalu di tengah layar. */
          /* PENTING: jika 'width' diubah, sesuaikan margin-left = -(lebar/2). */
          /* Pakai margin (bukan translateX) agar tidak bertabrakan dgn animasi GSAP (y). */
          left: 50%;
          margin-left: -195px;      /* = -390px / 2 (setengah dari width di atas) */

          margin-bottom: -100px;     /* >>> UBAT JARAK / NAIK-TURUN KE FORM DI SINI: negatif = tumpang tindih ke atas form */
          pointer-events: none;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/rsvp/dewirandi_cace218a-32ed-40b6-af79-9e24061c1988.webp"
          alt="RSVP Asset Top"
          style="
            width: 100%;
            height: auto;
            display: block;
            opacity: 1;             /* UBAT TRANSPARANSI DI SINI (0.0 - 1.0) */
          "
        />
      </div>
      <!-- ========== /ASSET ATAS FORM ========== -->

      <!-- Form Container -->
      <div 
        ref="formRef" 
        style="
          opacity: 0;
          transform: translateY(32px);
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          /* Setengah oval bagian atas */
          border-radius: 50% 50% 24px 24px / 160px 160px 24px 24px;
          padding: 110px 22px 42px 22px;
          border: 1px solid rgba(139, 158, 139, 0.25);
          box-shadow: 0 12px 40px rgba(45, 62, 53, 0.08);
          margin-bottom: 48px;
          box-sizing: border-box;
        "
      >
        <form @submit.prevent="submitForm" style="display: flex; flex-direction: column; gap: 14px; box-sizing: border-box;">
          <!-- Guest Name Input -->
          <div style="display: flex; flex-direction: column; gap: 6px; width: 100%; box-sizing: border-box; align-items: stretch;">
            <label style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #5C7367; font-weight: 600; box-sizing: border-box; text-align: left;">Nama Lengkap</label>
            <input
              v-model="form.guest_name"
              type="text"
              required
              placeholder="Masukkan nama Anda"
              style="
                width: 100%;
                padding: 10px 14px;
                border-radius: 12px;
                background-color: #F2F5F3;
                border: 1px solid rgba(139, 158, 139, 0.3);
                color: #2D3E35;
                font-size: 13px;
                font-family: inherit;
                box-sizing: border-box;
                outline: none;
                transition: all 0.3s;
              "
            />
          </div>

          <!-- Attendance Status -->
          <div style="display: flex; flex-direction: column; gap: 6px; width: 100%; box-sizing: border-box; align-items: stretch;">
            <label style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #5C7367; font-weight: 600; box-sizing: border-box; text-align: left;">Konfirmasi Kehadiran</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; box-sizing: border-box;">
              <button
                type="button"
                @click="form.attendance = 'hadir'"
                :style="{
                  padding: '10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box',
                  backgroundColor: form.attendance === 'hadir' ? '#4A6B5B' : '#F2F5F3',
                  color: form.attendance === 'hadir' ? '#ffffff' : '#5C7367',
                  borderColor: form.attendance === 'hadir' ? '#4A6B5B' : 'rgba(139, 158, 139, 0.3)',
                  boxShadow: form.attendance === 'hadir' ? '0 4px 12px rgba(74, 107, 91, 0.15)' : 'none'
                }"
              >
                <svg style="width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
                Hadir
              </button>
              
              <button
                type="button"
                @click="form.attendance = 'tidak_hadir'"
                :style="{
                  padding: '10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box',
                  backgroundColor: form.attendance === 'tidak_hadir' ? '#7A9A8B' : '#F2F5F3',
                  color: form.attendance === 'tidak_hadir' ? '#ffffff' : '#5C7367',
                  borderColor: form.attendance === 'tidak_hadir' ? '#7A9A8B' : 'rgba(139, 158, 139, 0.3)',
                  boxShadow: form.attendance === 'tidak_hadir' ? '0 4px 12px rgba(122, 154, 139, 0.15)' : 'none'
                }"
              >
                <svg style="width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Tidak Hadir
              </button>
            </div>
          </div>

          <!-- Guest Count -->
          <div v-if="form.attendance === 'hadir'" style="display: flex; flex-direction: column; gap: 6px; width: 100%; box-sizing: border-box; align-items: stretch;">
            <label style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #5C7367; font-weight: 600; box-sizing: border-box; text-align: left;">Jumlah Tamu</label>
            <div style="position: relative; width: 100%; box-sizing: border-box;">
              <select
                v-model.number="form.guest_count"
                style="
                  width: 100%;
                  padding: 14px 18px;
                  border-radius: 16px;
                  background-color: #F2F5F3;
                  border: 1px solid rgba(139, 158, 139, 0.3);
                  color: #2D3E35;
                  font-size: 14px;
                  font-family: inherit;
                  box-sizing: border-box;
                  outline: none;
                  appearance: none;
                  -webkit-appearance: none;
                  -moz-appearance: none;
                  cursor: pointer;
                  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%235C7367%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
                  background-repeat: no-repeat;
                  background-position: right 14px center;
                  background-size: 12px auto;
                "
              >
                <option :value="1">1 Orang</option>
                <option :value="2">2 Orang</option>
                <option :value="3">3 Orang</option>
                <option :value="4">4+ Orang</option>
              </select>
            </div>
          </div>

          <!-- Wish Message -->
          <div style="display: flex; flex-direction: column; gap: 6px; width: 100%; box-sizing: border-box; align-items: stretch;">
            <label style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #5C7367; font-weight: 600; box-sizing: border-box; text-align: left;">Ucapan &amp; Doa</label>
            <textarea
              v-model="form.message"
              rows="3"
              placeholder="Tuliskan pesan ucapan & doa untuk mempelai..."
              style="
                width: 100%;
                padding: 10px 14px;
                border-radius: 12px;
                background-color: #F2F5F3;
                border: 1px solid rgba(139, 158, 139, 0.3);
                color: #2D3E35;
                font-size: 13px;
                font-family: inherit;
                box-sizing: border-box;
                outline: none;
                resize: none;
              "
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="submitting"
            style="
              width: 100%;
              padding: 12px;
              border-radius: 9999px;
              background-color: #4A6B5B;
              border: none;
              color: #ffffff;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.15em;
              cursor: pointer;
              transition: all 0.3s;
              box-shadow: 0 6px 20px rgba(74, 107, 91, 0.25);
              box-sizing: border-box;
              margin-top: 8px;
            "
          >
            {{ submitting ? 'Mengirim...' : 'Kirim Konfirmasi & Ucapan' }}
          </button>
        </form>
      </div>

      <!-- Messages List (Ucapan & Doa) : container setengah oval bagian bawah -->
      <div
        v-if="rsvpMessages && rsvpMessages.length > 0"
        ref="messagesRef"
        style="
          opacity: 0;
          transform: translateY(24px);
          box-sizing: border-box;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(139, 158, 139, 0.25);
          box-shadow: 0 12px 40px rgba(45, 62, 53, 0.08);
          /* Setengah oval bagian bawah */
          border-radius: 24px 24px 50% 50% / 24px 24px 160px 160px;
          padding: 42px 22px 110px 22px;
        "
      >
        <h3 
          style="
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 24px;
            font-weight: 600;
            color: #2D3E35;
            margin-bottom: 18px;
            text-align: center;
          "
        >
          Ucapan &amp; Doa Restu ({{ rsvpMessages.length }})
        </h3>
        
        <div
          class="wish-scroll"
          style="
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-height: 360px;
            overflow-y: auto;
            padding-right: 6px;
            box-sizing: border-box;
          "
        >
          <div
            v-for="(rsvp, idx) in rsvpMessages"
            :key="idx"
            style="
              background: rgba(255, 255, 255, 0.75);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              border-radius: 14px;
              padding: 14px;
              border: 1px solid rgba(139, 158, 139, 0.2);
              text-align: left;
              box-sizing: border-box;
            "
          >
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; box-sizing: border-box;">
              <div style="display: flex; align-items: center; gap: 8px; box-sizing: border-box;">
                <span style="font-weight: 600; font-size: 14px; color: #2D3E35;">{{ rsvp.guest_name }}</span>
                <span
                  :style="{
                    padding: '2px 10px',
                    borderRadius: '9999px',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backgroundColor: rsvp.attendance === 'hadir' ? '#E3ECE5' : '#F1F3F2',
                    color: rsvp.attendance === 'hadir' ? '#4A6B5B' : '#7A8C82'
                  }"
                >
                  {{ rsvp.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir' }}
                </span>
              </div>
              <span v-if="rsvp.created_at" style="font-size: 10px; color: #7A9A8B;">
                {{ formatDate(rsvp.created_at) }}
              </span>
            </div>
            <p style="font-size: 12.5px; color: #5C7367; line-height: 1.6; margin: 0; white-space: pre-line;">
              {{ rsvp.message }}
            </p>
          </div>
        </div>
      </div>

      <!-- ========== ASSET BAWAH SECTION UCAPAN & DOA (GW) ========== -->
      <!-- ^^ NGOTAK-NGATIK: posisi & ukuran cuma di div di bawah ini (yang ada ref="assetBottomRef") ^^ -->
      <div
        ref="assetBottomRef"
        style="
          opacity: 0;                  /* JANGAN DIHAPUS: biar munculnya bareng animasi daftar ucapan */
          transform: translateY(32px); /* JANGAN DIHAPUS: posisi awal buat slide-up */

          position: relative;
          z-index: 2;               /* naikkan kalau mau asset di DEPAN, turunkan ke 0 kalau mau di belakang */
          width: 390px;             /* >>> UBAT UKURAN DI SINI (contoh: '280px', '500px') */
          max-width: none;

          /* ====== PUSATKAN SECARA HORIZONTAL (aman di semua device) ====== */
          /* left 50% + margin-left negatif setengah lebar = selalu di tengah layar. */
          /* PENTING: jika 'width' diubah, sesuaikan margin-left = -(lebar/2). */
          /* Pakai margin (bukan translateX) agar tidak bertabrakan dgn animasi GSAP (y). */
          left: 50%;
          margin-left: -195px;      /* = -390px / 2 (setengah dari width di atas) */

          margin-top: -100px;       /* >>> UBAT JARAK / NAIK-TURUN KE SECTION UCAPAN DI SINI: negatif = tumpang tindih ke atas */
          pointer-events: none;
          user-select: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/rsvp/dewirandi_cace218a-32ed-40b6-af79-9e24061c1988.webp"
          alt="RSVP Asset Bottom"
          style="
            width: 100%;
            height: auto;
            display: block;
            transform: scaleY(-1);    /* FLIP terhadap sumbu X (atas-bawah jadi terbalik) */
            opacity: 1;               /* UBAT TRANSPARANSI DI SINI (0.0 - 1.0) */
          "
        />
      </div>
      <!-- ========== /ASSET BAWAH SECTION UCAPAN & DOA ========== -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
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
const assetRef = ref<HTMLElement | null>(null);
const formRef = ref<HTMLElement | null>(null);
const messagesRef = ref<HTMLElement | null>(null);
const assetBottomRef = ref<HTMLElement | null>(null);

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

// Daftar ucapan punya v-if (hanya ada saat sudah ada pesan),
// jadi elemennya bisa null saat onMounted -> GSAP akan crash
// ("Cannot read properties of null (reading '_gsap')") kalau
// target null ikut dikirim. Selalu filter target null.
const animateMessagesGroup = (tl?: ReturnType<typeof gsap.timeline>) => {
  const targets = [messagesRef.value, assetBottomRef.value].filter(Boolean);
  if (targets.length === 0) return false;
  const vars = { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' };
  if (tl) {
    tl.to(targets, vars, '-=0.8');
  } else {
    gsap.to(targets, vars);
  }
  return true;
};

// Sudah dianimasikan saat mount? Kalau belum (belum ada pesan),
// animasikan saat pesan pertama kali muncul.
let messagesAnimated = false;

onMounted(() => {
  if (!rsvpSection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: rsvpSection.value,
      start: 'top 80%', // Mulai animasi saat bagian atas section memasuki layar (80% viewport height)
      toggleActions: 'play none none none',
    }
  });

  const headerTargets = [headerRef.value].filter(Boolean);
  if (headerTargets.length) {
    tl.to(headerTargets, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out'
    });
  }

  const formTargets = [assetRef.value, formRef.value].filter(Boolean);
  if (formTargets.length) {
    tl.to(formTargets, {
      // Asset atas form & container oval: muncul bareng, sama-sama slide-up
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out'
    }, '-=0.8'); // Tumpang tindih agar langsung berurutan tanpa jeda kosong
  }

  // Hanya masuk timeline kalau elemennya memang sudah ter-render
  if (animateMessagesGroup(tl)) {
    messagesAnimated = true;
  }
});

// Pesan baru masuk setelah mount (misal tamu pertama yang RSVP) ->
// nextTick agar elemen v-if ter-render dulu, baru di-animate.
watch(
  () => props.rsvpMessages?.length ?? 0,
  async (len) => {
    if (len > 0 && !messagesAnimated) {
      messagesAnimated = true;
      await nextTick();
      animateMessagesGroup();
    }
  }
);

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>

<style scoped>
/* Scrollbar minimalis utk list ucapan & doa:
   tersembunyi secara default (tetap bisa di-scroll/swipe),
   hanya muncul garis tipis saat area di-hover. */
.wish-scroll {
  scrollbar-width: none;            /* Firefox */
  -ms-overflow-style: none;         /* IE/legacy Edge */
  overscroll-behavior: contain;
}
.wish-scroll::-webkit-scrollbar {
  width: 0;
  height: 0;
  background: transparent;
}
.wish-scroll:hover {
  scrollbar-width: thin;
  scrollbar-color: rgba(122, 154, 139, 0.45) transparent;
}
.wish-scroll:hover::-webkit-scrollbar {
  width: 3px;
}
.wish-scroll:hover::-webkit-scrollbar-track {
  background: transparent;
}
.wish-scroll:hover::-webkit-scrollbar-thumb {
  background-color: rgba(122, 154, 139, 0.35);
  border-radius: 9999px;
}
.wish-scroll:hover::-webkit-scrollbar-thumb:hover {
  background-color: rgba(74, 107, 91, 0.55);
}
</style>
