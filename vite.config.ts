import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        'vite-plugin': 'src/vite-plugin.ts'
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'vite', 'node:fs', 'node:path', 'node:crypto'],
    },
  },
});