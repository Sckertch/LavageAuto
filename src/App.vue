<script setup lang="ts">
import TheFooter from './components/layout/TheFooter.vue'
import TheNavBar from './components/layout/TheNavBar.vue'
</script>

<template>
  <TheNavBar />

  <section class="mt-10">
    <router-view />
  </section>
  

  <TheFooter />
</template>

<style scoped></style>
