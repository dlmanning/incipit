const express = require('express')
const http = require('http')
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

const keyPath = path.join(__dirname, 'certs', 'key.pem')
const certPath = path.join(__dirname, 'certs', 'cert.pem')

const httpsOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
}

const proxy = httpProxy.createProxyServer({ autoRewrite: true, changeOrigin: true, agent })
const app = express()

proxy.on('proxyRes', function (proxyRes) {
  var key = 'www-authenticate'
  proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',')
})

app.use(logger())

const APISERVER = 'https://localhost:44333'

app.get('*', (req, res) => {
  proxy.web(req, res, {
    target: `${APISERVER}`,
    secure: false
  })
})

app.get('/test', (req, res) => {
  res.end('It works?')
})

http.createServer(app).listen(7000)
https.createServer(httpsOptions, app).listen(7357)

// app.listen(7357, () => {
//   if (process.send) {
//     process.send({ status: 'ready' })
//   }
//   console.log('API Proxy listening on 7357')
// })
