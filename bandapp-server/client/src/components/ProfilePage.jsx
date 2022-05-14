import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../services/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, storedUser } from '../features/auth/authSlice';
import { loggedin } from '../services/auth';

function ProfilePage() {
  const [user, setUser] = useState({
    name: '',
    instruments: [],
    location: '',
    profilePicture: '',
    coverPhoto: '',
    listensto: [],
    genres: [],
    history: '',
    currentBands: [],
    friendList: [],
  });
  const userData = useSelector(storedUser);
  const dispatch = useDispatch();

  // if (!userData.currentUser) {
  //   useEffect(() => {
  //     loggedin()
  //       .then((response) => {
  //         console.log(response.data);
  //         dispatch(setCurrentUser(response.data));
  //       })
  //       .catch((error) => console.log(error));
  //   }, [userData.currentUser]);
  // }

  const { id } = useParams();
  const isOwner = id === userData.currentUser?._id;
  const navigate = useNavigate();

  if (!userData.currentUser) {
    useEffect(() => {
      getUser(id)
        .then((response) => {
          setUser(response.data);
          dispatch(setCurrentUser(response.data));
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
    }, []);
  }
  /////MIGHT NEED TO DISPLAY IF IT'S OUR PROFILE
  // pendingSentRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
  // pendingReceivedRequests: [{type: Schema.Types.ObjectId, ref: "User"}],

  const clickHandler = () => {
    navigate('/editprofile');
  };
  return (
    <div>
      <img className='CoverImage' src='' alt='cover photo' />
      <div className='name'>Name: {user.name}</div>
      <p className='details'>Instrument I play: {user.instruments}</p>
      <p className='details'>Genres: {user.genres}</p>
      <p className='details'>Music I like: {user.listensto}</p>
      <p className='details'>About me: {user.history}</p>
      <div className='details'>
        <i className=''>place</i>
        {user.location}
      </div>
      {isOwner ? (
        <div>
          {' '}
          <button className='raise' onClick={clickHandler}>
            edit
          </button>
        </div>
      ) : (
        <div>
          <button className='raise'>Connect</button>
          <button className='raise'>Chat</button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
