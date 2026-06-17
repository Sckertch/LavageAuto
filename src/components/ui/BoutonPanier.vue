<!-- src/components/CartButton.vue -->
<script setup lang="ts">
import { usePanierStore } from '@/stores/usePanierStore.ts'
const panier = usePanierStore()
</script>

<template>
  <router-link to="/panier" class="cart-btn">
    🛒
    <span v-if="panier.itemTotaux > 0" class="badge">{{ panier.itemTotaux }}</span>
  </router-link>
</template>
