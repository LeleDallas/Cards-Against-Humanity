/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [resolve(__dirname, './setup.js')],
    coverage: {
      provider: "c8",
      all: true,
      include: ["src/**/*.tsx"],
      exclude: ["src/main.tsx"],
    },
  },
});