<template>
  <div class="login-page">
    <!-- Background Accents (Atmospheric Depth) -->
    <div class="bg-accent bg-accent--primary"></div>
    <div class="bg-accent bg-accent--tertiary"></div>

    <!-- Top Navigation -->
    <header class="login-topbar">
      <div class="topbar-logo">
        <span class="logo-bold">Mengundang</span><span class="logo-light">Anda</span>
      </div>
      
    </header>

    <!-- Main Content -->
    <main class="login-main">
      <div class="login-card-wrapper">
        <!-- Glassmorphism Login Card -->
        <div class="glass-card">
          <div class="card-header">
            <h1 class="card-title">Mengundang Anda</h1>
            <p class="card-subtitle">Masuk untuk membuat Undangan</p>
          </div>

          <form @submit.prevent="handleLogin" class="login-form">
            <div v-if="authStore.error" class="login-error">
              {{ authStore.error }}
            </div>

            <div class="form-group">
              <label for="username">USERNAME</label>
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
              <label for="password">PASSWORD</label>
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

            <div class="form-action">
              <button
                type="submit"
                class="btn-login"
                :disabled="authStore.loading || !username || !password"
              >
                <span v-if="authStore.loading" class="spinner"></span>
                <span v-else>Masuk</span>
              </button>
            </div>
          </form>

          <div class="card-footer">
            <a href="#">Lupa kata sandi? Hubungi IT Support</a>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    
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
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

/* ─── Page ─── */
.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at top left, #fdfefe 0%, #f5f7f9 100%);
  font-family: 'Manrope', sans-serif;
  color: #2c2f31;
  position: relative;
  overflow: hidden;
}

/* ─── Atmospheric Blurs ─── */
.bg-accent {
  position: absolute;
  width: 40rem;
  height: 40rem;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(120px);
  opacity: 0.05;
}
.bg-accent--primary {
  top: -10%;
  left: -5%;
  background: #0052d0;
}
.bg-accent--tertiary {
  bottom: -10%;
  right: -5%;
  background: #8d3a8b;
}

/* ─── Top Bar ─── */
.login-topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  max-width: 1280px;
  margin: 0 auto;
  z-index: 50;
}

.topbar-logo {
  font-size: 24px;
  letter-spacing: -0.04em;
  font-family: 'Manrope', sans-serif;
}
.logo-bold {
  font-weight: 800;
  color: #0f172a;
}
.logo-light {
  font-weight: 400;
  color: #595c5e;
}

.topbar-nav {
  display: flex;
  gap: 24px;
}
.topbar-nav a {
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  text-decoration: none;
  letter-spacing: -0.02em;
  transition: opacity 0.2s;
}
.topbar-nav a:hover {
  opacity: 0.7;
}

/* ─── Main Content ─── */
.login-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  z-index: 10;
}

.login-card-wrapper {
  width: 100%;
  max-width: 440px;
}

/* ─── Glass Card ─── */
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  border-radius: 1.5rem;
  padding: 40px 48px;
  box-shadow: 0 20px 50px rgba(11, 15, 16, 0.06);
  border: 1px solid rgba(171, 173, 175, 0.15);
}

/* ─── Card Header ─── */
.card-header {
  text-align: center;
  margin-bottom: 40px;
}
.card-title {
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #2c2f31;
  margin: 0 0 8px 0;
  font-family: 'Manrope', sans-serif;
}
.card-subtitle {
  font-size: 14px;
  font-weight: 500;
  color: #595c5e;
  letter-spacing: 0.02em;
  margin: 0;
}

/* ─── Form ─── */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.login-error {
  background: rgba(179, 27, 37, 0.08);
  border: 1px solid rgba(179, 27, 37, 0.2);
  color: #b31b25;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #595c5e;
  margin-left: 4px;
  font-family: 'Manrope', sans-serif;
}

.form-group input {
  width: 100%;
  padding: 16px 20px;
  border: none;
  border-radius: 12px;
  background: #d9dde0;
  color: #2c2f31;
  font-size: 15px;
  font-family: 'Manrope', sans-serif;
  outline: none;
  transition: box-shadow 0.3s, border-color 0.3s;
  border: 1px solid transparent;
  box-sizing: border-box;
}

.form-group input::placeholder {
  color: #747779;
}

.form-group input:focus {
  border-color: rgba(0, 82, 208, 0.4);
  box-shadow: 0 0 0 3px rgba(0, 82, 208, 0.08);
}

.form-group input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ─── Login Button ─── */
.form-action {
  padding-top: 8px;
}

.btn-login {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #0052d0, #799dff);
  color: #f1f2ff;
  font-size: 16px;
  font-weight: 700;
  font-family: 'Manrope', sans-serif;
  letter-spacing: -0.02em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  box-shadow: 0 8px 24px rgba(0, 82, 208, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-login:hover:not(:disabled) {
  transform: scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 82, 208, 0.3);
}

.btn-login:active:not(:disabled) {
  transform: scale(0.98);
}

.btn-login:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ─── Card Footer ─── */
.card-footer {
  margin-top: 32px;
  text-align: center;
}
.card-footer a {
  font-size: 12px;
  font-weight: 500;
  color: #0052d0;
  text-decoration: none;
  transition: opacity 0.2s;
}
.card-footer a:hover {
  opacity: 0.7;
}

/* ─── Page Footer ─── */
.login-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  padding-bottom: 40px;
  z-index: 10;
}
.login-footer span,
.login-footer a {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #94a3b8;
  text-decoration: none;
  font-family: 'Manrope', sans-serif;
}
.login-footer a:hover {
  color: #0052d0;
}

/* ─── Spinner ─── */
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

/* ─── Responsive ─── */
@media (max-width: 640px) {
  .glass-card {
    padding: 32px 24px;
    border-radius: 1rem;
  }
  .topbar-nav {
    display: none;
  }
  .login-footer {
    flex-direction: column;
    gap: 8px;
    padding-bottom: 20px;
  }
}
</style>
