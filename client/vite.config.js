import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const envVariables = loadEnv(mode, process.cwd());
  const apiUrl = envVariables.VITE_API_URL || 'https://books-gallery-api.vercel.app';

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
