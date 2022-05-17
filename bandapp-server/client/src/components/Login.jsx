import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../features/auth/authSlice';
import { login } from '../services/auth';

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password)
      .then((response) => {
        if (response.message) {
          setError(response.message);
        } else {
          dispatch(setCurrentUser(response));
          setError('');
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error, 'Error when trying to send login request');
      });
  };
  console.log(error);

  return (
    <div>
      <h1>Find other musicians. Connect. Play.</h1>
      <h3>
        Wanna play music? Find musicians in your area, connect with them and
        jam!
      </h3>
      <div className='form'>
        {error ? <h4>{error}</h4> : <></>}
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Email'
            onChange={handleEmail}
            value={email}
          />
          <br />
          <input
            type='password'
            placeholder='Password'
            onChange={handlePasswordChange}
            value={password}
          />
          <br />
          <button className='raise' type='submit'>
            Login
          </button>
        </form>
        <h4>Doesn't have an account yet?</h4>
        <Link to='/signup' className="buttons raise">
         Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
