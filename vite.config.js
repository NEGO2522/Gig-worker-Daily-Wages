import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    server: {
      historyApiFallback: true,
    },
    define: {
      'process.env': env,
    },
  }
})
