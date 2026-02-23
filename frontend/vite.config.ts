import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
// 1. Borra o comenta la importación de basicSsl
// import basicSsl from '@vitejs/plugin-basic-ssl'; 

export default defineConfig({
  plugins: [
    react(),
    // 2. Borra o comenta esta línea para desactivar el HTTPS
    // basicSsl() 
  ],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});