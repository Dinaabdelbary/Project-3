import React from 'react'
import { useSelector } from 'react-redux'
import { storedUsers } from '../features/user/userSlice'
import { storedUser } from '../features/auth/authSlice'
import NotificationCard from './NotificationCard'

const Notification = () => {

    const listOfUsers = useSelector(storedUsers)
    const userData = useSelector(storedUser)
    const usersPendingRequest = userData.currentUser.pendingReceivedRequests
     
    console.log('usersPendingRequest: ', usersPendingRequest)

    //compare the current user Id with the other user's sent request array
    // const usersSentRequest = currentUserId === listOfUsers.pendingSentRequests.includes(currentUserId)

    return (

        <div>
            {usersPendingRequest.map(user => 
            <NotificationCard user={user} />)}
        </div>
    )
}

export default Notification