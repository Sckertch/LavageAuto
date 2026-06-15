<template>
  <article
    class="flex flex-col bg-white rounded-2xl overflow-hidden border border-smart-blue/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
  >
    <div class="overflow-hidden">
      <img
        src="https://picsum.photos/200/150"
        alt=""
        class="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div class="flex flex-col flex-1 p-4 gap-2">
      <span
        class="self-end inline-block bg-seafoam text-frozen-water text-xs font-semibold px-3 py-1 rounded-full tracking-wide"
      >
        {{ produit.prix }} €
      </span>

      <h3 class="font-playfair text-base font-bold text-smart-blue leading-snug">
        {{ produit.nom }}
      </h3>

      <p class="text-xs text-gray-500 leading-relaxed flex-1">
        {{ produit.caracteristique }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Produit } from '@/Entity/Produit.ts'

defineProps<{
  produit: Produit
}>()
</script>

<style lang="scss" scoped></style>
