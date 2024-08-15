import { nextTick, reactive, toRaw, ref } from 'vue'
import axios from 'axios'

const token_info = localStorage.getItem('token')
const isAdd = ref(false)

// 获取通知列表
async function editCart(product) {
  const { data: resp_addToCart } = await axios({
    method: 'post',
    url: '/onlineShop/editCart',
    data: {
      goodsId: product.id,
      amount: '1'
    },
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  if (resp_addToCart.errCode == 1000) {
    isAdd.value = true
  } else {
    isAdd.value = false
  }
  console.log('post增加到购物车：', resp_addToCart)
}

export default editCart
