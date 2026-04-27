/**
 * Static Sample Data for Theme Preview Pages
 *
 * Data dummy statis untuk halaman contoh undangan per tema.
 * Digunakan oleh SampleInvitationView.vue agar tidak perlu fetch API.
 */

import type { Invitation } from '@/types/invitation'
import { DEFAULT_MUSIC } from '@/config/defaultMusic'

/** Base sample data shared across all themes */
function createSampleInvitation(
  themeId: Invitation['theme'],
  overrides?: Partial<Invitation>,
): Invitation {
  const now = new Date()
  // Set wedding date ~3 months in the future so countdown always works
  const weddingDate = new Date(now.getFullYear(), now.getMonth() + 3, 15)
  const dateStr = weddingDate.toISOString().split('T')[0] || ''

  return {
    id: `sample-${themeId}`,
    slug: `sample-${themeId}`,
    theme: themeId,
    groom_name: 'Randi',
    bride_name: 'Dewi',
    groom_full_name: 'Muhammad Randi Saputra, S.Kom',
    bride_full_name: 'Dewi Anggraini, S.Pd',
    groom_father: 'Bpk. H. Ahmad Saputra',
    groom_mother: 'Ibu Hj. Siti Nurhaliza',
    bride_father: 'Bpk. Ir. Bambang Susilo',
    bride_mother: 'Ibu Dr. Ratna Sari',
    groom_photo: 'https://media.mengundanganda.com/contohfloralblue/d9b068084b65b42a1c08304387193b65.webp',
    bride_photo: 'https://media.mengundanganda.com/contohfloralblue/2b62609f4184a08dac690b4b5aefb1a0.webp',
    cover_photo: 'https://media.mengundanganda.com/contohfloralblue/ChatGPT%20Image%2027%20Apr%202026%2C%2015.19.40.webp', // fallback to themeConfig.coverImage
    akad_date: dateStr,
    akad_time: '08:00 - 10:00 WIB',
    akad_venue: 'Masjid Agung Al-Barkah',
    akad_address: 'Jl. Asia Afrika No. 123, Bandung, Jawa Barat',
    akad_map_url: 'https://www.google.com/maps/search/?api=1&query=-6.9219,107.6071',
    resepsi_date: dateStr,
    resepsi_time: '11:00 - 14:00 WIB',
    resepsi_venue: 'Gedung Sate Grand Ballroom',
    resepsi_address: 'Jl. Diponegoro No. 22, Bandung, Jawa Barat',
    resepsi_map_url: 'https://www.google.com/maps/search/?api=1&query=-6.9025,107.6188',
    love_story: [
      {
        date: '2020',
        title: 'Pertama Bertemu',
        description: 'Kami dipertemukan di acara seminar kampus. Tak pernah menyangka bahwa pertemuan singkat itu akan menjadi awal dari perjalanan cinta yang indah.',
        photo: 'https://media.mengundanganda.com/contohfloralblue/2b62609f4184a08dac690b4b5aefb1a0.webp'
      },
      {
        date: '2022',
        title: 'Mulai Serius',
        description: 'Setelah dua tahun saling mengenal, kami memutuskan untuk melangkah lebih serius. Dengan dukungan keluarga, hubungan kami semakin kuat.',
        photo: 'https://media.mengundanganda.com/contohfloralblue/ChatGPT%20Image%2027%20Apr%202026%2C%2015.19.40.webp'
      },
      {
        date: '2025',
        title: 'Lamaran',
        description: 'Dengan restu kedua orang tua, kami memantapkan hati untuk mengikat janji suci. Alhamdulillah, semua berjalan lancar.',
        photo: 'https://media.mengundanganda.com/contohfloralblue/d9b068084b65b42a1c08304387193b65.webp'
      },
    ],
    quote: '"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya." — QS. Ar-Rum: 21',
    bank_name: 'BCA',
    bank_account: '1234567890',
    bank_holder: 'Muhammad Randi S',
    banks: [
      { bank_name: 'BCA', bank_account: '1234567890', bank_holder: 'Muhammad Randi S' },
      { bank_name: 'Mandiri', bank_account: '0987654321', bank_holder: 'Dewi Anggraini' },
    ],
    music_url: DEFAULT_MUSIC[themeId]?.url || '',
    gallery_type: themeId === 'floral' || themeId === 'floral_blue' ? 'carousel' : 'masonry',
    streaming_enabled: false,
    photos: [
      { url: 'https://media.mengundanganda.com/contohfloralblue/d9b068084b65b42a1c08304387193b65.webp', caption: '' },
      { url: 'https://media.mengundanganda.com/contohfloralblue/Two_chibi_cats_202604221811.webp', caption: '' },
      { url: 'https://media.mengundanganda.com/contohfloralblue/Two_chibi_cats_202604221830.webp', caption: '' },
    ],
    rsvps: [
      {
        guest_name: 'Ahmad Fauzi',
        attendance: 'hadir',
        guest_count: 2,
        message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga sakinah, mawaddah, warahmah 💕',
        created_at: new Date(now.getTime() - 86400000 * 2).toISOString(),
      },
      {
        guest_name: 'Siti Aisyah',
        attendance: 'hadir',
        guest_count: 3,
        message: 'Barakallah fii kuma wa baraka alaikuma! Semoga lancar sampai hari H 🤲',
        created_at: new Date(now.getTime() - 86400000 * 3).toISOString(),
      },
      {
        guest_name: 'Budi Santoso',
        attendance: 'hadir',
        guest_count: 1,
        message: 'Congrats bro! InsyaAllah hadir. Semoga jadi keluarga yang bahagia 🎉',
        created_at: new Date(now.getTime() - 86400000 * 5).toISOString(),
      },
      {
        guest_name: 'Rina Marlina',
        attendance: 'hadir',
        guest_count: 2,
        message: 'Turut berbahagia! Semoga cintanya abadi selamanya ❤️',
        created_at: new Date(now.getTime() - 86400000 * 7).toISOString(),
      },
    ],
    payment_status: 'paid',
    is_trial: false,
    show_watermark: false,
    ...overrides,
  }
}

export const SAMPLE_INVITATIONS: Record<string, Invitation> = {
  floral_blue: createSampleInvitation('floral_blue'),
  elegant: createSampleInvitation('elegant'),
  floral: createSampleInvitation('floral'),
  minimalist: createSampleInvitation('minimalist'),
  elegant_blue: createSampleInvitation('elegant_blue'),
}
