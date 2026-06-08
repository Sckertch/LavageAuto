<template>
  <div class="grid gap-2 md:grid-cols-4 items-center">
    <div>
        <h2>Nos réseaux :</h2>
        <h3 
            v-for="reseau in reseaux"
            :key="reseau.name"
        >
            {{ reseau.name }}
        </h3>
    </div>
    <div>World</div>
    <div>Wide</div>
    <div>Web</div>
  </div>
</template>

<script setup>
const reseaux = [
  { name: 'Instagram', path: '/' },
  { name: 'Tiktok', path: '/' }
]
</script>

<style lang="scss" scoped></style>
