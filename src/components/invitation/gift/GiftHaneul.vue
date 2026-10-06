<template>
  <section
    v-if="hasGiftInfo"
    ref="giftSection"
    class="relative min-h-[70dvh] w-full flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-8 box-border overflow-hidden"
    :style="{
      background: '#F4EDE0',
      fontFamily: themeConfig?.fontBody || `'Plus Jakarta Sans', sans-serif`,
    }"
  >
    <!-- Background Decor Elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute top-1/4 -left-20 w-80 h-80 bg-[#CDE0F2]/45 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#A7C7E7]/35 rounded-full blur-3xl"></div>
      <div class="absolute top-16 right-16 text-[#D4AF37] text-base opacity-40">✦</div>
      <div class="absolute bottom-16 left-16 text-[#D4AF37] text-lg opacity-40">✧</div>
    </div>

    <div class="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center">
      <!-- Section Header -->
      <div ref="headerRef" class="mb-12 max-w-lg mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/70 shadow-xs mb-3">
          <span class="text-[#D4AF37] text-xs">✦</span>
          <span class="text-xs uppercase tracking-[0.3em] text-[#386B99] font-bold">
            Wedding Gift
          </span>
          <span class="text-[#D4AF37] text-xs">✦</span>
        </div>
        <h2
          class="text-3xl sm:text-4xl md:text-5xl text-[#1E354D] font-semibold tracking-tight leading-tight"
          :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
        >
          Tanda Kasih
        </h2>
        <div class="w-16 h-1 bg-gradient-to-r from-transparent via-[#7DA8CC] to-transparent mx-auto mt-4 mb-4"></div>
        <p class="text-xs sm:text-sm text-[#5B7B99] leading-relaxed">
          Doa restu Anda adalah hadiah terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih berupa amplop digital atau kado fisik, kami sertakan informasi berikut:
        </p>
      </div>

      <!-- Bank Cards Grid -->
      <div
        v-if="bankList.length > 0"
        ref="cardsRef"
        class="w-full flex flex-wrap justify-center gap-5 sm:gap-6 mb-8"
      >
        <div
          v-for="(b, idx) in bankList"
          :key="idx"
          class="w-full max-w-[340px] p-6 rounded-3xl bg-gradient-to-br from-white/90 via-white/80 to-[#E3EEF8]/80 backdrop-blur-xl border border-white/90 shadow-[0_12px_35px_rgba(44,74,111,0.08)] flex flex-col items-start text-left relative overflow-hidden transition-all duration-300 hover:shadow-[0_16px_40px_rgba(44,74,111,0.14)] hover:-translate-y-1"
        >
          <!-- Celestial Watermark Accent -->
          <div class="absolute -right-6 -bottom-6 text-[#A7C7E7]/25 text-7xl pointer-events-none select-none">
            ✦
          </div>

          <!-- Top Row: Chip & Bank Name -->
          <div class="w-full flex items-center justify-between mb-4">
            <!-- Simulated Card Chip -->
            <div class="w-9 h-6 rounded-md bg-gradient-to-tr from-[#E2C285] to-[#D4AF37] flex items-center justify-center shadow-xs">
              <div class="w-6 h-4 border border-amber-900/30 rounded-xs"></div>
            </div>

            <!-- Bank Badge -->
            <span class="px-3 py-1 rounded-full bg-[#386B99]/10 text-[#386B99] text-xs font-bold uppercase tracking-wider">
              {{ b.bank_name }}
            </span>
          </div>

          <!-- Account Number -->
          <span class="text-[10px] uppercase tracking-wider text-[#7DA8CC] font-semibold mb-0.5">
            Nomor Rekening
          </span>
          <p class="text-lg sm:text-xl font-mono font-bold text-[#1E354D] tracking-wider mb-2">
            {{ formatCardNumber(b.bank_account) }}
          </p>

          <!-- Account Holder -->
          <span class="text-[10px] uppercase tracking-wider text-[#7DA8CC] font-semibold mb-0.5">
            Atas Nama
          </span>
          <p class="text-xs sm:text-sm font-semibold text-[#2C4A6F] mb-4">
            {{ b.bank_holder || '-' }}
          </p>

          <!-- Copy Button -->
          <button
            @click="copyText(b.bank_account, `bank-${idx}`)"
            class="w-full py-2.5 px-4 rounded-xl bg-white/90 border border-[#CDE0F2] text-[#1E354D] text-xs font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-[#386B99] hover:text-white hover:border-[#386B99] transition-all duration-200 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>{{ copiedId === `bank-${idx}` ? 'Tersalin ke Clipboard!' : 'Salin Nomor Rekening' }}</span>
          </button>
        </div>
      </div>

      <!-- Physical Gift Delivery Address -->
      <div
        v-if="invitation.gift_address"
        ref="addressRef"
        class="w-full max-w-lg p-6 sm:p-7 rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_12px_35px_rgba(44,74,111,0.08)] flex flex-col items-center text-center"
      >
        <div class="w-10 h-10 rounded-full bg-[#E3EFF9] text-[#386B99] flex items-center justify-center mb-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h4
          class="text-lg font-bold tracking-tight text-[#1E354D] mb-1"
          :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
        >
          Kirim Hadiah Fisik
        </h4>
        <p class="text-xs text-[#5B7B99] leading-relaxed max-w-md mb-3 whitespace-pre-line">
          {{ invitation.gift_address }}
        </p>
        <div v-if="invitation.gift_recipient || invitation.gift_phone" class="text-xs text-[#7DA8CC] mb-4 flex flex-wrap justify-center gap-x-4">
          <span v-if="invitation.gift_recipient">Penerima: <strong class="text-[#1E354D]">{{ invitation.gift_recipient }}</strong></span>
          <span v-if="invitation.gift_phone">No. HP: <strong class="text-[#1E354D]">{{ invitation.gift_phone }}</strong></span>
        </div>
        <button
          @click="copyText(invitation.gift_address, 'gift-addr')"
          class="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white border border-[#CDE0F2] text-[#1E354D] text-xs font-semibold hover:bg-[#386B99] hover:text-white hover:border-[#386B99] transition-all duration-200 cursor-pointer shadow-xs"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>{{ copiedId === 'gift-addr' ? 'Alamat Tersalin!' : 'Salin Alamat Pengiriman' }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Invitation, BankAccount } from "@/types/invitation";
import type { ThemeConfig } from "@/types/theme";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig?: ThemeConfig;
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
    return [
      {
        bank_name: props.invitation.bank_name,
        bank_account: props.invitation.bank_account,
        bank_holder: props.invitation.bank_holder || "",
      },
    ];
  }
  return [];
});

const hasGiftInfo = computed(() => {
  return bankList.value.length > 0 || Boolean(props.invitation.gift_address);
});

const formatCardNumber = (account: string) => {
  if (!account) return "";
  const clean = account.replace(/\s+/g, "");
  const matches = clean.match(/.{1,4}/g);
  return matches ? matches.join(" ") : clean;
};

const copyText = (text: string, id: string) => {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    copiedId.value = id;
    setTimeout(() => {
      if (copiedId.value === id) copiedId.value = null;
    }, 2500);
  });
};

onMounted(() => {
  if (!giftSection.value) return;

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
          trigger: giftSection.value,
          start: "top 80%",
        },
      }
    );
  }

  if (cardsRef.value) {
    gsap.fromTo(
      cardsRef.value.children,
      { opacity: 0, y: 35, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: cardsRef.value,
          start: "top 85%",
        },
      }
    );
  }

  if (addressRef.value) {
    gsap.fromTo(
      addressRef.value,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: addressRef.value,
          start: "top 85%",
        },
      }
    );
  }
});
</script>
