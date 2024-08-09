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
                type="number"
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
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Payment'

// 余额
const balance = ref(3700.0)

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

//TODO:银行卡4位数一组的输入
// 银行卡的输入
const card = ref()
const onInput = () => {
  const a = card.replace(/\D/g, '') // 不允许输入非数字字符
  const b = card.replace(/(\d{4})(?=\d)/g, '$1 ') // 4位
  console.log(b)
}

// 跳转到done页面
const linkToDone = () => {
  router.push({
    path: '/done'
  })
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
