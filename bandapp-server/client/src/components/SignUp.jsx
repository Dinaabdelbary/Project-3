import React from 'react';
import { signup } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const navigate = useNavigate();

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

 const submitUserRegisteration= ()=>{
    signup(name,email,password).then(user=>{
        props.setLoggedInUser(user)
        navigate('/');
    })
 }
    return (
        <div className="App">
            <input type="text" placeholder="John" name="name" onChange={(event)=> setName(event.target.value)}/>
            <input type="email" placeholder="john@doe.com" name="email" onChange={(event)=> setEmail(event.target.value)} />
            <input type="password" placeholder="*********" name="password" onChange={(event)=> setPassword(event.target.value)}/>
            <button onClick={submitUserRegisteration}>Register</button>
        </div>
    );
}

export default SignUp;