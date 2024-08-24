import { reactive } from 'vue'
import { defineStore } from 'pinia'
import request from '@/axios/request.js'

export const useLocationStore = defineStore(
  'location',
  () => {
    // post添加地址
    const resp_createLocation = reactive({})
    async function createLocation(data) {
      Object.assign(resp_createLocation, await request.post('/onlineShop/createLocation', data))
    }

    // delete删除地址
    const resp_removeLocation = reactive({})
    async function removeLocation(data) {
      Object.assign(
        resp_removeLocation,
        await request.delete('/onlineShop/removeLocation', { data })
      )
    }

    // get收藏地址列表
    const locationList = reactive([])
    const resp_getLocation = reactive({})
    async function getLocation(data) {
      Object.assign(
        resp_getLocation,
        await request.get('/onlineShop/getLocation', { params: data })
      )
      Object.assign(locationList, resp_getLocation.data.list)
    }

    // put修改地址
    const resp_updateLocation = reactive({})
    async function updateLocation(data) {
      Object.assign(resp_updateLocation, await request.put('/onlineShop/updateLocation', data))
    }

    return {
      resp_createLocation,
      createLocation,
      resp_removeLocation,
      removeLocation,
      locationList,
      resp_getLocation,
      getLocation,
      resp_updateLocation,
      updateLocation
    }
  },
  {
    persist: true
  }
)
