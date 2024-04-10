import { APP_PATH, CONFIG_PATH, DEFAULT_TEMPLATE } from "./constant"
import { mkdir, pathExists, readFile, writeFile } from "./utils"

export interface Template {
  [category: string]: {
    [title: string]: {
      repo: string
    }
  }
}

interface Config {
  templates: Template
}

export const getConfig = () => {
  let needInit = false
  let config: Config = { templates: DEFAULT_TEMPLATE }

  if (pathExists(CONFIG_PATH)) config = JSON.parse(readFile(CONFIG_PATH))
  else needInit = true

  if (needInit) {
    mkdir(APP_PATH)
    writeFile(CONFIG_PATH, JSON.stringify(config))
  }

  return { ...config, needInit }
}
