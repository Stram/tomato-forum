var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './server/server.js',

  output: {
    path: path.join(__dirname, 'server'),
    filename: 'app.js'
  },

  resolve: {
    root: [
      path.join(__dirname, 'server')
    ],
    modulesDirectories: [
      'node_modules'
    ]
  },

  module: {
    exprContextCritical: false,
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-2']
      }
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },

  node: {
    console: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    module: 'empty'
  },

  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
    new webpack.IgnorePlugin(/\.(md|)$/)
  ]
};
