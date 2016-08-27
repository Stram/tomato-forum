var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './client/app.js',


  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js'
  },

  resolve: {
    root: [
      path.join(__dirname, 'client/')
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
      loader: 'handlebars-template-loader/index.js',
      query: {
        runtime: 'handlebars/dist/handlebars.runtime.js',
        noConflict: true
      }
    }, {
      test: /\.scss|\.css$/,
      loader: ExtractTextPlugin.extract('css?camelcase&modules&localIdentName=[name]__[local]__[hash:base64:5]!sass')
    }]
  },

  macros: {
    svg(name) {
      var svgPath = path.join('public', 'images', `${name}.svg`);
      var svg = fs.readFileSync(svgPath, 'utf-8');
      return JSON.stringify(svg);
    }
  },

  devtool: "#inline-source-map",

  sassLoader: {
    includePaths: [path.resolve(__dirname, 'client')]
  },

  plugins: [
    new LiveReloadPlugin(),
    new ExtractTextPlugin('styles.css')
  ]
};
