import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import tsconfigPaths from 'vite-tsconfig-paths'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'spa',
  plugins: [react(), eslint(), tsconfigPaths()],
})
