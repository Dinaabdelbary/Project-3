import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { logout } from '../services/auth'




const Navbar = (props) => {
    
const navigate = useNavigate();

  const { loggedInUser, setLoggedInUser } = props
  //when we use redux toolkit, good example of context

  const logoutHandler = () => {
    logout().then(done=>{
      setLoggedInUser(null)
      navigate('/');
    })
  }

  return (
    <nav>
    <Link to='/'>Home</Link>
    <Link to='/search'>Search</Link>
    <Link to='/profile'>{loggedInUser ? loggedInUser.name : ""}</Link>
    {!loggedInUser ? <Link to='/login'>Login</Link> :
    <button type="button" onClick={ logoutHandler} >Logout</button>}

    </nav>
  )
}

export default Navbar