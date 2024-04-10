import { defineConfig } from "vite"
import { swc } from "@z-code/vite-plugin-swc"
import path from "path"
import { nodeExternals } from "rollup-plugin-node-externals"

export default defineConfig({
  build: {
    lib: {
      name: "create-make",
      entry: [path.resolve(__dirname, "./src/index.ts")],
      fileName: (format, name) => {
        if (format === "es") return `${name}.js`
        else return `${name}.${format}`
      },
      formats: ["es", "cjs"],
    },
  },
  plugins: [nodeExternals(), swc()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
})
