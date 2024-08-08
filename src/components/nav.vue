<template>
  <div class="nav">
    <div class="bar">
      <i class="iconfont icon-jiantou" @click="goBack"></i>
      <div class="title">
        <p class="text">{{ props.init_title }}</p>
      </div>
      <i class="iconfont icon-bianji" v-if="props.init_title == 'Profile'"></i>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const props = defineProps(['init_title'])
console.log(props)

const router = useRouter()
const route = useRoute()

// 回退到上一页
const goBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.nav {
  width: 375px;
  height: 48px;
  .bar {
    width: 375px;
    height: 48px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    position: fixed;
    top: 0;
    z-index: 2;

    .icon-jiantou {
      font-size: 16px;
      color: #191d31;
      position: absolute;
      left: 20px;
    }
    .title {
      width: auto;
      height: 24px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        font-size: 16px;
        color: #374151;
      }
    }
    .icon-bianji {
      font-size: 24px;
      color: #191d31;
      position: absolute;
      right: 20px;
    }
  }
}
</style>
