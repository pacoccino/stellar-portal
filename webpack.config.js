const {
  addPlugins, resolveAliases, createConfig, defineConstants, entryPoint, env, performance, setOutput, sourceMaps, webpack
} = require('@webpack-blocks/webpack2');

const path = require('path');

const babel = require('@webpack-blocks/babel6');
const cssModules = require('@webpack-blocks/css-modules');
const sass = require('@webpack-blocks/sass');
const devServer = require('@webpack-blocks/dev-server2');
const extractText = require('@webpack-blocks/extract-text2');
const plugins = require('./webpack.plugins');

const config = require('./config');

const appDir = config.appPath;
const buildDir = config.buildPath;

module.exports = createConfig([
  setOutput({
    filename: '[hash].[name].js',
    path: buildDir()
  }),
  babel(),
  cssModules(),
  sass(),
  addPlugins(plugins.basePlugins),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV || 'development',
  }),
  resolveAliases({
    styles: appDir('styles'),
    images: appDir('images'),
    js: appDir('js'),
  }),
  env('development', [
    entryPoint({
      main: appDir('js/main.js'),
    }),
    sourceMaps(),
    devServer(),
    /*devServer.proxy({
     '/api/!*': { target: 'http://localhost:4000' }
     }),*/
    performance({
      // Increase performance budget thresholds for development mode
      maxAssetSize: 15000000,
      maxEntrypointSize: 15000000
    })
  ]),
  env('production', [
    entryPoint({
      main: appDir('js/main.prod.js'),
      vendor: 'stellar-sdk'
    }),
    extractText(),
    performance({
      // Increase performance budget thresholds for development mode
      maxAssetSize: 15000000,
      maxEntrypointSize: 15000000
    }),
    addPlugins(plugins.productionPlugins)
  ])
]);
