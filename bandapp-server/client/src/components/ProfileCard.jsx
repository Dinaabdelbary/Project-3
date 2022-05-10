import React from 'react'
import { useLinkClickHandler } from 'react-router-dom'
import UsersList from './ListOfUsers'
import User from './User'


clickHandler = () =>{
  console.log("clicked")
}

function ProfileCard() {
  return (
    <div className='profileCard'>
        <img src='this.{User.img}'></img>
        <p>{this.User.name}</p>
        <p>{this.User.instrument}</p>
        <p>{this.User.genre}</p>
        <button onClick={this.clickHandler}>Connect</button>
        <button>Chat</button>
    </div>
  )
}

export default ProfileCard;