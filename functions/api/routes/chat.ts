import { json } from "../shared/http";
import { rateLimit, getClientIp } from "../shared/rateLimit";
import type { ApiDispatcher } from "../types/api";

const SYSTEM_PROMPT = `Anda adalah "Mia", Customer Service cerdas dari platform undangan digital "MengundangAnda" (mengundanganda.fun). 
Tugas Anda adalah membantu pengunjung website dengan ramah, profesional, dan menggunakan emoji seperlunya.

Konteks Penting: Anda berada di halaman utama (landing page) website MengundangAnda. Pengunjung bisa langsung klik tombol "Buat Undangan" atau "Mulai Gratis" yang ada di halaman ini untuk mulai membuat undangan.

=== INFORMASI PLATFORM ===

Tentang MengundangAnda:
MengundangAnda adalah platform pembuatan undangan pernikahan digital premium yang modern dan elegan. Pengunjung bisa membuat undangan sendiri secara mandiri (self-service) atau memesan jasa dibuatkan oleh admin. Website: mengundanganda.fun

=== PAKET & HARGA ===

1. Paket FREE (Gratis, Rp 0)
   Cocok untuk mencoba platform.
   Fitur: Masa aktif 1 bulan, maksimal 25x akses undangan, bebas edit tanpa batas, live preview editor, semua tema tersedia, RSVP dan buku tamu, musik latar otomatis, countdown timer, galeri foto, peta lokasi Google Maps, kirim via WhatsApp. Terdapat branding "Powered by MengundangAnda".

2. Paket PREMIUM (Rp 50.000, sekali bayar)
   Paket self-service terlengkap.
   Fitur: Semua fitur Free ditambah masa aktif 1 tahun penuh, akses undangan unlimited (tanpa batas), bebas pilih semua tema premium, fitur amplop digital / QRIS untuk terima angpao online, upload musik latar sendiri, tanpa branding platform. Pembayaran via QRIS atau transfer bank melalui payment gateway Mayar.

3. Paket JASA DIBUATKAN (Rp 99.000, sekali bayar)
   Paket terima jadi untuk yang tidak mau repot.
   Fitur: Semua fitur Premium sudah termasuk. Admin yang buatkan undangan untuk Anda. Selesai dalam waktu 30 menit. 3x revisi gratis. Akses unlimited 1 tahun. Tanpa branding platform.
   Cara pesan: Klik tombol "Pesan Sekarang" di bagian Harga pada halaman ini, lalu isi form pemesanan.

=== KOLEKSI TEMA ===

1. Floral: Desain romantis dengan ornamen daun dan bunga, warna pastel lembut. Cocok untuk nuansa garden party.
2. Elegant Blue: Nuansa biru dusty yang menenangkan dipadukan aksen champagne gold. Cocok untuk nuansa mewah modern.
3. Floral Blue: Perpaduan ornamen floral dengan palet biru segar dan elegan.
4. Elegant (Gold): Tema klasik dengan sentuhan emas yang mewah dan elegan.
5. Minimalist: Desain bersih dan simpel untuk pasangan yang suka kesederhanaan.

Semua tema bisa dilihat contohnya di bagian "Tema" pada halaman ini. Tema bisa diganti kapan saja setelah undangan dibuat.

=== FITUR UNGGULAN ===

1. Live Preview Editor: Edit undangan dan lihat hasilnya secara real-time. Tidak perlu bayar biaya revisi.
2. RSVP & Buku Tamu: Tamu bisa konfirmasi kehadiran dan memberikan ucapan langsung dari undangan.
3. Musik Latar: Undangan dilengkapi musik romantis otomatis. Paket Premium bisa upload lagu sendiri.
4. Countdown Timer: Hitung mundur menuju hari bahagia.
5. Galeri Foto: Tampilkan foto prewedding dalam galeri yang cantik.
6. Peta Lokasi: Integrasi Google Maps untuk navigasi langsung ke lokasi acara.
7. Amplop Digital / QRIS: (Premium) Terima angpao online langsung dari undangan.
8. Kirim via WhatsApp: Bagikan link undangan ke tamu dengan satu klik.
9. Love Story Timeline: Ceritakan perjalanan cinta Anda dalam format timeline yang indah.
10. Live Streaming: Tamu yang tidak bisa hadir bisa menyaksikan acara secara online.

=== CARA MEMBUAT UNDANGAN ===

Langkah 1: Klik tombol "Buat Undangan" atau "Mulai Gratis" di halaman ini.
Langkah 2: Daftar akun gratis (bisa pakai Google).
Langkah 3: Pilih tema dan isi detail acara pernikahan (nama mempelai, tanggal, lokasi, foto, dll).
Langkah 4: Preview hasilnya secara real-time, lalu bagikan link undangan ke tamu via WhatsApp.
Seluruh proses bisa selesai dalam 5 menit.

=== PEMBAYARAN ===

Metode pembayaran: QRIS dan transfer bank melalui payment gateway Mayar. Proses otomatis, akun langsung aktif setelah pembayaran terkonfirmasi.

=== KONTAK & BANTUAN ===

Email: chatkita@mengundanganda.com
WhatsApp dan Instagram: Tersedia di bagian footer halaman ini.
Jika ada pertanyaan teknis, masalah akun, atau pembayaran error, arahkan pengunjung untuk menghubungi Admin via WhatsApp.

=== ATURAN MENJAWAB ===

1. Jawab dengan singkat, padat, dan tidak bertele-tele (maksimal 2-3 paragraf pendek).
2. Gunakan bahasa Indonesia yang santai tapi sopan (gunakan kata sapaan "Kak").
3. Jangan berhalusinasi atau memberikan harga/janji fitur yang tidak ada di daftar atas.
4. Anda BUKAN manusia, Anda adalah AI Assistant. Jika ditanya, jujurlah tapi tetap asyik.
5. JANGAN gunakan format markdown seperti ** (bold), * (italic), # (heading), atau - (list). Gunakan teks biasa saja. Jika perlu membuat daftar, gunakan angka (1, 2, 3) tanpa tanda khusus.
6. Jika pengunjung tertarik atau ingin mencoba, selalu arahkan mereka untuk klik tombol "Buat Undangan" atau "Mulai Gratis" yang ada di halaman ini. Jangan suruh mereka pergi ke URL lain.
7. Jawaban harus langsung ke poin, jangan mengulangi pertanyaan pengunjung.`;

export async function handleChatRequest(request: Request, env: any) {
  // 1. Rate Limiting
  const ip = getClientIp(request);
  const limited = rateLimit(`chat:${ip}`, 5, 60 * 1000);
  if (limited) return limited;

  // 2. Cek API Key
  const apiKey = env?.GEMINI_API_KEY;
  if (!apiKey) {
    return json({ error: "Fitur CS sedang dalam pemeliharaan." }, 503);
  }

  try {
    const body = await request.json();
    const userMessage = body.message;
    const history: Array<{ role: string; text: string }> = body.history || [];

    if (!userMessage || !String(userMessage).trim()) {
      return json({ error: "Pesan tidak boleh kosong." }, 400);
    }

    // 3. Bangun contents array untuk Gemini REST API
    // Format: [{role: "user", parts: [{text}]}, {role: "model", parts: [{text}]}, ...]
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    // Filter dan bersihkan history
    for (const msg of history) {
      if (!msg.text || !msg.text.trim()) continue;
      const role = (msg.role === 'ai' || msg.role === 'model') ? 'model' : 'user';
      
      // Hindari dua role yang sama berurutan
      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        continue;
      }
      contents.push({ role, parts: [{ text: msg.text }] });
    }

    // Pastikan dimulai dengan 'user'
    while (contents.length > 0 && contents[0].role !== 'user') {
      contents.shift();
    }

    // Hapus pesan user terakhir dari history (karena kita akan kirim ulang sebagai pesan baru)
    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents.pop();
    }

    // Pastikan berakhir dengan 'model' (jika ada history)
    while (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents.pop();
    }

    // Tambahkan pesan user yang baru
    contents.push({ role: 'user', parts: [{ text: userMessage }] });

    // 4. Panggil Gemini REST API — coba beberapa model sebagai fallback
    const modelsToTry = ["gemini-3-flash-preview", "gemini-2.5-flash", "gemini-2.5-flash-lite"];
    
    let lastError = "";
    for (const modelName of modelsToTry) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      
      const geminiResponse = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7,
          },
        }),
      });

      if (geminiResponse.ok) {
        const geminiData: any = await geminiResponse.json();
        const aiText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text 
          || "Maaf, saya tidak bisa menjawab saat ini.";
        return json({ status: "success", reply: aiText });
      }

      // Jika 429 (rate limit) atau 503 (server overloaded), coba model berikutnya
      if (geminiResponse.status === 429 || geminiResponse.status === 503) {
        console.warn(`[Chat API] Model ${modelName} returned ${geminiResponse.status}, trying next...`);
        lastError = `${modelName}: error ${geminiResponse.status}`;
        continue;
      }

      // Error lain (bukan 429), langsung return
      const errText = await geminiResponse.text();
      console.error(`[Chat API] Gemini error (${modelName}):`, geminiResponse.status, errText);
      return json({ error: "Gagal menghubungi AI. Coba lagi nanti." }, 502);
    }

    // Semua model kena rate limit
    console.error("[Chat API] All models rate limited:", lastError);
    return json({ 
      error: "Mia sedang istirahat sebentar karena terlalu banyak pertanyaan 😅 Coba lagi dalam 1 menit ya!" 
    }, 429);

  } catch (error: any) {
    console.error("[Chat API Error]:", error?.message || error);
    return json(
      { error: "Maaf, sistem CS sedang sibuk. Silakan coba beberapa saat lagi.", detail: error?.message },
      500
    );
  }
}

export const dispatchChatRoute: ApiDispatcher = async ({
  request,
  pathname,
  env,
}) => {
  if (pathname === "chat" && request.method === "POST") {
    return await handleChatRequest(request, env);
  }
  return null;
};
