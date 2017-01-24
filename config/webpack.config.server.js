const path = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader')

const projectRoot = path.resolve(__dirname, '../');

module.exports = {
  target: 'node',
  entry: path.resolve(projectRoot, 'server', 'index.js'),

  output: {
    path: path.resolve(projectRoot, 'dist'),
    filename: 'index.js'
  },

  resolve: {
    modules: [path.resolve(projectRoot, 'server'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  devtool: 'source-map',

  module: {
    rules: [{
      test: /\.tsx?$/,
      use: ['awesome-typescript-loader'],
      exclude: /(node_modules)/
    }]
  },

  plugins: [
    new CheckerPlugin()
  ]
};
