import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Own port so it never collides with digitaldownload (5173)
    port: 5175,
    // Expose on the LAN → vite prints the Network URL
    host: '0.0.0.0',
    // Allow ngrok tunnel hosts
    allowedHosts: ['.ngrok-free.app'],
  },
})