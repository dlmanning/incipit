'use strict';

var devServer = require('child_process').fork('./dev-server');

var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

var appReady = new Promise(function (resolve, reject) {
  app.on('ready', function () {
    resolve();
  });
});

var devServerReady = new Promise(function (resolve, reject) {
  devServer.on('message', function (msg) {
    resolve();
  });
});

Promise.all([appReady, devServerReady]).then(function () {
  mainWindow = new BrowserWindow({
      height: 600,
      width: 800
  });

  mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
});

app.on('will-quit', function () {
  devServer.kill();
});

devServer.on('message', function (msg) {
  console.log(msg);
});
