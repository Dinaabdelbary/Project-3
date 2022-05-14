import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { storedUser } from '../features/auth/authSlice';
import { acceptFriendRequest, declineFriendRequest } from '../services/userApi';

const NotificationCard = ({ user }) => {
  const userData = useSelector(storedUser);
  console.log('user: ', user)
  
  const handleAccept = async (event) => {
    event.preventDefault();
    try {
      const acceptedUser = await acceptFriendRequest(user._id);
      console.log('accepted user: ', acceptedUser );
    } catch (error) {
      console.log('error: ', error)
    }
    //redirect to `/${user._id}`. if you use navigate() it gets fucked. Check useNavigate()
  };

  const handleDecline = async () => {
    try {
      const declinedUser = await declineFriendRequest(user._id);
      console.log('declined user: ', declinedUser)
    } catch (error) {
      console.log('error',error);
    }
  };

  return (
    <div className='container'>
      <p>{`${user.name}`}  wants to connect!</p>
      <button className='buttons' onClick={handleAccept}>Accept</button>
      <button className='buttons' onClick={handleDecline}>Decline</button>
    </div>
  );
};

export default NotificationCard;
