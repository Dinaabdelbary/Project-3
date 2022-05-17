import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { storedUser } from '../features/auth/authSlice';
import io from "socket.io-client";
import { getPreviousMessages, sendMessage } from '../services/chat'

function Chat(props) {

  const userData = useSelector(storedUser); // returns data from redux store
  const [feed, setFeed] = React.useState(null);
  const [message, setMessage] = React.useState('');

  const socketRef = React.useRef();
  const participants = [props.chatId, userData.currentUser._id];

  React.useEffect(() => {
    getPreviousMessages(participants).then(res => {
      setFeed(res)
    }).catch(err => console.log(err))
  }, []);

  React.useEffect(() => {
    socketRef.current = io.connect(process.env.REACT_APP_API_BASE_URL);
    socketRef.current.on('message', (messageData) => {
      console.log('GOT A MSG !!!!', messageData)
      feed && setFeed({ ...feed, messages: [...feed.messages, messageData] })
    });
  }, [feed]);

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage({ message, room: feed._id, sendBy: userData.currentUser }).then(() => {
      socketRef.current.emit('message', { message, room: feed._id, sendBy: userData.currentUser })
    }).catch(err => console.log(err))
  }

  const pastMessages = feed ? feed.messages.map(x => {
    return (
      <div key={x._id} className="message-bubble">
        {x.message}
      </div>
    )
  }) : []

  return (
    <div id='chat-container'>
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