<template>
  <div class="app" :class="isActivedInfo == true || isLogOut == true ? 'app_regular' : 'app'">
    <!-- 顶部导航栏 -->
    <div class="nav">
      <div class="nav_box">
        <i class="iconfont icon-mulu" @click="linkToInfo">
          <div class="unread" v-if="noRead == false"></div>
        </i>
        <i class="iconfont icon-ling" @click="linkToNotification">
          <div class="unread" v-if="noRead == false"></div>
        </i>
      </div>
    </div>
    <div class="content">
      <!-- 搜索框 -->
      <div class="search" @click="linkToSearch">
        <div class="search_box">
          <i class="iconfont icon-sousuo"></i>
          <input
            type="search"
            name="q"
            class="search_input"
            placeholder="Search..."
            v-model="inputText"
          />
        </div>
        <div class="scan" @click.stop="linkToTest">
          <i class="iconfont icon-saoyisao"></i>
        </div>
      </div>
      <!-- 轮播图 -->
      <swiper-container
        ref="swiper"
        class="scroll_nav"
        :space-between="spaceBetween"
        :centered-slides="true"
        :pagenation="true"
      >
        <!-- TODO:swiper和v-for -->
        <swiper-slide class="swiper_box1" @click="linkToBanner1">
          <img class="swiper_wrapper1" :src="banner[0].image" />
          <p class="box_text">{{ banner[0].name }}</p>
        </swiper-slide>
        <swiper-slide class="swiper_box2" @click="linkToBanner2">
          <img class="swiper_wrapper2" :src="banner[1].image" />
          <p class="box_text">{{ banner[1].name }}</p>
        </swiper-slide>
        <swiper-slide class="swiper_box3" @click="linkToBanner3">
          <img class="swiper_wrapper3" :src="banner[2].image" />
          <p class="box_text">{{ banner[2].name }}</p>
        </swiper-slide>
      </swiper-container>
      <!-- 分类 -->
      <div class="categories">
        <ul class="categories_list">
          <li
            class="categories_item"
            v-for="(category, category_index) of categoriesList"
            :key="category_index"
            @click="linkToCategory"
          >
            <p class="category_name">{{ category.name }}</p>
          </li>
        </ul>
      </div>
      <!-- recommend -->
      <div class="recommended">
        <div class="recommended_title">
          <p class="title_text">RECOMMENDED</p>
        </div>
        <div class="product_card">
          <ul class="product_list">
            <li
              class="product_item"
              v-for="(product, product_index) of homeStore.dataList.recommended"
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
      </div>
      <!-- popular -->
      <div class="popular">
        <div class="popular_title">
          <p class="title_text">POPULAR</p>
        </div>
        <div class="product_card">
          <ul class="product_list">
            <li
              class="product_item"
              v-for="(product, product_index) of homeStore.dataList.popular"
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
        <div class="product_card2">
          <ul class="product_list">
            <li
              class="product_item"
              v-for="(product, product_index) of homeStore.dataList.popular"
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
      </div>
    </div>
  </div>
  <!-- 底部导航栏 -->
  <TabBar :init_home="isHomePage" />
  <!-- 蒙层 -->
  <div
    class="mask"
    v-if="isMask == true"
    @click="activedMask"
    :class="isActivedInfo == true ? 'mask_regular' : 'mask'"
  ></div>
  <!-- 侧边栏 -->
  <div class="sideBar" v-if="isActivedInfo == true">
    <div class="logo">
      <img src="@/assets/info_logo.jpg" class="img" />
    </div>
    <div class="user_info">
      <div class="user_name">{{ userStore.userData.name }}</div>
      <div class="user_phone">{{ userStore.userData.phoneNumber }}</div>
      <div class="user_score">
        <i class="iconfont icon-shoucang"></i>
        <p class="score_text">4.8 (231)</p>
      </div>
    </div>
    <div class="uses">
      <ul class="use_list">
        <li
          class="use_item"
          v-for="(use, use_index) of useList"
          :key="use_index"
          :data-name="use.name"
          :data-index="use_index"
          @click="activeUse"
        >
          <img :src="use.img" class="use_img" />
          <p class="use_name">{{ use.name }}</p>
          <div class="arrow">
            <div class="unread" v-if="use_index == 1 && noRead == false"></div>
            <i class="iconfont icon-jiantou"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="info_more">
      <img src="@/assets/info_more.jpg" class="img" />
    </div>
    <div class="info_version">Version 1.0.0</div>
  </div>

  <!-- 退出登录面板 -->
  <div class="logout" v-if="isLogOut == true">
    <div class="line_box">
      <div class="line"></div>
    </div>
    <div class="logout_title">Log out?</div>
    <div class="logout_ask">Are you sure you want to log out of your account?</div>
    <div class="bottom">
      <div class="button_box" @click="linkToSignIn">
        <div class="create_button">
          <p class="text">Submit</p>
        </div>
      </div>
      <div class="button_box1" @click="cancelOutLogin">
        <div class="create_button">
          <p class="text">Cancel</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, nextTick, toRaw } from 'vue'
import TabBar from '@/components/tabBar'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useNocticeStore } from '@/stores/notification'
import { useHomeStore } from '@/stores/Home'
import homeIcon from '@/assets/info_home.jpg'
import notificationIcon from '@/assets/info_notification.jpg'
import whishlistIcon from '@/assets/info_whishlist.jpg'
import historyIcon from '@/assets/info_history.jpg'
import settingIcon from '@/assets/info_setting.jpg'
import supportIcon from '@/assets/info_support.jpg'
import playstoreIcon from '@/assets/info_playstore.jpg'

// 接口
const userStore = useUserStore()
const nocticeStore = useNocticeStore()
const homeStore = useHomeStore()
const cartStore = useCartStore()

const router = useRouter()
const route = useRoute()

// 引入swiper
import { register } from 'swiper/element/bundle'
register()

// 翻页
const spaceBetween = 10
const onProgress = (e) => {
  const [swiper, progress] = e.detail
  console.log(progress)
}
const onSlideChange = (e) => {
  console.log('slide changed')
}
let swiper = ref(null)

// 确认是Home页面
const isHomePage = true

// 蒙层
const isMask = ref(false)

// 跳转到sideBar页面
const isActivedInfo = ref(false)
const linkToInfo = () => {
  isActivedInfo.value = true
  isMask.value = true
}

// 跳转到notification页面
const linkToNotification = () => {
  router.push({
    path: '/notification'
  })
}

// 跳转到search页面
const linkToSearch = () => {
  router.push({
    path: '/search'
  })
}

// 跳转到category页面
const linkToCategory = () => {
  router.push({
    path: '/category'
  })
}

// banner数据
const banner = reactive([])
const linkToBanner1 = () => {
  router.push({
    path: '/product_details',
    query: {
      productId: banner[0].id
    }
  })
}
const linkToBanner2 = () => {
  router.push({
    path: '/product_details',
    query: {
      productId: banner[1].id
    }
  })
}
const linkToBanner3 = () => {
  router.push({
    path: '/product_details',
    query: {
      productId: banner[2].id
    }
  })
}
// category数据
const categoriesList = ref([
  {
    id: '1',
    name: 'Cream'
  },
  {
    id: '2',
    name: 'Moisturizers'
  },
  {
    id: '3',
    name: 'Lotion'
  },
  {
    id: '4',
    name: 'Serum'
  },
  {
    id: '5',
    name: 'Spray'
  },
  {
    id: '6',
    name: 'Cream'
  },
  {
    id: '7',
    name: 'Moisturizers'
  },
  {
    id: '8',
    name: 'Lotion'
  },
  {
    id: '9',
    name: 'Serum'
  },
  {
    id: '10',
    name: 'Spray'
  }
])

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

// 将商品添加至cart
const isAdd = ref(false)
const actived_cardIndex = ref('')
const addToCart = async (product, event) => {
  await nextTick()

  actived_cardIndex.value = event.currentTarget.parentElement.parentElement.dataset.index
  isAdd.value = !isAdd.value

  // post修改购物车
  const addToCartPost = reactive({
    goodsId: product.id,
    amount: '1'
  })
  await cartStore.editCart(addToCartPost)
  if (cartStore.resp_editCart.errCode == 1000) {
    isAdd.value = true
  } else {
    isAdd.value = false
  }
}

const noRead = ref(false)

onBeforeMount(async () => {
  // get首页数据
  await homeStore.getHomeData()

  Object.assign(banner, homeStore.dataList.banner)

  // 判断通知小红点是否出现
  const arr = reactive([])
  toRaw(nocticeStore.notification).forEach((item) => {
    if (item.read == 0) {
      toRaw(arr).push({
        noread: item.read
      })
    }
  })
  if (arr.length == 0) {
    noRead.value = true
  }
  console.log('未读消息数：', arr.length)
})

// sideBar页面
const useList = ref([
  {
    id: '1',
    name: 'Home',
    img: homeIcon
  },
  {
    id: '2',
    name: 'Notification',
    img: notificationIcon
  },
  {
    id: '3',
    name: 'My Whishlist',
    img: whishlistIcon
  },
  {
    id: '4',
    name: 'Payment History',
    img: historyIcon
  },
  {
    id: '5',
    name: 'Settings',
    img: settingIcon
  },
  {
    id: '6',
    name: 'Support Center',
    img: supportIcon
  },
  {
    id: '7',
    name: 'Rate on Playstore',
    img: playstoreIcon
  }
])

// 点击蒙层收起sideBar层
const activedMask = () => {
  isMask.value = false
  isActivedInfo.value = false
  isLogOut.value = false
}

// 退出登录
const isLogOut = ref(false)

// 选择use
const activeUse = (e) => {
  const activedLiIndex = e.currentTarget.dataset.index
  console.log(activedLiIndex)
  if (activedLiIndex == 1) {
    router.push({
      path: '/notification'
    })
  } else if (activedLiIndex == 2) {
    router.push({
      path: '/whishlist'
    })
  } else if (activedLiIndex == 3) {
    router.push({
      path: '/payment_history'
    })
  } else if (activedLiIndex == 4) {
    router.push({
      path: '/setting'
    })
  } else if (activedLiIndex == 0) {
    isLogOut.value = true
    isActivedInfo.value = false
  }
}

// 退出登录
const linkToSignIn = () => {
  // 清除localstorage缓存
  localStorage.clear()

  router.push({
    path: '/signIn'
  })
}

const linkToTest = () => {
  // router.push({
  //   path: '/test'
  // })
}

const cancelOutLogin = () => {
  isLogOut.value = false
  isMask.value = false
}

// 在 Vue 组件或任何 JS 文件中
console.log(import.meta.env.VITE_API_URL)
</script>

<style lang="scss" scoped>
.app {
  .nav {
    width: 375px;
    height: 48px;
    .nav_box {
      width: 375px;
      height: 48px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 0;
      z-index: 2;
      .icon-mulu {
        font-size: 16px;
        font-weight: 600;
        color: #191d31;
        margin-right: auto;
        margin-left: 20px;
        position: relative;
        .unread {
          width: 8px;
          height: 8px;
          border-radius: 50px;
          background-color: #a456dd;
          position: absolute;
          top: -3px;
          right: -5px;
        }
      }
      .title {
        width: 48px;
        height: 24px;
        margin-left: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        .text {
          font-size: 16px;
          color: #374151;
        }
      }
      .icon-ling {
        font-size: 24px;
        color: #a456dd;
        margin-left: auto;
        margin-right: 20px;
        position: relative;
        .unread {
          width: 8px;
          height: 8px;
          border-radius: 50px;
          background-color: #a456dd;
          position: absolute;
          top: 0px;
          right: 0px;
        }
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .search {
      width: 334px;
      height: 44px;
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      .search_box {
        width: 278px;
        height: 44px;
        margin-left: -5px;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
        background-color: white;
        display: flex;
        align-items: center;
        .icon-sousuo {
          font-size: 25px;
          color: #94a3b8;
          margin-left: 10px;
        }
        .search_input {
          width: 200px;
          font-size: 16px;
          line-height: 18px;
          margin-left: 10px;
        }
        .search_input::-webkit-input-placeholder {
          font-size: 14px;
          line-height: 18px;
          color: #bdbdbd;
        }
      }
      .scan {
        width: 44px;
        height: 44px;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
        margin: 0 -5px 0 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-saoyisao {
          font-size: 23px;
          color: #94a3b8;
        }
      }
    }
    .scroll_nav {
      width: 375px;
      height: 140px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 0;
      .swiper_box1 {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .swiper_wrapper1 {
          width: 321px;
          height: 140px;
          border-radius: 10px;
        }
        .box_text {
          font-size: 28px;
          line-height: 30px;
          color: white;
          position: absolute;
          left: 50px;
        }
      }
      .swiper_box2 {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .swiper_wrapper2 {
          width: 321px;
          height: 140px;
          border-radius: 10px;
        }
        .box_text {
          font-size: 28px;
          line-height: 30px;
          color: white;
          position: absolute;
          left: 50px;
        }
      }
      .swiper_box3 {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .swiper_wrapper3 {
          width: 321px;
          height: 140px;
          border-radius: 10px;
        }
        .box_text {
          font-size: 28px;
          line-height: 30px;
          color: white;
          position: absolute;
          left: 50px;
        }
      }
    }
    .categories {
      width: 375px;
      height: 32px;
      margin-top: 20px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      // ul
      .categories_list {
        width: 327px;
        height: 32px;
        overflow-x: scroll;
        display: flex;
        align-items: center;
        // li
        .categories_item {
          width: auto;
          height: 29px;
          padding: 0 10px;
          margin: 0 10px 0 0;
          border-radius: 100px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          .category_name {
            font-size: 12px;
            color: #001c33;
            letter-spacing: 0.2px;
          }
        }
        .categories_item:active {
          border: 1px solid #a456dd;
        }
        .categories_item:active .category_name {
          color: #a456dd;
        }
      }
      .categories_list::-webkit-scrollbar {
        display: none;
      }
    }

    .recommended {
      width: 327px;
      height: 198px;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .recommended_title {
        align-self: flex-start;
        .title_text {
          font-size: 16px;
          line-height: 30px;
          color: #374151;
        }
      }
      .product_card {
        width: 375px;
        height: 164px;
        margin-top: 6px;
        padding-bottom: 70px;
        overflow: hidden;
        display: flex;
        // align-items: center;
        justify-content: center;
        // ul
        .product_list {
          width: 327px;
          height: 164px;
          overflow-x: scroll;
          display: -webkit-box;
          white-space: nowrap;
          display: flex;
          // margin-left: 15px;
          // li
          .product_item {
            width: 128px;
            height: 164px;
            border-radius: 8px;
            background-color: #f9f9fb;
            margin-right: 15px;
            .img_box {
              .product_img {
                width: 128px;
                height: 88px;
                border-radius: 8px;
              }
            }
            .text_box {
              width: 112px;
              height: 63px;
              margin: 6px 0 12px 10px;
              position: relative;
              .title {
                font-size: 12px;
                color: #001c33;
              }
              .brand {
                font-size: 12px;
                line-height: 28px;
                color: #a2a2a3;
              }
              .price {
                font-size: 15px;
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
                right: 0px;
                bottom: 0px;
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
        .product_list::-webkit-scrollbar {
          display: none;
        }
      }
    }
    .popular {
      width: 327px;
      height: auto;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-x: hidden;
      .popular_title {
        align-self: flex-start;
        .title_text {
          font-size: 16px;
          line-height: 30px;
          color: #374151;
        }
      }
      .product_card {
        width: 375px;
        height: 82px;
        margin-top: 6px;
        overflow-x: scroll;
        overflow-y: hidden;
        // ul
        .product_list {
          display: flex;
          margin-left: 15px;
          // li
          .product_item {
            width: 208px;
            height: 72px;
            border-radius: 8px;
            background-color: #f9f9fb;
            margin: 5px 7.5px;
            display: flex;

            .img_box {
              .product_img {
                width: 72px;
                height: 72px;
                border-radius: 10px;
              }
            }
            .text_box {
              width: 112px;
              height: 63px;
              margin: 6px 0 12px 10px;
              position: relative;
              .title {
                font-size: 12px;
                color: #001c33;
              }
              .brand {
                font-size: 12px;
                line-height: 28px;
                color: #a2a2a3;
              }
              .price {
                font-size: 15px;
                color: #001c33;
                margin-top: 5px;
              }
              .card_cart {
                width: 30px;
                height: 30px;
                border-radius: 50px;
                background-color: #f2f4f5;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                right: 5px;
                bottom: 0px;
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
      .product_card2 {
        width: 375px;
        height: 82px;
        margin-top: 6px;
        padding-bottom: 70px;
        overflow-x: scroll;
        overflow-y: hidden;
        // ul
        .product_list {
          display: flex;
          margin-left: 15px;
          // li
          .product_item {
            width: 208px;
            height: 72px;
            border-radius: 8px;
            background-color: #f9f9fb;
            margin: 5px 7.5px;
            display: flex;

            .img_box {
              .product_img {
                width: 72px;
                height: 72px;
                border-radius: 10px;
              }
            }
            .text_box {
              width: 112px;
              height: 63px;
              margin: 6px 0 12px 10px;
              position: relative;
              .title {
                font-size: 12px;
                color: #001c33;
              }
              .brand {
                font-size: 12px;
                line-height: 28px;
                color: #a2a2a3;
              }
              .price {
                font-size: 15px;
                color: #001c33;
                margin-top: 5px;
              }
              .card_cart {
                width: 30px;
                height: 30px;
                border-radius: 50px;
                background-color: #f2f4f5;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                right: 5px;
                bottom: 0px;
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
}
.app_regular {
  position: fixed;
  top: 0;
}

// 蒙层
.mask {
  width: 375px;
  height: 812px;
  background-color: rgba($color: #000000, $alpha: 0.5);
  position: absolute;
  top: 0;
  z-index: 2;
}
.mask_regular {
  position: fixed;
  top: 0;
}

// 侧边栏
.sideBar {
  width: 303px;
  height: auto;
  background-color: white;
  position: absolute;
  z-index: 3;
  animation: sideBar 0.3s alternate linear;
  .logo {
    margin: 46px 0 0 26px;
    .img {
      width: 135.5px;
      height: 29px;
    }
  }
  .user_info {
    width: 80px;
    height: 81px;
    margin: 60px 0 0 26px;
    .user_name {
      font-size: 20px;
      color: #000000;
    }
    .user_phone {
      font-size: 14px;
      color: #000000;
      line-height: 35px;
    }
    .user_score {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .icon-shoucang {
        color: #fdc911;
      }
      .score_text {
        margin-left: 5px;
        font-size: 14px;
        color: #828282;
      }
    }
  }
  .uses {
    width: 303px;
    margin-top: 44px;
    // ul
    .use_list {
      // li
      .use_item {
        width: 303px;
        height: 56px;
        border-bottom: 1px solid #efefef;
        display: flex;
        align-items: center;
        animation: use_item 1.5s ease-in-out;
        .use_img {
          width: 24px;
          height: 24px;
          margin-left: 24px;
        }
        .use_name {
          margin-left: 12px;
          color: #333333;
        }
        .arrow {
          transform: rotate(0.5turn);
          display: flex;
          align-items: center;
          margin-left: auto;
          margin-right: 20px;
          position: relative;
          .unread {
            width: 8px;
            height: 8px;
            border-radius: 50px;
            background-color: #a456dd;
            position: absolute;
            right: -15px;
          }
          .icon-jiantou {
            font-size: 13px;
            color: #828282;
          }
        }
      }
      @keyframes use_item {
        from {
          border-bottom: 1px solid transparent;
        }
        to {
          border-bottom: 1px solid #efefef;
        }
      }
    }
  }
  .info_more {
    margin: 98px 0 0 26px;
    .img {
      width: 146px;
      height: 18px;
    }
  }
  .info_version {
    margin: 26px 0 0 26px;
    padding-bottom: 25px;
    font-size: 12px;
    color: #a7a7a7;
  }
}

@keyframes sideBar {
  from {
    width: 0;
    opacity: 0.5;
  }
  to {
    width: 303px;
    opacity: 1;
  }
}

// 退出登录面板
.logout {
  width: 375px;
  height: 228px;
  background-color: white;
  border-radius: 10px 10px 0 0;
  position: fixed;
  bottom: 0;
  z-index: 3;
  .line_box {
    width: 375px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    .line {
      width: 44px;
      height: 4px;
      border-radius: 10px;
      background-color: #e0e0e0;
    }
  }
  .logout_title {
    font-size: 23px;
    color: #333333;
    margin: 26px 0 12px 20px;
  }
  .logout_ask {
    font-size: 14px;
    color: #000000;
    margin: 10px 0 12px 20px;
  }
  .bottom {
    width: 375px;
    height: 70px;
    background-color: white;
    margin-top: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    .button_box {
      width: 160px;
      height: 46px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 7.5px;
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
    .button_box1 {
      width: 160px;
      height: 46px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 7.5px;
      .create_button {
        width: 160px;
        height: 46px;
        border-radius: 6px;
        background-color: #ffffff;
        border: 1px solid #a456dd;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.1s ease-in-out;
        .text {
          font-size: 16px;
          color: #a456dd;
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
