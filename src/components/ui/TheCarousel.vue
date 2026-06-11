<template>
  <section class="overflow-hidden w-full">
    <div
      class="flex gap-4 w-max animate-marquee"
      :style="{ '--duration': `${duration}s` }"
    >
      <!-- Items dupliqués pour la boucle seamless -->
      <div
        v-for="(item, i) in [...items, ...items]"
        :key="i"
        class="w-64 h-40 rounded-xl bg-white shadow-md flex items-center justify-center transition-transform duration-200 hover:scale-110"
      >
          <img
    :src="`http://clean-palm-image:8081/picture/${item}.webp`"
    :alt="`http://clean-palm-image:8081/picture/${item}.webp`"
    class="rounded-xl object-cover w-full h-full"
  >
      </div>
    </div>
  </section>
</template>

<script setup>
const items = ['produit1', 'produit2', 'produit3', 'produit4', 'produit5']
const duration = 20 // secondes pour un tour complet
</script>

<style>
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee var(--duration, 200s) linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused; /* pause au hover */
}
</style>