import { defineConfig } from "vite"
import { swc } from "@o.z/vite-plugin-swc"
import path from "path"
import { nodeExternals } from "rollup-plugin-node-externals"
import versionPlugin from "./plugin/vite-plugin-version.ts"

export default defineConfig({
  build: {
    lib: {
      name: "create-make",
      entry: [path.resolve(import.meta.dirname, "./src/index.ts")],
      fileName: (format, name) => {
        if (format === "es") return `${name}.js`
        else return `${name}.${format}`
      },
      formats: ["es", "cjs"],
    },
  },
  plugins: [nodeExternals(), versionPlugin(), swc()],
})
