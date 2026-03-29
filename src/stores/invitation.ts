import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Invitation, CreateInvitationPayload } from '@/types/invitation'
import { useAuthStore } from '@/stores/auth'

const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api'

/** Safely parse JSON from a response; if it's HTML (e.g. Vercel 500 page), return a fallback error */
async function safeJson(res: Response): Promise<any> {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    // Server returned HTML or something non-JSON
    throw new Error(
      res.status >= 500
        ? `Server error (${res.status}). Silakan coba lagi nanti.`
        : `Unexpected response (${res.status}): ${text.slice(0, 120)}`
    )
  }
}

export const useInvitationStore = defineStore('invitation', () => {
  const invitations = ref<Invitation[]>([])
  const currentInvitation = ref<Invitation | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function authHeaders(): Promise<Record<string, string>> {
    const auth = useAuthStore()
    return await auth.getAuthHeaders()
  }

  async function fetchInvitations() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${API_BASE}/invitations`, {
        headers: await authHeaders()
      })
      if (res.status === 401) {
        throw new Error('Sesi berakhir. Silakan login kembali.')
      }
      invitations.value = await safeJson(res)
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchInvitationById(id: string) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${API_BASE}/invitations/${id}`, {
        headers: await authHeaders()
      })
      if (!res.ok) {
        const data = await safeJson(res).catch(() => ({}))
        throw new Error(data.error || 'Invitation not found')
      }
      currentInvitation.value = await safeJson(res)
      return currentInvitation.value
    } catch (e: any) {
      error.value = e.message
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchInvitationBySlug(slug: string) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${API_BASE}/invitations/slug/${slug}`)
      if (!res.ok) {
        const data = await safeJson(res).catch(() => ({}))
        throw new Error(data.error || 'Invitation not found')
      }
      currentInvitation.value = await safeJson(res)
      return currentInvitation.value
    } catch (e: any) {
      error.value = e.message
      return null
    } finally {
      loading.value = false
    }
  }

  async function createInvitation(payload: CreateInvitationPayload) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${API_BASE}/invitations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
        body: JSON.stringify(payload)
      })
      const data = await safeJson(res)
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create invitation')
      }
      invitations.value.unshift(data)
      return data
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function updateInvitation(id: string, payload: Partial<CreateInvitationPayload>) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${API_BASE}/invitations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
        body: JSON.stringify(payload)
      })
      const data = await safeJson(res)
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update invitation')
      }
      const idx = invitations.value.findIndex(i => i.id === id)
      if (idx >= 0) invitations.value[idx] = data
      return data
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function deleteInvitation(id: string) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${API_BASE}/invitations/${id}`, {
        method: 'DELETE',
        headers: await authHeaders()
      })
      if (!res.ok) {
        const data = await safeJson(res).catch(() => ({}))
        throw new Error(data.error || 'Failed to delete invitation')
      }
      invitations.value = invitations.value.filter(i => i.id !== id)
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function uploadPhoto(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('photo', file)
    const res = await fetch(`${API_BASE}/upload/single`, {
      method: 'POST',
      headers: await authHeaders(),
      body: formData
    })
    if (!res.ok) {
      const data = await safeJson(res).catch(() => ({}))
      throw new Error(data.error || 'Failed to upload photo')
    }
    const data = await safeJson(res)
    return data.url
  }

  async function uploadMusic(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('photo', file)
    const res = await fetch(`${API_BASE}/upload/single`, {
      method: 'POST',
      headers: await authHeaders(),
      body: formData
    })
    if (!res.ok) {
      const data = await safeJson(res).catch(() => ({}))
      throw new Error(data.error || 'Failed to upload music')
    }
    const data = await safeJson(res)
    return data.url
  }

  async function uploadPhotos(files: File[]): Promise<Array<{ url: string; filename: string }>> {
    const formData = new FormData()
    files.forEach(file => formData.append('photos', file))
    const res = await fetch(`${API_BASE}/upload/multiple`, {
      method: 'POST',
      headers: await authHeaders(),
      body: formData
    })
    if (!res.ok) {
      const data = await safeJson(res).catch(() => ({}))
      throw new Error(data.error || 'Failed to upload photos')
    }
    return await safeJson(res)
  }

  return {
    invitations,
    currentInvitation,
    loading,
    error,
    fetchInvitations,
    fetchInvitationById,
    fetchInvitationBySlug,
    createInvitation,
    updateInvitation,
    deleteInvitation,
    uploadPhoto,
    uploadMusic,
    uploadPhotos
  }
})
