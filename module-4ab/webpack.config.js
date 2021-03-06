const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: ['@babel/polyfill', './module-4ab/index.js'],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:7000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist'],
    }),
    new HtmlWebpackPlugin({
      template: './module-4ab/index.html',
    }),
  ],
  output: {
    filename: '[name].bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
