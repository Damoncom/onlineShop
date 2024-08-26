import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { Toast, Toast_Success } from '@/utils/extract'
import request from '@/axios/request.js'
import router from '@/router/index.js'

export const useUserStore = defineStore(
  'user',
  () => {
    const resp_signIn = reactive({})
    const token = ref()
    const isRemember = ref()
    const userData = reactive({})
    const resp_getUserInfo = reactive({})

    // post登录
    async function signIn(data) {
      Object.assign(resp_signIn, await request.post('/onlineShop/signIn', data))
      token.value = this.resp_signIn.data.token
      isRemember.value = data.isRemember
      if (this.resp_signIn.errCode == 1000) {
        localStorage.setItem('token', this.resp_signIn.data.token)
        Toast_Success('Successfully!')

        // get用户信息
        // 当获取token后，自动获取用户信息并保存在pinia中
        if (localStorage.getItem('token') != null) {
          Object.assign(
            resp_getUserInfo,
            await request.get('/onlineShop/getUserInfo', { params: {} })
          )
          Object.assign(userData, resp_getUserInfo.data)
        }

        router.push({
          path: '/home'
        })
      } else {
        Toast(this.resp_signIn.errMsg)
      }
      return token
    }

    // post注册
    async function signUp(data) {
      return await request.post('/onlineShop/signUp', data)
    }

    // get用户信息
    async function getUserInfo() {
      Object.assign(resp_getUserInfo, await request.get('/onlineShop/getUserInfo', { params: {} }))
      Object.assign(userData, resp_getUserInfo.data)
    }

    // put更改用户信息
    async function updateUserInfo(data) {
      return await request.put('/onlineShop/updateUserInfo', data)
    }

    // post更改头像
    const resp_uploadImage = reactive({})
    async function uploadImage(data) {
      Object.assign(resp_uploadImage, await request.post('/onlineShop/uploadImage', data))
    }

    // get验证码
    const resp_getVerificationCode = reactive({})
    async function getVerificationCode(data) {
      Object.assign(
        resp_getVerificationCode,
        await request.get('/onlineShop/getVerificationCode', { params: { phoneNumber: data } })
      )
      return resp_getVerificationCode
    }

    // async function checkToken() {
    //   return new Promise((reactive, reject) => {
    //     if (token) return reactive()
    //     else return reject()
    //   })
    // }

    return {
      resp_signIn,
      token,
      isRemember,
      signIn,
      signUp,
      userData,
      resp_getUserInfo,
      getUserInfo,
      updateUserInfo,
      resp_uploadImage,
      uploadImage,
      resp_getVerificationCode,
      getVerificationCode
      //   checkToken
    }
  },
  {
    persist: true
  }
)
