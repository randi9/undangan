<template>
  <div class="login-page">
    <div class="bg-accent bg-accent--primary"></div>
    <div class="bg-accent bg-accent--tertiary"></div>

    <header class="login-topbar">
      <div class="topbar-logo">
        <span class="logo-bold">Mengundang</span><span class="logo-light">Anda</span>
      </div>
    </header>

    <main class="login-main">
      <div class="signup-wrapper">
        <SignUp routing="path" path="/sign-up" signInUrl="/login" :fallbackRedirectUrl="redirectUrl" :forceRedirectUrl="redirectUrl" />
        <p class="legal-consent">
          Dengan mendaftar, Anda menyetujui
          <a href="/terms" target="_blank">Syarat & Ketentuan</a> dan
          <a href="/privacy" target="_blank">Kebijakan Privasi</a> kami.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { SignUp } from '@clerk/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const redirectUrl = computed(() => {
  return typeof route.query.redirect_url === 'string' && route.query.redirect_url ? route.query.redirect_url : '/dashboard'
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

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
  color: #93c5fd;
}

.login-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  z-index: 10;
}

.signup-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.legal-consent {
  font-size: 12.5px;
  color: #94a3b8;
  text-align: center;
  max-width: 340px;
  line-height: 1.6;
  margin: 0;
}

.legal-consent a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.legal-consent a:hover {
  color: #2563eb;
  text-decoration: underline;
}
</style>
