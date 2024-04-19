import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
  readdirSync,
  statSync,
  renameSync,
} from "fs"
import { execSync } from "child_process"
import {
  join,
  // dirname,
  basename,
} from "path"

export const mkdir = (path: string) => mkdirSync(path, { recursive: true })
export const rmRF = (path: string) =>
  rmSync(path, { recursive: true, force: true })

export const pathExists = (path: string) => existsSync(path)

export const rename = (oldPath: string, newPath: string) =>
  renameSync(oldPath, newPath)

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

export const findFile = (
  dir: string,
  fileName: string | boolean,
  exclude: string[] = ["node_modules", ".git"],
) => {
  let finds: string[] = []
  readdirSync(dir).forEach((file) => {
    const filePath = join(dir, file)

    if (!exclude.includes(filePath)) {
      const fileStat = statSync(filePath)
      if (fileStat.isDirectory())
        finds = [...finds, ...findFile(filePath, fileName)]
      else if (fileName === true) finds.push(filePath)
      else if (new RegExp("\\b" + fileName + "\\b").test(basename(file)))
        finds.push(filePath)
    }
  })

  return finds
}

export const filesFindRename = (
  path: string,
  oldName: string,
  newName: string,
) => {
  findFile(path, oldName).map((item) => {
    rename(item, item.replace(oldName, newName))
  })
}

export const filesChangeContent = (
  path: string,
  oldContent: string,
  newContent: string,
) => {
  findFile(path, true).map((item) => {
    const content = readFileSync(item, { encoding: "utf-8" })
    if (new RegExp("\\b" + oldContent + "\\b").test(content)) {
      writeFileSync(item, content.replace(oldContent, newContent), {
        encoding: "utf-8",
      })
    }

    // let result = ""
    // content.split(/\n/).forEach((line) => {
    //   if (new RegExp("\\b" + _oldName + "\\b").test(line)) result += `${line}\n`
    // })
    // console.log(item, result)
  })
}
