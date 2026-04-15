<template>
  <section v-if="bankList.length > 0" ref="giftSection" class="py-24 px-6 text-center" :style="{ backgroundColor: 'var(--theme-surface)' }">
    <!-- Header -->
    <div ref="headerRef" class="opacity-0 translate-y-6 mb-12">
      <h2 class="text-3xl md:text-5xl mb-3" :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-primary)' }">Wedding Gift</h2>
      <div class="flex items-center justify-center gap-4 mb-4">
        <svg viewBox="0 0 60 2" class="w-10 md:w-14" style="opacity: 0.4;"><rect width="60" height="1" fill="var(--theme-secondary)"/></svg>
        <svg viewBox="0 0 24 24" class="w-4 h-4" style="opacity: 0.6;">
          <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" fill="var(--theme-secondary)"/>
        </svg>
        <svg viewBox="0 0 60 2" class="w-10 md:w-14" style="opacity: 0.4;"><rect width="60" height="1" fill="var(--theme-secondary)"/></svg>
      </div>
      <p class="max-w-xl mx-auto text-sm md:text-base leading-relaxed" :style="{ color: 'var(--theme-text-light)' }">
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami.<br />
        Namun, apabila Anda ingin memberikan tanda kasih, kami menyediakan amplop digital di bawah ini.
      </p>
    </div>
    
    <div class="flex flex-col items-center gap-10 w-full overflow-hidden px-2 py-4">
      <div
        v-for="(bank, index) in bankList"
        :key="index"
        :ref="el => { if (el) cardRefs[index] = el as HTMLElement }"
        class="flex flex-col items-center gap-6 w-full max-w-[400px] opacity-0 translate-y-12"
      >
        <!-- Debit Card Concept (Elegant Gold) -->
        <div class="group w-full aspect-[1.58] bg-gradient-to-br from-[#ffffff] to-[#fbfaf8] p-6 rounded-2xl shadow-xl border relative overflow-hidden flex flex-col justify-between text-left transition-transform duration-500 hover:scale-[1.03]"
             :style="{ borderColor: 'rgba(201,169,110,0.3)', boxShadow: '0 12px 30px rgba(139,111,78,0.1)' }">
          
          <!-- Moving Gold Shimmer (hover effect) -->
          <div class="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" 
               style="background: linear-gradient(105deg, transparent 20%, rgba(201,169,110,0.1) 25%, transparent 30%); background-size: 200% auto; animation: shine 3s infinite linear;"></div>

          <!-- Elegant Pattern Decor -->
          <div class="absolute -right-12 -top-12 w-48 h-48 border-[1.5px] rounded-full pointer-events-none" :style="{ borderColor: 'rgba(201,169,110,0.15)' }"></div>
          <div class="absolute -right-6 -top-6 w-32 h-32 border-[1.5px] rounded-full pointer-events-none" :style="{ borderColor: 'rgba(201,169,110,0.2)' }"></div>
          <div class="absolute -left-12 -bottom-12 w-40 h-40 border-[1px] rounded-full pointer-events-none" :style="{ borderColor: 'rgba(201,169,110,0.1)' }"></div>

          <!-- Top Row: Chip and Bank Name -->
          <div class="flex justify-between items-start z-10">
            <!-- EMV Chip -->
            <div class="w-11 h-8 rounded-md relative overflow-hidden shadow-sm border border-black/10"
                 :style="{ background: 'linear-gradient(135deg, #e5c875, #d4af37, #c9a96e)' }">
              <div class="absolute inset-y-0 left-3 w-px bg-black/10"></div>
              <div class="absolute inset-y-0 right-3 w-px bg-black/10"></div>
              <div class="absolute inset-x-0 top-3 h-px bg-black/10"></div>
              <div class="absolute inset-x-0 bottom-3 h-px bg-black/10"></div>
              <div class="absolute inset-y-2 inset-x-3.5 border border-black/10 rounded-sm"></div>
            </div>
            
            <div class="font-bold text-xl tracking-widest uppercase" :style="{ color: 'var(--theme-primary)' }">
              {{ bank.bank_name }}
            </div>
          </div>
          
          <!-- Middle: Account Number -->
          <div class="z-10 mt-auto mb-6 relative">
            <div class="text-[clamp(18px,5vw,24px)] font-bold tracking-[0.12em] font-mono drop-shadow-sm flex items-center gap-3" :style="{ color: 'var(--theme-text)' }">
              {{ bank.bank_account }}
              <button @click="copyAccount(index)" title="Salin Nomor" 
                      class="bg-white border text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center hover:scale-110 active:scale-95"
                      :style="{ borderColor: 'rgba(201,169,110,0.3)' }">
                <svg v-if="copiedIndex !== index" viewBox="0 0 24 24" class="w-4 h-4" :style="{ fill: 'var(--theme-secondary)' }">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" class="w-4 h-4 text-green-600 fill-current">
                   <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </button>
            </div>
            <div v-show="copiedIndex === index" class="absolute mt-1.5 text-[11px] font-bold uppercase tracking-wider text-green-600 animate-fade-in">Berhasil Disalin!</div>
          </div>
          
          <!-- Bottom Row: Card Holder & Rings -->
          <div class="flex justify-between items-end z-10">
            <div class="flex flex-col">
              <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">A.N. Rekening</span>
              <span class="text-sm md:text-base font-bold uppercase tracking-widest leading-tight" :style="{ color: 'var(--theme-primary)' }">
                {{ bank.bank_holder }}
              </span>
            </div>
            <!-- Debit Card Rings Mock -->
            <div class="flex opacity-50 items-center drop-shadow-sm">
              <div class="w-8 h-8 rounded-full mix-blend-multiply" :style="{ backgroundColor: 'var(--theme-secondary)' }"></div>
              <div class="w-8 h-8 rounded-full mix-blend-multiply -ml-4" :style="{ backgroundColor: '#cbd5e1' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation, BankAccount } from '@/types/invitation';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const giftSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const cardRefs = ref<HTMLElement[]>([]);

const copiedIndex = ref<number | null>(null);

const bankList = computed<BankAccount[]>(() => {
  if (props.invitation.banks && Array.isArray(props.invitation.banks) && props.invitation.banks.length > 0) {
    return props.invitation.banks.filter(b => b.bank_name || b.bank_account);
  }
  // Fallback
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
  }, 2500);
}

onMounted(() => {
  if (!giftSection.value) return;

  gsap.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: giftSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  if (cardRefs.value.length > 0) {
    ScrollTrigger.batch(cardRefs.value, {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2
        });
      },
      start: 'top 85%',
      once: true
    });
  }
});
</script>

<style scoped>
@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>
