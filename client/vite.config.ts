/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: [resolve(__dirname, './setup.js')],
    environment: "jsdom",
    coverage: {
      provider: "c8",
      all: true,
      exclude: ["src/**/*.main.tsx"],
      include: ["src/**/*.tsx"],
    },
  },
});