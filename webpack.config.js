const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

dotenv.config();

module.exports = {
  entry: './src/client/index.tsx',
  mode: process.env.NODE_ENV || 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      favicon: './src/client/favicon.ico',
      title: 'Wedding Memory',
      description: "Web application for Ariel's web app"
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/client/robots.txt', to: './' },
        { from: './src/client/manifest.json', to: './' }
      ]
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ],
  output: {
    path: path.join(__dirname, 'src/client/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devServer: {
    static: path.join(__dirname, 'src/client/public'),
    compress: true,
    watchFiles: ['./src/client**'],
    hot: true,
    port: 3030
  }
};
