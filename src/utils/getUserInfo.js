import { nextTick, reactive, toRaw, ref } from 'vue'
import axios from 'axios'

const token_info = localStorage.getItem('token')
// const user = reactive({})
// const input_gender = ref('Male')
// const createNotice = reactive([])

// 获取用户信息
async function getUserInfo(user, input_gender) {
  const { data: resp } = await axios({
    method: 'get',
    url: '/onlineShop/getUserInfo',
    params: {},
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  if (resp.errCode == 1000) {
    Object.assign(user, resp.data)
  } else {
  }
  if (resp.data.gender == '1') {
    input_gender.value = 'Female'
  }

  console.log('用户信息resp', resp)
}

export default getUserInfo
