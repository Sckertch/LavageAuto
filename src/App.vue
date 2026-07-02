<script setup lang="ts">
import TheFooter from './components/layout/TheFooter.vue'
import TheNavBar from './components/layout/TheNavBar.vue'
import DropZone from '@/components/ui/DropZone.vue'
</script>

<template>
  <TheNavBar />

  <section class="mt-10">
    <router-view />
  </section>

  <DropZone />

  <TheFooter />
</template>

<style scoped></style>
