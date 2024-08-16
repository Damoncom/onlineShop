<template>
  <div class="bottom_box">
    <!-- home页面 -->
    <div class="home" @click="LinkToHome">
      <i class="iconfont icon-home" :class="props.init_home == true ? 'purple' : 'icon-home'"></i>
      <div class="title" :class="props.init_home == true ? 'purple' : 'title'">Home</div>
    </div>
    <!-- search页面 -->
    <div class="search" @click="LinkToSearch">
      <i
        class="iconfont icon-sousuo"
        :class="props.init_search == true ? 'purple' : 'icon-sousuo'"
      ></i>
      <div class="title" :class="props.init_search == true ? 'purple' : 'title'">Search</div>
    </div>
    <!-- cart页面 -->
    <div class="cart" @click="LinkToCart">
      <i class="iconfont icon-yuan">
        <i class="iconfont icon-gouwudai"></i>
      </i>
      <div class="title">Cart</div>
    </div>
    <!-- order页面 -->
    <div class="order" @click="LinkToOrder">
      <i
        class="iconfont icon-dingdan"
        :class="props.init_order == true ? 'purple' : 'icon-dingdan'"
      ></i>
      <div class="title" :class="props.init_order == true ? 'purple' : 'title'">Order</div>
    </div>
    <!-- profile页面 -->
    <div class="profile" @click="LinkToProfile">
      <i
        class="iconfont icon-geren1"
        :class="props.init_profile == true ? 'purple' : 'icon-geren1'"
      ></i>
      <div class="title" :class="props.init_profile == true ? 'purple' : 'title'">Profile</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps(['init_home', 'init_search', 'init_order', 'init_profile'])

// 跳转到页面
const LinkToHome = () => {
  router.push({
    path: '/home'
  })
}
const LinkToSearch = () => {
  router.push({
    path: '/search'
  })
}
const LinkToCart = () => {
  router.push({
    path: '/cart'
  })
}
const LinkToOrder = () => {
  router.push({
    path: '/order'
  })
}
const LinkToProfile = () => {
  router.push({
    path: '/profile'
  })
}
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
  z-index: 1;
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
    .purple {
      color: #a456dd;
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
    .purple {
      color: #a456dd;
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
    .purple {
      color: #a456dd;
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
    .purple {
      color: #a456dd;
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
