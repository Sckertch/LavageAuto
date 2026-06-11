<template>
  <!-- Titre de page avec badge décoratif -->
  <div class="mt-20 py-5 text-center">
    <span class="inline-block text-xs tracking-[0.3em] uppercase text-frozen-water font-semibold mb-3">
      Catalogue
    </span>
    <h2 class="text-3xl font-playfair text-smart-blue sm:px-6">
      Nos produits
    </h2>
    <TheDivider variant="accent" class="max-w-[4rem] mx-auto mt-4 mb-0" />
  </div>

  <TheCarousel class="mb-8" />

  <!-- Texte intro avec style -->
  <p class="my-10 px-6 max-w-3xl mx-auto text-gray-500 text-base leading-relaxed text-center">
    Nous disposons d'une large gamme de produits...
  </p>

  <TheDivider variant="gradient" class="mb-8" />

  <!-- Grille de produits -->
  <div class="mt-5 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-6 pb-12">
    <ProduitItem v-for="(item, i) in items" :key="i" :produit="item" />
  </div>
</template>

<script setup>
import TheDivider from '@/components/ui/TheDivider.vue'

import TheCarousel from '@/components/ui/TheCarousel.vue'
import ProduitItem from './TheProduct/ProduitItem.vue'

const items = [
  {
    nom: 'Produit 1',
    caracteristique: 'Léger, résistant, idéal pour un usage quotidien',
    prix: 29.99
  },
  {
    nom: 'Produit 2',
    caracteristique: 'Haute performance, batterie longue durée',
    prix: 49.99
  },
  {
    nom: 'Produit 3',
    caracteristique: 'Design compact, matériaux premium',
    prix: 79.99
  },
  {
    nom: 'Produit 4',
    caracteristique: 'Multifonction, compatible tous appareils',
    prix: 19.99
  },
  {
    nom: 'Produit 5',
    caracteristique: 'Édition limitée, coloris exclusif',
    prix: 99.99
  }
]
</script>

<style lang="scss" scoped></style>
