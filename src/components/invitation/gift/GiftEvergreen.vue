<template>
  <section 
    v-if="hasGiftInfo" 
    ref="giftSection" 
    class="relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-12 md:py-20 px-4 md:px-8 overflow-hidden box-border bg-transparent"
    style="margin-top: 0px;"
  >
    <div class="w-full max-w-3xl mx-auto relative z-10 text-center my-auto">
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
          Tanda Kasih
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
          Amplop Digital &amp; Hadiah
        </h2>
        <div style="width: 48px; height: 1.5px; background-color: #7A9A8B; margin: 16px auto 0 auto; box-sizing: border-box;"></div>
      </div>

      <!-- Bank Cards Grid -->
      <div
        v-if="bankList.length > 0"
        ref="cardsRef"
        style="
          opacity: 0;
          transform: translateY(32px);
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          margin-bottom: 32px;
          box-sizing: border-box;
          width: 100%;
        "
      >
        <div
          v-for="(bank, idx) in bankList"
          :key="idx"
          style="
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(243, 247, 244, 1) 100%);
            border-radius: 20px;
            padding: 20px;
            border: 1px solid rgba(139, 158, 139, 0.3);
            box-shadow: 0 12px 30px rgba(20, 35, 27, 0.12), 0 18px 28px -8px rgba(20, 35, 27, 0.35);
            opacity: 0.8;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: stretch;
            text-align: left;
            box-sizing: border-box;
            width: 100%;
            max-width: 320px;
            aspect-ratio: 1.58 / 1;
            position: relative;
            overflow: hidden;
            margin: 0 auto;
          "
        >
          <!-- Shiny Card Overlay pattern -->
          <div style="position: absolute; inset: 0; background: radial-gradient(circle at 80% 20%, rgba(122, 154, 139, 0.12) 0%, transparent 60%); pointer-events: none;"></div>

          <!-- Decorative image bottom-right -->
          <img
            src="https://media.mengundanganda.com/evergreen/footer%20section/dewirandi_c1ae26f8-0e0a-432a-913e-04ca949b6b83.webp"
            alt=""
            style="position: absolute; right: -15px; bottom: -15px; width: 350px; height: auto; object-fit: contain; opacity: 0.3; pointer-events: none; z-index: 1;"
          />
          
          <!-- Top Row: Chip & Bank Name -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%; position: relative; z-index: 2;">
            <!-- ATM Chip -->
            <div style="width: 38px; height: 28px; background: linear-gradient(135deg, #e5c060 0%, #b28522 100%); border-radius: 6px; position: relative; overflow: hidden; box-shadow: inset 0 1px 2px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.15);">
              <div style="position: absolute; top: 0; bottom: 0; left: 33%; width: 1px; background: rgba(0,0,0,0.15);"></div>
              <div style="position: absolute; top: 0; bottom: 0; right: 33%; width: 1px; background: rgba(0,0,0,0.15);"></div>
              <div style="position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: rgba(0,0,0,0.15);"></div>
            </div>
            
            <!-- Bank Brand/Name -->
            <h4 style="font-size: 15px; font-weight: 700; color: #2D3E35; text-transform: uppercase; letter-spacing: 0.08em; margin: 0; font-family: sans-serif;">
              {{ bank.bank_name }}
            </h4>
          </div>

          <!-- Middle Row: Card Number -->
          <div style="margin-top: 14px; position: relative; z-index: 2;">
            <p style="font-size: 18px; font-family: 'Courier New', Courier, monospace; font-weight: 700; color: #2D3E35; letter-spacing: 0.1em; margin: 0; word-break: break-all;">
              {{ formatCardNumber(bank.bank_account) }}
            </p>
          </div>

          <!-- Bottom Row: Holder Name & Action Button -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; width: 100%; margin-top: auto; position: relative; z-index: 2;">
            <div style="display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 8px; text-transform: uppercase; letter-spacing: 0.1em; color: #7A9A8B;">Cardholder</span>
              <span style="font-size: 12px; font-weight: 600; color: #2D3E35; text-transform: uppercase; letter-spacing: 0.05em; font-family: sans-serif;">
                {{ bank.bank_holder }}
              </span>
            </div>

            <!-- Copy Button nested inside card style -->
            <button
              @click="copyText(bank.bank_account, `rek-${idx}`)"
              style="
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 5px;
                padding: 6px 14px;
                border-radius: 9999px;
                background-color: #E3ECE5;
                color: #2D3E35;
                border: 1px solid rgba(139, 158, 139, 0.3);
                font-size: 9px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                cursor: pointer;
                transition: all 0.3s;
                box-sizing: border-box;
                backdrop-filter: blur(4px);
              "
              onmouseenter="this.style.backgroundColor='#D3E2D7';"
              onmouseleave="this.style.backgroundColor='#E3ECE5';"
            >
              <svg style="width: 11px; height: 11px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              <span>{{ copiedId === `rek-${idx}` ? 'Tersalin' : 'Salin' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Physical Gift Address Box -->
      <div 
        v-if="invitation.gift_address" 
        ref="addressRef"
        style="
          opacity: 0.8;
          transform: translateY(24px);
          width: 100%;
          max-width: 320px;
          aspect-ratio: 1.58 / 1;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 14px 16px;
          border: 1px solid rgba(139, 158, 139, 0.3);
          box-shadow: 0 8px 25px rgba(45, 62, 53, 0.06), 0 18px 28px -8px rgba(45, 62, 53, 0.35);
          text-align: center;
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
        "
      >
        <!-- Decorative image bottom-center -->
        <img
          src="https://media.mengundanganda.com/evergreen/footer%20section/dewirandi_73b661aa-b32d-4bf7-bbea-f83a61a5dfb2.webp"
          alt=""
          style="position: absolute; left: 0; bottom: 0; width: 100%; height: auto; object-fit: contain; opacity: 0.3; pointer-events: none; z-index: -1;"
        />

        <div
          style="
            width: 32px;
            height: 32px;
            border-radius: 10px;
            background-color: #E3ECE5;
            color: #4A6B5B;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 8px auto;
            box-sizing: border-box;
          "
        >
          <svg style="width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
        </div>

        <h4 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 14px; font-weight: 600; color: #2D3E35; margin: 0 0 4px 0; box-sizing: border-box;">
          Kirim Hadiah Fisik
        </h4>
        <p style="font-size: 10.5px; color: #5C7367; line-height: 1.45; margin: 0 0 6px 0; white-space: pre-line; box-sizing: border-box;">
          {{ invitation.gift_address }}
        </p>

        <div v-if="invitation.gift_recipient || invitation.gift_phone" style="font-size: 9.5px; color: #7A9A8B; margin-bottom: 8px; box-sizing: border-box;">
          <p v-if="invitation.gift_recipient" style="margin: 2px 0; box-sizing: border-box;">Penerima: <strong style="color: #2D3E35;">{{ invitation.gift_recipient }}</strong></p>
          <p v-if="invitation.gift_phone" style="margin: 2px 0; box-sizing: border-box;">No. HP: <strong style="color: #2D3E35;">{{ invitation.gift_phone }}</strong></p>
        </div>

        <button
          @click="copyText(invitation.gift_address, 'gift-addr')"
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            padding: 6px 14px;
            border-radius: 9999px;
            background-color: #E3ECE5;
            color: #2D3E35;
            border: none;
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            cursor: pointer;
            transition: all 0.3s;
            box-sizing: border-box;
          "
        >
          <svg style="width: 11px; height: 11px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
          <span>{{ copiedId === 'gift-addr' ? 'Tersalin' : 'Salin Alamat' }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Invitation, BankAccount } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const giftSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement | null>(null);
const addressRef = ref<HTMLElement | null>(null);
const copiedId = ref<string | null>(null);

const bankList = computed<BankAccount[]>(() => {
  if (props.invitation.banks && props.invitation.banks.length > 0) {
    return props.invitation.banks;
  }
  if (props.invitation.bank_name && props.invitation.bank_account) {
    return [{
      bank_name: props.invitation.bank_name,
      bank_account: props.invitation.bank_account,
      bank_holder: props.invitation.bank_holder || '',
    }];
  }
  return [];
});

const hasGiftInfo = computed(() => {
  return bankList.value.length > 0 || Boolean(props.invitation.gift_address);
});

const formatCardNumber = (account: string) => {
  if (!account) return '';
  const clean = account.replace(/\s+/g, '');
  const matches = clean.match(/.{1,4}/g);
  return matches ? matches.join(' ') : clean;
};

const copyText = (text: string, id: string) => {
  navigator.clipboard.writeText(text);
  copiedId.value = id;
  setTimeout(() => {
    copiedId.value = null;
  }, 2500);
};

onMounted(() => {
  if (!giftSection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: giftSection.value,
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
  .to(cardsRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out'
  }, "-=0.6")
  .to(addressRef.value, {
    opacity: 0.8,
    y: 0,
    duration: 1.0,
    ease: 'power3.out'
  }, "-=0.6");
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
