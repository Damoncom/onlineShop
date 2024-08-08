<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <ul class="cart_list">
        <li class="cart_item" v-for="(cart, cart_index) of cartList" :key="cart_index">
          <div class="product_box">
            <img :src="cart.img" class="img" />
            <div class="text_box">
              <div class="name">{{ cart.name }}</div>
              <div class="price">${{ cart.price }}</div>
            </div>
          </div>
          <div class="edit">
            <p class="edit_text">Edit</p>
          </div>
        </li>
      </ul>
      <div class="location">
        <div class="location_top">
          <div class="location_title">
            <div class="title">Delivery Location</div>
          </div>
        </div>
        <div class="location_bottom">
          <div class="location_img">
            <img src="@/assets/review.jpg" class="img" />
            <i class="iconfont icon-dingwei"></i>
          </div>
          <div class="location_text">
            <p class="text">{{ location }}</p>
          </div>
          <div class="jump">
            <i class="iconfont icon-jiantou" @click="linkToLocation"></i>
          </div>
        </div>
      </div>
      <div class="gift_code">
        <p class="gift_text">Have a gift code?</p>
      </div>
      <div class="caculate">
        <div class="subtotal">
          <p class="name">Subtotal</p>
          <p class="num">${{ subtotal }}</p>
        </div>
        <div class="shipping_and_handing">
          <p class="name">Shipping & Handing</p>
          <p class="num">${{ shipping }}</p>
        </div>
        <div class="Tax">
          <p class="name">Tax</p>
          <p class="num">${{ tax }}</p>
        </div>
        <div class="total">
          <p class="name">Total</p>
          <p class="num">${{ total }}</p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="notice">
        <p class="text">By clicking “Purchase” ,you accept the <span>terms</span>.</p>
      </div>
      <div class="button_box" @click="linkToPayment">
        <div class="create_button">
          <p class="text">Purchase</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, toRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import product from '@/assets/details_img.jpg'
import Nav from '@/components/nav'

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Review Purchase'

// 商品列表信息
const cartList = reactive([
  {
    id: '1',
    name: 'Gienchy L’  intemprorel Blossom',
    price: '29.00',
    img: product,
    num: 1,
    isChosen: true
  },
  {
    id: '2',
    name: 'Gienchy L’  intemprorel Blossom',
    price: '29.00',
    img: product,
    num: 1,
    isChosen: true
  }
])

const location = ref('Preston Rd. inglewood St. Maine 98380')
// TODO:计算总数
// console.log(toRaw(cartList))
// const sumShow = sum.value.toFixed(2)
const subtotal = ref()
const shipping = ref()
const tax = ref()
const total = ref()

// 跳转到location页面
const linkToLocation = () => {
  router.push({
    path: '/location'
  })
}

// 跳转到Payment页面
const linkToPayment = () => {
  router.push({
    path: '/payment'
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
      margin-right: 125px;
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

        .product_box {
          height: 60px;
          margin-left: 20px;
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
        .edit {
          width: 58px;
          height: 32px;
          border: 1px solid #a456dd;
          border-radius: 48px;
          margin-left: auto;
          margin-right: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          .edit_text {
            font-size: 14px;
            line-height: 16px;
            color: #a456dd;
          }
        }
      }
    }
    .location {
      width: 375px;
      height: 135px;
      border-top: 1px solid #e3e5e5;
      display: flex;
      flex-direction: column;
      .location_top {
        .location_title {
          margin-top: 24px;
          margin-left: 20px;
          .title {
            font-size: 16px;
            color: #001c33;
          }
        }
      }
      .location_bottom {
        display: flex;
        align-items: center;
        margin-top: 10px;
        .location_img {
          margin-left: 20px;
          position: relative;
          .img {
            width: 56px;
            height: 56px;
          }
          .icon-dingwei {
            font-size: 25px;
            color: #a456dd;
            position: absolute;
            left: 15px;
            top: 15px;
          }
        }
        .location_text {
          width: 150px;
          margin-left: 10px;
          .text {
            font-size: 12px;
            color: #001c33;
            line-height: 15px;
          }
        }
        .jump {
          margin-left: auto;
          margin-right: 24px;
          transform: rotate(0.5turn);
          .icon-jiantou {
            font-size: 14px;
          }
        }
      }
    }
    .gift_code {
      width: 375px;
      height: 73px;
      border-top: 1px solid #e3e5e5;
      border-bottom: 1px solid #e3e5e5;
      display: flex;
      align-items: center;
      .gift_text {
        font-size: 16px;
        line-height: 24px;
        color: #a456dd;
        margin-left: 20px;
      }
    }
    .caculate {
      width: 375px;
      height: 136px;
      margin: 24px 0;
      padding-bottom: 100px;
      display: flex;
      flex-direction: column;
      .subtotal {
        margin-left: 20px;
        display: flex;
        .name {
          font-size: 16px;
          line-height: 16px;
          color: #090a0a;
        }
        .num {
          font-size: 16px;
          line-height: 16px;
          color: #090a0a;
          margin-left: auto;
          margin-right: 24px;
        }
      }
      .shipping_and_handing {
        margin-left: 20px;
        display: flex;
        padding: 20px 0 0 0;
        .name {
          font-size: 16px;
          line-height: 16px;
          color: #090a0a;
        }
        .num {
          font-size: 16px;
          line-height: 16px;
          color: #090a0a;
          margin-left: auto;
          margin-right: 24px;
        }
      }
      .Tax {
        margin-left: 20px;
        display: flex;
        padding: 20px 0 0 0;
        .name {
          font-size: 16px;
          line-height: 16px;
          color: #090a0a;
        }
        .num {
          font-size: 16px;
          line-height: 16px;
          color: #090a0a;
          margin-left: auto;
          margin-right: 24px;
        }
      }
      .total {
        margin-left: 20px;
        display: flex;
        padding: 20px 0;
        .name {
          font-size: 16px;
          line-height: 16px;
          color: #090a0a;
        }
        .num {
          font-size: 16px;
          line-height: 16px;
          color: #090a0a;
          margin-left: auto;
          margin-right: 24px;
        }
      }
    }
  }
  .bottom {
    width: 375px;
    height: 110px;
    background-color: white;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .notice {
      width: 375px;
      height: 20px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        font-size: 14px;
        color: #374151;
        span {
          color: #a456dd;
        }
      }
    }
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
