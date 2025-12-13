import inquirer, { Question } from "inquirer"
import { Config, TemplateArgs } from "./config"
import { Cli } from "./cli"
import { CONFIG_PATH } from "./constant"


interface ProjectPrompt {
  projectName: string
  category: string
  template: string
  repo: string
  args: TemplateArgs[]
}

export const projectPrompt = async (cli: Cli, config: Config): Promise<ProjectPrompt> => {
  if (cli.projectName && cli.template) {
    const dcArr = config.defaultCategories
    const tStrArr = []

    for (const category in dcArr) {
      for (const template in dcArr[category]) {
        const args = dcArr[category][template].args
        const repo = dcArr[category][template].repo
        tStrArr.push(template)

        if (args[0].str === cli.template)
          return { category, template, projectName: cli.projectName, args, repo }
      }
    }
    console.error(
      `❌ Error: Template "${cli.template}" was not found.\n` +
      `Available templates:\n` +
      `  • ${tStrArr.join('\n  • ')}\n` +
      `Please select one of the templates above.`
    );
    process.exit(2)
  }


  if (cli.projectName && cli.otherTemplate) {
    const ucArr = config.categories
    const tStrArr = []

    for (const category in ucArr) {
      for (const template in ucArr[category]) {
        const args = ucArr[category][template].args
        const repo = ucArr[category][template].repo
        tStrArr.push(template)

        if (args[0].str === cli.otherTemplate)
          return { category, template, projectName: cli.projectName, args, repo }
      }
    }

    const eMsg = (tStrArr.length > 0) ?
      (`Available templates:\n` +
        `  • ${tStrArr.join('\n  • ')}\n` +
        `Please select one of the templates above.`)
      : (`\nNo custom templates are currently configured.\n` +
        `Please check your configuration at:\n  ${CONFIG_PATH}\n\n` +
        `To add templates, edit the configuration file and add template definitions.`)

    console.error(`❌ Error: Template "${cli.otherTemplate}" was not found.\n${eMsg}`);
    process.exit(2)
  }

  const prompt1: Question[] = []
  const defaultCategories = Object.keys(config.defaultCategories)
  const userDefineCategories = Object.keys(config.categories)
  if (userDefineCategories.length > 0) defaultCategories.push("Others")

  if (!(cli.projectName))
    prompt1.push({
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-project",
    })

  prompt1.push(
    {
      type: "select",
      name: "category",
      message: "Select a category:",
      choices: defaultCategories,
    },
  )


  try {

    const answers1 = await inquirer.prompt(prompt1)
    answers1.projectName ??= cli.projectName;

    const isUserDefineCategories = answers1.category === "Others"

    if (isUserDefineCategories) {
      answers1.category = (
        await inquirer.prompt([
          {
            type: "select",
            name: "category",
            message: "Select a category:",
            choices: userDefineCategories,
          },
        ])
      ).category
    }

    const templates = []
    if (isUserDefineCategories)
      for (const key in config.categories[answers1.category]) {
        const tobj = config.categories[answers1.category][key]
        if (tobj.name)
          templates.push({ name: `${tobj.name}(${key})`, value: key })
        else
          templates.push({ name: key, value: key })
      }
    else
      for (const key in config.defaultCategories[answers1.category]) {
        const tobj = config.defaultCategories[answers1.category][key]
        if (tobj.name)
          templates.push({ name: `${tobj.name}(${key})`, value: key })
        else
          templates.push({ name: key, value: key })
      }

    const answers2 = await inquirer.prompt([
      {
        type: "select",
        name: "template",
        message: "Select a template:",
        choices: templates,
      },
    ])

    const repo = isUserDefineCategories
      ? config.categories[answers1.category][answers2.template].repo
      : config.defaultCategories[answers1.category][answers2.template].repo

    const args = isUserDefineCategories
      ? config.categories[answers1.category][answers2.template].args
      : config.defaultCategories[answers1.category][answers2.template].args

    return { ...answers1, ...answers2, repo, args } as ProjectPrompt


  } catch (error: any) {
    if (error.name === 'ExitPromptError') {
      console.log('\nProcess interrupted. Exiting gracefully.');
      process.exit(0); // Exit cleanly
    } else {
      // Re-throw unexpected errors
      throw error;
    }
  }
}
