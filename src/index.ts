import { getCli } from "./cli"
import { getConfig } from "./config"
import { projectPrompt } from "./prompt"
import { filesChangeContent, gitClone, rmRF, pathExists } from "./utils"

const boot = async () => {
  console.log()

  const config = getConfig()
  const cli = await getCli()
  const answer = await projectPrompt(cli, config)

  const PROJECT_PATH = `${process.cwd()}/${answer.projectName}`
  const PROJECT_GIT_PATH = `${PROJECT_PATH}/.git`

  if (pathExists(PROJECT_PATH)) {
    console.error(
      `❌ Error: Cannot create project "${answer.projectName}".\n` +
      `A directory with this name already exists.\n` +
      `Please choose a different name or delete the existing folder.`
    );
    process.exit(1);
  }

  gitClone(answer.repo, answer.projectName)
  rmRF(PROJECT_GIT_PATH)

  answer.args.forEach((item) => {
    const value: string =
      item.value === "projectName" ? answer.projectName : item.value

    filesChangeContent(PROJECT_PATH, item.str, value)
  })
}

export default boot
