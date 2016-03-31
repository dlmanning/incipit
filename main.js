'use strict'

const path = require('path')
const devServer = require('child_process').fork('./dev-server')
const app = require('app')
const BrowserWindow = require('browser-window')

let mainWindow = null
const mainWindowPath = path.join(__dirname, 'app', 'index.html')

const appReady = new Promise((resolve, reject) => {
  app.on('ready', () => resolve())
})

const devServerReady = new Promise((resolve, reject) => {
  devServer.on('message', msg => resolve())
})

Promise.all([appReady, devServerReady]).then(() => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    titleBarStyle: 'hidden'
  })

  mainWindow.loadURL(`file://${mainWindowPath}`)
})

app.on('will-quit', () => devServer.kill())

devServer.on('message', msg => console.log(msg))
