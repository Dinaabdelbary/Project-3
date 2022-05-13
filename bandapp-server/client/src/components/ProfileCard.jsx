import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../services/userApi';

const ProfileCard = () => {
    const [user, setUser] = useState({
        name: '',
        instruments: [],
        location: '',
        profilePicture: '',
        genres: [],
    });
    const { id } = useParams();

    useEffect(() => {
        setUser(getUser(id));
    }, []);

    const clickHandler = () => {
        console.log('clicked');
    };

    return (
        <div className='profileList'>
            <div className='profileCard raise'>
                <div className='card-header'>
                    <div className='card-header-slanted-edge'>
                        <img>{user.img}</img>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 1000 200'
                        >
                            <path className='polygon' d='M-20,200,1000,0V200Z' />
                        </svg>
                    </div>
                </div>
                <div className='card-body'>
                    <h2 className='cardname'>{user.name}name</h2>
                    <h4 className='title'>Guitarist</h4>
                    <div className='bio'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Dignissimos, aperiam.
                    </div>
                    <p className='details'>{user.instruments}instruments</p>
                    <p className='details'>{user.location}location</p>
                    <button className='button' onClick={clickHandler()}>
                        add friend
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
