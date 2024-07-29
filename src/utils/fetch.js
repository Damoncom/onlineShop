import {toast, showLoading, hideLoading} from './wxApi'
import {sign, baseEncode, baseDecode} from './encrypt'
import Fly from 'flyio/dist/npm/wx'
import store from '@/store'

var fly = new Fly()
// 设置超时
fly.config.timeout = 10000

let reloadSession = false

export const fetch = (newParam, method) => new Promise(async (resolve, reject) => {
  wx.showNavigationBarLoading()

  let loadingTimer = null
  let loadingIsShow = false

  const defaultParam = {
    data: {}, // 请求参数
    url: process.env.API_URL, // 请求链接
    method, // 请求方式
    sign: true, // 是否需要签名
    handleSignErr: true, // 处理签名错误
    callbackErr: false, // 即使接口报错也返回reslove
    showErrMsg: true, // 是否显示服务器报错信息
    showLoading: true, // 是否显示loading （${showLoadingTime}ms 无响应才显示）
    showLoadingTime: 600, // 多少时间内无响应显示 loading
    reloadSessionNext: false, // 下次签名需要更新 Session
    checkLogin: false, // 前端检查登录（必须有uid）
    singFilterKey: []
  }
  let param = {
    ...defaultParam,
    ...newParam
  }
  if (param.checkLogin && param.data.uid !== undefined) {
    try {
      await store.dispatch('checkLogin')
    } catch (error) {
      // goLogin()
      reject(error)
      return
    }
  }

  if (param.showLoading) {
    loadingTimer = setTimeout(() => {
      loadingIsShow = true
      showLoading()
    }, param.showLoadingTime)
  }

  if (!param.data.hasOwnProperty('req')) {
    param.data = {req: param.data}
  }

  if (param.sign) {
    param.data = sign(param.data, reloadSession, param.singFilterKey)
    if (reloadSession) reloadSession = false
  }

  if (param.reloadSessionNext) {
    reloadSession = true
  }

  try { console.log('>>>>> request >>>>>', param.data.req.t, {...param}) } catch (error) { console.log('查找t-error: ', error) }

  param.data = baseEncode(JSON.stringify(param.data))

  try {
    let res = await fly.request(
      param.url,
      param.data,
      {
        method: param.method
      }
    )

    // 清除loading 模态框
    if (loadingIsShow) {
      hideLoading()
    }

    // 判断服务器状态码
    if (+res.status === 200) {
      try {
        res = JSON.parse(baseDecode(res.data))
        if (!res.ctx.hasOwnProperty('err')) throw Error()
        try { console.log('<<<<< response <<<<<', res.resp.t, res) } catch (error) {}
      } catch (error) {
        console.log('$post-JSON.parse()-error', error)
        reject(res)
      }
      // 签名错误跳转登录
      if (param.handleSignErr && +res.ctx.err === 1001) {
        store.dispatch('goLogin')
        reject(res)
      } else if (+res.ctx.err === 0) {
        if (param.callbackErr) {
          resolve(res)
        } else {
          resolve(res.resp)
        }
      } else {
        // 是否显示弹框
        if (param.showErrMsg) {
          toast(res.ctx.reason)
        }
        if (param.callbackErr) {
          resolve(res)
        } else {
          reject(res)
        }
      }
    } else {
      toast('网络繁忙')
      reject(res)
    }
  } catch (error) {
    // 清除loading 模态框
    if (loadingIsShow) {
      hideLoading()
    }
    console.log('$post-error', error)
    // toast('网络繁忙')
    reject(error)
  } finally {
    wx.hideNavigationBarLoading()
    // 清除loading 定时器
    if (loadingTimer) {
      clearTimeout(loadingTimer)
      loadingTimer = null
    }
    loadingIsShow = false
  }
})

export const $get = (param) => new Promise(async (resolve, reject) => {
  console.log('param: ', param)
  try {
    let res = await fly.request(
      param.url,
      param.data,
      {
        method: 'GET'
      }
    )
    resolve(res.data)
  } catch (error) {
    console.log('$get-error: ', error)
    reject(error)
  }
})

export const $post = (param) => fetch(param, 'POST')
