/**
 * Google Calendar URL Generator
 * 
 * Menghasilkan URL pre-filled untuk Google Calendar dari data undangan.
 * Tamu tinggal klik tombol → Google Calendar terbuka dengan data terisi → klik "Simpan".
 */

/**
 * Parse waktu dari format free-text (misal "08:00 - 10:00 WIB", "08.00", dsb)
 * Mengembalikan { startHour, startMinute, endHour, endMinute } atau null jika gagal.
 */
function parseEventTime(timeStr: string | undefined | null): {
  startHour: number;
  startMinute: number;
  endHour: number | null;
  endMinute: number | null;
} | null {
  if (!timeStr) return null;

  // Coba cari pola "HH:MM - HH:MM" atau "HH.MM - HH.MM"
  const rangeMatch = timeStr.match(/(\d{1,2})[.:](\d{2})\s*[-–]\s*(\d{1,2})[.:](\d{2})/);
  if (rangeMatch) {
    return {
      startHour: parseInt(rangeMatch[1]),
      startMinute: parseInt(rangeMatch[2]),
      endHour: parseInt(rangeMatch[3]),
      endMinute: parseInt(rangeMatch[4]),
    };
  }

  // Coba cari pola single time "HH:MM" atau "HH.MM"
  const singleMatch = timeStr.match(/(\d{1,2})[.:](\d{2})/);
  if (singleMatch) {
    return {
      startHour: parseInt(singleMatch[1]),
      startMinute: parseInt(singleMatch[2]),
      endHour: null,
      endMinute: null,
    };
  }

  return null;
}

/**
 * Format tanggal ke format Google Calendar (YYYYMMDDTHHMMSS)
 * Menggunakan waktu lokal (WIB/zona pengguna) tanpa konversi UTC.
 */
function formatGCalDate(dateStr: string, hour: number, minute: number): string {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const h = String(hour).padStart(2, '0');
  const m = String(minute).padStart(2, '0');
  return `${year}${month}${day}T${h}${m}00`;
}

/**
 * Format tanggal untuk all-day event (YYYYMMDD)
 */
function formatGCalAllDay(dateStr: string): string {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

export interface CalendarEventParams {
  title: string;
  date: string;           // Format: "2026-12-25"
  time?: string | null;   // Format bebas: "08:00 - 10:00 WIB", "08.00", dsb
  venue?: string | null;
  address?: string | null;
  description?: string;
}

/**
 * Generate URL Google Calendar yang pre-filled dengan data acara.
 * 
 * Contoh output:
 * https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+...&dates=20261225T080000/20261225T100000&...
 */
export function generateGoogleCalendarUrl(params: CalendarEventParams): string {
  const { title, date, time, venue, address, description } = params;

  const baseUrl = 'https://calendar.google.com/calendar/render';
  const query = new URLSearchParams();

  query.set('action', 'TEMPLATE');
  query.set('text', title);

  // Parse waktu
  const parsed = parseEventTime(time);

  if (parsed) {
    const start = formatGCalDate(date, parsed.startHour, parsed.startMinute);

    let end: string;
    if (parsed.endHour !== null && parsed.endMinute !== null) {
      // Ada waktu akhir eksplisit
      end = formatGCalDate(date, parsed.endHour, parsed.endMinute);
    } else {
      // Tidak ada waktu akhir → default durasi 2 jam
      const endHour = parsed.startHour + 2;
      end = formatGCalDate(date, endHour, parsed.startMinute);
    }

    // Gunakan timezone Asia/Jakarta agar Google Calendar menampilkan jam WIB dengan benar
    query.set('dates', `${start}/${end}`);
    query.set('ctz', 'Asia/Jakarta');
  } else {
    // Tidak bisa parse waktu → all-day event
    const startDay = formatGCalAllDay(date);
    // All-day end date harus +1 hari (exclusive end)
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    const endDay = formatGCalAllDay(d.toISOString().split('T')[0]);
    query.set('dates', `${startDay}/${endDay}`);
  }

  // Lokasi
  const locationParts: string[] = [];
  if (venue) locationParts.push(venue);
  if (address) locationParts.push(address);
  if (locationParts.length > 0) {
    query.set('location', locationParts.join(', '));
  }

  // Deskripsi
  if (description) {
    query.set('details', description);
  }

  return `${baseUrl}?${query.toString()}`;
}
