document.addEventListener('websocketMessage|type:fcm-message', (event) => {
  if(Notification.permission == "granted") {
    const { notification, data } = event.message.payload
  
    if(data.link && window.location.href == data.link) return

    const notificationObject = new Notification(notification.title, notification)
  
    notificationObject.addEventListener("click", () => {
      if(data.link) window.location = data.link
      notificationObject.close()
    })
  }
})
