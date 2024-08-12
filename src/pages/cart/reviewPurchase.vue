<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <ul class="cart_list">
        <li class="cart_item" v-for="(cart, cart_index) of cartList" :key="cart_index">
          <div class="product_box">
            <img :src="cart.goods.image" class="img" />
            <div class="text_box">
              <div class="name">{{ cart.goods.name }}</div>
              <div class="price">${{ cart.goods.price }}</div>
            </div>
          </div>
          <div class="edit" @click="linkToCart">
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
        <div class="location_bottom" @click="linkToLocation">
          <div class="location_img">
            <img src="@/assets/review.jpg" class="img" />
            <i class="iconfont icon-dingwei"></i>
          </div>
          <div class="location_text">
            <p class="text">{{ locationDetails.location }}</p>
          </div>
          <div class="jump">
            <i class="iconfont icon-jiantou"></i>
          </div>
        </div>
      </div>
      <div class="gift_code">
        <p class="gift_text">Have a gift code?</p>
      </div>
      <div class="caculate">
        <div class="subtotal">
          <p class="name">Subtotal</p>
          <p class="num">$ {{ subtotal }}</p>
        </div>
        <div class="shipping_and_handing">
          <p class="name">Shipping & Handing</p>
          <p class="num">$ {{ plus.handling }}</p>
        </div>
        <div class="Tax">
          <p class="name">Tax</p>
          <p class="num">$ {{ plus.tax }}</p>
        </div>
        <div class="total">
          <p class="name">Total</p>
          <p class="num">$ {{ total }}</p>
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
import { reactive, ref, toRaw, nextTick, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import product from '@/assets/details_img.jpg'
import Nav from '@/components/nav'
import currency from 'currency.js'

const router = useRouter()
const route = useRoute()

const token_info = localStorage.getItem('token')

// 导入导航栏
const navTitle = 'Review Purchase'

// 商品列表信息
const cartList = reactive([
  // {
  //   id: '1',
  //   name: 'Gienchy L’  intemprorel Blossom',
  //   price: '29.33',
  //   img: product,
  //   num: 1,
  //   isChosen: true
  // },
  // {
  //   id: '2',
  //   name: 'Gienchy L’  intemprorel Blossom',
  //   price: '29.99',
  //   img: product,
  //   num: 1,
  //   isChosen: true
  // }
])

// edit按钮
const linkToCart = () => {
  router.push({
    path: '/cart'
  })
}

//最终价格
const pre = route.query
const subtotal = ref(pre.sum)
const plus = reactive({})
const total = ref()

// 跳转到location页面
const linkToLocation = () => {
  router.push({
    path: '/location'
  })
}

const locationDetails = reactive({})
const queryOrder = reactive([])

onBeforeMount(async () => {
  await nextTick()

  // 获取购物车信息
  const { data: resp_cart } = await axios({
    method: 'get',
    url: 'http://192.168.100.7:7001/onlineShop/getCart',
    params: {
      size: 10,
      page: 1
    },
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  if (resp_cart.errCode == 1000) {
    Object.assign(cartList, resp_cart.data.list)
  } else {
  }
  console.log('get购物车数据:', resp_cart)

  // 重新整合商品数据
  const postgoods = reactive([])
  const arr = toRaw(resp_cart.data.list)
  arr.forEach((item, index) => {
    postgoods.push({
      id: item.goodsId,
      amount: item.amount
    })
  })

  // 获取配送地址
  const { data: resp_getLocation } = await axios({
    method: 'get',
    url: 'http://192.168.100.7:7001/onlineShop/getLocation',
    params: {
      size: 1,
      page: 1
    },
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  if (resp_getLocation.errCode == 1000) {
    Object.assign(locationDetails, ...resp_getLocation.data.list)
  } else {
  }
  console.log('get配送地址数据:', resp_getLocation)

  // post计算费用
  const { data: resp_calculate } = await axios({
    method: 'post',
    url: 'http://192.168.100.7:7001/onlineShop/calculateCost',
    data: {
      goods: toRaw(postgoods),
      subtotal: pre.sum,
      locationId: locationDetails.id
    },
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  if (resp_calculate.errCode == 1000) {
    Object.assign(plus, resp_calculate.data)
    total.value = currency(pre.sum)
      .add(currency(resp_calculate.data.handling))
      .add(currency(resp_calculate.data.tax))
  } else {
  }
  console.log('post计算费用：', resp_calculate)

  // 整理传参数据
  const queryOrderPre = reactive([])
  const itemSubTotal = ref()
  arr.forEach((item, index) => {
    itemSubTotal.value = currency(item.goods.price).multiply(item.amount)
    queryOrderPre.push({
      userId: item.userId,
      goodsId: item.goodsId,
      amount: item.amount,
      subTotal: itemSubTotal.value.value,
      tax: itemSubTotal.value.value * 0.01,
      handling: itemSubTotal.value.value * 0.1,
      total: itemSubTotal.value.value * 1.11
    })
  })
  toRaw(queryOrderPre).forEach((item) => {
    item.locationId = locationDetails.id
  })
  Object.assign(queryOrder, queryOrderPre)
})

console.log(queryOrder)
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
