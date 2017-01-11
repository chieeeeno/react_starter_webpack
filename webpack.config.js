const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    entry: './_src/js/index.js',
    output: {
      path: path.resolve('./js/'),
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /.jsx?$/,
          loader: 'babel',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      // new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(), 
      new webpack.optimize.AggressiveMergingPlugin(),
      new BrowserSyncPlugin({
        server: { baseDir: ['./'] }
      }), 
    ] 
  },{
    entry: {
      common: './_src/scss/style.scss'
    },
    output: {
      path: './css/',
      filename: '[name].css'
    },
    module: {
      loaders: [
        { 
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize!sass-loader')
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  }
]




// module.exports = {
//   entry: './_src/js/index.js',
//   output: {
//     path: path.resolve('./js/'),
//     filename: 'bundle.js'
//   },
//   module: {
//     loaders: [
//       {
//         test: /.jsx?$/,
//         loader: 'babel',
//         exclude: /node_modules/
//       }
//     ]
//   },
//   plugins: [
//     // new webpack.optimize.UglifyJsPlugin(),
//     new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.optimize.DedupePlugin(), 
//     new webpack.optimize.AggressiveMergingPlugin(),
//     new BrowserSyncPlugin({
//       server: { baseDir: ['./'] }
//     }), 
//   ] 
// }
