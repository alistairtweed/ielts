import path from "path"
import tailwindcss from "@tailwindcss/vite"
import vue from "@vitejs/plugin-vue"

export default {
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src")
    }
  },
  server: {
    host: "0.0.0.0",
    port: 3000
  },
  plugins: [
    tailwindcss(),
    vue()
  ]
}
