/**
 * Centralized Theme Registry
 * 
 * Single source of truth for ALL theme data used across:
 * - ThemeCatalogView (theme cards)
 * - CreateInvitationView / EditInvitationView (theme picker modal)
 * - InvitationView (theme config for rendering)
 */

import type { ThemeConfig } from '@/types/theme'

export interface ThemeRegistryEntry {
  id: 'elegant' | 'minimalist' | 'floral' | 'elegant_blue'
  name: string
  description: string
  icon: string
  color: string
  defaultGalleryType: 'carousel' | 'masonry'
  /** Preview card styling for theme picker modals */
  previewStyle: {
    bg: string
    color: string
    headerText: string
    headerStyle: string
    nameText: string
    nameStyle: string
  }
  /** Full theme config for InvitationView rendering */
  themeConfig: ThemeConfig
}

export const THEME_REGISTRY: Record<string, ThemeRegistryEntry> = {
  elegant: {
    id: 'elegant',
    name: 'Elegant Gold',
    description: 'Mewah dengan sentuhan emas klasik',
    icon: 'solar:crown-bold-duotone',
    color: '#c9a96e',
    defaultGalleryType: 'masonry',
    previewStyle: {
      bg: '#2c2417',
      color: '#fff',
      headerText: 'The Wedding Of',
      headerStyle: "font-size: 8px; letter-spacing: 3px; color: #c9a96e; text-transform: uppercase;",
      nameText: 'Romeo & Juliet',
      nameStyle: "font-family: 'Great Vibes', cursive; font-size: 22px; margin-top: 4px;",
    },
    themeConfig: {
      name: 'elegant',
      bg: '#faf8f4',
      surface: '#f5efe6',
      primary: '#8b6f4e',
      secondary: '#c9a96e',
      text: '#3d3425',
      textLight: '#7a6e5d',
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      overlayGradient: 'linear-gradient(180deg, rgba(44,36,23,0.6) 0%, rgba(44,36,23,0.8) 100%)',
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1080&q=80',
    },
  },
  floral: {
    id: 'floral',
    name: 'Floral',
    description: 'Natural dan romantis dengan motif bunga',
    icon: 'solar:leaf-bold-duotone',
    color: '#4a5d4e',
    defaultGalleryType: 'carousel',
    previewStyle: {
      bg: '#4a5d4e',
      color: '#fff',
      headerText: 'The Wedding',
      headerStyle: "font-size: 8px; letter-spacing: 3px; color: #e6e0d4; text-transform: uppercase;",
      nameText: 'Romeo & Juliet',
      nameStyle: "font-family: 'Playfair Display', serif; font-size: 20px; font-style: italic; margin-top: 4px;",
    },
    themeConfig: {
      name: 'floral',
      bg: '#fdfbf7',
      surface: '#f4f6e9',
      primary: '#4a5d4e',
      secondary: '#8a9a5b',
      text: '#3d4a40',
      textLight: '#6b7a6e',
      fontHeading: "'Great Vibes', cursive",
      fontBody: "'Inter', sans-serif",
      overlayGradient: 'linear-gradient(180deg, rgba(74,93,78,0.5) 0%, rgba(74,93,78,0.8) 100%)',
      coverImage: 'https://media.mengundanganda.com/tema%20floral/8a5a275c-909d-448b-8d1d-adaa5a7a39f3.webp',
    },
  },
  minimalist: {
    id: 'minimalist',
    name: 'Clean Minimalist',
    description: 'Bersih dan modern dengan tipografi kuat',
    icon: 'solar:minimalistic-magnifer-bold-duotone',
    color: '#111111',
    defaultGalleryType: 'masonry',
    previewStyle: {
      bg: '#f9f9f9',
      color: '#111',
      headerText: 'Wedding',
      headerStyle: "font-size: 8px; letter-spacing: 5px; color: #666; text-transform: uppercase;",
      nameText: 'R & J',
      nameStyle: "font-family: 'Inter', sans-serif; font-weight: 300; font-size: 22px; margin-top: 4px; letter-spacing: -1px;",
    },
    themeConfig: {
      name: 'minimalist',
      bg: '#ffffff',
      surface: '#f9f9f9',
      primary: '#111111',
      secondary: '#666666',
      text: '#222222',
      textLight: '#555555',
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      overlayGradient: 'linear-gradient(180deg, rgba(17,17,17,0.3) 0%, rgba(17,17,17,0.7) 100%)',
      coverImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1080&q=80',
    },
  },
  elegant_blue: {
    id: 'elegant_blue',
    name: 'Elegant Blue',
    description: 'Elegan dengan nuansa biru navy',
    icon: 'solar:diamond-bold-duotone',
    color: '#1e3a8a',
    defaultGalleryType: 'masonry',
    previewStyle: {
      bg: '#1e3a8a',
      color: '#fff',
      headerText: 'The Wedding Of',
      headerStyle: "font-size: 8px; letter-spacing: 3px; color: #A3B5C3; text-transform: uppercase;",
      nameText: 'Romeo & Juliet',
      nameStyle: "font-family: 'Imperial Script', cursive; font-size: 28px; margin-top: 4px;",
    },
    themeConfig: {
      name: 'elegant_blue',
      bg: '#f8f9f9',
      surface: '#F8FAFC',
      primary: '#a8d0e6',
      secondary: '#1E293B',
      text: '#1E293B',
      textLight: '#64748B',
      fontHeading: "'Imperial Script', cursive",
      fontBody: "'Playfair Display', serif",
      overlayGradient: 'linear-gradient(180deg, rgba(30,41,59,0.4) 0%, rgba(30,41,59,0.85) 100%)',
      coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1080&q=80',
    },
  },
}

/** Helper: get gallery type default for a theme */
export function getThemeGalleryDefault(themeId: string): 'carousel' | 'masonry' {
  return THEME_REGISTRY[themeId]?.defaultGalleryType || 'carousel'
}

/** Helper: get ThemeConfig for InvitationView */
export function getThemeConfig(themeId: string): ThemeConfig {
  return THEME_REGISTRY[themeId]?.themeConfig || THEME_REGISTRY['elegant']!.themeConfig
}

/** All available theme IDs */
export const THEME_IDS = Object.keys(THEME_REGISTRY) as Array<ThemeRegistryEntry['id']>

/** All available themes as array (for iteration) */
export const THEME_LIST = Object.values(THEME_REGISTRY)
