var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './client/assets/javascript/app.js',

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js'
  },

  resolve: {
    root: [
      path.join(__dirname, 'client/assets/javascript')
    ],
    modulesDirectories: [
      'node_modules'
    ]
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-2']
      }
    }, {
      test: /\.hbs$/,
      loader: 'handlebars-loader/index.js',
      query: {
        runtime: 'handlebars/dist/handlebars.runtime.js'
      }
    }, {
      test: /\.scss|\.css$/,
      loader: ExtractTextPlugin.extract('css?camelcase&modules&localIdentName=[name]__[local]__[hash:base64:5]!sass')
    }]
  },

  sassLoader: {
    includePaths: [path.resolve(__dirname, 'client/javascript')]
  },

  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
    new ExtractTextPlugin('styles.css')
  ]
};
