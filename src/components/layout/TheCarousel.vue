<template>
  <section class="overflow-hidden w-full">
    <div class="flex gap-4 w-max animate-marquee" :style="{ '--duration': `${duration}s` }">
      <div
        v-for="(item, i) in produits"
        :key="i"
        class="w-64 h-40 rounded-xl bg-white shadow-md flex items-center justify-center transition-transform duration-200 hover:scale-110"
      >
        <img
          :src="item.image ?? `${IMAGE_FALLBACK}/256/160`"
          :alt="`${item.nom}`"
          class="rounded-xl object-cover w-full h-full"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProduitStore } from '@/stores/useProduitStore.ts'
import { storeToRefs } from 'pinia'
import { IMAGE_FALLBACK } from '@/utils/environnement.ts'

const store = useProduitStore()
const { produits } = storeToRefs(store)

console.log('IMAGE_FALLBACK:', IMAGE_FALLBACK)
const duration = 20
</script>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  --duration: 20s;
  animation: marquee var(--duration) linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>