import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  server: {
    proxy: {
      // Proxy API requests to backend running on http://localhost:3000
      '/api': {
        target: 'https://c1a2-105-113-59-239.ngrok-free.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Optional: remove /api prefix
      }
    }
  }
})
