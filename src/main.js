const { app, BrowserWindow, shell } = require('electron')
const { autoUpdater } = require("electron-updater")
const path = require("path")
const os = require("os")

// On macOS we can make a frameless app where the sidebar is drageable. Windows sucks so we can't to this here
const isDarwin = os.type().toLocaleLowerCase() == "darwin"
const startUrl = "https://homeworker.li/auth/login"
const options = {
  show: false,
  title: "Homeworker",
  frame: !isDarwin,
  titleBarStyle: "hiddenInset",

  webPreferences: {
    // eslint-disable-line
    preload: path.join(__dirname, "preload.js"),
  },

  width: 1000,
  minWidth: 901,
  height: 750,
  minHeight: 500,
}

let win

autoUpdater.checkForUpdatesAndNotify()

const createWindow = () => {
  win = new BrowserWindow(options)
  win.setMenu(null)
  win.loadURL(startUrl)

  // Make sidebar draggable (on MacOS)
  win.webContents.on('did-finish-load', () => isDarwin ? win.webContents.insertCSS('.side-nav { -webkit-app-region: drag }') : null)
  win.webContents.on('new-window', (event, url) => {
    event.preventDefault()

    // A error occurs when the url is invalid (no http:// etc.)
    try {
      const parsedUrl = new URL(url)

      if(parsedUrl.host.toLowerCase() == "redirect.homeworker.li")
        shell.openExternal(url)
      else
        win.loadURL(url)
    } catch(error) {
      shell.openExternal(url)
    }
  })

  win.on('closed', () => win = null)
  win.once('ready-to-show', () => win.show())
}

app.on('window-all-closed', () => isDarwin ? null : app.quit())
app.on('activate', () => win === null ? createWindow() : null)
app.on('ready', createWindow)
