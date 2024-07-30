import 'reset-css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import App from './App.vue'
import router from './router/index'
// import App from './pages/signUp'
// import App from './components/verificationCode'
// import App from './pages/signIn'
// import App from './components/resetPwd'
// import App from './pages/user'
// import App from './components/bottom_nav'
// import App from './pages/editUser'
// import App from './pages/walkthrough/walkthrough'
// import App from './pages/location/location'
// import App from './pages/location/selectLocation'
import App from './pages/home/home'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
