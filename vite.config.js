import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true
  },
  plugins: [vue(), vueDevTools(), basicSsl()],
  server: {
    host: '0.0.0.0',

    proxy: {
      // '/api': {
      //   target: 'http://192.168.100.7:7001',
      //   changeOrigin: true, //是否跨域
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
      '/onlineShop': {
        target: 'http://192.168.100.9:7001',
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
