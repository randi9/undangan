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

const sharedSampleData: Partial<Invitation> = {
  groom_name: 'John',
  bride_name: 'Sarah',
  groom_full_name: 'Johnathan Smith, B.Eng',
  bride_full_name: 'Sarah Anderson, M.A.',
  groom_father: 'Bpk. Robert Smith',
  groom_mother: 'Ibu Mary Smith',
  bride_father: 'Bpk. David Anderson',
  bride_mother: 'Ibu Linda Anderson',
  cover_photo: 'https://media.mengundanganda.com/contohfloralblue/john_b61f447b-e019-439c-b4c5-883d5cb595d3.webp',
  groom_photo: 'https://media.mengundanganda.com/contohfloralblue/john_623eb92f-6788-416f-b69f-282de349c78d.webp',
  bride_photo: 'https://media.mengundanganda.com/contohfloralblue/john_d6989aed-53da-4f43-bd1b-f22b3a545150.webp',
  love_story: [
    {
      date: '2023',
      title: 'Perjalanan',
      description: 'Cerita kami tidak bermula dari tatapan pertama yang dramatis, melainkan dari keberanian untuk mulai melangkah dan menjelajah bersama. Dua paspor di tangan satu merah, satu hijau—serta sepasang tiket penerbangan hari itu menjadi saksi bisu pergeseran hubungan kami. Di tengah hiruk-pikuk terminal keberangkatan, saat jemari kami bertaut memegang lembaran tiket itu, kami menyadari satu hal: ini bukan lagi sekadar rencana liburan biasa. Ini adalah cap stempel pertama untuk perjalanan panjang yang kami sebut masa depan. Ke mana pun koordinat tujuannya, asalkan kursi di sebelah diisi olehnya, aku siap terbang.',
      photo: 'https://media.mengundanganda.com/contohfloralblue/john_c6e1ab88-8f69-445a-bd39-61a265debf70.webp'
    },
    {
      date: '2024',
      title: 'Bersamamu',
      description: 'Dari semua perjalanan jauh yang kami tempuh, tempat favorit kami nyatanya selalu kembali pada hal-hal yang sederhana. Seperti sore itu, di sudut kafe kayu langganan kami. Di balik buku menu vintage dan dua cangkir kopi yang aromanya memenuhi meja, kami menemukan rumah. Kami bisa menertawakan hal-hal kecil yang tidak masuk akal, atau berdebat ringan tentang siapa yang akan menghabiskan kue terakhir. Di momen-momen santai inilah, ditemani candaan lepas dan tawa yang menggema, kami menemukan kenyamanan yang paling jujur. Bahwa cinta sejati adalah saat kamu bisa menjadi dirimu yang paling lepas, tanpa perlu berpura-pura.',
      photo: 'https://media.mengundanganda.com/contohfloralblue/john_8cccf482-b5d1-4c8a-a3d7-9ae7004cab42.webp'
    },
    {
      date: '2026',
      title: 'Hidup Bersama',
      description: 'Pada akhirnya, cinta adalah tentang bagaimana kita saling merawat setiap harinya. Setelah semua hiruk-pikuk petualangan dan tawa di kedai kopi, kami selalu menemukan waktu untuk menepi sejenak dan merayakan kehadiran satu sama lain. Di bawah cahaya matahari yang lembut, di hamparan rumput taman yang tengah mekar, dunia terasa berhenti sejenak hanya untuk kami. Ditemani keranjang anyaman dan manisnya buah segar, gestur sesederhana menuangkan segelas jus jeruk untuknya adalah bahasa tak bersuara untuk berkata, "Aku di sini, dan akan selalu menjagamu." Layaknya taman bunga ini, begitu pulalah kami akan terus merawat kisah ini agar senantiasa tumbuh, mekar, dan menenangkan.',
      photo: 'https://media.mengundanganda.com/contohfloralblue/john_a10ef384-9578-4c17-9d95-f34ce1b2e6ca.webp'
    },
  ],
  photos: [
    { url: 'https://media.mengundanganda.com/contohfloralblue/john_19709c81-d082-48f3-bfce-3b1e6c9c520c.webp', caption: '' },
    { url: 'https://media.mengundanganda.com/contohfloralblue/john_2d8fc553-f7dd-41ee-8e07-f314dea522aa.webp', caption: '' },
    { url: 'https://media.mengundanganda.com/contohfloralblue/john_4c19e1d2-4a15-453d-a622-e437b730b99b.webp', caption: '' },
    { url: 'https://media.mengundanganda.com/contohfloralblue/john_8c936982-a0d1-4816-aadc-5a5698232bbd.webp', caption: '' },
  ],
  streaming_enabled: true,
  streaming_url: 'https://youtu.be/kY9CpANAjos?si=DctHDw5EuXavKk3P',
  bank_holder: 'Johnathan Smith',
  banks: [
    { bank_name: 'BCA', bank_account: '1234567890', bank_holder: 'Johnathan Smith' },
    { bank_name: 'Mandiri', bank_account: '0987654321', bank_holder: 'Sarah Anderson' },
  ],
};

export const SAMPLE_INVITATIONS: Record<string, Invitation> = {
  floral_blue: createSampleInvitation('floral_blue', sharedSampleData),
  elegant: createSampleInvitation('elegant'),
  floral: createSampleInvitation('floral', sharedSampleData),
  minimalist: createSampleInvitation('minimalist'),
  elegant_blue: createSampleInvitation('elegant_blue', sharedSampleData),
}
