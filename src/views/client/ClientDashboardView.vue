<template>
  <div class="client-page">
    <!-- Top Bar -->
    <header class="client-topbar">
      <div class="topbar-brand">
        <div class="topbar-logo">
          <img src="/images/logo.webp" alt="Logo" />
        </div>
        <span class="topbar-text">Mengundang<span>Anda</span></span>
      </div>
      <div class="topbar-right">
        <span v-if="invitation" class="topbar-names"
          >{{ invitation.groom_name }} & {{ invitation.bride_name }}</span
        >
        <button class="btn-logout" @click="handleLogout" title="Keluar">
          <span class="material-symbols-rounded" style="font-size: 18px"
            >logout</span
          >
        </button>
      </div>
    </header>

    <!-- Loading -->
    <div v-if="initialLoading" class="client-loading">
      <div class="spinner"></div>
      <p>Memuat data undangan...</p>
    </div>

    <!-- Main Layout Body -->
    <div v-else class="client-body-layout">
      <!-- Desktop Sidebar Navigation -->
      <aside class="client-sidebar">
        <nav class="sidebar-nav">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="sidebar-nav-item"
            :class="{ active: activeTab === tab.id }"
            @click="handleTabClick(tab.id)"
          >
            <span class="material-symbols-rounded">{{ tab.icon }}</span>
            <span class="bottom-nav-label">{{ tab.label }}</span>
          </button>
        </nav>
      </aside>

      <!-- Content Area -->
      <div class="client-content">
        <!-- Tab: Beranda -->
        <div v-show="activeTab === 'home'" class="tab-panel">
          <ClientHomeTab :invitation="invitation" :stats="stats" />
        </div>

        <!-- Tab: Tamu -->
        <div v-show="activeTab === 'guests'" class="tab-panel">
          <ClientGuestsTab :invitation="invitation" />
        </div>

        <!-- Tab: Ucapan -->
        <div v-show="activeTab === 'wishes'" class="tab-panel">
          <ClientWishesTab :invitation="invitation" :stats="stats" />
        </div>
      </div>
    </div>

    <!-- Bottom Nav (Mobile) -->
    <nav class="bottom-nav">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="bottom-nav-item"
        :class="{ active: activeTab === tab.id }"
        @click="handleTabClick(tab.id)"
      >
        <span class="material-symbols-rounded">{{ tab.icon }}</span>
        <span class="bottom-nav-label">{{ tab.label }}</span>
      </button>
    </nav>

    <!-- Toast -->
    <div v-if="toast" :class="['toast', `toast-${toast.type}`]">
      <span class="material-symbols-rounded" style="font-size: 18px">{{
        toast.type === "error" ? "error" : "check_circle"
      }}</span>
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide, computed } from "vue";
import { useRouter } from "vue-router";
import { useClientStore } from "@/stores/client";
import ClientHomeTab from "@/components/client/ClientHomeTab.vue";
import ClientGuestsTab from "@/components/client/ClientGuestsTab.vue";
import ClientWishesTab from "@/components/client/ClientWishesTab.vue";

const router = useRouter();
const store = useClientStore();

const activeTab = ref<"home" | "edit" | "guests" | "wishes">("home");
const initialLoading = ref(true);
const invitation = ref<any>(null);
const stats = ref<any>(null);
const toast = ref<{ type: string; message: string } | null>(null);

function handleTabClick(tabId: "home" | "edit" | "guests" | "wishes") {
  if (tabId === "edit" && invitation.value?.id) {
    router.push(`/client/edit/${invitation.value.id}`);
  } else {
    activeTab.value = tabId;
  }
}

const tabs = [
  { id: "home" as const, icon: "home", label: "Beranda" },
  { id: "edit" as const, icon: "edit", label: "Edit" },
  { id: "guests" as const, icon: "group", label: "Tamu" },
  { id: "wishes" as const, icon: "forum", label: "Ucapan" },
];

function showToast(type: "success" | "error", message: string) {
  toast.value = { type, message };
  setTimeout(() => {
    toast.value = null;
  }, 3000);
}

provide("showToast", showToast);

onMounted(async () => {
  if (!store.isAuthenticated) {
    router.replace("/client");
    return;
  }
  try {
    invitation.value = await store.fetchInvitation();
    if (!invitation.value) {
      store.logout();
      router.replace("/client");
      return;
    }
    stats.value = await store.fetchStats();
  } catch {
    showToast("error", "Gagal memuat data");
  } finally {
    initialLoading.value = false;
  }
});

function handleLogout() {
  store.logout();
  router.replace("/client");
}
</script>

<style scoped>
.client-page {
  min-height: 100vh;
  background: var(--admin-bg, #f4f6fa);
  font-family:
    "Inter",
    -apple-system,
    sans-serif;
}

.client-topbar {
  background: white;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.topbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.topbar-logo {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  overflow: hidden;
}

.topbar-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.topbar-text {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
}

.topbar-text span {
  color: #3b82f6;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.topbar-names {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}

.btn-logout {
  background: none;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 6px 8px;
  cursor: pointer;
  color: #64748b;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.btn-logout:hover {
  background: #fef2f2;
  color: #ef4444;
  border-color: #fecaca;
}

.client-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #64748b;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.client-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.tab-panel {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Bottom Navigation */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: white;
  border-top: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 50;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  padding-bottom: env(safe-area-inset-bottom, 0);
}

.bottom-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  color: #94a3b8;
  transition: all 0.2s;
  border-radius: 12px;
}

.bottom-nav-item.active {
  color: #3b82f6;
}

.bottom-nav-item.active .material-symbols-rounded {
  background: #eff6ff;
  border-radius: 12px;
  padding: 4px 16px;
}

.bottom-nav-item .material-symbols-rounded {
  font-size: 22px;
  padding: 4px 16px;
  transition: all 0.2s;
}

.bottom-nav-label {
  font-size: 11px;
  font-weight: 600;
}

.toast {
  position: fixed;
  bottom: 80px;
  right: 20px;
  left: 20px;
  max-width: 400px;
  margin: 0 auto;
  padding: 12px 20px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 100;
  animation: slideUp 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.toast-success {
  background: #10b981;
}
.toast-error {
  background: #ef4444;
}

@keyframes slideUp {
  from {
    transform: translateY(16px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .client-page { padding-bottom: 80px; }
  .client-content { padding: 16px; }
  .topbar-names { display: none; }
  .topbar-text { font-size: 15px; }
}

.client-sidebar {
  display: none;
}

@media (min-width: 769px) {
  .client-body-layout {
    display: flex;
    min-height: calc(100vh - 60px);
  }

  .client-sidebar {
    display: flex;
    flex-direction: column;
    width: 220px;
    border-right: 1px solid #e2e8f0;
    background: white;
    padding: 24px 16px;
    gap: 8px;
    flex-shrink: 0;
    position: sticky;
    top: 60px;
    height: calc(100vh - 60px);
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }

  .sidebar-nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: none;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    color: #64748b;
    font-weight: 600;
    font-size: 14px;
    text-align: left;
    transition: all 0.2s;
    width: 100%;
  }

  .sidebar-nav-item:hover {
    background: #f1f5f9;
    color: #1e293b;
  }

  .sidebar-nav-item.active {
    background: #eff6ff;
    color: #3b82f6;
  }

  .sidebar-nav-item .material-symbols-rounded {
    font-size: 22px;
  }

  .client-content {
    flex: 1;
    padding: 32px 40px;
    max-width: 960px;
    margin: 0 auto;
  }

  .bottom-nav {
    display: none !important;
  }
}
</style>
