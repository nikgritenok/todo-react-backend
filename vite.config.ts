import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath } from "url"

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
      @use "sass:map";
      @use "/src/styles/variables.scss" as *;
      @use "/src/styles/mixins.scss" as *;
    `,
      },
    },
  },
})
