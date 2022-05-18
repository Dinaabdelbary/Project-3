import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setCurrentUser, storedUser } from '../features/auth/authSlice';
import { loggedin } from '../services/auth';
import { getUser, unfollow } from '../services/userApi';
import Notification from './Notification'

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
      // loggedin()
      //   .then((response) => {
      //     dispatch(setCurrentUser(response.data));
      //   })
      //   .catch((error) => console.log(error));
      //   loggedin()
      // .then((response) => {
      //   dispatch(setCurrentUser(response.data)); //retrieve current user and send to global state
      // })
      // .catch((error) =>
      //   console.log(
      //     error.message,
      //     'Error when trying to get info from loggedin axios request'
      //   )
      // );
 // } 

  const { id } = useParams();
  const isOwner = id === userData.currentUser?._id;
  console.log("profile user data",userData);
  const hasFriendRequest = userData.currentUser?.pendingReceivedRequests.includes(id)
  const isFriend = userData.currentUser?.friendList.includes(id)

  console.log('has friend request: ', hasFriendRequest)
  console.log('is in friend list: ', isFriend)

  const navigate = useNavigate();

  useEffect(() => {
    loggedin()
      .then((response) => {
        dispatch(setCurrentUser(response.data)); //retrieve current user and send to global state
      })
      .catch((error) =>
        console.log(
          error.message,
          'Error when trying to get info from loggedin axios request'
        )
      );
      getUser(id)
      .then((response) => {
      setUser(response.data);
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }, [id]);
  /////MIGHT NEED TO DISPLAY IF IT'S OUR PROFILE
  // pendingSentRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
  // pendingReceivedRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
  const clickHandler = () => {
    navigate(`/editprofile/${id}`);
  };

  const unfollowHandler = () => {
    unfollow(id).then((updatedUser) => {
      console.log('user after promise: ', updatedUser)
      dispatch(setCurrentUser(updatedUser));
  }).catch(error => console.log(error))
}

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
            Edit profile
          </button>
        </div>
      ) : (
        <div>
          <button className='raise'>Connect</button>
          <button className='raise'>Chat</button>
        </div>
      )}
        {isFriend && 
        <div>
          <button
              className="raise"
              onClick={unfollowHandler}
            >Unfollow</button>
            </div>
        }
        {user.pendingReceivedRequests && <Notification/>}

    </div>
  );
}

export default ProfilePage;
