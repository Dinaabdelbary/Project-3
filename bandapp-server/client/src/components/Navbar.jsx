import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../services/auth'


const Navbar = (props) => {
    
const navigate = useNavigate();

  const { loggedInUser, setLoggedInUser } = props
  //when we use redux toolkit, good example of context

  const logoutHandler = () => {
    logout().then(done=>{
      setLoggedInUser(null)
      navigate('/');
    })
  }

  const searchHandler = () => {
  }

  return (
<div className='content-wrapper'>
   <div className='navmenu'>
      <form onClick={searchHandler}>
         <input name='q' placeholder='Search musicians, instruments...' size='20' type='text'/>
         <input id='button-submit' type='submit' value='Search'/>
      </form>
      <span id='menu'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC9JREFUeNpi/P//PwM1AQsQU9VEJgYqg8FvICgMGUeel0eTzWiyGU02Qz/ZAAQYAOPcBjEdYroKAAAAAElFTkSuQmCC'  /></span>
      <nav id='navbar' itemprop='mainEntity' itemscope='itemscope' itemtype='https://schema.org/SiteNavigationElement'>
         <ul className='navbar'>
            <li><a href='#1' itemprop='url' title='Home'><span itemprop='name'>Home</span></a></li>
            <li><a href='#2' itemprop='url' title='Home'><span itemprop='name'>News</span></a></li>
            <li><a href='#3' itemprop='url' title='Home'><span itemprop='name'>Blog</span></a></li>
            <li id='sub-menu'>
               <span itemprop='name'>Courses</span>
               <ul className="sub-menu">
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/:user/profile'>{loggedInUser ? loggedInUser.name : ""}</Link></li>
                  <li>{!loggedInUser ? <Link to='/login'>Login</Link> :
    <button className='buttons' type="button" onClick={ logoutHandler}>Logout</button>}</li>
               </ul>
            </li>
            <li><a href='#7' itemprop='url' title='Home'><span itemprop='name'>Contact Us</span></a></li>
         </ul>
      </nav>
   </div>
</div>

  )
}

export default Navbar