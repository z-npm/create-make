// import { version } from "../package.json"
import { Categories } from "./config"

export const OS_NAME = process.platform
export const OS_APP_HOME =
  process.env.APPDATA ||
  (OS_NAME == "darwin"
    ? process.env.HOME + "/Library/Preferences"
    : process.env.HOME + "/.local/share")

// export const APP_VERSION = version
export const APP_PATH = `${OS_APP_HOME}/create-make`
export const CONFIG_PATH = `${APP_PATH}/config.json`

export const DEFAULT_CATEGORIES: Categories = {
  TypeScript: {
    Vanilla: {
      repo: "https://github.com/z-starter/vite-vanilla-ts.git",
      args: [
        {
          str: "vite-vanilla-ts",
          value: "projectName",
        },
      ],
    },
    Phaser: {
      repo: "https://github.com/z-starter/vite-phaser-ts.git",
      args: [
        {
          str: "vite-phaser-ts",
          value: "projectName",
        },
      ],
    },
    "Vite Node": {
      repo: "https://github.com/z-starter/vite-node-ts.git",
      args: [
        {
          str: "vite-node-ts",
          value: "projectName",
        },
      ],
    },
    "Rollup Node": {
      repo: "https://github.com/z-starter/rollup-node-ts.git",
      args: [
        {
          str: "rollup-node-ts",
          value: "projectName",
        },
      ],
    },
    "Vite Monorepo": {
      repo: "https://github.com/z-starter/vite-monorepo-ts.git",
      args: [
        {
          str: "vite-monorepo-ts",
          value: "projectName",
        },
      ],
    },
  },
}

export const SCHEMA_PATH = `${APP_PATH}/schema.json`

export const DEFAULT_SCHEMA = {
  $schema: "https://json-schema.org/draft-07/schema",
  $id: "https://example.com/product.schema.json",
  title: "Create Make",
  description:
    "An advance CLI tools for creating new project from GitHub repository.",
  type: "object",
  properties: {
    categories: {
      type: "object",
      additionalProperties: {
        type: "object",
        additionalProperties: {
          type: "object",
          properties: {
            repo: {
              type: "string",
              default: "repoUrl",
            },
            args: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  str: {
                    type: "string",
                    default: "contentToReplace",
                  },
                  value: {
                    type: "string",
                    default: "projectName",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}
