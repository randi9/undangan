import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const host = window.location.hostname
const parts = host.split('.')
let subdomain: string | null = null

if (host === 'localhost' || host === '127.0.0.1' || /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
  // Allow test.localhost if someone set it up
  if (parts.length >= 2 && parts[0] !== 'localhost' && parts[0] !== '127') {
    subdomain = parts[0] || null
  }
} else if (host.endsWith('.vercel.app')) {
  // Untuk domain bawaan Vercel: project-name.vercel.app (3 bagian)
  // Jika ada subdomain beneran: romi-juli.project-name.vercel.app (4 bagian)
  if (parts.length >= 4) {
    subdomain = parts[0] || null
  }
} else {
  // Domain biasa misal: mydomain.com (2 bagian) -> romi-juli.mydomain.com (3 bagian)
  if (parts.length >= 3 && parts[0] !== 'www') {
    subdomain = parts[0] || null
  }
}

let routes: RouteRecordRaw[]

if (subdomain) {
  // Undangan untuk subdomain slug.*
  routes = [
    {
      path: '/:pathMatch(.*)*',
      name: 'invitation-subdomain',
      component: () => import('@/views/invitation/InvitationView.vue'),
      meta: { title: 'Undangan Pernikahan', subdomain }
    }
  ]
} else {
  // Root domain — Landing Page + Dashboard + Auth + Legal
  routes = [
    // === Public Pages ===
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/LandingView.vue'),
      meta: { title: 'MengundangAnda — Undangan Digital Pernikahan Premium' }
    },
    {
      path: '/login/:pathMatch(.*)*',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { title: 'Login - Mengundang Anda', guest: true }
    },
    {
      path: '/sign-up/:pathMatch(.*)*',
      name: 'sign-up',
      component: () => import('@/views/auth/SignupView.vue'),
      meta: { title: 'Sign Up - Mengundang Anda', guest: true }
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/TermsView.vue'),
      meta: { title: 'Syarat & Ketentuan - MengundangAnda' }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/views/PrivacyView.vue'),
      meta: { title: 'Kebijakan Privasi - MengundangAnda' }
    },

    // === Dashboard (Protected) ===
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/admin/DashboardView.vue'),
      meta: { title: 'Dashboard - MengundangAnda', requiresAuth: true }
    },
    {
      path: '/dashboard/themes',
      name: 'themes',
      component: () => import('@/views/admin/ThemeCatalogView.vue'),
      meta: { title: 'Koleksi Tema - MengundangAnda', requiresAuth: true }
    },
    {
      path: '/dashboard/create',
      name: 'create',
      component: () => import('@/views/admin/CreateInvitationView.vue'),
      meta: { title: 'Buat Undangan - MengundangAnda', requiresAuth: true }
    },
    {
      path: '/dashboard/edit/:id',
      name: 'edit',
      component: () => import('@/views/admin/EditInvitationView.vue'),
      meta: { title: 'Edit Undangan - MengundangAnda', requiresAuth: true }
    },
    {
      path: '/dashboard/guests/:id',
      name: 'guests',
      component: () => import('@/views/admin/GuestListView.vue'),
      meta: { title: 'Buku Tamu - MengundangAnda', requiresAuth: true }
    },
    {
      path: '/dashboard/users',
      name: 'users',
      component: () => import('@/views/admin/UserManagementView.vue'),
      meta: { title: 'Kelola User - MengundangAnda', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/dashboard/vouchers',
      name: 'vouchers',
      component: () => import('@/views/admin/VoucherManageView.vue'),
      meta: { title: 'Kelola Voucher - MengundangAnda', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/dashboard/payment',
      name: 'payment',
      component: () => import('@/views/admin/PaymentView.vue'),
      meta: { title: 'Pembayaran - MengundangAnda', requiresAuth: true }
    },
    {
      path: '/dashboard/payment/success',
      name: 'payment-success',
      component: () => import('@/views/admin/PaymentSuccessView.vue'),
      meta: { title: 'Pembayaran Berhasil - MengundangAnda', requiresAuth: true }
    },
    {
      // Fallback for localhost testing without subdomain
      path: '/invitation/:slug',
      name: 'invitation',
      component: () => import('@/views/invitation/InvitationView.vue'),
      meta: { title: 'Undangan Pernikahan' }
    }
  ]
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  document.title = (to.meta.title as string) || 'MengundangAnda'
  return true
})

export default router
