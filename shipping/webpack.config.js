const path = require('path');
const TsconfigPathsPlugin = require('webpack');

module.exports = {
  target: 'node', // IMPORTANT!
  entry: {
    QueueTrigger: path.resolve(__dirname, './QueueTrigger/index.ts')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin()
    ]
  },
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs' // IMPORTANT!
  }
};