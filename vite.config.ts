import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  test: {
    ...configDefaults,
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts'
  }
});
