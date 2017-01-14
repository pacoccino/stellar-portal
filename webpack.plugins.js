const { webpack } = require('@webpack-blocks/webpack2')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.basePlugins = [
  new HtmlWebpackPlugin({
    inject: true,
    template: './app/index.html'
  }),
  new webpack.IgnorePlugin(/ed25519/),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor'] // Specify the common bundle's name.
  })
];

exports.productionPlugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  // new webpack.optimize.DedupePlugin(),    // TODO: Does not work w/ webpack 2 yet... :-/
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    },
    screwIe8: true,
    sourceMap: false
  })
];