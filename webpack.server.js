const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var BowerWebpackPlugin = require("bower-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var webpack = require("webpack");
const Assets = require('./assets');

module.exports = {
  entry: './server/index.js',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [ 'css-loader' ] }) }
      ,
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
        include: [path.join(__dirname, '..', 'node_modules')],
        exclude: [path.join(__dirname, '..', 'app')],
      },
       {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000' },
    ]
  },
  plugins: [

    new ExtractTextPlugin({
      filename: './[name].css'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin(
      Assets.map(asset => {
        return {
          from: path.resolve(__dirname, `./node_modules/${asset}`),
          to: path.resolve(__dirname, './wwwroot/npm')
        };
      })
    )
  ]
};