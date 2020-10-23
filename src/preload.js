document.addEventListener('websocketMessage|type:fcm-message', (event) => {
  if(Notification.permission == "granted") {
    const { notification, data } = event.message.payload
  
    if(data.link && window.location.href == data.link) return
    if(notification.icon) notification.icon = null

    const notificationObject = new Notification(notification.title, notification)
  
    notificationObject.addEventListener("click", () => {
      if(data.link) window.location = data.link
      notificationObject.close()
    })
  }
})

console.log("Registered preload script")