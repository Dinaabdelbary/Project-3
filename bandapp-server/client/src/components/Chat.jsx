import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:3001') 

function Chat() {
    const [username, setUsername] = useState([]);
    const [room, setRoom] = useState("");
    const [showChat, setShowCat] = useState(false); ////only show chat if you join a chat

const joinRoom = () => {
if (username !== "" && room !== "") {
    socket.emit('join_room', room)
    setShowCat(true); ///the roomid will be passed to backend 
}   ////you can only join a room or chat if you're a user 

}

return (
    <div>
        {!showChat ? (
    <div className='joinChatContainer'>    
    <h3>Chat</h3>
 <input type="text" placeholder='name' onChange={(event) => {setUsername(event.target.value)}}/>
 <input type="text" placeholder='roomid' onChange={(event) => {setRoom(event.target.value)}}/>
 <button onClick={joinRoom}>Start Chat</button>
 </div>
 )
 :
 (
     <ChatWindow socket={socket} username={username} room={room}/>
     )}
 </div>
)
}

export default Chat