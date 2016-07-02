var path = require('path');

module.exports = {
  entry: './client/assets/javascript/app.js',

  output: {
    path: `${__dirname}/public`,
    filename: 'app.js'
  },

  resolve: {
    root: [
      path.join(__dirname, 'client/assets/javascript/vendor'),
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
    }]
  }
};
