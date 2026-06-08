<script setup>
const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'Prestations', path: '/' },
  { name: 'Produits', path: '/' },
  { name: 'Devis', path: '/' },
]
</script>

<template>
  <nav class="bg-smart-blue shadow-2xl px-6 py-3 flex items-center justify-between">
    <a href="#">
      <img src="https://picsum.photos/100/50" alt="Logo du site" />
    </a>
    <ul class="flex gap-6 list-none text-white">
      <li v-for="link in navLinks" :key="link.name" class="transition-transform duration-200 hover:-translate-y-2">
        <a :href="link.path">
          {{ link.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
