import HomeView from '@/views/HomeView.vue'
import ThePrestationView from '@/views/ThePrestationView.vue'
import TheProductView from '@/views/TheProduitView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/prestations',
      name: 'ThePrestationView',
      component: ThePrestationView,
    },
    {
      path: '/produits',
      name: 'TheProduitView',
      component: TheProductView,
    },
  ],
})

export default router
