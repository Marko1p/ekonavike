// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    ...(command === 'serve'
      ? [ require('vite-plugin-vue-devtools')() ]
      : [])
  ]
}))
