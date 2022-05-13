import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../features/auth/authApi';
import { currentUser, storedUser } from '../features/auth/authSlice';

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
                dispatch(currentUser(user.data))
                navigate('/');
            })
            .catch(error => console.log(error, 'Error when trying to send signup request'))
    }
    return (
        <div>
    <h1>Find other musicians. Connect. Play.</h1>
    <h3>Wanna play music? Find musicians in your area, connect with them and jam!</h3>
    <div className="form">
        <div className="App">
            <input type="text" placeholder="Username" name="name" onChange={(event) => setName(event.target.value)} />
            <br />
            <input type="email" placeholder="Email" name="email" onChange={(event) => setEmail(event.target.value)} />
            <br />
            <input type="password" placeholder="*********" name="password" onChange={(event) => setPassword(event.target.value)} />
            <br />
            <button className="raise" onClick={submitUserRegisteration}>Register</button>
        </div>
        </div>
        </div>
    );
}

export default SignUp;