import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { storedUser } from '../features/auth/authSlice';
import { setAllUsers, storedUsers } from '../features/user/userSlice';
import { getUserList } from '../services/userApi';
import ProfileCard from './ProfileCard';
import { useDispatch } from 'react-redux';

const UsersList = (props) => {
  const userData = useSelector(storedUser); // returns data from redux store
  const [listOfUsers, setListOfUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserList()
      .then((response) => {
        const users = response.data;
        dispatch(setAllUsers(users));
        setListOfUsers(users);
      })
      .catch((error) => console.log(error));
  }, []);

  const allUsers = listOfUsers.map((user) => {
    const isPending = userData.currentUser?.pendingSentRequests.includes(
      user._id
    );
    const isCurrentUser = userData.currentUser._id === user._id;
    return (
      <div key={user._id}>{!isCurrentUser && <ProfileCard user={user} setChatId={props.setChatId} />}</div>
    );
  });

  return (
    <div className='user-list'>
      {allUsers}
    </div>
  );
};

export default UsersList;