<script setup>
import TheCarousel from '../components/Acceuil/TheCarousel.vue'
</script>

<template>
    <img
      src="../assets/picture/mini.png"
      alt="Nettoyage auto Guadeloupe"
      class="absolute left-1/2 -translate-x-1/2 inset-0 w-2xl mt-55 sm:mt-25 z-100 md:mt-40"
    />
    <!-- Overlay sombre -->
    <div class="absolute inset-0 bg-frozen-water/65 -z-10"></div>

    <!-- H1 centré -->
    <div
      class="relative z-1 flex py-25 justify-center h-full bg-linear-to-b from-black to-frozen-water/"
    >
      <h1 class="w-full text-center font-['Playfair_Display'] text-white sm:px-6">
        <span class="block text-base  font-light tracking-[0.3em] uppercase text-blue-300 mb-2">
          Votre voiture
        </span>
        <span class="block text-2xl sm:text-6xl md:text-8xl font-black italic leading-none mb-4">
          Impeccable.
        </span>
        <span class="block text-lg md:text-xl font-light tracking-widest text-gray-300 uppercase">
          Le meilleur nettoyage auto en
          <span class="text-neon-ice font-semibold not-italic">Guadeloupe</span>
        </span>
      </h1>
    </div>

  <!-- <section>
    <div>
      <h1 class="text-4xl font-bold text-gray-900">
        Nettoyage auto en Guadeloupe
        <span class="block w-16 h-1 bg-blue-500 mt-3 rounded-full"></span>
      </h1>
      <p class="text-xl text-gray-500 mt-2">Le service N°1 de l'île 🌴</p>
    </div>
    <TheCarousel />
  </section> -->
</template>

<style scoped></style>
