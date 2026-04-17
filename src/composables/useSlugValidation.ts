import { ref, type Ref } from 'vue'

export function useSlugValidation(
  slugRef: Ref<string>,
  excludeId?: Ref<string | undefined>
) {
  const slugStatus = ref<'idle' | 'loading' | 'available' | 'taken'>('idle')
  const slugSuggestions = ref<string[]>([])
  let slugCheckTimeout: ReturnType<typeof setTimeout> | null = null

  function handleSlugInput() {
    // Sanitize slug
    slugRef.value = slugRef.value
      .toLowerCase()
      .slice(0, 50)
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')

    slugSuggestions.value = []

    if (!slugRef.value) {
      slugStatus.value = 'idle'
      return
    }

    slugStatus.value = 'loading'

    if (slugCheckTimeout) clearTimeout(slugCheckTimeout)
    slugCheckTimeout = setTimeout(async () => {
      try {
        const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api'
        let url = `${API_BASE}/invitations/check-slug/${slugRef.value}`
        if (excludeId?.value) {
          url += `?exclude_id=${excludeId.value}`
        }
        const res = await fetch(url)
        const data = await res.json()

        if (res.ok) {
          slugStatus.value = data.available ? 'available' : 'taken'
          if (!data.available && data.suggestions) {
            slugSuggestions.value = data.suggestions
          }
        } else {
          slugStatus.value = 'idle'
        }
      } catch {
        slugStatus.value = 'idle'
      }
    }, 500)
  }

  function applySuggestion(suggestion: string) {
    slugRef.value = suggestion
    slugSuggestions.value = []
    slugStatus.value = 'loading'
    setTimeout(async () => {
      try {
        const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api'
        let url = `${API_BASE}/invitations/check-slug/${slugRef.value}`
        if (excludeId?.value) {
          url += `?exclude_id=${excludeId.value}`
        }
        const res = await fetch(url)
        const data = await res.json()
        if (res.ok) {
          slugStatus.value = data.available ? 'available' : 'taken'
          if (!data.available && data.suggestions) {
            slugSuggestions.value = data.suggestions
          }
        }
      } catch {
        slugStatus.value = 'idle'
      }
    }, 100)
  }

  return {
    slugStatus,
    slugSuggestions,
    handleSlugInput,
    applySuggestion,
  }
}
