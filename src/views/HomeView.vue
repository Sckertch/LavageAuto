<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <section class="h-100 xs:h-120 bxsm:h-140 sm:h-165 lg:h-180 bg-frozen-water/65">
    <img
      src="../assets/picture/mini.png"
      alt="Nettoyage auto Guadeloupe"
      class="absolute left-1/2 -translate-x-1/2 inset-0 w-2xl mt-40 xs:mt-40 sm:mt-30 z-10 md:mt-45"
    />

    <div
      class="relative z-1 flex py-15 xs:py-23 sm:py-25 justify-center h-full bg-linear-to-b from-black to-frozen-water/"
    >
      <h1 class="w-full text-center font-playfair text-white sm:px-6">
        <span
          class="block text-xs xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.3em] uppercase text-blue-300 mb-2"
        >
          Votre voiture
        </span>
        <span
          class="block text-xl xs:text-3xl sm:text-6xl md:text-8xl font-black italic leading-none mb-4"
        >
          Impeccable.
        </span>
        <span
          class="block text-base xs:text-lg sm:text-xl md:text-3xl font-light tracking-widest text-gray-300 uppercase px-2"
        >
          Le meilleur nettoyage auto en
          <span class="text-neon-ice font-semibold not-italic">Guadeloupe</span>
        </span>
      </h1>
    </div>
  </section>

  <section class="relative bg-white z-10 py-10 px-6 overflow-hidden">
    <div class="max-w-4xl mx-auto text-center">
      <span
        class="inline-block text-xs tracking-[0.3em] uppercase text-neon-ice font-semibold mb-4"
      >
        Service Premium
      </span>

      <h2
        class="font-playfair text-3xl sm:text-4xl md:text-5xl font-black text-smart-blue leading-tight mb-6"
      >
        Nettoyage Auto intérieur & extérieur <br class="hidden sm:block" />
        <span class="italic font-light text-frozen-water">en Guadeloupe</span>
      </h2>

      <div class="mx-auto w-16 h-0.5 bg-neon-ice rounded-full mb-8"></div>

      <h3 class="font-light text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
        Offrez à votre véhicule une véritable remise à neuf avec notre service professionnel de
        nettoyage auto en Guadeloupe, expert en lavage intérieur et extérieur, shampoing des tissus,
        soin des cuirs et lustrage de carrosserie.
      </h3>
      <div
        class="grid gap-5 flex-wrap items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10"
      >
        <BaseButton route="/produits">Nos produits</BaseButton>
        <BaseButton route="/prestations">Nos prestations</BaseButton>
        <BaseButton class="col-start-auto col-end-auto sm:col-start-1 sm:col-end-3 md:col-start-auto md:col-end-auto"
          >Faire un devis</BaseButton
        >
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-neon-ice to-transparent opacity-30"
    ></div>
  </section>
</template>

<style scoped></style>
