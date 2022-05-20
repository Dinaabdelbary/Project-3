import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setCurrentUser, storedUser } from '../features/auth/authSlice';
import { sendFriendRequest, getUser, unfollow } from '../services/userApi';

function ProfilePage() {
  const [user, setUser] = useState({
    name: '',
    instruments: [],
    location: '',
    profilePicture: '',
    coverPhoto: '',
    listensto: [],
    genres: [],
    bio: '',
    currentBands: [],
    friendList: [],
  });
  const userData = useSelector(storedUser);
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const { id } = useParams();
  const isOwner = id === userData.currentUser?._id;
  //const hasReceivedRequest = userData.currentUser?.pendingReceivedRequests.includes(id)
  const isFriend = userData.currentUser?.friendList.includes(id);

  const hasSentRequest = userData.currentUser?.pendingSentRequests.includes(id);
  const navigate = useNavigate();

  useEffect(() => {
    setIsPending(hasSentRequest);
    console.log('hasSentRequest:', hasSentRequest);
    getUser(id)
      .then((response) => {
        console.log('response.data:', response.data);
        setUser(response.data);

        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }, [hasSentRequest]);

  /////MIGHT NEED TO DISPLAY IF IT'S OUR PROFILE
  // pendingSentRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
  // pendingReceivedRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
  const clickHandler = () => {
    navigate(`/editprofile/${id}`);
  };

  const connectHandler = () => {
    sendFriendRequest(id)
      .then((response) => {
        console.log('response after connect: ', response);
        setIsPending(true);
        dispatch(setCurrentUser(response.data));
      })
      .catch((error) => console.log(error));
  };

  const unfollowHandler = () => {
    unfollow(id)
      .then((updatedUser) => {
        console.log('user after promise: ', updatedUser.data);
        dispatch(setCurrentUser(updatedUser.data));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <img className='CoverImage' src='' alt='cover photo' />
      <div className='name'>Name: {user?.name}</div>
      <p className='details'>Instrument I play: {user?.instruments}</p>
      <p className='details'>Genres: {user?.genres}</p>
      <p className='details'>About me: {user?.bio}</p>
      <div className='details'>
        <i className=''>place</i>
        {user?.location}
      </div>
      {/* {hasReceivedRequest && <Notification/>} */}
      {isOwner ? (
        <div>
          {' '}
          <button className='raise' onClick={clickHandler}>
            Edit profile
          </button>
        </div>
      ) : (
        <div>
          <button
            className='raise'
            onClick={connectHandler}
            disabled={isPending}
          >
            {isPending ? `Pending...` : 'Connect'}
          </button>
          <button className='raise'>Chat</button>
        </div>
      )}
      {isFriend && (
        <div>
          <button className='raise' onClick={unfollowHandler}>
            Unfollow
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
