<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <ul class="whishlist_list">
        <li class="whishlist_item" v-for="(wish, wishlist_index) of wishlist" :key="wishlist_index">
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
import { reactive, ref, onBeforeMount, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'
import { deleteWishlist, getWishlist } from '@/utils/api'

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Wishlist'

// 定义收藏列表变量
const wishlist = reactive([])

// get收藏列表
onBeforeMount(async () => {
  await nextTick()

  const resp_getWishList = await getWishlist()
  console.log('get收藏列表', resp_getWishList)

  if (resp_getWishList.errCode == 1000) {
    Object.assign(wishlist, resp_getWishList.data.list)
  } else {
  }
})

// TODO:取消收藏功能失效
// delete取消收藏
const cancelLike = async (wish) => {
  await nextTick()

  const postData = reactive({
    id: wish.goodsId
  })
  const resp_cancelShoucang = await deleteWishlist(postData)
  console.log('delete取消收藏', resp_cancelShoucang)

  if (resp_cancelShoucang.errCode == 1000) {
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
