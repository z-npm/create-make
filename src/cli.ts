import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export interface Cli {
  projectName: string | undefined
  template: string | undefined
  otherTemplate: string | undefined
}

export const getCli = async (): Promise<Cli> => {
  const yargsInstance = yargs(hideBin(process.argv))
    .scriptName('create-make')
    .usage('Usage: $0 <projectName> [options]')
    .example('$0 my-project', 'Create a new project')
    .example('$0 my-project --template vite-vanilla-ts', 'Create a project with Vite web template')
    .example('$0 my-project -t vite-node-ts', 'Create a project with Vite Node template')
    .option('template', {
      alias: 't',
      type: 'string',
      description: 'Specify the template to use',
    })
    .option('other-template', {
      alias: 'o',
      type: 'string',
      description: 'Specify the other template to use',
    })
    .version()
    .alias('v', 'version')
    .help()
    .alias('h', 'help')

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
