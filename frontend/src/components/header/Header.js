import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Username from './Username'
import Context from '../../globalState/state'
import './header.css'

function Header () {
  const { sessionId, username } = useContext(Context)

  return (
    <section className="header">
      <div className='header--logo'><Link to='/'>CoconutCloud</Link></div>
      <div className='header--menu-container'>{
        !sessionId
          ? <>
              <div className='header--menu-container--item'><Link to='/sign-in'>Sign in</Link></div>
              <div className='header--menu-container--item'><Link to='/sign-up'>Sign up</Link></div>
            </>
          : <Username username={ username } />
      }</div>
    </section>
  )
}

export default Header