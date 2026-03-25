import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api'
const TOKEN_KEY = 'undangan_token'

export interface AuthUser {
  id: string
  username: string
  role: 'admin' | 'user'
  max_invitations: number
  invitation_count?: number
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
  const user = ref<AuthUser | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const canCreateInvitation = computed(() => {
    if (!user.value) return false
    if (user.value.role === 'admin') return true
    return (user.value.invitation_count ?? 0) < user.value.max_invitations
  })

  function setToken(newToken: string | null) {
    token.value = newToken
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  }

  function getAuthHeaders(): Record<string, string> {
    if (!token.value) return {}
    return { Authorization: `Bearer ${token.value}` }
  }

  async function login(username: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Login gagal')
      }
      setToken(data.token)
      user.value = data.user
      return true
    } catch (e: any) {
      error.value = e.message
      return false
    } finally {
      loading.value = false
    }
  }

  async function fetchMe() {
    if (!token.value) return false
    loading.value = true
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders(),
      })
      if (!res.ok) {
        setToken(null)
        user.value = null
        return false
      }
      user.value = await res.json()
      return true
    } catch {
      setToken(null)
      user.value = null
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    setToken(null)
    user.value = null
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    canCreateInvitation,
    getAuthHeaders,
    login,
    fetchMe,
    logout,
  }
})
