const { app, BrowserWindow, shell } = require('electron')
const { setup: setupPushReceiver } = require('electron-push-receiver')
const path = require("path")
const os = require("os")

const isMac = os.type().toLocaleLowerCase() == "darwin"
const url = "https://homeworker.li/auth/login"
const options = {
  show: false,
  title: "Homeworker",
  frame: isMac,
  titleBarStyle: "hiddenInset",

  webPreferences: {
     preload: path.join(__dirname, "preload.js"),
  },

  width: 1000,
  minWidth: 901,
  height: 750,
  minHeight: 500,
}
let win

const createWindow = () => {
  win = new BrowserWindow(options)
  win.loadURL(url)

  setupPushReceiver(win.webContents);

  win.webContents.on('did-finish-load', () => win.webContents.insertCSS(isMac ? '.side-nav { -webkit-app-region: drag }' : ""))
  win.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    shell.openExternal(url)
  })
  
  win.on('closed', () => win = null)
  win.once('ready-to-show', () => win.show())
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})
app.on('activate', () => {
  if (win === null)
    createWindow()
})
app.on('ready', createWindow)
