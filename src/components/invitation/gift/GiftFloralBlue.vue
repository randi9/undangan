<template>
  <section ref="sectionRef" v-if="bankList.length > 0" style="position: relative; padding: 50px 0 220px; max-width: 100%; overflow: hidden; margin: 0 auto; text-align: center; z-index: 10;">
    
    <div style="position: absolute; top: 100px; bottom: 100px; left: 50%; width: 150vw; transform: translateX(-50%); background-color: rgba(204, 225, 245, 0.6); border-radius: 50%; z-index: -1;"></div>
    
    <!-- Top Decorations -->
    <img src="https://media.mengundanganda.com/tema%20floral/rsvp/sashkeh_d151064b-d520-429e-b5c9-32b7276bf585.webp" style="position: absolute; top: 120px; left: -20px; transform: scaleX(-1); width: clamp(120px, 25vw, 250px); pointer-events: none; z-index: 3; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.15)) hue-rotate(180deg) saturate(0.5) brightness(1.1);" class="gift-fb-decor" alt="" />
    <img src="https://media.mengundanganda.com/tema%20floral/rsvp/sashkeh_d151064b-d520-429e-b5c9-32b7276bf585.webp" style="position: absolute; top: 120px; right: -20px; width: clamp(120px, 25vw, 250px); pointer-events: none; z-index: 3; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.15)) hue-rotate(180deg) saturate(0.5) brightness(1.1);" class="gift-fb-decor" alt="" />
    <img src="https://media.mengundanganda.com/tema%20floral/rsvp/sashkeh_48c178dd-6258-42fd-9ac9-b76b30ef3f76.webp" style="position: absolute; top: 80px; left: 80px; transform: scaleX(-1); width: clamp(120px, 25vw, 250px); pointer-events: none; z-index: 4; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.15)) hue-rotate(180deg) saturate(0.5) brightness(1.1);" class="gift-fb-decor" alt="" />
    <img src="https://media.mengundanganda.com/tema%20floral/rsvp/sashkeh_48c178dd-6258-42fd-9ac9-b76b30ef3f76.webp" style="position: absolute; top: 80px; right: 80px; width: clamp(120px, 25vw, 250px); pointer-events: none; z-index: 4; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.15)) hue-rotate(180deg) saturate(0.5) brightness(1.1);" class="gift-fb-decor" alt="" />
    <img src="https://media.mengundanganda.com/tema%20floral/rsvp/sashkeh_ce378e24-3552-41ff-b345-5776c2cfa1ff.webp" style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); width: clamp(200px, 30vw, 300px); pointer-events: none; z-index: 5; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.15)) hue-rotate(180deg) saturate(0.5) brightness(1.1);" class="gift-fb-decor" alt="" />
         
    <!-- Bottom Decorations -->
    <img src="https://media.mengundanganda.com/tema%20floral/rsvp/sashkeh_d151064b-d520-429e-b5c9-32b7276bf585.webp" style="position: absolute; bottom: 120px; left: -20px; transform: scaleX(-1) scaleY(-1); width: clamp(120px, 25vw, 250px); pointer-events: none; z-index: 3; filter: drop-shadow(0 -4px 10px rgba(0,0,0,0.15)) hue-rotate(180deg) saturate(0.5) brightness(1.1);" class="gift-fb-decor" alt="" />
    <img src="https://media.mengundanganda.com/tema%20floral/rsvp/sashkeh_d151064b-d520-429e-b5c9-32b7276bf585.webp" style="position: absolute; bottom: 120px; right: -20px; transform: scaleY(-1); width: clamp(120px, 25vw, 250px); pointer-events: none; z-index: 3; filter: drop-shadow(0 -4px 10px rgba(0,0,0,0.15)) hue-rotate(180deg) saturate(0.5) brightness(1.1);" class="gift-fb-decor" alt="" />
    <img src="https://media.mengundanganda.com/tema%20floral/rsvp/sashkeh_48c178dd-6258-42fd-9ac9-b76b30ef3f76.webp" style="position: absolute; bottom: 80px; left: 80px; transform: scaleX(-1) scaleY(-1); width: clamp(120px, 25vw, 250px); pointer-events: none; z-index: 4; filter: drop-shadow(0 -4px 10px rgba(0,0,0,0.15)) hue-rotate(180deg) saturate(0.5) brightness(1.1);" class="gift-fb-decor" alt="" />
    <img src="https://media.mengundanganda.com/tema%20floral/rsvp/sashkeh_48c178dd-6258-42fd-9ac9-b76b30ef3f76.webp" style="position: absolute; bottom: 80px; right: 80px; transform: scaleY(-1); width: clamp(120px, 25vw, 250px); pointer-events: none; z-index: 4; filter: drop-shadow(0 -4px 10px rgba(0,0,0,0.15)) hue-rotate(180deg) saturate(0.5) brightness(1.1);" class="gift-fb-decor" alt="" />
    <img src="https://media.mengundanganda.com/tema%20floral/rsvp/sashkeh_ce378e24-3552-41ff-b345-5776c2cfa1ff.webp" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%) scaleY(-1); width: clamp(200px, 30vw, 300px); pointer-events: none; z-index: 5; filter: drop-shadow(0 -4px 10px rgba(0,0,0,0.15)) hue-rotate(180deg) saturate(0.5) brightness(1.1);" class="gift-fb-decor" alt="" />
    
    <div style="max-width: 1024px; margin: 0 auto; padding: 0 24px; position: relative;">
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 64px; position: relative;">
      <h2 style="font-size: clamp(36px, 6vw, 60px); margin-bottom: 16px; color: var(--theme-primary); position: relative; z-index: 10; margin-top: 140px; letter-spacing: 0.025em; text-shadow: 0 1px 2px rgba(0,0,0,0.05);" :style="{ fontFamily: themeConfig.fontHeading }">Wedding Gift</h2>
      <p style="color: var(--theme-text-light); font-size: clamp(14px, 3vw, 16px); margin-top: 8px; max-width: 512px; margin-left: auto; margin-right: auto; line-height: 1.625;">
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun, apabila Anda ingin memberikan tanda kasih, kami menyediakan amplop digital di bawah ini.
      </p>
    </div>
    
    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 32px; align-items: stretch;">
      <div v-for="(bank, index) in bankList" :key="index" style="flex: 1; min-width: 300px; max-width: 400px; display: flex; flex-direction: column; align-items: center; gap: 24px;">
        <div style="width: 100%; aspect-ratio: 1.58; background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(232, 238, 244, 0.85) 100%); padding: 24px; border-radius: 16px; box-shadow: 0 12px 36px -8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,1); border: 1px solid rgba(255,255,255,0.6); position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; text-align: left; backdrop-filter: blur(8px); z-index: 10;">
          <img src="https://media.mengundanganda.com/tema%20floral/couple%20section/cf584d49-6790-4bb8-971f-89cdc91c6e00.webp" style="position: absolute; top: -20px; right: -20px; width: 140px; opacity: 0.15; transform: rotate(15deg); pointer-events: none; z-index: 0; filter: hue-rotate(180deg) saturate(0.5);" />
          <img src="https://media.mengundanganda.com/tema%20floral/couple%20section/38c7b2f4-88da-4e1c-9457-5b84781baea5.webp" style="position: absolute; bottom: -20px; left: -20px; width: 140px; opacity: 0.15; pointer-events: none; z-index: 0; filter: hue-rotate(180deg) saturate(0.5);" />
          <div style="display: flex; justify-content: space-between; align-items: flex-start; z-index: 1;">
            <div style="width: 44px; height: 32px; background: linear-gradient(135deg, #7ab3d4 0%, #4a7c9b 100%); border-radius: 6px; position: relative; overflow: hidden; box-shadow: inset 0 1px 3px rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.1);">
              <div style="position: absolute; top: 0; bottom: 0; left: 12px; width: 1px; background: rgba(0,0,0,0.15);"></div>
              <div style="position: absolute; top: 0; bottom: 0; right: 12px; width: 1px; background: rgba(0,0,0,0.15);"></div>
              <div style="position: absolute; top: 10px; left: 0; right: 0; height: 1px; background: rgba(0,0,0,0.15);"></div>
              <div style="position: absolute; bottom: 10px; left: 0; right: 0; height: 1px; background: rgba(0,0,0,0.15);"></div>
              <div style="position: absolute; top: 10px; bottom: 10px; left: 12px; right: 12px; border: 1px solid rgba(0,0,0,0.15); border-radius: 2px;"></div>
            </div>
            <div style="font-weight: 800; font-size: 20px; color: var(--theme-primary); letter-spacing: 0.05em; text-transform: uppercase;">{{ bank.bank_name }}</div>
          </div>
          <div style="z-index: 1; margin-top: auto; margin-bottom: 24px;">
            <div style="font-size: clamp(22px, 5vw, 26px); font-weight: 700; letter-spacing: 0.15em; color: #1f2937; font-family: 'Courier New', Courier, monospace; display: flex; align-items: center; gap: 12px; position: relative;">
              {{ bank.bank_account }}
              <button @click="copyAccount(index)" title="Salin Nomor" style="background: rgba(255,255,255,0.5); border: none; cursor: pointer; color: #374151; display: flex; align-items: center; justify-content: center; padding: 6px; border-radius: 8px; transition: all 0.2s;">
                <Icon :icon="copiedIndex === index ? 'lucide:check-circle-2' : 'lucide:copy'" style="font-size: 20px; color: var(--theme-primary);" />
              </button>
            </div>
            <div v-if="copiedIndex === index" style="font-size: 11px; color: var(--theme-primary); font-weight: 700; margin-top: 6px; position: absolute; text-transform: uppercase; letter-spacing: 0.05em;">Tersalin!</div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: flex-end; z-index: 1;">
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 10px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">A.N. Rekening</span>
              <span style="font-size: 14px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 0.05em; line-height: 1.2;">{{ bank.bank_holder }}</span>
            </div>
            <div style="display: flex; opacity: 0.7; align-items: center;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #4a7c9b; mix-blend-mode: multiply;"></div>
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #7ab3d4; mix-blend-mode: multiply; margin-left: -14px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation, BankAccount } from '@/types/invitation';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{ invitation: Invitation; themeConfig: ThemeConfig; }>();
const copiedIndex = ref<number | null>(null);
const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  if (!sectionRef.value) return;
  ctx = gsap.context(() => {
    gsap.from('.gift-fb-decor', { scale: 0, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'back.out(1.5)', scrollTrigger: { trigger: sectionRef.value, start: 'top 75%' } });
  }, sectionRef.value);
});
onUnmounted(() => { ctx?.revert(); });

const bankList = computed<BankAccount[]>(() => {
  if (props.invitation.banks && Array.isArray(props.invitation.banks) && props.invitation.banks.length > 0) return props.invitation.banks.filter(b => b.bank_name || b.bank_account);
  if (props.invitation.bank_name) return [{ bank_name: props.invitation.bank_name, bank_account: props.invitation.bank_account, bank_holder: props.invitation.bank_holder }];
  return [{ bank_name: 'BCA', bank_account: '1234567890', bank_holder: 'Nama Mempelai Pria' }, { bank_name: 'Mandiri', bank_account: '0987654321', bank_holder: 'Nama Mempelai Wanita' }];
});

function copyAccount(index: number) {
  const bank = bankList.value[index]; if (!bank?.bank_account) return;
  navigator.clipboard.writeText(bank.bank_account);
  copiedIndex.value = index;
  setTimeout(() => { copiedIndex.value = null; }, 2000);
}
</script>
