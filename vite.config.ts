import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/Gestor-de-Despesas-/",
  plugins: [react()],
})