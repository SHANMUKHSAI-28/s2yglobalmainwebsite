import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/pure': {
        target: 'https://s2ypureserver.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/pure/, '/api'),
        headers: {
          Origin: 'https://s2yglobal.vercel.app',
        },
      },
    },
  },
})
