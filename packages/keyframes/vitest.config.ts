import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/__tests__/**/*.{js,ts}'],
    globals: false,
    environment: 'jsdom',
  },
  esbuild: {
    target: 'esnext',
  },
})

