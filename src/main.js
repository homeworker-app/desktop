const { app, BrowserWindow, shell } = require('electron')
const { autoUpdater } = require("electron-updater")
const path = require("path")
const os = require("os")

// On macOS we can make a frameless app where the sidebar is drageable. Windows sucks so we can't to this here
const isDarwin = os.type().toLocaleLowerCase() == "darwin"
/* eslint-disable no-process-env */
const startUrl = process.env.START_URL || "https://homeworker.li/app-start"
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

/* eslint-disable no-console, arrow-parens */
autoUpdater.checkForUpdatesAndNotify().catch(error => console.error(error))

const navigate = (event, url) => {
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
}
const createWindow = () => {
  win = new BrowserWindow(options)
  win.setMenu(null)
  win.loadURL(startUrl)

  // Make sidebar draggable (on MacOS)
  win.webContents.on("did-finish-load", () => isDarwin ? win.webContents.insertCSS('.navigation_wrapper .desktop, #main-content { -webkit-app-region: drag } #main-content * { -webkit-app-region: no-drag }') : null)
  win.webContents.on("will-navigate", navigate)
  win.webContents.on("new-window", navigate)

  win.on('closed', () => win = null)
  win.once('ready-to-show', () => win.show())
}

app.on('window-all-closed', () => isDarwin ? null : app.quit())
app.on('activate', () => win === null ? createWindow() : null)
app.on('ready', createWindow)
