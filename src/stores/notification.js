import { reactive } from 'vue'
import { defineStore } from 'pinia'
import request from '@/axios/request.js'
import dayjs from 'dayjs'

export const useNocticeStore = defineStore(
  'notice',
  () => {
    // post创建通知
    const resp_createNotification = reactive({})
    async function createNotification(data) {
      Object.assign(
        resp_createNotification,
        await request.post('/onlineShop/createNotification', data)
      )
      return resp_createNotification
    }

    // get通知列表
    const notification = reactive([])
    const resp_getNotification = reactive({})
    async function getNotification() {
      Object.assign(
        resp_getNotification,
        await request.get('/onlineShop/getNotification', { params: { size: 10, page: 1 } })
      )
      // 时间差处理
      resp_getNotification.data.list.forEach((item) => {
        let time = item.createdAt
        time = dayjs(time).format('YYYY-MM-DD HH:mm:ss')
        let nowTime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
        const date1 = dayjs(nowTime)
        const timediff = date1.diff(nowTime, 'minute')
        item.timediff = timediff + ' m ago'
      })
      Object.assign(notification, resp_getNotification.data.list)
    }

    // put已读消息
    async function readNotification(data) {
      return await request.put('/onlineShop/readNotification', { id: data })
    }

    return {
      notification,
      resp_getNotification,
      resp_createNotification,
      createNotification,
      getNotification,
      readNotification
    }
  },
  {
    persist: true
  }
)
