import React, { useEffect, useState } from 'react';
import { setCurrentUser } from '../features/auth/authSlice';
import { loggedin } from '../services/auth';

const IsLoggedin = () => {
    const dispatch = useDispatch();
    const [loggedinUser, setLoggedinUser] = useState(null);
    useEffect(() => {
      loggedin()
      .then((response) => {
          setLoggedinUser(response.data);
        dispatch(setCurrentUser(response.data));
      })
      .catch((error) => console.error(error));
    });
  
    return user ? children : <LoadingComponent />;
  };


export default IsLoggedin