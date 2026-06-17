<!-- src/views/CartView.vue -->
<script setup lang="ts">
import { usePanierStore } from '@/stores/usePanierStore.ts'
const panier = usePanierStore()

function requestDevis() {
  // TODO: POST /api/devis avec cart.items → API Laravel
  console.log('Payload futur:', panier.itemsDuPanier)
}
</script>

<template>
  <div class="mt-20 py-5">
    <h1>Mon Panier</h1>
    <p v-if="!panier.itemsDuPanier.length">Votre panier est vide.</p>
    <ul v-else>
      <li v-for="item in panier.itemsDuPanier" :key="`${item.type}-${item.id}`">
        {{ item.label }} — {{ item.prix }}€ × {{ item.quantite }}
        <button @click="panier.supprimerUnItem(item.id, item.type)">✕</button>
      </li>
    </ul>
    <p>
      <strong>Total : {{ panier.prixTotal }}€</strong>
    </p>
    <button @click="requestDevis" :disabled="!panier.itemsDuPanier.length">
      Demander un devis
    </button>
  </div>
</template>
