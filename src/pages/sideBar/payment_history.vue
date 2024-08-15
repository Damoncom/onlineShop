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
</template>
<script setup>
import { reactive, onBeforeMount, nextTick, toRaw } from 'vue'
import order from '@/assets/details_img.jpg'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Payment History'

const token_info = localStorage.getItem('token')

// 商品列表信息
const orderList = reactive([])

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
  console.log(orderList)
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
  }
}
</style>
