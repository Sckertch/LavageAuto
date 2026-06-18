import HomeView from '@/views/HomeView.vue'
import ThePrestationView from '@/views/ThePrestationView.vue'
import TheProductView from '@/views/TheProduitView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import ThePanierView from '@/views/ThePanierView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/prestations', name: 'ThePrestationView', component: ThePrestationView },
  { path: '/produits', name: 'TheProduitView', component: TheProductView },
  {path: '/panier', name: 'ThePanierView', component: ThePanierView },
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
export default router
