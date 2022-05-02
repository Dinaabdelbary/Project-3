import React from 'react';
import { signup } from '../features/auth/authApi'
import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
    createUser,
    storedUser,
    currentUser,
} from '../features/auth/authSlice';



const SignUp = (props) => {

    const dispatch = useDispatch(); // sends data to redux store
    const userData = useSelector(storedUser); // returns data from redux store

    const navigate = useNavigate();

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const submitUserRegisteration = () => {
        signup(name, email, password)
            .then(user => {
                console.log(name, email, password)
                dispatch(currentUser({currentUser:user.data}))
                navigate('/');
            })
            .catch(error => console.log(error, 'Error when trying to send signup request'))
    }
    return (
        <div className="App">
            <input type="text" placeholder="John" name="name" onChange={(event) => setName(event.target.value)} />
            <input type="email" placeholder="john@doe.com" name="email" onChange={(event) => setEmail(event.target.value)} />
            <input type="password" placeholder="*********" name="password" onChange={(event) => setPassword(event.target.value)} />
            <button onClick={submitUserRegisteration}>Register</button>
        </div>
    );
}

export default SignUp;