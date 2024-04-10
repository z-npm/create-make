import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"

export const mkdir = (path: string) => mkdirSync(path, { recursive: true })

export const pathExists = (path: string) => existsSync(path)

export const readFile = (path: string) =>
  readFileSync(path, { encoding: "utf8" })

export const writeFile = (path: string, data: string) =>
  writeFileSync(path, data, { encoding: "utf8" })
