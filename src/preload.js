document.addEventListener('websocketMessage|type:fcm-message', (event) => {
    if(Notification.permission == "granted") {
      const { notification, data } = event.message.payload
  
      console.log(window.location.pathname);
  
      if(data.link && window.location.href == data.link) return
      const notificationObject = new Notification(notification.title, { body, icon, tag } = notification)
  
      notificationObject.addEventListener("click", () => {
        if(data.link) window.location = data.link
        notificationObject.close()
      })
    }
  })
  