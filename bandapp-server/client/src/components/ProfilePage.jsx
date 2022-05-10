import React, { useState, useEffect } from 'react'
// import { currentUser } from '../features/auth/authSlice';
import { getuser } from '../features/userApi/userApi';
import { useParams } from "react-router-dom";


function ProfilePage() {

  const [user, setUser] =  useState ({
        name:"",
        instruments:[],
        location:'',
         profilePicture:'',
        coverPhoto:"",
        listensto:[],
        genres:[],
        history:"",
        currentBands: [],
        friendList: []
    })

    const { id } = useParams();

 useEffect  (() => {setUser(getuser(id))}, [])
 /////MIGHT NEED TO DISPLAY IF IT'S OUR PROFILE
    // pendingSentRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
    // pendingReceivedRequests: [{type: Schema.Types.ObjectId, ref: "User"}],

    const clickHandler = () =>{
        console.log("clicked")
      }
console.log(id)
  return (
    <div>
          <img src=''></img>
          <imgs src="">cover photo</imgs>
          <h4>{user.name}name</h4>
          <p>{user.instruments}instrument</p>
          <p>{user.genres}genres</p>
          <p>{user.listensto}listensto</p>
          <p>{user.instruments}instruments</p>
          <p>{user.history}history</p>
          <p>{user.location}location</p>
          
          <button onClick={clickHandler()}>Connect</button>
        <button>Chat</button>


      </div>
  )
}

export default ProfilePage