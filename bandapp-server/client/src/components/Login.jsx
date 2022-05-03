import React, { useState } from 'react';
import { login } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
    currentUser,
    storedUser,
} from '../features/auth/authSlice';



const Login = (props) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, sePassword] = useState('');

    const handleEmail = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => sePassword(event.target.value);

    const handleSubmit = () => {

        login(email, password)
            .then(user => {
                // props.setLoggedInUser(user)
                console.log(user, 'response from login')
                dispatch(currentUser(user))
                navigate('/');
            })
            .catch(error => {
                console.log(error, 'Error when trying to send login request')
            })
    };

    return (
        <div>
            <input type="text" placeholder="Email" onChange={handleEmail} value={email} />
            <input type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
            <button type="button" onClick={handleSubmit}>Login</button>
        </div>
    )
};

export default Login