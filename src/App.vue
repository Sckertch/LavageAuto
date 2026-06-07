<script setup>
import TheNavBar from './components/layout/TheNavBar.vue'
import HomeView from './views/HomeView.vue'
</script>

<template class="flex-col">
  <TheNavBar class="fixed top-0 left-0 w-full z-1000" />

  <HomeView class="h-[calc(100vh-80px)]" />
</template>

<style scoped></style>
