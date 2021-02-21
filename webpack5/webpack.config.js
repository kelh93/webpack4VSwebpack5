const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: './src/index.old.js',
  cache: {
    // 缓存
    type: 'filesystem',
  },
  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|svg)/,
        type: 'asset',
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
    // importAsync: true,
    // importAwait: true
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    hot: true,
    port: 8082,
    quiet: true,
  },
  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:3000'],
        notes: ['Some additionnal notes to be displayed unpon successful compilation'],
      },
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
      // should the console be cleared between each compilation?
      // default is true
      clearConsole: true,

      // add formatters and transformers (see below)
      additionalFormatters: [],
      additionalTransformers: [],
    }),
  ],
};
