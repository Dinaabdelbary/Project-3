import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { storedUser } from '../features/auth/authSlice';
// import io from "socket.io-client";
import { getPreviousMessages, sendMessage } from '../services/chat'

function Chat(props) {

  const userData = useSelector(storedUser); // returns data from redux store
  const [message, setMessage] = React.useState('');
  const participants = [props.chatId, userData.currentUser._id];

  const handleCloseChat = () => {
    props.setChatId(null)
    props.setFeed(null)
  }

  React.useEffect(() => {
    getPreviousMessages(participants).then(res => {
      props.setFeed(res)
    }).catch(err => console.log(err))
  }, [props.chatId]);

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage({ message, room: props.feed._id, sendBy: userData.currentUser }).then(() => {
      props.socketRef.current.emit('message', { message, room: props.feed._id, sendBy: userData.currentUser })
    }).catch(err => console.log(err))
  }

  const pastMessages = props.feed ? props.feed.messages.map(x => {
    return (
      <div key={x._id} className="message-bubble">
        {x.message}
      </div>
    )
  }) : []

  return (
    <div id='chat-container'>
      <button onClick={handleCloseChat}>close</button>
      <div>
        {pastMessages}
      </div>
      <form onSubmit={handleSendMessage}>
        <input type="text" name="message" value={message} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Chat