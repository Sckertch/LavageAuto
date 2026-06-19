<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import type { InfoConnection } from '@/Entity/InfoConnection.ts'

const router = useRouter()
const authStore = useAuthStore()

const credentials = reactive<InfoConnection>({
  email: '',
  password: '',
})

const error = ref<string | null>(null)
const loading = ref<boolean>(false)

async function handleLogin(): Promise<void> {
  loading.value = true
  error.value = null
  try {
    await authStore.loginAdmin(credentials)
    router.push('/admin/dashboard')
  } catch {
    error.value = 'Email ou mot de passe incorrect'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <form @submit.prevent="handleLogin" class="flex flex-col gap-4 w-80">
      <h1 class="text-2xl font-bold text-center">Connexion Admin</h1>

      <input
        v-model="credentials.email"
        type="email"
        placeholder="Email"
        required
        class="border rounded px-3 py-2"
      />

      <input
        v-model="credentials.password"
        type="password"
        placeholder="Mot de passe"
        required
        class="border rounded px-3 py-2"
      />

      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

      <button type="submit" :disabled="loading" class="bg-blue-600 text-white rounded py-2">
        {{ loading ? 'Connexion...' : 'Se connecter' }}
      </button>
    </form>
  </div>
</template>

