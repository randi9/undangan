import { ref, computed } from 'vue'
import { useInvitationStore } from '@/stores/invitation'
import { DEFAULT_MUSIC, isDefaultMusicUrl } from '@/config/defaultMusic'
import type { InvitationFormData } from './useInvitationForm'

const MAX_FILE_SIZE_MB = 20
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

interface MusicItem {
  id: string
  title: string
  artist: string
  url: string
}

export function useMusicManager(
  form: InvitationFormData,
  showToast: (type: string, message: string) => void
) {
  const store = useInvitationStore()
  const apiBase = import.meta.env.VITE_API_URL || ''

  const showMusicModal = ref(false)
  const musicLibrary = ref<MusicItem[]>([])
  const musicLibraryLoading = ref(false)
  const searchMusicQuery = ref('')
  const musicFileInput = ref<HTMLInputElement>()

  const filteredMusicLibrary = computed(() => {
    const q = searchMusicQuery.value.toLowerCase().trim()
    if (!q) return musicLibrary.value
    return musicLibrary.value.filter(m =>
      m.title.toLowerCase().includes(q) ||
      (m.artist && m.artist.toLowerCase().includes(q))
    )
  })

  async function openMusicLibrary() {
    showMusicModal.value = true
    searchMusicQuery.value = ''
    if (musicLibrary.value.length === 0) {
      musicLibraryLoading.value = true
      try {
        const res = await fetch(`${apiBase}/api/music`)
        if (res.ok) {
          musicLibrary.value = await res.json()
        }
      } catch (err) {
        console.error('Gagal mengambil pustaka lagu', err)
      } finally {
        musicLibraryLoading.value = false
      }
    }
  }

  function selectMusicFromLibrary(music: MusicItem) {
    form.music_url = music.url
    showMusicModal.value = false
    showToast('success', 'Musik latar berhasil diganti')
  }

  async function handleMusicUpload(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    if (file.size > MAX_FILE_SIZE_BYTES) {
      showToast('error', `Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal ${MAX_FILE_SIZE_MB}MB.`)
      input.value = ''
      return
    }
    try {
      const url = await store.uploadMusic(file, form.slug || undefined)
      if (form.music_url) {
        await store.deleteFile(form.music_url).catch(() => {})
      }
      form.music_url = url
      showToast('success', 'Musik berhasil diupload')
    } catch {
      showToast('error', 'Gagal upload musik')
    }
    input.value = ''
  }

  async function removeMusic() {
    if (form.music_url) {
      if (!isDefaultMusicUrl(form.music_url)) {
        await store.deleteFile(form.music_url).catch(() => {})
      }
      form.music_url = ''
    }
  }

  function restoreDefaultMusic() {
    const defaultEntry = DEFAULT_MUSIC[form.theme]
    if (defaultEntry) {
      form.music_url = defaultEntry.url
    }
  }

  const isCurrentMusicDefault = computed(() => {
    return isDefaultMusicUrl(form.music_url)
  })

  const currentDefaultMusicLabel = computed(() => {
    const entry = Object.values(DEFAULT_MUSIC).find((e) => e.url === form.music_url)
    return entry?.label || 'Musik Default'
  })

  return {
    showMusicModal,
    musicLibrary,
    musicLibraryLoading,
    searchMusicQuery,
    filteredMusicLibrary,
    musicFileInput,
    openMusicLibrary,
    selectMusicFromLibrary,
    handleMusicUpload,
    removeMusic,
    restoreDefaultMusic,
    isCurrentMusicDefault,
    currentDefaultMusicLabel,
  }
}
