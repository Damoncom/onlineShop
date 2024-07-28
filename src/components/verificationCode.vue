<template>
  <div class="app">
    <div class="bar">
      <i class="iconfont icon-jiantou"></i>
    </div>
    <div class="content">
      <div class="header">
        <div class="title">Verification Code</div>
        <div class="discription">We have sent the code verification to your number</div>
      </div>
      <div class="number_box">
        <div class="num1" @click="input" :class="isActived == true ? 'num_actived' : 'num1'">
          <input type="number" class="input1" />
        </div>
        <div class="num2" @click="input2" :class="isActived2 == true ? 'num_actived' : 'num2'">
          <input type="number" class="input2" />
        </div>
        <div class="num3" @click="input3" :class="isActived3 == true ? 'num_actived' : 'num3'">
          <input type="number" class="input3" />
        </div>
        <div class="num4" @click="input4" :class="isActived4 == true ? 'num_actived' : 'num4'">
          <input type="number" class="input4" />
        </div>
      </div>
      <div class="countdown">
        <p class="time">{{ m + ':' + s }}</p>
      </div>
      <div class="button_box">
        <div class="create_button" @click="submit">
          <p class="text">Submit</p>
        </div>
      </div>
      <div class="bottom">
        <div class="title">
          <div class="text">
            Didn't receive the code?
            <span
              class="resend"
              @click="recendFunc"
              :class="recendColor == true ? 'resend_active' : 'resend'"
              >Resend</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 引入toast组件 -->
    <Toast :init="msg" v-if="isRecend == true" />
  </div>
  <div class="mask" v-if="isSubmit == true"></div>
  <div class="bottom_sheet" v-if="isSubmit == true">
    <img src="@/assets/icon_index_daily.svg" class="img" />
    <div class="text">
      <div class="title">
        <p class="title_text">Register Successfully</p>
      </div>
      <div class="discription">
        <p class="discription_text">Congratulation! your account already created.</p>
        <p class="discription_text">Please login to get amazing experience.</p>
      </div>
    </div>
    <div class="button">
      <div class="back_home_button">
        <p class="text1">Go to Homepage</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Toast from './toast'

// 验证码输入框点击变色
let isActived = ref(false)
let isActived2 = ref(false)
let isActived3 = ref(false)
let isActived4 = ref(false)
const input = () => {
  isActived2.value = false
  isActived3.value = false
  isActived4.value = false
  isActived.value = true
}
const input2 = () => {
  isActived.value = false
  isActived3.value = false
  isActived4.value = false
  isActived2.value = true
}
const input3 = () => {
  isActived.value = false
  isActived2.value = false
  isActived4.value = false
  isActived3.value = true
}
const input4 = () => {
  isActived.value = false
  isActived2.value = false
  isActived3.value = false
  isActived4.value = true
}

// 倒计时
let countdown = ref('03:00')
let m = ref(2)
let s = ref(59)
onMounted(async () => {
  await nextTick()
  const timer2 = setInterval(() => {
    m.value--
    if (m.value < 0) {
      clearInterval(timer2)
      m.value = 0
    }
  }, 59000)
})
let count_s = ref(0)
onMounted(async () => {
  await nextTick()
  const timer = setInterval(() => {
    s.value--
    if (s.value == 0) {
      s.value = 59
      count_s.value++
    }
    if (count_s.value == 3) {
      clearInterval(timer)
      s.value = '00'
    }
  }, 1000)
})

// 重新发送验证码
const msg = ref('')
let isRecend = ref(false)
let recendColor = ref(false)
const recendFunc = () => {
  isRecend.value = true
  recendColor.value = true
  msg.value = 'The verification code has been successfully sent!'
  setTimeout(() => {
    isRecend.value = false
  }, 3000)
}

// 提交验证码
let isSubmit = ref(false)
let verificationCode = ref('')

const submit = () => {
  isSubmit.value = true
}
</script>

<style lang="scss" scoped>
input {
  background: none;
  outline: none;
  border: none;
}
.app {
  .bar {
    width: 275px;
    height: 48px;
    display: flex;
    align-items: center;
    margin-left: 20px;
    .icon-jiantou {
      font-size: 16px;
      color: #191d31;
    }
  }
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;

    .header {
      width: 327px;
      height: 107px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .title {
        width: 178px;
        height: 25px;
        color: #191d31;
        font-size: 20px;
        line-height: 9px;
      }
      .discription {
        // width: 375px;
        height: 48px;
        font-size: 16px;
        color: #a7a9b7;
        line-height: 20px;
      }
    }
    .number_box {
      width: 327px;
      height: 59px;
      margin-top: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      .num1 {
        width: 66px;
        height: 59px;
        background-color: #f8f9fb;
        border: 1px solid transparent;
        border-radius: 12px;
        margin: 0 10.5px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .input1 {
          width: 66px;
          height: 59px;
          font-size: 20px;
          color: #191d31;
          text-align: center;
        }
      }
      .num2 {
        width: 66px;
        height: 59px;
        background-color: #f8f9fb;
        border: 1px solid transparent;
        border-radius: 12px;
        margin: 0 10.5px;
        .input2 {
          width: 66px;
          height: 59px;
          font-size: 20px;
          color: #191d31;
          text-align: center;
        }
      }
      .num3 {
        width: 66px;
        height: 59px;
        background-color: #f8f9fb;
        border: 1px solid transparent;
        border-radius: 12px;
        margin: 0 10.5px;
        .input3 {
          width: 66px;
          height: 59px;
          font-size: 20px;
          color: #191d31;
          text-align: center;
        }
      }
      .num4 {
        width: 66px;
        height: 59px;
        background-color: #f8f9fb;
        border: 1px solid transparent;
        border-radius: 12px;
        margin: 0 0 0 10.5px;
        .input4 {
          width: 66px;
          height: 59px;
          font-size: 20px;
          color: #191d31;
          text-align: center;
        }
      }
      .num_actived {
        border: 1px solid #a456dd;
        box-shadow: #a556dd24 0px 2px 8px 0px;
      }
    }
    .countdown {
      width: 43px;
      height: 24px;
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      .time {
        color: #191d31;
      }
    }
    .button_box {
      width: 335px;
      height: 46px;
      margin-top: 48px;
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
    .bottom {
      .title {
        height: 24px;
        margin: 12px 0;
        display: flex;
        align-items: center;
        .text {
          font-size: 16px;
          color: #a7a9b7;
          .resend {
            color: #a456dd;
          }
          .resend_active {
            color: #570691;
          }
        }
      }
    }
  }
}
.mask {
  width: 375px;
  height: 812px;
  background-color: rgba($color: #000000, $alpha: 0.5);
  position: absolute;
  top: 0;
}
.bottom_sheet {
  width: 375px;
  height: 554px;
  margin-top: 82px;
  position: absolute;
  bottom: 0;
  z-index: 999;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: bottomSheet 0.5s ease;
  .img {
    width: 188px;
    height: 188px;
  }
  .text {
    width: 335px;
    height: 88px;
    display: flex;
    margin-top: 45px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
      width: 240px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      .title_text {
        font-size: 20px;
        color: #191d31;
      }
    }
    .discription {
      width: 375px;
      height: 48px;
      margin-top: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .discription_text {
        font-size: 16px;
        color: #a7a9b7;
        line-height: 20px;
      }
    }
  }
  .button {
    width: 335px;
    height: 46px;
    margin-top: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    .back_home_button {
      width: 335px;
      height: 46px;
      border-radius: 6px;
      background-color: #a456dd;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.1s ease-in-out;
      .text1 {
        font-size: 16px;
        color: #ffffff;
      }
    }
    .back_home_button:active {
      width: 325px;
      height: 44px;
    }
  }
}
@keyframes bottomSheet {
  from {
    height: 0px;
  }
  to {
    height: 554px;
  }
}
</style>
