<template>
  <div class="app">
    <div class="bar">
      <i class="iconfont icon-jiantou" @click="goBack"></i>
      <div class="title">
        <p class="text">Order{{ orderNum }}</p>
      </div>
    </div>
    <div class="content">
      <div class="box">
        <div class="img_box">
          <img src="@/assets/walk1.jpg" class="img" />
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
      <div class="button_box" @click="linkToDone">
        <div class="create_button">
          <p class="text">Explore More!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const orderNum = ref()
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
    .icon-jiantou {
      font-size: 16px;
      color: #191d31;
      margin-right: auto;
      margin-left: 20px;
    }
    .title {
      height: 24px;
      margin-right: 170px;
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        font-size: 16px;
        color: #374151;
      }
    }
  }
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
          height: 218px;
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
