import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/super-sonic/', // 🔹 Yaha aapke GitHub repo ka exact name
});
