const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-es2015-destructuring', 'transform-object-rest-spread'],
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
  devtool: 'source-map',
};
