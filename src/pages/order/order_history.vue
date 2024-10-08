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
            v-for="(order, order_index) of orderStore.orderList"
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
                <div class="price">$ {{ Number(order.goods.price).toFixed(2) }}</div>
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
      <div class="askBuy" v-if="askBuy == true">
        <i class="iconfont icon-404"></i>
        <p class="askBuy_text">
          You haven't bought anything yet!
          <br />
          Go take a look ~
        </p>
      </div>
    </div>
  </div>

  <TabBar :init_order="isOrderPage" />
</template>

<script setup>
import { ref, onBeforeMount, reactive } from 'vue'
import TabBar from '@/components/tabBar'
import Nav from '@/components/nav'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'
import { Toast_Success } from '@/utils/extract'

// 接口
const cartStore = useCartStore()
const orderStore = useOrderStore()

const router = useRouter()
const route = useRoute()

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

// 订单列表信息
const askBuy = ref(false)

// -1:cancelled 1:pending 2:on going 3:completed
onBeforeMount(async () => {
  // 获取订单列表
  await orderStore.getOrderList()

  if (orderStore.orderList.length == 0) {
    askBuy.value = true
  } else {
    askBuy.value = false
  }
})

// reorder重新添加到购物车
const reOrder = async (order) => {
  // post修改购物车
  const addToCartPost = reactive({
    goodsId: order.goods.id,
    amount: '1'
  })
  await cartStore.editCart(addToCartPost)
  Toast_Success('You have already Added to cart again!')
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
    .askBuy {
      margin-top: 40px;
      width: 327px;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon-404 {
        font-size: 50px;
        color: #a456dd;
        line-height: 70px;
      }
      .askBuy_text {
        font-size: 20px;
        color: #a456dd;
        line-height: 30px;
        text-align: center;
      }
    }
  }
}
</style>
