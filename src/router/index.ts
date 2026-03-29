import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const host = window.location.hostname
const parts = host.split('.')
let subdomain: string | null = null
let isLandingPage = false

if (host === 'localhost' || host === '127.0.0.1') {
  // Allow test.localhost if someone set it up
  if (parts.length >= 2 && parts[0] !== 'localhost' && parts[0] !== '127') {
    if (parts[0] === 'saya') {
      isLandingPage = true
    } else {
      subdomain = parts[0] || null
    }
  }
} else if (host.endsWith('.vercel.app')) {
  // Untuk domain bawaan Vercel: project-name.vercel.app (3 bagian)
  // Jika ada subdomain beneran: romi-juli.project-name.vercel.app (4 bagian)
  if (parts.length >= 4) {
    if (parts[0] === 'saya') {
      isLandingPage = true
    } else {
      subdomain = parts[0] || null
    }
  }
} else {
  // Domain biasa misal: mydomain.com (2 bagian) -> romi-juli.mydomain.com (3 bagian)
  if (parts.length >= 3 && parts[0] !== 'www' && parts[0] !== 'admin') {
    if (parts[0] === 'saya') {
      isLandingPage = true
    } else {
      subdomain = parts[0] || null
    }
  }
}

let routes: RouteRecordRaw[]

if (isLandingPage) {
  // Landing page untuk subdomain saya.*
  routes = [
    {
      path: '/:pathMatch(.*)*',
      name: 'landing',
      component: () => import('@/views/LandingView.vue'),
      meta: { title: 'MengundangAnda — Undangan Digital Pernikahan Premium' }
    }
  ]
} else if (subdomain) {
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
  // Admin panel (root domain)
  routes = [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { title: 'Login - UndanganGen', guest: true }
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/admin/DashboardView.vue'),
      meta: { title: 'Dashboard - Undangan Generator', requiresAuth: true }
    },

    {
      path: '/create',
      name: 'create',
      component: () => import('@/views/admin/CreateInvitationView.vue'),
      meta: { title: 'Buat Undangan - Undangan Generator', requiresAuth: true }
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('@/views/admin/EditInvitationView.vue'),
      meta: { title: 'Edit Undangan - Undangan Generator', requiresAuth: true }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/admin/UserManagementView.vue'),
      meta: { title: 'Kelola User - UndanganGen', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/landing',
      name: 'landing-preview',
      component: () => import('@/views/LandingView.vue'),
      meta: { title: 'MengundangAnda — Undangan Digital Pernikahan Premium' }
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

let authInitialized = false

router.beforeEach(async (to, _from, next) => {
  document.title = (to.meta.title as string) || 'Undangan Generator'

  // Skip auth checks for non-admin routes (invitation view, landing page)
  if (!to.meta.requiresAuth && !to.meta.guest) {
    return next()
  }

  const auth = useAuthStore()

  // Initialize auth state on first navigation
  if (!authInitialized && auth.token) {
    await auth.fetchMe()
    authInitialized = true
  }

  // Guest-only routes (login page) — redirect to dashboard if already logged in
  if (to.meta.guest && auth.isAuthenticated && auth.user) {
    return next({ name: 'dashboard' })
  }

  // Protected routes — redirect to login if not authenticated
  if (to.meta.requiresAuth) {
    if (!auth.isAuthenticated || !auth.user) {
      return next({ name: 'login', query: { redirect: to.fullPath } })
    }

    // Admin-only routes
    if (to.meta.requiresAdmin && !auth.isAdmin) {
      return next({ name: 'dashboard' })
    }
  }

  next()
})

export default router
