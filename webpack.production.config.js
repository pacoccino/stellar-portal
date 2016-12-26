const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const DIRNAME = __dirname + '/';

const CleanWebpackPluginConfig = new CleanWebpackPlugin(['app-bundle'], {
  root: DIRNAME,
  verbose: true,
  dry: false,
});

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: DIRNAME + 'app/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  resolve: {
    modules: [path.resolve(DIRNAME), 'node_modules'],
    root: path.resolve(DIRNAME, 'app/js'),
  },

  entry: [
    path.resolve(DIRNAME, 'app/js/main.js'),
    path.resolve(DIRNAME, 'app/scss/main.scss'),
  ],

  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk-[hash].js',
    publicPath: '/',
    path: path.resolve(DIRNAME, 'app-bundle'),
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve(DIRNAME),
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          notExtractLoader: 'style-loader',
          loader: 'css-loader?minimize!postcss-loader!sass-loader',
        }),
      }
    ]
  },

  postcss: [ autoprefixer({ browsers: ['last 4 versions'] }) ],

  plugins: [
    CleanWebpackPluginConfig,
    HtmlWebpackPluginConfig,
    new webpack.optimize.UglifyJsPlugin({ comments: false, sourceMap: true, warnings: false }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new ExtractTextPlugin({ filename: 'assets/css/styles.css', allChunks: false }),
    new CopyWebpackPlugin([
      { from: 'shared/img', to: 'assets/img' },
      { from: 'shared/fonts', to: 'assets/fonts' },
    ]),
  ]
};
