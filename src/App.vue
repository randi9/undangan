<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useAuth, useSession } from "@clerk/vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const clerkEnabled = globalThis.__CLERK_ENABLED__ === true;

let isSignedIn = ref<boolean | undefined>(false);
let isLoaded = ref(true);
let session = ref<any | null>(null);

if (clerkEnabled) {
  const auth = useAuth();
  const sessionState = useSession();
  isSignedIn = auth.isSignedIn;
  isLoaded = auth.isLoaded;
  session = sessionState.session;
}

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const hasFetchedMe = ref(false);

// Provide Clerk's session.getToken to the auth store.
// Using useSession().session gives us direct access to the active session object,
// which is guaranteed to have getToken() when isSignedIn is true.
if (clerkEnabled) {
  authStore.setTokenGetter(async () => {
    const s = session.value;
    if (!s) {
      console.warn("[Auth] No Clerk session available for getToken");
      return null;
    }
    return await s.getToken();
  });
} else {
  authStore.setTokenGetter(async () => null);
}

// Only act once Clerk has finished loading to avoid race conditions
watchEffect(() => {
  const needsClerkRoute =
    Boolean(route.meta.requiresAuth) ||
    route.path.startsWith("/login") ||
    route.path.startsWith("/sign-up");

  if (!needsClerkRoute) return;

  if (!clerkEnabled) {
    globalThis.location.assign(route.fullPath);
    return;
  }

  if (!isLoaded.value) return; // Clerk masih loading, jangan lakukan apa-apa

  if (isSignedIn.value) {
    // Wait until session is also available before fetching user data
    if (!session.value) {
      console.log("[Auth] Signed in but session not ready yet, waiting...");
      return;
    }

    if (!hasFetchedMe.value) {
      hasFetchedMe.value = true;
      authStore.fetchMe();
    }

    if (route.path.startsWith("/login") || route.path.startsWith("/sign-up")) {
      router.replace("/dashboard");
    }
  } else {
    hasFetchedMe.value = false;

    // User benar-benar signed out (bukan sedang loading)
    authStore.user = null;
    if (route.meta.requiresAuth) {
      router.push({ path: "/login", query: { redirect_url: route.fullPath } });
    }
  }
});
</script>

<template>
  <main>
    <template v-if="$route.meta.requiresAuth">
      <!-- Tampilkan loading saat Clerk belum siap -->
      <div
        v-if="!isLoaded"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
        "
      >
        <p style="color: #888">Memuat sesi...</p>
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
