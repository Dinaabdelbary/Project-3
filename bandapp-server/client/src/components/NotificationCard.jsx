import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCurrentUser, storedUser } from '../features/auth/authSlice';
import { storedUsers } from '../features/user/userSlice';
import { acceptFriendRequest, declineFriendRequest } from '../services/userApi';

const NotificationCard = ({ user }) => {
  const userData = useSelector(storedUser);
  const allUsersData = useSelector(storedUsers);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  
  const handleAccept = async () => {
    try {
      const receivingUser = userData.currentUser
      const deletedPendingRequest = receivingUser.pendingReceivedRequests.filter( (pendingRequest) => user._id !== pendingRequest._id)
      const updatedFriendList = [ ...receivingUser.friendList, user._id ]
      const updateUserState = { ...receivingUser, pendingReceivedRequests: deletedPendingRequest, friendList: updatedFriendList }
      const acceptedUser = await acceptFriendRequest(user._id);
      dispatch(setCurrentUser(updateUserState)) 
    } catch (error) {
      console.log('error: ', error)
    }
    navigate(`/${user._id}`)
  };

  const handleDecline = async () => {
    try {
      const receivingUser = userData.currentUser
      const deletedPendingRequest = receivingUser.pendingReceivedRequests.filter( (pendingRequest) => user._id !== pendingRequest._id)
      const declinedUser = await declineFriendRequest(user._id);
      const updateUserState = { ...receivingUser, pendingReceivedRequests: deletedPendingRequest}
      dispatch(setCurrentUser(updateUserState))
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
