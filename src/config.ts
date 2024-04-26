import {
  APP_PATH,
  CONFIG_PATH,
  DEFAULT_CATEGORIES,
  DEFAULT_SCHEMA,
  SCHEMA_PATH,
} from "./constant"
import { mkdir, pathExists, readFile, writeFile } from "./utils"

export interface TemplateArgs {
  value: string
  str: string
}

export interface Categories {
  [category: string]: {
    [template: string]: {
      repo: string
      args: TemplateArgs[]
    }
  }
}

export interface Config {
  categories: Categories
  defaultCategories: Categories
  needInit: boolean
}

export const getConfig = (): Config => {
  let needInit = false
  let config = {
    $schema: "./schema.json",
    categories: {},
  }

  if (pathExists(CONFIG_PATH)) config = JSON.parse(readFile(CONFIG_PATH))
  else needInit = true

  if (needInit) {
    mkdir(APP_PATH)
    writeFile(SCHEMA_PATH, JSON.stringify(DEFAULT_SCHEMA, null, 2))
    writeFile(CONFIG_PATH, JSON.stringify(config, null, 2))
  }

  return { ...config, needInit, defaultCategories: DEFAULT_CATEGORIES }
}
