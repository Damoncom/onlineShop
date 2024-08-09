<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <div class="tab_bar">
        <div class="upcoming">
          <p class="tab_text">Upcoming</p>
        </div>
        <div class="history" @click="linkToHistory">
          <p class="tab_text">Order History</p>
        </div>
      </div>
      <div class="orders">
        <ul class="orders_list">
          <li
            class="orders_item"
            v-for="(order, order_index) of orderList"
            :key="order_index"
            :data-index="order_index"
          >
            <img :src="order.imgUrl" class="li_img" />
            <div class="text_box">
              <div class="title">{{ order.name }}</div>
              <div class="brand">{{ order.brand }}</div>
              <div class="price">{{ order.price }}</div>
            </div>
            <div class="state">
              <!-- :style="{ backgroundColor: order.state == 'Pending' ? '#fff0e3' : '#ecf8ff' } -->
              <p class="state_text">{{ order.state }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <TabBar :init_order="isOrderPage" />
</template>

<script setup>
import { ref, onMounted, nextTick, reactive, onBeforeMount } from 'vue'
import TabBar from '@/components/tabBar'
import Nav from '@/components/nav'
import { useRouter, useRoute } from 'vue-router'
import order from '@/assets/prodoct_img.jpg'
import order2 from '@/assets/order2.jpg'

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Order'

// 跳转到历史商品页面
const linkToHistory = () => {
  router.push({
    path: '/order_history'
  })
}

// 确认是Order页面
const isOrderPage = true

//TODO:不同状态不同颜色
// 商品列表信息
const orderList = reactive([
  {
    id: 1,
    name: 'Givenchy L‘ intemporel Blossom',
    brand: 'Givenchy',
    imgUrl: order,
    price: '$29.00',
    state: 'On Going'
  },
  {
    id: 2,
    name: 'Givenchy L‘ intemporel Blossom',
    brand: 'Givenchy',
    imgUrl: order,
    price: '$29.00',
    state: 'Cancelled'
  },
  {
    id: 3,
    name: 'Givenchy L‘ intemporel Blossom',
    brand: 'Givenchy',
    imgUrl: order,
    price: '$29.00',
    state: 'Pending'
  }
])

// TODO:注释上面的orderList数组 + 添加下面的三行后，可以实现upcoming页面的更新缓存。但是新用户登录第一次进入这个页面会因为找不到localstorage缓存的orderList_info数据而报错
// const orderList_info = JSON.parse(localStorage.getItem('orderList'))
// const orderList = reactive([...orderList_info])
// console.log('upcoming列表状态:', orderList)

// 从商品历史页面添加的商品
const addOrder = route.query
const count = ref(orderList.length)
console.log(count.value)

if (JSON.stringify(addOrder) != '{}') {
  orderList.push({
    id: count.value + 1,
    name: addOrder.name,
    brand: addOrder.brand,
    price: addOrder.price,
    imgUrl: order2,
    state: 'Pending'
  })

  // 存储商品列表
  localStorage.setItem('orderList', JSON.stringify(orderList))
}
</script>

<style lang="scss" scoped>
.app {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .tab_bar {
      width: 335px;
      height: 32px;
      margin-top: 24px;
      background-color: #76768020;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      .upcoming {
        width: 49.3%;
        height: 29px;
        background-color: white;
        border-radius: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        .tab_text {
          font-size: 13px;
          line-height: 26px;
          letter-spacing: -0.08px;
        }
      }
      .history {
        width: 49.3%;
        height: 29px;
        border-radius: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        .tab_text {
          font-size: 13px;
          line-height: 26px;
          letter-spacing: -0.08px;
        }
      }
    }
    .orders {
      margin: 24px 0;
      // ul
      .orders_list {
        // li
        .orders_item {
          width: 335px;
          height: 120px;
          margin-bottom: 16px;
          border: 1px solid #f2f2f2;
          border-radius: 4px;
          box-shadow: rgba(149, 157, 165, 0.2) 0px 1px 24px;
          display: flex;
          align-items: center;
          .li_img {
            width: 88px;
            height: 88px;
            border-radius: 10px;
            margin-left: 12px;
          }
          .text_box {
            width: 195px;
            height: 89px;
            margin-left: 12px;
            .title {
              width: 165px;
              font-size: 14px;
              line-height: 22px;
              color: #000000;
            }
            .brand {
              font-size: 12px;
              color: #a3a3a3;
              line-height: 18px;
            }
            .price {
              font-size: 16px;
              color: #001c33;
              line-height: 30px;
            }
          }
          .state {
            width: 49px;
            height: 22px;
            margin: 0 10px 20px 0;
            border-radius: 30px;
            background-color: #ecf8ff;
            display: flex;
            align-self: flex-end;
            align-items: center;
            justify-content: center;
            .state_text {
              font-size: 8px;
              color: #2d9cdb;
            }
          }
          .state_cancel {
            background-color: #ffecec;
          }
          .state_cancel {
            background-color: #fff0e3;
          }
        }
      }
    }
  }
}
</style>
