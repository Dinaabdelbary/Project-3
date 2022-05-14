import { compileClientWithDependenciesTracked } from 'jade';
import React from 'react'

function Chat(props) {
  const [feed, setFeed] = React.useState([]);
  const socketRef = React.useRef();

React.useEffect(() => {
  chat.getPreviousMessages(room).then(res => setFeed(res.data)).catch(err => console.log(err))
}, []);

React.useEffect(() => {
  socketRef.current = io.connect(process.env.REACT_APP_API_BASE_URL);
  socketRef.current.on('message', (messageData) => {
    setFeed([...feed, messageData])
  });
  return () => socketRef.current.disconnet();
},[feed]);

const handleSendMessage = (nesMessage) => {
  chat.sendMessage(LoggedInUser, room, newMessage).then(response => {
    socketRef.current.emit('message', { ...response.data, room, sendBy: LoggedInUser})
    setFeed([...feed, { ...response.data, senBy: LoggedInUser}])
  }).catch(err => console.log(err))
}
return (
  <div id='chat-container'>Chat</div>
  )
}

export default Chat