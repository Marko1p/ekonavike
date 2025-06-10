import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // ↓ ne trebate nigdje navoditi postcss.config.js, Vite ga automatski učita
  // css: { postcss: './postcss.config.js' }  
})
