import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { CONFIG_PATH } from './constant';

export interface Cli {
  projectName: string | undefined
  template: string | undefined
  otherTemplate: string | undefined
}

export const getCli = async (): Promise<Cli> => {
  const yargsInstance = yargs(hideBin(process.argv))
    .scriptName('create-make')
    .usage('Usage: $0 [projectName] [options]')
    .epilogue(`
📦 Create projects in seconds with built-in or custom templates!

Quick Start:
  • Interactive mode:        $0                           (Guided setup)
  • Built-in template:       $0 my-app -t vite-vanilla-ts (Skip prompts)
  • Custom template:         $0 my-project -o express-api (Use custom config)

💡 Tips:
  • When using --template or --other-template, projectName is required
  • Omit projectName to be prompted for it
  • Add custom templates via config file at ${CONFIG_PATH}

For more information, visit: https://github.com/z-npm/create-make
`)
    .example('$0', 'Start interactive mode - guided project setup')
    .example('$0 my-project', 'Set project name, then choose template interactively')
    .example('$0 my-app --template vite-vanilla-ts', 'Create Vite web project (skips prompts)')
    .example('$0 my-api -t vite-node-ts', 'Create Vite Node project (alias, skips prompts)')
    .example('$0 my-project --other-template my-backend', 'Use custom template from config')
    .example('$0 my-site -o react-starter', 'Use custom template (alias)')
    .option('template', {
      alias: 't',
      type: 'string',
      describe: 'Use built-in template (skips category/template selection)',
      requiresArg: true,
      conflicts: 'other-template'
    })
    .option('other-template', {
      alias: 'o',
      type: 'string',
      describe: 'Use custom template from config (skips to custom template selection)',
      requiresArg: true,
      conflicts: 'template'
    })
    .option('help', {
      alias: 'h',
      type: 'boolean',
      describe: 'Show help information'
    })
    .check((argv) => {
      if ((argv.template || argv['other-template']) && !argv._[0]) {
        throw new Error('Project name is required when using --template or --other-template');
      }
      return true;
    })
    // .wrap(Math.min(100, yargs.terminalWidth()))
    .help('help', 'Show this help message')
    .alias('help', 'h')
    .version()
    .alias('v', 'version')
    .demandCommand(0, 1, 'Provide at most one project name')
    .strict();

  const argv = await yargsInstance.parseAsync();

  const projectName = argv._[0] as any;
  const template = argv.template;
  const otherTemplate = argv.otherTemplate

  if ((template || otherTemplate) && !projectName) {
    console.error('❌ Error: Project name is required');
    console.error('📖 Usage: create-make <project-name>');
    console.error('💡 Example: create-make my-project');
    process.exit(2)
  }

  return { projectName, template, otherTemplate }
}
