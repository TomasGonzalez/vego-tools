import { defineConfig } from 'vite';
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), crossOriginIsolation()],
});
