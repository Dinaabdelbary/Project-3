import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import axios from 'axios';
import { logout } from './services/auth';
import { Link, useNavigate } from 'react-router-dom';

import { loggedin } from './features/auth/authApi'
import { useSelector, useDispatch } from 'react-redux';
import {
  storedUser,
  currentUser
} from './features/auth/authSlice';



function App() {
  const userData = useSelector(storedUser); // returns data from redux store
  console.log(userData, 'user data from redux storage');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loggedInUser, setLoggedInUser] = useState(null);
  // dispatch(currentUser());

  useEffect(() => {
    loggedin()
      .then(response => dispatch((currentUser({ currentUser: response.data }))))
      .catch(error => console.log(error, 'Error when trying to get info from loggedin axios request'))
  }, [])
  const logoutHandler = () => {
    logout().then(done => {
      dispatch(currentUser({currentUser: null}))
      navigate('/');
    })
  }

  return (
    <div className="App">
      <h1>{loggedInUser ? loggedInUser.name : ""}</h1>
      {
        userData.user.currentUser ?
          (
            <>
              <p>We have a user in storage: {userData.user.currentUser.name}</p>
              <button type="button" onClick={logoutHandler} >Logout</button>
            </>
          ) :
          (
            <>
              <p>We don't have a user in the redux storage.</p>
              <Link to='/login'>Login</Link>

            </>
          )
      }
      <div >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp setLoggedInUser={setLoggedInUser} />} />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;