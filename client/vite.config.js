import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  root: './client', // La carpeta 'client' es la raíz para Vite
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Asegura que el proxy apunta a tu backend
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: '../dist', // Los archivos de construcción se colocarán fuera de la carpeta 'client'
    rollupOptions: {
      input: {
        main: '/src/main.jsx' // Establece 'main.jsx' como el archivo de entrada principal
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src', // Facilita las importaciones desde la carpeta 'src'
    },
  },
});
