<template>
  <div class="mt-20 py-5 text-center">
    <h2 class="text-3xl font-playfair text-smart-blue sm:px-6">Nos produits</h2>
  </div>

  <TheCarousel class="mb-8" />

  <p class="my-10 px-6 max-w-3xl mx-auto text-gray-500 text-base leading-relaxed text-center">
    Nous disposons d'une large gamme de produits...
  </p>
  <div class="mt-5 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-6 pb-12">
    <ProduitItem v-for="(item, i) in produits" :key="i" :produit="item" />
  </div>
</template>

<script setup lang="ts">
import TheCarousel from '@/components/ui/TheCarousel.vue'
import ProduitItem from './TheProduct/ProduitItem.vue'

import { useProduitStore } from '@/stores/useProduitStore'
import { storeToRefs } from 'pinia'

const store = useProduitStore()
const { produits } = storeToRefs(store)
</script>

<style lang="scss" scoped></style>
