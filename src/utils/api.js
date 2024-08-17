import request from '@/axios/request.js'

// get订单列表
export async function getOrderList() {
  return request.get('/onlineShop/getOrderList', { params: { size: 10, page: 1 } })
}

// post注册
export function signUp(data) {
  return request.post('/onlineShop/signUp', data)
}

// post登录
export function signIn(data) {
  return request.post('/onlineShop/signIn', data)
}

// get用户信息
export async function getUserInfo() {
  return request.get('/onlineShop/getUserInfo', { params: {} })
}

// put修改用户信息
export function updateUserInfo(data) {
  return request.put('/onlineShop/updateUserInfo', data)
}

// post上传用户头像
export function uploadImage(data) {
  return request.post('/onlineShop/uploadImage', data)
}
