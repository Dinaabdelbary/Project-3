import React from 'react';
import { useSelector } from 'react-redux';
import { storedUser } from '../features/auth/authSlice';
import NotificationCard from './NotificationCard';

const Notification = () => {
  const userData = useSelector(storedUser);
  const usersPendingRequest = userData.currentUser.pendingReceivedRequests;

  return (
    <div>
      {usersPendingRequest.map((user) => (
        <NotificationCard user={user} />
      ))}
    </div>
  );
};

export default Notification;
