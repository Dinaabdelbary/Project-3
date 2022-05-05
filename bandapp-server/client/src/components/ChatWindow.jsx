
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { io } from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';

function ChatInput({socket, username, room}) {

const [currentMessage, setCurrentMessage] = useState('')
const [messageList, setMessageList] = useState([])

const sendMessage = async () => {
  if (currentMessage !==  "") {
    const messageData = {  //wait till it sends this object data
      room: room,
     sender: sender,
      message: currentMessage,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    };
    // timestamp: true

    await socket.emit("send_message" , messageData)
    setMessageList((list) => [...list, messageData])
    /// displays message in your chat window as it sends
    setCurrentMessage(""); ///clears up input after you send message
  }
};

useEffect(() => {
  socket.on('received_message', (data) => {  ///fetching the message
    setMessageList((list) => [...list, data]) //to display previous messages + new message
  })
}, [socket])

  return (
      <div className='chat-window'>
    <div className='chat-header'>
      <p>Live Chat</p>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
        {messageList.map((messageContent) => {
          return (
          <div className='message' id={username === messageContent.sender ? "you" :" other"}>
            {/* the you and other displays messages left and right */}
            <div className='message-content'>
              <p>{messageContent.message}</p>
            </div>
            <div className='message-meta'>
              <p>{messageContent.time}</p>
              <p>{messageContent.sender}</p>
            </div>

          </div>)
        })}
        </ScrollToBottom>
      </div>
    {/* <div className='user-details'> */}
    {/* <div className='username'> */}
        {/* <img src="" alt="" /> */}
        {/* <h3>{currentChat.username}</h3> */}
    {/* </div> */}
    {/* </div> */}
    </div>

  <input type="text" placeholder='Hi..' onChange={(event) => {
    setCurrentMessage(event.target.value)
  }}
  onKeyPress={(event) => {
    event.key === "Enter" && sendMessage();
  }}/> 


    <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default ChatWindow