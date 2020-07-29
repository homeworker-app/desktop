document.addEventListener('websocketMessage|type:chat.message.created', (event) => {
    let documentChatId = document.getElementById('chat-id');
    if (documentChatId && documentChatId.textContent == event.message.payload.message.chat_id)
        return
  
    if(Notification.permission != "granted")
      console.log(event.message)
  })
  
