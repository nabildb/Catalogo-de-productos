import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    react(),
    basicSsl() // Este plugin ya activa el HTTPS por ti
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