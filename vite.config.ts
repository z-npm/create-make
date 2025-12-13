import { defineConfig } from "vite"
import { swc } from "@z-code/vite-plugin-swc"
import path from "path"
import { nodeExternals } from "rollup-plugin-node-externals"
import versionPlugin from "./plugin/vite-plugin-version"

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
  plugins: [
    nodeExternals(),
    versionPlugin(),
    swc(),
  ],
})
