<template>
  <h2 class="mt-20 py-5 w-full text-3xl text-center font-playfair text-smart-blue sm:px-6">
    Nos prestations
  </h2>
  <div>
    <div class="flex items-center gap-4 px-7 py-2 sm:px-20">
      <span class="h-0.5 flex-1 bg-linear-to-r from-transparent to-frozen-water/50 rounded-full" />
      <h3 class="text-2xl font-playfair text-frozen-water whitespace-nowrap">Lavage Extérieur</h3>
    </div>

    <div class="py-5 grid sm:grid-cols-2 mx-10 gap-8 items-center">
      <div class="grid gap-y-4 items-center justify-center">
        <img
          class="h-full max-h-50"
          src="../assets/picture/voiture1sale.webp"
          alt="Voiture 1 non nettoyé"
          srcset=""
        />
        <img
          class="h-full max-h-50"
          src="../assets/picture/voiture1propre.webp"
          alt="Voiture 1 nettoyé"
          srcset=""
        />
      </div>
      <div class="py-5 text-gray-600 leading-relaxed text-base">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam itaque deleniti libero.
          Corrupti repellat cumque illum praesentium odit quae corporis sit, voluptatum facilis
          autem rerum! Distinctio, laudantium similique? Earum, unde.
        </p>
      </div>
    </div>
    <div class="flex items-center gap-4 px-7 py-2 sm:px-20">
      <h3 class="text-2xl font-playfair text-frozen-water whitespace-nowrap">Lavage Intérieur</h3>
      <span class="h-0.5 flex-1 bg-linear-to-r from-frozen-water/50 to-transparent rounded-full" />
    </div>

    <div class="py-5 grid sm:grid-cols-2 mx-10 gap-8 items-center">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam itaque deleniti libero.
        Corrupti repellat cumque illum praesentium odit quae corporis sit, voluptatum facilis autem
        rerum! Distinctio, laudantium similique? Earum, unde.
      </p>
      <div class="grid gap-y-4 items-center justify-center">
        <img
          class="h-full max-h-50"
          src="../assets/picture/voiture1sale.webp"
          alt="Voiture 1 non nettoyé"
          srcset=""
        />
        <img
          class="h-full max-h-50"
          src="../assets/picture/voiture1propre.webp"
          alt="Voiture 1 nettoyé"
          srcset=""
        />
      </div>
    </div>
  </div>
  <PrestationItem v-for="(item, i) in prestations" :key="i" :prestation="item" />
</template>

<script setup>
import PrestationItem from './ThePrestation/PrestationItem.vue'

import { usePrestationStore } from '@/stores/usePrestationStore'
import { storeToRefs } from 'pinia'

const store = usePrestationStore()
const { prestations } = storeToRefs(store)

</script>

<style lang="scss" scoped></style>
