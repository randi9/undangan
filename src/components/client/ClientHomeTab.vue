<template>
  <div class="home-tab">
    <!-- Invitation Card -->
    <div v-if="invitation" class="inv-card">
      <div class="inv-card-cover">
        <img
          v-if="invitation.cover_photo"
          :src="resolveAssetUrl(invitation.cover_photo, apiBase)"
          alt="Cover"
        />
        <div v-else class="inv-card-cover-placeholder">
          <img
            src="/images/logo.webp"
            alt="Logo"
            style="width: 48px; opacity: 0.3"
          />
        </div>
      </div>
      <div class="inv-card-body">
        <div class="inv-names">
          {{ invitation.groom_name }} <span class="heart">❤</span>
          {{ invitation.bride_name }}
        </div>
        <div class="inv-slug" @click="copyLink" title="Klik untuk salin link">
          <span class="material-symbols-rounded" style="font-size: 14px"
            >link</span
          >
          {{ getDisplayUrl(invitation.slug) }}
        </div>
        <div class="inv-meta">
          <span
            ><span class="material-symbols-rounded">palette</span>
            <strong style="text-transform: capitalize">{{
              invitation.theme || "elegant"
            }}</strong></span
          >
          <span
            ><span class="material-symbols-rounded">visibility</span>
            {{ invitation.view_count || 0 }} views</span
          >
          <span v-if="invitation.akad_date"
            ><span class="material-symbols-rounded">event</span>
            {{ formatDate(invitation.akad_date) }}</span
          >
        </div>
        <a
          :href="getInvitationUrl(invitation.slug)"
          target="_blank"
          class="btn btn-primary btn-sm"
          style="
            margin-top: 12px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          "
        >
          <span class="material-symbols-rounded" style="font-size: 16px"
            >open_in_new</span
          >
          Lihat Undangan
        </a>
      </div>
    </div>

    <!-- Stats Cards -->
    <div v-if="stats" class="stats-grid">
      <div class="stat-card">
        <div class="stat-value" style="color: #3b82f6">
          {{ stats.pageViews }}
        </div>
        <div class="stat-label">Total Views</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: #10b981">
          {{ stats.attendanceStats?.hadir || 0 }}
        </div>
        <div class="stat-label">Hadir</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: #ef4444">
          {{ stats.attendanceStats?.tidak_hadir || 0 }}
        </div>
        <div class="stat-label">Tidak Hadir</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: #8b5cf6">
          {{ stats.totalPax }}
        </div>
        <div class="stat-label">Estimasi Pax</div>
      </div>
    </div>

    <!-- Attendance Bar -->
    <div v-if="stats && stats.totalRsvps > 0" class="attendance-bar-card">
      <div class="bar-labels">
        <span style="color: #10b981">Hadir ({{ hadirPct }}%)</span>
        <span style="color: #ef4444">Tidak Hadir ({{ tidakHadirPct }}%)</span>
      </div>
      <div class="progress-bar">
        <div :style="`width:${hadirPct}%;background:#10b981`"></div>
        <div :style="`width:${tidakHadirPct}%;background:#ef4444`"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { resolveAssetUrl } from "@/utils/url";

const props = defineProps<{ invitation: any; stats: any }>();
const apiBase = import.meta.env.VITE_API_URL || "";
const showToast =
  inject<(type: "success" | "error", msg: string) => void>("showToast")!;

const hadirPct = computed(() => {
  if (!props.stats) return 0;
  const total =
    (props.stats.attendanceStats?.hadir || 0) +
    (props.stats.attendanceStats?.tidak_hadir || 0);
  return total
    ? Math.round((props.stats.attendanceStats.hadir / total) * 100)
    : 0;
});

const tidakHadirPct = computed(() => {
  if (!props.stats) return 0;
  const total =
    (props.stats.attendanceStats?.hadir || 0) +
    (props.stats.attendanceStats?.tidak_hadir || 0);
  return total
    ? Math.round((props.stats.attendanceStats.tidak_hadir / total) * 100)
    : 0;
});

function formatDate(d?: string) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getInvitationUrl(slug: string) {
  const host = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : "";
  const protocol = window.location.protocol;
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".vercel.app")
  ) {
    return `${protocol}//${host}${port}/invitation/${slug}`;
  }
  const mainDomain = host.replace("www.", "").replace("admin.", "");
  return `${protocol}//${slug}.${mainDomain}${port}`;
}

function getDisplayUrl(slug: string) {
  const host = window.location.hostname;
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".vercel.app")
  ) {
    return `/invitation/${slug}`;
  }
  const mainDomain = host.replace("www.", "").replace("admin.", "");
  return `${slug}.${mainDomain}`;
}

async function copyLink() {
  if (!props.invitation) return;
  try {
    await navigator.clipboard.writeText(
      getInvitationUrl(props.invitation.slug),
    );
    showToast("success", "Link berhasil disalin!");
  } catch {
    showToast("error", "Gagal menyalin link");
  }
}
</script>

<style scoped>
.inv-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
}

.inv-card-cover {
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: linear-gradient(135deg, #e8ecf4, #d1d5e0);
}

.inv-card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.inv-card-cover-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inv-card-body {
  padding: 20px;
}

.inv-names {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.heart {
  color: #ef4444;
  margin: 0 4px;
}

.inv-slug {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #3b82f6;
  cursor: pointer;
  padding: 4px 8px;
  background: #eff6ff;
  border-radius: 6px;
  margin-bottom: 12px;
  transition: all 0.2s;
}

.inv-slug:hover {
  background: #dbeafe;
}

.inv-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #64748b;
}

.inv-meta .material-symbols-rounded {
  font-size: 14px;
  vertical-align: -2px;
  margin-right: 2px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.stat-card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  text-align: center;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 2px;
}

.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}

.attendance-bar-card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.bar-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
}

.progress-bar {
  height: 10px;
  background: #f1f5f9;
  border-radius: 999px;
  overflow: hidden;
  display: flex;
}

.progress-bar div {
  transition: width 0.5s ease;
}

@media (min-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
