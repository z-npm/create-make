import { Categories } from "./config"

export const OS_NAME = process.platform
export const OS_APP_HOME =
  process.env.APPDATA ||
  (OS_NAME == "darwin"
    ? process.env.HOME + "/Library/Preferences"
    : process.env.HOME + "/.local/share")

export const APP_PATH = `${OS_APP_HOME}/create-make`
export const CONFIG_PATH = `${APP_PATH}/config.json`

export const DEFAULT_CATEGORIES: Categories = {
  TypeScript: {
    "vite-vanilla-ts": {
      name: "Vanilla",
      repo: "https://github.com/z-starter/vite-vanilla-ts.git",
      args: [
        {
          str: "vite-vanilla-ts",
          value: "projectName",
        },
      ],
    },
    "vite-phaser-ts": {
      name: "Phaser",
      repo: "https://github.com/z-starter/vite-phaser-ts.git",
      args: [
        {
          str: "vite-phaser-ts",
          value: "projectName",
        },
      ],
    },
    "vite-node-ts": {
      name: "Vite Node",
      repo: "https://github.com/z-starter/vite-node-ts.git",
      args: [
        {
          str: "vite-node-ts",
          value: "projectName",
        },
      ],
    },
    "vite-monorepo-ts": {
      name: "Vite Monorepo",
      repo: "https://github.com/z-starter/vite-monorepo-ts.git",
      args: [
        {
          str: "vite-monorepo-ts",
          value: "projectName",
        },
      ],
    },
    "vite-lib-ts": {
      name: "Vite Library",
      repo: "https://github.com/z-starter/vite-lib-ts.git",
      args: [
        {
          str: "vite-lib-ts",
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
    "An advanced CLI tool for creating projects from GitHub repositories or custom templates with lightning-fast setup.",
  type: "object",
  properties: {
    categories: {
      type: "object",
      additionalProperties: {
        type: "object",
        additionalProperties: {
          type: "object",
          properties: {
            name: {
              type: "string",
              default: "templateName"
            },
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
