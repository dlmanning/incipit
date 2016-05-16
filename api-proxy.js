const express = require('express')
const https = require('https')
const httpProxy = require('http-proxy')
const fs = require('fs')
const path = require('path')
const logger = require('express-log')
var Agent = require('agentkeepalive').HttpsAgent

const agent = new Agent({
  maxSockets: 100,
  keepAlive: true,
  maxFreeSockets: 10,
  keepAliveMsecs: 1000,
  timeout: 60000,
  keepAliveTimeout: 30000 // free socket keepalive for 30 seconds
})

const proxy = httpProxy.createProxyServer({ changeOrigin: true, agent })

proxy.on('proxyRes', function (proxyRes) {
  var key = 'www-authenticate'
  proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',')
})

const keyPath = path.join(__dirname, 'certs', 'key.pem')
const certPath = path.join(__dirname, 'certs', 'cert.pem')

const httpsOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
}

const app = express()

app.use(logger())

const APISERVER = 'https://dreamtime:44344'

app.get('/values', (req, res) => {
  proxy.web(req, res, {
    target: `${APISERVER}/api`,
    secure: false
  })
})

app.get('/test', (req, res) => {
  res.end('It works?')
})

https.createServer(httpsOptions, app).listen(7357, () => {
  if (process.send) {
    process.send({ status: 'ready' })
  }
})
