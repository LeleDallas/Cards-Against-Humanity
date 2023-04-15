import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: "c8",
      all: true,
      include: ["**/*.ts"],
      exclude: ["**/types/*.ts", "**/test/*.ts", "vite-env.d.ts", "vite.config.ts", "**/db/**/*.ts"],
    },
  },
});