<template>
  <div class="order-page">
    <!-- Navbar Mini -->
    <nav class="order-nav">
      <div class="order-nav-inner">
        <a href="/" class="order-logo">
          <img src="/images/logo.webp" alt="Logo" class="order-logo-img">
          <span>Mengundang<span class="order-logo-accent">Anda</span></span>
        </a>
        <a href="/#harga" class="order-nav-back">
          <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">arrow_back</span>
          Kembali
        </a>
      </div>
    </nav>

    <main class="order-main">
      <!-- Success State -->
      <div v-if="submitted" class="order-card order-success-card">
        <div class="order-success-icon-wrapper">
          <Icon icon="solar:check-circle-bold-duotone" class="order-success-icon" />
        </div>
        <h1>Pesanan Berhasil Dikirim!</h1>
        <p>Kami sudah menerima pesanan Anda. Silakan lanjutkan pembicaraan di WhatsApp untuk konfirmasi pembayaran dan detail lebih lanjut.</p>
        <div class="order-success-summary">
          <div class="order-summary-row">
            <span class="order-summary-label">Mempelai</span>
            <span class="order-summary-value">{{ form.groomName }} & {{ form.brideName }}</span>
          </div>
          <div class="order-summary-row">
            <span class="order-summary-label">Tema</span>
            <span class="order-summary-value">{{ themeLabel(form.theme) }}</span>
          </div>
          <div class="order-summary-row">
            <span class="order-summary-label">Nomor Order</span>
            <span class="order-summary-value order-number">{{ orderNumber }}</span>
          </div>
        </div>
        <div class="order-success-actions">
          <a :href="waLink" target="_blank" class="order-btn order-btn-wa">
            <Icon icon="mdi:whatsapp" style="font-size:20px" />
            Buka WhatsApp
          </a>
          <a href="/" class="order-btn order-btn-outline">Kembali ke Beranda</a>
        </div>
      </div>

      <!-- Order Form -->
      <div v-else class="order-card">
        <div class="order-header">
          <div class="order-header-icon">
            <Icon icon="solar:magic-stick-3-bold-duotone" class="order-header-icon-svg" />
          </div>
          <h1>Jasa Dibuatkan Undangan</h1>
          <p class="order-header-sub">Isi data di bawah ini, lalu kami yang akan membuatkan undangan digital premium untuk Anda. Terima jadi, tanpa ribet!</p>
          <div class="order-price-badge">
            <span class="order-price-currency">Rp</span>
            <span class="order-price-amount">99.000</span>
            <span class="order-price-note">sekali bayar • termasuk semua fitur Premium</span>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="order-form">
          <!-- Customer Info -->
          <div class="order-section">
            <h2 class="order-section-title">
              <Icon icon="solar:user-circle-bold-duotone" class="order-section-icon" />
              Informasi Anda
            </h2>
            <div class="order-field">
              <label for="customerName">Nama Lengkap <span class="required">*</span></label>
              <input id="customerName" v-model="form.customerName" type="text" placeholder="Nama Anda" required />
            </div>
            <div class="order-field">
              <label for="customerPhone">Nomor WhatsApp <span class="required">*</span></label>
              <div class="order-phone-input">
                <span class="order-phone-prefix">+62</span>
                <input id="customerPhone" v-model="form.customerPhone" type="tel" placeholder="81234567890" required pattern="[0-9]{9,13}" />
              </div>
              <span class="order-field-hint">Kami akan menghubungi Anda via nomor ini</span>
            </div>
          </div>

          <!-- Wedding Info -->
          <div class="order-section">
            <h2 class="order-section-title">
              <Icon icon="solar:heart-bold-duotone" class="order-section-icon" />
              Data Pernikahan
            </h2>
            <div class="order-field-row">
              <div class="order-field">
                <label for="groomName">Nama Mempelai Pria <span class="required">*</span></label>
                <input id="groomName" v-model="form.groomName" type="text" placeholder="Contoh: Ahmad" required />
              </div>
              <div class="order-field">
                <label for="brideName">Nama Mempelai Wanita <span class="required">*</span></label>
                <input id="brideName" v-model="form.brideName" type="text" placeholder="Contoh: Siti" required />
              </div>
            </div>
            <div class="order-field-row">
              <div class="order-field">
                <label for="weddingDate">Tanggal Pernikahan</label>
                <input id="weddingDate" v-model="form.weddingDate" type="date" />
              </div>
              <div class="order-field">
                <label for="theme">Pilihan Tema <span class="required">*</span></label>
                <select id="theme" v-model="form.theme" required>
                  <option value="" disabled>Pilih tema undangan</option>
                  <option v-for="t in themeOptions" :key="t.id" :value="t.id">{{ t.name }}</option>
                </select>
              </div>
            </div>
            <div class="order-field">
              <label for="location">Lokasi Acara</label>
              <input id="location" v-model="form.location" type="text" placeholder="Contoh: Gedung Serbaguna, Jl. Merdeka No. 10" />
            </div>
            <div class="order-field">
              <label for="notes">Catatan Tambahan</label>
              <textarea id="notes" v-model="form.notes" rows="3" placeholder="Request khusus, informasi tambahan, dsb."></textarea>
            </div>
          </div>

          <!-- Included Features -->
          <div class="order-included">
            <h3>Yang Anda Dapatkan:</h3>
            <div class="order-included-grid">
              <div class="order-included-item">
                <Icon icon="solar:crown-bold-duotone" class="order-included-icon" />
                <span>Semua fitur Premium</span>
              </div>
              <div class="order-included-item">
                <Icon icon="solar:infinity-bold-duotone" class="order-included-icon" />
                <span>Akses unlimited 1 tahun</span>
              </div>
              <div class="order-included-item">
                <Icon icon="solar:magic-stick-3-bold-duotone" class="order-included-icon" />
                <span>Dibuatkan oleh admin</span>
              </div>
              <div class="order-included-item">
                <Icon icon="solar:refresh-circle-bold-duotone" class="order-included-icon" />
                <span>3x revisi gratis</span>
              </div>
              <div class="order-included-item">
                <Icon icon="solar:clock-circle-bold-duotone" class="order-included-icon" />
                <span>Selesai dalam 1 jam</span>
              </div>
              <div class="order-included-item">
                <Icon icon="solar:shield-check-bold-duotone" class="order-included-icon" />
                <span>Tanpa branding platform</span>
              </div>
            </div>
          </div>

          <!-- Submit -->
          <div class="order-submit-section">
            <button type="submit" class="order-btn order-btn-submit" :disabled="submitting">
              <Icon v-if="!submitting" icon="mdi:whatsapp" style="font-size:22px" />
              <span v-if="submitting" class="order-spinner"></span>
              {{ submitting ? 'Memproses...' : 'Pesan via WhatsApp' }}
            </button>
            <p class="order-submit-note">
              <Icon icon="solar:lock-keyhole-bold-duotone" style="font-size:14px;vertical-align:-2px;color:#94a3b8" />
              Data Anda aman. Anda akan diarahkan ke WhatsApp untuk konfirmasi pesanan.
            </p>
          </div>
        </form>
      </div>
    </main>

    <!-- Footer -->
    <footer class="order-footer">
      <p>&copy; 2026 MengundangAnda. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Icon } from '@iconify/vue'

const WA_NUMBER = '6285155026211'

const themeOptions = [
  { id: 'elegant', name: 'Elegant Gold' },
  { id: 'floral', name: 'Floral' },
  { id: 'minimalist', name: 'Clean Minimalist' },
  { id: 'elegant_blue', name: 'Elegant Blue' },
  { id: 'floral_blue', name: 'Floral Blue' },
]

function themeLabel(id: string) {
  return themeOptions.find(t => t.id === id)?.name || id
}

const form = reactive({
  customerName: '',
  customerPhone: '',
  groomName: '',
  brideName: '',
  weddingDate: '',
  theme: '',
  location: '',
  notes: '',
})

const submitted = ref(false)
const submitting = ref(false)
const orderNumber = ref('')
const waLink = ref('')

function generateOrderNumber() {
  const now = new Date()
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.floor(Math.random() * 900 + 100)
  return `ORD-${dateStr}-${rand}`
}

function formatWADate(dateStr: string) {
  if (!dateStr) return 'Belum ditentukan'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function buildWAMessage() {
  const phone = form.customerPhone.startsWith('0')
    ? form.customerPhone.slice(1)
    : form.customerPhone

  const lines = [
    `*ORDER BARU - Jasa Dibuatkan Undangan*`,
    ``,
    `*No. Order:* ${orderNumber.value}`,
    ``,
    `*Pemesan:* ${form.customerName}`,
    `*WA:* +62${phone}`,
    ``,
    `*Mempelai Pria:* ${form.groomName}`,
    `*Mempelai Wanita:* ${form.brideName}`,
    `*Tanggal:* ${formatWADate(form.weddingDate)}`,
    `*Tema:* ${themeLabel(form.theme)}`,
  ]

  if (form.location) {
    lines.push(`*Lokasi:* ${form.location}`)
  }
  if (form.notes) {
    lines.push(`*Catatan:* ${form.notes}`)
  }

  lines.push(``, `*Paket:* Jasa Dibuatkan - Rp 99.000`)
  lines.push(`*SLA:* Selesai dalam 1 jam`)
  lines.push(`*Revisi:* 3x gratis`)

  return lines.join('\n')
}

const computedWALink = computed(() => {
  const msg = encodeURIComponent(buildWAMessage())
  return `https://wa.me/${WA_NUMBER}?text=${msg}`
})

async function handleSubmit() {
  submitting.value = true

  // Try to save order to backend
  try {
    const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api'
    const phone = form.customerPhone.startsWith('0')
      ? form.customerPhone.slice(1)
      : form.customerPhone

    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: form.customerName,
        customer_phone: `62${phone}`,
        groom_name: form.groomName,
        bride_name: form.brideName,
        wedding_date: form.weddingDate || null,
        theme: form.theme,
        location: form.location || null,
        notes: form.notes || null,
      }),
    })
    const data = await res.json()
    orderNumber.value = data.order_number || generateOrderNumber()
  } catch {
    // Fallback: generate order number client-side if API fails
    orderNumber.value = generateOrderNumber()
  }

  waLink.value = computedWALink.value
  submitted.value = true
  submitting.value = false

  // Open WhatsApp
  window.open(waLink.value, '_blank')
}

// SEO
if (typeof document !== 'undefined') {
  document.title = 'Pesan Jasa Dibuatkan Undangan — MengundangAnda'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@500;600;700&display=swap');

.order-page {
  --order-primary: #1e3a5f;
  --order-accent: #93c5fd;
  --order-accent-light: rgba(37, 99, 235, 0.08);
  --order-bg: #f8fafc;
  --order-card: #ffffff;
  --order-text: #1e293b;
  --order-text-light: #64748b;
  --order-border: #e2e8f0;
  --order-radius: 16px;
  --order-font: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  --order-font-serif: 'Cormorant Garamond', Georgia, serif;

  font-family: var(--order-font);
  background: var(--order-bg);
  color: var(--order-text);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Nav */
.order-nav {
  background: white;
  border-bottom: 1px solid var(--order-border);
  padding: 16px 24px;
  position: sticky;
  top: 0;
  z-index: 50;
}
.order-nav-inner {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.order-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: var(--order-font-serif);
  font-size: 22px;
  font-weight: 600;
  color: var(--order-primary);
}
.order-logo-img {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}
.order-logo-accent {
  color: var(--order-accent);
}
.order-nav-back {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: var(--order-text-light);
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}
.order-nav-back:hover {
  color: var(--order-accent);
}

/* Main */
.order-main {
  flex: 1;
  padding: 32px 20px 60px;
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
}

/* Card */
.order-card {
  background: var(--order-card);
  border-radius: var(--order-radius);
  box-shadow: 0 4px 24px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04);
  border: 1px solid var(--order-border);
  padding: 40px 36px;
}

/* Header */
.order-header {
  text-align: center;
  margin-bottom: 40px;
}
.order-header-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #dbeafe, #e0e7ff);
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.12);
  transform: rotate(-5deg);
}
.order-header-icon-svg {
  font-size: 36px;
  color: var(--order-accent);
  transform: rotate(5deg);
}
.order-header h1 {
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--order-primary);
  margin-bottom: 10px;
  letter-spacing: -0.01em;
}
.order-header-sub {
  color: var(--order-text-light);
  font-size: 1rem;
  max-width: 480px;
  margin: 0 auto 20px;
  line-height: 1.6;
}

.order-price-badge {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 6px;
  background: linear-gradient(135deg, #1e3a5f, #2563eb);
  color: white;
  padding: 14px 28px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.25);
}
.order-price-currency {
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.8;
}
.order-price-amount {
  font-family: var(--order-font-serif);
  font-size: 2rem;
  font-weight: 700;
}
.order-price-note {
  font-size: 0.75rem;
  opacity: 0.7;
  width: 100%;
  text-align: center;
  margin-top: 2px;
}

/* Form */
.order-form {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.order-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.order-section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--order-primary);
  padding-bottom: 12px;
  border-bottom: 2px solid var(--order-accent-light);
}
.order-section-icon {
  font-size: 24px;
  color: var(--order-accent);
}

.order-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.order-field label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--order-text);
}
.required {
  color: #ef4444;
}
.order-field input,
.order-field select,
.order-field textarea {
  padding: 12px 16px;
  border: 2px solid var(--order-border);
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: var(--order-font);
  color: var(--order-text);
  background: #fafbfc;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  width: 100%;
  box-sizing: border-box;
}
.order-field input:focus,
.order-field select:focus,
.order-field textarea:focus {
  border-color: var(--order-accent);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  background: white;
}
.order-field textarea {
  resize: vertical;
  min-height: 80px;
}
.order-field-hint {
  font-size: 0.75rem;
  color: var(--order-text-light);
}

.order-field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.order-phone-input {
  display: flex;
  gap: 0;
}
.order-phone-prefix {
  display: flex;
  align-items: center;
  padding: 12px 14px;
  background: #f1f5f9;
  border: 2px solid var(--order-border);
  border-right: none;
  border-radius: 12px 0 0 12px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--order-text-light);
}
.order-phone-input input {
  border-radius: 0 12px 12px 0 !important;
}

/* Included Features */
.order-included {
  background: linear-gradient(135deg, #f0fdf4, #f8fafc);
  border: 1px solid #bbf7d0;
  border-radius: 16px;
  padding: 24px;
}
.order-included h3 {
  font-size: 0.9rem;
  font-weight: 700;
  color: #166534;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.order-included-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.order-included-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--order-text);
}
.order-included-icon {
  font-size: 20px;
  color: #10b981;
  flex-shrink: 0;
}

/* Submit */
.order-submit-section {
  text-align: center;
}
.order-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 32px;
  border-radius: 14px;
  font-family: var(--order-font);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.order-btn-submit {
  width: 100%;
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: white;
  font-size: 1.1rem;
  padding: 16px 32px;
  box-shadow: 0 6px 24px rgba(37, 211, 102, 0.3);
}
.order-btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(37, 211, 102, 0.4);
}
.order-btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.order-submit-note {
  margin-top: 14px;
  font-size: 0.78rem;
  color: var(--order-text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.order-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2.5px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Success */
.order-success-card {
  text-align: center;
  animation: fadeInUp 0.5s ease-out;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.order-success-icon-wrapper {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
.order-success-icon {
  font-size: 80px;
  color: #10b981;
  filter: drop-shadow(0 4px 8px rgba(16, 185, 129, 0.2));
}
.order-success-card h1 {
  font-size: 1.6rem;
  font-weight: 800;
  color: #166534;
  margin-bottom: 12px;
}
.order-success-card > p {
  color: var(--order-text-light);
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 440px;
  margin: 0 auto 28px;
}
.order-success-summary {
  background: #f8fafc;
  border: 1px solid var(--order-border);
  border-radius: 14px;
  padding: 20px 24px;
  margin-bottom: 28px;
  text-align: left;
}
.order-summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
.order-summary-row:not(:last-child) {
  border-bottom: 1px solid #f1f5f9;
}
.order-summary-label {
  font-size: 0.8rem;
  color: var(--order-text-light);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.order-summary-value {
  font-weight: 700;
  color: var(--order-text);
  font-size: 0.95rem;
}
.order-number {
  font-family: 'Courier New', monospace;
  color: var(--order-accent);
  letter-spacing: 0.05em;
}
.order-success-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 320px;
  margin: 0 auto;
}
.order-btn-wa {
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: white;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.3);
}
.order-btn-wa:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
}
.order-btn-outline {
  background: transparent;
  color: var(--order-text-light);
  border: 2px solid var(--order-border);
}
.order-btn-outline:hover {
  border-color: var(--order-accent);
  color: var(--order-accent);
}

/* Footer */
.order-footer {
  text-align: center;
  padding: 24px;
  color: var(--order-text-light);
  font-size: 0.8rem;
  border-top: 1px solid var(--order-border);
}

/* Responsive */
@media (max-width: 640px) {
  .order-card {
    padding: 28px 20px;
  }
  .order-field-row {
    grid-template-columns: 1fr;
  }
  .order-included-grid {
    grid-template-columns: 1fr;
  }
  .order-header h1 {
    font-size: 1.5rem;
  }
  .order-price-amount {
    font-size: 1.6rem;
  }
}
</style>
