import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Produit } from '@/Entity/Produit.ts'
import { getProduits, createProduit, updateProduit, deleteProduit } from '@/service/produitService.ts'

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
  
  async function addProduit(data: Omit<Produit, 'id'>): Promise<void> {
    const nouveau = await createProduit(data)
    produits.value.push(nouveau)
  }
  
  async function editProduit(id:number, data: Omit<Produit, 'id'>): Promise<void> {
    const modifiee = await updateProduit(id, data)
    const index = produits.value.findIndex((p) => p.id === id)
    if (index !== -1) produits.value[index] = modifiee
  }

  async function removeProduit(id: number): Promise<void> {
    await deleteProduit(id)
    produits.value = produits.value.filter((p) => p.id !== id)
  }

  return { produits, loading, error, fetchProduits, addProduit, editProduit, removeProduit }
})