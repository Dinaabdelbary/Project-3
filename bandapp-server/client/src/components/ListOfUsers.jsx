import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { storedUser } from '../features/auth/authSlice';
import { setAllUsers } from '../features/user/userSlice';
import { getUserList } from '../services/userApi';
import ProfileCard from './ProfileCard';
import { useDispatch } from 'react-redux';

const UsersList = () => {
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
   
    const isCurrentUser = userData.currentUser._id === user._id;
    const isFriend = userData.currentUser?.friendList.includes(user._id)
    return (
      <div key={user._id}>{!isCurrentUser && !isFriend && <ProfileCard user={user} />}</div>
    );
  });

  return (
    <div>
      <h2>Find musicians!</h2>
      {allUsers}
    </div>
  );
};

export default UsersList;
