import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { storedUser } from '../features/auth/authSlice';
import { setAllUsers, storedUsers } from '../features/user/userSlice';
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

    useEffect(() => {
        getUserList()
            .then(response => {
                const users = response.data;
                setListOfUsers(users);
            })
            .catch(error => console.log(error));
    }, []);

    const allUsers = listOfUsers.map(user => {
        // console.log(userData.currentUser);
        const isPending = userData.curerntUser?.pendingSentRequests.includes(
            user._id
        );
        // console.log('isPending', isPending)
        return (
            <div key={user._id}>
                {/* <ProfileCard user={user} setChatId={props.setChatId}/> */}
                <Link to={`/${user._id}`}>{user.name}</Link>
                <button
                    className='raise'
                    disabled={isPending}
                    onClick={() => {
                        handleConnect(user._id);
                    }}
                >
                    Connect
                </button>
                
            </div>
        );
    });

    return (
        <div>
            <h2>List of users</h2>
            {allUsers}
        </div>
    );
    const isCurrentUser = userData.currentUser._id === user._id;
    return (
      <div key={user._id}>{!isCurrentUser && <ProfileCard user={user} />}</div>
    );
  }

export default UsersList;
