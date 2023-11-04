/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
// import tsconfig from "vite-tsconfig-paths";
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  //   plugins: [react(), tsconfig()],
  plugins: [react()],
  test: {
    coverage: {
      clean: true,
      enabled: true,
      provider: 'v8',
      reporter: ['lcov', 'clover'],
      reportsDirectory: './coverage',
    },
    environment: 'jsdom',
    globals: true,
    include: [
      './src/components/**/*.test.{tsx,ts}',
      './src/utils/**/*.test.{tsx,ts}',
      './src/effects/**/*.test.{ts,tsx}',
    ],
    maxThreads: 12,
    minThreads: 5,
    setupFiles: './test-setup.js',
    silent: true,
    threads: true,
    update: true,
  },
});
