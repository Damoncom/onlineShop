<template>
  <div class="app">
    <div class="bar">
      <i class="iconfont icon-jiantou" @click="goBack"></i>
    </div>
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
        <p class="time">{{ m + ':' + s }}</p>
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
import { ref, onMounted, nextTick, onUpdated } from 'vue'
import Toast from '../../components/toast.vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { reactive, isReactive } from 'vue'

// 回退到上一页面
const goBack = () => {
  router.go(-1)
}

//TODO:保0操作
// 倒计时
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

// 获取路由参数
const router = useRouter()
const route = useRoute()
let user = route.query
console.log(user)
const phone = user.phoneNumber
let user_signIn = {
  phoneNumber: user.phoneNumber,
  pwd: user.pwd
}
console.log(user_signIn)

// 页面载入完毕获取验证码
onMounted(async () => {
  const { data: resp } = await axios({
    method: 'get',
    // url: `${baseUrl}/getVerificationCode`,
    url: 'http://192.168.100.7:7001/onlineShop/getVerificationCode',
    params: {
      // verificationCode: '1234',
      phoneNumber: user.phoneNumber
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
      // Authorization: `Bearer ${resp.data.token}`
    }
  })
  console.log(resp)
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
const submit = (user) => {
  isRecend.value = true
  setTimeout(async () => {
    await nextTick()
    isRecend.value = false
  }, 4000)

  const sum =
    verificationCodes.value[0] +
    verificationCodes.value[1] +
    verificationCodes.value[2] +
    verificationCodes.value[3]

  console.log(sum)

  Reflect.set(user, 'verificationCode', sum)
  console.log(user)

  // 发送数据
  axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
  axios
    .post('http://192.168.100.7:7001/onlineShop/signUp', user)
    .then(function ({ data: response }) {
      console.log(response)
      console.log(user)
      if (response.errCode == 1000) {
        // 存储注册时的信息
        localStorage.setItem('user', JSON.stringify(user))
        const user_info = JSON.parse(localStorage.getItem('user'))
        console.log(user_info)

        // 发送数据
        axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
        axios
          .post('http://192.168.100.7:7001/onlineShop/signIn', user_signIn)
          .then(function ({ data: response }) {
            console.log(response)
            localStorage.setItem('token', response.data.token)
            const token_info = localStorage.getItem('token')
            console.log(token_info)

            if (response.errCode == 1000) {
              msg.value = 'Successfully!'
              // 跳转
              router.push({
                path: '/home'
              })
            } else {
              isActivedCreate.value = true
              msg.value = response.errMsg
              setTimeout(() => {
                isActivedCreate.value = false
              }, 4000)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      } else if (response.errCode == 1001) {
        msg.value = '该用户已注册！'
        setTimeout(async () => {
          await nextTick()
          router.push({
            path: '/signIn'
          })
        }, 2000)
      } else if (response.errCode == 1002) {
        msg.value = '验证码错误！'
        router.go(0)
      } else {
        isActivedCreate.value = true
        msg.value = response.errMsg
        setTimeout(() => {
          isActivedCreate.value = false
        }, 4000)
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

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
