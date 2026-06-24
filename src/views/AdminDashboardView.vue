<!-- src/views/AdminDashboardView.vue -->
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
  <div class="min-h-screen bg-gray-50 p-10">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-10">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
          <p class="mt-1 text-gray-500">Bienvenue {{ authStore.user?.name }} 👋</p>
        </div>
        <button
          @click="handleLogout"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        >
          Se déconnecter
        </button>
      </div>

      <!-- Navigation cards -->
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Que souhaitez-vous gérer ?</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!-- Carte Prestations -->
        <button
          @click="router.push('/admin/prestations')"
          class="flex flex-col items-start gap-3 bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-blue-400 transition-all text-left"
        >
          <div class="text-4xl">🧽</div>
          <div>
            <h3 class="text-xl font-bold text-gray-800">Prestations</h3>
            <p class="text-gray-500 mt-1 text-sm">Gérer les prestations de lavage</p>
          </div>
          <span class="mt-auto text-blue-600 text-sm font-medium">Accéder →</span>
        </button>

        <!-- Carte Produits -->
        <button
          @click="router.push('/admin/produits')"
          class="flex flex-col items-start gap-3 bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-blue-400 transition-all text-left"
        >
          <div class="text-4xl">📦</div>
          <div>
            <h3 class="text-xl font-bold text-gray-800">Produits</h3>
            <p class="text-gray-500 mt-1 text-sm">Gérer les produits de la boutique</p>
          </div>
          <span class="mt-auto text-blue-600 text-sm font-medium">Accéder →</span>
        </button>

        <button
          @click="router.push('/admin/devis')"
          class="flex flex-col items-start gap-3 bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-blue-400 transition-all text-left"
        >
          <div class="text-4xl">📄</div>
          <div>
            <h3 class="text-xl font-bold text-gray-800">Devis</h3>
            <p class="text-gray-500 mt-1 text-sm">Consulter et gérer les devis clients</p>
          </div>
          <span class="mt-auto text-blue-600 text-sm font-medium">Accéder →</span>
        </button>
      </div>
    </div>
  </div>
</template>
