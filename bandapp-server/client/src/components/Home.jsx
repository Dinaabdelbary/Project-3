import React from 'react'
import {getUserList} from '../services/userApi'
import ListOfUsers from './ListOfUsers'

const Home = () => {

  getUserList()

  return (
    <div>
    <ListOfUsers/>
    </div>
  )
}

export default Home