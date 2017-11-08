const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
};