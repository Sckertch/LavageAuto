<script setup>
import TheFooter from './components/layout/TheFooter.vue'
import TheNavBar from './components/layout/TheNavBar.vue'
</script>

<template class="flex-col">
  <TheNavBar class="fixed top-0 left-0 w-full z-1000" />

  <section>
    <router-view />
  </section>
  

  <TheFooter />
</template>

<style scoped></style>
