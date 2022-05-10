import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';

import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { loggedin } from './features/auth/authApi'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './services/auth';
import {
  storedUser,
  currentUser
} from './features/auth/authSlice';
import axios from 'axios';

import UserProfile from './components/Geolocation';
// import { ChakraProvider } from '@chakra-ui/react'
import ProfileCard from './components/ProfileCard';
import ProfilePage from './components/ProfilePage';


function App() 
{

  const userData = useSelector(storedUser); // returns data from redux store
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loggedInUser, setLoggedInUser] = useState(null);
  // dispatch(currentUser());

  useEffect(() => {
    loggedin()
      .then(response => {
        dispatch((currentUser(response.data)))
      })
      .catch(error => console.log(error, 'Error when trying to get info from loggedin axios request'))
  }, [dispatch])


  const logoutHandler = () => {
    logout().then(done => {
      console.log(done)
      dispatch(currentUser(null))
      navigate('/');
    })
  }
  return (

    <div className="App">
    <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
      <h1>{loggedInUser ? loggedInUser.name : ""}</h1>
      {
        userData.user.currentUser.name ?
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
          <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
          <Route path="/signup" element={<SignUp setLoggedInUser={setLoggedInUser}/>} />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser}/>} />
          <Route path="/location" element={<UserProfile />} />
          <Route path="/:id" element={<ProfilePage/>} />    
          <Route path="/ListOfUsers" element={<ProfileCard/>} />         
        </Routes>
        {/* <div>
          <ProfileCard/>
        </div> */}
      </div>
   
    </div>
  );

}

export default App;



const searchParams = new URLSearchParams("name=test1")

axios.get("localhost:3005/search" + searchParams)
