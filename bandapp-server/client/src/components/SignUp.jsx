import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../features/auth/authSlice';
import { signup } from '../services/auth';

const SignUp = () => {
  const dispatch = useDispatch(); // sends data to redux store
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitUserRegisteration = (event) => {
    event.preventDefault();
    signup(name, email, password)
      .then((response) => {
        if (response.message) {
          setError(response.message);
        } else {
          dispatch(setCurrentUser(response.data));
          setError('');
          navigate('/');
        }
      })
      .catch((error) =>
        console.log(error, 'Error when trying to send signup request')
      );
  };
  return (
    <div>
      <h1>Find other musicians. Connect. Play.</h1>
      <h3>
        Wanna play music? Find musicians in your area, connect with them and
        jam!
      </h3>
      <div className='form'>
        <div className='App'>
          {error ? <h4>{error}</h4> : <></>}
          <form onSubmit={submitUserRegisteration}>
            <input
              type='text'
              placeholder='Username'
              name='name'
              onChange={(event) => setName(event.target.value)}
            />
            <br />
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <input
              type='password'
              placeholder='*********'
              name='password'
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <button className='raise'>Register</button>
          </form>
        </div>
        <h4>Alredy registered?</h4>
        <Link to='/login' className="buttons raise">
         Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
