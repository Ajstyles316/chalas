// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.js', 
    css: true, 
    coverage: {
      reporter: ['text', 'json', 'html'], 
    },
  },
});
