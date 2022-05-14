//Display response.data, which is an array with the results of the search

import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import getSearchResult from '../services/searchApi'

const SearchResult = () => {

    const query = useLocation().search
    useEffect(()=>{
        getSearchResult(query)
    .then((response) => {
        const allresults = response.data
    }).catch(error => console.log(error))
    })

    
    
    return (
    <div>


    </div>
  )
}

export default SearchResult