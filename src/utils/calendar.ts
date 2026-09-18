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
      startHour: parseInt(rangeMatch[1]!),
      startMinute: parseInt(rangeMatch[2]!),
      endHour: parseInt(rangeMatch[3]!),
      endMinute: parseInt(rangeMatch[4]!),
    };
  }

  // Coba cari pola single time "HH:MM" atau "HH.MM"
  const singleMatch = timeStr.match(/(\d{1,2})[.:](\d{2})/);
  if (singleMatch) {
    return {
      startHour: parseInt(singleMatch[1]!),
      startMinute: parseInt(singleMatch[2]!),
      endHour: null,
      endMinute: null,
    };
  }

  return null;
}

/**
 * Parse "YYYY-MM-DD" (atau ISO dengan T) secara manual agar TIDAK
 * kena timezone-shift dari `new Date("YYYY-MM-DD")` (yang di-parse
 * sebagai UTC tengah malam lalu digeser zona lokal).
 */
function parseDateParts(dateStr: string): { y: number; m: number; d: number } | null {
  const match = dateStr.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!match) return null;
  const y = parseInt(match[1]!, 10);
  const m = parseInt(match[2]!, 10);
  const d = parseInt(match[3]!, 10);
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  return { y, m, d };
}

const pad2 = (n: number) => String(n).padStart(2, '0');

/**
 * Format tanggal ke format Google Calendar (YYYYMMDDTHHMMSS)
 * Menggunakan angka tanggal ASLI dari input (tanpa konversi UTC).
 */
function formatGCalDate(dateStr: string, hour: number, minute: number): string {
  const parts = parseDateParts(dateStr);
  if (!parts) {
    // Fallback terakhir: coba Date biasa
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}T${pad2(hour)}${pad2(minute)}00`;
  }
  return `${parts.y}${pad2(parts.m)}${pad2(parts.d)}T${pad2(hour)}${pad2(minute)}00`;
}

/**
 * Format tanggal untuk all-day event (YYYYMMDD)
 */
function formatGCalAllDay(dateStr: string): string {
  const parts = parseDateParts(dateStr);
  if (!parts) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}`;
  }
  return `${parts.y}${pad2(parts.m)}${pad2(parts.d)}`;
}

/** Tambah N hari ke YYYYMMDD (untuk end-date all-day & lembur lewat tengah malam). */
function addDaysToYMD(ymd: string, add: number): string {
  const y = parseInt(ymd.slice(0, 4), 10);
  const m = parseInt(ymd.slice(4, 6), 10) - 1;
  const d = parseInt(ymd.slice(6, 8), 10);
  const dt = new Date(y, m, d);
  dt.setDate(dt.getDate() + add);
  return `${dt.getFullYear()}${pad2(dt.getMonth() + 1)}${pad2(dt.getDate())}`;
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
    const clampH = (h: number) => Math.min(23, Math.max(0, h));
    const clampM = (m: number) => Math.min(59, Math.max(0, m));
    const sH = clampH(parsed.startHour);
    const sM = clampM(parsed.startMinute);
    const startDay = formatGCalAllDay(date);
    const start = formatGCalDate(date, sH, sM);
    if (!start || !startDay) return `${baseUrl}?${query.toString()}`;

    let end: string;
    if (parsed.endHour !== null && parsed.endMinute !== null) {
      const eH = clampH(parsed.endHour);
      const eM = clampM(parsed.endMinute);
      // Lewat tengah malam (end <= start) → end jatuh keesokan harinya
      if (eH * 60 + eM <= sH * 60 + sM) {
        const nextDay = addDaysToYMD(startDay, 1);
        end = `${nextDay}T${pad2(eH)}${pad2(eM)}00`;
      } else {
        end = formatGCalDate(date, eH, eM);
      }
    } else {
      // Tidak ada waktu akhir → default durasi 2 jam (bisa lewat tengah malam)
      const total = sH * 60 + sM + 120;
      const eH = Math.floor(total / 60) % 24;
      const eM = total % 60;
      const dayShift = Math.floor(total / (24 * 60));
      if (dayShift > 0) {
        const nextDay = addDaysToYMD(startDay, dayShift);
        end = `${nextDay}T${pad2(eH)}${pad2(eM)}00`;
      } else {
        end = formatGCalDate(date, eH, eM);
      }
    }

    // Gunakan timezone Asia/Jakarta agar Google Calendar menampilkan jam WIB dengan benar
    query.set('dates', `${start}/${end}`);
    query.set('ctz', 'Asia/Jakarta');
  } else {
    // Tidak bisa parse waktu → all-day event
    const startDay = formatGCalAllDay(date);
    if (!startDay) return `${baseUrl}?${query.toString()}`;
    // All-day end date harus +1 hari (exclusive end)
    const endDay = addDaysToYMD(startDay, 1);
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
