<template>
  <section v-if="bankList.length > 0" ref="giftSection" class="py-24 px-6 text-center relative overflow-hidden bg-white/50">
    <!-- Minimalist BG Decor -->
    <div class="absolute inset-x-0 bottom-0 top-auto h-96 bg-gradient-to-t from-gray-50 to-transparent -z-10"></div>
    
    <div ref="headerRef" class="opacity-0 translate-y-6 mb-12">
      <h2 class="text-3xl md:text-5xl font-light tracking-wide text-gray-800 mb-4" :style="{ fontFamily: themeConfig.fontHeading }">Wedding Gift</h2>
      <div class="flex items-center justify-center gap-4 text-gray-300">
        <div class="h-[1px] w-8 bg-gray-300"></div>
        <div class="w-1.5 h-1.5 border border-gray-300 transform rotate-45"></div>
        <div class="h-[1px] w-8 bg-gray-300"></div>
      </div>
    </div>
    
    <p ref="descRef" class="text-gray-500 max-w-xl mx-auto mb-16 text-sm md:text-base leading-relaxed font-light opacity-0 translate-y-4">
      Doa restu Anda merupakan karunia yang sangat berarti bagi kami.<br />
      Namun, apabila Anda ingin memberikan tanda kasih, kami menyediakan amplop digital di bawah ini.
    </p>
    
    <div class="flex flex-col items-center gap-12 w-full relative z-10">
      <div
        v-for="(bank, index) in bankList"
        :key="index"
        :ref="el => { if (el) cardsRef[index] = el as HTMLElement }"
        class="flex flex-col items-center gap-6 w-full max-w-[420px] opacity-0 translate-y-12"
      >
        <!-- Sleek Light Wallet Card Concept (Minimalist) -->
        <div class="w-full aspect-[1.58] bg-white p-7 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 relative overflow-hidden flex flex-col justify-between text-left group hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
          
          <!-- Background Abstract Line Accent -->
          <svg class="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0,100 C30,40 70,60 100,0" stroke="black" stroke-width="2" fill="none" />
             <path d="M0,80 C40,20 80,40 100,-20" stroke="black" stroke-width="1" fill="none" />
          </svg>
          
          <!-- Top Row: Minimal Chip and Bank Name -->
          <div class="flex justify-between items-center z-10">
            <!-- Sleek minimal chip -->
            <div class="w-10 h-7 bg-gray-50 rounded bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300/50 relative overflow-hidden">
               <div class="absolute top-1/2 left-0 w-full h-[1px] bg-gray-300"></div>
               <div class="absolute top-0 left-1/2 h-full w-[1px] bg-gray-300"></div>
            </div>
            
            <div class="font-bold text-lg text-gray-800 tracking-widest uppercase">
              {{ bank.bank_name }}
            </div>
          </div>
          
          <!-- Middle: Account Number -->
          <div class="z-10 mt-auto mb-8 relative">
            <div class="text-[clamp(1.2rem,5vw,1.8rem)] font-light tracking-[0.15em] text-gray-700 font-mono flex items-center gap-4">
              {{ bank.bank_account }}
              <button @click="copyAccount(index)" title="Salin Nomor" class="bg-gray-50 border border-gray-200 text-gray-600 p-2.5 rounded-full hover:bg-gray-100 transition-all flex items-center justify-center group-hover:bg-gray-900 group-hover:border-gray-900 group-hover:text-white">
                <Icon :icon="copiedIndex === index ? 'lucide:check' : 'lucide:copy'" class="text-[18px]" />
              </button>
            </div>
            <div class="absolute -bottom-6 left-0 text-[9px] font-bold text-green-600 uppercase tracking-widest transition-opacity duration-300" :class="copiedIndex === index ? 'opacity-100' : 'opacity-0'">Nomor tersalin!</div>
          </div>
          
          <!-- Bottom Row: Card Holder & Decorative Circles -->
          <div class="flex justify-between items-end z-10">
            <div class="flex flex-col">
              <span class="text-[9px] text-gray-400 font-semibold uppercase tracking-widest mb-1">A.N. Rekening</span>
              <span class="text-sm font-semibold text-gray-800 uppercase tracking-widest leading-tight">
                {{ bank.bank_holder }}
              </span>
            </div>
            <!-- Minimal Circles Mock -->
            <div class="flex opacity-50 items-center">
              <div class="w-7 h-7 rounded-full bg-gray-200 mix-blend-multiply"></div>
              <div class="w-7 h-7 rounded-full bg-gray-300 mix-blend-multiply -ml-3"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation, BankAccount } from '@/types/invitation';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const copiedIndex = ref<number | null>(null);
const giftSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const descRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement[]>([]);

const bankList = computed<BankAccount[]>(() => {
  if (props.invitation.banks && Array.isArray(props.invitation.banks) && props.invitation.banks.length > 0) {
    return props.invitation.banks.filter(b => b.bank_name || b.bank_account);
  }
  if (props.invitation.bank_name) {
    return [{ bank_name: props.invitation.bank_name, bank_account: props.invitation.bank_account, bank_holder: props.invitation.bank_holder }];
  }
  return [];
});

function copyAccount(index: number) {
  const bank = bankList.value[index];
  if (!bank?.bank_account) return;
  navigator.clipboard.writeText(bank.bank_account);
  copiedIndex.value = index;
  setTimeout(() => {
    copiedIndex.value = null;
  }, 2000);
}

onMounted(() => {
  if (!giftSection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: giftSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(headerRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
    .to(descRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6")
    .to(cardsRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2 }, "-=0.4");
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
