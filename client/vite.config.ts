/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [resolve(__dirname, './setup.js')],
    coverage: {
      thresholds: {
        lines: 70,
        branches: 70,
        functions: 70,
        statements: 70,
      },
      provider: "v8",
      reporter: ['text', 'json-summary', 'json'],
      exclude: ["src/main.tsx", "src/types", "src/vite-env.d.ts", "src/reducers.ts", "src/testReducer.ts"],
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  }
});

