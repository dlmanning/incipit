const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('./webpack.config.js')

const compiler = webpack(config, (err, stats) => {
  if (err) throw err
  process.send({ status: 'ready' })
})

const server = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  stats: { colors: true },
  historyApiFallback: true
})

server.listen(8080, 'localhost', function () {})
