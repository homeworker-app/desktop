const { ipcRenderer } = require("electron")
const os = require("os")
const { getDisplayMedia } = require("./util/screenPicker")

window.addEventListener("load", () => {
  window.desktop = {
    call: true,
    darwin: os.type().toLocaleLowerCase() === "darwin",
    offerUnread: (unreadNotifications, unreadChatMessages) => ipcRenderer.invoke("unread_notifications", {unreadNotifications, unreadChatMessages}),
  }
  window.navigator.mediaDevices.getDisplayMedia = getDisplayMedia

  // Sadly it is impossible to do that with an DomObserver witch leeds ti this mess
  setInterval(() => document.querySelectorAll("iframe").forEach(iframe => iframe.contentWindow.navigator.mediaDevices.getDisplayMedia = getDisplayMedia), 500)
})

console.log("Registered preload script")
