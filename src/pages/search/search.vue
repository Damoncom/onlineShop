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
      <!-- TODO:模糊搜索 -->
      <!-- 搜索历史 -->
      <!-- <div class="search_history">
        <ul class="history_list">
          <li
            class="history_item"
            v-for="(history, history_index) of historyList"
            :key="history_index"
          >
            <p class="item_text">{{ history.name }}</p>
          </li>
        </ul>
      </div> -->
      <!-- 信息栏 -->
      <div class="info_block">
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
      <i class="iconfont icon-jiazaizhong2 icon_top" v-if="top && isShow == true"></i>
      <div class="product_card" v-if="isShow == true" ref="card" @scroll="doScroll">
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
              <div class="price">{{ product.price }}</div>
              <div class="card_cart" @click.stop="addToCart">
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
      <i class="iconfont icon-jiazaizhong2 icon_bottom" v-if="bottom && isShow == true"></i>
      <!-- type2商品列表 -->
      <i class="iconfont icon-jiazaizhong2 icon_top" v-if="top && isShow == false"></i>
      <div class="product_card2" v-if="isShow == false" ref="card" @scroll="doScroll">
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
              <div class="price">{{ product.price }}</div>
              <div class="card_cart" @click.stop="addToCart">
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
      <i class="iconfont icon-jiazaizhong2 icon_bottom" v-if="bottom && isShow == false"></i>
    </div>
  </div>
  <TabBar :init_search="isSearchPage" />
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted, onBeforeMount, nextTick } from 'vue'
import TabBar from '@/components/tabBar'
import product from '@/assets/prodoct_img.jpg'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 确认是Home页面
const isSearchPage = true

// 搜索数据
const historyList = reactive([
  {
    id: '1',
    name: 'Cream'
  },
  {
    id: '2',
    name: 'Spray'
  }
])

//搜索功能
// 搜索功能(回车后添加li)
const inputText = ref('')
const count = ref(historyList.length)
const search = () => {
  historyList.push({
    id: count.value + 1,
    name: inputText.value
  })
}

// 取消功能
const cancel = () => {
  inputText.value = ''
}

// 商品显示方式选择
const isShow = ref(true)
const twoShow = () => {
  isShow.value = true
}
const oneShow = () => {
  isShow.value = false
}

// 商品列表数据
const productList = reactive([
  {
    id: '1',
    name: 'Givenchy Blossom',
    brand: 'Givenchy',
    price: '$29.00',
    img: product,
    isAdd: false
  },
  {
    id: '2',
    name: 'Givenchy Blossom',
    brand: 'Givenchy',
    price: '$29.00',
    img: product,
    isAdd: false
  },
  {
    id: '3',
    name: 'Givenchy Blossom',
    brand: 'Givenchy',
    price: '$29.00',
    img: product,
    isAdd: false
  },
  {
    id: '4',
    name: 'Givenchy Blossom',
    brand: 'Givenchy',
    price: '$29.00',
    img: product,
    isAdd: false
  },
  {
    id: '5',
    name: 'Givenchy Blossom',
    brand: 'Givenchy',
    price: '$29.00',
    img: product,
    isAdd: false
  },
  {
    id: '6',
    name: 'Givenchy Blossom',
    brand: 'Givenchy',
    price: '$29.00',
    img: product,
    isAdd: false
  }
  // {
  //   id: '7',
  //   name: 'Givenchy Blossom',
  //   brand: 'Givenchy',
  //   price: '$29.00',
  //   img: product,
  //   isAdd: false
  // },
  // {
  //   id: '8',
  //   name: 'Givenchy Blossom',
  //   brand: 'Givenchy',
  //   price: '$29.00',
  //   img: product,
  //   isAdd: false
  // },
  // {
  //   id: '9',
  //   name: 'Givenchy Blossom',
  //   brand: 'Givenchy',
  //   price: '$29.00',
  //   img: product,
  //   isAdd: false
  // },
  // {
  //   id: '10',
  //   name: 'Givenchy Blossom',
  //   brand: 'Givenchy',
  //   price: '$29.00',
  //   img: product,
  //   isAdd: false
  // },
  // {
  //   id: '11',
  //   name: 'Givenchy Blossom',
  //   brand: 'Givenchy',
  //   price: '$29.00',
  //   img: product,
  //   isAdd: false
  // }
])

const token_info = localStorage.getItem('token')

onBeforeMount(async () => {
  await nextTick()

  // 获取商品列表数据
  const { data: resp_product } = await axios({
    method: 'get',
    url: 'http://192.168.100.7:7001/onlineShop/getGoodsList',
    params: {
      size: 6,
      page: 1,
      barCode: '',
      name: ''
    },
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  if (resp_product.errCode == 1000) {
    Object.assign(productList, resp_product.data.list)
  } else {
  }
  console.log('获取商品列表数据:', resp_product)
  // console.log(productList)
})

const count_product = ref(productList.length)

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
const addToCart = (e) => {
  actived_cardIndex.value = e.currentTarget.parentElement.parentElement.dataset.index
  isAdd.value = !isAdd.value
}

// 下拉加载，上拉刷新
// TODO:框的高度不够，每个手机分辨率不一样
const card = ref()
const top = ref(false)
const bottom = ref(false)

const doScroll = async (event) => {
  const scrollHeight = event.target.scrollHeight
  const scrollTop = event.target.scrollTop
  const clientHeight = event.target.clientHeight
  if (scrollTop + clientHeight >= scrollHeight) {
    console.log('到底了!')
    bottom.value = true

    const token_info = localStorage.getItem('token')
    const { data: resp_product } = await axios({
      method: 'get',
      url: 'http://192.168.100.7:7001/onlineShop/getGoodsList',
      params: {
        size: 20,
        page: 1,
        barCode: '',
        name: ''
      },
      headers: {
        Authorization: `Bearer ${token_info}`,
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    //TODO:下拉加载的数据
    if (resp_product.errCode == 1000) {
      Object.assign(productList, resp_product.data.list)
      // productList.push(resp_product.data.list)
      count_product.value = productList.length
    }
    console.log('下拉加载更多获取商品列表数据:', resp_product)
    console.log(productList)

    setTimeout(async () => {
      bottom.value = false
    }, 1000)
  } else {
    bottom.value = false
  }

  if (scrollTop <= 0) {
    console.log('顶部!')
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
        }

        .scan {
          width: 44px;
          height: 44px;
          // border: 1px solid #d9d9d9;
          // border-radius: 10px;
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
      margin: 23px 0 0 28px;
      align-self: flex-start;
      // ul
      .history_list {
        width: auto;
        // li
        .history_item {
          width: auto;
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
      height: 500px;
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
    .product_card::-webkit-scrollbar {
      display: none;
    }
    .icon_bottom {
      display: inline-block; /*需要设置为行内块元素动画才会生效*/
      font-size: 26px;
      color: #a456dd;
      position: absolute;
      bottom: 0px;
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

    .product_card2 {
      width: 335px;
      // height: 467px;
      height: 499px;
      overflow: auto;
      margin-top: 16px;
      // ul
      .product_list {
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
  }
}
</style>
