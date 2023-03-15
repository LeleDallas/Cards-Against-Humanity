/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    coverage: {
      provider: "c8",
      all: true,
      exclude: ["src/**/*.main.tsx"],
      include: ["src/**/*.tsx"],
    },
  },
});