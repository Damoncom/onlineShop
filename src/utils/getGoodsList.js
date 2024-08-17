import { nextTick, reactive, toRaw, ref } from 'vue'
import axios from 'axios'

const token_info = localStorage.getItem('token')
const productList = reactive([])

// 获取通知列表
async function getGoodsList(productList) {
  const { data: resp_orderList } = await axios({
    method: 'get',
    url: '/onlineShop/getGoodsList',
    params: {
      size: 10,
      page: 1,
      barCode: '',
      name: ''
    },
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  if (resp_orderList.errCode == 1000) {
    Object.assign(productList, resp_orderList.data.list)
  } else {
  }

  console.log('获取商品列表数据:', resp_orderList)
  console.log(productList)
  // console.log(axios)
}

export default getGoodsList
