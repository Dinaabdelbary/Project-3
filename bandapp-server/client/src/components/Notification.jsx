import React from 'react'
import { useSelector } from 'react-redux'
import { storedUser } from '../features/auth/authSlice'


const userData = useSelector(storedUser)
const receivedRequests = userData.currentUser.pendingReceivedRequests

const Notification = () => {
  return (
    <div>Notification</div>
  )
}

export default Notification