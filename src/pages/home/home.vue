<template>
  <BottomNav :init_home="isHomePage" />
</template>

<script setup>
import { ref } from 'vue'
import BottomNav from '../../components/bottom_nav.vue'

// 确认是Home页面
const isHomePage = true
</script>

<style lang="scss" scoped></style>
