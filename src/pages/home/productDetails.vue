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
          <i class="iconfont icon-shoucang"></i>
          <i class="iconfont icon-shoucang" v-if="details.score > 2"></i>
          <i class="iconfont icon-shoucang" v-if="details.score > 4"></i>
          <i class="iconfont icon-shoucang" v-if="details.score > 6"></i>
          <i class="iconfont icon-shoucang" v-if="details.score > 8"></i>
          <p class="score_text">{{ details.score }}</p>
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
import product from '@/assets/details_img.jpg'
import axios from 'axios'
const router = useRouter()
const route = useRoute()

// 回退到上一页
const goBack = () => {
  router.go(-1)
}

// 获取传参信息
const productId = route.query
console.log('传参的数据', productId)

const details = reactive({})
const token_info = localStorage.getItem('token')

// 获取商品详情信息
onBeforeMount(async () => {
  await nextTick()

  const { data: resp_product_details } = await axios({
    method: 'get',
    url: 'http://192.168.100.7:7001/onlineShop/getGoodsDetail',
    params: {
      id: productId.productId
    },
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  if (resp_product_details.errCode == 1000) {
    Object.assign(details, resp_product_details.data)
  } else {
  }

  console.log('获取商品详情数据:', resp_product_details)
})

const postData = reactive({
  id: productId.productId
})

// 收藏
const comfirmShouCang = async () => {
  await nextTick()

  details.inWishlist = true

  // post请求
  const { data: resp_notification } = await axios({
    method: 'post',
    url: 'http://192.168.100.7:7001/onlineShop/createWishlist',
    data: postData,
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  if (resp_notification.errCode == 1000) {
    details.inWishlist = true
  } else {
    details.inWishlist = false
  }
  console.log('post请求收藏：', resp_notification)
}

// 取消收藏
const cancelShouCang = async () => {
  await nextTick()

  details.inWishlist = false

  // delete请求
  const { data: resp_cancelNotidication } = await axios({
    method: 'delete',
    url: 'http://192.168.100.7:7001/onlineShop/deleteWishlist',
    data: postData,
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  if (resp_cancelNotidication.errCode == 1000) {
    details.inWishlist = false
  } else {
    details.inWishlist = true
  }
  console.log('delete请求取消收藏：', resp_cancelNotidication)
}

// 是否加入购物车右上角图标
const isAdd = ref(false)
const add = async () => {
  await nextTick()

  isAdd.value = true

  // post请求
  const { data: resp_addToCart } = await axios({
    method: 'post',
    url: 'http://192.168.100.7:7001/onlineShop/editCart',
    data: {
      goodsId: productId.productId,
      amount: 1
    },
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  if (resp_addToCart.errCode == 1000) {
    isAdd.value = true
  } else {
    isAdd.value = false
  }
  console.log('post加入购物车：', resp_addToCart)
}

// 跳转cart页面
const addToCart = () => {
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
        .icon-shoucang {
          margin-right: 5px;
          color: #ffa412;
        }
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
