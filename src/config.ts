import { APP_PATH, CONFIG_PATH, DEFAULT_CATEGORIES } from "./constant"
import { mkdir, pathExists, readFile, writeFile } from "./utils"

export interface Categories {
  [category: string]: {
    [template: string]: {
      repo: string
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
  let config = { categories: {} }

  if (pathExists(CONFIG_PATH)) config = JSON.parse(readFile(CONFIG_PATH))
  else needInit = true

  if (needInit) {
    mkdir(APP_PATH)
    writeFile(CONFIG_PATH, JSON.stringify(config, null, 2))
  }

  return { ...config, needInit, defaultCategories: DEFAULT_CATEGORIES }
}
