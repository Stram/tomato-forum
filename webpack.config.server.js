var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


module.exports = {
  target: 'node',
  entry: './server/index.js',

  output: {
    // path: path.join(__dirname, ),
    filename: 'build.js'
  },

  externals: nodeModules,
  resolve: {
    modulesDirectories: ['node_modules', path.resolve(__dirname, 'server')]
  },

  // resolve: {
  //   root: [
  //     path.join(__dirname, 'server/')
  //   ],
  //   modulesDirectories: [
  //     'node_modules'
  //   ]
  // },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-2']
      }
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.md$/,
      loader: 'ignore'
    }]
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
