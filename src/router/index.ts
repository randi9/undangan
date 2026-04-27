import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import LandingView from "@/views/LandingView.vue";

const host = globalThis.location.hostname;
const parts = host.split(".");
let subdomain: string | null = null;

if (
  host === "localhost" ||
  host === "127.0.0.1" ||
  /^\d+\.\d+\.\d+\.\d+$/.test(host)
) {
  // Allow test.localhost if someone set it up
  if (parts.length >= 2 && parts[0] !== "localhost" && parts[0] !== "127") {
    subdomain = parts[0] || null;
  }
} else if (host.endsWith(".vercel.app")) {
  // Untuk domain bawaan Vercel: project-name.vercel.app (3 bagian)
  // Jika ada subdomain beneran: romi-juli.project-name.vercel.app (4 bagian)
  if (parts.length >= 4) {
    subdomain = parts[0] || null;
  }
} else if (parts.length >= 3 && parts[0] !== "www") {
  // Domain biasa misal: mydomain.com (2 bagian) -> romi-juli.mydomain.com (3 bagian)
  subdomain = parts[0] || null;
}

let routes: RouteRecordRaw[];

if (subdomain) {
  // Undangan untuk subdomain slug.*
  routes = [
    {
      path: "/:pathMatch(.*)*",
      name: "invitation-subdomain",
      component: () => import("@/views/invitation/InvitationView.vue"),
      meta: { title: "Undangan Pernikahan", subdomain },
    },
  ];
} else {
  // Root domain — Landing Page + Dashboard + Auth + Legal
  routes = [
    // === Public Pages ===
    {
      path: "/",
      name: "landing",
      component: LandingView,
      meta: { title: "MengundangAnda — Undangan Digital Pernikahan Premium" },
    },
    {
      path: "/login/:pathMatch(.*)*",
      name: "login",
      component: () => import("@/views/auth/LoginView.vue"),
      meta: { title: "Login - Mengundang Anda", guest: true },
    },
    {
      path: "/sign-up/:pathMatch(.*)*",
      name: "sign-up",
      component: () => import("@/views/auth/SignupView.vue"),
      meta: { title: "Sign Up - Mengundang Anda", guest: true },
    },
    {
      path: "/terms",
      name: "terms",
      component: () => import("@/views/TermsView.vue"),
      meta: { title: "Syarat & Ketentuan - MengundangAnda" },
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("@/views/PrivacyView.vue"),
      meta: { title: "Kebijakan Privasi - MengundangAnda" },
    },
    {
      path: "/order",
      name: "order",
      component: () => import("@/views/OrderView.vue"),
      meta: { title: "Pesan Jasa Dibuatkan Undangan - MengundangAnda" },
    },
    {
      path: "/themes",
      name: "public-themes",
      component: () => import("@/views/PublicThemesView.vue"),
      meta: { title: "Koleksi Tema Undangan - MengundangAnda" },
    },

    // === Dashboard (Protected) ===
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/admin/DashboardView.vue"),
      meta: { title: "Dashboard - MengundangAnda", requiresAuth: true },
    },
    {
      path: "/dashboard/analytics",
      name: "analytics",
      component: () => import("@/views/admin/AnalyticsView.vue"),
      meta: { title: "Analitik - MengundangAnda", requiresAuth: true },
    },
    {
      path: "/dashboard/themes",
      name: "themes",
      component: () => import("@/views/admin/ThemeCatalogView.vue"),
      meta: { title: "Koleksi Tema - MengundangAnda", requiresAuth: true },
    },
    {
      path: "/dashboard/create",
      name: "create",
      component: () => import("@/views/admin/CreateInvitationView.vue"),
      meta: { title: "Buat Undangan - MengundangAnda", requiresAuth: true },
    },
    {
      path: "/dashboard/edit/:id",
      name: "edit",
      component: () => import("@/views/admin/EditInvitationView.vue"),
      meta: { title: "Edit Undangan - MengundangAnda", requiresAuth: true },
    },
    {
      path: "/dashboard/guests/:id",
      name: "guests",
      component: () => import("@/views/admin/GuestListView.vue"),
      meta: { title: "Buku Tamu - MengundangAnda", requiresAuth: true },
    },
    {
      path: "/dashboard/wishes/:id",
      name: "wishes",
      component: () => import("@/views/admin/WishesManageView.vue"),
      meta: { title: "Kelola Ucapan - MengundangAnda", requiresAuth: true },
    },
    {
      path: "/dashboard/users",
      name: "users",
      component: () => import("@/views/admin/UserManagementView.vue"),
      meta: {
        title: "Kelola User - MengundangAnda",
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/dashboard/music",
      name: "music",
      component: () => import("@/views/admin/MusicLibraryAdminView.vue"),
      meta: {
        title: "Kelola Pustaka Lagu - MengundangAnda",
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/dashboard/vouchers",
      name: "vouchers",
      component: () => import("@/views/admin/VoucherManageView.vue"),
      meta: {
        title: "Kelola Voucher - MengundangAnda",
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/dashboard/orders",
      name: "orders-manage",
      component: () => import("@/views/admin/OrderManageView.vue"),
      meta: {
        title: "Kelola Pesanan - MengundangAnda",
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/dashboard/payment",
      name: "payment",
      component: () => import("@/views/admin/PaymentView.vue"),
      meta: { title: "Pembayaran - MengundangAnda", requiresAuth: true },
    },
    {
      path: "/dashboard/payment/success",
      name: "payment-success",
      component: () => import("@/views/admin/PaymentSuccessView.vue"),
      meta: {
        title: "Pembayaran Berhasil - MengundangAnda",
        requiresAuth: true,
      },
    },
    {
      // Fallback for localhost testing without subdomain
      path: "/invitation/:slug",
      name: "invitation",
      component: () => import("@/views/invitation/InvitationView.vue"),
      meta: { title: "Undangan Pernikahan" },
    },
    {
      // Catch-all 404
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFoundView.vue"),
      meta: { title: "Halaman Tidak Ditemukan - MengundangAnda" },
    },
  ];
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

function needsClerkForRoute(path: string, requiresAuthMeta?: unknown) {
  return (
    Boolean(requiresAuthMeta) ||
    path.startsWith("/login") ||
    path.startsWith("/sign-up")
  );
}

router.beforeEach((to) => {
  document.title = (to.meta.title as string) || "MengundangAnda";

  const clerkEnabled = globalThis.__CLERK_ENABLED__ === true;
  if (needsClerkForRoute(to.path, to.meta.requiresAuth) && !clerkEnabled) {
    const current =
      globalThis.location.pathname +
      globalThis.location.search +
      globalThis.location.hash;
    if (current !== to.fullPath) {
      globalThis.location.assign(to.fullPath);
      return false;
    }
  }

  return true;
});

export default router;
