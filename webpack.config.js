const pathLib = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let config = {
  entry: ["./src/woocommerce_plugin.js"],
  output: {
    path: pathLib.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}


switch (process.env.NODE_ENV) {
  case "production":
    config.devtool = "source-map"
    config.output.filename = "addressfinder.min.js"
    config.output.sourceMapFilename = 'addressfinder.map.min.js'
    config.optimization = {
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          terserOptions: {
            warnings: false
          }
        })
      ]
    }
    config.plugins = [
      new CopyPlugin([
        { from: './node_modules/@addressfinder/addressfinder-webpage-tools/lib/addressfinder-webpage-tools.map.js', to: pathLib.resolve(__dirname, "./dist") }
      ])
    ]
    break;
  default:
    config.output.filename = "addressfinder.js"
    config.optimization = {
      minimizer: []
    }
}

module.exports = config;


// exclude: /node_modules|bower_components(?!\/addressfinder-webpage-tools)/,