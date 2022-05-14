import React from 'react';
import { useSelector } from 'react-redux';
import { storedUser } from '../features/auth/authSlice';
import { sendFriendRequest } from '../services/userApi';


const ProfileCard = (props) => {
    
    const userData = useSelector(storedUser);

    //clickHandler is only a placeholder until we have chat
    const clickHandler = () => {
        console.log('clicked');
    };
    
    const isPending = userData.currentUser?.pendingSentRequests.includes(
        props.user._id)
        console.log('user Ids: ', props.user._id)
        console.log('current user sent requests: ', userData.currentUser.pendingSentRequests)

    return (
        <div className='profileList'>
            <div className='profileCard raise'>
                <div className='card-header'>
                    <div className='card-header-slanted-edge'>
                        <img>{props.user.img}</img>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 1000 200'
                        >
                            <path className='polygon' d='M-20,200,1000,0V200Z' />
                        </svg>
                    </div>
                </div>
                <div className='card-body'>
                    <h2 className='cardname'>{props.user.name}name</h2>
                    <h4 className='title'>Guitarist</h4>
                    <div className='bio'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Dignissimos, aperiam.
                    </div>
                    <p className='details'>{props.user.instruments}instruments</p>
                    <p className='details'>{props.user.location}location</p>
                    <button
                    className='raise'
                    disabled={isPending}
                    onClick={() => {
                        sendFriendRequest(props.user._id).then().catch(error => console.log(error));
                    }}
                >
                    Connect
                </button>
                    <button className='button' onClick={clickHandler()}>
                        chat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
