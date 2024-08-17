import { nextTick, reactive, toRaw, ref } from 'vue'
import axios from 'axios'

const token_info = localStorage.getItem('token')
const orderList = reactive([])

// 获取通知列表
async function getOrderList(orderList) {
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
    },
    status: ''
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
}

export default getOrderList
