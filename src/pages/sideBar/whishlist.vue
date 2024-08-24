<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <ul class="whishlist_list">
        <li
          class="whishlist_item"
          v-for="(wish, wishlist_index) of wishStore.wishList"
          :key="wishlist_index"
        >
          <img :src="wish.goods.image" class="img" />
          <div class="text_box">
            <div class="name">{{ wish.goods.name }}</div>
            <div class="brand">{{ wish.goods.origin }}</div>
            <div class="price">$ {{ Number(wish.goods.price).toFixed(2) }}</div>
          </div>
          <div class="like_box" @click="cancelLike(wish)">
            <i class="iconfont icon-aixin1"></i>
          </div>
        </li>
      </ul>
      <div class="askBuy" v-if="askBuy == true">
        <i class="iconfont icon-404"></i>
        <p class="askBuy_text">
          You haven't collected any products yet！
          <br />
          Go take a look ~
        </p>
      </div>
    </div>
    <div class="bottom">
      <div class="button_box" @click="linkToHome">
        <div class="create_button">
          <p class="text">Explore More!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'
import { useWishStore } from '@/stores/wishlist'

// 接口
const wishStore = useWishStore()

console.log(wishStore.resp_getWishlist)

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Wishlist'

const askBuy = ref(false)

// get收藏列表
onBeforeMount(async () => {
  await wishStore.getWishlist()

  if (wishStore.wishList.length == 0) {
    askBuy.value = true
  } else {
    askBuy.value = false
  }
})

// delete取消收藏
const cancelLike = async (wish) => {
  const postData = reactive({
    id: wish.goodsId
  })
  await wishStore.deleteWishlist(postData)

  if (wishStore.resp_deleteWishlist.errCode == 1000) {
    router.go(0)
  } else {
  }
}

// 跳转到home页面
const linkToHome = () => {
  router.push({
    path: '/home'
  })
}
</script>

<style lang="scss" scoped>
.app {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // ul
    .whishlist_list {
      width: 327px;
      height: auto;
      margin-top: 24px;
      // li
      .whishlist_item {
        width: 327px;
        height: 88px;
        margin-bottom: 12px;
        border-radius: 10px;
        border: 1px solid #ececec;
        box-shadow: rgba(149, 157, 165, 0.109) 0px 0px 24px;
        display: flex;
        align-items: center;
        position: relative;
        .img {
          width: 64px;
          height: 64px;
          border-radius: 10px;
          margin-left: 12px;
        }
        .text_box {
          margin-left: 12px;
          .name {
            font-size: 15px;
            color: #001c33;
          }
          .brand {
            font-size: 12px;
            color: #a3a3a3;
            line-height: 20px;
          }
          .price {
            font-size: 18px;
            margin-top: 8px;
          }
        }
        .like_box {
          width: 24px;
          height: 24px;
          border-radius: 5px;
          background-color: #fff5f9;
          position: absolute;
          right: 10px;
          bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-aixin1 {
            color: #a456dd;
          }
        }
      }
    }
    .askBuy {
      margin-top: 50%;
      width: 327px;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon-404 {
        font-size: 50px;
        color: #a456dd;
        line-height: 70px;
      }
      .askBuy_text {
        font-size: 20px;
        color: #a456dd;
        line-height: 30px;
        text-align: center;
      }
    }
  }
  .bottom {
    width: 375px;
    height: 70px;
    background-color: white;
    position: fixed;
    bottom: 20px;
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
