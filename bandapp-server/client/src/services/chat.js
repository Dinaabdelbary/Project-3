import axios from 'axios';


export const getPreviousMessages = (participants) => {

    return axios.post('/api/chat/conversation', { participants })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });




}