// 将Axios封装成模块
import axios from 'axios'
import router from '@/router/index.js'
import { Toast } from '@/utils/extract'
import { useUserStore } from '@/stores/user'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // api的base_url
  timeout: 10000 // 请求超时时间
})

let store = null
let token
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加请求头等信息
    // 登录后才挂载user🍍
    if (!store) store = useUserStore()
    token = store.token
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${token}` //请求头加上token
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
  },
  (error) => {
    // 对响应错误做处理
    console.log('err' + error) // for debugd
    Toast('服务器异常')
    return Promise.reject(error)
  }
)
export default request
