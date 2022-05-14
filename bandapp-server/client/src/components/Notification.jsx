import React from 'react'
import {  useSelector } from 'react-redux'
import { setAllUsers, storedUsers } from '../features/user/userSlice'
import NotificationCard from './NotificationCard'



const Notification = () => {

    const listOfUsers = useSelector(storedUsers)
    

  return (
      
    <div>
    {listOfUsers.map(user => <NotificationCard user={user}/>)}

    </div>
  )
}

export default Notification