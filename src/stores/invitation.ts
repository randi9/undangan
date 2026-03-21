import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Invitation, CreateInvitationPayload } from '@/types/invitation'

const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api'

export const useInvitationStore = defineStore('invitation', () => {
  const invitations = ref<Invitation[]>([])
  const currentInvitation = ref<Invitation | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchInvitations() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${API_BASE}/invitations`)
      invitations.value = await res.json()
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
      const res = await fetch(`${API_BASE}/invitations/${id}`)
      if (!res.ok) throw new Error('Invitation not found')
      currentInvitation.value = await res.json()
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
      if (!res.ok) throw new Error('Invitation not found')
      currentInvitation.value = await res.json()
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create invitation')
      }
      const newInvitation = await res.json()
      invitations.value.unshift(newInvitation)
      return newInvitation
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update invitation')
      }
      const updated = await res.json()
      const idx = invitations.value.findIndex(i => i.id === id)
      if (idx >= 0) invitations.value[idx] = updated
      return updated
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
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Failed to delete invitation')
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
      body: formData
    })
    if (!res.ok) throw new Error('Failed to upload photo')
    const data = await res.json()
    return data.url
  }

  async function uploadPhotos(files: File[]): Promise<Array<{ url: string; filename: string }>> {
    const formData = new FormData()
    files.forEach(file => formData.append('photos', file))
    const res = await fetch(`${API_BASE}/upload/multiple`, {
      method: 'POST',
      body: formData
    })
    if (!res.ok) throw new Error('Failed to upload photos')
    return await res.json()
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
    uploadPhotos
  }
})
