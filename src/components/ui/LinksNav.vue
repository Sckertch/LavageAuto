<template>
  <ul>
    <li
      v-for="link in navLinks"
      :key="link.name"
      class="transition-transform duration-200 hover:-translate-y-2"
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
  { name: 'Prestations', path: '/' },
  { name: 'Produits', path: '/' },
  { name: 'Devis', path: '/' },
]</script>

<style lang="scss" scoped></style>
