const os = require("os")
const { getDisplayMedia } = require("./util/screenPicker")

// Got notification from websocket
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

window.addEventListener("load", () => {
  window.desktop = {
    call: true,
    darwin: os.type().toLocaleLowerCase() === "darwin",
    offerUnread: (unreadNotifications, unreadChatMessages) => {
      // TODO: use ipc renderer to send this to main
      console.log("Got unread", unreadNotifications, unreadChatMessages)
    },
  }
  window.navigator.mediaDevices.getDisplayMedia = getDisplayMedia

  // Sadly it is impossible to do that with an DomObserver witch leeds ti this mess
  setInterval(() => document.querySelectorAll("iframe").forEach(iframe => iframe.contentWindow.navigator.mediaDevices.getDisplayMedia = getDisplayMedia), 500)
})

console.log("Registered preload script")
