<template>
  <!-- Titre de page -->
  <h2 class="mt-20 py-5 w-full text-3xl text-center font-playfair text-smart-blue sm:px-6">
    Nos prestations
  </h2>

  <TheDivider variant="gradient" class="max-w-xs mx-auto" />

  <div>
    <!-- Titre Lavage Extérieur -->
    <div class="flex items-center gap-4 px-7 py-2 sm:px-20">
      <span class="h-0.5 flex-1 bg-linear-to-r from-transparent to-frozen-water/50 rounded-full" />
      <h3 class="text-2xl font-playfair text-frozen-water whitespace-nowrap">
        Lavage Extérieur
      </h3>
    </div>

    <div class="py-5 grid sm:grid-cols-2 mx-10 gap-8 items-center">
      <div class="grid gap-y-4 items-center justify-center">
        <!-- images... -->
      </div>
      <div class="py-5 text-gray-600 leading-relaxed text-base">
        <!-- texte... -->
      </div>
    </div>

    <TheDivider variant="muted" class="mx-10" />

    <!-- Titre Lavage Intérieur -->
    <div class="flex items-center gap-4 px-7 py-2 sm:px-20">
      <h3 class="text-2xl font-playfair text-frozen-water whitespace-nowrap">
        Lavage Intérieur
      </h3>
      <span class="h-0.5 flex-1 bg-linear-to-r from-frozen-water/50 to-transparent rounded-full" />
    </div>

    <div class="py-5 grid sm:grid-cols-2 mx-10 gap-8 items-center">
      <!-- contenu inversé... -->
    </div>
  </div>

  <!-- Séparateur avant les items -->
  <TheDivider variant="gradient" class="my-4" />

  <PrestationItem v-for="(item, i) in items" :key="i" :prestation="item" />
</template>

<script setup>
import TheDivider from '@/components/ui/TheDivider.vue'
import PrestationItem from './ThePrestation/PrestationItem.vue'
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
