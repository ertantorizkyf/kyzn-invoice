import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_FE_PORT) || 5051,
    historyApiFallback: true,
  },
})
