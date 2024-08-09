<template>
  <div class="app">
    <div class="bar">
      <div class="left">
        <i class="iconfont icon-jiantou" @click="goBack"></i>
      </div>
      <div class="right" @click="add">
        <i
          class="iconfont icon-gouwudai"
          :class="isAdd == true ? 'icon-gouwudai_purple' : 'icon-gouwudai'"
        ></i>
      </div>
    </div>
    <div class="content">
      <div class="img_box">
        <img :src="details.img" class="img" />
      </div>
      <div class="info">
        <div class="info_title">
          {{ details.name }}
        </div>
        <div class="info_brand">
          {{ details.brand }}
        </div>
        <div class="score">
          <i class="iconfont icon-shoucang"></i>
          <i class="iconfont icon-shoucang"></i>
          <i class="iconfont icon-shoucang"></i>
          <i class="iconfont icon-shoucang"></i>
          <i class="iconfont icon-shoucang"></i>
          <p class="score_text">4.8</p>
        </div>
        <div class="info_discription">
          {{ details.discription }}
        </div>
      </div>
    </div>
    <div class="buttom">
      <div class="like">
        <i class="iconfont icon-aixin" @click="comfirmShouCang" v-if="isShoucang == false"></i>
        <i class="iconfont icon-aixin1" @click="cancelShouCang" v-if="isShoucang == true"></i>
      </div>
      <div class="add_button" @click="addToCart">
        <p class="text">Add To Cart</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import product from '@/assets/details_img.jpg'
const router = useRouter()
const route = useRoute()

// 回退到上一页
const goBack = () => {
  router.go(-1)
}

// 是否加入购物车右上角图标
const isAdd = ref(false)
const add = () => {
  isAdd.value = !isAdd.value
}

// 获取传参信息
const details = route.query
const disText =
  'A unique light bi-phase formula to hydrate & prepare theskin to receive the following skincare steps.Visibly like energized and smoothed, the skin isenhanced with a rosy glow. Awaken your senses withSkin Perfecto, an invigorating skincare experience. Witha fluid texture formulated in high affinity with the skins barrier, Skin Perfecto Vitamin Blend Glow Serumdelivers immediate hydration that melts into your skin,for an instantly smoothed and plumped.'
Reflect.set(details, 'discription', disText)
Reflect.set(details, 'img', product)
console.log(details)

// 收藏
let isShoucang = ref(false)
const comfirmShouCang = () => {
  isShoucang.value = true
  console.log(isShoucang.value)
}
const cancelShouCang = () => {
  isShoucang.value = false
}

// 跳转cart页面
const addToCart = () => {
  router.push({
    path: '/cart'
  })
}
</script>

<style lang="scss" scoped>
.app {
  .bar {
    width: 375px;
    height: 48px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    .left {
      width: 32px;
      height: 32px;
      border-radius: 50px;
      margin-left: 20px;
      background-color: #a3a3a3;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-jiantou {
        font-size: 13px;
        color: white;
        text-align: center;
      }
    }
    .right {
      width: 32px;
      height: 32px;
      border-radius: 50px;
      background-color: #a3a3a3;
      margin-left: auto;
      margin-right: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-gouwudai {
        font-size: 18px;
        font-weight: 600px;
        color: white;
        text-align: center;
      }
      .icon-gouwudai_purple {
        color: #a456dd;
      }
    }
  }
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    .img_box {
      .img {
        width: 375px;
        height: 369px;
      }
    }
    .info {
      width: 327px;
      height: 312px;
      margin-top: 152px;
      .info_title {
        font-size: 24px;
        letter-spacing: 0.5px;
        color: #333333;
        line-height: auto;
      }
      .info_brand {
        font-size: 16px;
        letter-spacing: 0.5px;
        color: #a3a3a3;
        line-height: 30px;
      }
      .score {
        display: flex;
        align-items: center;
        margin-top: 6px;
        .icon-shoucang {
          margin-right: 5px;
          color: #ffa412;
        }
        .score_text {
          color: #ffa412;
          margin-left: 5px;
        }
      }
      .info_discription {
        font-size: 12px;
        letter-spacing: 0.5px;
        line-height: 20px;
        color: #666666;
        margin-top: 15px;
      }
    }
  }
  .buttom {
    width: 375px;
    height: 78px;
    position: fixed;
    bottom: 0;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    .like {
      width: 46px;
      height: 46px;
      border: 1px solid #a456dd;
      border-radius: 6px;
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-aixin {
        font-size: 25px;
        color: #a456dd;
      }
      .icon-aixin1 {
        font-size: 25px;
        color: #a456dd;
      }
    }
    .add_button {
      width: 277px;
      height: 46px;
      border-radius: 6px;
      background-color: #a456dd;
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        font-size: 16px;
        color: white;
      }
    }
  }
}
</style>
