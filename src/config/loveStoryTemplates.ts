import type { LoveStoryItem } from '@/types/invitation'

export interface LoveStoryTemplate {
  id: string
  category: 'Sekolah' | 'Pekerjaan' | "Ta'aruf" | 'Sosial Media'
  title: string
  description: string
  stories: LoveStoryItem[]
}

export const LOVE_STORY_TEMPLATES: LoveStoryTemplate[] = [
  // ===== Jalur Sekolah / Kampus =====
  {
    id: 'sekolah-1',
    category: 'Sekolah',
    title: 'Cinta Dari Bangku Sekolah',
    description: 'Berawal dari teman sekelas yang selalu bertemu setiap hari.',
    stories: [
      {
        date: '2018',
        title: 'Pertama Bertemu',
        description: 'Takdir mempertemukan kami di bangku sekolah. Awalnya hanya saling sapa, tapi hati sudah mulai berbicara.',
      },
      {
        date: '2021',
        title: 'Menjalin Kasih',
        description: 'Dari teman biasa menjadi sahabat, hingga akhirnya kami menyadari bahwa perasaan ini lebih dari sekadar persahabatan.',
      },
      {
        date: '2025',
        title: 'Menuju Pelaminan',
        description: 'Setelah melewati banyak cerita bersama, kami memantapkan hati untuk melangkah ke jenjang pernikahan.',
      },
    ],
  },
  {
    id: 'sekolah-2',
    category: 'Sekolah',
    title: 'Kisah Cinta Anak Kampus',
    description: 'Berawal dari organisasi kampus yang mempertemukan dua hati.',
    stories: [
      {
        date: '2019',
        title: 'Bertemu di Kampus',
        description: 'Kami dipertemukan dalam sebuah kegiatan organisasi. Awalnya hanya rekan kerja tim, tapi chemistry tak bisa dibohongi.',
      },
      {
        date: '2022',
        title: 'Merajut Mimpi Bersama',
        description: 'Dari mengerjakan tugas bersama hingga menemani satu sama lain meraih gelar sarjana. Kami tumbuh bersama.',
      },
      {
        date: '2025',
        title: 'Hari Bahagia',
        description: 'Kini saatnya kami menorehkan babak baru. Dari teman kampus, menjadi teman hidup selamanya.',
      },
    ],
  },

  // ===== Jalur Pekerjaan / Cinlok =====
  {
    id: 'kerja-1',
    category: 'Pekerjaan',
    title: 'Cinta Lokasi (Cinlok)',
    description: 'Dari rekan kerja satu divisi menjadi pasangan hidup.',
    stories: [
      {
        date: '2020',
        title: 'Rekan Satu Tim',
        description: 'Awalnya kami hanya rekan kerja biasa. Setiap hari bertemu di kantor, tanpa sadar mulai terbiasa dengan kehadiran satu sama lain.',
      },
      {
        date: '2022',
        title: 'Lebih dari Rekan Kerja',
        description: 'Dari makan siang bersama, hingga menjadi tempat curhat satu sama lain. Kami sadar perasaan ini sudah berubah menjadi cinta.',
      },
      {
        date: '2025',
        title: 'Berjanji Selamanya',
        description: 'Kini kami siap meninggalkan status rekan kerja, dan memulai proyek terbesar dalam hidup kami — pernikahan.',
      },
    ],
  },
  {
    id: 'kerja-2',
    category: 'Pekerjaan',
    title: 'Bertemu di Dunia Profesional',
    description: 'Pertemuan di konferensi industri yang berujung pada cinta sejati.',
    stories: [
      {
        date: '2021',
        title: 'Kenal di Acara Kantor',
        description: 'Kami pertama kali bertemu di sebuah acara networking profesional. Satu obrolan singkat yang ternyata mengubah segalanya.',
      },
      {
        date: '2023',
        title: 'Saling Melengkapi',
        description: 'Dari dunia kerja yang berbeda, kami menemukan kesamaan visi dan mimpi. Saling mendukung karir masing-masing.',
      },
      {
        date: '2025',
        title: 'Menikah',
        description: 'Kami memutuskan untuk menyatukan langkah, bukan hanya dalam karir, tapi juga dalam kehidupan rumah tangga.',
      },
    ],
  },

  // ===== Jalur Ta'aruf =====
  {
    id: 'taaruf-1',
    category: "Ta'aruf",
    title: 'Perkenalan Islami (Ta\'aruf)',
    description: 'Proses mengenal yang dijaga oleh keluarga dan nilai-nilai agama.',
    stories: [
      {
        date: '2024',
        title: 'Dipertemukan Melalui Keluarga',
        description: 'Allah mempertemukan kami melalui perantara keluarga. Proses ta\'aruf dimulai dengan niat baik dan ridho orang tua.',
      },
      {
        date: '2024',
        title: 'Proses Khitbah',
        description: 'Setelah saling mengenal dalam batas syariat, keluarga besar dari kedua belah pihak bermusyawarah dan menyetujui ikatan ini.',
      },
      {
        date: '2025',
        title: 'Akad Nikah',
        description: 'Dengan bismillah dan ridho Allah SWT, kami siap melangkah ke jenjang pernikahan. Semoga menjadi keluarga sakinah, mawaddah, wa rahmah.',
      },
    ],
  },
  {
    id: 'taaruf-2',
    category: "Ta'aruf",
    title: 'Perjodohan yang Indah',
    description: 'Bermula dari perjodohan orang tua yang ternyata menyimpan kecocokan hati.',
    stories: [
      {
        date: '2024',
        title: 'Pertemuan Pertama',
        description: 'Kami dipertemukan oleh kedua orang tua kami. Awalnya canggung, tapi kami merasakan ketenangan di hati masing-masing.',
      },
      {
        date: '2024',
        title: 'Meyakinkan Hati',
        description: 'Melalui proses ta\'aruf yang menjaga adab, kami perlahan saling memahami dan meyakini bahwa inilah pilihan terbaik dari-Nya.',
      },
      {
        date: '2025',
        title: 'Melangkah Bersama',
        description: 'Dengan penuh keyakinan dan doa restu keluarga, kami siap membangun rumah tangga yang penuh berkah.',
      },
    ],
  },

  // ===== Jalur Sosial Media =====
  {
    id: 'sosmed-1',
    category: 'Sosial Media',
    title: 'Berawal dari DM Instagram',
    description: 'Satu pesan singkat di sosial media yang mengawali segalanya.',
    stories: [
      {
        date: '2020',
        title: 'Saling Follow',
        description: 'Semuanya bermula dari tombol follow di Instagram. Dari like foto menjadi DM, dan dari DM menjadi obrolan panjang setiap malam.',
      },
      {
        date: '2022',
        title: 'Kopi Darat Pertama',
        description: 'Setelah berbulan-bulan chatting, kami akhirnya bertemu langsung. Momen itu mengkonfirmasi apa yang selama ini kami rasakan.',
      },
      {
        date: '2025',
        title: 'Dari Online ke Offline Selamanya',
        description: 'Kini status kami bukan lagi "In a relationship" — tapi resmi menjadi suami istri. Love story yang dimulai dari layar HP.',
      },
    ],
  },
  {
    id: 'sosmed-2',
    category: 'Sosial Media',
    title: 'Jodoh di Era Digital',
    description: 'Dipertemukan oleh algoritma, disatukan oleh takdir.',
    stories: [
      {
        date: '2021',
        title: 'Terhubung Secara Online',
        description: 'Di tengah pandemi, kami justru menemukan satu sama lain di dunia maya. Dari video call berjam-jam hingga menjadi bagian dari keseharian.',
      },
      {
        date: '2023',
        title: 'Memutuskan untuk Serius',
        description: 'Jarak yang awalnya memisahkan, justru membuat kami semakin yakin. Kami memperkenalkan diri ke keluarga masing-masing.',
      },
      {
        date: '2025',
        title: 'Happily Ever After',
        description: 'Dari layar menjadi nyata. Kami membuktikan bahwa cinta sejati tak mengenal jarak dan media. Kini saatnya bersatu selamanya.',
      },
    ],
  },
]
