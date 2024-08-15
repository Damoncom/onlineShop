import { nextTick, reactive, toRaw, ref } from 'vue'
import dayjs from 'dayjs'
import axios from 'axios'

const token_info = localStorage.getItem('token')
const notificationList = reactive([])
const noRead = ref(false)

// 获取通知列表
async function getNoctice(notificationList, noRead) {
  const { data: resp_getNotification } = await axios({
    method: 'get',
    url: '/onlineShop/getNotification',
    params: {
      size: 10,
      page: 1
    },
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  if (resp_getNotification.errCode == 1000) {
    Object.assign(notificationList, resp_getNotification.data.list)
  } else {
  }
  console.log('get获取通知：', resp_getNotification)

  // TODO:时间差处理
  notificationList.forEach((item) => {
    let time = item.createdAt
    time = dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    let nowTime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')

    const date1 = dayjs(nowTime)
    const timediff = date1.diff(nowTime, 'minute')

    item.timediff = timediff + ' m ago'
  })

  // 未读消息小红点处理
  const arr = reactive([])
  toRaw(resp_getNotification.data.list).forEach((item) => {
    if (item.read == 0) {
      toRaw(arr).push({
        noread: item.read
      })
    }
  })
  if (arr.length == 0) {
    noRead.value = true
  }
  console.log(resp_getNotification)
  console.log(arr.length)
  // console.log(noRead.value)
}

export default getNoctice
