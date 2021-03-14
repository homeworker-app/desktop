const os = require("os")
const { getDisplayMedia } = require("./util/screenPicker")

document.addEventListener('websocketMessage|type:fcm-message', (event) => {
  if(Notification.permission === "granted") {
    const { notification, data } = event.message.payload
  
    if(data.link && window.location.href === data.link) return

    const notificationObject = new Notification(notification.title, data)
    notificationObject.addEventListener("click", () => {
      if(data.link) window.location = data.link
      notificationObject.close()
    })
  }
})

/* eslint-disable no-console */
window.addEventListener("load", () => {
  window.desktop = {
    call: true,
    darwin: os.type().toLocaleLowerCase() === "darwin",
  }
  window.navigator.mediaDevices.getDisplayMedia = getDisplayMedia

  // The dom-observer didn't work
  setInterval(() => document.querySelectorAll("iframe").forEach(iframe => iframe.contentWindow.navigator.mediaDevices.getDisplayMedia = getDisplayMedia), 500)
})

/* eslint-disable no-console */
console.log("Registered preload script")
