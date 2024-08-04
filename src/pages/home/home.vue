<template>
  <div class="app">
    <div class="bar">
      <i class="iconfont icon-mulu"></i>
      <i class="iconfont icon-ling"></i>
    </div>
    <div class="content">
      <div class="search">
        <div class="search_box">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" class="search_input" placeholder="Search..." v-model="inputText" />
        </div>
        <div class="scan">
          <i class="iconfont icon-saoyisao"></i>
        </div>
      </div>
      <div class="scroll_nav">
        <div class="box1"></div>
      </div>
    </div>
  </div>
  <BottomNav :init_home="isHomePage" />
</template>

<script setup>
import { ref } from 'vue'
import BottomNav from '@/components/bottom_nav.vue'

// TODO:登陆过的用户直接跳转到该页面

// 确认是Home页面
const isHomePage = true
</script>

<style lang="scss" scoped>
.app {
  .bar {
    width: 375px;
    height: 48px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-mulu {
      font-size: 16px;
      font-weight: 600;
      color: #191d31;
      margin-right: auto;
      margin-left: 20px;
    }
    .title {
      width: 48px;
      height: 24px;
      margin-left: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        font-size: 16px;
        color: #374151;
      }
    }
    .icon-ling {
      font-size: 24px;
      color: #a456dd;
      margin-left: auto;
      margin-right: 20px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .search {
      width: 334px;
      height: 44px;
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      .search_box {
        width: 278px;
        height: 44px;
        margin-left: -5px;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
        background-color: white;
        display: flex;
        align-items: center;
        .icon-sousuo {
          font-size: 25px;
          color: #94a3b8;
          margin-left: 10px;
        }
        .search_input {
          width: 200px;
          font-size: 16px;
          line-height: 18px;
          margin-left: 10px;
        }
        .search_input::-webkit-input-placeholder {
          font-size: 14px;
          line-height: 18px;
          color: #bdbdbd;
        }
      }
      .scan {
        width: 44px;
        height: 44px;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
        margin: 0 -5px 0 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-saoyisao {
          font-size: 23px;
          color: #94a3b8;
        }
      }
    }
  }
}
</style>
