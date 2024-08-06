import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno desde .env
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL || 'https://books-gallery-api.vercel.app'; 

  // Determinar si estamos en desarrollo o producción
  const isDevelopment = mode === 'development';

  return {
    plugins: [react()],
    root: path.resolve(__dirname, 'client'), // Ruta absoluta al directorio 'client'
    server: {
      proxy: isDevelopment ? {  // Proxy solo en desarrollo
        '/api': {
          target: apiUrl,
          changeOrigin: true, 
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: true, // Asumiendo que tu API usa HTTPS
        },
      } : {}, // No usar proxy en producción
    },
    build: {
      outDir: '../dist', 
      emptyOutDir: true, // Limpiar el directorio de salida antes de construir
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'client/src/main.jsx'), // Ruta absoluta al archivo de entrada principal
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'client/src'), // Alias para 'src'
      },
    },
  };
});
