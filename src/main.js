import 'reset-css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import { PullRefresh } from 'vant'

import App from './App.vue'
import router from './router/index'

import VConsole from 'vconsole'
if (process.env.NODE_ENV !== 'local') {
  const vConsole = new VConsole({ theme: 'dark' })
}

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersist))
app.use(router)
app.use(ElementPlus)
app.use(Vant)
app.use(PullRefresh)
app.mount('#app')
