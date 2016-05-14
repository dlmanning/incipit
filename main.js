'use strict'

const path = require('path')
const { app, BrowserWindow } = require('electron')

let mainWindow = null
const mainWindowPath = path.join(__dirname, 'app', 'index.html')

app.on('ready', createMainWindow)

// app.on('will-quit', () => devServer.kill())

function createMainWindow () {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    titleBarStyle: 'hidden'
  })

  mainWindow.loadURL(`file://${mainWindowPath}`)
}
