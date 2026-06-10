<script setup>
import { ref } from 'vue'
import LinksNav from '../ui/LinksNav.vue';

let isOpen = ref(false)


</script>

<template>
  <nav class="bg-smart-blue shadow-2xl px-6 py-3 grid grid-cols-4 items-center">
    <a href="#">
      <img src="../../assets/picture/logo.jpeg" alt="Logo du site" class="h-full  max-h-8"/>
    </a>
          <button
      @click="isOpen = !isOpen, console.log(isOpen)"
      class="flex flex-row-reverse col-start-4 md:hidden text-gray-600 focus:outline-none"
      aria-label="Toggle menu"
    >
      <!-- Icône burger SVG -->
      <svg
        v-if="!isOpen"
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <!-- Icône croix (fermeture) -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <LinksNav v-show="isOpen" class="md:hidden col-span-4 flex flex-col items-center gap-5 text-white"/>
    <LinksNav class="hidden md:flex col-span-3 justify-end gap-6 list-none text-white"/>
    
  </nav>
</template>

<style scoped></style>
