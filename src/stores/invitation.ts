import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Invitation, CreateInvitationPayload, Guest } from '@/types/invitation'
import { useAuthStore } from '@/stores/auth'
import { compressImage, compressImages } from '@/utils/imageCompress'

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

  async function uploadPhoto(file: File, slug?: string): Promise<string> {
    // Compress image client-side (replaces server-side sharp)
    const compressed = await compressImage(file)
    const formData = new FormData()
    formData.append('photo', compressed)
    const slugParam = slug ? `?slug=${encodeURIComponent(slug)}` : ''
    const res = await fetch(`${API_BASE}/upload/single${slugParam}`, {
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

  async function uploadMusic(file: File, slug?: string): Promise<string> {
    const formData = new FormData()
    formData.append('photo', file)
    const slugParam = slug ? `?slug=${encodeURIComponent(slug)}` : ''
    const res = await fetch(`${API_BASE}/upload/single${slugParam}`, {
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

  async function uploadPhotos(files: File[], slug?: string): Promise<Array<{ url: string; filename: string }>> {
    // Compress all images client-side before upload
    const compressed = await compressImages(files)
    const formData = new FormData()
    compressed.forEach(file => formData.append('photos', file))
    const slugParam = slug ? `?slug=${encodeURIComponent(slug)}` : ''
    const res = await fetch(`${API_BASE}/upload/multiple${slugParam}`, {
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

  async function deleteFile(url: string): Promise<void> {
    if (!url) return
    const headersConfig = await authHeaders()
    const res = await fetch(`${API_BASE}/upload/file`, {
      method: 'DELETE',
      headers: { ...headersConfig, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })
    if (!res.ok) {
      const data = await safeJson(res).catch(() => ({}))
      console.error('Failed to delete file from R2:', data.error)
    }
  }

  // Guests API
  const guests = ref<Guest[]>([])

  async function fetchGuests(invitationId: string) {
    loading.value = true
    try {
      const res = await fetch(`${API_BASE}/guests/${invitationId}`, {
        headers: await authHeaders()
      })
      if (!res.ok) throw new Error('Failed to fetch guests')
      guests.value = await safeJson(res)
      return guests.value
    } catch (e: any) {
      console.error(e.message)
      return []
    } finally {
      loading.value = false
    }
  }

  async function bulkAddGuests(invitationId: string, guestList: { name: string, phone_number?: string }[]) {
    try {
      const res = await fetch(`${API_BASE}/guests/${invitationId}/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
        body: JSON.stringify({ guests: guestList })
      })
      if (!res.ok) throw new Error('Failed to add guests')
      const data = await safeJson(res)
      guests.value = [...data, ...guests.value]
      return data
    } catch (e: any) {
      throw e
    }
  }

  async function updateGuestStatus(invitationId: string, guestId: string, is_sent: boolean) {
    try {
      const res = await fetch(`${API_BASE}/guests/${invitationId}/${guestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
        body: JSON.stringify({ is_sent })
      })
      if (!res.ok) throw new Error('Failed to update guest status')
      const data = await safeJson(res)
      const idx = guests.value.findIndex(g => g.id === guestId)
      if (idx >= 0) guests.value[idx] = data
      return data
    } catch (e: any) {
      throw e
    }
  }

  async function deleteGuest(invitationId: string, guestId: string) {
    try {
      const res = await fetch(`${API_BASE}/guests/${invitationId}/${guestId}`, {
        method: 'DELETE',
        headers: await authHeaders()
      })
      if (!res.ok) throw new Error('Failed to delete guest')
      guests.value = guests.value.filter(g => g.id !== guestId)
    } catch (e: any) {
      throw e
    }
  }

  // --- RSVP/Wishes Management ---
  async function updateRsvp(rsvpId: string, payload: { is_hidden?: boolean; reply_text?: string }) {
    try {
      const res = await fetch(`${API_BASE}/rsvp/${rsvpId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to update RSVP')
      return await safeJson(res)
    } catch (e: any) {
      throw e
    }
  }

  async function deleteRsvp(rsvpId: string) {
    try {
      const res = await fetch(`${API_BASE}/rsvp/${rsvpId}`, {
        method: 'DELETE',
        headers: await authHeaders()
      })
      if (!res.ok) throw new Error('Failed to delete RSVP')
    } catch (e: any) {
      throw e
    }
  }

  // --- Stats ---
  async function fetchStats(invitationId: string) {
    try {
      const res = await fetch(`${API_BASE}/invitations/${invitationId}/stats`, {
        headers: await authHeaders()
      })
      if (!res.ok) throw new Error('Failed to fetch stats')
      return await safeJson(res)
    } catch (e: any) {
      console.error(e)
      return null
    }
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
    uploadPhotos,
    deleteFile,
    guests,
    fetchGuests,
    bulkAddGuests,
    updateGuestStatus,
    deleteGuest,
    updateRsvp,
    deleteRsvp,
    fetchStats
  }
})
