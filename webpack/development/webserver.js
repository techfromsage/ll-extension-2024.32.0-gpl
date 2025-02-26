// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.ASSET_PATH = '/';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');
const config = require('../../webpack.config');
const env = require('../env');

const options = config.chromeExtensionBoilerplate || {};
const excludeEntriesToHotReload = options.notHotReload || [];

Object.keys(config.entry).forEach(key => {
  if (excludeEntriesToHotReload.indexOf(key) === -1) {
    config.entry[key] = [
      'webpack/hot/dev-server',
      `webpack-dev-server/client?hot=true&hostname=localhost&port=${env.PORT}`,
    ].concat(config.entry[key]);
  }
});

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(
  config.plugins || [],
);

delete config.chromeExtensionBoilerplate;

const compiler = webpack(config);
const buildDir = env.BUILD_BROWSER === 'browser' ? 'build-browser' : 'build';

const server = new WebpackDevServer(
  {
    https: false,
    hot: false,
    client: false,
    host: '0.0.0.0',
    port: env.PORT,
    static: {
      directory: path.join(__dirname, `../../${buildDir}`),
    },
    devMiddleware: {
      publicPath: `0.0.0.0:${env.PORT}/`,
      writeToDisk: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: 'all',
  },
  compiler,
);

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept();
// }

  server.start();
(async () => {
})();
