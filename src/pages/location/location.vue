<template>
  <div class="app">
    <div class="content">
      <div class="img_box">
        <img src="@/assets/location_logo.jpg" class="img" />
      </div>
      <div class="text_box">
        <div class="title">Service Delivery Location</div>
        <div class="discription">
          Select the area where you would like to receive some amazing services. You can change this
          later!
        </div>
      </div>
      <div class="current_button" @click="getCurrentLocation">
        <div class="current">
          <p class="text">My Current Location</p>
        </div>
      </div>
      <RouterLink to="/select_location" class="link_selectLocation">
        <div class="select_button">
          <div class="select">
            <p class="text">Select Location</p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
  <div class="mask" v-if="isActivedCurrent == true"></div>
  <div class="location_current_box" v-if="isActivedCurrent == true">
    <div class="current_box_title">Comfirm your Location</div>
    <i class="iconfont icon-dingwei"></i>
    <div class="details">{{ location }}</div>
    <div class="box_button">
      <div class="cancel_button" @click="cancel">
        <div class="cancel">
          <p class="text">Cancel</p>
        </div>
      </div>
      <div class="confirm_button">
        <div class="comfirm">
          <p class="text">Comfirm</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 控制蒙层
let isActivedCurrent = ref(false)
const getCurrentLocation = () => {
  isActivedCurrent.value = true
}

// 位置数据
let location = ref(
  'Body 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'
)

// 取消
const cancel = () => {
  isActivedCurrent.value = false
}
</script>

<style lang="scss" scoped>
.app {
  .content {
    width: 375px;
    height: 812px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .img_box {
      .img {
        width: 96px;
        height: 96px;
      }
    }
    .text_box {
      width: 308px;
      margin-top: 31px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .title {
        font-size: 20px;
        color: #333333;
      }
      .discription {
        margin-top: 18px;
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        text-align: center;
      }
    }
    .current_button {
      width: 335px;
      height: 46px;
      margin-top: 147px;
      display: flex;
      justify-content: center;
      align-items: center;
      .current {
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
      .current:active {
        width: 325px;
        height: 44px;
      }
    }
    .link_selectLocation {
      text-decoration: none;
      .select_button {
        width: 335px;
        height: 46px;
        margin-top: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        .select {
          width: 335px;
          height: 46px;
          border-radius: 6px;
          border: 1px solid #a456dd;
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.1s ease-in-out;
          .text {
            font-size: 16px;
            color: #a456dd;
          }
        }
        .select:active {
          width: 325px;
          height: 44px;
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
.location_current_box {
  width: 375px;
  height: 351px;
  background-color: #ffffff;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  .current_box_title {
    font-size: 16px;
    color: #333333;
    line-height: 20px;
  }
  .icon-dingwei {
    margin-top: 27px;
    font-size: 24px;
    color: #a456dd;
  }
  .details {
    margin-top: 13px;
    width: 302px;
    font-size: 14px;
    line-height: 20px;
    color: #828282;
    text-align: center;
  }
  .box_button {
    display: flex;
    align-items: center;
    margin-top: 25px;

    .cancel_button {
      width: 159px;
      height: 50px;
      //   margin-top: 18px;
      margin-right: 8.5px;
      display: flex;
      justify-content: center;
      align-items: center;
      .cancel {
        width: 159px;
        height: 50px;
        border-radius: 6px;
        background-color: #f6eefc;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.1s ease-in-out;
        .text {
          font-size: 16px;
          color: #a456dd;
        }
      }
      .cancel:active {
        width: 149px;
        height: 46.8px;
      }
    }
    .confirm_button {
      width: 159px;
      height: 50px;
      //   margin-top: 18px;
      margin-left: 8.5px;
      display: flex;
      justify-content: center;
      align-items: center;
      .comfirm {
        width: 159px;
        height: 50px;
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
      .comfirm:active {
        width: 149px;
        height: 46.8px;
      }
    }
  }
}
</style>
