import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { Toast, Toast_Success } from '@/utils/extract'
import request from '@/axios/request.js'
import router from '@/router/index.js'

export const useUserStore = defineStore(
  'user',
  () => {
    const signInData = reactive({})
    const resp_signIn = reactive({})
    const token = ref()
    const isRemember = ref()
    const userData = reactive({})
    const resp_getUserInfo = reactive({})

    // post登录
    async function signIn(data) {
      this.signInData = data
      this.resp_signIn = await request.post('/onlineShop/signIn', data)
      token.value = this.resp_signIn.data.token
      isRemember.value = this.signInData.isRemember
      if (this.resp_signIn.errCode == 1000) {
        localStorage.setItem('token', this.resp_signIn.data.token)
        Toast_Success('Successfully!')

        // 当获取token后，自动获取用户信息并保存在pinia中
        if (localStorage.getItem('token') != null) {
          Object.assign(
            resp_getUserInfo,
            await request.get('/onlineShop/getUserInfo', { params: {} })
          )
          Object.assign(userData, resp_getUserInfo.data)
        }

        // 当用户信息获取完毕时，才跳转home页
        if (userData.name != null) {
          router.push({
            path: '/home'
          })
        }
      } else {
        Toast(this.resp_signIn.errMsg)
      }
      return token
    }

    // post注册
    async function signUp(data) {
      return await request.post('/onlineShop/signUp', data)
    }

    // const userData = reactive({})
    // const resp_getUserInfo = reactive({})
    // get用户数据
    // async function getUserInfo() {
    //   this.resp_getUserInfo = await request.get('/onlineShop/getUserInfo', { params: {} })
    //   this.userData = this.resp_getUserInfo.data
    //   return await request.get('/onlineShop/getUserInfo', { params: {} })
    // }

    return {
      signInData,
      resp_signIn,
      token,
      isRemember,
      signIn,
      signUp,
      userData,
      resp_getUserInfo
      //   getUserInfo
    }
  },
  {
    persist: true
  }
)
