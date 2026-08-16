<template>
  <section 
    v-if="hasGiftInfo" 
    ref="giftSection" 
    class="py-20 md:py-28 px-4 md:px-8 bg-[#F2F5F3] relative overflow-hidden"
  >
    <div class="max-w-3xl mx-auto relative z-10 text-center">
      <!-- Section Header -->
      <div ref="headerRef" class="opacity-0 translate-y-6 mb-14">
        <span class="text-xs uppercase tracking-[0.3em] text-[#5C7367] font-semibold block mb-2">Tanda Kasih</span>
        <h2 class="text-3xl md:text-5xl font-serif text-[#2D3E35] font-medium" style="font-family: 'Cormorant Garamond', Georgia, serif;">
          Amplop Digital &amp; Hadiah
        </h2>
        <div class="w-12 h-[1.5px] bg-[#7A9A8B] mx-auto mt-4"></div>
        <p class="text-xs md:text-sm text-[#5C7367] mt-4 max-w-lg mx-auto leading-relaxed">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih, Anda dapat menyalurkannya melalui:
        </p>
      </div>

      <!-- Bank Cards Grid -->
      <div v-if="bankList.length > 0" ref="cardsRef" class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 opacity-0 translate-y-8">
        <div
          v-for="(bank, idx) in bankList"
          :key="idx"
          class="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-[#8B9E8B]/30 shadow-[0_8px_25px_rgba(45,62,53,0.06)] flex flex-col justify-between items-center text-center"
        >
          <div>
            <div class="w-12 h-12 rounded-2xl bg-[#E3ECE5] text-[#4A6B5B] flex items-center justify-center mb-4 mx-auto">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            
            <h4 class="text-lg font-bold text-[#2D3E35] uppercase tracking-wider mb-1">{{ bank.bank_name }}</h4>
            <p class="text-xl font-mono font-bold text-[#4A6B5B] tracking-wider mb-1">{{ bank.bank_account }}</p>
            <p class="text-xs text-[#5C7367] mb-6">a.n {{ bank.bank_holder }}</p>
          </div>

          <button
            @click="copyText(bank.bank_account, `rek-${idx}`)"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E3ECE5] hover:bg-[#4A6B5B] text-[#2D3E35] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 w-full justify-center"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <span>{{ copiedId === `rek-${idx}` ? 'Tersalin!' : 'Salin No. Rekening' }}</span>
          </button>
        </div>
      </div>

      <!-- Physical Gift Address Box -->
      <div 
        v-if="invitation.gift_address" 
        ref="addressRef"
        class="opacity-0 translate-y-6 max-w-xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-[#8B9E8B]/30 shadow-[0_8px_25px_rgba(45,62,53,0.06)] text-center"
      >
        <div class="w-12 h-12 rounded-2xl bg-[#E3ECE5] text-[#4A6B5B] flex items-center justify-center mb-4 mx-auto">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
        </div>

        <h4 class="text-lg font-serif font-semibold text-[#2D3E35] mb-2" style="font-family: 'Cormorant Garamond', Georgia, serif;">
          Kirim Hadiah Fisik
        </h4>
        <p class="text-xs md:text-sm text-[#5C7367] leading-relaxed mb-4 whitespace-pre-line">
          {{ invitation.gift_address }}
        </p>

        <div v-if="invitation.gift_recipient || invitation.gift_phone" class="text-xs text-[#7A9A8B] mb-6">
          <p v-if="invitation.gift_recipient">Penerima: <strong class="text-[#2D3E35]">{{ invitation.gift_recipient }}</strong></p>
          <p v-if="invitation.gift_phone">No. HP: <strong class="text-[#2D3E35]">{{ invitation.gift_phone }}</strong></p>
        </div>

        <button
          @click="copyText(invitation.gift_address, 'gift-addr')"
          class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E3ECE5] hover:bg-[#4A6B5B] text-[#2D3E35] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
          <span>{{ copiedId === 'gift-addr' ? 'Tersalin!' : 'Salin Alamat Kirim' }}</span>
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
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'power3.out'
  }, "-=0.6");
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
