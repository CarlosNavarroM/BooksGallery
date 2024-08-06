import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    root: './client',
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL_DEV,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
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
