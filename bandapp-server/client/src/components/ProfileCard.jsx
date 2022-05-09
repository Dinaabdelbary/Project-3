import React from 'react'
import UsersList from './ListOfUsers'
import User from './User'


function ProfileCard() {
    {ListOfUsers.map(User)}
  return (
    <div className='profileCard'>
        <img src='{User.img}'></img>
        <p>{User.name}</p>
        <p>{User.instrument}</p>
        <p>{User.genre}</p>
        <button>Connect</button>
        <button>Chat</button>
    </div>
  )
}

export default ProfileCard;