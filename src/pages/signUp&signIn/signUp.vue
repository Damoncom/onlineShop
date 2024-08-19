<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <div class="header">
        <div class="title">Sign Up</div>
        <div class="discription">Get great experience with AlNVE</div>
      </div>
      <div class="tab_bar">
        <div class="sign_up_button">Sign Up</div>
        <div class="sign_in_button" @click="linkToSignIn">Sign In</div>
      </div>
      <KeepAlive include="signUP">
        <div class="input_field">
          <div class="input_name">
            <div class="title">Full Name</div>
            <div class="form">
              <div class="main">
                <i
                  class="iconfont icon-geren"
                  :class="isRightName == true ? 'icon-geren_purple' : 'icon-geren'"
                ></i>
                <input type="text" placeholder="Enter your name" class="name" v-model="user.name" />
                <img src="@/assets/right.svg" class="right" v-if="isRightName == true" />
              </div>
            </div>
          </div>
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
                />
                <img src="@/assets/right.svg" class="right" v-if="isRightPwd == true" />
              </div>
            </div>
          </div></div
      ></KeepAlive>
      <div class="button_box">
        <div class="create_button" @click="createAccount">
          <p class="text">Create Account</p>
        </div>
      </div>
      <div class="bottom">
        <div class="title">
          <p class="text">Or Sign Up With</p>
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

    <!-- 引入toast组件 -->
    <Toast :init="msg" v-if="isActivedCreate == true" />
  </div>
</template>

<script setup>
import { ref, unref, onUpdated, nextTick, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'
import Toast from '@/components/toast.vue'
import md5 from 'js-md5'
import { checkPhoneNumber, checkPwd } from '@/utils/extract'

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = ''

// 切换到signIn页面
const linkToSignIn = () => {
  router.push({
    path: '/signIn'
  })
}

// 用户信息
const user = ref({
  name: '',
  phoneNumber: '',
  pwd: ''
})

// 输入框验证
const msg = ref('')
let isRightName = ref(false)
let isRightPhone = ref(false)
let isRightPwd = ref(false)
let create = ref(false)
let isActivedCreate = ref(false)

// 实时判断输入正确与否
onUpdated(async () => {
  await nextTick()

  // 判断用户名是否为空
  if (user.value.name !== '') {
    isRightName.value = true
  } else {
    isRightName.value = false
  }

  // 判断手机号码的输入格式正确与否
  const checkphone = await checkPhoneNumber(user.value.phoneNumber)
  isRightPhone.value = checkphone

  // 判断密码的输入格式正确与否
  const checkpwd = await checkPwd(user.value.pwd)
  isRightPwd.value = checkpwd
})

// 创建账户按钮
const createAccount = async () => {
  await nextTick()

  // 控制toast出现
  isActivedCreate.value = true
  setTimeout(() => {
    isActivedCreate.value = false
  }, 3900)

  // 输入判断
  if (isRightName.value === false) {
    msg.value = 'Name cannot be empty'
    return
  }
  if (isRightPhone.value === false) {
    msg.value = 'Incorrect phone number input'
    return
  }
  if (isRightPwd.value === false) {
    msg.value = 'Incorrect password input'
    return
  }
  if (isRightPhone.value === true && isRightPwd.value === true && isRightName.value === true) {
    msg.value = 'Successfully!'
    create.value = true

    user.value.pwd = md5(user.value.pwd)
    // Object.assign(user.value.pwd, md5(user.value.pwd))

    // 跳转到验证码页面
    router.push({
      path: '/verificationCode',
      query: unref(user)
    })
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
        font-size: 14px;
        line-height: 18.2px;
        color: #191d31;
        background-color: #ffffff;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .sign_in_button {
        width: 160px;
        height: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        line-height: 18.2px;
        color: #a7a9b7;
        text-decoration: none;
      }
    }

    .input_field {
      width: 327px;
      height: 298px;
      .input_name {
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
            .icon-geren {
              font-size: 20px;
              color: #a7a9b7;
            }
            .icon-geren_purple {
              color: #a456dd;
            }
            .name {
              vertical-align: center;
              margin-left: 14px;
              width: 235px;
              font-size: 17px;
            }
            .name::-webkit-input-placeholder {
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
    .button_box {
      width: 335px;
      height: 46px;
      margin-top: 37px;
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
      .link {
        width: 335px;
        height: 46px;
        position: absolute;
      }
    }

    .bottom {
      width: 375px;
      margin: 17px 0 30px 0;
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
          width: 44px;
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
          width: 44px;
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
          width: 44px;
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
