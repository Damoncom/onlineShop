<template>
  <div class="bottom_box">
    <div class="home">
      <i class="iconfont icon-home"></i>
      <div class="title">Home</div>
    </div>
    <div class="search">
      <i class="iconfont icon-sousuo"></i>
      <div class="title">Search</div>
    </div>
    <div class="cart">
      <i class="iconfont icon-yuan">
        <i class="iconfont icon-gouwudai"></i>
      </i>
      <div class="title">Cart</div>
    </div>
    <div class="order">
      <i class="iconfont icon-dingdan"></i>
      <div class="title">Order</div>
    </div>
    <div class="profile">
      <i class="iconfont icon-geren1" :class="profile.init == true ? 'purple' : 'icon-geren1'"></i>
      <div class="title" :class="profile.init == true ? 'purple' : 'icon-geren1'">Profile</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const profile = defineProps(['init'])
</script>
<style lang="scss" scoped>
.bottom_box {
  position: fixed;
  bottom: 0;
  width: 375px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 999;
  .home {
    height: 40px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon-home {
      font-size: 24px;
      color: #979c9e;
    }
    .title {
      font-size: 10px;
      color: #979c9e;
      margin-top: 2px;
    }
  }
  .search {
    height: 40px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon-sousuo {
      font-size: 24px;
      color: #979c9e;
    }
    .title {
      font-size: 10px;
      color: #979c9e;
      margin-top: 2px;
    }
  }
  .cart {
    height: 40px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    .icon-yuan {
      font-size: 46px;
      color: #a456dd;
      top: -22px;
      position: absolute;
      .icon-gouwudai {
        font-size: 24px;
        color: #ffffff;
        position: absolute;
        left: 24%;
        top: 23%;
      }
    }
    .title {
      font-size: 10px;
      color: #979c9e;
      margin-top: 25px;
      //   margin-top: 2px;
    }
  }
  .order {
    height: 40px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon-dingdan {
      font-size: 24px;
      color: #979c9e;
      margin-top: -1px;
    }
    .title {
      font-size: 10px;
      color: #979c9e;
      margin-top: 3px;
    }
  }
  .profile {
    height: 40px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon-geren1 {
      font-size: 24px;
      color: #979c9e;
      margin-top: -4px;
    }
    .title {
      font-size: 10px;
      color: #979c9e;
      margin-top: 6px;
    }
    .purple {
      color: #a456dd;
    }
  }
}
</style>
