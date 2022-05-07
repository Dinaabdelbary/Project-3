import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSignupMutation } from '../features/auth/authApi';
import { setCurrentUser } from '../features/auth/authSlice';

const SignUp = () => {
    const dispatch = useDispatch();
    const [signup, { isLoading, isError, isSuccess }] = useSignupMutation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerHandler = () => {
        signup({ name, email, password })
            .then(({ data: user }) => {
                dispatch(setCurrentUser(user));
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className='App'>
            <input
                type='text'
                placeholder='John'
                name='name'
                onChange={event => setName(event.target.value)}
            />
            <input
                type='email'
                placeholder='john@doe.com'
                name='email'
                onChange={event => setEmail(event.target.value)}
            />
            <input
                type='password'
                placeholder='*********'
                name='password'
                onChange={event => setPassword(event.target.value)}
            />
            <button onClick={registerHandler}>Register</button>
        </div>
    );
};

export default SignUp;
