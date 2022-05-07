import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../features/auth/authApi';
import { setCurrentUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const dispatch = useDispatch();
    const [login, { isLoading, isError, isSuccess, data }] = useLoginMutation();

    const [email, setEmail] = useState('');
    const [password, sePassword] = useState('');

    const navigate = useNavigate();

    const handleEmail = event => setEmail(event.target.value);
    const handlePasswordChange = event => sePassword(event.target.value);

    const handleSubmit = () => {
        axios.post('http://localhost:3005/api/auth/login', { email, password })
            .then(({ data: user }) => {
                dispatch(setCurrentUser(user));
                navigate('/')
            })
            .catch(err => {
                console.error(err);
            });
    };



    return (
        <div>

            <input
                type='text'
                placeholder='Email'
                onChange={handleEmail}
                value={email}
            />
            <input
                type='password'
                placeholder='Password'
                onChange={handlePasswordChange}
                value={password}
            />
            <button type='button' onClick={handleSubmit}>
                Login
            </button>
        </div>
    );
};

export default Login;
