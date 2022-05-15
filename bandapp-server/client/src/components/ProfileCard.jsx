import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { storedUser } from '../features/auth/authSlice';
import { sendFriendRequest } from '../services/userApi';
import { Link } from 'react-router-dom';

const ProfileCard = (props) => {
  const userData = useSelector(storedUser);
  const [isPending, setIsPending] = useState(false);

  const isPendingInitialValue =
    userData.currentUser?.pendingSentRequests.includes(props.user._id);

  useEffect(() => {
    setIsPending(isPendingInitialValue);
  }, [isPendingInitialValue]);

  //clickHandler is only a placeholder until we have chat
  const clickHandler = () => {
    sendFriendRequest(props.user._id)
      .then(() => {
        setIsPending(true);
      })
      .catch((error) => console.log(error));
    console.log('clicked');
  };

  const isFriend = userData.currentUser?.friendList.includes(props.user._id);

  return (
    <div className="profileList">
      <div className="profileCard raise">
        <div className="card-header">
          <div className="card-header-slanted-edge">
            <img src={props.user.profilePicture} className="avatar" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 200">
              <path className="polygon" d="M-20,200,1000,0V200Z" />
            </svg>
          </div>
        </div>
        <div className="card-body">
          <h2 className="cardname"><Link to={`/${props.user._id}`}>{props.user.name}</Link></h2>
          <h4 className="title">Guitarist</h4>
          <div className="bio">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Dignissimos, aperiam.
          </div>
          <p className="details">{props.user.instruments}instruments</p>
          <p className="details">{props.user.location}location</p>
          {!isFriend && (
            <button
              className="raise"
              disabled={isPending}
              onClick={clickHandler}
            >
              {isPending ? `Pending...` : 'Connect'}
            </button>
          )}
          {/* add clickhandler when we have chat */}
          <button className="button">chat</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
