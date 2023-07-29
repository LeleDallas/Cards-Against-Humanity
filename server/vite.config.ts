import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      lines: 60,
      branches: 60,
      functions: 60,
      statements: 60,
      provider: "c8",
      // all: true,
      reporter: ['text', 'json-summary', 'json'],
      include: ["**/*.ts"],
      exclude: ["**/types/*.ts", "**/test/*.ts", "vite-env.d.ts", "vite.config.ts", "**/db/**/*.ts"],
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 3000,
  }
});