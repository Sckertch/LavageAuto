import HomeView from '@/views/HomeView.vue'
import ThePrestation from '@/views/ThePrestation.vue'
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
      name: 'ThePrestation',
      component: ThePrestation,
    },
  ],
})

export default router
