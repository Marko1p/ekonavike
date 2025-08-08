// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  server: {
    proxy: {
      // sve što početkom puta ima `/api` ide na port 3001
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // rewrite nije nužno, Vite sam preusmjeri `/api/...` u `http://localhost:3001/api/...`
      }
    }
  }
})
