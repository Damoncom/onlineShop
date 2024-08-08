import 'reset-css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import Vue3BaiduMapGL from 'vue3-baidu-map-gl'

import App from './App.vue'
import router from './router/index'
// import App from './pages/signUp&signIn/signUp.vue'
// import App from './pages/signUp&signIn/verificationCode.vue'
// import App from './pages/signUp&signIn/signIn.vue'
// import App from './components/resetPwd'
// import App from './pages/user'
// import App from './components/bottom_nav'
// import App from './pages/editUser'
// import App from './pages/walkthrough/walkthrough'
// import App from './pages/location/location'
// import App from './pages/location/selectLocation'
// import App from './pages/home/home'
// import App from './pages/imgTest'
// import App from './pages/verticalcodeTest'
// import App from './pages/cardtest'
// import App from './components/nav'

import VConsole from 'vconsole'
if (process.env.NODE_ENV !== 'local') {
  const vConsole = new VConsole({ theme: 'dark' })
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
// app.use(Vue3BaiduMapGL)
app.mount('#app')
