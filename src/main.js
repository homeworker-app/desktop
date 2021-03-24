const { app, BrowserWindow, shell, systemPreferences } = require('electron')
const { autoUpdater } = require("electron-updater")
const path = require("path")
const os = require("os")
const fs = require('fs')

// On macOS we can make a frameless app where the sidebar is drageable. Windows sucks so we can't to this here
const isDarwin = os.type().toLocaleLowerCase() === "darwin"
/* eslint-disable no-process-env */
const startUrl = process.env.START_URL || "https://homeworker.li/app-start"
const options = {
  show: false,
  title: "Homeworker",
  frame: !isDarwin,
  titleBarStyle: "hidden",

  webPreferences: {
    // eslint-disable-line
    preload: path.join(__dirname, "preload.js"),
    webSecurity: false,
  },

  width: 1000,
  minWidth: 901,
  height: 750,
  minHeight: 500,
}

let win
let splash

/* eslint-disable no-console, arrow-parens */
autoUpdater.checkForUpdatesAndNotify().catch(error => console.error(error))

const navigate = (event, url) => {
  event.preventDefault()

  // A error occurs when the url is invalid (no http:// etc.)
  try {
    const parsedUrl = new URL(url)

    if(parsedUrl.host.toLowerCase() === "redirect.homeworker.li")
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
  win.loadURL(startUrl, { userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36" })

  // Make sidebar draggable (on MacOS)
  win.webContents.on("did-finish-load", () => {
    if(isDarwin)
      win.webContents.insertCSS(".navigation_wrapper *, #main-content { -webkit-app-region: drag } #main-content * { -webkit-app-region: no-drag }")

    fs.readFile(`${__dirname}/style/screenPicker.css`, "utf-8", (error, data) => {
      if(error) console.error(error)
      
      win.webContents.insertCSS(data.replace(/\s{2,10}/g, ' ').trim())
    })
  })
  win.webContents.on("will-navigate", navigate)
  win.webContents.on("new-window", navigate)

  win.on('closed', () => win = null)
  win.once('ready-to-show', async () => {
    splash.destroy()
    win.show()

    try {
      await systemPreferences.askForMediaAccess("microphone")
      await systemPreferences.askForMediaAccess("camera")
    } catch (error) {
      console.error("Failed to get media access", error)
    }
  })

  splash = new BrowserWindow({
    width: 810,
    height: 610,
    transparent: true,
    frame: false,
    alwaysOnTop: true
  })
  splash.loadURL(`file://${__dirname}/util/splash.html`)
}

app.on('window-all-closed', () => isDarwin ? null : app.quit())
app.on('activate', () => win === null ? createWindow() : null)
app.on('ready', createWindow)
