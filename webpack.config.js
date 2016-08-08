var path = require('path');
var webpack = require('webpack');

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
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-2']
      }
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.html$/,
      loader: 'underscore-template-loader',
      query: {
        engine: 'underscore'
      }
    }, {
      test: /\.hbs$/,
      loader: 'handlebars-loader/index.js',
      query: {
        runtime: 'handlebars/dist/handlebars.runtime.js'
      }
    }]
  },

  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]
};
