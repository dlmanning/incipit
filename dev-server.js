var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config.js');

var compiler = webpack(config, function (err, stats) {
  process.send({ status: 'ready' })
});

var server = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  stats: { colors: true },
  historyApiFallback: true
});

server.listen(8080, "localhost", function () {});
