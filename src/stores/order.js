import { reactive, toRaw } from 'vue'
import { defineStore } from 'pinia'
import request from '@/axios/request.js'

export const useOrderStore = defineStore(
  'order',
  () => {
    // post计算费用
    const resp_calculateCost = reactive({})
    async function calculateCost(data) {
      Object.assign(resp_calculateCost, await request.post('/onlineShop/calculateCost', data))
    }

    // post创建订单
    const resp_createOrder = reactive({})
    async function createOrder(data) {
      Object.assign(resp_createOrder, await request.post('/onlineShop/createOrder', data))
      return resp_createOrder
    }

    // get订单列表
    const orderList = reactive([])
    const resp_getOrderList = reactive({})
    async function getOrderList() {
      Object.assign(
        resp_getOrderList,
        await request.get('/onlineShop/getOrderList', { params: { size: 10, page: 1 } })
      )
      Object.assign(orderList, resp_getOrderList.data.list)
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
    }

    // post支付
    const resp_pay = reactive({})
    async function pay(data) {
      Object.assign(resp_pay, await request.post('/onlineShop/pay', data))
      return resp_pay
    }

    return {
      resp_calculateCost,
      calculateCost,
      resp_createOrder,
      createOrder,
      orderList,
      resp_getOrderList,
      getOrderList,
      resp_pay,
      pay
    }
  },
  {
    persist: true
  }
)
