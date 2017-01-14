const {
  addPlugins, createConfig, defineConstants, entryPoint, env, performance, setOutput, sourceMaps, webpack
} = require('@webpack-blocks/webpack2');

const babel = require('@webpack-blocks/babel6');
const cssModules = require('@webpack-blocks/css-modules');
const devServer = require('@webpack-blocks/dev-server2');
const extractText = require('@webpack-blocks/extract-text2');
const plugins = require('./webpack.plugins');

const DIRNAME = __dirname + '/';
const buildDir = __dirname + '/build/';

module.exports = createConfig([
  setOutput({
    filename: '[hash].[name].js',
    path: buildDir
  }),
  babel(),
  cssModules(),
  addPlugins(plugins.basePlugins),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV || 'development'
  }),
  env('development', [
    entryPoint({
      main: DIRNAME + 'app/js/main.js',}),
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
      main: DIRNAME + 'app/js/main.prod.js',
      vendor: 'stellar-sdk'
    }),
    extractText(),
    addPlugins(plugins.productionPlugins)
  ])
]);