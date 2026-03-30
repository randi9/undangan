import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

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
      path: '/login/:pathMatch(.*)*',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { title: 'Login - UndanganGen', guest: true }
    },
    {
      path: '/sign-up/:pathMatch(.*)*',
      name: 'sign-up',
      component: () => import('@/views/auth/SignupView.vue'),
      meta: { title: 'Sign Up - UndanganGen', guest: true }
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

router.beforeEach((to) => {
  document.title = (to.meta.title as string) || 'Undangan Generator'
  return true
})

export default router
