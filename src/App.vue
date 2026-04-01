<script setup lang="ts">
import { watchEffect } from 'vue'
import { useAuth, useSession } from '@clerk/vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const { isSignedIn, isLoaded } = useAuth()
const { session } = useSession()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// Provide Clerk's session.getToken to the auth store.
// Using useSession().session gives us direct access to the active session object,
// which is guaranteed to have getToken() when isSignedIn is true.
authStore.setTokenGetter(async () => {
  const s = session.value
  if (!s) {
    console.warn('[Auth] No Clerk session available for getToken')
    return null
  }
  return await s.getToken()
})

// Only act once Clerk has finished loading to avoid race conditions
watchEffect(() => {
  if (!isLoaded.value) return // Clerk masih loading, jangan lakukan apa-apa

  if (isSignedIn.value) {
    // Wait until session is also available before fetching user data
    if (!session.value) {
      console.log('[Auth] Signed in but session not ready yet, waiting...')
      return
    }
    authStore.fetchMe()
  } else {
    // User benar-benar signed out (bukan sedang loading)
    authStore.user = null
    if (route.meta.requiresAuth) {
      router.push('/login')
    }
  }
})
</script>


<template>
  
  <main>
    <template v-if="$route.meta.requiresAuth">
      <!-- Tampilkan loading saat Clerk belum siap -->
      <div v-if="!isLoaded" style="display:flex;align-items:center;justify-content:center;min-height:80vh;">
        <p style="color:#888;">Memuat sesi...</p>
      </div>
      <!-- Setelah Clerk loaded, tampilkan dashboard atau redirect -->
      <router-view v-else-if="isSignedIn" />
      <!-- Jangan render apa-apa, watchEffect sudah handle redirect -->
    </template>
    <template v-else>
      <router-view />
    </template>
  </main>
</template>
