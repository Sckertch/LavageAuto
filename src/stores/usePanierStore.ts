import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { PanierItem } from '@/Entity/PanierItem'

const STORAGE_KEY = 'panier'

export const usePanierStore = defineStore('Panier', () => {
  // Hydratation depuis localStorage sinon vide
  const itemsDuPanier = ref<PanierItem[]>(
    JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? '[]')
  )

  //Persister les données dans le localstorage
  function persist(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsDuPanier.value))
  }

  function ajouterUnItem(item: Omit<PanierItem, 'quantite'>) {
    console.log(itemsDuPanier.value);
    console.log(item);
    
    const estDejaDansLePanier = itemsDuPanier.value.find(
      (i: PanierItem) => i.id === item.id && i.type == item.type,
    )
    if (estDejaDansLePanier) {
      estDejaDansLePanier.quantite++
    } else {
      //Initialise la quantité à 1
      itemsDuPanier.value.push({ ...item, quantite: 1 })
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
