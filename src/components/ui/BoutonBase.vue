<!-- src/components/ui/BoutonBase.vue -->
<template>
  <button
    v-bind="$attrs"
    :class="[
      'inline-flex items-center justify-center gap-2',
      'px-8 py-3 text-sm tracking-widest uppercase font-semibold',
      'rounded-full shadow-md cursor-pointer',
      'transition-all duration-300 ease-in-out',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-smart-blue',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'active:scale-95',
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
      return 'border-2 border-smart-blue text-smart-blue bg-transparent hover:bg-smart-blue hover:text-white hover:shadow-lg'
    case 'danger':
      return 'border-2 border-red-400 text-red-400 bg-transparent hover:bg-red-500 hover:text-white hover:border-red-500'
    default: // primaire
      return 'bg-smart-blue text-white hover:bg-frozen-water hover:shadow-lg hover:text-deep-navy'
  }
})
</script>
