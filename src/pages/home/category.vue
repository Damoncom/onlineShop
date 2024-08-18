<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <i class="iconfont icon-jiazaizhong2 icon_top" v-if="top == true"></i>
      <div class="product_card" ref="card" @scroll="doScroll">
        <ul class="product_list">
          <li
            class="product_item"
            v-for="(product, product_index) of productList"
            :key="product_index"
            :data-index="product_index"
            :data-name="product.name"
            :data-brand="product.brand"
            :data-price="product.price"
            @click="chooseProduct(product)"
          >
            <div class="img_box">
              <img :src="product.image" class="product_img" />
            </div>
            <div class="text_box">
              <div class="title">{{ product.name }}</div>
              <div class="brand">{{ product.brand }}</div>
              <div class="price">$ {{ Number(product.price).toFixed(2) }}</div>
              <div class="card_cart" @click.stop="addToCart(product, $event)">
                <i
                  class="iconfont icon-gouwudai"
                  :class="
                    isAdd == true && actived_cardIndex == product_index
                      ? 'icon-gouwudai_purple'
                      : 'icon-gouwudai'
                  "
                ></i>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <i class="iconfont icon-jiazaizhong2 icon_bottom" v-if="bottom == true"></i>
      <p class="bottom_text" v-if="bottom == true">All products are here ~</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onBeforeMount, nextTick, toRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'
import { getGoodsList, editCart } from '@/utils/api'

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Category'

// 商品列表数据
const productList = reactive([])

//  跳转到productDetail页面
const chooseProduct = (product) => {
  router.push({
    path: '/product_details',
    query: {
      productId: toRaw(product).id
    }
  })
}

// 将商品添加至cart
const isAdd = ref(false)
const actived_cardIndex = ref('')
const addToCart = async (product, event) => {
  await nextTick()

  actived_cardIndex.value = event.currentTarget.parentElement.parentElement.dataset.index
  isAdd.value = true

  // post修改购物车
  const addToCartPost = reactive({
    goodsId: product.id,
    amount: '1'
  })
  const resp_addToCart = await editCart(addToCartPost)
  if (resp_addToCart.errCode == 1000) {
    isAdd.value = true
  } else {
    isAdd.value = false
  }
  console.log('post加入购物车：', resp_addToCart)
}

// 获取商品列表信息
onBeforeMount(async () => {
  await nextTick()

  const data = {
    size: 10,
    page: 1,
    barCode: '',
    name: ''
  }
  // get商品列表信息
  const resp_getGoodsList = await getGoodsList(data)
  console.log('get商品列表信息', resp_getGoodsList)

  if (resp_getGoodsList.errCode == 1000) {
    Object.assign(productList, resp_getGoodsList.data.list)
  } else {
  }
})

// 下拉加载，上拉刷新
const card = ref()
const top = ref(false)
const bottom = ref(false)

const doScroll = async (event) => {
  const scrollHeight = event.target.scrollHeight
  const scrollTop = event.target.scrollTop
  const clientHeight = event.target.clientHeight

  // 触底
  if (scrollTop + clientHeight >= scrollHeight) {
    bottom.value = true
    const data2 = {
      size: 20,
      page: 1,
      barCode: '',
      name: ''
    }
    // get更多商品列表信息
    const resp_getGoodsList = await getGoodsList(data2)
    console.log('get商品列表信息', resp_getGoodsList)
    if (resp_getGoodsList.errCode == 1000) {
      Object.assign(productList, resp_getGoodsList.data.list)
    } else {
    }

    // 控制加载动画出现
    setTimeout(async () => {
      bottom.value = false
    }, 1000)
  } else {
    bottom.value = false
  }

  // 到顶
  if (scrollTop <= 0) {
    top.value = true
    setTimeout(async () => {
      top.value = false
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.app {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .product_card {
      width: 350px;
      height: 90vh;
      overflow: auto;
      margin-top: 16px;
      // ul
      .product_list {
        display: flex;
        flex-wrap: wrap;
        // li
        .product_item {
          width: 160px;
          height: 198px;
          border-radius: 8px;
          background-color: #f9f9fb;
          padding-bottom: 8px;
          margin: 0 7.5px 16px 7.5px;
          .img_box {
            .product_img {
              width: 160px;
              height: 112px;
              border-radius: 8px;
            }
          }
          .text_box {
            width: 136px;
            height: 63px;
            margin: 12px 0 12px 12px;
            position: relative;
            .title {
              font-size: 15px;
              color: #001c33;
            }
            .brand {
              font-size: 12px;
              line-height: 28px;
              color: #a2a2a3;
            }
            .price {
              font-size: 17px;
              color: #001c33;
              margin-top: 5px;
            }
            .card_cart {
              width: 32px;
              height: 32px;
              border-radius: 50px;
              background-color: #f2f4f5;
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              right: -2px;
              bottom: -8px;
              .icon-gouwudai {
                font-size: 17px;
                margin-top: -2px;
              }
              .icon-gouwudai_purple {
                color: #a456dd;
              }
            }
          }
        }
      }
    }
    .icon_top {
      display: inline-block;
      font-size: 26px;
      color: #a456dd;
      position: absolute;
      top: 70px;
      z-index: 3;
      animation: rotating2 1s infinite linear;
    }
    @keyframes rotating2 {
      0% {
        transform: rotate(0deg); /*动画起始位置为旋转0度*/
      }

      to {
        transform: rotate(1turn); /*动画结束位置为旋转1圈*/
      }
    }
    .icon_bottom {
      display: inline-block; /*需要设置为行内块元素动画才会生效*/
      font-size: 26px;
      color: #a456dd;
      position: absolute;
      bottom: 0;
      z-index: 3;
      animation: rotating 1s infinite linear;
    }
    @keyframes rotating {
      0% {
        transform: rotate(0deg); /*动画起始位置为旋转0度*/
      }

      to {
        transform: rotate(1turn); /*动画结束位置为旋转1圈*/
      }
    }
    .bottom_text {
      color: #a456dd;
      padding: 0 0 10px 0;
    }
  }
}
</style>
