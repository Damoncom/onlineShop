<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <div class="box">
        <div class="img_box">
          <img src="@/assets/done.jpg" class="img" />
        </div>
        <div class="text_box">
          <div class="title">Your order has been successfully ordered now</div>
          <div class="discription">
            Please wait for upcoming notification of your order in notification menu
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="button_box" @click="linkToHome">
        <div class="create_button">
          <p class="text">Explore More!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Nav from '@/components/nav'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Order XY3843'

const orderNum = ref()

const linkToHome = () => {
  router.push({
    path: '/home'
  })
}
</script>

<style lang="scss" scoped>
.app {
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    .box {
      width: 375px;
      margin-top: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .img_box {
        display: flex;
        align-items: center;
        justify-content: center;
        .img {
          width: 288px;
          height: 215px;
        }
        .img3 {
          width: 202px;
          height: 202px;
        }
      }
      .text_box {
        width: 301px;
        height: 80px;
        margin-top: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title {
          font-size: 20px;
          color: #141a1f;
          text-align: center;
        }
        .discription {
          font-size: 14px;
          color: #a3a3a3;
          line-height: 20px;
          margin-top: 15px;
          text-align: center;
        }
      }

      .jump {
        width: 139px;
        height: 40px;
        margin: 24px 0 44px 0;
        background-color: #a456dd;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: white;
        text-decoration: none;
      }
    }
  }
  .bottom {
    width: 375px;
    height: 70px;
    background-color: white;
    position: fixed;
    bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .button_box {
      width: 335px;
      height: 46px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .create_button {
        width: 335px;
        height: 46px;
        border-radius: 6px;
        background-color: #a456dd;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.1s ease-in-out;
        .text {
          font-size: 16px;
          color: #ffffff;
        }
      }
      .create_button:active {
        width: 325px;
        height: 44px;
      }
    }
  }
}
</style>
