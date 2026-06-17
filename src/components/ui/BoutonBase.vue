<!-- src/components/ui/BoutonBase.vue -->
<template>
  <button
    v-bind="$attrs"
    :class="[
      'inline-block px-8 py-3 text-sm tracking-widest uppercase font-semibold rounded-full shadow-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
      variantClasses,
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variante?: 'primaire' | 'outline' | 'danger'
  }>(),
  {
    variante: 'primaire',
  },
)

const variantClasses = computed(() => {
  switch (props.variante) {
    case 'outline':
      return 'border border-smart-blue/30 text-smart-blue hover:bg-smart-blue hover:text-white'
    case 'danger':
      return 'border border-red-300 text-red-400 hover:bg-red-500 hover:text-white'
    default: // primaire
      return 'bg-smart-blue text-white hover:bg-frozen-water'
  }
})
</script>