// require('babel-polyfill');
const path = require('path');
const webpack = require('webpack');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEBUG = !process.argv.includes('--release');
console.log(DEBUG); // ここは記事用に書いてるだけなので後で消す

// const plugins = [
//   new webpack.HotModuleReplacementPlugin(), // 追加
//   new webpack.optimize.OccurenceOrderPlugin()
// ];

// if(!DEBUG) {
//   plugins.push(
//     new webpack.optimize.UglifyJsPlugin({ compress: { screw_ie8: true, warnings: false } }),
//     new webpack.optimize.DedupePlugin(),
//     new webpack.optimize.AggressiveMergingPlugin()
//   );
// }


module.exports = [
  {
    entry: path.join(__dirname, '_src/js/index.jsx'),
    // entry: './_src/js/index.jsx',
    output: {
      path: path.resolve('./js/'),
      filename: 'bundle.js'
    },
    // ここを追記
    devServer: {
      hot: true, // 追加
      contentBase: './',
      port: 5000,
      inline: true
    },
    eslint: {
      configFile: './.eslintrc',
    },
    devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          // loader: 'babel',
          // 以下書き換え
          loaders: [
            'react-hot',
            'babel'
          ],
          exclude: /node_modules/,
          // query: {
          //   presets: ['es2015', 'react']
          // }
        },
        // ESLintの対象ファイルの指定
        {
          test: /\.(js|jsx)$/,
          loader: 'eslint',
          exclude: /node_modules/, // node_modules配下のファイルは対象外にする
        }
      ]
    },
    // plugins: plugins
    plugins: [
      // Webpack 1.0
      new webpack.optimize.OccurenceOrderPlugin(),
      // Webpack 2.0 fixed this mispelling
      // new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
      // new webpack.optimize.UglifyJsPlugin(),
      // new webpack.optimize.OccurenceOrderPlugin(),
      // new webpack.optimize.DedupePlugin(), 
      // new webpack.optimize.AggressiveMergingPlugin(),
      // new BrowserSyncPlugin({
      //   server: { baseDir: ['./'] }
      // }), 
    ] 
  },{
    entry: {
      style: path.join(__dirname, '_src/scss/style.scss')
      // style: './_src/scss/style.scss'
    },
    output: {
      path: './css/',
      filename: '[name].css'
    },
    module: {
      loaders: [
        { 
          test: /\.scss$/,
          loaders: [
            'react-hot',
            ExtractTextPlugin.extract('style-loader', 'css-loader?minimize!sass-loader')
          ],
          // loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize!sass-loader')
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
