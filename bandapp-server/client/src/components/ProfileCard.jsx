import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../services/userApi';
import { useSelector } from 'react-redux';
import { storedUser } from '../features/auth/authSlice';
import { sendFriendRequest } from '../services/userApi';
import { Link } from 'react-router-dom';

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

  const isPendingInitialValue =
    userData.currentUser?.pendingSentRequests.includes(props.user._id);

  useEffect(() => {
    setIsPending(isPendingInitialValue);
  }, [isPendingInitialValue]);

  useEffect(() => {
    setUser(getUser(id));
  }, []);
  //clickHandler is only a placeholder until we have chat
  const openChat = (recepientId) => {
    props.setChatId(recepientId);
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
          <h2 className="cardname">{props.user.name}name</h2>
          <h4 className="title">Guitarist</h4>
          <div className="bio">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Dignissimos, aperiam.
          </div>
          {/* <Link to ={`/${id}`}> Vitor's profile </Link> */}
          <p className="details">{props.user.instruments}instruments</p>
          <p className="details">{props.user.location}location</p>
          {!isFriend ? (
            <button
              className=" sendrequestbtn"
              disabled={isPending}
              onClick={() => {
                sendFriendRequest(props.user._id)
                  .then()
                  .catch((error) => console.log(error));
              }}
            >
              {isPending ? `Pending...` : 'Connect'}
            </button>
          ) : (
            <></>
          )}

          <button className="button" onClick={() => openChat(props.user._id)}>
            chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
