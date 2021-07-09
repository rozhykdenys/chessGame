const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
  index: './src/chessGame/ts/index.ts',
  contact: './src/contacts/ts/contacts.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
        ],
      },

      {
        test: /\.scss$/,
        use: [
            MiniCssPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|png|jpg)$/,
        use: {
          loader: 'url-loader',
          loader: 'svg-url-loader',
          loader: 'file-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].main.js',
  },
  plugins: [
    new HtmlPlugin({
      chunks: ['index'],
      template: './src/chessGame/index.html',
      filename: 'index.html'

    }),
    new HtmlPlugin({
      chunks: ['contacts'],
      template: './src/contacts/contacts.html',
      filename: 'contacts.html'
    }),
    new MiniCssPlugin({
      filename: './style.css',
    }),
  ],
}