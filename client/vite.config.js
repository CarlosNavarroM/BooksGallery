import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  root: './client',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
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