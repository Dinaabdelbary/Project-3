import axios from "axios";

const getuser = (id) => {
    return axios
        .get(`http://localhost:3005/api/user/${id}`)
        .then(response => {
            return (response.data) 
        })
        .catch(error => {
            return error.response.data
        });
    }

    export{ getuser }