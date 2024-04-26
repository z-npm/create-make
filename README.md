# create-make
An advance CLI tools for creating new project from GitHub repository.

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


To use your own custom template repo for creating new project

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

_Note:_ Your custom categories and templates will show up in *Others* part of *Select a category*
