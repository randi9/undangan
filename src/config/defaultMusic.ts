/**
 * Default Music Per Template
 * 
 * Setiap tema undangan memiliki musik latar default yang tersimpan di R2.
 * User bisa mengganti atau menghapus musik jika mau.
 */

export interface DefaultMusicEntry {
  url: string;
  label: string;
}

export const DEFAULT_MUSIC: Record<string, DefaultMusicEntry> = {
  elegant: {
    url: "https://music.mengundanganda.com/elegant/Aku%20Jeje%20-%20Lihat%20Kebunku%20Taman%20Bunga.mp3",
    label: "Aku Jeje - Lihat Kebunku Taman Bunga",
  },
  elegant_blue: {
    url: "https://music.mengundanganda.com/elengant-blue/Christina%20Perri%20-%20A%20Thousand%20Years%20Piano%20%26%20Cello%20Cover%20-%20The%20Piano%20Guys.mp3",
    label: "Christina Perri - A Thousand Years (Piano & Cello)",
  },
  floral: {
    url: "https://music.mengundanganda.com/music%20flora/Nadhif%20Basalamah%20-%20bergema%20sampai%20selamanya%20Official%20Lyric%20Video.mp3",
    label: "Nadhif Basalamah - Bergema Sampai Selamanya",
  },
  minimalist: {
    url: "https://music.mengundanganda.com/minimalist/Love%20Story%20_%20Indila%20%E3%80%90Piano%20Cover%E3%80%91.mp3",
    label: "Love Story / Indila (Piano Cover)",
  },
  floral_blue: {
    url: "https://music.mengundanganda.com/music%20flora/Nadhif%20Basalamah%20-%20bergema%20sampai%20selamanya%20Official%20Lyric%20Video.mp3",
    label: "Nadhif Basalamah - Bergema Sampai Selamanya",
  },
};

/**
 * Mengecek apakah sebuah URL termasuk musik default (bukan upload user).
 * Berguna supaya saat hapus musik, kita tidak mencoba menghapus file default dari R2.
 */
export function isDefaultMusicUrl(url: string): boolean {
  return Object.values(DEFAULT_MUSIC).some((entry) => entry.url === url);
}
