import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // これで 0.0.0.0 を指定したのと同じ
    port: 5173,
  },
})
