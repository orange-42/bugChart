import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  server:{
    https: false, //本地环境不用https
    hrm: true,
    host: '0.0.0.0', 
    // proxy: { //反向代理配置
    //   '/api': {
    //     target: 'http://localhost:8090/',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // },
  },
})
