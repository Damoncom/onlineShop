<template>
  <div class="app">
    <div class="bar">
      <i class="iconfont icon-jiantou" @click="goBack"></i>
      <div class="title">
        <p class="text">Whishlist</p>
      </div>
    </div>
    <div class="content">
      <ul class="whishlist_list">
        <li
          class="whishlist_item"
          v-for="(whishlist, whishlist_index) of whishlistList"
          :key="whishlist_index"
        >
          <img :src="whishlist.img" class="img" />
          <div class="text_box">
            <div class="name">{{ whishlist.name }}</div>
            <div class="brand">{{ whishlist.brand }}</div>
            <div class="price">${{ whishlist.price }}</div>
          </div>
          <div class="like_box">
            <i class="iconfont icon-aixin1"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div class="button_box">
        <div class="create_button">
          <p class="text">Explore More!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import product from '@/assets/details_img.jpg'

const router = useRouter()
const route = useRoute()

// 回退到上一页
const goBack = () => {
  router.go(-1)
}

const whishlistList = reactive([
  {
    id: '1',
    name: 'GivenchyL’ intemporel Blossom',
    brand: 'Givenchy',
    price: '29.00',
    img: product
  },
  {
    id: '2',
    name: 'GivenchyL’ intemporel Blossom',
    brand: 'Givenchy',
    price: '29.00',
    img: product
  },
  {
    id: '3',
    name: 'GivenchyL’ intemporel Blossom',
    brand: 'Givenchy',
    price: '29.00',
    img: product
  },
  {
    id: '4',
    name: 'GivenchyL’ intemporel Blossom',
    brand: 'Givenchy',
    price: '29.00',
    img: product
  }
])
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
      margin-right: 158px;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // ul
    .whishlist_list {
      width: 327px;
      height: auto;
      margin-top: 24px;
      // li
      .whishlist_item {
        width: 327px;
        height: 88px;
        margin-bottom: 12px;
        border-radius: 10px;
        border: 1px solid #ececec;
        box-shadow: rgba(149, 157, 165, 0.109) 0px 0px 24px;
        display: flex;
        align-items: center;
        .img {
          width: 64px;
          height: 64px;
          border-radius: 10px;
          margin-left: 12px;
        }
        .text_box {
          margin-left: 12px;
          .name {
            font-size: 15px;
            color: #001c33;
          }
          .brand {
            font-size: 12px;
            color: #a3a3a3;
            line-height: 20px;
          }
          .price {
            font-size: 18px;
            margin-top: 8px;
          }
        }
        .like_box {
          width: 24px;
          height: 24px;
          border-radius: 5px;
          background-color: #fff5f9;
          align-self: flex-end;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-aixin1 {
            color: #a456dd;
          }
        }
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
