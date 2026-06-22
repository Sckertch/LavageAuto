import axios from 'axios'
import router from '@/router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Intercepteur de requetes: ajoute le token automatiquement si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Intercepteur de réponse : redirige vers /admin et déconnecte en cas de 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Import dynamique pour éviter les imports circulaires
      const { useAuthStore } = await import('@/stores/useAuthStore')
      const authStore = useAuthStore()

      // Réinitialise le store Pinia + localStorage
      authStore.token = null
      authStore.user = null
      localStorage.removeItem('token')

      // Redirige vers la page de connexion
      window.location.href = '/admin'
    }
    return Promise.reject(error)
  },
)

export default api
