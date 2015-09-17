var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './app/start' // Your appʼs entry point
  ],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "http://localhost:8080/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        include: [ path.resolve(__dirname, 'app') ],
        loaders: ['react-hot', 'babel-loader']
      }
    ]
  }

};
