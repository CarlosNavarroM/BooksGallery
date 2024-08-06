import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL || 'https://books-gallery-api.vercel.app';

  return {
    plugins: [react()],
    root: './client',
    server: {
      proxy: { // El proxy se mantiene para desarrollo local
        '/api': {
          target: apiUrl,
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: '../dist',
      rollupOptions: {
        input: {
          main: './client/src/main.jsx' 
        }
      }
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
});
