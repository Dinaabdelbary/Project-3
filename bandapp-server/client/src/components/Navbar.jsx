import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';
import { loggedin } from '../features/auth/authApi';
import { useSelector, useDispatch } from 'react-redux';
import { storedUser, currentUser } from '../features/auth/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const userData = useSelector(storedUser);
  const dispatch = useDispatch();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    loggedin()
      .then((response) => {
        dispatch(currentUser(response.data)); //retreive current user and send to global state
      })
      .catch((error) =>
        console.log(
          error.message,
          'Error when trying to get info from loggedin axios request'
        )
      );
  }, [dispatch]);

  const logoutHandler = () => {
    logout().then((done) => {
      setLoggedInUser(null);
      navigate('/');
    });
  };

  const searchHandler = () => {
    //some code goes here
    //go to ('/search-results')
  };

  return (
 
<>
<div className='content-wrapper'>
   <div className='navmenu'>
   <form onClick={searchHandler} id="search-form">
         <input name='q' placeholder='Search instruments, artists...' size='15' type='text'/>
         <input id='button-submit' type='submit' value='Search'/>
      </form>
      <span id='menu'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC9JREFUeNpi/P//PwM1AQsQU9VEJgYqg8FvICgMGUeel0eTzWiyGU02Qz/ZAAQYAOPcBjEdYroKAAAAAElFTkSuQmCC'  /></span>
      <nav id='navbar' itemprop='mainEntity' itemscope='itemscope' itemtype='https://schema.org/SiteNavigationElement'>
        <ul className='navbar'>
         <li><Link to="/">Home</Link></li>
         <li>
            <Link to={userData.currentUser._id}>
              <img className="avatar" src={userData.currentUser.profilePicture} alt="avatar"/>
            </Link>
          </li>
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