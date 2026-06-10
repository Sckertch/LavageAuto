<template>
  <ul>
    <li
      v-for="link in navLinks" 
      :key="link.name"
      class="transition-transform duration-200 hover:scale-105"
    >
      <a :href="link.path">
        {{ link.name }}
      </a>
    </li>
  </ul>
</template>

<script setup>
const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'Prestations', path: '/prestations' },
  { name: 'Produits', path: '/produits' },
  { name: 'Devis', path: '/' },
]
</script>

<style lang="scss" scoped></style>
