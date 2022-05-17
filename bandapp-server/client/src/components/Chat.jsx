import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { storedUser } from '../features/auth/authSlice';

function Chat(props) {
  const userData = useSelector(storedUser); // returns data from redux store
  console.log(props, userData.currentUser._id)
  const [feed, setFeed] = React.useState([]);
  const socketRef = React.useRef();

  axios.post('/conversation/create', {participants:[
    props.chatId, userData.currentUser._id
  ]}).then((response) => {console.log(response)})
  .catch((err) => console.log(err)); 

// React.useEffect(() => {
//   chat.getPreviousMessages(room).then(res => setFeed(res.data)).catch(err => console.log(err))
// }, []);

// React.useEffect(() => {
//   socketRef.current = io.connect(process.env.REACT_APP_API_BASE_URL);
//   socketRef.current.on('message', (messageData) => {
//     setFeed([...feed, messageData])
//   });
//   return () => socketRef.current.disconnet();
// },[feed]);

// const handleSendMessage = (nesMessage) => {
//   chat.sendMessage(LoggedInUser, room, newMessage).then(response => {
//     socketRef.current.emit('message', { ...response.data, room, sendBy: LoggedInUser})
//     setFeed([...feed, { ...response.data, senBy: LoggedInUser}])
//   }).catch(err => console.log(err))
// }
return (
  <div id='chat-container'>Chat</div>
  )
}

export default Chat