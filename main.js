'use strict'

const path = require('path')
const { app, BrowserWindow } = require('electron')

const mainWindowPath = path.join(__dirname, 'app', 'index.html')

app.on('ready', createMainWindow)

// app.on('will-quit', () => devServer.kill())

function createMainWindow () {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  })

  mainWindow.loadURL(`file://${mainWindowPath}`)
}
