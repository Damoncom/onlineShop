import 'reset-css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router/index'

import VConsole from 'vconsole'
if (process.env.NODE_ENV !== 'local') {
  const vConsole = new VConsole({ theme: 'dark' })
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
