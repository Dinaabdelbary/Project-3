import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserProfile from './components/Geolocation';
import Home from './components/Home';
import Landing from './components/Landing';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import ProfileForm from './components/ProfileForm';
import ProfilePage from './components/ProfilePage';
import SearchResult from './components/SearchResult';
import SignUp from './components/SignUp';
import { setCurrentUser, storedUser } from './features/auth/authSlice';
import { loggedin } from './services/auth';

function App() {
  const userData = useSelector(storedUser); // gets user from global state
  const dispatch = useDispatch();

  useEffect(() => {
    loggedin()
      .then((response) => {
        console.log('response after loggedin: ', response)
        dispatch(setCurrentUser(response.data)); //retrieve current user and send to global state
      })
      .catch((error) =>
        console.log(
          error.message,
          'Error when trying to get info from loggedin axios request'
        )
      );
  }, [dispatch]);

  return (
    <div className="App">
      <></>

      {userData.currentUser ? <Navbar /> : ''}
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/location" element={<UserProfile />} />
          <Route path="/:id" element={<ProfilePage />} />
          <Route path="/ListOfUsers" element={<ProfileCard />} />
          <Route
            path="/"
            element={userData.currentUser ? <Home /> : <Landing />}
          />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/editprofile" element={<ProfileForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

const searchParams = new URLSearchParams('name=test1');

// axios.get("localhost:3005/search" + searchParams)
