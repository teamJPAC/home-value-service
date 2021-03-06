const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: `${__dirname}/src/index.js`,
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [
    new CompressionPlugin(),
  ],
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/public`,
  },
};
