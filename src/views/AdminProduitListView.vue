<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProduitStore } from '@/stores/useProduitStore'
import type { Produit } from '@/Entity/Produit'
import ModaleProduitForm from '@/components/ui/ModaleProduitForm.vue'
import { CDN_URL, IMAGE_FALLBACK } from '@/utils/environnement.ts'

const router = useRouter()
const produitStore = useProduitStore()

const modaleVisible = ref<boolean>(false)
const produitSelectionne = ref<Produit | null>(null)

function ouvrirAjout(): void {
  produitSelectionne.value = null
  modaleVisible.value = true
}

function ouvrirModification(produit: Produit): void {
  produitSelectionne.value = produit
  modaleVisible.value = true
}

function fermerModale(): void {
  modaleVisible.value = false
}

onMounted(async () => {
  await produitStore.fetchProduits()
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
          <h1 class="text-3xl font-bold text-gray-800">Gestion des Produits</h1>
        </div>
        <button
          @click="ouvrirAjout"
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <span class="text-lg leading-none">+</span> Ajouter
        </button>
      </div>

      <p class="text-sm text-gray-400 mb-4">💡 Cliquez sur une ligne pour modifier ou supprimer.</p>

      <p v-if="produitStore.loading" class="text-gray-500">Chargement...</p>
      <p v-else-if="produitStore.error" class="text-red-500">{{ produitStore.error }}</p>

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
              v-for="produit in produitStore.produits"
              :key="produit.id"
              @click="ouvrirModification(produit)"
              class="border-t border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
              title="Cliquer pour modifier"
            >
              <td class="px-4 py-3">
                <img
                  v-if="produit.image"
                  :src="produit.image ? `${CDN_URL}/${produit.image}` : `${IMAGE_FALLBACK}/100/100`"
                  :alt="produit.nom"
                  class="w-12 h-12 object-cover rounded-lg border border-gray-200"
                />
                <div
                  v-else
                  class="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs"
                >
                  —
                </div>
              </td>
              <td class="px-4 py-4 font-medium text-gray-800">{{ produit.nom }}</td>
              <td class="px-4 py-4 text-gray-500 max-w-xs truncate">
                {{ produit.caracteristique }}
              </td>
              <td class="px-4 py-4 text-gray-700">{{ produit.prix }} €</td>
            </tr>
            <tr v-if="produitStore.produits.length === 0">
              <td colspan="4" class="px-6 py-10 text-center text-gray-400">
                Aucun produit trouvé.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <ModaleProduitForm :visible="modaleVisible" :produit="produitSelectionne" @close="fermerModale" />
</template>
