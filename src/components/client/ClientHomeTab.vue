<template>
  <div class="home-tab">
    <!-- Invitation Hero Card -->
    <div v-if="invitation" class="inv-hero">
      <div class="inv-hero-cover">
        <img
          v-if="invitation.cover_photo"
          :src="resolveAssetUrl(invitation.cover_photo, apiBase)"
          alt="Cover"
        />
        <div v-else class="inv-hero-cover-placeholder">
          <img
            src="/images/logo.webp"
            alt="Logo"
            style="width: 48px; opacity: 0.3"
          />
        </div>
      </div>
      <div class="inv-hero-body">
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
              invitation.theme || "nyunda"
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
          class="btn btn-primary btn-sm inv-hero-btn"
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
        <div class="stat-icon-wrap stat-blue">
          <span class="material-symbols-rounded">visibility</span>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.pageViews }}</div>
          <div class="stat-label">Total Views</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap stat-green">
          <span class="material-symbols-rounded">check_circle</span>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.attendanceStats?.hadir || 0 }}</div>
          <div class="stat-label">Hadir</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap stat-red">
          <span class="material-symbols-rounded">cancel</span>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.attendanceStats?.tidak_hadir || 0 }}</div>
          <div class="stat-label">Tidak Hadir</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap stat-purple">
          <span class="material-symbols-rounded">groups</span>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.totalPax }}</div>
          <div class="stat-label">Estimasi Pax</div>
        </div>
      </div>
    </div>

    <!-- Attendance Bar -->
    <div v-if="stats && stats.totalRsvps > 0" class="attendance-bar-card">
      <div class="attendance-title">Statistik Kehadiran</div>
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
/* ===== Invitation Hero Card ===== */
.inv-hero {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
}

.inv-hero-cover {
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: linear-gradient(135deg, #e8ecf4, #d1d5e0);
}

.inv-hero-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.inv-hero:hover .inv-hero-cover img {
  transform: scale(1.03);
}

.inv-hero-cover-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inv-hero-body {
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

.inv-hero-btn {
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* ===== Stats Grid ===== */
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
  display: flex;
  align-items: center;
  gap: 14px;
  transition: all 0.2s;
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.stat-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon-wrap .material-symbols-rounded {
  font-size: 22px;
}

.stat-blue { background: #eff6ff; color: #3b82f6; }
.stat-green { background: #ecfdf5; color: #10b981; }
.stat-red { background: #fef2f2; color: #ef4444; }
.stat-purple { background: #f5f3ff; color: #8b5cf6; }

.stat-info {
  flex: 1;
  min-width: 0;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 2px;
}

.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* ===== Attendance Bar ===== */
.attendance-bar-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.attendance-title {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
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
/* ===== Desktop: Horizontal Hero Card ===== */
@media (min-width: 768px) {
  .inv-hero {
    display: flex;
    flex-direction: row;
    margin-bottom: 24px;
  }

  .inv-hero-cover {
    width: 220px;
    flex-shrink: 0;
    aspect-ratio: 3 / 4;
  }

  .inv-hero-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 28px 32px;
    flex: 1;
  }

  .inv-names {
    font-size: 22px;
  }

  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 24px;
  }
}
</style>

