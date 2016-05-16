'use strict'

const path = require('path')
const { app, BrowserWindow } = require('electron')
const apiProxy = require('child_process').fork('./api-proxy')

let mainWindow = null
const mainWindowPath = path.join(__dirname, 'app', 'index.html')

collect({
  ready: app,
  message: apiProxy
}).then(createMainWindow)

function createMainWindow () {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  })

  mainWindow.loadURL(`file://${mainWindowPath}`)
}

app.on('login', loginWithCredentials)
app.on('will-quit', () => apiProxy.kill())
app.on('certificate-error', verifyCert)

function verifyCert (event, webContents, url, error, cert, cb) {
  event.preventDefault()
  cb(true)
}

function loginWithCredentials (event, webContents, request, authInfo, cb) {
  event.preventDefault()
  cb('david', 'password')
}

function collect (events) {
  const eventNames = Object.keys(events)
  const eventGroup = eventNames.map(eventName =>
    new Promise((resolve, reject) => {
      events[eventName].on(eventName, resolve)
    })
  )

  return Promise.all(eventGroup).then(results =>
    results.reduce((accum, result, idx) => {
      accum[eventNames[idx]] = result
      return accum
    }, {})
  )
}
