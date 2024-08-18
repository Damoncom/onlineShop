<template>
  <div class="app">
    <div class="bar">
      <div class="left">
        <i class="iconfont icon-jiantou" @click="goBack"></i>
      </div>
      <div class="right" @click="add">
        <i
          class="iconfont icon-gouwudai"
          :class="isAdd == true ? 'icon-gouwudai_purple' : 'icon-gouwudai'"
        ></i>
      </div>
    </div>
    <div class="content">
      <div class="img_box">
        <img :src="details.image" class="img" />
      </div>
      <div class="info">
        <div class="info_title">
          {{ details.name }}
        </div>
        <div class="info_brand">
          {{ details.origin }}
        </div>
        <div class="score">
          <star-rating
            :rating="details.score"
            :increment="0.1"
            :read-only="true"
            :star-size="20"
            class="starScore"
          ></star-rating>
        </div>
        <div class="info_discription">
          {{ details.introduction }}
        </div>
      </div>
    </div>
    <div class="buttom">
      <div class="like">
        <i
          class="iconfont icon-aixin"
          @click="comfirmShouCang"
          v-if="details.inWishlist == false"
        ></i>
        <i
          class="iconfont icon-aixin1"
          @click="cancelShouCang"
          v-if="details.inWishlist == true"
        ></i>
      </div>
      <div class="add_button" @click="addToCart">
        <p class="text">Add To Cart</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import StarRating from 'vue-star-rating'
import { getGoodsDetail, createWishlist, deleteWishlist, editCart } from '@/utils/api'

const router = useRouter()
const route = useRoute()

// 回退到上一页
const goBack = () => {
  router.go(-1)
}

const rating = ref('')
// 获取传参信息
const productId = route.query
console.log('传参的数据', productId)

const details = reactive({})
const token_info = localStorage.getItem('token')

onBeforeMount(async () => {
  await nextTick()

  // get商品详情信息
  const resp_getGoodsDetails = await getGoodsDetail(productId.productId)
  console.log('get商品详情信息', resp_getGoodsDetails)

  if (resp_getGoodsDetails.errCode == 1000) {
    Object.assign(details, resp_getGoodsDetails.data)
  } else {
  }
})

const postData = reactive({
  id: productId.productId
})

// 收藏
const comfirmShouCang = async () => {
  await nextTick()

  details.inWishlist = true

  // post收藏
  const resp_shoucang = await createWishlist(postData)
  console.log('post收藏', resp_shoucang)

  if (resp_shoucang.errCode == 1000) {
    details.inWishlist = true
  } else {
    details.inWishlist = false
  }
}

// 取消收藏
const cancelShouCang = async () => {
  await nextTick()

  details.inWishlist = false

  // delete取消收藏
  const resp_cancelShoucang = await deleteWishlist(postData)
  console.log('delete取消收藏', resp_cancelShoucang)

  if (resp_cancelShoucang.errCode == 1000) {
    details.inWishlist = false
  } else {
    details.inWishlist = true
  }
}

// 是否加入购物车右上角图标
const isAdd = ref(false)
const add = async () => {
  await nextTick()

  isAdd.value = true

  // post修改购物车
  const addToCartPost = reactive({
    goodsId: productId.productId,
    amount: 1
  })
  const resp_addToCart = await editCart(addToCartPost)
  if (resp_addToCart.errCode == 1000) {
    isAdd.value = true
  } else {
    isAdd.value = false
  }
  console.log('post加入购物车：', resp_addToCart)
}

// 跳转cart页面
const addToCart = async () => {
  await nextTick()

  // post修改购物车
  const addToCartPost = reactive({
    goodsId: productId.productId,
    amount: 1
  })
  const resp_addToCart = await editCart(addToCartPost)
  if (resp_addToCart.errCode == 1000) {
    isAdd.value = true
  } else {
    isAdd.value = false
  }
  console.log('post加入购物车：', resp_addToCart)

  router.push({
    path: '/cart'
  })
}
</script>

<style lang="scss" scoped>
.app {
  .bar {
    width: 375px;
    height: 48px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    .left {
      width: 32px;
      height: 32px;
      border-radius: 50px;
      margin-left: 20px;
      background-color: #a3a3a3;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-jiantou {
        font-size: 13px;
        color: white;
        text-align: center;
      }
    }
    .right {
      width: 32px;
      height: 32px;
      border-radius: 50px;
      background-color: #a3a3a3;
      margin-left: auto;
      margin-right: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-gouwudai {
        font-size: 18px;
        font-weight: 600px;
        color: white;
        text-align: center;
      }
      .icon-gouwudai_purple {
        color: #a456dd;
      }
    }
  }
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    .img_box {
      .img {
        width: 375px;
        height: 369px;
      }
    }
    .info {
      width: 327px;
      height: 312px;
      margin-top: 152px;
      .info_title {
        font-size: 24px;
        letter-spacing: 0.5px;
        color: #333333;
        line-height: auto;
      }
      .info_brand {
        font-size: 16px;
        letter-spacing: 0.5px;
        color: #a3a3a3;
        line-height: 30px;
      }
      .score {
        display: flex;
        align-items: center;
        margin-top: 6px;

        .score_text {
          color: #ffa412;
          margin-left: 5px;
        }
      }
      .info_discription {
        font-size: 12px;
        letter-spacing: 0.5px;
        line-height: 20px;
        color: #666666;
        margin-top: 15px;
      }
    }
  }
  .buttom {
    width: 375px;
    height: 78px;
    position: fixed;
    bottom: 0;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    .like {
      width: 46px;
      height: 46px;
      border: 1px solid #a456dd;
      border-radius: 6px;
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-aixin {
        font-size: 25px;
        color: #a456dd;
      }
      .icon-aixin1 {
        font-size: 25px;
        color: #a456dd;
      }
    }
    .add_button {
      width: 277px;
      height: 46px;
      border-radius: 6px;
      background-color: #a456dd;
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        font-size: 16px;
        color: white;
      }
    }
  }
}
</style>
