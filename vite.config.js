import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), basicSsl()],
  server: {
    // host: '0.0.0.0',
    // host设置为true才可以使用network的形式，以ip访问项目
    host: true,
    // 端口号
    port: 8080,
    // 自动打开浏览器
    cors: true,
    // 如果端口已占用直接退出
    strictPort: true,

    proxy: {
      '/onlineShop': {
        target: 'http://192.168.100.7:7001',
        changeOrigin: true //是否跨域
        // rewrite: (path) => path.replace(/^\/onlineShop/, ''), //因为后端接口有onlineShop前缀，所以不需要替换
      }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
