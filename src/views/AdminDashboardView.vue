<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

async function handleLogout(): Promise<void> {
  await authStore.logoutAdmin()
  router.push('/admin')
}
</script>

<template>
  <div class="p-10">
    <h1 class="text-3xl font-bold">Dashboard Admin</h1>
    <p class="mt-2">Bienvenue {{ authStore.user?.name }} 👋</p>
    <button @click="handleLogout" class="mt-6 bg-red-500 text-white px-4 py-2 rounded">
      Se déconnecter
    </button>
  </div>
</template>
