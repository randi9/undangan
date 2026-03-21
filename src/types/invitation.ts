export interface LoveStoryItem {
  date: string
  title: string
  description: string
}

export interface Photo {
  id?: string
  invitation_id?: string
  url: string
  caption: string
  sort_order?: number
}

export interface Rsvp {
  id?: string
  invitation_id?: string
  guest_name: string
  attendance: 'hadir' | 'tidak_hadir'
  guest_count: number
  message: string
  created_at?: string
}

export interface Invitation {
  id: string
  slug: string
  theme: 'elegant' | 'minimalist' | 'floral'
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
  love_story: string
  quote: string
  bank_name: string
  bank_account: string
  bank_holder: string
  photos?: Photo[]
  rsvps?: Rsvp[]
  photo_count?: number
  rsvp_count?: number
  created_at?: string
  updated_at?: string
}

export interface CreateInvitationPayload {
  slug: string
  theme: 'elegant' | 'minimalist' | 'floral'
  groom_name: string
  bride_name: string
  groom_full_name?: string
  bride_full_name?: string
  groom_father?: string
  groom_mother?: string
  bride_father?: string
  bride_mother?: string
  groom_photo?: string
  bride_photo?: string
  cover_photo?: string
  akad_date?: string
  akad_time?: string
  akad_venue?: string
  akad_address?: string
  akad_map_url?: string
  resepsi_date?: string
  resepsi_time?: string
  resepsi_venue?: string
  resepsi_address?: string
  resepsi_map_url?: string
  love_story?: LoveStoryItem[]
  quote?: string
  bank_name?: string
  bank_account?: string
  bank_holder?: string
  photos?: Photo[]
}
