import { Plugin } from "vite"

const versionPlugin = (): Plugin => {
  return {
    name: 'inject-version',
    config(config) {
      config.define ??= {}
      config.define['import.meta.env.VITE_APP_VERSION'] =
        JSON.stringify(process.env.npm_package_version)

      return config
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify({ version: process.env.npm_package_version }, null, 2)
      })
    }
  }
}

export { versionPlugin }
export default versionPlugin
