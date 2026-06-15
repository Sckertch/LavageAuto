<template>
  <article
    class="mx-5 my-8 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 items-start bg-seafoam border border-smart-blue/10 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <img
      src="https://picsum.photos/100/100"
      alt=""
      class="w-24 h-24 rounded-lg object-cover row-span-3 self-start"
    />

    <h3 class="font-playfair text-lg font-bold text-smart-blue leading-tight">
      {{ prestation.nom }}
    </h3>
    <p class="text-sm text-gray-600 leading-relaxed">
      {{ prestation.caracteristique }}
    </p>
    <p class="text-base font-semibold text-frozen-water">{{ prestation.prix }} €</p>
  </article>
</template>

<script setup lang="ts">
import type { Prestation } from '@/Entity/Prestation.ts'

defineProps<{
  prestation: Prestation
}>()
</script>

<style lang="scss" scoped></style>
