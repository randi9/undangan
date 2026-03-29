import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api'

export interface AuthUser {
  id: string
  username: string
  role: 'admin' | 'user'
  max_invitations: number
  invitation_count?: number
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<AuthUser | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Token getter: a simple function that returns the Clerk session token.
  // Set by App.vue using the Clerk session object.
  let _getToken: (() => Promise<string | null>) | null = null

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const canCreateInvitation = computed(() => {
    if (!user.value) return false
    if (user.value.role === 'admin') return true
    return (user.value.invitation_count ?? 0) < user.value.max_invitations
  })

  function setTokenGetter(getter: () => Promise<string | null>) {
    _getToken = getter
  }

  async function getAuthHeaders(): Promise<Record<string, string>> {
    try {
      let tokenValue: string | null = null

      if (_getToken) {
        tokenValue = await _getToken()
      }

      if (!tokenValue) {
        console.warn('[Auth] No token available from getter')
        return {}
      }

      token.value = tokenValue
      return { Authorization: `Bearer ${tokenValue}` }
    } catch (err) {
      console.error('[Auth] Error getting token:', err)
      return {}
    }
  }

  async function login() {
    return fetchMe()
  }

  async function fetchMe() {
    loading.value = true
    try {
      const headers = await getAuthHeaders()
      if (!headers.Authorization) {
        console.warn('[Auth] fetchMe aborted: no Authorization header')
        return false
      }

      const res = await fetch(`${API_BASE}/auth/me`, { headers })
      if (!res.ok) {
        console.error('[Auth] fetchMe failed:', res.status, await res.text())
        user.value = null
        return false
      }
      user.value = await res.json()
      return true
    } catch (err) {
      console.error('[Auth] fetchMe error:', err)
      user.value = null
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    canCreateInvitation,
    setTokenGetter,
    getAuthHeaders,
    login,
    fetchMe,
    logout,
  }
})
