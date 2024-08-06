import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

const apiURL = process.env.NODE_ENV === 'production' 
  ? process.env.VITE_API_URL 
  : process.env.VITE_API_URL_DEV;

export default defineConfig({
  plugins: [react()],
  root: './client',
  server: {
    proxy: {
      '/api': {
        target: apiURL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: './client/src/main.jsx' // Corrige la ruta de entrada principal
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});