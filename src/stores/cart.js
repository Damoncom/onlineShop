import { reactive } from 'vue'
import { defineStore } from 'pinia'
import request from '@/axios/request.js'

export const useCartStore = defineStore(
  'cart',
  () => {
    // post修改购物车
    const resp_editCart = reactive({})
    async function editCart(data) {
      Object.assign(resp_editCart, await request.post('/onlineShop/editCart', data))
    }

    // get购物车
    const cartList = reactive([])
    const resp_getCart = reactive({})
    async function getCart(data) {
      Object.assign(resp_getCart, await request.get('/onlineShop/getCart', { params: data }))
      Object.assign(cartList, resp_getCart.data.list)
    }

    return {
      resp_editCart,
      editCart,
      cartList,
      resp_getCart,
      getCart
    }
  },
  {
    persist: true
  }
)
