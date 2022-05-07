import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import {
  useLazyLoggedInQuery,
  useLogoutMutation,
} from './features/auth/authApi';
import { currentUser, setCurrentUser } from './features/auth/authSlice';

function App() {
  const [loggedInQuery, result] = useLazyLoggedInQuery();
  const [logout, { isLoading, isError, isSuccess }] = useLogoutMutation();

  const dispatch = useDispatch();
  const userData = useSelector(currentUser);

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3005/api/auth/loggedin')
      .then((res) => {
        console.log(res);
        dispatch(setCurrentUser(res.data));
      })
      .catch((err) => {
        console.error(err);
      });

    // loggedInQuery()
  }, []);

  const logoutHandler = () => {
    logout()
      .then((done) => {
        console.log(done);
        dispatch(setCurrentUser(null));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <h1>{loggedInUser ? loggedInUser.name : ''}</h1>
      {userData?.user.currentUser.name ? (
        <>
          {/* <p>We have a user in storage: {userData.user.currentUser.name}</p> */}
          <button type="button" onClick={logoutHandler}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p>We don't have a user in the redux storage.</p>
          <Link to="/login">Login</Link>
        </>
      )}
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <div>
        <Routes>
          <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
          <Route
            path="/signup"
            element={<SignUp setLoggedInUser={setLoggedInUser} />}
          />
          <Route
            path="/login"
            element={<Login setLoggedInUser={setLoggedInUser} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
