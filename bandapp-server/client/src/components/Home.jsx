import React from 'react'
import ListOfUsers from './ListOfUsers'

const Home = (props) => {

  // getUserList()

  return (
    <div>
    <ListOfUsers setChatId={props.setChatId}/>
    </div>
  )
}

export default Home