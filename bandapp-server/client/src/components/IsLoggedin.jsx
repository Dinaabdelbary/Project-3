import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setCurrentUser, storedUser } from '../features/auth/authSlice';
import { loggedin } from '../services/auth';
import Landing from './Landing';

const IsLoggedin = ({ children }) => {
  const userData = useSelector(storedUser);
  const dispatch = useDispatch();
  if (!userData) {
    loggedin()
      .then((response) => {
        console.log(response.data);

        dispatch(setCurrentUser(response.data));
      })
      .catch((error) => console.error(error));
  }
  //   console.log(userData, 'userData', loggedinUser, 'local state')
  if (!userData.currentUser) {
    console.log('undefined user');
    return <Landing />;
  } else {
    console.log('going to children', children);
    return children ? children : <Outlet />;
  }
};

export default IsLoggedin;
