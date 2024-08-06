import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno desde .env
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL || 'https://books-gallery-api.vercel.app'; // URL de tu API en Vercel

  return {
    plugins: [react()],
    base: '/',  // Ajusta esto si tu aplicación está en un subdirectorio en Vercel
    server: {
      proxy: {
        '/api': {
          target: apiUrl, 
          changeOrigin: true, 
          rewrite: (path) => path.replace(/^\/api/, ''), 
          secure: true, // Asumiendo que tu API usa HTTPS
        },
      },
    },
  };
});
