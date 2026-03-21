import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const host = window.location.hostname
const parts = host.split('.')
let subdomain: string | null = null

if (host === 'localhost' || host === '127.0.0.1') {
  // Allow test.localhost if someone set it up
  if (parts.length >= 2 && parts[0] !== 'localhost' && parts[0] !== '127') {
    subdomain = parts[0] || null
  }
} else {
  // e.g., andi-sarah.domain.com -> parts = ['andi-sarah', 'domain', 'com']
  // avoid www or admin or main domain without subdomain
  if (parts.length >= 3 && parts[0] !== 'www' && parts[0] !== 'admin') {
    subdomain = parts[0] || null
  }
}

const routes: RouteRecordRaw[] = subdomain ? [
  {
    path: '/:pathMatch(.*)*',
    name: 'invitation-subdomain',
    component: () => import('@/views/invitation/InvitationView.vue'),
    meta: { title: 'Undangan Pernikahan', subdomain }
  }
] : [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/admin/DashboardView.vue'),
    meta: { title: 'Dashboard - Undangan Generator' }
  },
  {
    path: '/select-template',
    name: 'select-template',
    component: () => import('../views/admin/SelectTemplateView.vue'),
    meta: { title: 'Pilih Tema - Admin UndanganGen' }
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/views/admin/CreateInvitationView.vue'),
    meta: { title: 'Buat Undangan - Undangan Generator' }
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('@/views/admin/EditInvitationView.vue'),
    meta: { title: 'Edit Undangan - Undangan Generator' }
  },
  {
    // Fallback for localhost testing without subdomain
    path: '/invitation/:slug',
    name: 'invitation',
    component: () => import('@/views/invitation/InvitationView.vue'),
    meta: { title: 'Undangan Pernikahan' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || 'Undangan Generator'
  next()
})

export default router
