import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { storedUser } from '../features/auth/authSlice';
import { getUserList } from '../services/userApi';
import ProfileCard from './ProfileCard';

const UsersList = () => {
    const userData = useSelector(storedUser); // returns data from redux store
    const [listOfUsers, setListOfUsers] = useState([]);

    useEffect(() => {
        getUserList()
            .then(response => {
                const users = response.data;
                setListOfUsers(users);
            })
            .catch(error => console.log(error));
    }, []);

    const allUsers = listOfUsers.map(user => {
        const isPending = userData.currentUser?.pendingSentRequests.includes(
            user._id
        );
        return (
            <div key={user._id}>
                <ProfileCard user={user}/>
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
