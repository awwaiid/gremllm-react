import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { gremllmPlugin } from '../../src/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    gremllmPlugin({
      // You can configure the LLM service here
      defaultProvider: 'openai',
      model: 'gpt-4o-mini',
      enabled: true, // Set to false to disable build-time generation
    })
  ],
})
