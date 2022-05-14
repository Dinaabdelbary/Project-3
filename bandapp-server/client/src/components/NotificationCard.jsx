import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { storedUser } from '../features/auth/authSlice';
import { acceptFriendRequest, declineFriendRequest } from '../services/userApi';

const NotificationCard = ({ user }) => {
  const userData = useSelector(storedUser);
  console.log(user)
  
  const handleAccept = async (event) => {
    event.preventDefault();
    await acceptFriendRequest(user._id);
    Navigate(`/${user._id}`);
  };

  const handleDecline = async (event) => {
    event.preventDefault();
    await declineFriendRequest(user._id);
  };

  return (
    <div className='container'>
      <p style={{color: 'red'}}>{`${user.name} wants to connect!´`}</p>
      <button className='buttons' onClick={handleAccept}>Accept</button>
      <button className='buttons' onClick={handleDecline}>Decline</button>
    </div>
  );
};

export default NotificationCard;
