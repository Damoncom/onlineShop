<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <div class="tab_bar">
        <div class="upcoming" @click="linkToUpcoming">
          <p class="tab_text">Upcoming</p>
        </div>
        <div class="history">
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
            :data-name="order.name"
            :data-brand="order.brand"
            :data-price="order.price"
            :data-img="order.imgUrl"
          >
            <div class="item_top">
              <img :src="order.goods.image" class="li_img" />
              <div class="text_box">
                <div class="title">{{ order.goods.name }}</div>
                <div class="brand">{{ order.goods.origin }}</div>
                <div class="price">$ {{ order.goods.price }}</div>
              </div>
              <div class="state">
                <p class="state_text">{{ order.state }}</p>
              </div>
            </div>
            <div class="item_line">
              <div class="line"></div>
            </div>
            <div class="item_bottom">
              <div class="re_order" @click="reOrder(order)">
                <p class="re_order_text">Re-Order</p>
              </div>
              <div class="tracking">
                <p class="tracking_text">Tracking</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <TabBar :init_order="isOrderPage" />
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeMount, reactive, toRaw } from 'vue'
import TabBar from '@/components/tabBar'
import Nav from '@/components/nav'
import { useRouter, useRoute } from 'vue-router'
// const axios = require('axios')
import order from '@/assets/prodoct_img.jpg'
import order2 from '@/assets/order2.jpg'

const router = useRouter()
const route = useRoute()

const token_info = localStorage.getItem('token')

// 导入导航栏
const navTitle = 'Order'

// 跳转到商品页面
const linkToUpcoming = () => {
  router.push({
    path: '/order'
  })
}

// 确认是Order页面
const isOrderPage = true

// 商品列表信息
const orderList = reactive([])

// -1:cancelled 1:pending 2:on going 3:completed

// reorder重新添加到购物车
const reOrder = async (order) => {
  await nextTick()
  console.log(order)

  const { data: resp_addToCart } = await axios({
    method: 'post',
    url: '/onlineShop/editCart',
    data: {
      goodsId: order.goods.id,
      amount: '1'
    },
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  if (resp_addToCart.errCode == 1000) {
  } else {
  }
  console.log('post增加到购物车：', resp_addToCart)
}

onBeforeMount(async () => {
  await nextTick()

  // 获取订单列表
  const { data: resp_orderList } = await axios({
    method: 'get',
    url: '/onlineShop/getOrderList',
    params: {
      size: 10,
      page: 1
    },
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  })

  if (resp_orderList.errCode == 1000) {
    Object.assign(orderList, resp_orderList.data.list)
    toRaw(orderList).forEach((item) => {
      if (item.status == -1) {
        item.state = 'cancelled'
      } else if (item.status == 1) {
        item.state = 'pending'
      } else if (item.status == 2) {
        item.state = 'on going'
      } else if (item.status == 3) {
        item.state = 'pending'
      }
    })
  } else {
  }
  console.log('get订单列表:', resp_orderList)
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
        background-color: white;
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
      margin-top: 24px;
      // ul
      .orders_list {
        padding-bottom: 70px;
        // li
        .orders_item {
          width: 335px;
          height: 179px;
          margin-bottom: 16px;
          border: 1px solid #f2f2f2;
          border-radius: 4px;
          box-shadow: rgba(149, 157, 165, 0.2) 0px 1px 24px;
          display: flex;
          flex-direction: column;
          //   align-items: center;
          .item_top {
            display: flex;
            align-items: center;
            height: 88px;
            margin-top: 16px;
            margin-left: 5px;
            .li_img {
              width: 88px;
              height: 88px;
              border-radius: 10px;
              margin-left: 12px;
            }
            .text_box {
              width: 159px;
              height: 89px;
              margin: 10px 0 0 12px;
              .title {
                width: 165px;
                font-size: 14px;
                line-height: 20px;
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
                line-height: 50px;
              }
            }
            .state {
              width: 65px;
              height: 22px;
              margin: 0 15px 0px 0;
              border-radius: 30px;
              background-color: #e9ffee;
              display: flex;
              align-self: flex-end;
              align-items: center;
              justify-content: center;
              .state_text {
                font-size: 8px;
                letter-spacing: -0.16px;
                color: #20cf47;
              }
            }
          }
          .item_line {
            width: 303px;
            height: 1px;
            margin-top: 14px;
            margin-left: 16px;
            background-color: #f6eefc;
            position: relative;
            .line {
              width: 303px;
              height: 1px;
              background-image: linear-gradient(to right, #fff 0%, #fff 50%, transparent 50%);
              background-size: 11px 1px;
              background-repeat: repeat-x;
              position: absolute;
            }
          }
          .item_bottom {
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            .re_order {
              width: 142px;
              height: 32px;
              border-radius: 6px;
              background-color: #f6eefc;
              margin-right: 9.5px;
              display: flex;
              align-items: center;
              justify-content: center;
              .re_order_text {
                font-size: 14px;
                color: #a456dd;
              }
            }
            .tracking {
              width: 142px;
              height: 32px;
              border-radius: 6px;
              background-color: #f2f2f2;
              margin-left: 9.5px;
              display: flex;
              align-items: center;
              justify-content: center;
              .tracking_text {
                font-size: 14px;
                color: #3f2a88;
              }
            }
          }
        }
      }
    }
  }
}
</style>
