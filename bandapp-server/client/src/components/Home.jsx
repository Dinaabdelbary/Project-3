import React from 'react'
import { Link } from 'react-router-dom'

const Home = (props) => {
    const { loggedInUser } = props
    return (
        <div>
            {!loggedInUser ? <div><p>Home page. Log in or sign up to continue</p><Link to='/login'>Login</Link> <Link to='/signup'>Sign up</Link></div>: <div> This is home for logged in users</div>}
        </div>
    )
}

export default Home
