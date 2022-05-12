// ----------- Things that don't work yet
// Styling: need to fix the dropdown menu in mobile and color scheme

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { currentUser, storedUser } from '../features/auth/authSlice';
import { logout } from '../services/auth';


const Navbar = () => {
  const navigate = useNavigate();
  const userData = useSelector(storedUser);
  const dispatch = useDispatch();
  const [search, setSearch] = useState()
  const user = userData.currentUser

  const logoutHandler = () => {
    logout().then((done) => {
      dispatch(currentUser(null));
      navigate('/');
    });
  };

  const searchHandler = (event) => {
    event.preventDefault()
    navigate(`/search/?q=${search}`)
  };


  return (
    
<>
<div className='content-wrapper'>
   <div className='navmenu'>
   <form onSubmit={searchHandler} id="search-form">
         <input onChange={(event) => setSearch(event.target.value)} name='q' placeholder='Find by instruments, genre...' size='15' type='text' autoComplete='off'/>
         <input id='button-submit' type='submit' value='Search'/>
      </form>
      <span id='menu'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC9JREFUeNpi/P//PwM1AQsQU9VEJgYqg8FvICgMGUeel0eTzWiyGU02Qz/ZAAQYAOPcBjEdYroKAAAAAElFTkSuQmCC'  /></span>
      <nav id='navbar' itemprop='mainEntity' itemscope='itemscope' itemtype='https://schema.org/SiteNavigationElement'>
        <ul className='navbar'>
         <li><Link to="/">Home</Link></li>
         {user.pendingReceivedRequests.length ?
         <li><Link to={`/${user._id}`}>You've got a friend request!</Link></li>
         : <li>
           <Link to={`/${user._id}`}>
              <img className="avatar" src={user.profilePicture} alt="avatar"/>
           </Link>
         </li>
         }

         <li><button className="buttons" type='button' onClick={logoutHandler}>Logout</button></li>
        </ul>
      </nav>
   </div>
</div>
{/* <div style='clear: both;'/>  ---------Need it to show the hamburguer menu in mobile  */} 
</>

  );
};

export default Navbar