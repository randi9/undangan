<template>
  <header class="admin-topbar">
    <router-link to="/dashboard" class="mobile-brand">
      <div class="sidebar-brand-icon" style="width:28px;height:28px;border-radius:6px;overflow:hidden;background:transparent">
        <img src="/images/logo.webp" alt="Logo" style="width:100%;height:100%;object-fit:cover" />
      </div>
      <div class="sidebar-brand-text" style="font-size:16px;">Mengundang<span>Anda</span></div>
    </router-link>

    <slot name="search">
      <div class="search-bar" style="visibility: hidden;"></div>
    </slot>

    <div class="topbar-actions">
      <slot name="actions">
        <router-link v-if="showCreateButton" to="/dashboard/create" class="btn btn-primary">
          <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">auto_awesome</span>
          Buat Undangan Baru
        </router-link>
      </slot>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInvitationStore } from '@/stores/invitation'
import { useAuthStore } from '@/stores/auth'

const store = useInvitationStore()
const authStore = useAuthStore()

const invitations = computed(() => store.invitations)

const showCreateButton = computed(() => {
  if (!authStore.user) return true
  if (authStore.user.role === 'admin') return true
  return invitations.value.length < authStore.user.max_invitations
})
</script>
