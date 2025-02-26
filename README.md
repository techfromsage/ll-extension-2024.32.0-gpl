# LL - Browser Extension
> The LL extension is a free tool which assists your library in delivering their services directly into your research workflow in more ways than one!

## Technologies this application uses:
- [Node v18](https://nodejs.org/)
- [Chrome Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/)
- [React 17](https://reactjs.org)
- [Webpack 5](https://webpack.js.org/)
- [Webpack Dev Server 4](https://webpack.js.org/configuration/dev-server/)
- [React Refresh / Fast Refresh](https://www.npmjs.com/package/react-refresh)
- [TypeScript 4](https://www.typescriptlang.org/)

## 💻 Local development setup
For usage please refer to the [Getting Started](/#getting-started-with-local-development) section in the repo's project root and then return here.

You can Load your extension as follows:
   1. Access
      `chrome://extensions/` (Chrome)
      `opera://extensions` (Opera)
      `edge://extensions/` (Edge)
      `about:debugging` (Firefox)
   2. Check
      `Developer mode` (Chrome/Opera/Edge)
   3. Click on
      `Load unpacked extension` (Chrome/Opera/Edge)
      `This Firefox` -> `Load Temporary Add-on` (Firefox)
   4. Select the `build` folder.

Or alternative from Git Bash running just one command:
  ## Mac
  npm run start:chrome (Chrome)
  npm run start:opera (Opera)
  alias edge="/Applications/Microsoft\ Edge.app/Contents/MacOS/Microsoft\ Edge" (Edge)
  npm run start:edge (Edge)
  npm run start:firefox (Firefox)

## Development guide
All extension specific code must be placed in the `src` folder.

### Webpack auto-reload and HRM
To make your workflow much more efficient we use the [webpack server](https://webpack.github.io/docs/webpack-dev-server.html) to develop (started with `npx start`) with auto reload - reloads the browser automatically every time that you save some file in your editor.

You can run the dev mode on other port if you want. Just specify the env var `port` like this:

```zsh
$ PORT=6002 npm run start
```

## Configuration
Configuration is pulled in from the API and stored.  Any configuration that actually needs to be secret will have to set up separately.

## Useful links/ Resources
| URL                                                                                   | Description                                              |
|---------------------------------------------------------------------------------------|----------------------------------------------------------|
| [Chrome Extension documentation](https://developer.chrome.com/extensions/getstarted)  | Getting started with Creating a Chrome Browser extension |
| [Webpack documentation](https://webpack.js.org/concepts/)                             | Webpack concepts                                         |