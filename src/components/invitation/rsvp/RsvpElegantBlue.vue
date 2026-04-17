<template>
  <section ref="sectionRef" style="width: 100%; background-color: rgba(168, 208, 230, 0.45); display: flex; flex-direction: column; align-items: center; padding: 80px 20px 0 20px; overflow-x: hidden;">

    <!-- ==============================
         TOP ARCH — RSVP FORM
         ============================== -->
    <div ref="formArch" style="width: 100%; max-width: 380px; background-color: #041a33; border-radius: 190px 190px 0 0; padding: 160px 40px 60px 40px; display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; box-shadow: 0 20px 40px rgba(4,26,51,0.15);">

      <!-- Subtle texture -->
      <div style="position: absolute; inset: 0; opacity: 0.04; pointer-events: none; mix-blend-mode: screen; background-image: url('https://www.transparenttextures.com/patterns/stardust.png');"></div>

      <!-- Title -->
      <h2 style="position: relative; z-index: 2; color: #ffffff; font-size: 2rem; letter-spacing: 0.15em; font-weight: 300; margin-bottom: 8px; text-align: center;" :style="{ fontFamily: themeConfig.fontHeading }">Konfirmasi</h2>
      <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 10px; position: relative; z-index: 2;">
        <div style="height: 1px; width: 40px; background: rgba(255,255,255,0.3);"></div>
        <div style="width: 5px; height: 5px; transform: rotate(45deg); background: rgba(255,255,255,0.4);"></div>
        <div style="height: 1px; width: 40px; background: rgba(255,255,255,0.3);"></div>
      </div>
      <p style="position: relative; z-index: 2; color: rgba(255,255,255,0.6); font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 400; margin-bottom: 48px; text-align: center;">Kehadiran Anda sangat berarti bagi kami</p>

      <!-- Form -->
      <form @submit.prevent="onSubmit" style="width: 100%; max-width: 300px; position: relative; z-index: 2;">

        <!-- Nama -->
        <div class="form-field-wrapper" style="margin-bottom: 32px;">
          <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.2em; font-weight: 500; margin-bottom: 8px;">Nama Lengkap</label>
          <input v-model="form.guest_name" type="text" placeholder="Ketik nama Anda..." required
            style="width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.15); color: #ffffff; font-size: 0.9rem; padding: 8px 0; outline: none; font-weight: 300;" />
          <div class="animated-border" style="position: absolute; bottom: 0; left: 0; height: 1.5px; width: 100%; background: #ffffff; box-shadow: 0 0 10px rgba(255,255,255,0.3); z-index: 10; transform: scaleX(0); transform-origin: left center;"></div>
        </div>

        <!-- Kehadiran -->
        <div class="form-field-wrapper" style="margin-bottom: 32px;">
          <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.2em; font-weight: 500; margin-bottom: 12px; text-align: center;">Konfirmasi Kehadiran</label>
          <div style="display: flex; gap: 12px;">
            <button type="button" @click="form.attendance = 'hadir'"
              :style="{
                flex: 1, padding: '12px 8px', borderRadius: '50px', border: '1px solid', fontSize: '0.65rem', fontWeight: '600',
                textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s',
                background: form.attendance === 'hadir' ? 'rgba(255,255,255,0.15)' : 'transparent',
                borderColor: form.attendance === 'hadir' ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: form.attendance === 'hadir' ? '#ffffff' : 'rgba(255,255,255,0.5)',
                boxShadow: form.attendance === 'hadir' ? '0 0 15px rgba(255,255,255,0.2)' : 'none'
              }">Akan Hadir</button>
            <button type="button" @click="form.attendance = 'tidak_hadir'"
              :style="{
                flex: 1, padding: '12px 8px', borderRadius: '50px', border: '1px solid', fontSize: '0.65rem', fontWeight: '600',
                textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s',
                background: form.attendance === 'tidak_hadir' ? 'rgba(255,255,255,0.15)' : 'transparent',
                borderColor: form.attendance === 'tidak_hadir' ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: form.attendance === 'tidak_hadir' ? '#ffffff' : 'rgba(255,255,255,0.5)',
                boxShadow: form.attendance === 'tidak_hadir' ? '0 0 15px rgba(255,255,255,0.15)' : 'none'
              }">Berhalangan</button>
          </div>
        </div>

        <!-- Jumlah Tamu -->
        <div v-show="form.attendance === 'hadir'" class="form-field-wrapper" style="margin-bottom: 32px; transition: all 0.3s;">
          <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.2em; font-weight: 500; margin-bottom: 8px;">Jumlah Tamu</label>
          <select v-model.number="form.guest_count"
            style="width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.15); color: #ffffff; font-size: 0.9rem; padding: 8px 0; outline: none; font-weight: 300; appearance: none; cursor: pointer;">
            <option value="1" style="color: #000;">1 Orang</option>
            <option value="2" style="color: #000;">2 Orang</option>
            <option value="3" style="color: #000;">3 Orang</option>
            <option value="4" style="color: #000;">4 Orang</option>
            <option value="5" style="color: #000;">5+ Orang</option>
          </select>
          <div class="animated-border" style="position: absolute; bottom: 0; left: 0; height: 1.5px; width: 100%; background: #ffffff; box-shadow: 0 0 10px rgba(255,255,255,0.3); z-index: 10; transform: scaleX(0); transform-origin: left center;"></div>
        </div>

        <!-- Pesan -->
        <div class="form-field-wrapper" style="margin-bottom: 40px;">
          <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.2em; font-weight: 500; margin-bottom: 8px;">Pesan & Doa</label>
          <textarea v-model="form.message" rows="3" placeholder="Tuliskan ucapan terindah..."
            style="width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.15); color: #ffffff; font-size: 0.9rem; padding: 8px 0; outline: none; font-weight: 300; resize: none; line-height: 1.6; font-family: inherit;"></textarea>
          <div class="animated-border" style="position: absolute; bottom: 0; left: 0; height: 1.5px; width: 100%; background: #ffffff; box-shadow: 0 0 10px rgba(255,255,255,0.3); z-index: 10; transform: scaleX(0); transform-origin: left center;"></div>
        </div>

        <!-- Submit -->
        <div class="submit-wrapper" style="display: flex; justify-content: center;">
          <button type="submit" :disabled="submitting"
            style="position: relative; border: 1px solid rgba(255,255,255,0.4); background: rgba(255,255,255,0.08); color: #ffffff; padding: 14px 40px; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.2em; font-weight: 500; font-size: 0.65rem; cursor: pointer; transition: all 0.3s; backdrop-filter: blur(4px);">
            {{ submitting ? 'Mengirim...' : 'Kirim RSVP' }}
          </button>
        </div>

      </form>
    </div>

    <!-- ==============================
         MIDDLE BLOCK — BUKU TAMU
         ============================== -->
    <div ref="feedArch" style="width: 100%; max-width: 380px; background-color: #041a33; border-radius: 0; padding: 60px 40px 60px 40px; margin-top: 16px; display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; box-shadow: 0 20px 40px rgba(4,26,51,0.15);">

      <!-- Subtle texture -->
      <div style="position: absolute; inset: 0; opacity: 0.04; pointer-events: none; mix-blend-mode: screen; background-image: url('https://www.transparenttextures.com/patterns/stardust.png');"></div>

      <!-- Title -->
      <h3 style="position: relative; z-index: 2; color: #ffffff; font-size: 1.5rem; letter-spacing: 0.1em; font-weight: 300; margin-bottom: 32px; text-align: center;" :style="{ fontFamily: themeConfig.fontHeading }">
        Buku Tamu
        <span style="font-size: 0.65rem; letter-spacing: 0.15em; color: rgba(255,255,255,0.5); margin-left: 4px; font-family: sans-serif;">({{ rsvpMessages.length }})</span>
      </h3>

      <!-- Feed List -->
      <div class="feed-scroll" style="width: 100%; max-width: 300px; max-height: 400px; overflow-y: auto; position: relative; z-index: 2; padding-right: 8px;">

        <div v-for="msg in rsvpMessages" :key="msg.id" class="feed-item"
          style="margin-bottom: 20px; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.08); position: relative;">

          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; gap: 8px; flex-wrap: wrap;">
            <h4 style="color: #ffffff; font-size: 0.85rem; font-weight: 600; word-break: break-word; max-width: 100%;">{{ msg.guest_name }}</h4>
            <span
              :style="{
                fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '600', flexShrink: 0,
                color: msg.attendance === 'hadir' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
              }">{{ msg.attendance === 'hadir' ? 'Hadir' : 'Absen' }}</span>
          </div>

          <!-- Message -->
          <p style="color: rgba(255,255,255,0.7); font-size: 0.78rem; line-height: 1.7; font-style: italic; font-weight: 300; white-space: pre-wrap; word-break: break-word; margin: 0;">"{{ msg.message }}"</p>

          <!-- Reply -->
          <div v-if="msg.reply_text" style="margin-top: 12px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 0 8px 8px 8px; border-left: 2px solid rgba(255,255,255,0.2);">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
              <Icon icon="ph:paper-plane-right-duotone" style="width: 12px; height: 12px; color: rgba(255,255,255,0.6);" />
              <span style="font-size: 0.55rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.6);">Balasan Mempelai</span>
            </div>
            <p style="font-size: 0.75rem; color: rgba(255,255,255,0.85); font-weight: 300; white-space: pre-wrap; word-break: break-word; line-height: 1.6; margin: 0;">{{ msg.reply_text }}</p>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="rsvpMessages.length === 0" style="text-align: center; padding: 48px 0; color: rgba(255,255,255,0.3); font-size: 0.8rem; font-style: italic; font-weight: 300;">
          Belum ada ucapan. Jadilah yang pertama!
        </div>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Rsvp } from '@/types/invitation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  form.guest_name = '';
  form.message = '';
}

// GSAP Refs
const sectionRef = ref<HTMLElement | null>(null);
const formArch = ref<HTMLElement | null>(null);
const feedArch = ref<HTMLElement | null>(null);

let ctx: gsap.Context;

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    const animatedBorders = sectionRef.value!.querySelectorAll('.animated-border');
    const formFields = sectionRef.value!.querySelectorAll('.form-field-wrapper');
    const submitBtn = sectionRef.value!.querySelector('.submit-wrapper');
    const feedItems = sectionRef.value!.querySelectorAll('.feed-item');

    gsap.set(animatedBorders, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(formFields, { opacity: 0, y: 15 });
    gsap.set(submitBtn, { opacity: 0, y: 15 });

    // Form entrance
    const tlForm = gsap.timeline({
      scrollTrigger: {
        trigger: formArch.value,
        start: 'top 70%',
      }
    });

    tlForm.to(formFields, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out'
    })
    .to(animatedBorders, {
      scaleX: 1, duration: 1.2, stagger: 0.15, ease: 'expo.out'
    }, '-=0.6')
    .to(submitBtn, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out'
    }, '-=0.4');

    // Feed items stagger
    ScrollTrigger.batch(feedItems, {
      onEnter: (elements) => {
        gsap.fromTo(elements,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' }
        );
      },
      once: true
    });

  }, sectionRef.value!);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<style scoped>
/* Scrollbar — scoped style only for pseudo-element styling that can't be inline */
.feed-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.15) transparent;
}
.feed-scroll::-webkit-scrollbar {
  width: 3px;
}
.feed-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.feed-scroll::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.15);
  border-radius: 10px;
}
.feed-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0.3);
}
</style>
