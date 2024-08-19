// 将Axios封装成模块
import axios from 'axios'
import router from '@/router/index.js'
import { Toast } from '@/utils/extract'

const token_info = localStorage.getItem('token')

// 创建axios实例
const request = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加请求头等信息
    if (token_info) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${token_info}` //请求头加上token
    }
    return config
  },
  (error) => {
    // 请求错误处理
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    console.log(response)
    if (response.status == 200) {
      return response.data
    } else {
      router.push('/notFound')
    }

    // // 对响应数据做处理，例如只返回data部分
    // const res = response.data
    // // 如果返回的状态码为200，说明成功，可以直接返回数据
    // if (res.errCode === 1000) {
    //   return res.data
    // } else {
    //   // 其他状态码都当作错误处理
    //   // 可以在这里对不同的错误码进行不同处理
    //   return Promise.reject({
    //     message: res.message || 'Error',
    //     status: res.errCode
    //   })
    // }
  },
  (error) => {
    // 对响应错误做处理
    console.log('err' + error) // for debugd
    Toast('服务器异常')
    return Promise.reject(error)
  }
)
export default request

// TODO:建议把请求挂到stores，把所有收到的返回也挂上去，顺便做一下持久化，
