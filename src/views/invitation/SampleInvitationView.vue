<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { SAMPLE_INVITATIONS } from '@/config/sampleData'
import InvitationView from './InvitationView.vue'

const route = useRoute()
const themeId = computed(() => route.params.themeId as string)
const sampleData = computed(() => SAMPLE_INVITATIONS[themeId.value] || null)
</script>

<template>
  <InvitationView v-if="sampleData" :static-data="sampleData" />
  <div v-else class="sample-not-found">
    <div class="sample-not-found-inner">
      <h1>Tema Tidak Ditemukan</h1>
      <p>Tema "{{ themeId }}" belum tersedia untuk preview.</p>
      <a href="/themes" class="sample-back-btn">← Kembali ke Katalog Tema</a>
    </div>
  </div>
</template>

<style scoped>
.sample-not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 24px;
}
.sample-not-found-inner {
  text-align: center;
}
.sample-not-found h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}
.sample-not-found p {
  font-size: 15px;
  color: #64748b;
  margin-bottom: 24px;
}
.sample-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 24px;
  background: #2563eb;
  color: #fff;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
}
.sample-back-btn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}
</style>
