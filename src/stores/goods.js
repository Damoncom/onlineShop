import { reactive } from 'vue'
import { defineStore } from 'pinia'
import request from '@/axios/request.js'

export const useGoodsStore = defineStore(
  'goods',
  () => {
    const goodsList = reactive([])
    const resp_getGoodsList = reactive({})
    const goodsDetail = reactive({})
    const resp_getGoodsDetail = reactive({})

    // get商品列表
    async function getGoodsList(data) {
      Object.assign(
        resp_getGoodsList,
        await request.get('/onlineShop/getGoodsList', { params: data })
      )
      Object.assign(goodsList, resp_getGoodsList.data.list)
    }

    // get商品详情
    async function getGoodsDetail(data) {
      Object.assign(
        resp_getGoodsDetail,
        await request.get('/onlineShop/getGoodsDetail', { params: { id: data } })
      )
      Object.assign(goodsDetail, resp_getGoodsDetail.data)
    }

    return { goodsList, resp_getGoodsList, goodsDetail, getGoodsList, getGoodsDetail }
  },
  {
    persist: true
  }
)
