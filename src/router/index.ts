import HomeView from '@/views/HomeView.vue'
import ThePrestationView from '@/views/ThePrestationView.vue'
import ThePanierView from '@/views/ThePanierView.vue'
import TheProductView from '@/views/TheProduitView.vue'
import AdminLoginView from '@/views/AdminLoginView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import AdminPrestationListView from '@/views/AdminPrestationListView.vue'
import AdminProduitListView from '@/views/AdminProduitListView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/prestations', name: 'ThePrestationView', component: ThePrestationView },
  { path: '/produits', name: 'TheProduitView', component: TheProductView },
  { path: '/panier', name: 'ThePanierView', component: ThePanierView },
  {
    path: '/admin',
    name: 'admin-login',
    component: AdminLoginView,
  },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: AdminDashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/prestations',
    name: 'admin-prestations',
    component: AdminPrestationListView,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/produits',
    name: 'admin-produits',
    component: AdminProduitListView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

// vérifie le token avant chaque navigation
router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'admin-login' }   // redirige vers login si pas connecté
  }

  if (to.name === 'admin-login' && authStore.isAuthenticated) {
    return { name: 'admin-dashboard' }  // redirige vers dashboard si déjà connecté
  }
})
export default router
