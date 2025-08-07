import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/TechWave-Modern-Laptop-E-commerce-Platform/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
