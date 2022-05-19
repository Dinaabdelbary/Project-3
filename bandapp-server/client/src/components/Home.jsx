import React from 'react'
import {getUserList} from '../services/userApi'
import ListOfUsers from './ListOfUsers'
import FriendList from './FriendList'
import { useSelector } from 'react-redux'
import { storedUser } from '../features/auth/authSlice'

const Home = () => {
  const userData = useSelector(storedUser);
  console.log('userdata in home: ',userData)
  

  getUserList()  

  return (

    <div>
    {userData.currentUser.friendList.length ? (
      <FriendList/>
              ) : (
             <h1>Find people to play music with!</h1>
              )}
    
    <ListOfUsers/>
    </div>
  )
}

export default Home