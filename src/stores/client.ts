import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Invitation, Guest, Rsvp } from '@/types/invitation'

const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api'

/** Safely parse JSON from a response */
async function safeJson(res: Response): Promise<any> {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    throw new Error(
      res.status >= 500
        ? `Server error (${res.status}). Silakan coba lagi nanti.`
        : `Unexpected response (${res.status}): ${text.slice(0, 120)}`
    )
  }
}

const STORAGE_KEY = 'client_access_token'
const STORAGE_INV_KEY = 'client_invitation_basic'

export const useClientStore = defineStore('client', () => {
  const accessToken = ref<string | null>(localStorage.getItem(STORAGE_KEY))
  const invitation = ref<Invitation | null>(null)
  const guests = ref<Guest[]>([])
  const rsvps = ref<Rsvp[]>([])
  const stats = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!accessToken.value)

  // Basic invitation info stored in localStorage for quick display
  const basicInfo = ref<any>((() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_INV_KEY) || 'null')
    } catch { return null }
  })())

  function clientHeaders(): Record<string, string> {
    return accessToken.value
      ? { 'X-Access-Token': accessToken.value, 'Accept': 'application/json' }
      : { 'Accept': 'application/json' }
  }

  async function verifyCode(code: string) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${API_BASE}/client/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await safeJson(res)
      if (!res.ok) {
        throw new Error(data.error || 'Kode akses tidak valid.')
      }
      accessToken.value = data.token
      basicInfo.value = data.invitation
      localStorage.setItem(STORAGE_KEY, data.token)
      localStorage.setItem(STORAGE_INV_KEY, JSON.stringify(data.invitation))
      return data.invitation
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  function logout() {
    accessToken.value = null
    invitation.value = null
    guests.value = []
    rsvps.value = []
    stats.value = null
    basicInfo.value = null
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(STORAGE_INV_KEY)
  }

  async function fetchInvitation() {
    loading.value = true
    try {
      const res = await fetch(`${API_BASE}/client/invitation`, {
        headers: clientHeaders(),
      })
      if (res.status === 401) {
        logout()
        throw new Error('Sesi kedaluwarsa. Silakan masukkan kode akses kembali.')
      }
      if (!res.ok) throw new Error('Gagal memuat data undangan.')
      invitation.value = await safeJson(res)
      return invitation.value
    } catch (e: any) {
      error.value = e.message
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchGuests() {
    try {
      const res = await fetch(`${API_BASE}/client/guests`, {
        headers: clientHeaders(),
      })
      if (res.status === 401) { logout(); return [] }
      if (!res.ok) throw new Error('Gagal memuat daftar tamu.')
      guests.value = await safeJson(res)
      return guests.value
    } catch (e: any) {
      error.value = e.message
      return []
    }
  }

  async function bulkAddGuests(guestList: { name: string; phone_number?: string }[]) {
    const res = await fetch(`${API_BASE}/client/guests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...clientHeaders() },
      body: JSON.stringify({ guests: guestList }),
    })
    if (!res.ok) throw new Error('Gagal menambah tamu.')
    const data = await safeJson(res)
    guests.value = [...data, ...guests.value]
    return data
  }

  async function updateGuestStatus(guestId: string, is_sent: boolean) {
    const res = await fetch(`${API_BASE}/client/guests/${guestId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...clientHeaders() },
      body: JSON.stringify({ is_sent }),
    })
    if (!res.ok) throw new Error('Gagal update status tamu.')
    const data = await safeJson(res)
    const idx = guests.value.findIndex(g => g.id === guestId)
    if (idx >= 0) guests.value[idx] = data
    return data
  }

  async function deleteGuest(guestId: string) {
    const res = await fetch(`${API_BASE}/client/guests/${guestId}`, {
      method: 'DELETE',
      headers: clientHeaders(),
    })
    if (!res.ok) throw new Error('Gagal menghapus tamu.')
    guests.value = guests.value.filter(g => g.id !== guestId)
  }

  async function fetchRsvps() {
    try {
      const res = await fetch(`${API_BASE}/client/rsvps`, {
        headers: clientHeaders(),
      })
      if (res.status === 401) { logout(); return [] }
      if (!res.ok) throw new Error('Gagal memuat ucapan.')
      rsvps.value = await safeJson(res)
      return rsvps.value
    } catch (e: any) {
      error.value = e.message
      return []
    }
  }

  async function replyRsvp(rsvpId: string, payload: { reply_text?: string; is_hidden?: boolean }) {
    const res = await fetch(`${API_BASE}/client/rsvps/${rsvpId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...clientHeaders() },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Gagal menyimpan balasan.')
    const data = await safeJson(res)
    const idx = rsvps.value.findIndex(r => r.id === data.id)
    if (idx >= 0) rsvps.value[idx] = data
    return data
  }

  async function deleteRsvp(rsvpId: string) {
    const res = await fetch(`${API_BASE}/client/rsvps/${rsvpId}`, {
      method: 'DELETE',
      headers: clientHeaders(),
    })
    if (!res.ok) throw new Error('Gagal menghapus ucapan.')
    rsvps.value = rsvps.value.filter(r => r.id !== rsvpId)
  }

  async function fetchStats() {
    try {
      const res = await fetch(`${API_BASE}/client/stats`, {
        headers: clientHeaders(),
      })
      if (res.status === 401) { logout(); return null }
      if (!res.ok) throw new Error('Gagal memuat statistik.')
      stats.value = await safeJson(res)
      return stats.value
    } catch (e: any) {
      error.value = e.message
      return null
    }
  }

  async function updateWaMessage(waMessage: string) {
    const res = await fetch(`${API_BASE}/client/wa-message`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...clientHeaders() },
      body: JSON.stringify({ wa_message: waMessage }),
    })
    if (!res.ok) throw new Error('Gagal menyimpan pesan WA.')
    const data = await safeJson(res)
    if (invitation.value) {
      invitation.value.wa_message = data.wa_message
    }
    return data
  }

  return {
    accessToken,
    invitation,
    guests,
    rsvps,
    stats,
    loading,
    error,
    isAuthenticated,
    basicInfo,
    verifyCode,
    logout,
    fetchInvitation,
    fetchGuests,
    bulkAddGuests,
    updateGuestStatus,
    deleteGuest,
    fetchRsvps,
    replyRsvp,
    deleteRsvp,
    fetchStats,
    updateWaMessage,
  }
})
