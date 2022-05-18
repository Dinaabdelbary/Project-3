import React from 'react'
import {getUserList} from '../services/userApi'
import ListOfUsers from './ListOfUsers'
import FriendList from './FriendList'

const Home = () => {

  getUserList()  

  return (

    <div>
    <FriendList/>
    <ListOfUsers/>
    </div>
  )
}

export default Home