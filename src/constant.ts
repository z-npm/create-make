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
    "Vanilla Typescript": {
      repo: "https://github.com/z-starter/vite-vanilla-ts.git",
      args: [
        {
          str: "vite-vanilla-ts",
          value: "projectName",
        },
      ],
    },
  },
}
