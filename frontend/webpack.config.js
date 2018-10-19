const webpack = require('webpack');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: 'src/public',
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 80,
  },
  devtool: 'eval',
  output: {
    filename: 'index.jsx',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'es2016'] },
        },
        ],
      },
      {
        test: /\.(jse|jsxe)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'eslint-loader',
          options: {
            emitError: true,
            failOnWarning: true,
          },
        },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/public/index.html' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new TransferWebpackPlugin([
      { from: 'src/public' },
    ], '.'),
    new webpack.DefinePlugin({
      'process.env': {
        API_URI: JSON.stringify(process.env.API_URI || 'http://0.0.0.0:9000/api'),
      },
    }),
  ],
};
