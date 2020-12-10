document.addEventListener('websocketMessage|type:fcm-message', (event) => {
  if(Notification.permission == "granted") {
    const { notification, data } = event.message.payload
  
    if(data.link && window.location.href == data.link) return

    const notificationObject = new Notification(notification.title, data)
  
    notificationObject.addEventListener("click", () => {
      if(data.link) window.location = data.link
      notificationObject.close()
    })
  }
})

/* eslint-disable no-console */
window.addEventListener("load", () => window ? window.desktop = { call: true } : console.error("window is missing"))

/* eslint-disable no-console */
console.log("Registered preload script")
