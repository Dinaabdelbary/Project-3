import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import getSearchResult from '../services/searchApi';
import ProfileCard from './ProfileCard';

const SearchResult = () => {
  const [userList, setUserList] = useState([]);

  const query = useLocation().search;
  useEffect(() => {
    getSearchResult(query)
      .then((response) => {
        const allresults = response.data;
        setUserList(allresults);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {userList.map((user) => {
        return <ProfileCard user={user} />;
      })}
    </div>
  );
};

export default SearchResult;
