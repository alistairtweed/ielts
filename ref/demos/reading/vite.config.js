import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// base: './' so the built demo can be opened from any folder or static host.
export default defineConfig({
  base: './',
  plugins: [vue(), tailwindcss()],
})
