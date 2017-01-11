require('babel-polyfill');
var webpack = require('webpack');
var path = require('path');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEBUG = !process.argv.includes('--release');
// console.log(DEBUG); // ここは記事用に書いてるだけなので後で消す

module.exports = [
  {
    entry: [
      // 'webpack/hot/dev-server',
      // 'webpack-hot-middleware/client',
      './_src/js/index.jsx'
    ],
    output: {
      path: path.resolve('./js/'),
      // path: path.join(__dirname, 'dist'),
      // publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: [
      new BrowserSyncPlugin({
        server: { baseDir: ['./'] }
      }), 
      new webpack.optimize.OccurenceOrderPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    eslint: {
      configFile: './.eslintrc',
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loaders: ['react-hot', 'babel'],
          query:{
            presets: ['react', 'es2015']
          }
        },
        // ESLintの対象ファイルの指定
        {
          test: /\.(js|jsx)$/,
          loader: 'eslint',
          exclude: /node_modules/, // node_modules配下のファイルは対象外にする
        }
      ]
    },
    devtool: DEBUG ? 'cheap-module-eval-source-map' : false
  },{
    entry: {
      style: path.join(__dirname, '_src/scss/style.scss')
    },
    output: {
      path: './css/',
      filename: '[name].css'
    },
    module: {
      loaders: [
        { 
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style-loader','css-loader?sourceMap&minimize!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true') 
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ],
    devtool: 'source-map'
  }
]