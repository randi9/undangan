<template>
  <section ref="sectionRef" v-if="bankList.length > 0" style="position: relative; padding: 10px 0 100px; max-width: 100%; overflow: hidden; margin: 0 auto; text-align: center; z-index: 10;">
    
    <!-- Background removed for transparent effect -->
    

    <div style="max-width: 1024px; margin: 0 auto; padding: 0 24px; position: relative;">
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 64px; position: relative;">
      <h2 style="font-size: clamp(56px, 10vw, 90px); font-weight: 800; margin-bottom: 16px; color: var(--theme-primary); position: relative; z-index: 10; margin-top: -10px; letter-spacing: 0.025em; text-shadow: 0 1px 2px rgba(0,0,0,0.05);" :style="{ fontFamily: themeConfig.fontHeading }">Wedding Gift</h2>
      <p style="color: var(--theme-text-light); font-size: clamp(14px, 3vw, 16px); margin-top: 8px; max-width: 512px; margin-left: auto; margin-right: auto; line-height: 1.625;">
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun, apabila Anda ingin memberikan tanda kasih, kami menyediakan amplop digital di bawah ini.
      </p>
    </div>
    
    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 32px; align-items: stretch;">
      <div v-for="(bank, index) in bankList" :key="index" style="flex: 1; min-width: 300px; max-width: 400px; display: flex; flex-direction: column; align-items: center; gap: 24px;">
        <div style="width: 100%; aspect-ratio: 1.58; padding: 24px; position: relative; display: flex; flex-direction: column; justify-content: space-between; text-align: left; z-index: 10; background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.6); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05); border-radius: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; z-index: 1;">
            <div style="width: 44px; height: 32px; background: linear-gradient(135deg, #e5b05c 0%, #c89b3c 100%); border-radius: 6px; position: relative; overflow: hidden; box-shadow: inset 0 1px 3px rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.2);">
              <div style="position: absolute; top: 0; bottom: 0; left: 12px; width: 1px; background: rgba(0,0,0,0.15);"></div>
              <div style="position: absolute; top: 0; bottom: 0; right: 12px; width: 1px; background: rgba(0,0,0,0.15);"></div>
              <div style="position: absolute; top: 10px; left: 0; right: 0; height: 1px; background: rgba(0,0,0,0.15);"></div>
              <div style="position: absolute; bottom: 10px; left: 0; right: 0; height: 1px; background: rgba(0,0,0,0.15);"></div>
              <div style="position: absolute; top: 10px; bottom: 10px; left: 12px; right: 12px; border: 1px solid rgba(0,0,0,0.15); border-radius: 2px;"></div>
            </div>
            <div style="font-weight: 800; font-size: 20px; color: var(--theme-primary); letter-spacing: 0.05em; text-transform: uppercase;">{{ bank.bank_name }}</div>
          </div>
          <div style="z-index: 1; margin-top: auto; margin-bottom: 24px; width: 100%;">
            <div style="font-size: clamp(22px, 5vw, 26px); font-weight: 700; letter-spacing: 0.15em; color: #1f2937; font-family: 'Courier New', Courier, monospace; display: flex; align-items: center; justify-content: space-between; gap: 12px; position: relative; width: 100%;">
              <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;">{{ bank.bank_account }}</span>
              <button @click="copyAccount(index)" title="Salin Nomor" style="flex-shrink: 0; background: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.5); cursor: pointer; color: #374151; display: flex; align-items: center; justify-content: center; padding: 8px; border-radius: 8px; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
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
            <div style="display: flex; opacity: 0.85; align-items: center;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #eb001b; mix-blend-mode: multiply;"></div>
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #f79e1b; mix-blend-mode: multiply; margin-left: -14px;"></div>
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
