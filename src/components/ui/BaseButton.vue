<template>
  <RouterLink
    :to="route"
    :class="[
      'inline-block px-8 py-3 text-sm tracking-widest uppercase font-semibold rounded-full shadow-lg hover:bg-frozen-water hover:text-white transition-colors duration-300',
      BgColor,
      textColor,
    ]"
  >
    <slot />
  </RouterLink>
</template>

<script setup>
defineProps({
  BgColor: {
    type: String,
    default: 'bg-smart-blue',
  },
  textColor: {
    type: String,
    default: 'text-white',
  },
    route: {
    type: String,
  },
})
</script>

<style lang="scss" scoped></style>
