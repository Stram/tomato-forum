var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './client-react/app.js',


  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app-react.js'
  },

  resolve: {
    root: [
      path.join(__dirname, 'client-react/')
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
        presets: ['react', 'es2015', 'stage-2']
      }
    }, {
      test: /\.scss|\.css$/,
      loader: ExtractTextPlugin.extract('css?camelcase&modules&localIdentName=[name]__[local]__[hash:base64:5]!sass')
    }]
  },

  devtool: '#inline-source-map',

  sassLoader: {
    includePaths: [path.resolve(__dirname, 'client-react')]
  },

  plugins: [
    new LiveReloadPlugin(),
    new ExtractTextPlugin('styles.css')
  ]
};
