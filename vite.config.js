import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    proxy: {
      // Redirige las solicitudes de /api al backend
      '/api': {
        target: 'http://localhost:3001', // URL de tu backend
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // si tu backend no espera /api
      }
    }
  }
})