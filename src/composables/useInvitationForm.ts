import { reactive, ref, toRaw } from 'vue'
import type { LoveStoryItem, Photo, BankAccount, Invitation } from '@/types/invitation'
import { DEFAULT_MUSIC } from '@/config/defaultMusic'
import { getThemeGalleryDefault } from '@/config/themes'

export interface InvitationFormData {
  slug: string
  theme: 'elegant' | 'minimalist' | 'floral' | 'elegant_blue'
  groom_name: string
  bride_name: string
  groom_full_name: string
  bride_full_name: string
  groom_father: string
  groom_mother: string
  bride_father: string
  bride_mother: string
  groom_photo: string
  bride_photo: string
  cover_photo: string
  akad_date: string
  akad_time: string
  akad_venue: string
  akad_address: string
  akad_map_url: string
  resepsi_date: string
  resepsi_time: string
  resepsi_venue: string
  resepsi_address: string
  resepsi_map_url: string
  love_story: LoveStoryItem[]
  quote: string
  banks: BankAccount[]
  music_url: string
  gallery_type: 'carousel' | 'masonry'
  photos: Photo[]
}

function createEmptyForm(theme?: string): InvitationFormData {
  const themeId = (theme || 'elegant') as InvitationFormData['theme']
  return {
    slug: '',
    theme: themeId,
    groom_name: '',
    bride_name: '',
    groom_full_name: '',
    bride_full_name: '',
    groom_father: '',
    groom_mother: '',
    bride_father: '',
    bride_mother: '',
    groom_photo: '',
    bride_photo: '',
    cover_photo: '',
    akad_date: '',
    akad_time: '08:00 - 10:00 WIB',
    akad_venue: '',
    akad_address: '',
    akad_map_url: '',
    resepsi_date: '',
    resepsi_time: '11:00 - 13:00 WIB',
    resepsi_venue: '',
    resepsi_address: '',
    resepsi_map_url: '',
    love_story: [],
    quote: '',
    banks: [],
    music_url: DEFAULT_MUSIC[themeId]?.url || '',
    gallery_type: getThemeGalleryDefault(themeId),
    photos: [],
  }
}

function normalizeLoveStory(value: unknown): LoveStoryItem[] {
  if (!value) return []
  if (Array.isArray(value)) return value as LoveStoryItem[]
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? (parsed as LoveStoryItem[]) : []
    } catch {
      return []
    }
  }
  return []
}

export function useInvitationForm(initialTheme?: string) {
  const form = reactive<InvitationFormData>(createEmptyForm(initialTheme))
  const submitting = ref(false)
  const toast = ref<{ type: string; message: string } | null>(null)

  function showToast(type: string, message: string) {
    toast.value = { type, message }
    setTimeout(() => {
      toast.value = null
    }, 3000)
  }

  /** Populate form from existing invitation data (used by Edit view) */
  function populateForm(data: Invitation) {
    form.slug = data.slug || ''
    form.theme = data.theme || 'elegant'
    form.groom_name = data.groom_name || ''
    form.bride_name = data.bride_name || ''
    form.groom_full_name = data.groom_full_name || ''
    form.bride_full_name = data.bride_full_name || ''
    form.groom_father = data.groom_father || ''
    form.groom_mother = data.groom_mother || ''
    form.bride_father = data.bride_father || ''
    form.bride_mother = data.bride_mother || ''
    form.groom_photo = data.groom_photo || ''
    form.bride_photo = data.bride_photo || ''
    form.cover_photo = data.cover_photo || ''
    form.akad_date = data.akad_date || ''
    form.akad_time = data.akad_time || ''
    form.akad_venue = data.akad_venue || ''
    form.akad_address = data.akad_address || ''
    form.akad_map_url = data.akad_map_url || ''
    form.resepsi_date = data.resepsi_date || ''
    form.resepsi_time = data.resepsi_time || ''
    form.resepsi_venue = data.resepsi_venue || ''
    form.resepsi_address = data.resepsi_address || ''
    form.resepsi_map_url = data.resepsi_map_url || ''
    form.love_story = normalizeLoveStory(data.love_story)
    form.quote = data.quote || ''

    // Load banks: prefer banks array, fallback to legacy single fields
    if (data.banks && Array.isArray(data.banks) && data.banks.length > 0) {
      form.banks = data.banks
    } else if (data.bank_name) {
      form.banks = [{ bank_name: data.bank_name, bank_account: data.bank_account || '', bank_holder: data.bank_holder || '' }]
    } else {
      form.banks = []
    }

    form.music_url = data.music_url || ''
    form.gallery_type = data.gallery_type || getThemeGalleryDefault(data.theme || 'elegant')
    form.photos = data.photos || []
  }

  /** Get cleaned payload ready for API submission */
  function getSubmitPayload() {
    const filteredBanks = form.banks.filter((b) => b.bank_name || b.bank_account)
    return {
      ...toRaw(form),
      love_story: form.love_story.filter((s) => s.title || s.date),
      bank_name: filteredBanks[0]?.bank_name || '',
      bank_account: filteredBanks[0]?.bank_account || '',
      bank_holder: filteredBanks[0]?.bank_holder || '',
      banks: filteredBanks,
    }
  }

  // Love story helpers
  function addLoveStory() {
    form.love_story.push({ date: '', title: '', description: '', photo: '' })
  }

  function removeLoveStory(index: number) {
    form.love_story.splice(index, 1)
  }

  // Bank helpers
  function addBank() {
    if (form.banks.length < 2) {
      form.banks.push({ bank_name: '', bank_account: '', bank_holder: '' })
    }
  }

  function removeBank(index: number) {
    form.banks.splice(index, 1)
  }

  return {
    form,
    submitting,
    toast,
    showToast,
    populateForm,
    getSubmitPayload,
    addLoveStory,
    removeLoveStory,
    addBank,
    removeBank,
  }
}
