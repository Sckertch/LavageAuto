import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { PanierItem } from '@/Entity/PanierItem'

const STORAGE_KEY = 'panier'

export const usePanierStore = defineStore('Panier', () => {
  // Hydratation depuis localStorage sinon vide
  const itemsDuPanier = ref<PanierItem[]>(
    (JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as PanierItem[]).map((item) => ({
      ...item,
      id: String(item.id),
      prix: Number(item.prix),
      quantite: Number(item.quantite),
    }))
  )

  //Persister les données dans le localstorage
  function persist(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsDuPanier.value))
  }

  function ajouterUnItem(item: Omit<PanierItem, 'quantite'>) {
    console.log(item)

    const itemNormalise: Omit<PanierItem, 'quantite'> = {
      ...item,
        id: String(item.id),
        nom: item.nom,
        prix: Number(item.prix),
    }

    const estDejaDansLePanier = itemsDuPanier.value.find(
      (i: PanierItem) => i.id === itemNormalise.id && i.type === itemNormalise.type,
    )

    if (estDejaDansLePanier) {
      estDejaDansLePanier.quantite++
    } else {
      itemsDuPanier.value.push({ ...itemNormalise, quantite: 1 })
    }
    persist()
  }

  function supprimerUnItem(id: string, type: PanierItem['type']){
    itemsDuPanier.value = itemsDuPanier.value.filter(item => !(item.id === id && item.type == type))
    persist()
  }
  function majQuantite(id: string, type: PanierItem['type'], qtt: number) {
    const item = itemsDuPanier.value.find(item => item.id === id && item.type === type)
    if (item) {
      item.quantite = qtt;
      persist()
    }
  }

  function viderPanier(){
    itemsDuPanier.value = []
    persist()
  }

  const prixTotal = computed(() =>
    itemsDuPanier.value.reduce((
      sum, i) =>
      sum + i.prix * i.quantite, 0
    ))

  const itemTotaux = computed(() =>
    itemsDuPanier.value.reduce((
      sum, i) =>
      sum + i.quantite, 0
    ))

  return { itemsDuPanier, ajouterUnItem, supprimerUnItem, majQuantite, viderPanier, prixTotal, itemTotaux }
})
