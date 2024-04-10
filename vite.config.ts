import { defineConfig } from "vite"
import { swc } from "@z-code/vite-plugin-swc"
import path from "path"

export default defineConfig({
  build: {
    lib: {
      name: "create-make",
      entry: [path.resolve(__dirname, "./src/index.ts")],
      fileName: (format, name) => {
        if (format === "es") return `${name}.js`
        else return `${name}.${format}`
      },
      formats: ["cjs"],
    },
    rollupOptions: {
      external: ["fs"],
    },
  },
  plugins: [swc()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
})
