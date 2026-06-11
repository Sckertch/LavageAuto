<template>
  <div :class="[
    'w-full my-6',
    variant === 'gradient'
      ? 'h-px bg-linear-to-r from-transparent via-neon-ice to-transparent opacity-30'
      : variant === 'accent'
      ? 'h-0.5 bg-frozen-water/40 rounded-full'
      : 'h-px bg-divider'
  ]" role="separator" aria-hidden="true" />
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'gradient', // 'gradient' | 'accent' | 'muted'
  }
})
</script>