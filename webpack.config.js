const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  context: __dirname + '/app/src',
  entry: {
    bundle: './index.js'
  },
  output: {
    path: __dirname + '/app/dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/app/src/index.html'
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.json', '.jsx']
  },
}

module.exports = config;
