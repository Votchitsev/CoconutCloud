import React from 'react'
import './header.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Header (props) {
  const isAuth = useSelector(state => state.auth.authToken)
  const username = useSelector(state => state.auth.username)

  return (
    <section className="header">
      <div className='header--logo'><Link to='/'>CoconutCloud</Link></div>
      <div className='header--menu-container'>{
        !isAuth
          ? <>
              <div className='header--menu-container--item'>Sign in</div>
              <div className='header--menu-container--item'><Link to='/sign-up'>Sign up</Link></div>
            </>
          : <div>{username}</div>
      }</div>
    </section>
  )
}

export default Header
