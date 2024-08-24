import { reactive } from 'vue'
import { defineStore } from 'pinia'
import request from '@/axios/request.js'

export const useWishStore = defineStore(
  'wishlist',
  () => {
    // post收藏
    const resp_createWishlist = reactive({})
    async function createWishlist(data) {
      Object.assign(resp_createWishlist, await request.post('/onlineShop/createWishlist', data))
    }

    // delete取消收藏
    const resp_deleteWishlist = reactive({})
    async function deleteWishlist(data) {
      Object.assign(
        resp_deleteWishlist,
        await request.delete('/onlineShop/deleteWishlist', { data })
      )
    }

    // get收藏列表
    const wishList = reactive([])
    const resp_getWishlist = reactive({})
    async function getWishlist() {
      Object.assign(
        resp_getWishlist,
        await request.get('/onlineShop/getWishlist', { params: { size: 10, page: 1 } })
      )
      Object.assign(wishList, getWishlist.data.list)
    }

    return {
      resp_createWishlist,
      createWishlist,
      resp_deleteWishlist,
      deleteWishlist,
      wishList,
      resp_getWishlist,
      getWishlist
    }
  },
  {
    persist: true
  }
)
