import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In dev, `npm run dev` serves the UI on :5173 and proxies the API to the Node server on :3000.
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://127.0.0.1:3000' } },
  build: { chunkSizeWarningLimit: 1500 },
});
