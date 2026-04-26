import { ref } from 'vue'
import { useInvitationStore } from '@/stores/invitation'
import type { InvitationFormData } from './useInvitationForm'

const MAX_FILE_SIZE_MB = 20
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

// Crop config per field type
type CropField = 'groom_photo' | 'bride_photo' | 'cover_photo' | 'love_story'

const CROP_CONFIG: Record<CropField, { aspectRatio: number; stencilShape: 'circle' | 'rectangle' }> = {
  cover_photo: { aspectRatio: 3 / 4, stencilShape: 'rectangle' },
  groom_photo: { aspectRatio: 1, stencilShape: 'circle' },
  bride_photo: { aspectRatio: 1, stencilShape: 'circle' },
  love_story: { aspectRatio: 16 / 9, stencilShape: 'rectangle' },
}

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

  // === Crop Modal State ===
  const cropModalOpen = ref(false)
  const cropImageSrc = ref('')
  const cropAspectRatio = ref(1)
  const cropStencilShape = ref<'circle' | 'rectangle'>('rectangle')
  // Internal: track which field the crop is for
  let pendingCropField: CropField | null = null
  let pendingOldUrl = ''

  function triggerUpload(type: string) {
    if (type === 'groom') groomPhotoInput.value?.click()
    else if (type === 'bride') bridePhotoInput.value?.click()
    else if (type === 'cover') coverPhotoInput.value?.click()
  }

  // Read file as data URL for crop preview
  function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Open crop modal for a given file and field
  async function openCropModal(file: File, field: CropField, oldUrl: string = '') {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      showToast('error', `Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal ${MAX_FILE_SIZE_MB}MB.`)
      return
    }
    try {
      const dataUrl = await readFileAsDataURL(file)
      const config = CROP_CONFIG[field]
      cropImageSrc.value = dataUrl
      
      if (field === 'love_story') {
        const theme = form.theme || 'minimalist'
        if (theme === 'elegant' || theme === 'elegant_blue') {
          cropAspectRatio.value = 4 / 3
        } else if (theme === 'floral_blue') {
          cropAspectRatio.value = 1 / 1
        } else if (theme === 'floral') {
          cropAspectRatio.value = 3 / 2
        } else {
          cropAspectRatio.value = 16 / 9
        }
      } else {
        cropAspectRatio.value = config.aspectRatio
      }
      
      cropStencilShape.value = config.stencilShape
      pendingCropField = field
      pendingOldUrl = oldUrl
      cropModalOpen.value = true
    } catch {
      showToast('error', 'Gagal membaca file gambar')
    }
  }

  // Handle crop confirm — upload the cropped blob
  async function handleCropConfirm(blob: Blob) {
    if (!pendingCropField) return
    const field = pendingCropField
    const oldUrl = pendingOldUrl

    try {
      // Convert blob to File for upload
      const file = new File([blob], `cropped-${Date.now()}.webp`, { type: 'image/webp' })
      console.log('[CropConfirm] Uploading cropped file:', field, 'size:', file.size)

      if (field === 'love_story') {
        const url = await store.uploadPhoto(file, form.slug || undefined)
        console.log('[CropConfirm] Love story upload result:', url)
        const story = form.love_story[loveStoryPhotoTargetIndex]
        if (story) {
          if (story.photo) {
            await store.deleteFile(story.photo).catch(() => {})
          }
          story.photo = url
        }
        loveStoryPhotoTargetIndex = -1
      } else {
        // Delete old photo if exists
        if (oldUrl) {
          await store.deleteFile(oldUrl).catch(() => {})
        }
        const url = await store.uploadPhoto(file, form.slug || undefined)
        console.log('[CropConfirm] Upload result for', field, ':', url)
        form[field] = url
      }
    } catch (err) {
      console.error('[CropConfirm] Upload failed:', err)
      showToast('error', 'Gagal upload foto')
    }

    // Reset crop state
    cropModalOpen.value = false
    cropImageSrc.value = ''
    pendingCropField = null
    pendingOldUrl = ''
  }

  function handleCropCancel() {
    cropModalOpen.value = false
    cropImageSrc.value = ''
    pendingCropField = null
    pendingOldUrl = ''
    loveStoryPhotoTargetIndex = -1
  }

  // Single upload (groom, bride, cover) — now opens crop modal instead of direct upload
  async function handleSingleUpload(
    event: Event,
    field: 'groom_photo' | 'bride_photo' | 'cover_photo'
  ) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    await openCropModal(file, field, form[field])
    input.value = ''
  }

  async function handleCoverDrop(event: DragEvent) {
    coverDragover.value = false
    const file = event.dataTransfer?.files[0]
    if (!file || !file.type.startsWith('image/')) return
    await openCropModal(file, 'cover_photo', form.cover_photo)
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

  // Gallery — NO crop, direct upload (gallery photos are displayed as-is)
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

  // Love Story Photos — now opens crop modal
  function triggerLoveStoryPhotoUpload(index: number) {
    loveStoryPhotoTargetIndex = index
    loveStoryPhotoInput.value?.click()
  }

  async function handleLoveStoryPhotoUpload(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file || loveStoryPhotoTargetIndex < 0) return
    await openCropModal(file, 'love_story', form.love_story[loveStoryPhotoTargetIndex]?.photo || '')
    input.value = ''
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
    // Crop modal state & handlers
    cropModalOpen,
    cropImageSrc,
    cropAspectRatio,
    cropStencilShape,
    handleCropConfirm,
    handleCropCancel,
  }
}
