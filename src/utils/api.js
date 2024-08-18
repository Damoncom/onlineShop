import request from '@/axios/request.js'

// 用户信息-----------------------------------
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

// 通知-------------------------------------
// get通知列表
export async function getNotification() {
  return request.get('/onlineShop/getNotification', { params: { size: 10, page: 1 } })
}

// 商品-------------------------------------
// get商品详情
export async function getGoodsDetail(data) {
  return request.get('/onlineShop/getGoodsDetail', { params: { id: data } })
}

// get商品列表
export async function getGoodsList(data) {
  return request.get('/onlineShop/getGoodsList', { params: data })
}

// 心愿清单-------------------------------------
// post收藏
export function createWishlist(data) {
  return request.post('/onlineShop/createWishlist', data)
}

// delete取消收藏
export function deleteWishlist(data) {
  return request.delete('/onlineShop/deleteWishlist', { data })
}

// get收藏列表
export async function getWishlist() {
  return request.get('/onlineShop/getWishlist', { params: { size: 10, page: 1 } })
}

// 配送地址-------------------------------------
// post添加地址
export function createLocation(data) {
  return request.post('/onlineShop/createLocation', data)
}

// delete删除地址
export function removeLocation(data) {
  return request.delete('/onlineShop/removeLocation', { data })
}

// get获取地址
export async function getLocation(data) {
  return request.get('/onlineShop/getLocation', { params: data })
}

// put修改地址
export function updateLocation(data) {
  return request.put('/onlineShop/updateLocation', data)
}

// 购物车-------------------------------------
// post修改购物车
export function editCart(data) {
  return request.post('/onlineShop/editCart', data)
}

// get购物车
export async function getCart(data) {
  return request.get('/onlineShop/getCart', { params: data })
}

// 订单-------------------------------------
// post计算费用
export function calculateCost(data) {
  return request.post('/onlineShop/calculateCost', data)
}

// get订单列表
export async function getOrderList() {
  return request.get('/onlineShop/getOrderList', { params: { size: 10, page: 1 } })
}

// post支付
export function pay(data) {
  return request.post('/onlineShop/pay', data)
}
