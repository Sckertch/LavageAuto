<template>
  <article
    class="mx-5 my-8 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 items-start bg-seafoam border border-smart-blue/10 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <img
      :src="prestation.image ?? `${IMAGE_FALLBACK}/100/100`"
      :alt="`${prestation.nom}`"
      class="w-24 h-24 rounded-lg object-cover row-span-3 self-start"
    />
    <h3 class="font-playfair text-lg font-bold text-smart-blue leading-tight">
      {{ prestation.nom }}
    </h3>
    <p class="text-sm text-gray-600 leading-relaxed">
      {{ prestation.caracteristique }}
    </p>
    <div class="flex items-center justify-between mt-1">
      <p class="text-base font-semibold text-frozen-water">{{ prestation.prix }} €</p>
      <BoutonBase @click="ajouterAuDevis">Ajouter au devis</BoutonBase>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Prestation } from '@/Entity/Prestation.ts'
import { usePanierStore } from '@/stores/usePanierStore.ts'
import BoutonBase from '@/components/ui/BoutonBase.vue'
import { IMAGE_FALLBACK } from '@/utils/environnement.ts'

const panierStore = usePanierStore()

const props = defineProps<{
  prestation: Prestation
}>()

function ajouterAuDevis() {
  panierStore.ajouterUnItem({
    id: props.prestation.nom,
    type: 'prestation',
    label: props.prestation.nom, // "nom" de Prestation → "label" de PanierItem
    prix: props.prestation.prix,
  })
}
</script>

<style lang="scss" scoped></style>
