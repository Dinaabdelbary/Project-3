import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const handleLogin = (event) => {
        event.preventDefault()
        navigate('/login')
    }
    const handleSignup = (event) => {
        event.preventDefault()
        navigate('/signup')
    }

    return (
        
        <div className='form'>
        <div className='container'>
        <button className="raise" onClick={handleLogin}>
        Login
        </button>
        </div>
        <div className='container'>
        <button className="raise" onClick={handleSignup}>
         Sign up
        </button>
        </div>
        </div>
    )
}

export default Home
