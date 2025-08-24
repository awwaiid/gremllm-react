import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { gremllmPlugin } from '../../dist/vite-plugin.js'

// https://vite.dev/config/
export default defineConfig({
  base: '/gremllm-react/',
  plugins: [
    react(),
    gremllmPlugin({
      // You can configure the LLM service here
      defaultProvider: 'openai',
      model: 'gpt-4o-mini',
      enabled: true, // Set to false to disable build-time generation
    }) as any // eslint-disable-line @typescript-eslint/no-explicit-any -- Type assertion to bypass Vite version incompatibility
  ],
})
