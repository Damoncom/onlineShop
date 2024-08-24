<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <div class="header">
        <div class="title">Verification Code</div>
        <div class="discription">
          We have sent the code verification to your number
          <span>{{ phone }}</span>
        </div>
      </div>
      <div class="verification-container">
        <input
          v-for="(code, index) in verificationCodes"
          :key="index"
          v-model="verificationCodes[index]"
          @input="handleInput(index, $event)"
          @keydown="handleKeyDown(index, $event)"
          maxlength="1"
          class="verification-input"
        />
      </div>
      <div class="countdown">
        <p class="time">{{ timeshow }}</p>
      </div>
      <div class="button_box">
        <div class="create_button" @click="submit(user)">
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
import { ref, onMounted, nextTick, toRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'
import axios from 'axios'
import { Toast, Toast_Info } from '@/utils/extract'
import { useUserStore } from '@/stores/user'

// 接口
let userStore = useUserStore()

// 导入导航栏
const navTitle = ''

// 定义变量
const msg = ref('')

// 倒计时
const fitZero = (num) => {
  return +num >= 10 ? num : '0' + num
}
const getMinute = (t) => {
  return fitZero(Math.floor(+t / 60))
}
const getSecond = (t) => {
  return fitZero(+t % 60)
}
let timeshow = ref('')
onMounted(async () => {
  let t = 180
  const timer = setInterval(() => {
    t--
    if (t == 0) {
      clearInterval(timer)
      t = 180
    }
    timeshow.value = `${getMinute(t)}:${getSecond(t)}`
  }, 1000)
})

// 获取路由参数
const router = useRouter()
const route = useRoute()
let user = route.query
const phone = user.phoneNumber

// 页面载入完毕获取验证码get请求
onMounted(async () => {
  // get验证码
  const { data: resp } = await axios({
    method: 'get',
    url: '/onlineShop/getVerificationCode',
    params: {
      phoneNumber: user.phoneNumber
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  alert(resp.verificationCode)
})

// 验证码框
const verificationCodes = ref(['', '', '', ''])
const handleInput = (index, event) => {
  const value = event.target.value
  verificationCodes.value[index] = value

  // 自动跳到下一个输入框
  if (value && index < verificationCodes.value.length - 1) {
    const nextInput = event.target.nextElementSibling
    if (nextInput) {
      nextTick(() => {
        nextInput.focus()
      })
    }
  }
}
const handleKeyDown = (index, event) => {
  // 处理删除操作
  if (event.key === 'Backspace' && !event.target.value && index > 0) {
    const prevInput = event.target.previousElementSibling
    if (prevInput) {
      nextTick(() => {
        prevInput.focus()
      })
    }
  }
}

// 提交验证码（submit按钮）
let isSubmit = ref(false)
const submit = async (user) => {
  await nextTick()

  // 处理验证码数字
  const arr = toRaw(verificationCodes.value)
  const sum = arr.join('')
  Reflect.set(user, 'verificationCode', sum)
  // post注册
  const resp_signUp = await userStore.signUp(user)

  if (resp_signUp.errCode == 1000) {
    // post登录须提交的数据
    let obj = { ...user }
    // post登录
    userStore.signIn(obj)
  } else if (resp_signUp.errCode == 1001) {
    msg.value = resp_signUp.errMsg
    setTimeout(async () => {
      await nextTick()
      msg.value = resp_signUp.errMsg
      router.push({
        path: '/signIn'
      })
    }, 2000)
  } else if (resp_signUp.errCode == 1002) {
    msg.value = resp_signUp.errMsg
    router.go(0)
  } else {
    msg.value = resp_signUp.errMsg
  }

  if (resp_signUp.errCode == 1000) {
  } else {
    Toast(msg.value)
  }
}

// 重新发送验证码
let recendColor = ref(false)
const recendFunc = () => {
  recendColor.value = true
  msg.value = 'The verification code has been successfully sent!'
  Toast_Info(msg.value)
  setTimeout(() => {
    router.go(0)
  }, 2000)
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
        span {
          color: #191d31;
        }
      }
    }
    .verification-container {
      width: 327px;
      height: 59px;
      margin-top: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      .verification-input {
        width: 66px;
        height: 59px;
        text-align: center;
        font-size: 20px;
        background-color: #f8f9fb;
        border: 1px solid transparent;
        border-radius: 12px;
        margin: 0 7.5px;
      }

      .verification-input:focus {
        // outline: none;
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
        position: relative;
        .text {
          font-size: 16px;
          color: #ffffff;
        }
        .link_home {
          position: absolute;
          width: 335px;
          height: 46px;
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
