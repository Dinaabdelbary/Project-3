import axios from "axios";

const getSearchResults = (query) => {
    
    return axios.get(`http://localhost:3005/api/search?q=${query}`)
}

export default getSearchResults