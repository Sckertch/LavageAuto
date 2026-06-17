<template>
  <RouterLink
    :to="route ?? '#'"
    :class="[
      'inline-block px-8 py-3 text-sm tracking-widest uppercase font-semibold rounded-full shadow-lg hover:bg-frozen-water hover:text-white transition-colors duration-300',
      BgColor,
      textColor,
    ]"
  >
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    BgColor?: string
    textColor?: string
    route?: string
  }>(),
  {
    BgColor: 'bg-smart-blue',
    textColor: 'text-white',
    route: '/',
  },
)
</script>

<style scoped></style>
