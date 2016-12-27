const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIRNAME = __dirname + '/';

module.exports = {
  devtool: 'source-map',

  resolve: {
    modules: [path.resolve(DIRNAME), 'node_modules'],
    root: path.resolve(DIRNAME, 'app'),
  },

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.resolve(DIRNAME, 'app/js/main.js'),
  ],

  output: {
    filename: 'assets/js/[name].bundle.js',
    chunkFilename: 'assets/js/[name].chunk-[hash].js',
    publicPath: '/',
    path: path.resolve(DIRNAME, 'app'),
  },

  devServer: {
    outputPath: path.join(DIRNAME, 'dist'),
    hot: true,
    port: 3000,
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(DIRNAME),
        loader: 'babel-loader',
        query: {
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
      }
    ]
  },

  postcss: [ autoprefixer({ browsers: ['last 4 versions'] }) ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: DIRNAME + '/app/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new ExtractTextPlugin('app/assets/css/styles.css'),
    new CopyWebpackPlugin([
      { from: 'shared/img', to: 'assets/img' },
      { from: 'shared/fonts', to: 'assets/fonts' },
    ])
  ]
};
