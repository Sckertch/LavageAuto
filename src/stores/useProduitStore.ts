import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Produit } from '@/Entity/Produit.ts'
import { getProduits } from '@/service/produitService.ts'

export const useProduitStore = defineStore('produit', () => {
  const produits = ref<Produit[]>([])

  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchProduits = async () => {
    loading.value = true
    error.value = null

    try {
      produits.value = await getProduits()
    } catch (err) {
      error.value = 'Erreur lors de la récupération des produits'
    } finally {
      loading.value = false
    }
  }

  return { produits, loading, error, fetchProduits }
})