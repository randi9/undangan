<template>
  <aside class="admin-sidebar">
    <router-link to="/dashboard" class="sidebar-brand">
      <div class="sidebar-brand-icon" style="overflow:hidden;background:transparent">
        <img src="/images/logo.webp" alt="Logo" style="width:100%;height:100%;object-fit:cover" />
      </div>
      <div class="sidebar-brand-text">Mengundang<span>Anda</span></div>
    </router-link>

    <nav class="sidebar-nav" :class="{ 'is-admin-nav': isAdmin }">
      <router-link to="/dashboard" class="sidebar-link" exact>
        <span class="material-symbols-rounded">dashboard</span>
        Dashboard
      </router-link>
      <router-link to="/dashboard/analytics" class="sidebar-link">
        <span class="material-symbols-rounded">analytics</span>
        Statistik
      </router-link>
      <router-link to="/dashboard/themes" class="sidebar-link">
        <span class="material-symbols-rounded">palette</span>
        Tema
      </router-link>
      <router-link v-if="showCreateLink" to="/dashboard/create" class="sidebar-link">
        <span class="material-symbols-rounded">add_circle</span>
        Buat Undangan
      </router-link>
      <router-link v-if="showPaymentLink" :to="`/dashboard/payment?invitation_id=${firstTrialInvitationId}`" class="sidebar-link">
        <span class="material-symbols-rounded">payments</span>
        Pembayaran
      </router-link>
      <router-link v-if="isAdmin" to="/dashboard/users" class="sidebar-link">
        <span class="material-symbols-rounded">group</span>
        Kelola User
      </router-link>
      <router-link v-if="isAdmin" to="/dashboard/music" class="sidebar-link">
        <span class="material-symbols-rounded">library_music</span>
        Pustaka Lagu
      </router-link>
      <router-link v-if="isAdmin" to="/dashboard/vouchers" class="sidebar-link">
        <span class="material-symbols-rounded">confirmation_number</span>
        Voucher
      </router-link>
      <router-link v-if="isAdmin" to="/dashboard/orders" class="sidebar-link">
        <span class="material-symbols-rounded">receipt_long</span>
        Pesanan
      </router-link>
    </nav>

    <div class="sidebar-footer" style="padding: 1rem 0; border-top: 1px solid #e1e8f0; margin-top: auto;">
      <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
        <UserButton :showName="!isMobile" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useInvitationStore } from '@/stores/invitation'
import { useAuthStore } from '@/stores/auth'
import { UserButton } from '@clerk/vue'

// Reactive mobile breakpoint
const isMobile = ref(window.innerWidth <= 768)
function onResize() { isMobile.value = window.innerWidth <= 768 }
onMounted(() => window.addEventListener('resize', onResize))
onUnmounted(() => window.removeEventListener('resize', onResize))

const store = useInvitationStore()
const authStore = useAuthStore()

const invitations = computed(() => store.invitations)
const isAdmin = computed(() => authStore.isAdmin)

const hasReachedLimit = computed(() => {
  if (!authStore.user) return false
  if (authStore.user.role === 'admin') return false
  return invitations.value.length >= authStore.user.max_invitations
})

const showCreateLink = computed(() => !hasReachedLimit.value)

const showPaymentLink = computed(() => {
  return invitations.value.some(i => i.payment_status === 'trial')
})

const firstTrialInvitationId = computed(() => {
  const trialInv = invitations.value.find(i => i.payment_status === 'trial')
  return trialInv ? trialInv.id : null
})
</script>
