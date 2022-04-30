import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import axios from 'axios';
import { logout } from './services/auth';
import { Link, useNavigate } from 'react-router-dom';




function App() {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = React.useState(null);
  React.useEffect(() => {
    axios.get('/api/auth/loggedin')
      .then(response => setLoggedInUser(response.data))
      .catch(err => console.log(err))
  }, [])
  const logoutHandler = () => {
    logout().then(done=>{
      setLoggedInUser(null)
      navigate('/');
    })
  }

  return (
    <div className="App">
      <h1>{loggedInUser ? loggedInUser.name : ""}</h1>
      <button type="button" onClick={ logoutHandler} >Logout</button>
      <div >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp setLoggedInUser={setLoggedInUser}/>} />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;