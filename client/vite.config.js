import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno desde .env
  const env = loadEnv(mode, process.cwd(), ''); 
  const apiUrl = env.VITE_API_URL; // Accede a la variable directamente

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true, // Necesario para evitar errores CORS
          rewrite: (path) => path.replace(/^\/api/, ''), // Reescribir la ruta para que coincida con tu API
          secure: false, // Solo si tu API NO usa HTTPS
        },
      },
    },
  };
});
