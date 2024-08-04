<template>
  <div class="app">
    <div class="bar">
      <i class="iconfont icon-jiantou" @click="goBack"></i>
    </div>

    <div class="content">
      <div class="header">
        <div class="title">Reset Password</div>
        <div class="discription">Confirm your password</div>
      </div>

      <div class="input_field">
        <div class="input_pwd">
          <div class="title">New Password</div>
          <div class="form">
            <div class="main">
              <i
                class="iconfont icon-lock"
                :class="isRightPwd == true ? 'icon-lock_purple' : 'icon-lock'"
              ></i>
              <input type="text" placeholder="Enter your password" class="pwd" v-model="user.pwd" />
              <img src="@/assets/right.svg" class="right" v-if="isRightPwd == true" />
            </div>
          </div>
        </div>
        <div class="input_comfirmPwd">
          <div class="title">Confirm Password</div>
          <div class="form">
            <div class="main">
              <!-- <i
                class="iconfont icon-tel"
                :class="isRightPhone == true ? 'icon-tel_purple' : 'icon-tel'"
              ></i> -->
              <i
                class="iconfont icon-lock"
                :class="isRightComfirmPwd == true ? 'icon-lock_purple' : 'icon-lock'"
              ></i>
              <input
                type="text"
                placeholder="Enter your password"
                class="newPwd"
                v-model="user.comfirmPwd"
              />
              <img src="@/assets/right.svg" class="right" v-if="isRightComfirmPwd == true" />
            </div>
          </div>
        </div>
      </div>

      <div class="button_box">
        <div class="create_button" @click="reset">
          <p class="text">Reset Passowrd</p>
        </div>
      </div>
      <RouterLink to="/signIn" class="link_signin">
        <div class="sign_in">
          <p class="text">Sign In</p>
        </div>
      </RouterLink>
    </div>

    <!-- 引入toast组件 -->
    <Toast :init="msg" v-if="isActivedReset == true" />
  </div>
  <div class="mask" v-if="isReset == true && isAllRight == true"></div>
  <div class="bottom_sheet" v-if="isReset == true && isAllRight == true">
    <img src="@/assets/icon_index_daily.svg" class="img" />
    <div class="text">
      <div class="title">
        <p class="title_text">Successfully</p>
      </div>
      <div class="discription">
        <p class="discription_text">Congratulation! your Password has been changed successfully.</p>
      </div>
    </div>

    <div class="button">
      <div class="back_home_button">
        <p class="text1">Sign In</p>
      </div>
    </div>
  </div>

  <!-- 引入toast组件 -->
  <Toast :init="msg" v-if="isActivedReset == true" />
</template>

<script setup>
import { ref, onUpdated, nextTick, onMounted } from 'vue'
import Toast from '../../components/toast.vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 回退到上一页
const goBack = () => {
  router.go(-1)
}

// 用户信息
const user = ref({
  pwd: '',
  comfirmPwd: ''
})

// 输入框验证
let msg = ref('')
let isRightComfirmPwd = ref(false)
let isRightPwd = ref(false)
let isReset = ref(false)
let isActivedReset = ref(false)
let isAllRight = ref(false)
onUpdated(async () => {
  await nextTick()

  // 判断密码的输入格式正确与否
  // ^[a-zA-Z]\w{5,17}$  注：正确格式为：以字母开头，长度在6~18之间，只能包含字符、数字和下划线。
  const pwdReg = /^[a-zA-Z]\w{5,17}$/
  if (!pwdReg.test(user.value.pwd)) {
    isRightPwd.value = false
  } else {
    isRightPwd.value = true
  }
  if (!pwdReg.test(user.value.comfirmPwd)) {
    isRightComfirmPwd.value = false
  } else {
    isRightComfirmPwd.value = true
  }

  // 综合判断
  if (isRightPwd.value == false || isRightComfirmPwd.value == false) {
    msg.value = 'Incorrect password input'
  } else if (
    isRightPwd.value == true &&
    isRightComfirmPwd.value == true &&
    user.value.pwd != user.value.comfirmPwd
  ) {
    msg.value = 'The two password inputs are inconsistent'
  } else if (
    isRightPwd.value == true &&
    isRightComfirmPwd.value == true &&
    user.value.pwd === user.value.comfirmPwd
  ) {
    msg.value = 'Successfully!'
    isAllRight.value = true
  }
})

// TODO:重置密码
// 重置密码按钮
const reset = () => {
  isReset.value = true
  isActivedReset.value = true
  if (isAllRight.value == true) {
    router.push({
      path: '/signIn'
    })
  }
  setTimeout(() => {
    isActivedReset.value = false
  }, 4000)
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .title {
        width: 160px;
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

    .input_field {
      width: 327px;
      height: 192px;
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
      .input_comfirmPwd {
        width: 327px;
        height: 86px;
        margin-top: 20px;
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
            .newPwd {
              vertical-align: center;
              margin-left: 14px;
              width: 235px;
              font-size: 17px;
            }
            .newPwd::-webkit-input-placeholder {
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
      margin-top: 206px;
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
    .link_signin {
      text-decoration: none;
      .sign_in {
        width: 54px;
        height: 24px;
        margin: 24px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .text {
          font-size: 16px;
          color: #a456dd;
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
        text-align: center;
      }
    }
  }
  .link_location {
    text-decoration: none;
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
