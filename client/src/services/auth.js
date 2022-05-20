import axios from 'axios';

const signup = (name, email, password) => {
    return axios.post('/api/auth/signup', { name, email, password });
};

const login = (email, password) => {
    return axios
        .post('/api/auth/login', { email, password })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

const logout = () => {
    return axios
        .delete('/api/auth/logout')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

const loggedin = () => {
    return axios.get('/api/auth/loggedin');
};

export { signup, login, logout, loggedin };
