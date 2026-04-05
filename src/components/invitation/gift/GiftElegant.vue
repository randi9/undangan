<template>
  <section v-if="bankList.length > 0" class="py-24 px-6 text-center bg-[var(--theme-surface)]">
    <h2 class="text-3xl md:text-4xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">Wedding Gift</h2>
    <div class="flex items-center justify-center gap-4 mb-8 text-[var(--theme-secondary)]">
      <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
      <span class="text-xl">🎁</span>
      <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
    </div>
    
    <p class="text-[var(--theme-text-light)] max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
      Doa restu Anda merupakan karunia yang sangat berarti bagi kami.<br />
      Namun, apabila Anda ingin memberikan tanda kasih, kami menyediakan amplop digital di bawah ini.
    </p>
    
    <div class="flex flex-col items-center gap-12 w-full">
      <div
        v-for="(bank, index) in bankList"
        :key="index"
        class="flex flex-col items-center gap-6 w-full max-w-[400px]"
      >
        <!-- Debit Card Concept (Elegant) -->
        <div class="w-full aspect-[1.58] bg-gradient-to-br from-white/95 to-[#faf9f6]/90 p-6 rounded-2xl shadow-xl border border-white/60 relative overflow-hidden flex flex-col justify-between text-left backdrop-blur-md">
          
          <!-- Elegant Pattern Decor -->
          <div class="absolute -right-12 -top-12 w-48 h-48 border-[1px] border-[var(--theme-secondary)]/10 rounded-full"></div>
          <div class="absolute -right-6 -top-6 w-32 h-32 border-[1px] border-[var(--theme-secondary)]/10 rounded-full"></div>

          <!-- Top Row: Chip and Bank Name -->
          <div class="flex justify-between items-start z-10">
            <!-- Chip -->
            <div class="w-10 h-7 bg-gradient-to-br from-[#e5c875] to-[#d4af37] rounded-md relative overflow-hidden shadow-inner border border-black/10">
              <div class="absolute inset-y-0 left-3 w-px bg-black/15"></div>
              <div class="absolute inset-y-0 right-3 w-px bg-black/15"></div>
              <div class="absolute inset-x-0 top-2.5 h-px bg-black/15"></div>
              <div class="absolute inset-x-0 bottom-2.5 h-px bg-black/15"></div>
              <div class="absolute inset-y-2.5 inset-x-3 border border-black/15 rounded-sm"></div>
            </div>
            
            <div class="font-bold text-xl text-[var(--theme-primary)] tracking-widest uppercase">
              {{ bank.bank_name }}
            </div>
          </div>
          
          <!-- Middle: Account Number -->
          <div class="z-10 mt-auto mb-6 relative">
            <div class="text-[clamp(22px,5vw,26px)] font-bold tracking-[0.15em] text-gray-800 font-mono drop-shadow-sm flex items-center gap-3">
              {{ bank.bank_account }}
              <button @click="copyAccount(index)" title="Salin Nomor" class="bg-white/50 border border-black/10 text-gray-700 p-1.5 rounded-lg hover:bg-white/80 transition-all backdrop-blur-sm shadow-sm flex items-center justify-center">
                <Icon :icon="copiedIndex === index ? 'lucide:check-circle-2' : 'lucide:copy'" class="text-[20px] text-[var(--theme-primary)]" />
              </button>
            </div>
            <div v-if="copiedIndex === index" class="absolute mt-1.5 text-[11px] font-bold text-[var(--theme-primary)] uppercase tracking-wider">Tersalin!</div>
          </div>
          
          <!-- Bottom Row: Card Holder & Rings -->
          <div class="flex justify-between items-end z-10">
            <div class="flex flex-col">
              <span class="text-[10px] text-gray-500 font-medium uppercase tracking-widest mb-1">A.N. Rekening</span>
              <span class="text-sm font-bold text-gray-800 uppercase tracking-widest leading-tight">
                {{ bank.bank_holder }}
              </span>
            </div>
            <!-- Debit Card Rings Mock -->
            <div class="flex opacity-70 items-center">
              <div class="w-8 h-8 rounded-full bg-red-400 mix-blend-multiply"></div>
              <div class="w-8 h-8 rounded-full bg-amber-400 mix-blend-multiply -ml-3.5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, computed } from 'vue';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation, BankAccount } from '@/types/invitation';

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const copiedIndex = ref<number | null>(null);

const bankList = computed<BankAccount[]>(() => {
  if (props.invitation.banks && Array.isArray(props.invitation.banks) && props.invitation.banks.length > 0) {
    return props.invitation.banks.filter(b => b.bank_name || b.bank_account);
  }
  // Fallback to legacy single bank fields
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
</script>
