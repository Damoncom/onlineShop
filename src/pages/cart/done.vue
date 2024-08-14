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
        <ul class="orderId_list" v-show="isShowId == true">
          <li
            class="orderId_item"
            v-for="(orderId, orderId_index) of orderIdList"
            :key="orderId_index"
          >
            {{ orderId }}
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <div class="button_box" @click="showOrderId">
        <div class="create_button">
          <p class="text">Explore More!</p>
        </div>
      </div>
      <div class="button_box" @click="linkToHome">
        <div class="create_button">
          <p class="text">Back To Home</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Nav from '@/components/nav'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 获取传参
const orderIdList = reactive([])
Object.assign(orderIdList, route.query.orderId)
console.log(orderIdList)

// 导入导航栏
const navTitle = 'Order '

// 展示订单号
const isShowId = ref(false)
const showOrderId = () => {
  isShowId.value = !isShowId.value
}

// 返回首页
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
      .orderId_list {
        width: 327px;
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .orderId_item {
          padding: 10px;
          font-size: 14px;
          color: #a456dd;
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
    margin: 30px 0;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    .button_box {
      width: 150px;
      height: 46px;
      margin: 0 10px;
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
