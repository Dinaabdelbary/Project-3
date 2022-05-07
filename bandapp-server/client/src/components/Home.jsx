import React from 'react'
import ListOfUsers from './ListOfUsers'

const Home = (props) => {
    const { loggedInUser } = props
    return (
        <div>
             <ListOfUsers/>
        </div>
    )
}

export default Home
