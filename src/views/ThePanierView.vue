<script setup lang="ts">
import { usePanierStore } from '@/stores/usePanierStore.ts'
import BoutonLien from '@/components/ui/BoutonLien.vue'
import BoutonBase from '@/components/ui/BoutonBase.vue'

const panier = usePanierStore()

function requestDevis() {
  // TODO: POST /api/devis avec panier.itemsDuPanier → API Laravel
  console.log('Payload futur:', panier.itemsDuPanier)
}
</script>

<template>
  <div class="mt-20 py-5 px-6 max-w-3xl mx-auto">
    <h1 class="py-5 text-3xl text-center font-playfair text-smart-blue">Mon Panier</h1>
    <div class="mx-auto w-16 h-0.5 bg-neon-ice rounded-full mb-8"></div>

    <!-- Panier vide -->
    <div v-if="!panier.itemsDuPanier.length" class="text-center py-16 text-gray-400">
      <p class="text-5xl mb-4">🛒</p>
      <p class="text-lg font-light tracking-wide">Votre panier est vide.</p>
      <div class="mt-6">
        <BoutonLien route="/prestations">Voir nos prestations</BoutonLien>
      </div>
    </div>

    <!-- Liste des items -->
    <ul v-else class="flex flex-col gap-4">
      <li
        v-for="item in panier.itemsDuPanier"
        :key="`${item.type}-${item.id}`"
        class="grid grid-cols-[1fr_auto] items-center gap-x-4 bg-seafoam border border-smart-blue/10 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <div>
          <span
            class="inline-block text-xs tracking-[0.2em] uppercase font-semibold mb-1"
            :class="item.type === 'prestation' ? 'text-neon-ice' : 'text-frozen-water'"
          >
            {{ item.type }}
          </span>
          <p class="font-playfair text-base font-bold text-smart-blue">{{ item.label }}</p>
          <p class="text-sm text-gray-500 mt-1">
            {{ item.prix }} € × {{ item.quantite }}
            <span class="font-semibold text-smart-blue ml-2">
              = {{ (item.prix * item.quantite).toFixed(2) }} €
            </span>
          </p>
        </div>
        <BoutonBase variante="danger" @click="panier.supprimerUnItem(item.id, item.type)">
          ✕
        </BoutonBase>
      </li>
    </ul>

    <!-- Total + CTA -->
    <div
      v-if="panier.itemsDuPanier.length"
      class="mt-8 border-t border-smart-blue/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <p class="font-playfair text-xl text-smart-blue">
        Total :
        <span class="font-black text-frozen-water">{{ panier.prixTotal.toFixed(2) }} €</span>
      </p>
      <div class="flex gap-3 flex-wrap justify-center">
        <BoutonBase variante="outline" @click="panier.viderPanier()">Vider le panier</BoutonBase>
        <BoutonBase :disabled="!panier.itemsDuPanier.length" @click="requestDevis">
          Demander un devis
        </BoutonBase>
      </div>
    </div>
  </div>
</template>