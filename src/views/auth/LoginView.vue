<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <div class="login-logo">💒</div>
        <h1>Undangan<span class="accent">Gen</span></h1>
        <p class="login-subtitle">Masuk ke dashboard admin</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="authStore.error" class="login-error">
          {{ authStore.error }}
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Masukkan username"
            required
            :disabled="authStore.loading"
            autocomplete="username"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Masukkan password"
            required
            :disabled="authStore.loading"
            autocomplete="current-password"
          />
        </div>

        <button
          type="submit"
          class="btn-login"
          :disabled="authStore.loading || !username || !password"
        >
          <span v-if="authStore.loading" class="spinner"></span>
          <span v-else>Masuk</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const username = ref('')
const password = ref('')

async function handleLogin() {
  const success = await authStore.login(username.value, password.value)
  if (success) {
    router.push('/')
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a14, #12121e, #1a1a2e);
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 48px 36px;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.login-header {
  text-align: center;
  margin-bottom: 36px;
}

.login-logo {
  font-size: 48px;
  margin-bottom: 12px;
}

.login-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.login-header .accent {
  color: #c9a96e;
}

.login-subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  margin-top: 4px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.login-error {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
}

.form-group input {
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.form-group input:focus {
  border-color: #c9a96e;
  box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.15);
}

.form-group input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-login {
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #c9a96e, #b8860b);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  margin-top: 8px;
}

.btn-login:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-login:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
