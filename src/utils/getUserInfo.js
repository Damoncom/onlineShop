import { nextTick, reactive, toRaw } from 'vue'
import axios from 'axios'

const token_info = localStorage.getItem('token')
const user = reactive({})
// const createNotice = reactive([])

// 获取用户信息
async function getUserInfo(user) {
  const { data: resp } = await axios({
    method: 'get',
    url: '/onlineShop/getUserInfo',
    params: {},
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  Object.assign(user, resp.data)
  console.log('用户信息resp', resp)
  console.log(createNotice)
}

export default getUserInfo
