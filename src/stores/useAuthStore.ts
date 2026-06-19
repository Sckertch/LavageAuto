import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Admin } from '@/Entity/Admin'
import type { InfoConnection } from '@/Entity/InfoConnection'
import { login, logout } from '@/service/authService'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<Admin | null>(null)

  // true si connecté
  const isAuthenticated = computed<boolean>(() => !!token.value)

  async function loginAdmin(credentials: InfoConnection): Promise<void> {
    const response = await login(credentials)
    token.value = response.access_token
    user.value = response.user
    // Persiste le token pour ne pas être déconnecté au refresh
    localStorage.setItem('token', response.access_token)
  }

  async function logoutAdmin(): Promise<void> {
    await logout()
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  return { token, user, isAuthenticated, loginAdmin, logoutAdmin }
})
