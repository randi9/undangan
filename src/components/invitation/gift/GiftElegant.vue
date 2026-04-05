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
    
    <div class="flex flex-col items-center gap-6">
      <div
        v-for="(bank, index) in bankList"
        :key="index"
        class="inline-block p-8 md:p-12 bg-white rounded-3xl shadow-sm border border-[var(--theme-secondary)]/20"
      >
        <div class="font-bold text-xl text-[var(--theme-primary)] mb-2 tracking-wide uppercase">{{ bank.bank_name }}</div>
        <div class="text-3xl md:text-4xl font-bold tracking-widest text-gray-800 mb-2 font-mono">{{ bank.bank_account }}</div>
        <div class="text-sm text-gray-500 mb-8 uppercase tracking-widest">A.N. {{ bank.bank_holder }}</div>
        <button @click="copyAccount(index)" class="px-8 py-3 rounded-full border-2 border-[var(--theme-primary)] text-[var(--theme-primary)] font-semibold hover:bg-[var(--theme-primary)] hover:text-white transition-all w-full md:w-auto">
          {{ copiedIndex === index ? '✅ Tersalin!' : '📋 Salin Nomor Rekening' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
