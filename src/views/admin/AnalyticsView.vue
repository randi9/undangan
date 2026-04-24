<template>
  <AdminLayout>
    <div class="analytics-page">
      <div class="section-header">
        <div>
          <h1 v-if="isAdmin" class="admin-page-title">Analitik Keseluruhan</h1>
          <h1 v-else class="admin-page-title">
            Analitik Undangan {{ mainInvitation ? (mainInvitation.groom_name + ' & ' + mainInvitation.bride_name) : '' }}
          </h1>
          <p class="admin-page-subtitle">
            <span v-if="isAdmin">Pantau performa dan statistik seluruh undangan dalam sistem</span>
            <span v-else>Pantau tingkat kehadiran, sisa kuota, dan performa undangan Anda</span>
          </p>
        </div>
      </div>

      <div v-if="store.loading" class="analytics-loading">
        <AppSkeleton height="140px" rounded="2xl" class="mb-6" />
        <div class="stats-grid">
          <AppSkeleton v-for="i in 4" :key="`skel-stat-${i}`" height="120px" rounded="2xl" />
        </div>
      </div>

      <div v-else class="analytics-content">
        
        <!-- ============================== -->
        <!-- MODE USER BIASA (CALON PENGANTIN) -->
        <!-- ============================== -->
        <template v-if="!isAdmin">
          <!-- Hero Metrics User -->
          <div class="metrics-grid user-metrics">
            <!-- Countdown Hari H -->
            <div class="metric-card metric-countdown">
              <div class="metric-icon">
                <Icon icon="ph:calendar-check-duotone" />
              </div>
              <div class="metric-info">
                <div class="metric-label">Menuju Hari H</div>
                <div class="metric-value">{{ daysToWedding }} <span style="font-size: 14px; font-weight: 500">Hari Lagi</span></div>
              </div>
              <div class="metric-bg-icon"><Icon icon="ph:calendar-check-duotone" /></div>
            </div>

            <!-- Kuota Views (Hanya tampil jika Trial) -->
            <div v-if="mainInvitation?.payment_status === 'trial'" class="metric-card metric-views">
              <div class="metric-icon" style="background: linear-gradient(135deg, #fffbeb, #fef3c7); color: #d97706">
                <Icon icon="ph:chart-pie-slice-duotone" />
              </div>
              <div class="metric-info">
                <div class="metric-label">Sisa Kuota Tayangan</div>
                <div class="metric-value" style="color: #b45309">
                  {{ Math.max(0, (mainInvitation.max_views || 25) - (mainInvitation.view_count || 0)) }}
                  <span style="font-size: 14px; font-weight: 500; color: #d97706">/ {{ mainInvitation.max_views || 25 }}</span>
                </div>
              </div>
              <div class="metric-bg-icon" style="color: #f59e0b"><Icon icon="ph:chart-pie-slice-duotone" /></div>
            </div>
            
            <div v-else class="metric-card metric-views">
              <div class="metric-icon" style="background: linear-gradient(135deg, #eff6ff, #dbeafe); color: #3b82f6">
                <Icon icon="ph:infinity-bold" />
              </div>
              <div class="metric-info">
                <div class="metric-label">Status Akses (Premium)</div>
                <div class="metric-value" style="color: #1d4ed8; font-size: 24px">Tak Terbatas</div>
              </div>
              <div class="metric-bg-icon" style="color: #3b82f6"><Icon icon="ph:infinity-bold" /></div>
            </div>

            <!-- Total Kehadiran RSVP -->
            <div class="metric-card metric-rsvp">
              <div class="metric-icon">
                <Icon icon="ph:users-duotone" />
              </div>
              <div class="metric-info">
                <div class="metric-label">Total Tamu Hadir</div>
                <div class="metric-value">{{ totalHadir }} <span style="font-size: 14px; font-weight: 500">Orang</span></div>
              </div>
              <div class="metric-bg-icon"><Icon icon="ph:users-duotone" /></div>
            </div>

            <!-- Total Tayangan -->
            <div class="metric-card metric-photos">
              <div class="metric-icon" style="background: linear-gradient(135deg, #fdf2f8, #fce7f3); color: #ec4899">
                <Icon icon="ph:eye-duotone" />
              </div>
              <div class="metric-info">
                <div class="metric-label">Total Dilihat</div>
                <div class="metric-value">{{ mainInvitation?.view_count || 0 }} <span style="font-size: 14px; font-weight: 500">Kali</span></div>
              </div>
              <div class="metric-bg-icon" style="color: #ec4899"><Icon icon="ph:eye-duotone" /></div>
            </div>
          </div>

          <!-- Charts Row User -->
          <div class="charts-row">
            <!-- RSVP Composition Bar -->
            <div class="chart-card rsvp-composition">
              <h3 class="chart-title">Komposisi Kehadiran Tamu</h3>
              <p class="chart-subtitle">Persentase dari total {{ mainInvitation?.rsvp_count || 0 }} balasan RSVP</p>
              
              <div v-if="(mainInvitation?.rsvp_count || 0) > 0" class="progress-container">
                <!-- Bar Visual -->
                <div class="progress-bar-stacked">
                  <div class="bar-segment bar-hadir" :style="{ width: percentHadir + '%' }" title="Hadir"></div>
                  <div class="bar-segment bar-ragu" :style="{ width: percentRagu + '%' }" title="Ragu-ragu"></div>
                  <div class="bar-segment bar-tidak" :style="{ width: percentTidak + '%' }" title="Tidak Hadir"></div>
                </div>
                
                <!-- Legend -->
                <div class="progress-legend">
                  <div class="legend-item">
                    <div class="legend-color" style="background: #10b981"></div>
                    <div class="legend-text"><strong>{{ percentHadir }}%</strong> Hadir ({{ totalHadir }})</div>
                  </div>
                  <div class="legend-item">
                    <div class="legend-color" style="background: #f59e0b"></div>
                    <div class="legend-text"><strong>{{ percentRagu }}%</strong> Ragu-ragu ({{ totalRagu }})</div>
                  </div>
                  <div class="legend-item">
                    <div class="legend-color" style="background: #ef4444"></div>
                    <div class="legend-text"><strong>{{ percentTidak }}%</strong> Tidak Hadir ({{ totalTidak }})</div>
                  </div>
                </div>
              </div>
              <div v-else class="empty-chart">
                <Icon icon="ph:chat-teardrop-text-duotone" style="font-size: 32px; color: #cbd5e1; margin-bottom: 8px" />
                <div>Belum ada balasan RSVP yang masuk.</div>
              </div>
            </div>

            <!-- Recent Wishes (User View) -->
            <div class="chart-card recent-wishes">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <h3 class="chart-title">Ucapan & Doa Terbaru</h3>
                <router-link v-if="mainInvitation" :to="`/dashboard/wishes/${mainInvitation.id}`" class="view-all-link">Lihat Semua</router-link>
              </div>
              <p class="chart-subtitle">Doa dari tamu undangan Anda</p>
              
              <div class="recent-list" v-if="recentRsvps.length > 0">
                <div v-for="rsvp in recentRsvps" :key="rsvp.id" class="recent-item" style="align-items: flex-start">
                  <div class="recent-icon" style="background: #f8fafc; color: #64748b">
                    <Icon icon="ph:user-circle-duotone" />
                  </div>
                  <div class="recent-info">
                    <div class="recent-name">{{ rsvp.guest_name }}</div>
                    <div class="recent-date" style="color: #475569; font-size: 13px; margin-top: 4px; line-height: 1.4; font-style: italic;">"{{ rsvp.message }}"</div>
                  </div>
                </div>
              </div>
              <div v-else class="empty-chart">
                <Icon icon="ph:envelope-simple-open-duotone" style="font-size: 32px; color: #cbd5e1; margin-bottom: 8px" />
                <div>Belum ada ucapan yang masuk.</div>
              </div>
            </div>
          </div>
        </template>


        <!-- ============================== -->
        <!-- MODE ADMIN KESELURUHAN -->
        <!-- ============================== -->
        <template v-else>
          <!-- Hero Metrics Admin -->
          <div class="metrics-grid">
            <div class="metric-card metric-views">
              <div class="metric-icon"><Icon icon="ph:eye-duotone" /></div>
              <div class="metric-info">
                <div class="metric-label">Total Dilihat (Global)</div>
                <div class="metric-value">{{ totalViews.toLocaleString() }}</div>
              </div>
              <div class="metric-bg-icon"><Icon icon="ph:eye-duotone" /></div>
            </div>

            <div class="metric-card metric-rsvp">
              <div class="metric-icon"><Icon icon="ph:users-duotone" /></div>
              <div class="metric-info">
                <div class="metric-label">Total RSVP (Global)</div>
                <div class="metric-value">{{ totalRsvps.toLocaleString() }}</div>
              </div>
              <div class="metric-bg-icon"><Icon icon="ph:users-duotone" /></div>
            </div>

            <div class="metric-card metric-inv">
              <div class="metric-icon"><Icon icon="ph:envelope-open-duotone" /></div>
              <div class="metric-info">
                <div class="metric-label">Total Undangan Aktif</div>
                <div class="metric-value">{{ invitations.length }}</div>
              </div>
              <div class="metric-bg-icon"><Icon icon="ph:envelope-open-duotone" /></div>
            </div>

            <div class="metric-card metric-photos">
              <div class="metric-icon"><Icon icon="ph:image-square-duotone" /></div>
              <div class="metric-info">
                <div class="metric-label">Total Foto Diunggah</div>
                <div class="metric-value">{{ totalPhotos.toLocaleString() }}</div>
              </div>
              <div class="metric-bg-icon"><Icon icon="ph:image-square-duotone" /></div>
            </div>
          </div>

          <!-- Charts Row Admin -->
          <div class="charts-row">
            <!-- Top Invitations by Views -->
            <div class="chart-card top-invitations">
              <h3 class="chart-title">Top 5 Undangan Populer</h3>
              <p class="chart-subtitle">Berdasarkan jumlah tayangan (views) terbanyak</p>
              
              <div class="top-list" v-if="topInvitations.length > 0">
                <div v-for="(inv, idx) in topInvitations" :key="inv.id" class="top-item">
                  <div class="top-rank" :class="{'rank-1': idx === 0, 'rank-2': idx === 1, 'rank-3': idx === 2}">
                    {{ idx + 1 }}
                  </div>
                  <div class="top-info">
                    <div class="top-name">{{ inv.groom_name }} & {{ inv.bride_name }}</div>
                    <div class="top-slug">{{ getInvitationDisplayUrl(inv.slug) }}</div>
                  </div>
                  <div class="top-views">
                    <Icon icon="ph:eye-duotone" />
                    {{ inv.view_count || 0 }}
                  </div>
                </div>
              </div>
              <div v-else class="empty-chart">Belum ada data undangan.</div>
            </div>

            <!-- Recent Invitations -->
            <div class="chart-card rsvp-composition">
              <h3 class="chart-title">Undangan Terbaru Dibuat</h3>
              <p class="chart-subtitle">5 undangan terakhir yang masuk ke sistem</p>
              
              <div class="recent-list" v-if="recentInvitations.length > 0">
                <div v-for="inv in recentInvitations" :key="inv.id" class="recent-item">
                  <div class="recent-icon">
                    <Icon icon="ph:envelope-simple-open-duotone" />
                  </div>
                  <div class="recent-info">
                    <div class="recent-name">{{ inv.groom_name }} & {{ inv.bride_name }}</div>
                    <div class="recent-date">{{ formatDate(inv.created_at) }} &bull; Tema: <span style="text-transform: capitalize">{{ inv.theme }}</span></div>
                  </div>
                  <router-link :to="`/dashboard/edit/${inv.id}`" class="recent-action">
                    <Icon icon="ph:arrow-right-bold" />
                  </router-link>
                </div>
              </div>
              <div v-else class="empty-chart">Belum ada data undangan.</div>
            </div>
          </div>
        </template>

      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useInvitationStore } from "@/stores/invitation";
import { useAuthStore } from "@/stores/auth";
import { Icon } from "@iconify/vue";
import AdminLayout from "@/components/admin/AdminLayout.vue";
import AppSkeleton from "@/components/ui/AppSkeleton.vue";

const store = useInvitationStore();
const authStore = useAuthStore();

const isAdmin = computed(() => authStore.isAdmin);
const invitations = computed(() => store.invitations);

// For User Mode: Get their main invitation (usually index 0)
const mainInvitation = computed(() => invitations.value.length > 0 ? invitations.value[0] : null);

// Data untuk RSVP Dummy (Ideanya ditarik dari rsvps array jika di-load)
// Karena saat ini RSVPs tidak diload otomatis di list invitations, kita asumsikan atau mock sementara jika tidak ada data spesifik.
// Secara aktual, kita butuh fetchStats atau rsvps.
const userRsvps = ref<any[]>([]);

const daysToWedding = computed(() => {
  if (!mainInvitation.value || !mainInvitation.value.akad_date) return 0;
  const akadDate = new Date(mainInvitation.value.akad_date);
  const today = new Date();
  const diffTime = akadDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
});

// Aggregate User RSVPs (if loaded)
// Saat ini fallback menggunakan rsvp_count total jika array kosong
const totalHadir = computed(() => userRsvps.value.filter(r => r.attendance === 'hadir').length || mainInvitation.value?.rsvp_count || 0);
const totalTidak = computed(() => userRsvps.value.filter(r => r.attendance === 'tidak_hadir').length || 0);
const totalRagu = computed(() => userRsvps.value.filter(r => r.attendance === 'ragu').length || 0);

const totalRsvpResponses = computed(() => totalHadir.value + totalTidak.value + totalRagu.value || 1); // fallback 1 to avoid div by zero

const percentHadir = computed(() => Math.round((totalHadir.value / totalRsvpResponses.value) * 100) || 0);
const percentTidak = computed(() => Math.round((totalTidak.value / totalRsvpResponses.value) * 100) || 0);
const percentRagu = computed(() => 100 - percentHadir.value - percentTidak.value);

const recentRsvps = computed(() => {
  return [...userRsvps.value]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 4);
});


// Aggregate Admin Metrics
const totalPhotos = computed(() => invitations.value.reduce((sum, i) => sum + (i.photo_count || 0), 0));
const totalRsvps = computed(() => invitations.value.reduce((sum, i) => sum + (i.rsvp_count || 0), 0));
const totalViews = computed(() => invitations.value.reduce((sum, i) => sum + (i.view_count || 0), 0));

const topInvitations = computed(() => {
  return [...invitations.value]
    .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
    .slice(0, 5);
});

const recentInvitations = computed(() => {
  return [...invitations.value]
    .sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);
});

function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getInvitationDisplayUrl(slug: string) {
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".vercel.app")) {
    return `/invitation/${slug}`;
  }
  const mainDomain = host.replace("www.", "").replace("admin.", "");
  return `${slug}.${mainDomain}`;
}

onMounted(async () => {
  await store.fetchInvitations();
  
  if (!isAdmin.value && mainInvitation.value) {
    // Ideally we fetch actual RSVPs here if API allows
    // For now we simulate or use what we have
    // const stats = await store.fetchStats(mainInvitation.value.id);
  }
});
</script>

<style scoped>
.analytics-page {
  padding-bottom: 40px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.metric-card {
  position: relative;
  background: var(--admin-surface-solid);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  border: 1px solid var(--admin-border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
}

.metric-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  z-index: 2;
}

.metric-info {
  z-index: 2;
}

.metric-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--admin-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.metric-value {
  font-family: var(--font-heading);
  font-size: 32px;
  font-weight: 800;
  color: var(--admin-text);
  line-height: 1.1;
}

.metric-bg-icon {
  position: absolute;
  right: -20px;
  bottom: -20px;
  font-size: 120px;
  opacity: 0.04;
  z-index: 1;
  transform: rotate(-15deg);
  transition: transform 0.6s ease;
}

.metric-card:hover .metric-bg-icon {
  transform: rotate(0) scale(1.1);
}

/* Metric Colors Admin */
.metric-views .metric-icon { background: linear-gradient(135deg, #eff6ff, #dbeafe); color: #3b82f6; }
.metric-views .metric-bg-icon { color: #3b82f6; }

.metric-rsvp .metric-icon { background: linear-gradient(135deg, #f0fdf4, #dcfce7); color: #10b981; }
.metric-rsvp .metric-bg-icon { color: #10b981; }

.metric-inv .metric-icon { background: linear-gradient(135deg, #faf5ff, #f3e8ff); color: #a855f7; }
.metric-inv .metric-bg-icon { color: #a855f7; }

.metric-photos .metric-icon { background: linear-gradient(135deg, #fdf2f8, #fce7f3); color: #ec4899; }
.metric-photos .metric-bg-icon { color: #ec4899; }

/* Metric Colors User */
.metric-countdown .metric-icon { background: linear-gradient(135deg, #f5f3ff, #ede9fe); color: #8b5cf6; }
.metric-countdown .metric-bg-icon { color: #8b5cf6; }


/* Charts Area */
.charts-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
}

.chart-card {
  background: var(--admin-surface-solid);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  border: 1px solid var(--admin-border);
}

.chart-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--admin-text);
  margin-bottom: 4px;
}

.chart-subtitle {
  font-size: 13px;
  color: var(--admin-text-secondary);
  margin-bottom: 24px;
}

.empty-chart {
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--admin-text-secondary);
  font-size: 14px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
}

.view-all-link {
  font-size: 13px;
  color: var(--admin-primary);
  font-weight: 600;
  text-decoration: none;
}
.view-all-link:hover { text-decoration: underline; }

/* Progress Bar Stacked */
.progress-container {
  margin-top: 16px;
}

.progress-bar-stacked {
  display: flex;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
  background: #e2e8f0;
  margin-bottom: 20px;
}

.bar-segment {
  height: 100%;
  transition: width 0.5s ease-out;
}
.bar-hadir { background: #10b981; }
.bar-ragu { background: #f59e0b; }
.bar-tidak { background: #ef4444; }

.progress-legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #f1f5f9;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.legend-text {
  font-size: 14px;
  color: var(--admin-text);
}
.legend-text strong { font-size: 16px; }

/* Top List */
.top-list { display: flex; flex-direction: column; gap: 12px; }
.top-item {
  display: flex; align-items: center; gap: 16px; padding: 12px;
  border-radius: 12px; background: #f8fafc; transition: background 0.2s;
}
.top-item:hover { background: #f1f5f9; }
.top-rank {
  width: 32px; height: 32px; border-radius: 50%; background: #e2e8f0; color: #64748b;
  display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0;
}
.top-rank.rank-1 { background: linear-gradient(135deg, #fef08a, #facc15); color: #854d0e; }
.top-rank.rank-2 { background: linear-gradient(135deg, #e2e8f0, #cbd5e1); color: #334155; }
.top-rank.rank-3 { background: linear-gradient(135deg, #fed7aa, #fb923c); color: #9a3412; }
.top-info { flex: 1; min-width: 0; }
.top-name { font-size: 14px; font-weight: 600; color: var(--admin-text); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.top-slug { font-size: 12px; color: var(--admin-primary); }
.top-views {
  display: flex; align-items: center; gap: 6px; font-weight: 700; color: var(--admin-text);
  background: #fff; padding: 6px 12px; border-radius: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}
.top-views svg { color: var(--admin-text-secondary); }

/* Recent List */
.recent-list { display: flex; flex-direction: column; gap: 16px; }
.recent-item { display: flex; align-items: center; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; }
.recent-item:last-child { border-bottom: none; padding-bottom: 0; }
.recent-icon { width: 40px; height: 40px; border-radius: 12px; background: #f0fdf4; color: #16a34a; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
.recent-info { flex: 1; min-width: 0; }
.recent-name { font-size: 14px; font-weight: 600; color: var(--admin-text); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.recent-date { font-size: 12px; color: var(--admin-text-secondary); }
.recent-action { width: 32px; height: 32px; border-radius: 50%; background: #f8fafc; color: #64748b; display: flex; align-items: center; justify-content: center; transition: all 0.2s; text-decoration: none; }
.recent-action:hover { background: var(--admin-primary); color: #fff; }

@media (max-width: 1024px) {
  .metrics-grid { grid-template-columns: repeat(2, 1fr); }
  .charts-row { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .metrics-grid { grid-template-columns: 1fr; gap: 16px; }
  .metric-card { padding: 20px; }
  .chart-card { padding: 20px; }
}
</style>
