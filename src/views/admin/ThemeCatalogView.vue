<template>
  <AdminLayout>
    <template #actions>
      <router-link v-if="!hasReachedLimit" to="/dashboard/create" class="btn btn-primary">
        <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">auto_awesome</span>
        Buat Undangan Baru
      </router-link>
    </template>
        <!-- Page Header -->
        <div class="theme-page-header">
          <div class="theme-page-header-content">
            <div class="theme-page-icon-wrapper">
              <Icon icon="ph:palette-duotone" class="theme-page-icon" />
            </div>
            <div>
              <h1 class="admin-page-title">Koleksi Tema Undangan</h1>
              <p class="admin-page-subtitle">Pilih tema yang paling sesuai dengan kepribadian dan acara Anda</p>
            </div>
          </div>
        </div>

        <!-- Limit Warning -->
        <div v-if="hasReachedLimit" class="theme-limit-warning" style="margin-top: 0; margin-bottom: 32px;">
          <span class="material-symbols-rounded" style="font-size:20px;vertical-align:-4px">info</span>
          Anda telah mencapai batas undangan. Hubungi admin untuk menambah kuota atau hapus undangan yang tidak digunakan.
        </div>

        <!-- Theme Grid -->
        <div class="theme-catalog-grid">
          <div
            v-for="theme in themes"
            :key="theme.id"
            class="theme-catalog-card"
            :style="{ '--card-accent': theme.color }"
          >
            <!-- Iframe Preview -->
            <div class="theme-preview-container">
              <div class="theme-preview-device">
                <div class="theme-preview-notch"></div>
                <div class="theme-preview-screen">
                  <!-- Fallback Placeholder (Selalu di bawah) -->
                  <div class="theme-preview-placeholder">
                    <Icon :icon="theme.icon" class="placeholder-icon" :style="{ color: theme.color }" />
                    <span class="placeholder-text">{{ theme.name }}</span>
                  </div>
                  <!-- Thumbnail Image -->
                  <img
                    :src="theme.thumbnail"
                    @error="($event.target as HTMLImageElement).style.opacity = '0'"
                    class="theme-preview-image"
                    :alt="'Preview tema ' + theme.name"
                    loading="lazy"
                  />
                </div>
              </div>
              <!-- Theme accent bar -->
              <div class="theme-accent-bar" :style="{ background: theme.bgGradient }"></div>
            </div>

            <div class="theme-catalog-info">
              <div class="theme-catalog-header">
                <div class="theme-name-row">
                  <Icon :icon="theme.icon" class="theme-name-icon" :style="{ color: theme.color }" />
                  <h3 class="theme-catalog-name">{{ theme.name }}</h3>
                </div>
              </div>
              <div class="theme-catalog-actions">
                <a
                  v-if="theme.sampleUrl"
                  :href="theme.sampleUrl"
                  target="_blank"
                  class="btn btn-outline btn-sm theme-btn"
                >
                  <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">visibility</span>
                  Lihat Contoh
                </a>
                <button
                  v-else
                  class="btn btn-outline btn-sm theme-btn"
                  disabled
                  title="Link contoh akan segera tersedia"
                >
                  <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">hourglass_top</span>
                  Segera Hadir
                </button>

                <router-link
                  v-if="!hasReachedLimit"
                  :to="`/dashboard/create?theme=${theme.id}`"
                  class="btn btn-primary btn-sm theme-btn theme-btn-use"
                >
                  <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">brush</span>
                  Pakai Tema Ini
                </router-link>
                <button
                  v-else
                  class="btn btn-primary btn-sm theme-btn theme-btn-use"
                  disabled
                  title="Limit undangan tercapai. Hubungi admin untuk menambah kuota."
                >
                  <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">block</span>
                  Pakai Tema Ini
                </button>
              </div>
            </div>
          </div>
        </div>

        
      <!-- Toast -->
    <div v-if="toast" :class="['toast', `toast-${toast.type}`, 'flex', 'items-center', 'gap-2']">
      <Icon :icon="toast.type === 'error' ? 'lucide:x-circle' : 'lucide:check-circle-2'" style="font-size: 18px; flex-shrink: 0;" />
      <span>{{ toast.message }}</span>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useInvitationStore } from "@/stores/invitation";
import { useAuthStore } from "@/stores/auth";
import { Icon } from "@iconify/vue";
import AdminLayout from "@/components/admin/AdminLayout.vue";
import { THEME_LIST } from "@/config/themes";

const store = useInvitationStore();
const authStore = useAuthStore();
const toast = ref<{ type: string; message: string } | null>(null);

const invitations = computed(() => store.invitations);

const hasReachedLimit = computed(() => {
  if (!authStore.user) return false;
  if (authStore.user.role === 'admin') return false;
  return invitations.value.length >= authStore.user.max_invitations;
});

const hasTrialInvitation = computed(() => {
  return invitations.value.some(i => i.payment_status === 'trial');
});

const firstTrialInvitationId = computed(() => {
  const trialInv = invitations.value.find(i => i.payment_status === 'trial');
  return trialInv ? trialInv.id : null;
});

const themes = THEME_LIST;

onMounted(async () => {
  await store.fetchInvitations();
});
</script>

<style scoped>
/* ===== Theme Page Header ===== */
.theme-page-header {
  margin-bottom: 36px;
}

.theme-page-header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.theme-page-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #e0e7ff, #ede9fe);
  border-radius: 16px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.theme-page-icon {
  font-size: 28px;
  color: #4f46e5;
}

/* ===== Theme Catalog Grid ===== */
.theme-catalog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

/* ===== Theme Card ===== */
.theme-catalog-card {
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.theme-catalog-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--card-accent, var(--admin-primary));
}

/* ===== Preview Container ===== */
.theme-preview-container {
  position: relative;
  padding: 24px 24px 0;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
}

.theme-preview-device {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  background: #1a1a2e;
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  box-shadow: 
    0 -2px 20px rgba(0, 0, 0, 0.12),
    inset 0 0 0 2px rgba(255, 255, 255, 0.08);
}

.theme-preview-notch {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 5px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  z-index: 2;
}

.theme-preview-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 24px 24px 0 0;
}

.theme-preview-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  border: none;
  pointer-events: none;
  z-index: 10;
  transition: opacity 0.3s ease;
  background: #fff;
}

.theme-preview-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
}

.placeholder-icon {
  font-size: 48px;
  color: rgba(255, 255, 255, 0.25);
}

.placeholder-text {
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  font-weight: 500;
}

.theme-accent-bar {
  height: 4px;
  border-radius: 2px 2px 0 0;
}

/* ===== Theme Info ===== */
.theme-catalog-info {
  padding: 20px 24px 24px;
}

.theme-catalog-header {
  margin-bottom: 8px;
}

.theme-name-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.theme-name-icon {
  font-size: 22px;
}

.theme-catalog-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--admin-text);
  margin: 0;
}

.theme-catalog-desc {
  font-size: 13px;
  color: var(--admin-text-secondary);
  line-height: 1.6;
  margin: 0 0 16px;
}

/* ===== Theme Actions ===== */
.theme-catalog-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.theme-btn {
  flex: 1;
  min-width: 0;
  justify-content: center;
  white-space: nowrap;
  font-size: 13px !important;
  padding: 8px 12px !important;
}

.theme-btn-use {
  flex: 1.2;
}

.theme-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ===== Limit Warning ===== */
.theme-limit-warning {
  margin-top: 24px;
  padding: 16px 20px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 12px;
  color: #92400e;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1.5;
}

/* ===== Responsive ===== */
@media (max-width: 1100px) {
  .theme-catalog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .theme-catalog-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .theme-page-header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .theme-page-icon-wrapper {
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }

  .theme-page-icon {
    font-size: 22px;
  }

  .theme-preview-device {
    aspect-ratio: 9 / 14;
  }

  .theme-catalog-card:hover {
    transform: none;
  }
}
</style>
