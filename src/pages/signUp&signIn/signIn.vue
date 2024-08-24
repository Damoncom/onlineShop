<template>
  <div class="app">
    <Nav :init_title="navTitle" />

    <div class="content">
      <div class="header">
        <div class="title">Sign In</div>
        <div class="discription">Get great experience with AlNVE</div>
      </div>
      <div class="tab_bar">
        <div class="sign_up_button" @click="linkToSignUp">Sign Up</div>
        <div class="sign_in_button">Sign In</div>
      </div>
      <div class="input_field">
        <div class="input_phone">
          <div class="title">Phone Number</div>
          <div class="form">
            <div class="main">
              <i
                class="iconfont icon-tel"
                :class="isRightPhone == true ? 'icon-tel_purple' : 'icon-tel'"
              ></i>
              <input
                type="number"
                placeholder="Enter your number"
                class="phoneNumber"
                v-model="user.phoneNumber"
              />
              <img src="@/assets/right.svg" class="right" v-if="isRightPhone == true" />
            </div>
          </div>
        </div>
        <div class="input_pwd">
          <div class="title">Password</div>
          <div class="form">
            <div class="main">
              <i
                class="iconfont icon-lock"
                :class="isRightPwd == true ? 'icon-lock_purple' : 'icon-lock'"
              ></i>
              <input
                type="password"
                placeholder="Enter your password"
                class="pwd"
                v-model="user.pwd"
                @keyup.enter="signInButton(user)"
              />
              <img src="@/assets/right.svg" class="right" v-if="isRightPwd == true" />
            </div>
          </div>
        </div>
      </div>

      <div class="more">
        <div class="more_left">
          <input type="checkbox" class="remember_checkbox" v-model="user.isRemember" />
          <div class="remember">
            <p class="remember_text">Remember Me</p>
          </div>
        </div>
        <div class="more_right">
          <p class="right_text" @click="linkToReset">Forgot Password?</p>
        </div>
      </div>

      <div class="button_box">
        <div class="create_button" @click="signInButton(user)">
          <p class="text">Sign In</p>
        </div>
      </div>

      <div class="bottom">
        <div class="title">
          <p class="text">Or Sign In With</p>
        </div>
        <div class="social_buttons">
          <div class="google">
            <img src="@/assets/google.svg" class="google_img" />
          </div>
          <div class="facebook">
            <img src="@/assets/facebook.svg" class="facebook_img" />
          </div>
          <div class="apple">
            <img src="@/assets/apple.svg" class="apple_img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated, nextTick, onBeforeMount, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'
import { checkPhoneNumber, checkPwd, Toast } from '@/utils/extract'
import { useUserStore } from '@/stores/user'

// let userStore
let userStore = useUserStore()

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = ''

// 跳转到signUp页面
const linkToSignUp = () => {
  router.push({
    path: '/signUp'
  })
}

// 用户信息
const user = reactive({
  phoneNumber: '',
  pwd: '',
  isRemember: true
})

const linkToReset = () => {
  router.push({
    path: '/resetPwd'
  })
}

onBeforeMount(async () => {
  await nextTick()

  // 接口
  const isRemember_info = JSON.parse(localStorage.getItem('isRemember'))
  if (isRemember_info == false) {
    // 清除localstorage缓存
    localStorage.clear()
  } else {
  }
})

// 输入框验证
let msg = ref('')
let isRightPhone = ref(false)
let isRightPwd = ref(false)
let signin = ref(false)
onUpdated(async () => {
  await nextTick()

  // 判断手机号码的输入格式正确与否
  const checkphone = await checkPhoneNumber(user.phoneNumber)
  isRightPhone.value = checkphone

  // 判断密码的输入格式正确与否
  const checkpwd = await checkPwd(user.pwd)
  isRightPwd.value = checkpwd
})

// 登录按钮
const signInButton = async (user) => {
  await nextTick()

  // 输入格式正确与否判断
  if (isRightPhone.value === false && isRightPwd.value === false) {
    msg.value = 'Incorrect phone number and password input'
  } else if (isRightPhone.value === true && isRightPwd.value === false) {
    msg.value = 'Incorrect password input'
  } else if (isRightPhone.value === false && isRightPwd.value === true) {
    msg.value = 'Incorrect phone number input'
  } else if (isRightPhone.value === true && isRightPwd.value === true) {
    signin.value = true
    // post登录须提交的数据
    let obj = { ...user }

    // post登录
    userStore.signIn(obj)
  }

  if (isRightPhone.value === true && isRightPwd.value === true) {
  } else {
    Toast(msg.value)
  }
}
</script>

<style lang="scss" scoped>
input {
  background: none;
  outline: none;
  border: none;
}
.app {
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;

    .header {
      width: 327px;
      height: 107px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .title {
        width: 81px;
        height: 25px;
        color: #191d31;
        font-size: 20px;
        line-height: 9px;
      }
      .discription {
        // width: 375px;
        height: 24px;
        font-size: 16px;
        color: #a7a9b7;
      }
    }

    .tab_bar {
      width: 327px;
      height: 50px;
      background-color: #f8f9fb;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 24px;
      .sign_up_button {
        width: 160px;
        height: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
        // padding: 10px 30px;
        font-size: 14px;
        line-height: 18.2px;
        color: #a7a9b7;
        text-decoration: none;
      }
      .sign_in_button {
        width: 160px;
        height: 42px;
        font-size: 14px;
        line-height: 18.2px;
        color: #191d31;
        background-color: #ffffff;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .input_field {
      width: 327px;
      height: 192px;

      .input_phone {
        width: 327px;
        height: 86px;
        margin-bottom: 20px;
        .title {
          width: auto;
          height: 34px;
          font-size: 16px;
          color: #191d31;
        }
        .form {
          width: 327px;
          height: 52px;
          border: 1px solid #f3f3f3;
          border-radius: 12px;
          display: flex;
          align-items: center;
          .main {
            width: 300px;
            height: 24px;
            margin-left: 10px;
            display: flex;
            align-items: center;
            .icon-tel {
              font-size: 20px;
              color: #a7a9b7;
            }
            .icon-tel_purple {
              color: #a456dd;
            }
            .phoneNumber {
              vertical-align: center;
              margin-left: 14px;
              width: 235px;
              font-size: 17px;
            }
            .phoneNumber::-webkit-input-placeholder {
              font-size: 16px;
              color: #a7a9b7;
            }
            .right {
              width: 23px;
              height: 23px;
            }
          }
        }
      }
      .input_pwd {
        width: 327px;
        height: 86px;
        .title {
          width: auto;
          height: 34px;
          font-size: 16px;
          color: #191d31;
        }
        .form {
          width: 327px;
          height: 52px;
          border: 1px solid #f3f3f3;
          border-radius: 12px;
          display: flex;
          align-items: center;
          .main {
            width: 300px;
            height: 24px;
            margin-left: 10px;
            display: flex;
            align-items: center;
            .icon-lock {
              font-size: 20px;
              color: #a7a9b7;
            }
            .icon-lock_purple {
              color: #a456dd;
            }
            .pwd {
              vertical-align: center;
              margin-left: 14px;
              width: 235px;
              font-size: 17px;
            }
            .pwd::-webkit-input-placeholder {
              font-size: 16px;
              color: #a7a9b7;
            }
            .right {
              width: 23px;
              height: 23px;
            }
          }
        }
      }
    }
    .more {
      width: 327px;
      height: 24px;
      margin-top: 16px;
      display: flex;
      align-items: center;
      .more_left {
        width: 124px;
        height: 18px;
        display: flex;
        align-items: center;
        .remember_checkbox {
          width: 15px;
          height: 15px;
          border: 1px solid #1c31c8;
          border-radius: 20px;
        }
        .remember {
          height: 18px;
          display: flex;
          align-items: center;
          margin-left: 5px;
          .remember_text {
            width: 100px;
            font-size: 14px;
            color: #a7a9b7;
          }
        }
      }
      .more_right {
        height: 18px;
        display: flex;
        align-items: center;
        margin-left: auto;
        .right_text {
          padding: 10px 0;
          font-size: 14px;
          color: #a456dd;
          text-decoration: none;
        }
      }
    }
    .button_box {
      width: 335px;
      height: 46px;
      margin-top: 37px;
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
      width: 375px;
      margin: 25px 0 30px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #f3f3f3;
      .title {
        height: 25px;
        margin: 12px 0;
        display: flex;
        align-items: center;
        .text {
          font-size: 16px;
          color: #a7a9b7;
        }
      }
      .social_buttons {
        width: 335px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;

        .google {
          width: 103px;
          height: 44px;
          border: 1px solid #d0d5dd;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 6px;
          transition: all 0.1s ease-in-out;
          .google_img {
            width: 24px;
            height: 24px;
          }
        }
        .google:active {
          background-color: #d0d5dd57;
        }
        .facebook {
          width: 103px;
          height: 44px;
          border: 1px solid #d0d5dd;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 6px;
          transition: all 0.1s ease-in-out;
          .facebook_img {
            width: 24px;
            height: 24px;
          }
        }
        .facebook:active {
          background-color: #d0d5dd57;
        }
        .apple {
          width: 103px;
          height: 44px;
          border: 1px solid #d0d5dd;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 6px;
          transition: all 0.1s ease-in-out;
          .apple_img {
            width: 24px;
            height: 24px;
          }
        }
        .apple:active {
          background-color: #d0d5dd57;
        }
      }
    }
  }
}
</style>
