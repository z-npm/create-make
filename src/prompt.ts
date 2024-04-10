import inquirer from "inquirer"
import { Config } from "./config"

interface ProjectPrompt {
  projectName: string
  category: string
  template: string
  repo: string
}

export const projectPrompt = async (config: Config) => {
  const defaultCategories = Object.keys(config.defaultCategories)

  const userDefineCategories = Object.keys(config.categories)
  if (userDefineCategories.length > 0) defaultCategories.push("Others")

  const answers1 = await inquirer.prompt([
    {
      name: "projectName",
      message: "Project name:",
      type: "input",
      default: "my-project",
    },
    {
      name: "category",
      message: "Select a category:",
      choices: defaultCategories,
      type: "list",
    },
  ])

  const isUserDefineCategories = answers1.category === "Others"

  if (isUserDefineCategories) {
    answers1.category = (
      await inquirer.prompt([
        {
          name: "category",
          message: "Select a category:",
          choices: userDefineCategories,
          type: "list",
        },
      ])
    ).category
  }

  const templates = isUserDefineCategories
    ? Object.keys(config.categories[answers1.category])
    : Object.keys(config.defaultCategories[answers1.category])

  const answers2 = await inquirer.prompt([
    {
      name: "template",
      message: "Select a template:",
      choices: templates,
      type: "list",
    },
  ])

  const repo = isUserDefineCategories
    ? config.categories[answers1.category][answers2.template].repo
    : config.defaultCategories[answers1.category][answers2.template].repo

  return { ...answers1, ...answers2, repo } as ProjectPrompt
}
