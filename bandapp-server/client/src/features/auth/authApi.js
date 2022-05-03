import axios from 'axios';

const signup = (name, email, password) => {
    return axios.post('/api/auth/signup', { name, email, password })
}

const login = (email, password) => {
    return axios.post('/api/auth/login', {email, password})
}

const logout = () => {
    return axios.delete('/api/auth/logout')
}
const loggedin = () => {
    
    return axios.get('/api/auth/loggedin')
}

export {
    signup,
    login,
    logout,
    loggedin
}