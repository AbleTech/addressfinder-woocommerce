const TerserPlugin = require('terser-webpack-plugin');
const pathLib = require("path");

const config = {
  entry: [
    "./src/woocommerce_plugin.js"
  ],
  devtool: 'source-map',
  output: {
    path: pathLib.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};

switch (process.env.NODE_ENV) {
  case "production":
    config.output.filename = "addressfinder.min.js";
    config.optimization = {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            warnings: false
          }
        })
      ]
    }
    break;
  default:
    config.output.filename = "addressfinder.js";
    config.optimization = {
      minimizer: []
    }
}

module.exports = config;
