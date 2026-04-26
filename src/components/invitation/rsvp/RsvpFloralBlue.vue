<template>
  <section style="position: relative; max-width: 100%; margin: 0 auto; text-align: center; z-index: 10; overflow: hidden; background-color: transparent;">
    
    <div ref="rsvpWrapper" style="position: relative; padding: 48px 24px 100px; max-width: 1024px; margin: 0 auto; z-index: 10;">

    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 64px; position: relative;">
      <h2 style="font-size: clamp(36px, 6vw, 60px); font-weight: bold; margin-bottom: 16px; color: var(--theme-primary); position: relative; z-index: 10; margin-top: 70px; letter-spacing: 0.025em; text-shadow: 0 1px 2px rgba(0,0,0,0.05);" :style="{ fontFamily: themeConfig.fontHeading }">RSVP</h2>
      <p style="color: var(--theme-text-light); font-size: clamp(14px, 3vw, 16px); margin-top: 8px; max-width: 512px; margin-left: auto; margin-right: auto; line-height: 1.625;">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir di acara pernikahan kami.
      </p>
    </div>
    
    <div style="display: flex; flex-wrap: wrap; gap: 32px; text-align: left; align-items: stretch; justify-content: center;">
      <!-- Input Form -->
      <div style="flex: 1; min-width: min(100%, 350px); padding: 0; position: relative; display: flex; flex-direction: column; justify-content: center;">
        
        <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 24px; margin-top: 0; color: var(--theme-primary); display: flex; align-items: center; gap: 12px; position: relative; z-index: 10;" :style="{ fontFamily: themeConfig.fontHeading }">Konfirmasi Kehadiran</h3>
        
        <form @submit.prevent="onSubmit" style="display: flex; flex-direction: column; gap: 20px; position: relative; z-index: 10; margin: 0;">
          <div>
            <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 6px; color: #374151;">Nama Lengkap</label>
            <input v-model="form.guest_name" type="text" placeholder="Masukkan nama Anda" required class="custom-input" style="width: 100%; padding: 14px 16px; border-radius: 16px; border: 1px solid rgba(0,0,0,0.1); background-color: rgba(255,255,255,0.7); outline: none; transition: all 0.3s; font-size: 15px; box-sizing: border-box;" />
          </div>
          <div>
            <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 6px; color: #374151;">Apakah Anda akan hadir?</label>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <button type="button" @click="form.attendance = 'hadir'" :style="form.attendance === 'hadir' ? 'border-color: var(--theme-primary); background-color: var(--theme-primary); color: white; transform: scale(1.02); box-shadow: 0 4px 12px rgba(0,0,0,0.1);' : 'border-color: rgba(0,0,0,0.1); background-color: transparent; color: #4b5563;'" style="flex: 1; padding: 14px 16px; border-radius: 16px; border-width: 1px; border-style: solid; transition: all 0.3s; display: flex; justify-content: center; align-items: center; gap: 8px; font-weight: 500; cursor: pointer; min-width: 120px;">Hadir</button>
              <button type="button" @click="form.attendance = 'tidak_hadir'" :style="form.attendance === 'tidak_hadir' ? 'border-color: #f87171; background-color: #fef2f2; color: #dc2626; transform: scale(1.02);' : 'border-color: rgba(0,0,0,0.1); background-color: transparent; color: #4b5563;'" style="flex: 1; padding: 14px 16px; border-radius: 16px; border-width: 1px; border-style: solid; transition: all 0.3s; display: flex; justify-content: center; align-items: center; gap: 8px; font-weight: 500; cursor: pointer; min-width: 120px;">Tidak Hadir</button>
            </div>
          </div>
          <div v-show="form.attendance === 'hadir'" :style="form.attendance === 'hadir' ? 'transform: scaleY(1); opacity: 1; height: auto;' : 'transform: scaleY(0); opacity: 0; height: 0; overflow: hidden;'" style="transform-origin: top; transition: all 0.3s ease-out;">
            <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 6px; color: #374151;">Jumlah Tamu</label>
            <div style="display: flex; align-items: center; justify-content: space-between; border-radius: 16px; border: 1px solid rgba(0,0,0,0.1); background-color: rgba(255,255,255,0.7); overflow: hidden;">
              <button type="button" @click="form.guest_count = Math.max(1, form.guest_count - 1)" style="width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; font-size: 20px; color: #4b5563; background: transparent; border: none; cursor: pointer;">−</button>
              <div style="flex: 1; display: flex; justify-content: center; align-items: center;">
                <input v-model.number="form.guest_count" type="number" min="1" max="10" class="no-spin" style="width: 40px; text-align: center; border: none; background: transparent; font-size: 16px; font-weight: 600; outline: none; -moz-appearance: textfield; appearance: textfield;" />
                <span style="color: #6b7280; font-size: 14px; font-weight: 500; margin-left: 4px;">Orang</span>
              </div>
              <button type="button" @click="form.guest_count = Math.min(10, form.guest_count + 1)" style="width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; font-size: 20px; color: #4b5563; background: transparent; border: none; cursor: pointer;">+</button>
            </div>
          </div>
          <div>
            <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 6px; color: #374151;">Ucapan &amp; Doa</label>
            <textarea v-model="form.message" rows="3" placeholder="Tulis doa untuk kedua mempelai" class="custom-input" style="width: 100%; padding: 14px 16px; border-radius: 16px; border: 1px solid rgba(0,0,0,0.1); background-color: rgba(255,255,255,0.7); outline: none; transition: all 0.3s; resize: vertical; font-size: 15px; box-sizing: border-box;"></textarea>
          </div>
          <div style="padding-top: 12px;">
            <button type="submit" :disabled="submitting" :style="submitting ? 'opacity: 0.7; cursor: not-allowed;' : 'cursor: pointer;'" style="width: 100%; padding: 16px; border-radius: 16px; background-color: var(--theme-primary); color: white; border: none; font-weight: 600; font-size: 18px; transition: all 0.3s; display: flex; justify-content: center; align-items: center; gap: 8px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); outline: none;">
              <span>{{ submitting ? 'Mengirim...' : 'Kirim Ucapan' }}</span>
            </button>
          </div>
        </form>
      </div>
      
      <!-- Messages -->
      <div style="flex: 1; min-width: min(100%, 350px); display: flex; flex-direction: column; height: 600px;">
        <div style="padding: 0; flex: 1; display: flex; flex-direction: column; height: 100%; position: relative; box-sizing: border-box;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; position: relative; z-index: 10;">
            <h3 style="font-size: 24px; font-weight: bold; margin: 0; color: var(--theme-primary);" :style="{ fontFamily: themeConfig.fontHeading }">Buku Tamu</h3>
            <span style="background-color: white; color: var(--theme-primary); box-shadow: 0 1px 2px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.05); padding: 6px 16px; border-radius: 9999px; font-size: 14px; font-weight: bold;">{{ rsvpMessages.length }} Pesan</span>
          </div>
          <div v-if="rsvpMessages.length === 0" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: #9ca3af; position: relative; z-index: 10;">
             <div style="width: 80px; height: 80px; border-radius: 50%; background-color: white; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); border: 1px solid #f3f4f6; margin-bottom: 8px;">
                <span style="font-size: 30px; opacity: 0.6;">💌</span>
             </div>
             <p style="font-weight: 500; color: var(--theme-text-light); margin: 0; line-height: 1.5;">Belum ada ucapan.<br/>Jadilah yang pertama untuk memberikan doa!</p>
          </div>
          <div v-else style="flex: 1; overflow-y: auto; padding-right: 12px; margin: 0; display: flex; flex-direction: column; gap: 16px; position: relative; z-index: 10; scroll-behavior: smooth;" class="custom-scroll">
            <div v-for="(msg, index) in rsvpMessages" :key="msg.id" style="padding: 20px; background-color: rgba(255,255,255,0.95); border-radius: 24px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.05); position: relative; display: block; box-sizing: border-box;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 14px;">
                  <div style="width: 44px; height: 44px; min-width: 44px; border-radius: 50%; background: linear-gradient(135deg, var(--theme-primary), #1a4364); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px;">
                    {{ msg.guest_name.charAt(0).toUpperCase() }}
                  </div>
                  <div style="display: flex; flex-direction: column;">
                    <h4 style="font-weight: bold; color: #1f2937; font-size: 16px; line-height: 1.2; margin: 0;">{{ msg.guest_name }}</h4>
                    <span style="font-size: 12px; font-weight: 600; margin-top: 4px; display: inline-flex; align-items: center; gap: 6px;" :style="msg.attendance === 'hadir' ? 'color: var(--theme-primary);' : 'color: #6b7280;'">
                      <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%;" :style="msg.attendance === 'hadir' ? 'background-color: var(--theme-primary);' : 'background-color: #9ca3af;'"></span>
                      {{ msg.attendance === 'hadir' ? 'Akan Hadir' : 'Berhalangan' }}
                      <span v-if="msg.attendance === 'hadir' && msg.guest_count > 1" style="color: #9ca3af; font-weight: 500; margin-left: 4px;">({{ msg.guest_count }} orang)</span>
                    </span>
                  </div>
                </div>
              </div>
              <p style="font-size: 14px; color: #4b5563; line-height: 1.6; margin: 12px 0 0 0; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.03); white-space: pre-wrap;">{{ msg.message }}</p>
              <div v-if="msg.reply_text" style="background-color: rgba(74, 124, 155, 0.05); padding: 12px 16px; border-radius: 12px; margin-top: 12px; border-left: 3px solid var(--theme-primary);">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; color: var(--theme-primary); margin-bottom: 4px;">Balasan Mempelai</div>
                <p style="font-size: 13px; color: #4b5563; margin: 0; line-height: 1.5; white-space: pre-wrap;">{{ msg.reply_text }}</p>
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
import { reactive, ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Rsvp } from '@/types/invitation';

gsap.registerPlugin(ScrollTrigger);

defineProps<{ rsvpMessages: Rsvp[]; themeConfig: ThemeConfig; submitting: boolean; }>();
const emit = defineEmits<{ (e: 'submitRsvp', form: { guest_name: string; attendance: 'hadir' | 'tidak_hadir'; guest_count: number; message: string }): void; }>();

const form = reactive({ guest_name: '', attendance: 'hadir' as 'hadir' | 'tidak_hadir', guest_count: 1, message: '' });
const rsvpWrapper = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  if (!rsvpWrapper.value) return;
  ctx = gsap.context(() => {
    gsap.from(rsvpWrapper.value, { y: 80, opacity: 0, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: rsvpWrapper.value, start: 'top 85%', toggleActions: 'play none none none' } });
  });
});
onUnmounted(() => { ctx?.revert(); });
function onSubmit() { emit('submitRsvp', { ...form }); }
</script>

<style scoped>
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
input[type="number"].no-spin::-webkit-outer-spin-button, input[type="number"].no-spin::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.custom-input:focus { border-color: var(--theme-primary) !important; box-shadow: 0 0 0 4px rgba(74, 124, 155, 0.1) !important; background-color: #ffffff !important; }
.custom-input::placeholder { color: #9ca3af; }
.custom-scroll { scrollbar-width: thin; scrollbar-color: rgba(74,124,155,0.3) transparent; }
.custom-scroll::-webkit-scrollbar { width: 6px; }
.custom-scroll::-webkit-scrollbar-track { background: transparent; }
.custom-scroll::-webkit-scrollbar-thumb { background-color: rgba(74, 124, 155, 0.3); border-radius: 10px; }
</style>
