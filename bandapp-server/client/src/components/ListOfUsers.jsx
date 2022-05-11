import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { storedUser } from '../features/auth/authSlice';
import { getUserList } from '../features/userApi/userApi';

const UsersList = () => {
  const userData = useSelector(storedUser); // returns data from redux store
  const [listOfUsers, setListOfUsers] = useState([]);

  const handleConnect = (id) => {
    axios
      .get(`/connect/${id}`)
      .then()
      .catch((err) => console.log(err));
  };
 
  useEffect(() => {
    getUserList()
      .then((response) => {
        const users = response.data;
        setListOfUsers(users);
      })
      .catch((error) => console.log(error));
  }, []);

  const allUsers = listOfUsers.map((user) => {
    // console.log(userData.currentUser);
      const isPending = userData.curerntUser?.pendingSentRequests.includes(user._id)
    // console.log('isPending', isPending)
    return (
      <div key={user._id}>
        <Link to={`/${user._id}`}>{user.name}</Link>
        (
          <button
            disabled={isPending}
            onClick={() => {
              handleConnect(user._id);
            }}
          >
            Connect
          </button>
        )
      </div>
    );
  });

  return (
    <div>
      <h2>List of users</h2>
      {allUsers}
    </div>
  );
};

export default UsersList;
