<template>
  <div class="app">
    <div class="content">
      <!-- 导航栏 -->
      <div class="nav">
        <div class="search">
          <div class="search_box">
            <i class="iconfont icon-sousuo" @click="search"></i>
            <input
              type="search"
              name="q"
              class="search_input"
              placeholder="Search..."
              v-model="inputText"
              @keyup.enter="search"
            />
          </div>
          <div class="scan" @click="cancel">
            <p class="scan_text">Cancel</p>
          </div>
        </div>
      </div>
      <!-- 搜索历史 -->
      <div class="search_history" v-if="isWay == false">
        <div class="history_use">
          <div class="use_text">Search History</div>
          <i class="iconfont icon-shanchu" @click="deleteHistory"></i>
        </div>
        <ul class="history_list">
          <li
            class="history_item"
            v-for="(history, history_index) of historyList"
            :key="history_index"
            @click="reSearch(history, $event)"
          >
            <p class="item_text">{{ history.name }}</p>
          </li>
        </ul>
      </div>
      <!-- 信息栏 -->
      <div class="info_block" v-if="isWay == true">
        <div class="result">
          <p class="result_num">{{ count_product }}</p>
          <p class="result_text">Results</p>
        </div>
        <div class="toggle">
          <i
            class="iconfont icon-mulu1"
            @click="twoShow"
            :class="isShow == true ? 'icon-mulu1_purple' : 'icon-mulu1'"
          ></i>
          <i
            class="iconfont icon-mulu2"
            @click="oneShow"
            :class="isShow == false ? 'icon-mulu2_purple' : 'icon-mulu2'"
          ></i>
        </div>
      </div>
      <!-- type1商品列表 -->
      <van-pull-refresh
        v-model="loading"
        @refresh="onRefresh"
        class="product_card"
        v-if="isShow == true && isWay == true"
      >
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
      <!-- type2商品列表 -->
      <van-pull-refresh
        v-model="loading"
        @refresh="onRefresh"
        class="product_card2"
        v-if="isShow == false && isWay == true"
      >
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
  <TabBar :init_search="isSearchPage" />
</template>

<script setup>
import { reactive, ref, onUnmounted, onBeforeMount, nextTick, toRaw } from 'vue'
import TabBar from '@/components/tabBar'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useGoodsStore } from '@/stores/goods'
import { Toast_Info } from '@/utils/extract'
import { debounce } from 'lodash'

// 接口
const goodsStore = useGoodsStore()
const cartStore = useCartStore()

const router = useRouter()
const route = useRoute()

// 商品列表数据
const count_product = ref()

// 确认是Home页面
const isSearchPage = true

const isWay = ref(false)

// 搜索数据
const historyList = reactive([])

// 页面取消挂载时存储搜索历史
onUnmounted(async () => {
  await nextTick()

  localStorage.setItem('searchHistory', JSON.stringify(historyList))
})

// 页面载入前获取搜索历史
onBeforeMount(async () => {
  await nextTick()

  const search_history = JSON.parse(localStorage.getItem('searchHistory'))
  Object.assign(historyList, search_history)
})

//搜索功能
// 搜索功能(回车后添加li)
const inputText = ref('')
const count = ref(historyList.length)
const search = async (event) => {
  await nextTick()

  isWay.value = true
  if (inputText.value != '') {
    count.value++

    historyList.push({
      id: count.value,
      name: inputText.value
    })
  }
  // 模糊搜索
  // get商品列表
  const data = {
    size: 10,
    page: 1,
    barCode: '',
    name: inputText.value
  }
  // get商品列表信息
  await goodsStore.getGoodsList(data)

  if (goodsStore.resp_getGoodsList.errCode == 1000) {
    count_product.value = goodsStore.goodsList.length
    isWay.value = true
  } else {
    isWay.value = false
  }

  count_product.value = goodsStore.goodsList.length

  event.target.blur()
}

// 取消功能
const cancel = () => {
  inputText.value = ''
  isWay.value = false
  goodsStore.goodsList.length = 0
}

// 历史记录重新搜索
const reSearch = async (history, event) => {
  inputText.value = history.name

  const data = {
    size: 10,
    page: 1,
    barCode: '',
    name: history.name
  }
  // get商品列表信息
  await goodsStore.getGoodsList(data)

  if (goodsStore.resp_getGoodsList.errCode == 1000) {
    count_product.value = goodsStore.goodsList.length
    isWay.value = true
  } else {
    isWay.value = false
  }

  count_product.value = goodsStore.goodsList.length
  event.target.blur()
}

// 清空搜索历史
const deleteHistory = async () => {
  await nextTick()

  historyList.length = 0

  // get商品列表
  const data = {
    size: 10,
    page: 1,
    barCode: '',
    name: ''
  }
  // get商品列表信息
  await goodsStore.getGoodsList(data)

  if (goodsStore.resp_getGoodsList.errCode == 1000) {
    count_product.value = goodsStore.goodsList.length
  } else {
  }
}

// 商品显示方式选择
const isShow = ref(true)
const twoShow = () => {
  isShow.value = true
}
const oneShow = () => {
  isShow.value = false
}

// 将商品添加至cart
const isAdd = ref(false)

const chooseProduct = (product) => {
  const productId = ref(product.id)
  //   跳转到productDetail页面
  router.push({
    path: '/product_details',
    query: {
      productId: productId.value
    }
  })
}

const actived_cardIndex = ref('')
const addToCart = async (product, event) => {
  await nextTick()

  actived_cardIndex.value = event.currentTarget.parentElement.parentElement.dataset.index
  isAdd.value = !isAdd.value

  // post修改购物车
  const addToCartPost = reactive({
    goodsId: toRaw(product.id),
    amount: 1
  })
  await cartStore.editCart(addToCartPost)
  if (cartStore.resp_editCart.errCode == 1000) {
    isAdd.value = true
  } else {
    isAdd.value = false
  }
}

const loading = ref(false)
const onRefresh = async () => {
  setTimeout(async () => {
    Toast_Info('刷新成功')
    loading.value = false
  }, 1000)

  goodsStore.goodsList.length = 10

  // 重新请求
  const data3 = {
    size: 10,
    page: 1,
    barCode: '',
    name: ''
  }
  // get第一页商品列表信息
  await goodsStore.getGoodsList(data3)
  count_product.value = goodsStore.goodsList.length
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
      count_product.value = goodsStore.goodsList.length
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
    position: relative;
    .nav {
      width: 375px;
      height: 52px;
      .search {
        width: 375px;
        height: 52px;
        padding-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        position: fixed;
        top: 0;
        z-index: 2;
        .search_box {
          width: 258px;
          height: 36px;
          margin-left: -5px;
          // border: 1px solid #d9d9d9;
          border-radius: 8px;
          background-color: #f2f4f5;
          display: flex;
          align-items: center;
          .icon-sousuo {
            font-size: 18px;
            color: #090a0a;
            margin-left: 10px;
          }
          .search_input {
            width: 200px;
            font-size: 16px;
            line-height: 16px;
            margin-left: 10px;
          }
          .search_input::-webkit-input-placeholder {
            font-size: 14px;
            line-height: 18px;
            color: #bdbdbd;
          }
          .search_input:focus ~ .icon-sousuo {
            color: #a456dd;
          }
          .search_input::-webkit-search-cancel-button {
            -webkit-appearance: none; /*此处只是去掉默认的小×*/
          }
        }

        .scan {
          width: 44px;
          height: 44px;
          margin: 0 -5px 0 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          .scan_text {
            font-size: 16px;
            line-height: 16px;
            color: #090a0a;
          }
          .scan_text:active {
            color: #a456dd;
          }
        }
      }
    }

    .search_history {
      width: 375px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 18px 0 0 0;
      .history_use {
        width: 327px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        .use_text {
          font-size: 14px;
          color: #a2a2a3;
          margin-right: auto;
        }
        .icon-shanchu {
          font-size: 15px;
          color: #a2a2a3;
        }
        .icon-shanchu:active {
          color: #a456dd;
        }
      }
      // ul
      .history_list {
        width: 327px;
        display: flex;
        flex-wrap: wrap;
        display: flex;
        align-items: center;

        // li
        .history_item {
          margin-right: 10px;
          padding: 0 10px;
          height: 29px;
          margin-bottom: 12px;
          border-radius: 100px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          .item_text {
            font-size: 12px;
            color: #001c33;
            letter-spacing: 0.2px;
          }
        }
      }
    }
    .info_block {
      width: 327px;
      height: 28px;
      margin: 10px 0 0 15px;
      display: flex;
      align-items: center;
      .result {
        height: 20px;
        display: flex;
        align-items: end;
        .result_num {
          font-size: 16px;
          color: #090a0a;
        }
        .result_text {
          font-size: 12px;
          color: #a2a2a3;
          margin-left: 10px;
        }
      }
      .toggle {
        width: 52px;
        height: 28px;
        display: flex;
        align-items: center;
        margin-left: auto;
        margin-right: 10px;
        border-radius: 4px;
        background-color: #f2f4f5;
        justify-content: center;
        .icon-mulu1 {
          font-size: 18px;
          padding-right: 4px;
          color: #a2a2a3;
        }
        .icon-mulu1_purple {
          color: #a456dd;
        }
        .icon-mulu2 {
          font-size: 20px;
          color: #a2a2a3;
        }
        .icon-mulu2_purple {
          color: #a456dd;
        }
      }
    }
    .product_card {
      width: 350px;
      height: 80vh;
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
      // display: none;
    }
    .loading_icon {
      position: absolute;
      bottom: 3vh;
    }

    .product_card2 {
      width: 335px;
      height: 80vh;
      overflow: auto;
      margin-top: 16px;
      // ul
      .product_list {
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
        // li
        .product_item {
          width: 335px;
          height: 100px;
          border-radius: 8px;
          background-color: #f9f9fb;
          margin: 0 7.5px 16px 7.5px;
          display: flex;
          position: relative;

          .img_box {
            .product_img {
              width: 100px;
              height: 100px;
              border-radius: 8px;
            }
          }
          .text_box {
            width: 136px;
            height: 63px;
            margin: 12px 0 12px 12px;
            .title {
              font-size: 16px;
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
              margin-top: 15px;
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
              right: 15px;
              bottom: 10px;
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
    .product_card2::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
