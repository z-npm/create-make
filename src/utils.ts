import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "fs"
import { execSync } from "child_process"

export const mkdir = (path: string) => mkdirSync(path, { recursive: true })
export const rmRF = (path: string) =>
  rmSync(path, { recursive: true, force: true })

export const pathExists = (path: string) => existsSync(path)

export const readFile = (path: string) =>
  readFileSync(path, { encoding: "utf8" })

export const writeFile = (path: string, data: string) =>
  writeFileSync(path, data, { encoding: "utf8" })

export const cmd = (command: string, path: string = process.cwd()) =>
  execSync(command, {
    stdio: [0, 1, 2],
    cwd: path,
  })

export const gitClone = (repo: string, projectName: string) =>
  cmd(`git clone --depth=1 ${repo} ${projectName}`)
