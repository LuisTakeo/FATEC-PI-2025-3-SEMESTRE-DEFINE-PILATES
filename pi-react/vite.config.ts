import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ✅ Escutar em todas as interfaces
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true, // ✅ Necessário para Docker no Windows
    },
    hmr: {
      host: 'localhost', // ✅ Hot Module Replacement
    },
    // ✅ CORREÇÃO PRINCIPAL: Permitir qualquer host do Ngrok
    allowedHosts: [
      'chronogrammatic-unamended-janay.ngrok-free.dev',
      'localhost'
    ],
  },
})
