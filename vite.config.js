import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno desde .env
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL || 'https://books-gallery-api.vercel.app'; // URL por defecto en caso de no encontrar la variable

  // Determinar si estamos en desarrollo o producción
  const isDevelopment = mode === 'development';

  return {
    plugins: [react()],
    base: isDevelopment ? '/' : '/books-gallery-zeta/', // Base para producción (si es diferente)
    server: {
      proxy: isDevelopment ? {  // Proxy solo en desarrollo
        '/api': {
          target: apiUrl,
          changeOrigin: true, 
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false, // Solo si tu API NO usa HTTPS
        },
      } : {}, // No hay proxy en producción
    },
    build: {
      outDir: 'dist', // Directorio de salida para la compilación de producción
    },
  };
});
