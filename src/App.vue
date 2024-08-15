<template>
  <RouterLink to="/"></RouterLink>
  <RouterView />
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<style>
html {
  touch-action: none;
  touch-action: pan-y;
}
</style>
