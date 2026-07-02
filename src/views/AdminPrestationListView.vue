<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePrestationStore } from '@/stores/usePrestationStore'
import type { Prestation } from '@/Entity/Prestation'
import ModalePrestationForm from '@/components/ui/ModalePrestationForm.vue'
import { CDN_URL, IMAGE_FALLBACK } from '@/utils/environnement.ts'

const router = useRouter()
const prestationStore = usePrestationStore()

const modaleVisible = ref<boolean>(false)
const prestationSelectionnee = ref<Prestation | null>(null)

function ouvrirAjout(): void {
  prestationSelectionnee.value = null
  modaleVisible.value = true
}

function ouvrirModification(prestation: Prestation): void {
  prestationSelectionnee.value = prestation
  modaleVisible.value = true
}

function fermerModale(): void {
  modaleVisible.value = false
}

onMounted(async () => {
  await prestationStore.fetchPrestations()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-10">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <button
            @click="router.push('/admin/dashboard')"
            class="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Retour
          </button>
          <h1 class="text-3xl font-bold text-gray-800">Gestion des Prestations</h1>
        </div>
        <button
          @click="ouvrirAjout"
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <span class="text-lg leading-none">+</span> Ajouter
        </button>
      </div>

      <p class="text-sm text-gray-400 mb-4">💡 Cliquez sur une ligne pour modifier ou supprimer.</p>

      <p v-if="prestationStore.loading" class="text-gray-500">Chargement...</p>
      <p v-else-if="prestationStore.error" class="text-red-500">{{ prestationStore.error }}</p>

      <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th class="px-4 py-3 w-16">Image</th>
              <th class="px-4 py-3">Nom</th>
              <th class="px-4 py-3">Caractéristique</th>
              <th class="px-4 py-3 w-24">Prix</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="prestation in prestationStore.prestations"
              :key="prestation.id"
              @click="ouvrirModification(prestation)"
              class="border-t border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
              title="Cliquer pour modifier"
            >
              <td class="px-4 py-3">
                <img
                  v-if="prestation.image"
                  :src="
                    prestation.image
                      ? `${CDN_URL}/${prestation.image}`
                      : `${IMAGE_FALLBACK}/100/100`
                  "
                  :alt="prestation.nom"
                  class="w-12 h-12 object-cover rounded-lg border border-gray-200"
                />
                <div
                  v-else
                  class="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs"
                >
                  —
                </div>
              </td>
              <td class="px-4 py-4 font-medium text-gray-800">{{ prestation.nom }}</td>
              <td class="px-4 py-4 text-gray-500 max-w-xs truncate">
                {{ prestation.caracteristique }}
              </td>
              <td class="px-4 py-4 text-gray-700">{{ prestation.prix }} €</td>
            </tr>
            <tr v-if="prestationStore.prestations.length === 0">
              <td colspan="4" class="px-6 py-10 text-center text-gray-400">
                Aucune prestation trouvée.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <ModalePrestationForm
    :visible="modaleVisible"
    :prestation="prestationSelectionnee"
    @close="fermerModale"
  />
</template>
