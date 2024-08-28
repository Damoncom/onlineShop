import { reactive } from 'vue'
import { defineStore } from 'pinia'
import request from '@/axios/request.js'

export const useHomeStore = defineStore(
  'home',
  () => {
    const dataList = reactive([])
    const resp_getHomeData = reactive({})

    // get首页数据
    async function getHomeData() {
      Object.assign(resp_getHomeData, await request.get('/onlineShop/getHomeData', { params: {} }))
      Object.assign(dataList, resp_getHomeData.data)
      return resp_getHomeData
    }

    return { dataList, resp_getHomeData, getHomeData }
  },
  {
    persist: true
  }
)
