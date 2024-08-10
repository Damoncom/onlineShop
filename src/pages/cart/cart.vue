<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <ul class="cart_list">
        <li
          class="cart_item"
          v-for="(cart, cart_index) of cartList"
          :key="cart_index"
          :data-index="cart_index"
          :data-name="cart.name"
          :data-price="cart.price"
          :data-num="cart.num"
        >
          <i
            class="iconfont icon-xuanzhong"
            :class="cart.isChosen == true ? 'icon-xuanzhong_purple' : 'icon-xuanzhong'"
          ></i>
          <div class="product_box">
            <img :src="cart.img" class="img" />
            <div class="text_box">
              <div class="name">{{ cart.name }}</div>
              <div class="price">${{ cart.price }}</div>
            </div>
          </div>
          <div class="number">
            <div class="minus" @click.stop="minus(cart, arr)">
              <p class="text">—</p>
            </div>
            <div class="num_text">
              <p class="text">{{ cart.num }}</p>
            </div>
            <div class="add">
              <p class="text" @click="add(cart, arr)">+</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="gift_code">
        <p class="gift_text">Have a gift code?</p>
      </div>
    </div>
    <div class="bottom">
      <div class="logo">
        <i class="iconfont icon-gouwudai"></i>
      </div>
      <div class="sum">
        <p class="sum_text">$ {{ sumShow }}</p>
      </div>
      <div class="button_box" @click="linkToReviewPurchase">
        <div class="create_button">
          <p class="text">Continute</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onUnmounted, reactive, ref, toRaw, onUpdated, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import product from '@/assets/details_img.jpg'
import Nav from '@/components/nav'
import currency from 'currency.js'

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Cart'

// 商品列表信息
const cartList = reactive([
  {
    id: '1',
    name: 'Gienchy L’  intemprorel Blossom',
    price: '29.33',
    img: product,
    num: 1,
    isChosen: true
  },
  {
    id: '2',
    name: 'Gienchy L’  intemprorel Blossom',
    price: '29.99',
    img: product,
    num: 1,
    isChosen: true
  }
])

// 计算总数
const sum = ref(0.0)
let sumShow = ref()
const arr = toRaw(cartList)

arr.forEach((item, index) => {
  sum.value = currency(item.price).multiply(item.num).add(currency(sum.value))
  sumShow.value = currency(sum.value).value
})

const minus = (cart) => {
  cart.num--
  if (cart.num <= 1) {
    cart.num = 1
  }
  sum.value = 0.0
  arr.forEach((item, index) => {
    sum.value = currency(item.price).multiply(item.num).add(currency(sum.value))
    sumShow.value = currency(sum.value).value
  })
}
const add = (cart, arr) => {
  cart.num++
  sum.value = 0.0
  arr.forEach((item, index) => {
    sum.value = currency(item.price).multiply(item.num).add(currency(sum.value))
    sumShow.value = currency(sum.value).value
  })
}

// 跳转到reviewPurchase页面
const linkToReviewPurchase = () => {
  router.push({
    path: '/reviewPurchase',
    query: {
      sum: sumShow.value
    }
  })
}
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
      margin-right: 175px;
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
    // ul
    .cart_list {
      width: 375px;
      height: auto;
      margin-top: 14px;
      //li
      .cart_item {
        width: 375px;
        height: 68px;
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        .icon-xuanzhong {
          font-size: 20px;
          color: #f1f1f1;
          margin-left: 24px;
        }
        .icon-xuanzhong_purple {
          font-size: 20px;
          color: #a456dd;
        }
        .product_box {
          height: 60px;
          margin-left: 8px;
          display: flex;
          .img {
            width: 60px;
            height: 60px;
            border-radius: 10px;
          }
          .text_box {
            width: 154px;
            margin-left: 10px;
            .name {
              font-size: 13px;
              color: #001c33;
              line-height: 14px;
              margin-top: 5px;
            }
            .price {
              font-size: 18px;
              color: #001c33;
              margin-top: 8px;
            }
          }
        }
        .number {
          width: 89px;
          height: 24px;
          border: 1px solid #a456dd;
          border-radius: 6px;
          display: flex;
          .minus {
            width: 22px;
            height: 24px;
            background-color: #a456dd;
            border-radius: 4px 0 0 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            .text {
              font-size: 14px;
              color: #f1f1f1;
            }
          }
          .num_text {
            width: 45px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            .text {
              font-size: 14px;
              color: #001c33;
            }
          }
          .add {
            width: 22px;
            height: 24px;
            background-color: #a456dd;
            border-radius: 0 4px 4px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            .text {
              font-size: 16px;
              color: #f1f1f1;
            }
          }
        }
      }
    }
    .gift_code {
      width: 375px;
      height: 73px;
      border: 1px solid #e3e5e5;
      display: flex;
      align-items: center;
      .gift_text {
        font-size: 16px;
        line-height: 24px;
        color: #a456dd;
        margin-left: 20px;
      }
    }
  }
  .bottom {
    width: 375px;
    height: 78px;
    background-color: white;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    .logo {
      width: 32px;
      height: 32px;
      border-radius: 50px;
      background-color: #f6eefc;
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-gouwudai {
        font-size: 18px;
        color: #a456dd;
      }
    }
    .sum {
      margin-left: 10px;
      .sum_text {
        font-size: 18px;
        line-height: 24px;
        color: #333333;
      }
    }
    .button_box {
      width: 160px;
      height: 46px;
      margin-left: auto;
      margin-right: 24px;
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
