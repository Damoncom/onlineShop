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
            <img :src="order.goods.image" class="li_img" />
            <div class="text_box">
              <div class="title">{{ order.goods.name }}</div>
              <div class="brand">{{ order.goods.origin }}</div>
              <div class="price">$ {{ Number(order.goods.price).toFixed(2) }}</div>
            </div>
            <div class="state">
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
import { ref, onMounted, nextTick, reactive, onBeforeMount, toRaw } from 'vue'
import TabBar from '@/components/tabBar'
import Nav from '@/components/nav'
import { useRouter, useRoute } from 'vue-router'
import order from '@/assets/prodoct_img.jpg'
import order2 from '@/assets/order2.jpg'
import getOrderList from '@/utils/getOrderList'

const router = useRouter()
const route = useRoute()

const token_info = localStorage.getItem('token')

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

// 商品列表信息
const orderList = reactive([])

onBeforeMount(async () => {
  await nextTick()

  // 获取订单列表
  getOrderList(orderList)
  // const { data: resp_orderList } = await axios({
  //   method: 'get',
  //   url: '/onlineShop/getOrderList',
  //   params: {
  //     size: 10,
  //     page: 1
  //   },
  //   headers: {
  //     Authorization: `Bearer ${token_info}`,
  //     'Content-Type': 'application/json; charset=utf-8'
  //   }
  // })

  // if (resp_orderList.errCode == 1000) {
  //   Object.assign(orderList, resp_orderList.data.list)
  //   toRaw(orderList).forEach((item) => {
  //     if (item.status == -1) {
  //       item.state = 'cancelled'
  //     } else if (item.status == 1) {
  //       item.state = 'pending'
  //     } else if (item.status == 2) {
  //       item.state = 'on going'
  //     } else if (item.status == 3) {
  //       item.state = 'completed'
  //     }
  //   })
  // } else {
  // }
  // console.log('get订单列表:', resp_orderList)
  // console.log(orderList)

  // // put修改订单状态
  // const { data: resp_editState } = await axios({
  //   method: 'put',
  //   url: '/onlineShop/updateOrderStatus',
  //   data: {
  //     orderId: 'order_20240812212956_7',
  //     status: -1
  //   },
  //   headers: {
  //     Authorization: `Bearer ${token_info}`,
  //     'Content-Type': 'application/json; charset=utf-8'
  //   }
  // })
  // if (resp_editState.errCode == 1000) {
  // } else {
  // }
  // console.log('put修改订单状态：', resp_editState)
})
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
      margin: 24px 0 70px 0;
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
            margin: 12px 0 0 12px;
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
              margin-top: 10px;
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
