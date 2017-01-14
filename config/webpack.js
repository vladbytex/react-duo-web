var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/duo.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'duo.js',
    libraryTarget: 'commonjs2',
    library: 'Duo'
  },
  externals: {
    react: 'react'
  },
  module: {
    loaders: [
      {
        test: /.+\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
