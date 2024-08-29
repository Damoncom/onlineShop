import 'reset-css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import { PullRefresh } from 'vant'

import App from './App.vue'
import router from './router/index'

// import VConsole from 'vconsole'
// if (process.env.NODE_ENV !== 'local') {
//   const vConsole = new VConsole({ theme: 'dark' })
// }

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(ElementPlus)
app.use(Vant)
// app.use(PullRefresh)
app.mount('#app')
