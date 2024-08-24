<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <van-pull-refresh v-model="loading" @refresh="onRefresh" class="product_card">
        <van-list
          v-model="downLoading"
          :finished="downFinished"
          :immediate-check="false"
          finished-text="All products are here ~"
          @load="onLoad"
          :offset="20"
          class="product_list"
        >
          <li
            class="product_item"
            v-for="(product, product_index) of goodsStore.goodsList"
            :key="product_index"
            :data-index="product_index"
            :data-name="product.name"
            :data-brand="product.brand"
            :data-price="product.price"
            @click="chooseProduct(product)"
          >
            <!-- TODO:图片显示问题 -->
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
        </van-list>
      </van-pull-refresh>
      <van-loading
        type="spinner"
        color="#a456dd"
        size="24px"
        v-if="downLoading == true"
        class="loading_icon"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onBeforeMount, nextTick, toRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'
import { editCart } from '@/utils/api'
import { useGoodsStore } from '@/stores/goods'
import { Toast_Info } from '@/utils/extract'
import { debounce } from 'lodash'

// 接口
const goodsStore = useGoodsStore()

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Category'

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

// get商品列表信息
onBeforeMount(async () => {
  const data = {
    size: 10,
    page: 1,
    barCode: '',
    name: ''
  }
  // get商品列表信息
  await goodsStore.getGoodsList(data)
})

// 下拉刷新
const loading = ref(false)
const onRefresh = async () => {
  setTimeout(async () => {
    Toast_Info('刷新成功')
    loading.value = false
  }, 1000)
  const data3 = {
    size: 10,
    page: 1,
    barCode: '',
    name: ''
  }
  // get更多商品列表信息
  await goodsStore.getGoodsList(data3)
}

// 上拉加载
const downLoading = ref(false)
const downFinished = ref(false)
const count1 = ref(1)
const onLoad = debounce(async () => {
  downLoading.value = true

  setTimeout(async () => {
    downLoading.value = false

    count1.value++
    const data2 = {
      size: 10,
      page: count1.value,
      barCode: '',
      name: ''
    }
    // get更多商品列表信息
    await goodsStore.getGoodsList(data2)

    // 判断没有新数据了
    if (goodsStore.goodsList.length == goodsStore.resp_getGoodsList.data.total) {
      downFinished.value = true
    }

    if (goodsStore.resp_getGoodsList.errCode == 1000) {
      goodsStore.resp_getGoodsList.data.list.forEach((item) => {
        goodsStore.goodsList.push(item)
      })
    } else {
    }
  }, 300)
}, 1000)
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
      height: 89vh;
      overflow: auto;
      margin-top: 16px;
      // ul
      .product_list {
        list-style-type: none;
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
    .product_card::-webkit-scrollbar {
      display: none;
    }
    .loading_icon {
      position: absolute;
      bottom: 3vh;
    }
  }
}
</style>
