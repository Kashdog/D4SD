const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000' },
    ]
  },
  plugins: [

    new ExtractTextPlugin({
      filename: './[name].css'
    }),
  ]
};