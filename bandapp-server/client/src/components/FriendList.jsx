import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { storedUser } from '../features/auth/authSlice';
import { setAllUsers, storedUsers } from '../features/user/userSlice';
import { getUserList } from '../services/userApi';
import ProfileCard from './ProfileCard';
import { useDispatch } from 'react-redux';

const FriendList = () => {
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

  const allFriends = listOfUsers.map((user) => {
    const isFriend = userData.currentUser.friendList.includes(user._id)
    console.log('friendlist', isFriend)
    const isCurrentUser = userData.currentUser._id === user._id;

    return (
      <div key={user._id}>
        {!isCurrentUser & isFriend && <ProfileCard user={user} />}
      </div>
    );
  });
 
  return (
    <div>
      <h2>Your friends</h2>
      {allFriends}
    </div>
  );
};

export default FriendList;
