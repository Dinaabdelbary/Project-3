import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, storedUser } from '../features/auth/authSlice';
import { sendFriendRequest } from '../services/userApi';
import { Link } from 'react-router-dom';
import { FaRocketchat } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getUser } from '../services/userApi';

const ProfileCard = (props) => {
  const [user, setUser] = useState({
    name: '',
    instruments: [],
    location: '',
    profilePicture: '',
    genres: [],
  });
  const { id } = useParams();
  const userData = useSelector(storedUser);

  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const hasSentRequest = userData.currentUser?.pendingSentRequests.includes(
      props.user._id
    );
    setIsPending(hasSentRequest);
  }, []);

  useEffect(() => {
    setUser(getUser(id));
  }, []);
  const openChat = (recepientId) => {
    props.setChatId(recepientId);
  };

  //clickHandler is only a placeholder until we have chat
  const clickHandler = () => {
    sendFriendRequest(props.user._id)
      .then((response) => {
        // add user id in sentRequest list of loggedin user
        console.log('response after sending friend request', response);
        dispatch(setCurrentUser(response.data));
        setIsPending(true);
      })
      .catch((error) => console.log(error));
    console.log('clicked');
  };

  const isFriend = userData.currentUser?.friendList.includes(props.user._id);

  return (
    <div className='profileList'>
      <div className='profileCard'>
        <div
          className='card-header'
          style={{
            backgroundImage: `url(${props.user.profilePicture})`,
            backgroundSize: 'cover',
          }}
        >
          <div className='card-header-slanted-edge'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 200'>
              <path className='polygon' d='M-20,200,1000,0V200Z' />
            </svg>
          </div>
        </div>
        <div className='card-body'>
          <div className='cardHeader'>
            <h2 className='cardname'>
              <Link to={`/${props.user._id}`}>{props.user.name}</Link>
            </h2>
            <div onClick={() => openChat(props.user._id)} className='chatIcon'>
              <FaRocketchat color='white' />
            </div>
          </div>
          <h4 className='title'>Guitarist</h4>
          <div className='bio'>
            {/* >>>>>>> origin/socketio */}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Dignissimos, aperiam.{props.user.bio}
          </div>
          <p className='details'>{props.user.instruments}instruments</p>
          <p className='details'>{props.user.location}location</p>
          {!isFriend && (
            <button
              className='raise'
              disabled={isPending}
              onClick={clickHandler}
            >
              {isPending ? `Pending...` : 'Connect'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
