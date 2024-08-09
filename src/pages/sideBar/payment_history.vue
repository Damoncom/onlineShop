<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
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
            <p class="state_text">{{ order.state }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import order from '@/assets/details_img.jpg'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Payment History'

// 商品列表信息
const orderList = reactive([
  {
    id: 1,
    name: 'Givenchy L‘ intemporel Blossom',
    brand: 'Givenchy',
    imgUrl: order,
    price: '$29.00',
    state: 'Completed'
  },
  {
    id: 2,
    name: 'Givenchy L‘ intemporel Blossom',
    brand: 'Givenchy',
    imgUrl: order,
    price: '$29.00',
    state: 'Completed'
  },
  {
    id: 3,
    name: 'Givenchy L‘ intemporel Blossom',
    brand: 'Givenchy',
    imgUrl: order,
    price: '$29.00',
    state: 'Completed'
  },
  {
    id: 4,
    name: 'Givenchy L‘ intemporel Blossom',
    brand: 'Givenchy',
    imgUrl: order,
    price: '$29.00',
    state: 'Completed'
  }
])
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
  }
}
</style>
