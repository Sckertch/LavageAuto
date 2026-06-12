import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProduitStore = defineStore('produit', () => {
  const produits = ref([
    { nom: 'Produit 1', caracteristique: 'Léger, résistant, idéal pour un usage quotidien', prix: 29.99 },
    { nom: 'Produit 2', caracteristique: 'Haute performance, batterie longue durée', prix: 49.99 },
    { nom: 'Produit 3', caracteristique: 'Design compact, matériaux premium', prix: 79.99 },
    { nom: 'Produit 4', caracteristique: 'Multifonction, compatible tous appareils', prix: 19.99 },
    { nom: 'Produit 5', caracteristique: 'Édition limitée, coloris exclusif', prix: 99.99 },
  ])

  const loading = ref(false)
  const error = ref(null)

  // Plus tard : remplace le mock par ça
  // async function fetchProduits() {
  //   loading.value = true
  //   try {
  //     const res = await fetch('/api/produits')
  //     produits.value = await res.json()
  //   } catch (e) {
  //     error.value = e
  //   } finally {
  //     loading.value = false
  //   }
  // }

  return { produits, loading, error }
})