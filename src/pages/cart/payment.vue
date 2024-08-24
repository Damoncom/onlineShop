<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <div class="amount">
        <div class="text_box">
          <p class="title">Payment Amount</p>
          <p class="balance">$ {{ balance }}</p>
        </div>
        <div class="img_box">
          <i class="iconfont icon-zhangdan"></i>
        </div>
      </div>
      <div class="platform">
        <div class="platform_title">
          <p class="title">Choose Platform</p>
        </div>
        <div class="platforms">
          <div class="visa" @click="chooseVisa" :class="isVisa == true ? 'visa_purple' : 'visa'">
            <i class="iconfont icon-zhengque1" v-if="isVisa == true"></i>
            <img src="@/assets/visa_plat.jpg" class="img" />
          </div>
          <div
            class="paypal"
            @click="choosePaypal"
            :class="isPaypal == true ? 'paypal_purple' : 'paypal'"
          >
            <i class="iconfont icon-zhengque1" v-if="isPaypal == true"></i>
            <img src="@/assets/paypel.jpg" class="img" />
          </div>
          <div
            class="change"
            @click="chooseChange"
            :class="isChange == true ? 'change_purple' : 'change'"
          >
            <i class="iconfont icon-zhengque1" v-if="isChange == true"></i>
            <img src="@/assets/change.jpg" class="img" />
          </div>
        </div>
      </div>
      <div class="details">
        <div class="title">Update payment method</div>
        {{ onInput(card) }}
        <div class="middlde">
          <div class="middlde_left">
            <p class="left_title">Name on card</p>
            <div class="cardname_input_box">
              <input type="text" class="cardname_input" placeholder="Olivia Rhye" />
            </div>
          </div>
          <div class="middlde_right">
            <p class="right_title">Expiry</p>
            <input type="date" class="carddate_input" />
          </div>
        </div>
        <div class="details_bottom">
          <div class="bottom_left">
            <p class="left_title">Card number</p>
            <div class="card">
              <img :src="logo" class="card_logo" />
              <input
                type="text"
                v-model="card"
                class="cardnum_input"
                @keyup="onInput"
                @paste="onInput"
              />
            </div>
          </div>
          <div class="bottom_right">
            <p class="right_title">CVV</p>
            <div class="cardpwd_input_box">
              <input type="password" class="cardpwd_input" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="button_box" @click="linkToDone">
        <div class="create_button">
          <p class="text">Purchase</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onBeforeMount, nextTick, toRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'
import currency from 'currency.js'
import axios from 'axios'
import { pay } from '@/utils/api'
import { useUserStore } from '@/stores/user'
import { useLocationStore } from '@/stores/location'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'

// 接口
const userStore = useUserStore()
const locationStore = useLocationStore()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Payment'

// 余额
const balance = ref(370000.0)

const logo = ref('src/assets/visa_bottom.jpg')

// 选择银行卡
let isVisa = ref(true)
let isPaypal = ref(false)
let isChange = ref(false)
const chooseVisa = () => {
  isVisa.value = true
  isPaypal.value = false
  isChange.value = false
  logo.value = 'src/assets/visa_bottom.jpg'
}
const choosePaypal = () => {
  isVisa.value = false
  isPaypal.value = true
  isChange.value = false
  logo.value = 'src/assets/paypal_logo.jpg'
}
const chooseChange = () => {
  isVisa.value = false
  isPaypal.value = false
  isChange.value = true
  logo.value = 'src/assets/change.jpg'
}

// 银行卡的输入
const card = ref('')
const onInput = () => {
  const digit = card.value.toString().length
  if (digit == 4 || digit == 9 || digit == 14) {
    card.value = card.value + ' '
  }
}

// 获取当前时间
let yy = new Date().getFullYear()
let mm =
  new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1
let dd = new Date().getDate()
let hh = new Date().getHours()
let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()

const token_info = localStorage.getItem('token')
const queryOrder = reactive([])

// post请求创建通知
const createNotice = reactive([])

onBeforeMount(async () => {
  // get购物车
  const postData = reactive({
    size: 10,
    page: 1
  })
  await cartStore.getCart(postData)
  if (cartStore.resp_getCart.errCode == 1000) {
    toRaw(cartStore.cartList).forEach((item) => {
      toRaw(createNotice).push({
        content: '您购买的' + item.goods.name + '商品已下单'
      })
    })
  } else {
  }

  // get用户信息
  toRaw(createNotice).forEach((item) => {
    Reflect.set(item, 'userId', userStore.userData.id)
    Reflect.set(item, 'vendor', 'system')
    Reflect.set(item, 'read', 0)
  })
  balance.value = userStore.userData.payment

  // 重新整合商品数据
  const arr = toRaw(resp_getCart.data.list)

  // get配送地址
  const locationPost = reactive({
    size: 1,
    page: 1
  })
  await locationStore.getLocation(locationPost)

  // 整理订单数据
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
    item.locationId = locationStore.locationList.id
  })
  Object.assign(queryOrder, queryOrderPre)
})

const queryOrderId = reactive([])
const payment = reactive({
  type: 'payment'
})

// 提交订单按钮
const linkToDone = async () => {
  await nextTick()

  // 前端生成订单号：order_${yyyMMddHHmmss}_${uuid}【多个商品时，使用相同的OrderId】
  const time = yy + mm + dd + hh + mf + ss
  toRaw(cartStore.cartList).forEach((item) => {
    toRaw(queryOrder).forEach((item2) => {
      item2.orderId = 'order_' + time + '_' + item.goodsId
    })

    Reflect.set(payment, 'orderIdList', ['order_' + time + '_' + item.goodsId])
  })

  console.log(payment)
  // promise.all(并起发送请求)
  // post创建订单
  const arrReq = queryOrder.map((item) => {
    return axios({
      method: 'post',
      url: '/onlineShop/createOrder',
      data: item,
      headers: {
        Authorization: `Bearer ${token_info}`,
        'Content-Type': 'multipart/form-data'
      }
    })
  })

  const respList = await Promise.all(arrReq)
  const respStateList = respList.map((item) => {
    if (item.data.errCode == 1000) return true
    else return false
  })
  console.log(respStateList)
  if (!respStateList.includes(false)) {
    // 全部接口放回正确后需要操作
    console.log('创建所有订单success')
    ;(await Promise.all(arrReq)).forEach((item) => {
      queryOrderId.push(item.data.data.orderId)
    })
  }
  console.log(await Promise.all(arrReq))
  console.log(queryOrderId)
  console.log(createNotice)

  // 创建通知
  const arrReq2 = createNotice.map((item) => {
    return axios({
      method: 'post',
      url: '/onlineShop/createNotification',
      data: item,
      headers: {
        Authorization: `Bearer ${token_info}`,
        'Content-Type': 'multipart/form-data'
      }
    })
  })

  const respList2 = await Promise.all(arrReq2)
  const respStateList2 = respList2.map((item) => {
    if (item.data.errCode == 1000) return true
    else return false
  })
  console.log(respStateList2)
  if (!respStateList2.includes(false)) {
    // 全部接口放回正确后需要操作
    console.log('创建所有通知success')
  }
  console.log(await Promise.all(arrReq2))

  // post支付
  const isPay = ref(false)
  await orderStore.pay(payment)
  if (orderStore.resp_pay.errCode == 1000) {
    isPay.value = true
  } else {
    isPay.value = false
  }

  if (!respStateList.includes(false) && !respStateList2.includes(false) && isPay.value == true) {
    router.push({
      path: '/done',
      query: {
        orderId: queryOrderId
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.app {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .amount {
      width: 327px;
      height: 110px;
      border-radius: 8px;
      background-color: #a456dd;
      margin: 16px 0 25px 0;
      display: flex;
      align-items: center;
      .text_box {
        margin-left: 20px;
        .title {
          font-size: 18px;
          color: white;
          line-height: 20px;
        }
        .balance {
          font-size: 25px;
          color: white;
          line-height: 40px;
        }
      }
      .img_box {
        width: 44px;
        height: 44px;
        border-radius: 50px;
        background-color: white;
        margin-left: auto;
        margin-right: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-zhangdan {
          font-size: 25px;
          color: #a456dd;
        }
      }
    }
    .platform {
      width: 375px;
      height: 144px;
      border-top: 1px solid #e3e5e5;
      border-bottom: 1px solid #e3e5e5;
      display: flex;
      flex-direction: column;
      align-items: center;
      .platform_title {
        margin: 24px auto 6px 24px;
        .title {
          font-size: 16px;
          color: #001c33;
        }
      }
      .platforms {
        margin: 5px auto 0 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        .visa {
          width: 101px;
          height: 64px;
          border-radius: 8px;
          border: 1.5px solid #f2f2f2;
          box-shadow: rgba(149, 157, 165, 0.109) 0px 4px 24px;
          margin-right: 10px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-zhengque1 {
            font-size: 18px;
            color: #a456dd;
            position: absolute;
            top: 5px;
            left: 5px;
          }
          .img {
            width: 38px;
            height: 39px;
          }
        }
        .visa_purple {
          border: 1.5px solid #a456dd;
        }
        .paypal {
          width: 101px;
          height: 64px;
          border-radius: 8px;
          border: 1.5px solid #f2f2f2;
          box-shadow: rgba(149, 157, 165, 0.109) 0px 4px 24px;
          margin-right: 10px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-zhengque1 {
            font-size: 18px;
            color: #a456dd;
            position: absolute;
            top: 5px;
            left: 5px;
          }
          .img {
            width: 67px;
            height: 17px;
          }
        }
        .paypal_purple {
          border: 1.5px solid #a456dd;
        }
        .change {
          width: 101px;
          height: 64px;
          border-radius: 8px;
          border: 1.5px solid #f2f2f2;
          box-shadow: rgba(149, 157, 165, 0.109) 0px 4px 24px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-zhengque1 {
            font-size: 18px;
            color: #a456dd;
            position: absolute;
            top: 5px;
            left: 5px;
          }
          .img {
            width: 36px;
            height: 36px;
          }
        }
        .change_purple {
          border: 1.5px solid #a456dd;
        }
      }
    }
    .details {
      width: 375px;
      height: 224px;
      padding-bottom: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-size: 16px;
        color: #001c33;
        margin: 24px auto 6px 24px;
      }
      .middlde {
        margin: 20px auto 0 24px;
        display: flex;
        .middlde_left {
          width: 207px;
          height: 70px;
          margin-right: 16px;
          .left_title {
            font-size: 14px;
            line-height: 20px;
            color: #344054;
            margin: 0 auto 5px 0;
          }
          .cardname_input_box {
            width: 211px;
            height: 46px;
            border: 1px solid #d0d5dd;
            border-radius: 8px;
            display: flex;
            align-items: center;
            .cardname_input {
              width: 180px;
              font-size: 14px;
              margin-left: 10px;
            }
          }
        }
        .middlde_right {
          width: 104px;
          height: 70px;
          .right_title {
            font-size: 14px;
            line-height: 20px;
            color: #344054;
            margin-bottom: 5px;
          }
          .carddate_input {
            width: 104px;
            height: 44px;
            font-size: 14px;
            border: 1px solid #d0d5dd;
            border-radius: 8px;
          }
        }
      }
      .details_bottom {
        margin: 16px auto 0 24px;
        display: flex;
        .bottom_left {
          width: 207px;
          height: 70px;
          margin-right: 16px;
          .left_title {
            font-size: 14px;
            line-height: 20px;
            color: #344054;
            margin: 0 auto 5px 0;
          }
          .card {
            width: 211px;
            height: 46px;
            font-size: 14px;
            border: 1px solid #d0d5dd;
            border-radius: 8px;
            position: relative;
            display: flex;
            align-items: center;
            .card_logo {
              position: absolute;
              width: 28px;
              height: 20px;
              margin-left: 10px;
            }
            .cardnum_input {
              font-size: 14px;
              width: 150px;
              margin-left: 40px;
            }
          }
        }
        .bottom_right {
          width: 104px;
          height: 70px;
          .right_title {
            font-size: 14px;
            line-height: 20px;
            color: #344054;
            margin-bottom: 5px;
          }
          .cardpwd_input_box {
            width: 105px;
            height: 46px;
            border: 1px solid #d0d5dd;
            border-radius: 8px;
            display: flex;
            align-items: center;
            .cardpwd_input {
              width: 80px;
              font-size: 14px;
              letter-spacing: 2px;
              margin-left: 10px;
            }
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
    bottom: 0;
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
