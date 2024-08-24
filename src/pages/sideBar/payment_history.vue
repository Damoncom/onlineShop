<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <ul class="orders_list">
        <li
          class="orders_item"
          v-for="(order, order_index) of orderStore.orderList"
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
</template>
<script setup>
import { onBeforeMount, nextTick, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'
import { useOrderStore } from '@/stores/order'

// 接口
const orderStore = useOrderStore()

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Payment History'

// 订单列表信息
const askBuy = ref(false)

onBeforeMount(async () => {
  await nextTick()

  // 获取订单列表
  await orderStore.getOrderList()

  if (orderStore.orderList.length == 0) {
    askBuy.value = true
  } else {
    askBuy.value = false
  }
})
</script>

<style lang="scss" scoped>
.app {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // ul
    .orders_list {
      margin-top: 24px;
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
          margin: 10px 0 0 12px;
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
          background-color: #e9ffee;
          display: flex;
          align-self: flex-end;
          align-items: center;
          justify-content: center;
          .state_text {
            font-size: 8px;
            color: #20cf47;
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
