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
        class="flex-shrink-0 w-64 h-40 rounded-xl bg-white shadow-md flex items-center justify-center"
      >
          <img
    :src="'https://picsum.photos/seed/' + i + '/256/160'"
    :alt="'Image ' + i"
    class="rounded-xl object-cover w-full h-full"
  >
      </div>
    </div>
  </section>
</template>

<script setup>
const items = ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5']
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