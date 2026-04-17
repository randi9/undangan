import { ref } from 'vue'
import { useInvitationStore } from '@/stores/invitation'
import type { InvitationFormData } from './useInvitationForm'

const MAX_FILE_SIZE_MB = 20
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

export function usePhotoUpload(
  form: InvitationFormData,
  showToast: (type: string, message: string) => void
) {
  const store = useInvitationStore()
  const coverDragover = ref(false)
  const galleryDragover = ref(false)

  // Refs for hidden file inputs
  const groomPhotoInput = ref<HTMLInputElement>()
  const bridePhotoInput = ref<HTMLInputElement>()
  const coverPhotoInput = ref<HTMLInputElement>()
  const loveStoryPhotoInput = ref<HTMLInputElement>()
  let loveStoryPhotoTargetIndex = -1

  function triggerUpload(type: string) {
    if (type === 'groom') groomPhotoInput.value?.click()
    else if (type === 'bride') bridePhotoInput.value?.click()
    else if (type === 'cover') coverPhotoInput.value?.click()
  }

  async function handleSingleUpload(
    event: Event,
    field: 'groom_photo' | 'bride_photo' | 'cover_photo'
  ) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    if (file.size > MAX_FILE_SIZE_BYTES) {
      showToast('error', `Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal ${MAX_FILE_SIZE_MB}MB.`)
      input.value = ''
      return
    }
    try {
      const oldUrl = form[field]
      const url = await store.uploadPhoto(file, form.slug || undefined)
      if (oldUrl) {
        await store.deleteFile(oldUrl).catch(() => {})
      }
      form[field] = url
    } catch {
      showToast('error', 'Gagal upload foto')
    }
    input.value = ''
  }

  async function handleCoverDrop(event: DragEvent) {
    coverDragover.value = false
    const file = event.dataTransfer?.files[0]
    if (!file || !file.type.startsWith('image/')) return
    if (file.size > MAX_FILE_SIZE_BYTES) {
      showToast('error', `Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal ${MAX_FILE_SIZE_MB}MB.`)
      return
    }
    try {
      form.cover_photo = await store.uploadPhoto(file, form.slug || undefined)
    } catch {
      showToast('error', 'Gagal upload foto')
    }
  }

  async function removeCoverPhoto() {
    if (form.cover_photo) {
      await store.deleteFile(form.cover_photo).catch(() => {})
      form.cover_photo = ''
    }
  }

  async function removeGroomPhoto() {
    if (form.groom_photo) {
      await store.deleteFile(form.groom_photo).catch(() => {})
      form.groom_photo = ''
    }
  }

  async function removeBridePhoto() {
    if (form.bride_photo) {
      await store.deleteFile(form.bride_photo).catch(() => {})
      form.bride_photo = ''
    }
  }

  // Gallery
  async function handleGalleryUpload(event: Event) {
    const input = event.target as HTMLInputElement
    const files = Array.from(input.files || [])
    if (files.length === 0) return
    const oversized = files.filter(f => f.size > MAX_FILE_SIZE_BYTES)
    if (oversized.length > 0) {
      showToast('error', `${oversized.length} file melebihi batas ${MAX_FILE_SIZE_MB}MB dan dilewati.`)
    }
    const validFiles = files.filter(f => f.size <= MAX_FILE_SIZE_BYTES)
    if (validFiles.length === 0) {
      input.value = ''
      return
    }
    try {
      const results = await store.uploadPhotos(validFiles, form.slug || undefined)
      results.forEach((r) => {
        form.photos.push({ url: r.url, caption: '' })
      })
    } catch {
      showToast('error', 'Gagal upload foto')
    }
    input.value = ''
  }

  async function handleGalleryDrop(event: DragEvent) {
    galleryDragover.value = false
    const files = Array.from(event.dataTransfer?.files || []).filter((f) =>
      f.type.startsWith('image/')
    )
    if (files.length === 0) return
    const oversized = files.filter(f => f.size > MAX_FILE_SIZE_BYTES)
    if (oversized.length > 0) {
      showToast('error', `${oversized.length} file melebihi batas ${MAX_FILE_SIZE_MB}MB dan dilewati.`)
    }
    const validFiles = files.filter(f => f.size <= MAX_FILE_SIZE_BYTES)
    if (validFiles.length === 0) return
    try {
      const results = await store.uploadPhotos(validFiles, form.slug || undefined)
      results.forEach((r) => {
        form.photos.push({ url: r.url, caption: '' })
      })
    } catch {
      showToast('error', 'Gagal upload foto')
    }
  }

  async function removeGalleryPhoto(index: number) {
    const photo = form.photos[index]
    if (photo && photo.url) {
      await store.deleteFile(photo.url).catch(() => {})
    }
    form.photos.splice(index, 1)
  }

  // Love Story Photos
  function triggerLoveStoryPhotoUpload(index: number) {
    loveStoryPhotoTargetIndex = index
    loveStoryPhotoInput.value?.click()
  }

  async function handleLoveStoryPhotoUpload(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file || loveStoryPhotoTargetIndex < 0) return
    if (file.size > MAX_FILE_SIZE_BYTES) {
      showToast('error', `Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal ${MAX_FILE_SIZE_MB}MB.`)
      input.value = ''
      return
    }
    try {
      const url = await store.uploadPhoto(file, form.slug || undefined)
      const story = form.love_story[loveStoryPhotoTargetIndex]
      if (story) {
        if (story.photo) {
          await store.deleteFile(story.photo).catch(() => {})
        }
        story.photo = url
      }
    } catch {
      showToast('error', 'Gagal upload foto love story')
    }
    input.value = ''
    loveStoryPhotoTargetIndex = -1
  }

  async function removeLoveStoryPhoto(index: number) {
    const story = form.love_story[index]
    if (!story?.photo) return
    await store.deleteFile(story.photo).catch(() => {})
    story.photo = ''
  }

  return {
    coverDragover,
    galleryDragover,
    groomPhotoInput,
    bridePhotoInput,
    coverPhotoInput,
    loveStoryPhotoInput,
    triggerUpload,
    handleSingleUpload,
    handleCoverDrop,
    removeCoverPhoto,
    removeGroomPhoto,
    removeBridePhoto,
    handleGalleryUpload,
    handleGalleryDrop,
    removeGalleryPhoto,
    triggerLoveStoryPhotoUpload,
    handleLoveStoryPhotoUpload,
    removeLoveStoryPhoto,
  }
}
