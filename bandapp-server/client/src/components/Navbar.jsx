import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { setCurrentUser, storedUser } from '../features/auth/authSlice';
import { logout } from '../services/auth';
import Notification from './Notification';

const Navbar = () => {
  const navigate = useNavigate();
  const userData = useSelector(storedUser);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const user = userData.currentUser;
const {id} =  useParams()
  const logoutHandler = () => {
    logout().then(() => {
      dispatch(setCurrentUser(null));
      navigate('/');
    });
  };

  const searchHandler = (event) => {
    event.preventDefault();
    navigate(`/search/?q=${search}`);
  };

  const handleHamburger = () => setShowDropDown(!showDropDown);

  const friendRequestsNotification = user?.pendingReceivedRequests && (
    <p onClick={() => setShowNotif(true)}>You've got a friend request!</p>
  );

  return (
    <>
      <div className="content-wrapper">
        <div className="navmenu">
          <form onSubmit={searchHandler} id="search-form">
            <input
              onChange={(event) => setSearch(event.target.value)}
              name="q"
              placeholder="Find by instruments, genre..."
              size="15"
              type="text"
              autoComplete="off"
              value={search}
            />
            <input id="button-submit" type="submit" value="Search" />
          </form>
          <span id="menu" onClick={handleHamburger}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC9JREFUeNpi/P//PwM1AQsQU9VEJgYqg8FvICgMGUeel0eTzWiyGU02Qz/ZAAQYAOPcBjEdYroKAAAAAElFTkSuQmCC" />
          </span>
          <nav
            style={{ display: showDropDown ? 'block' : 'none' }}
            id="navbar"
            itemProp="mainEntity"
            itemScope="itemscope"
            itemType="https://schema.org/SiteNavigationElement"
          >
            <ul className="navbar">
              <li onClick={handleHamburger}>
                <Link to="/">Home</Link>
              </li>
              {user?.pendingReceivedRequests?.length ? (
                <li onClick={() => setShowNotif(!showNotif)}>
                  <p>You've got a friend request!</p>
                </li>
              ) : (
                <li onClick={handleHamburger}>
                  <Link to={`/${user?._id}`}>
                    <img
                      className="avatar"
                      src={user?.profilePicture}
                      alt="avatar"
                    />
                  </Link>
                </li>
              )}


              <li>
                <button
                  className="buttons"
                  type="button"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      {showNotif && <Notification />}
      </div>
    </>
  );
};

export default Navbar;
