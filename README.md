# create-make
An advance CLI tools for creating new project from GitHub repository.

## Usage
To use this CLI tools on your system you need to install [Node.js](https://nodejs.org) and optionally you can install [yarn](https://classic.yarnpkg.com) if you want to use the second command below.

```bash
npx create-make
```

```bash
yarn create make
```


## Config

Linux:
```bash
 /home/$YOUR_USER/.local/share/create-make/config.json 
```

MacOS:
```bash
 /Users/$YOUR_USER/Library/Preferences/create-make/config.json 
```

Windows:
```bash
 C:\Users\$YOUR_USER\AppData\Roaming\create-make\config.json 
```


Example of a config.json to use with your own custom template repo for creating new project

```json
{
  "$schema": "./schema.json",
  "categories": {
    "YOUR_CATEGORIES_NAME": {
      "YOUR_TEMPLATE_NAME": {
        "repo": "git address of YOUR_TEMPLATE for clone",
        "args": [
          {
            "str": "a string in YOUR_TEMPLATE files that you want to replace by project name that user enter",
            "value": "projectName"
          }
        ]
      }
    }
  }
}
```

_Note:_ Your custom categories and templates will show up in __Others__ part of __Select a category__
