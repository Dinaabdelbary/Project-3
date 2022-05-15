import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentUser, storedUser } from '../features/auth/authSlice';
import { storedUsers } from '../features/user/userSlice';
import { acceptFriendRequest, declineFriendRequest } from '../services/userApi';

const NotificationCard = ({ user }) => {
  const userData = useSelector(storedUser);
  const allUsersData = useSelector(storedUsers);
  const dispatch = useDispatch()
  console.log('userData: ', userData)
  
  const handleAccept = async () => {
    try {
      const acceptedUser = await acceptFriendRequest(user._id);
      dispatch(setCurrentUser(userData))
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
      <p><Link to={`/${user._id}`} >{`${user.name}`}</Link> wants to connect!</p>
      <button className='buttons' onClick={handleAccept}>Accept</button>
      <button className='buttons' onClick={handleDecline}>Decline</button>
    </div>
  );
};

export default NotificationCard;
