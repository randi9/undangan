<template>
  <section v-if="bankList.length > 0" style="padding: 0 24px 60px; background-color: #F5E6D0; text-align: center;">
    <h2 :style="{ fontFamily: themeConfig.fontHeading, color: '#5C3D2E', fontSize: '1.75rem', marginBottom: '8px' }">Wedding Gift</h2>
    <p style="font-size: 0.75rem; color: #8B6F5C; margin-bottom: 32px; max-width: 300px; margin-left: auto; margin-right: auto; line-height: 1.6;">
      Kehadiran dan doa restu Anda adalah hadiah terindah bagi kami.
    </p>

    <div style="max-width: 360px; margin: 0 auto;">
      <div v-for="(bank, index) in bankList" :key="index" style="background-color: #FFF8E7; border-radius: 8px; padding: 24px; margin-bottom: 16px; text-align: left;">
        <div style="font-size: 0.75rem; font-weight: 700; color: #8B6F5C; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">
          {{ bank.bank_name || 'Bank' }}
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <span style="font-size: 1.1rem; font-weight: 700; color: #5C3D2E; font-family: 'Courier New', monospace; letter-spacing: 0.1em;">{{ bank.bank_account }}</span>
          <button @click="copyAccount(index)" style="padding: 6px 12px; background-color: #5C3D2E; color: #FFF8E7; border: none; border-radius: 4px; font-size: 0.65rem; cursor: pointer; text-transform: uppercase; letter-spacing: 0.1em;">
            {{ copiedIndex === index ? 'Tersalin!' : 'Salin' }}
          </button>
        </div>
        <div style="font-size: 0.8rem; color: #8B6F5C;">
          a.n. <span style="font-weight: 600; color: #5C3D2E;">{{ bank.bank_holder }}</span>
        </div>
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
    return props.invitation.banks.filter((b: BankAccount) => b.bank_name || b.bank_account);
  }
  if (props.invitation.bank_name) {
    return [{
      bank_name: props.invitation.bank_name,
      bank_account: props.invitation.bank_account || '',
      bank_holder: props.invitation.bank_holder || ''
    }];
  }
  return [];
});

function copyAccount(index: number) {
  const bank = bankList.value[index];
  if (!bank?.bank_account) return;
  navigator.clipboard.writeText(bank.bank_account);
  copiedIndex.value = index;
  setTimeout(() => { copiedIndex.value = null; }, 2000);
}
</script>
