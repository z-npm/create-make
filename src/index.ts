import { getConfig } from "./config"
import { projectPrompt } from "./prompt"
import { filesChangeContent, gitClone, rmRF } from "./utils"

const boot = async () => {
  console.log()

  const config = getConfig()
  const answer = await projectPrompt(config)

  const PROJECT_PATH = `${process.cwd()}/${answer.projectName}`
  const PROJECT_GIT_PATH = `${PROJECT_PATH}/.git`

  gitClone(answer.repo, answer.projectName)
  rmRF(PROJECT_GIT_PATH)

  answer.args.forEach((item) => {
    const value: string =
      item.value === "projectName" ? answer.projectName : item.value

    filesChangeContent(PROJECT_PATH, item.str, value)
  })
}

export default boot
