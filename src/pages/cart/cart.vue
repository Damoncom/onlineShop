<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <ul class="cart_list">
        <li
          class="cart_item"
          v-for="(cart, cart_index) of cartStore.cartList"
          :key="cart_index"
          :data-index="cart_index"
          :data-name="cart.name"
          :data-price="cart.price"
          :data-num="cart.num"
        >
          <i class="iconfont icon-xuanzhong"></i>
          <div class="product_box">
            <img :src="cart.goods.image" class="img" />
            <div class="text_box">
              <div class="name">{{ cart.goods.name }}</div>
              <div class="price">${{ Number(cart.goods.price).toFixed(2) }}</div>
            </div>
          </div>
          <div class="number">
            <div class="minus" @click.stop="minus(cart, arr)">
              <p class="text">—</p>
            </div>
            <div class="num_text">
              <p class="text">{{ cart.amount }}</p>
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
        <p class="sum_text">$ {{ Number(sumShow).toFixed(2) }}</p>
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
import { reactive, ref, toRaw, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'
import currency from 'currency.js'
import { useCartStore } from '@/stores/cart'
import { Toast } from '@/utils/extract'

// 接口
const cartStore = useCartStore()

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Cart'

// 计算总数
const sum = ref(0.0)
let sumShow = ref()
const arr = toRaw(cartStore.cartList)

// 减一
const minus = async (cart) => {
  cart.amount--
  if (cart.amount <= 0) {
    cart.amount = 0
    router.go(0)
  }
  sum.value = 0.0
  arr.forEach((item, index) => {
    sum.value = currency(item.goods.price).multiply(item.amount).add(currency(sum.value))
    sumShow.value = currency(sum.value).value
  })

  // post修改购物车
  const minusPost = reactive({
    goodsId: cart.goodsId,
    amount: cart.amount
  })
  await cartStore.editCart(minusPost)
}
// 加一
const add = async (cart, arr) => {
  cart.amount++
  sum.value = 0.0
  arr.forEach((item, index) => {
    sum.value = currency(item.goods.price).multiply(item.amount).add(currency(sum.value))
    sumShow.value = currency(sum.value).value
  })

  // post修改购物车
  const addPost = reactive({
    goodsId: cart.goodsId,
    amount: cart.amount
  })
  await cartStore.editCart(addPost)
}

// 跳转到reviewPurchase页面
const linkToReviewPurchase = () => {
  if (cartStore.cartList.length == 0) {
    Toast('You haven‘t added any products yet!')
  } else {
    router.push({
      path: '/reviewPurchase',
      query: {
        sum: sumShow.value
      }
    })
  }
}

onBeforeMount(async () => {
  // get购物车
  const postData = reactive({
    size: 10,
    page: 1
  })
  await cartStore.getCart(postData)

  // pre计算总数
  arr.forEach((item, index) => {
    sum.value = currency(item.goods.price).multiply(item.amount).add(currency(sum.value))
    sumShow.value = currency(sum.value).value
  })

  if (cartStore.cartList.length == 0) {
    sumShow.value = '0.00'
  }
})
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
          color: #a456dd;
          margin-left: 24px;
        }

        .product_box {
          height: 60px;
          margin-left: 8px;
          display: flex;
          align-items: center;
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
              line-height: 30px;
            }
            .price {
              font-size: 18px;
              color: #001c33;
              line-height: 30px;
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
