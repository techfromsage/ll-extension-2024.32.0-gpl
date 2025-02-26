const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const fileSystem = require('fs-extra');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const env = require('./webpack/env');

const {
  BUILD_BROWSER,
  BUILD_ENVIRONMENT,
  NODE_ENV,
  ASSET_PATH,
  SENTRY_AUTH_TOKEN,
  VERSION,
  PUBLISH_ID_FIREFOX,
  PUBLISH_ENVIRONMENT,
  PUBLISH_NAME,
  CI_COMMIT_TAG,
} = env;

// Ease of use
const projectRoot = path.join(__dirname);

function resolve(dir) {
  return path.join(projectRoot, dir);
}

const alias = {
  'react-dom': '@hot-loader/react-dom',
  '@bootstrap': resolve('bootstrap/'),
  '@': resolve('src'),
};

// load the secrets
const secretsPath = path.join(__dirname, `secrets.${NODE_ENV}.js`);
const exclude = NODE_ENV === 'production'
  ? /node_modules|tests/
  : /node_modules/;

const fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
  'webm',
];

/**
 * Date stamp for build
 * @type {Date}
 */
const now = new Date();

/**
 * Regex to match the version number
 * @type {RegExp}
 */
const REGEX_VERSION = /[0-9]{4}.[0-9]+.[0-9]+/g;
const version = CI_COMMIT_TAG.length ? CI_COMMIT_TAG.match(REGEX_VERSION)[0] : VERSION;

/**
 * Add leading zero to minutes for values 0 to 9
 */
const leadingZero = num => `0${num}`.slice(-2);

/**
 * Returns the description for the manifest
 */
const descriptionBuildData = () => {
  const descriptionBuildDate = [
    now.getUTCDate(),
    now.toLocaleString('default', {month: 'short'}),
    now.getUTCFullYear(),
    '@',
    `${now.getUTCHours()}:${leadingZero(now.getUTCMinutes())} UTC`,
  ]
  return `📅 ${descriptionBuildDate.join(' ')} | 🏗 ${BUILD_ENVIRONMENT}`;
}

const buildDir = BUILD_BROWSER === 'browser' ? 'build-browser' : 'build';

const manifestDetails = {
  production: {
    name: 'Lean Library',
    description: 'A library-approved tool to unlock access to academic papers.',
  },
};

console.log(`Building the extension with;
Browser: ${BUILD_BROWSER}
Output directory: ${path.resolve(__dirname, buildDir)}
Environment: ${BUILD_ENVIRONMENT}
Debug: ${NODE_ENV === 'development' ? 'on' : 'off'}`);

if (fileSystem.existsSync(secretsPath)) {
  alias.secrets = secretsPath;
}
const options = {
  mode: NODE_ENV,
  entry: {
    options: path.join(__dirname, 'src', 'components', 'Options', 'index.jsx'),
    popup: path.join(__dirname, 'src', 'components', 'ToolbarPopup', 'index.jsx'),
    background: path.join(__dirname, 'src', 'background', 'index.ts'),
    contentScript: path.join(__dirname, 'src', 'content-script', 'index.ts'),
  },
  output: {
    path: path.resolve(__dirname, buildDir),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'],
      },
      {
        test: new RegExp(`.(${fileExtensions.join('|')})$`),
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
        exclude,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          configFile: NODE_ENV === 'production' ? 'tsconfig.prod.json' : 'tsconfig.json',
        },
        exclude,
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
        exclude,
      },
      {
        test: /bootstrap[\\\/]index\.ts$/,
        loader: 'file-replace-loader',
        options: {
          condition: 'always',
          replacement: path.resolve(`bootstrap/${BUILD_ENVIRONMENT}.ts`),
          async: true,
        },
      },
      {
        test: /src[\\\/]browserMethods[\\\/]index\.ts$/,
        loader: 'file-replace-loader',
        options: {
          condition: 'always',
          replacement: path.resolve(`src/browserMethods/${BUILD_BROWSER}.ts`),
          async: true,
        },
      },
    ],
  },
  resolve: {
    alias,
    extensions: fileExtensions
      .map(extension => `.${extension}`)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.ProgressPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin({
      NODE_ENV,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: path.join(__dirname, buildDir),
          force: true,
          transform(content) {
            let background;
            if (BUILD_BROWSER === 'browser') {
              background = { scripts: ['background.bundle.js'] }; // "persistent": false }
            } else {
              background = { service_worker: 'background.bundle.js' };
            }

            let baseManifestConfig = {};

            if (BUILD_BROWSER === 'browser') {
              baseManifestConfig = {
                options_ui: {
                  page: 'options.html',
                  browser_style: false,
                },
                browser_specific_settings: {
                  gecko: {
                    id: `${PUBLISH_ID_FIREFOX}`,
                  }
                },
              };
            } else {
              baseManifestConfig = {
                options_page: 'options.html'
              };
            }

            // generates the manifest file using the package.json information
            return Buffer.from(
              JSON.stringify(Object.assign(baseManifestConfig, {
                name: PUBLISH_NAME || manifestDetails[PUBLISH_ENVIRONMENT].name,
                description: manifestDetails[PUBLISH_ENVIRONMENT].description,
                version,
                manifest_version: 3,
                background,
                ...JSON.parse(content.toString()),
              })),
            );
          },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img/icons',
          to: path.join(__dirname, buildDir, 'icons'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/_locales',
          to: path.join(__dirname, buildDir, '_locales'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/components/Scite/SciteFont.css',
          to: path.join(__dirname, buildDir, 'sciteFont.css'),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'components', 'Options', 'index.html'),
      filename: 'options.html',
      chunks: ['options'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'components', 'ToolbarPopup', 'index.html'),
      filename: 'popup.html',
      chunks: ['popup'],
      cache: false,
    }),
  ],
  infrastructureLogging: {
    level: 'info',
  },
};

if (NODE_ENV === 'development') {
  options.devtool = 'inline-cheap-module-source-map';
  options.chromeExtensionBoilerplate = {
    notHotReload: ['contentScript', 'devtools', 'background'],
  };
} else {
  options.devtool = 'source-map';
  options.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          sourceMap: true,
        }
      }),
    ],
  };
  SENTRY_AUTH_TOKEN && (BUILD_BROWSER === 'chrome') && options.plugins.push(
    sentryWebpackPlugin({
      org: "lean-library",
      project: "browser-extension",
      authToken: SENTRY_AUTH_TOKEN,
      release: {
        name: version,
      },
    }),
  );
}

module.exports = options;
