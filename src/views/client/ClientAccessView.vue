<template>
  <div class="client-access-page">
    <div class="access-container">
      <!-- Logo -->
      <div class="access-logo">
        <router-link to="/" class="logo-link">
          <div class="logo-icon">
            <img src="/images/logo.webp" alt="Logo" />
          </div>
          <span class="logo-text">Mengundang<span>Anda</span></span>
        </router-link>
      </div>

      <!-- Card -->
      <div class="access-card">
        <div class="access-card-header">
          <div class="access-icon-circle">
            <span class="material-symbols-rounded">lock_open</span>
          </div>
          <h1>Masukkan Kode Akses</h1>
          <p>Masukkan kode akses undangan yang diberikan oleh admin untuk melihat detail tamu dan ucapan.</p>
        </div>

        <form class="access-form" @submit.prevent="handleSubmit">
          <div class="code-input-wrapper">
            <input
              ref="codeInput"
              v-model="code"
              type="text"
              maxlength="8"
              placeholder="XXXXXXXX"
              class="code-input"
              :class="{ 'code-input-error': errorMsg }"
              autocomplete="off"
              spellcheck="false"
              @input="onCodeInput"
            />
            <div class="code-hint">8 karakter huruf dan angka</div>
          </div>

          <div v-if="errorMsg" class="error-message">
            <span class="material-symbols-rounded" style="font-size:16px">error</span>
            {{ errorMsg }}
          </div>

          <button type="submit" class="btn-access" :disabled="loading || code.length !== 8">
            <span v-if="loading" class="spinner-sm"></span>
            <span v-else class="material-symbols-rounded" style="font-size:18px">login</span>
            {{ loading ? 'Memverifikasi...' : 'Masuk' }}
          </button>
        </form>
      </div>

      <p class="access-footer">
        Belum punya kode? Hubungi admin MengundangAnda.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useClientStore } from '@/stores/client'

const router = useRouter()
const store = useClientStore()

const code = ref('')
const errorMsg = ref('')
const loading = ref(false)
const codeInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  const queryCode = router.currentRoute.value.query.code as string
  if (queryCode && queryCode.length === 8) {
    code.value = queryCode.toUpperCase().replace(/[^A-Z0-9]/g, '')
    handleSubmit()
    return
  }

  // If already authenticated, redirect
  if (store.isAuthenticated) {
    if (store.needsCreate) {
      router.replace('/client/create')
    } else {
      router.replace('/client/dashboard')
    }
    return
  }
  codeInput.value?.focus()
})

function onCodeInput() {
  // Uppercase and strip non-alphanumeric
  code.value = code.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)
  errorMsg.value = ''
}

async function handleSubmit() {
  if (code.value.length !== 8) return
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await store.verifyCode(code.value)
    if (res.needs_create) {
      router.push('/client/create')
    } else {
      router.push('/client/dashboard')
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'Kode akses tidak valid.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.client-access-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.access-container {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.access-logo {
  margin-bottom: 8px;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
}

.logo-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-text {
  font-size: 22px;
  font-weight: 700;
  color: #e2e8f0;
  letter-spacing: -0.5px;
}

.logo-text span {
  color: #60a5fa;
}

.access-card {
  width: 100%;
  background: white;
  border-radius: 20px;
  padding: 36px 28px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.access-card-header {
  text-align: center;
  margin-bottom: 28px;
}

.access-icon-circle {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 28px;
}

.access-icon-circle .material-symbols-rounded {
  font-size: 28px;
}

.access-card-header h1 {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.3px;
}

.access-card-header p {
  margin: 0;
  font-size: 13.5px;
  color: #64748b;
  line-height: 1.5;
}

.access-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.code-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.code-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  letter-spacing: 6px;
  text-align: center;
  text-transform: uppercase;
  color: #1e293b;
  outline: none;
  transition: all 0.2s;
  background: #f8fafc;
  box-sizing: border-box;
}

.code-input::placeholder {
  color: #cbd5e1;
  letter-spacing: 8px;
  font-weight: 400;
}

.code-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  background: white;
}

.code-input-error {
  border-color: #ef4444;
}

.code-input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.code-hint {
  font-size: 12px;
  color: #94a3b8;
  text-align: center;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  color: #dc2626;
}

.btn-access {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.btn-access:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.btn-access:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spinner-sm {
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.access-footer {
  font-size: 13px;
  color: #64748b;
  text-align: center;
  margin: 0;
}

@media (max-width: 480px) {
  .client-access-page {
    padding: 16px;
    align-items: flex-start;
    padding-top: 60px;
  }
  .access-card {
    padding: 28px 20px;
    border-radius: 16px;
  }
  .code-input {
    font-size: 18px;
    letter-spacing: 4px;
    padding: 12px 14px;
  }
}
</style>
